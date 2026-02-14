import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore, selectModal } from '@/stores/uiStore';
import { ProjectForm } from '../forms/ProjectForm';
import { TestimonialForm } from '../forms/TestimonialForm';

export function AdminModal() {
  const modal = useUIStore(selectModal);
  const closeModal = useUIStore((s) => s.closeModal);

  // Blog and Experience are now handled by full-page editors, not modal
  if (!modal.isOpen || !modal.type || modal.type === 'blog' || modal.type === 'experience') return null;

  const renderForm = () => {
    switch (modal.type) {
      case 'project':
        return <ProjectForm initialData={modal.data as any} onClose={closeModal} />;
      case 'testimonial':
        return <TestimonialForm initialData={modal.data as any} onClose={closeModal} />;
      default:
        return null;
    }
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-[2px] z-[100] flex items-start justify-center p-4 pt-[5vh] overflow-y-auto"
        onClick={closeModal}
      >
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          onClick={(e) => e.stopPropagation()}
          className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 w-full max-w-3xl rounded-xl p-6 md:p-8 shadow-xl my-8"
        >
          {renderForm()}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
