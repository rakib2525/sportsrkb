type SkeletonProps = {
  className?: string;
  label?: string;
};

export function Skeleton({ className = "h-4 w-full", label = "Loading" }: SkeletonProps) {
  return (
    <div
      className={`skeleton-shimmer rounded ${className}`}
      role="status"
      aria-label={label}
    />
  );
}
