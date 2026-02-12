import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';
import { appointmentsApi } from '@/services/api';
import type { Appointment, AppointmentStatus } from '@/types/admin.types';

// Query Keys
export const appointmentKeys = {
  all: ['appointments'] as const,
  lists: () => [...appointmentKeys.all, 'list'] as const,
  upcoming: () => [...appointmentKeys.all, 'upcoming'] as const,
  details: () => [...appointmentKeys.all, 'detail'] as const,
  detail: (id: string) => [...appointmentKeys.details(), id] as const,
  available: (date: string) => [...appointmentKeys.all, 'available', date] as const,
};

// Get All Appointments
export function useAppointments() {
  return useQuery({
    queryKey: appointmentKeys.lists(),
    queryFn: () => appointmentsApi.getAll(),
    staleTime: 1 * 60 * 1000,
  });
}

// Get Upcoming Appointments
export function useUpcomingAppointments() {
  return useQuery({
    queryKey: appointmentKeys.upcoming(),
    queryFn: () => appointmentsApi.getUpcoming(),
    staleTime: 1 * 60 * 1000,
  });
}

// Get Available Slots
export function useAvailableSlots(date: string) {
  return useQuery({
    queryKey: appointmentKeys.available(date),
    queryFn: () => appointmentsApi.getAvailableSlots(date),
    enabled: !!date,
    staleTime: 5 * 60 * 1000,
  });
}

// Create Appointment
export function useCreateAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: {
      name: string;
      email: string;
      subject: string;
      urgency?: 'non-urgent' | 'urgent';
      date: string;
      time: string;
    }) => appointmentsApi.create(data),
    onSuccess: (newAppointment) => {
      queryClient.invalidateQueries({ queryKey: appointmentKeys.lists() });
      queryClient.invalidateQueries({ queryKey: appointmentKeys.upcoming() });
      // Invalidate available slots for the date
      queryClient.invalidateQueries({
        queryKey: appointmentKeys.available(newAppointment.date),
      });
      toast.success('Rendez-vous reserve avec succes');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la reservation');
    },
  });
}

// Update Appointment Status
export function useUpdateAppointmentStatus() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: AppointmentStatus }) =>
      appointmentsApi.updateStatus(id, status),
    onSuccess: (updated) => {
      queryClient.setQueryData<Appointment[]>(appointmentKeys.lists(), (old) =>
        old?.map((a) => (a.id === updated.id ? updated : a))
      );
      queryClient.invalidateQueries({ queryKey: appointmentKeys.upcoming() });
      toast.success('Statut mis a jour');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la mise a jour');
    },
  });
}

// Delete Appointment
export function useDeleteAppointment() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => appointmentsApi.delete(id),
    onSuccess: (_, deletedId) => {
      queryClient.setQueryData<Appointment[]>(appointmentKeys.lists(), (old) =>
        old?.filter((a) => a.id !== deletedId)
      );
      queryClient.invalidateQueries({ queryKey: appointmentKeys.upcoming() });
      toast.success('Rendez-vous supprime');
    },
    onError: (error: Error) => {
      toast.error(error.message || 'Erreur lors de la suppression');
    },
  });
}
