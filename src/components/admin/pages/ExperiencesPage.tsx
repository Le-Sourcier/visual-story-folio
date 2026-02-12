import { useState } from 'react';
import { useExperiences, useDeleteExperience } from '@/hooks/queries';
import { useUIStore } from '@/stores/uiStore';
import { DataTable, type Column } from '../shared/DataTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { StatusBadge } from '../shared/StatusBadge';
import type { Experience } from '@/types/admin.types';

export function ExperiencesPage() {
  const { data: experiences = [], isLoading } = useExperiences();
  const deleteMutation = useDeleteExperience();
  const openModal = useUIStore((s) => s.openModal);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: Column<Experience>[] = [
    {
      key: 'title',
      label: 'Poste / Entreprise',
      render: (item) => (
        <div>
          <p className="font-black uppercase tracking-tight text-sm">{item.title}</p>
          <p className="text-xs text-muted-foreground italic">{item.company}</p>
        </div>
      ),
    },
    {
      key: 'location',
      label: 'Lieu',
      render: (item) => (
        <span className="text-sm">{item.location || '-'}</span>
      ),
    },
    {
      key: 'dates',
      label: 'Periode',
      render: (item) => <StatusBadge label={item.dates} variant="neutral" />,
    },
    {
      key: 'stack',
      label: 'Stack',
      render: (item) => (
        <div className="flex flex-wrap gap-1 max-w-[180px]">
          {(item.stack || []).slice(0, 3).map((tech, i) => (
            <span key={i} className="px-2 py-0.5 bg-secondary rounded-md text-[10px] font-bold">{tech}</span>
          ))}
          {(item.stack || []).length > 3 && (
            <span className="px-2 py-0.5 bg-secondary rounded-md text-[10px] font-bold text-muted-foreground">
              +{item.stack!.length - 3}
            </span>
          )}
        </div>
      ),
    },
  ];

  const handleEdit = (item: Experience) => {
    openModal('experience', item);
  };

  const handleDelete = (item: Experience) => {
    setDeleteId(item.id);
  };

  const confirmDelete = () => {
    if (deleteId) {
      deleteMutation.mutate(deleteId, {
        onSuccess: () => setDeleteId(null),
      });
    }
  };

  return (
    <>
      <DataTable
        columns={columns}
        data={experiences}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
        emptyMessage="Aucune experience. Cliquez sur 'Nouveau' pour commencer."
      />
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Supprimer l'experience"
        message="Cette action est irreversible."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
