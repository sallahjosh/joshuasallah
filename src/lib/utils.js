// Utility: merge class names (mirrors shadcn cn() without clsx/twMerge deps)
export function cn(...classes) {
  return classes.filter(Boolean).join(' ');
}
