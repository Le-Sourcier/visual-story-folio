import { useState } from 'react';
import { useProjects, useDeleteProject } from '@/hooks/queries';
import { useUIStore } from '@/stores/uiStore';
import { DataTable, type Column } from '../shared/DataTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { StatusBadge } from '../shared/StatusBadge';
import type { Project } from '@/types/admin.types';

export function ProjectsPage() {
  const { data: projects = [], isLoading } = useProjects();
  const deleteMutation = useDeleteProject();
  const openModal = useUIStore((s) => s.openModal);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: Column<Project>[] = [
    {
      key: 'title',
      label: 'Projet',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.image && (
            <img src={item.image} alt={item.title} className="w-10 h-10 rounded-xl object-cover shrink-0" />
          )}
          <div className="min-w-0">
            <p className="font-black uppercase tracking-tight text-sm truncate">{item.title}</p>
            <p className="text-xs text-muted-foreground italic truncate">{item.description?.slice(0, 60)}...</p>
          </div>
        </div>
      ),
    },
    {
      key: 'category',
      label: 'Categorie',
      render: (item) => <StatusBadge label={item.category} variant="info" />,
    },
    {
      key: 'technologies',
      label: 'Stack',
      render: (item) => (
        <div className="flex flex-wrap gap-1 max-w-[200px]">
          {(item.technologies || []).slice(0, 3).map((tech, i) => (
            <span key={i} className="px-2 py-0.5 bg-secondary rounded-md text-[10px] font-bold">{tech}</span>
          ))}
          {(item.technologies || []).length > 3 && (
            <span className="px-2 py-0.5 bg-secondary rounded-md text-[10px] font-bold text-muted-foreground">
              +{item.technologies!.length - 3}
            </span>
          )}
        </div>
      ),
    },
  ];

  const handleEdit = (item: Project) => {
    openModal('project', item);
  };

  const handleDelete = (item: Project) => {
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
        data={projects}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
        emptyMessage="Aucun projet. Cliquez sur 'Nouveau' pour commencer."
      />
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Supprimer le projet"
        message="Cette action est irreversible. Le projet sera definitivement supprime."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
