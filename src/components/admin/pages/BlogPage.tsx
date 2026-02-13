import { useState, useEffect } from 'react';
import { useBlogPosts, useDeleteBlogPost } from '@/hooks/queries';
import { useUIStore, selectModal } from '@/stores/uiStore';
import { DataTable, type Column } from '../shared/DataTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { StatusBadge } from '../shared/StatusBadge';
import { BlogEditorPage } from './BlogEditorPage';
import { Clock } from 'lucide-react';
import type { BlogPost } from '@/types/admin.types';

export function BlogPage() {
  const { data: posts = [], isLoading } = useBlogPosts();
  const deleteMutation = useDeleteBlogPost();
  const modal = useUIStore(selectModal);
  const closeModal = useUIStore((s) => s.closeModal);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [editorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);

  // Intercept openModal('blog') from header/dashboard quick actions
  useEffect(() => {
    if (modal.isOpen && modal.type === 'blog') {
      setEditingPost((modal.data as BlogPost) || null);
      setEditorOpen(true);
      closeModal();
    }
  }, [modal.isOpen, modal.type, modal.data, closeModal]);

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
            <p className="font-medium text-[13px] text-zinc-800 dark:text-zinc-200 truncate">{item.title}</p>
            <p className="text-[11px] text-zinc-400 truncate">{item.excerpt?.slice(0, 60)}...</p>
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
        <span className="text-[11px] text-zinc-400 flex items-center gap-1">
          <Clock className="w-3 h-3" /> {item.readTime || '-'}
        </span>
      ),
    },
  ];

  const handleCreate = () => {
    setEditingPost(null);
    setEditorOpen(true);
  };

  const handleEdit = (item: BlogPost) => {
    setEditingPost(item);
    setEditorOpen(true);
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

  // Show editor page
  if (editorOpen) {
    return (
      <BlogEditorPage
        initialData={editingPost}
        onBack={() => setEditorOpen(false)}
      />
    );
  }

  return (
    <>
      {/* Create button at top */}
      <div className="flex justify-end mb-4">
        <button
          onClick={handleCreate}
          className="h-9 px-4 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors flex items-center gap-1.5"
        >
          + Nouvel article
        </button>
      </div>

      <DataTable
        columns={columns}
        data={posts}
        isLoading={isLoading}
        onEdit={handleEdit}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
        emptyMessage="Aucun article. Cliquez sur 'Nouvel article' pour commencer."
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
