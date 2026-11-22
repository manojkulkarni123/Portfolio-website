import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-2xl px-5 py-32 font-mono">
      <p className="text-sm text-muted"><span className="text-accent">$</span> kubectl get page</p>
      <p className="mt-2 text-sm text-muted">NAME&nbsp;&nbsp;&nbsp;&nbsp;READY&nbsp;&nbsp;&nbsp;STATUS</p>
      <p className="text-sm">this&nbsp;&nbsp;&nbsp;&nbsp;0/1&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span className="text-red-400">NotFound</span></p>
      <h1 className="mt-8 font-sans text-4xl font-semibold">404: nothing here.</h1>
      <Link href="/" className="mt-6 inline-block text-accent hover:underline">← back home</Link>
    </div>
  );
}
