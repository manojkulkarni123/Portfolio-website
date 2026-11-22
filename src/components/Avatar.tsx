/* eslint-disable @next/next/no-img-element */
export default function Avatar({
  src,
  initials,
  className = "size-12",
  textClass = "text-sm",
}: {
  src?: string;
  initials: string;
  className?: string;
  textClass?: string;
}) {
  return (
    <span className={`relative flex shrink-0 overflow-hidden rounded-full border border-line bg-secondary ${className}`}>
      {src ? (
        <img src={src} alt="" className="h-full w-full object-cover" />
      ) : (
        <span className={`flex h-full w-full items-center justify-center font-semibold ${textClass}`}>{initials}</span>
      )}
    </span>
  );
}
