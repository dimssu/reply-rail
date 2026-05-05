/* eslint-disable @next/next/no-img-element */
export function Avatar({
  src,
  name,
  size = 28,
}: {
  src: string;
  name: string;
  size?: number;
}) {
  const initials = name
    .split(" ")
    .map((s) => s[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  return (
    <span
      className="relative inline-flex items-center justify-center rounded-full bg-stone-100 border border-border overflow-hidden text-[10px] font-medium text-stone-600 shrink-0"
      style={{ width: size, height: size }}
    >
      <span className="absolute inset-0 flex items-center justify-center">{initials}</span>
      <img
        src={src}
        alt={name}
        width={size}
        height={size}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </span>
  );
}
