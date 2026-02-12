import { cn } from '@/lib/utils';

type BadgeVariant = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

interface StatusBadgeProps {
  label: string;
  variant?: BadgeVariant;
}

const variantStyles: Record<BadgeVariant, string> = {
  success: 'text-emerald-700 bg-emerald-50 dark:text-emerald-400 dark:bg-emerald-500/10',
  warning: 'text-amber-700 bg-amber-50 dark:text-amber-400 dark:bg-amber-500/10',
  danger: 'text-red-700 bg-red-50 dark:text-red-400 dark:bg-red-500/10',
  info: 'text-blue-700 bg-blue-50 dark:text-blue-400 dark:bg-blue-500/10',
  neutral: 'text-zinc-600 bg-zinc-100 dark:text-zinc-400 dark:bg-zinc-800',
};

export function StatusBadge({ label, variant = 'neutral' }: StatusBadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-0.5 text-[11px] font-medium',
        variantStyles[variant]
      )}
    >
      {label}
    </span>
  );
}
