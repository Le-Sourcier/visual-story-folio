import { Edit2, Trash2, Eye } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface Column<T> {
  key: string;
  label: string;
  render?: (item: T) => React.ReactNode;
  className?: string;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  isLoading?: boolean;
  onEdit?: (item: T) => void;
  onDelete?: (item: T) => void;
  onToggleVisibility?: (item: T) => void;
  onView?: (item: T) => void;
  getItemId: (item: T) => string;
  emptyMessage?: string;
  showActions?: boolean;
}

export function DataTable<T>({
  columns,
  data,
  isLoading,
  onEdit,
  onDelete,
  onToggleVisibility,
  onView,
  getItemId,
  emptyMessage = 'Aucun element trouve.',
  showActions = true,
}: DataTableProps<T>) {
  if (isLoading) {
    return (
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 overflow-hidden">
        <div className="p-6 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="flex gap-6 animate-pulse">
              <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-1/3" />
              <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-1/4" />
              <div className="h-3 bg-zinc-100 dark:bg-zinc-800 rounded-full w-1/5" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-zinc-100 dark:border-zinc-800">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className={cn(
                    'px-5 py-3 text-left text-[11px] font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider',
                    col.className
                  )}
                >
                  {col.label}
                </th>
              ))}
              {showActions && (
                <th className="px-5 py-3 text-right text-[11px] font-semibold text-zinc-500 dark:text-zinc-500 uppercase tracking-wider w-[120px]">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (showActions ? 1 : 0)}
                  className="px-5 py-16 text-center"
                >
                  <p className="text-sm text-zinc-400 dark:text-zinc-600">{emptyMessage}</p>
                </td>
              </tr>
            ) : (
              data.map((item, idx) => (
                <tr
                  key={getItemId(item)}
                  className={cn(
                    'group transition-colors hover:bg-zinc-50 dark:hover:bg-zinc-800/50',
                    idx !== data.length - 1 && 'border-b border-zinc-50 dark:border-zinc-800/50'
                  )}
                >
                  {columns.map((col) => (
                    <td key={col.key} className={cn('px-5 py-3.5', col.className)}>
                      {col.render ? col.render(item) : String((item as Record<string, unknown>)[col.key] ?? '')}
                    </td>
                  ))}
                  {showActions && (
                    <td className="px-5 py-3.5">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        {onView && (
                          <button
                            onClick={() => onView(item)}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-zinc-700 hover:bg-zinc-100 dark:hover:text-zinc-300 dark:hover:bg-zinc-800 transition-colors"
                            title="Voir"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {onToggleVisibility && (
                          <button
                            onClick={() => onToggleVisibility(item)}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-500/10 transition-colors"
                            title="Visibilite"
                          >
                            <Eye className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {onEdit && (
                          <button
                            onClick={() => onEdit(item)}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-500/10 transition-colors"
                            title="Modifier"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                        {onDelete && (
                          <button
                            onClick={() => onDelete(item)}
                            className="p-1.5 rounded-md text-zinc-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                            title="Supprimer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        )}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
