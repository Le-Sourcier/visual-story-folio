import { useState } from 'react';
import { useContacts, useDeleteContact, useMarkAsRead } from '@/hooks/queries';
import { DataTable, type Column } from '../shared/DataTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { StatusBadge } from '../shared/StatusBadge';
import { Mail, MailOpen, ExternalLink } from 'lucide-react';
import type { Contact } from '@/types/admin.types';

export function ContactsPage() {
  const { data: contacts = [], isLoading } = useContacts();
  const deleteMutation = useDeleteContact();
  const markAsReadMutation = useMarkAsRead();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [viewingContact, setViewingContact] = useState<Contact | null>(null);

  const columns: Column<Contact>[] = [
    {
      key: 'name',
      label: 'Expediteur',
      render: (item) => (
        <div className="flex items-center gap-3">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${item.read ? 'bg-secondary' : 'bg-primary/10'}`}>
            {item.read ? <MailOpen className="w-4 h-4 text-muted-foreground" /> : <Mail className="w-4 h-4 text-primary" />}
          </div>
          <div>
            <p className={`text-sm ${item.read ? 'font-medium' : 'font-black'}`}>{item.name}</p>
            <p className="text-xs text-muted-foreground">{item.email}</p>
          </div>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Sujet',
      render: (item) => (
        <p className={`text-sm truncate max-w-[200px] ${item.read ? '' : 'font-bold'}`}>
          {item.subject || 'Sans sujet'}
        </p>
      ),
    },
    {
      key: 'message',
      label: 'Apercu',
      render: (item) => (
        <p className="text-xs text-muted-foreground truncate max-w-[200px]">
          {item.message?.slice(0, 80)}...
        </p>
      ),
    },
    {
      key: 'read',
      label: 'Statut',
      render: (item) => (
        <StatusBadge
          label={item.read ? 'Lu' : 'Non lu'}
          variant={item.read ? 'neutral' : 'info'}
        />
      ),
    },
  ];

  const handleView = (item: Contact) => {
    setViewingContact(item);
    if (!item.read) {
      markAsReadMutation.mutate(item.id);
    }
  };

  const handleDelete = (item: Contact) => {
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
        data={contacts}
        isLoading={isLoading}
        onView={handleView}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
        emptyMessage="Aucun message recu."
      />

      {/* Contact detail modal */}
      {viewingContact && (
        <div
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100] flex items-center justify-center p-4"
          onClick={() => setViewingContact(null)}
        >
          <div
            className="bg-card border border-border w-full max-w-2xl rounded-[2.5rem] p-8 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-black uppercase tracking-tight">{viewingContact.name}</h3>
                <a href={`mailto:${viewingContact.email}`} className="text-sm text-primary flex items-center gap-1 hover:underline">
                  {viewingContact.email} <ExternalLink className="w-3 h-3" />
                </a>
              </div>
              <button onClick={() => setViewingContact(null)} className="p-2 hover:bg-secondary rounded-full">
                <span className="text-lg">&times;</span>
              </button>
            </div>
            {viewingContact.subject && (
              <p className="text-sm font-bold mb-4">Sujet : {viewingContact.subject}</p>
            )}
            <div className="bg-secondary/30 rounded-2xl p-6">
              <p className="text-sm leading-relaxed whitespace-pre-wrap">{viewingContact.message}</p>
            </div>
            <p className="text-xs text-muted-foreground mt-4">
              Recu le {new Date(viewingContact.createdAt).toLocaleDateString('fr-FR', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
              })}
            </p>
          </div>
        </div>
      )}

      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Supprimer le message"
        message="Ce message sera definitivement supprime."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
