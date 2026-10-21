import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 text-center bg-background text-foreground">
      <h1 className="text-6xl font-bold tracking-tight mb-4">404</h1>
      <p className="text-lg text-muted-foreground mb-8">Page non trouvée</p>
      <Link
        href="/"
        className="px-6 py-2.5 rounded-full border border-border bg-foreground text-background font-medium hover:opacity-90 transition-opacity"
      >
        Retour à l'accueil
      </Link>
    </div>
  );
}
