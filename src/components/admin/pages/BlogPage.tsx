import { useState } from 'react';
import { useBlogPosts, useDeleteBlogPost } from '@/hooks/queries';
import { useUIStore } from '@/stores/uiStore';
import { DataTable, type Column } from '../shared/DataTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { StatusBadge } from '../shared/StatusBadge';
import { Clock } from 'lucide-react';
import type { BlogPost } from '@/types/admin.types';

export function BlogPage() {
  const { data: posts = [], isLoading } = useBlogPosts();
  const deleteMutation = useDeleteBlogPost();
  const openModal = useUIStore((s) => s.openModal);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: Column<BlogPost>[] = [
    {
      key: 'title',
      label: 'Article',
      render: (item) => (
        <div className="flex items-center gap-3">
          {item.imageUrl && (
            <img src={item.imageUrl} alt={item.title} className="w-12 h-8 rounded-lg object-cover shrink-0" />
          )}
          <div className="min-w-0">
            <p className="font-black uppercase tracking-tight text-sm truncate">{item.title}</p>
            <p className="text-xs text-muted-foreground italic truncate">{item.excerpt?.slice(0, 60)}...</p>
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
      key: 'published',
      label: 'Statut',
      render: (item) => (
        <StatusBadge
          label={item.published ? 'Publie' : 'Brouillon'}
          variant={item.published ? 'success' : 'warning'}
        />
      ),
    },
    {
      key: 'readTime',
      label: 'Lecture',
      render: (item) => (
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Clock className="w-3 h-3" /> {item.readTime || '-'}
        </span>
      ),
    },
  ];

  const handleEdit = (item: BlogPost) => {
    openModal('blog', item);
  };

  const handleDelete = (item: BlogPost) => {
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
        data={posts}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
        emptyMessage="Aucun article. Cliquez sur 'Nouveau' pour commencer."
      />
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Supprimer l'article"
        message="L'article sera definitivement supprime."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
