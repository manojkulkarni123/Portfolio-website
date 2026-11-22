import Link from "next/link";

export default function NotFound() {
  return (
    <section className="py-24">
      <p className="font-mono text-xs text-muted">$ kubectl get page → <span className="text-(--danger)">NotFound</span></p>
      <h1 className="mt-4 text-3xl font-bold tracking-tighter sm:text-5xl">404: nothing here.</h1>
      <Link href="/" className="mt-6 inline-block text-sm underline underline-offset-4">back home</Link>
    </section>
  );
}
