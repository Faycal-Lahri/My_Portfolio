'use client';

import React, { useEffect, useRef } from 'react';
import { useTheme } from 'next-themes';

export function DotMatrixText() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const { resolvedTheme } = useTheme();
  const isDark = resolvedTheme === 'dark';

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId;
    let particles = [];
    let mouse = { x: -4000, y: -4000, active: false };

    // Build the grid of particles from offscreen rendered text "faycal"
    const initParticles = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height || width === 0 || height === 0) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      const text = 'faycal';

      // Ultra-heavy font stack (Arial Black / Impact) for massive letterforms
      const fontStack = '"Arial Black", "Impact", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif';

      const offscreen = document.createElement('canvas');
      const octx = offscreen.getContext('2d');
      if (!octx) return;

      // Span 100% of the screen width edge-to-edge
      const targetWidth = width * 1.01;
      const testFontSize = 100;
      octx.font = `900 ${testFontSize}px ${fontStack}`;
      const testMetrics = octx.measureText(text);
      const scale = targetWidth / testMetrics.width;
      const fontSize = Math.floor(testFontSize * scale);

      const offscreenHeight = Math.round(height + fontSize * 0.45);
      offscreen.width = width;
      offscreen.height = offscreenHeight;

      octx.font = `900 ${fontSize}px ${fontStack}`;
      octx.textBaseline = 'alphabetic';
      octx.textAlign = 'center';

      // Position baseline so top 2/3 of "faycal" is visible, anchored to the bottom edge
      const baselineY = Math.round(height + fontSize * 0.05);

      octx.fillStyle = '#ffffff';
      octx.fillText(text, width / 2, baselineY);

      // Only sample dots that fall within the visible canvas height [0, height]
      const imgData = octx.getImageData(0, 0, width, height).data;

      // Dense halftone dot-matrix grid matching reference image
      const gap = Math.max(6, Math.min(9, Math.floor(width / 170)));
      const radius = gap * 0.40;
      const newParticles = [];

      for (let y = gap / 2; y < height; y += gap) {
        for (let x = gap / 2; x < width; x += gap) {
          const idx = (Math.floor(y) * width + Math.floor(x)) * 4;
          if (imgData[idx + 3] > 90) {
            newParticles.push({
              originX: x,
              originY: y,
              x: x,
              y: y,
              vx: 0,
              vy: 0,
              radius: radius,
            });
          }
        }
      }

      particles = newParticles;
    };

    initParticles();

    // Mouse & Touch Interaction tracking relative to canvas
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const inX = e.clientX >= rect.left - 40 && e.clientX <= rect.right + 40;
      const inY = e.clientY >= rect.top - 40 && e.clientY <= rect.bottom + 40;

      if (inX && inY) {
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
        mouse.active = true;
      } else {
        mouse.active = false;
      }
    };

    const handlePointerLeave = () => {
      mouse.active = false;
      mouse.x = -4000;
      mouse.y = -4000;
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    document.addEventListener('mouseleave', handlePointerLeave);

    // Resize observer
    const resizeObserver = new ResizeObserver(() => {
      initParticles();
    });
    resizeObserver.observe(container);

    // Animation loop with fluid wave physics & warm peach/orange displacement
    const render = () => {
      const width = container.clientWidth;
      const height = container.clientHeight;
      if (!width || !height) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.clearRect(0, 0, width, height);

      const maxDist = Math.max(90, Math.min(160, width * 0.14));

      // Base resting color
      // Dark mode: #ede9df (warm ivory off-white like reference) | Light mode: #141416 (slate 950)
      const baseR = isDark ? 237 : 20;
      const baseG = isDark ? 233 : 20;
      const baseB = isDark ? 223 : 22;

      // Displaced active color: glowing warm peach/orange (#ff6e2e)
      const activeR = 255;
      const activeG = isDark ? 116 : 88;
      const activeB = isDark ? 50 : 18;

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        if (mouse.active) {
          const dx = p.originX - mouse.x;
          const dy = p.originY - mouse.y;
          const dist = Math.hypot(dx, dy);

          if (dist < maxDist && dist > 0) {
            const force = Math.pow(1 - dist / maxDist, 1.8);
            const angle = Math.atan2(dy, dx);

            // Circular repulsion wave with radial flow
            const push = force * 50;
            const targetX = p.originX + Math.cos(angle) * push;
            const targetY = p.originY + Math.sin(angle) * push;

            p.vx += (targetX - p.x) * 0.22;
            p.vy += (targetY - p.y) * 0.22;
          } else {
            p.vx += (p.originX - p.x) * 0.12;
            p.vy += (p.originY - p.y) * 0.12;
          }
        } else {
          // Smooth return to base resting coordinates
          p.vx += (p.originX - p.x) * 0.12;
          p.vy += (p.originY - p.y) * 0.12;
        }

        // Viscosity damping
        p.vx *= 0.78;
        p.vy *= 0.78;
        p.x += p.vx;
        p.y += p.vy;

        // Smooth color transition based on displacement
        const disp = Math.hypot(p.x - p.originX, p.y - p.originY);
        const t = Math.min(1, disp / 22);

        const r = Math.round(baseR + (activeR - baseR) * t);
        const g = Math.round(baseG + (activeG - baseG) * t);
        const b = Math.round(baseB + (activeB - baseB) * t);

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
        ctx.fill();
      }

      ctx.restore();
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('mouseleave', handlePointerLeave);
      resizeObserver.disconnect();
    };
  }, [isDark]);

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260px] sm:h-[320px] md:h-[380px] lg:h-[430px] overflow-hidden select-none cursor-pointer flex items-end justify-center"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full block"
      />
    </div>
  );
}
