import { useState, useRef, useCallback, useEffect } from 'react';
import {
  ArrowLeft, Save, Eye, EyeOff, Loader2, CheckCircle2,
  Bold, Italic, Heading1, Heading2, Heading3, Code, CodeSquare,
  Image, Link2, List, ListOrdered, Quote, Minus, Table,
  Plus, Trash2, Send, FileText,
} from 'lucide-react';
import { useCreateBlogPost, useUpdateBlogPost } from '@/hooks/queries';
import { useUIStore } from '@/stores/uiStore';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import type { BlogPost, BlogPostFormData } from '@/types/admin.types';

// ======================== MARKDOWN TOOLBAR ========================

interface ToolbarAction {
  icon: React.ElementType;
  label: string;
  action: (insert: InsertFn) => void;
  separator?: boolean;
}

type InsertFn = (before: string, after?: string, placeholder?: string) => void;

const toolbarActions: ToolbarAction[] = [
  { icon: Bold, label: 'Gras (Ctrl+B)', action: (ins) => ins('**', '**', 'texte en gras') },
  { icon: Italic, label: 'Italique (Ctrl+I)', action: (ins) => ins('*', '*', 'texte en italique') },
  { icon: Heading1, label: 'Titre 1', action: (ins) => ins('\n# ', '', 'Titre') },
  { icon: Heading2, label: 'Titre 2', action: (ins) => ins('\n## ', '', 'Sous-titre') },
  { icon: Heading3, label: 'Titre 3', action: (ins) => ins('\n### ', '', 'Section') },
  { icon: Quote, label: 'Citation', action: (ins) => ins('\n> ', '', 'Citation...'), separator: true },
  { icon: Code, label: 'Code inline `code`', action: (ins) => ins('`', '`', 'code') },
  {
    icon: CodeSquare, label: 'Bloc de code ```', action: (ins) => ins(
      '\n\n```javascript\n', '\n```\n\n', '// Votre code ici\nconsole.log("Hello World");'
    ),
  },
  { icon: Image, label: 'Image', action: (ins) => ins('\n![', '](https://url-de-image.com)\n', 'description'), separator: true },
  { icon: Link2, label: 'Lien', action: (ins) => ins('[', '](https://)', 'texte du lien') },
  { icon: List, label: 'Liste', action: (ins) => ins('\n- ', '', 'Element') },
  { icon: ListOrdered, label: 'Liste numerotee', action: (ins) => ins('\n1. ', '', 'Element') },
  { icon: Minus, label: 'Separateur', action: (ins) => ins('\n\n---\n\n', '', ''), separator: true },
  {
    icon: Table, label: 'Tableau', action: (ins) => ins(
      '\n\n| Colonne 1 | Colonne 2 | Colonne 3 |\n|-----------|-----------|----------|\n| ', ' | | |\n\n', 'donnee'
    ),
  },
];

// ======================== MARKDOWN PREVIEW ========================
// Uses shared MarkdownRenderer component
import { MarkdownRenderer } from '@/components/shared/MarkdownRenderer';

// ======================== BLOG CATEGORIES ========================
const blogCategories = ['Tech', 'Design', 'Business', 'Tutoriel', 'Actualite', 'Retour d\'experience'];

// ======================== MAIN COMPONENT ========================

interface BlogEditorPageProps {
  initialData?: BlogPost | null;
  onBack: () => void;
}

export function BlogEditorPage({ initialData, onBack }: BlogEditorPageProps) {
  const isEditing = !!initialData;
  const createMutation = useCreateBlogPost();
  const updateMutation = useUpdateBlogPost();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [saved, setSaved] = useState(false);

  const [formData, setFormData] = useState<BlogPostFormData>(() => {
    if (initialData) {
      return {
        title: initialData.title,
        excerpt: initialData.excerpt,
        content: initialData.content,
        category: initialData.category,
        imageUrl: initialData.imageUrl || '',
        tags: initialData.tags?.length ? initialData.tags : [''],
        published: initialData.published,
      };
    }
    return {
      title: '',
      excerpt: '',
      content: '',
      category: 'Tech',
      imageUrl: '',
      tags: [''],
      published: false,
    };
  });

  // Insert markdown at cursor
  const insertMarkdown: InsertFn = useCallback((before, after = '', placeholder = '') => {
    const ta = textareaRef.current;
    if (!ta) return;

    const start = ta.selectionStart;
    const end = ta.selectionEnd;
    const selectedText = ta.value.substring(start, end);
    const textToInsert = selectedText || placeholder;
    const newValue = ta.value.substring(0, start) + before + textToInsert + after + ta.value.substring(end);

    setFormData((prev) => ({ ...prev, content: newValue }));

    // Restore cursor position
    requestAnimationFrame(() => {
      ta.focus();
      const cursorPos = start + before.length + textToInsert.length;
      ta.setSelectionRange(
        selectedText ? cursorPos + after.length : start + before.length,
        selectedText ? cursorPos + after.length : start + before.length + textToInsert.length
      );
    });
  }, []);

  // Keyboard shortcuts
  const handleEditorKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.ctrlKey || e.metaKey) {
      switch (e.key) {
        case 'b':
          e.preventDefault();
          insertMarkdown('**', '**', 'texte en gras');
          break;
        case 'i':
          e.preventDefault();
          insertMarkdown('*', '*', 'texte en italique');
          break;
        case 'k':
          e.preventDefault();
          insertMarkdown('[', '](https://)', 'texte du lien');
          break;
        case 's':
          e.preventDefault();
          handleSave(false);
          break;
      }
    }
    // Tab indent in code
    if (e.key === 'Tab') {
      e.preventDefault();
      insertMarkdown('  ', '', '');
    }
  };

  const handleChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleTagChange = (index: number, value: string) => {
    const tags = [...(formData.tags || [])];
    tags[index] = value;
    setFormData((prev) => ({ ...prev, tags }));
  };

  const addTag = () => setFormData((prev) => ({ ...prev, tags: [...(prev.tags || []), ''] }));
  const removeTag = (i: number) => setFormData((prev) => ({ ...prev, tags: (prev.tags || []).filter((_, idx) => idx !== i) }));

  const handleSave = (publish: boolean) => {
    if (!formData.title.trim()) {
      toast.error('Le titre est obligatoire');
      return;
    }
    if (publish && !formData.content.trim()) {
      toast.error('Ajoutez du contenu avant de publier');
      return;
    }

    const cleaned: Record<string, unknown> = {
      title: formData.title.trim(),
      excerpt: formData.excerpt?.trim() || '',
      content: formData.content,
      category: formData.category,
      published: publish ? true : formData.published,
    };
    // Only include imageUrl if it's a valid URL
    if (formData.imageUrl?.trim()) {
      cleaned.imageUrl = formData.imageUrl.trim();
    }
    // Only include tags if non-empty
    const tags = formData.tags?.filter((t) => t.trim()) || [];
    if (tags.length > 0) {
      cleaned.tags = tags;
    }

    const options = {
      onSuccess: () => {
        setSaved(true);
        toast.success(publish ? 'Article publie !' : 'Article enregistre');
        setTimeout(() => setSaved(false), 2000);
        if (!isEditing) setTimeout(onBack, 500);
      },
    };

    if (isEditing && initialData) {
      updateMutation.mutate({ id: initialData.id, data: cleaned }, options);
    } else {
      createMutation.mutate(cleaned, options);
    }
  };

  const isPending = createMutation.isPending || updateMutation.isPending;
  const wordCount = formData.content.split(/\s+/).filter(Boolean).length;
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  return (
    <div className="space-y-0">
      {/* Top bar */}
      <div className="flex items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 text-zinc-500" />
          </button>
          <div>
            <h1 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              {isEditing ? 'Modifier l\'article' : 'Nouvel article'}
            </h1>
            <p className="text-[11px] text-zinc-400">
              {wordCount} mots - ~{readTime} min de lecture
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className={cn(
              'h-8 px-3 rounded-lg text-[11px] font-medium flex items-center gap-1.5 border transition-colors',
              showPreview
                ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 border-transparent'
                : 'border-zinc-200 dark:border-zinc-800 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
            )}
          >
            {showPreview ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
            {showPreview ? 'Editeur' : 'Apercu'}
          </button>

          <button
            onClick={() => handleSave(false)}
            disabled={isPending}
            className={cn(
              'h-8 px-4 rounded-lg text-[11px] font-semibold flex items-center gap-1.5 transition-all disabled:opacity-60',
              saved
                ? 'bg-emerald-600 text-white'
                : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
            )}
          >
            {isPending ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : saved ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Save className="w-3.5 h-3.5" />}
            {saved ? 'Enregistre' : 'Brouillon'}
          </button>

          <button
            onClick={() => handleSave(true)}
            disabled={isPending}
            className="h-8 px-4 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[11px] font-semibold flex items-center gap-1.5 hover:bg-zinc-800 dark:hover:bg-zinc-100 transition-colors disabled:opacity-60"
          >
            <Send className="w-3.5 h-3.5" />
            Publier
          </button>
        </div>
      </div>

      <div className="flex flex-col xl:flex-row gap-5">
        {/* Left: Editor */}
        <div className="flex-1 min-w-0 space-y-4">
          {/* Title */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 p-4">
            <label className="block text-[11px] font-medium text-zinc-400 mb-2">Titre de l'article</label>
            <input
              value={formData.title}
              onChange={(e) => handleChange('title', e.target.value)}
              placeholder="Ex: Comment deployer une app React en production"
              className="w-full text-xl font-semibold tracking-tight bg-transparent outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-600 text-zinc-900 dark:text-zinc-100"
            />
          </div>

          {/* Cover image */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 overflow-hidden">
            {formData.imageUrl ? (
              <div className="relative group">
                <img src={formData.imageUrl} alt="Cover" className="w-full h-48 object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button
                    onClick={() => {
                      const url = prompt('URL de l\'image de couverture :', formData.imageUrl);
                      if (url !== null) handleChange('imageUrl', url);
                    }}
                    className="px-3 py-1.5 bg-white rounded-lg text-xs font-semibold text-zinc-900"
                  >
                    Changer
                  </button>
                  <button
                    onClick={() => handleChange('imageUrl', '')}
                    className="px-3 py-1.5 bg-red-500 rounded-lg text-xs font-semibold text-white"
                  >
                    Supprimer
                  </button>
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  const url = prompt('URL de l\'image de couverture :');
                  if (url) handleChange('imageUrl', url);
                }}
                className="w-full h-32 flex flex-col items-center justify-center gap-2 text-zinc-400 hover:text-zinc-500 hover:bg-zinc-50 dark:hover:bg-zinc-800/50 transition-colors"
              >
                <Image className="w-6 h-6" />
                <span className="text-[12px] font-medium">Ajouter une image de couverture</span>
              </button>
            )}
          </div>

          {/* Excerpt */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 p-4">
            <label className="block text-[11px] font-medium text-zinc-400 mb-2">Extrait / Resume</label>
            <textarea
              value={formData.excerpt}
              onChange={(e) => handleChange('excerpt', e.target.value)}
              placeholder="Un court resume qui apparaitra dans la liste des articles..."
              rows={2}
              className="w-full bg-transparent text-sm text-zinc-700 dark:text-zinc-300 resize-none outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700"
            />
          </div>

          {/* Content editor */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 overflow-hidden">
            {/* Toolbar */}
            <div className="flex items-center gap-0.5 px-3 py-2 border-b border-zinc-100 dark:border-zinc-800 overflow-x-auto">
              {toolbarActions.map((action, i) => {
                const isCodeInline = action.label.includes('inline');
                const isCodeBlock = action.label.includes('```');

                return (
                  <div key={i} className="flex items-center">
                    {action.separator && i > 0 && (
                      <div className="w-px h-5 bg-zinc-200 dark:bg-zinc-800 mx-1" />
                    )}
                    <button
                      onClick={() => action.action(insertMarkdown)}
                      title={action.label}
                      className={`flex items-center gap-1 rounded-md text-zinc-400 hover:text-zinc-700 dark:hover:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors ${
                        isCodeInline || isCodeBlock ? 'px-2 py-1' : 'p-1.5'
                      }`}
                    >
                      <action.icon className="w-4 h-4" />
                      {isCodeInline && <span className="text-[10px] font-mono">{"`"}</span>}
                      {isCodeBlock && <span className="text-[10px] font-mono">{"```"}</span>}
                    </button>
                  </div>
                );
              })}
            </div>

            {/* Editor / Preview */}
            {showPreview ? (
              <div className="p-6 min-h-[400px]">
                <MarkdownRenderer content={formData.content} />
              </div>
            ) : (
              <textarea
                ref={textareaRef}
                value={formData.content}
                onChange={(e) => handleChange('content', e.target.value)}
                onKeyDown={handleEditorKeyDown}
                placeholder="Ecrivez votre article en Markdown...

# Titre principal

Du texte avec du **gras** et de l'*italique*.

```javascript
const hello = 'world';
console.log(hello);
```

> Une citation inspirante

![Description](https://url-image.com/photo.jpg)"
                className="w-full min-h-[400px] p-6 bg-transparent text-sm font-mono text-zinc-800 dark:text-zinc-200 resize-y outline-none placeholder:text-zinc-300 dark:placeholder:text-zinc-700 leading-relaxed"
              />
            )}

            {/* Bottom bar */}
            <div className="flex items-center justify-between px-4 py-2 border-t border-zinc-100 dark:border-zinc-800 bg-zinc-50/50 dark:bg-zinc-900">
              <div className="flex items-center gap-4 text-[10px] text-zinc-400">
                <span>{wordCount} mots</span>
                <span>~{readTime} min</span>
                <span>Markdown</span>
              </div>
              <div className="flex items-center gap-2 text-[10px] text-zinc-400">
                <kbd className="font-mono border border-zinc-200 dark:border-zinc-700 rounded px-1 py-0.5">Ctrl+B</kbd>
                <span>Gras</span>
                <kbd className="font-mono border border-zinc-200 dark:border-zinc-700 rounded px-1 py-0.5">Ctrl+I</kbd>
                <span>Italique</span>
                <kbd className="font-mono border border-zinc-200 dark:border-zinc-700 rounded px-1 py-0.5">Ctrl+S</kbd>
                <span>Sauver</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right: Metadata sidebar */}
        <div className="xl:w-[280px] shrink-0 space-y-4">
          {/* Category */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 p-4">
            <label className="block text-[11px] font-medium text-zinc-400 mb-2">Categorie</label>
            <div className="flex flex-wrap gap-1.5">
              {blogCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleChange('category', cat)}
                  className={cn(
                    'px-2.5 py-1 rounded-md text-[11px] font-medium transition-colors',
                    formData.category === cat
                      ? 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900'
                      : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-500 hover:text-zinc-700 dark:hover:text-zinc-300'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 p-4">
            <div className="flex items-center justify-between mb-2">
              <label className="text-[11px] font-medium text-zinc-400">Tags</label>
              <button onClick={addTag} className="text-zinc-400 hover:text-zinc-600 transition-colors">
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
            <div className="space-y-1.5">
              {(formData.tags || ['']).map((tag, i) => (
                <div key={i} className="flex gap-1.5">
                  <input
                    value={tag}
                    onChange={(e) => handleTagChange(i, e.target.value)}
                    placeholder="tag..."
                    className="flex-1 h-7 px-2 rounded-md border border-zinc-200 dark:border-zinc-800 bg-transparent text-[12px] outline-none focus:border-zinc-400"
                  />
                  <button onClick={() => removeTag(i)} className="p-1 text-zinc-400 hover:text-red-500 transition-colors">
                    <Trash2 className="w-3 h-3" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 p-4">
            <label className="block text-[11px] font-medium text-zinc-400 mb-3">Statut</label>
            <div className="space-y-2">
              <label className="flex items-center gap-2.5 cursor-pointer">
                <button
                  onClick={() => handleChange('published', false)}
                  className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                    !formData.published ? 'border-zinc-900 dark:border-white' : 'border-zinc-300 dark:border-zinc-700'
                  )}
                >
                  {!formData.published && <div className="w-2 h-2 rounded-full bg-zinc-900 dark:bg-white" />}
                </button>
                <div>
                  <p className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">Brouillon</p>
                  <p className="text-[10px] text-zinc-400">Non visible publiquement</p>
                </div>
              </label>
              <label className="flex items-center gap-2.5 cursor-pointer">
                <button
                  onClick={() => handleChange('published', true)}
                  className={cn(
                    'w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors',
                    formData.published ? 'border-emerald-600' : 'border-zinc-300 dark:border-zinc-700'
                  )}
                >
                  {formData.published && <div className="w-2 h-2 rounded-full bg-emerald-600" />}
                </button>
                <div>
                  <p className="text-[12px] font-medium text-zinc-700 dark:text-zinc-300">Publie</p>
                  <p className="text-[10px] text-zinc-400">Visible sur le blog</p>
                </div>
              </label>
            </div>
          </div>

          {/* Markdown help */}
          <div className="bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200/60 dark:border-zinc-800 p-4">
            <label className="block text-[11px] font-medium text-zinc-400 mb-2">Aide Markdown</label>
            <div className="space-y-1 text-[11px] text-zinc-500 font-mono">
              <p><strong className="text-zinc-700 dark:text-zinc-300">**gras**</strong></p>
              <p><em className="text-zinc-700 dark:text-zinc-300">*italique*</em></p>
              <p><span className="text-zinc-700 dark:text-zinc-300"># Titre</span></p>
              <p><span className="text-zinc-700 dark:text-zinc-300">`code`</span></p>
              <p><span className="text-zinc-700 dark:text-zinc-300">```bloc```</span></p>
              <p><span className="text-zinc-700 dark:text-zinc-300">![alt](url)</span></p>
              <p><span className="text-zinc-700 dark:text-zinc-300">[lien](url)</span></p>
              <p><span className="text-zinc-700 dark:text-zinc-300">&gt; citation</span></p>
              <p><span className="text-zinc-700 dark:text-zinc-300">- liste</span></p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
