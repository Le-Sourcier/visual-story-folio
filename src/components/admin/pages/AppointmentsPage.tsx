import { useState } from 'react';
import { useAppointments, useDeleteAppointment, useUpdateAppointmentStatus } from '@/hooks/queries';
import { DataTable, type Column } from '../shared/DataTable';
import { ConfirmDialog } from '../shared/ConfirmDialog';
import { StatusBadge } from '../shared/StatusBadge';
import type { Appointment, AppointmentStatus } from '@/types/admin.types';

const statusVariantMap: Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'> = {
  pending: 'warning',
  confirmed: 'success',
  cancelled: 'danger',
  completed: 'info',
};

const statusLabels: Record<string, string> = {
  pending: 'En attente',
  confirmed: 'Confirme',
  cancelled: 'Annule',
  completed: 'Termine',
};

export function AppointmentsPage() {
  const { data: appointments = [], isLoading } = useAppointments();
  const deleteMutation = useDeleteAppointment();
  const updateStatusMutation = useUpdateAppointmentStatus();
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const columns: Column<Appointment>[] = [
    {
      key: 'name',
      label: 'Client',
      render: (item) => (
        <div>
          <p className="font-bold text-sm">{item.name}</p>
          <p className="text-xs text-muted-foreground">{item.email}</p>
        </div>
      ),
    },
    {
      key: 'subject',
      label: 'Sujet',
      render: (item) => <span className="text-sm">{item.subject}</span>,
    },
    {
      key: 'date',
      label: 'Date & Heure',
      render: (item) => (
        <div>
          <p className="text-sm font-bold">{item.date}</p>
          <p className="text-xs text-muted-foreground">{item.time}</p>
        </div>
      ),
    },
    {
      key: 'urgency',
      label: 'Urgence',
      render: (item) => (
        <StatusBadge
          label={item.urgency === 'urgent' ? 'Urgent' : 'Normal'}
          variant={item.urgency === 'urgent' ? 'danger' : 'neutral'}
        />
      ),
    },
    {
      key: 'status',
      label: 'Statut',
      render: (item) => (
        <select
          value={item.status}
          onChange={(e) =>
            updateStatusMutation.mutate({
              id: item.id,
              status: e.target.value as AppointmentStatus,
            })
          }
          className="bg-transparent border border-input rounded-lg px-2 py-1 text-xs font-bold cursor-pointer"
        >
          <option value="pending">En attente</option>
          <option value="confirmed">Confirme</option>
          <option value="cancelled">Annule</option>
          <option value="completed">Termine</option>
        </select>
      ),
    },
  ];

  const handleDelete = (item: Appointment) => {
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
        data={appointments}
        isLoading={isLoading}
        onDelete={handleDelete}
        getItemId={(item) => item.id}
        emptyMessage="Aucun rendez-vous."
      />
      <ConfirmDialog
        isOpen={!!deleteId}
        onClose={() => setDeleteId(null)}
        onConfirm={confirmDelete}
        title="Supprimer le rendez-vous"
        message="Ce rendez-vous sera definitivement supprime."
        isLoading={deleteMutation.isPending}
      />
    </>
  );
}
