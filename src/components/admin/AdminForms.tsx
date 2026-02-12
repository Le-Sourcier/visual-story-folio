import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2, X } from 'lucide-react';

interface FormProps {
  initialData?: any;
  onSubmit: (data: any) => void;
  onCancel: () => void;
  title: string;
}

export function ProjectForm({ initialData, onSubmit, onCancel, title }: FormProps) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    category: 'Fullstack',
    image: '',
    description: '',
    problem: '',
    solution: '',
    results: [''],
    metrics: [{ name: '', value: 0, previousValue: 0, unit: '%' }],
    url: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index: number, value: string, field: 'results') => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'results') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index: number, field: 'results') => {
    setFormData({ ...formData, [field]: formData[field].filter((_: any, i: number) => i !== index) });
  };

  const handleMetricChange = (index: number, field: string, value: any) => {
    const newMetrics = [...formData.metrics];
    newMetrics[index] = { ...newMetrics[index], [field]: value };
    setFormData({ ...formData, metrics: newMetrics });
  };

  const addMetric = () => {
    setFormData({ ...formData, metrics: [...formData.metrics, { name: '', value: 0, previousValue: 0, unit: '%' }] });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-black uppercase tracking-tight">{title}</h3>
        <button onClick={onCancel} className="p-2 hover:bg-secondary rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Titre</label>
          <Input name="title" value={formData.title} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Catégorie</label>
          <Input name="category" value={formData.category} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Image URL</label>
          <Input name="image" value={formData.image} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Description</label>
          <Textarea name="description" value={formData.description} onChange={handleChange} className="rounded-xl min-h-[100px]" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Problème</label>
          <Textarea name="problem" value={formData.problem} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Solution</label>
          <Textarea name="solution" value={formData.solution} onChange={handleChange} className="rounded-xl" />
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Résultats</label>
          <Button variant="outline" size="sm" onClick={() => addArrayItem('results')} className="rounded-lg">
            <Plus className="w-4 h-4 mr-2" /> Ajouter
          </Button>
        </div>
        {formData.results.map((res: string, i: number) => (
          <div key={i} className="flex gap-2">
            <Input value={res} onChange={(e) => handleArrayChange(i, e.target.value, 'results')} className="rounded-xl" />
            <Button variant="ghost" size="icon" onClick={() => removeArrayItem(i, 'results')} className="text-destructive">
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="ghost" onClick={onCancel} className="rounded-xl font-bold">Annuler</Button>
        <Button onClick={() => onSubmit(formData)} className="rounded-xl font-black px-8">Enregistrer</Button>
      </div>
    </div>
  );
}

export function ExperienceForm({ initialData, onSubmit, onCancel, title }: FormProps) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    company: '',
    dates: '',
    description: '',
    location: '',
    stack: [''],
    challenges: ['']
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleArrayChange = (index: number, value: string, field: 'stack' | 'challenges') => {
    const newArray = [...formData[field]];
    newArray[index] = value;
    setFormData({ ...formData, [field]: newArray });
  };

  const addArrayItem = (field: 'stack' | 'challenges') => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const removeArrayItem = (index: number, field: 'stack' | 'challenges') => {
    setFormData({ ...formData, [field]: formData[field].filter((_: any, i: number) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-black uppercase tracking-tight">{title}</h3>
        <button onClick={onCancel} className="p-2 hover:bg-secondary rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Poste</label>
          <Input name="title" value={formData.title} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Entreprise</label>
          <Input name="company" value={formData.company} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Période</label>
          <Input name="dates" value={formData.dates} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Lieu</label>
          <Input name="location" value={formData.location} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Description</label>
          <Textarea name="description" value={formData.description} onChange={handleChange} className="rounded-xl" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Stack Technique</label>
            <Button variant="outline" size="sm" onClick={() => addArrayItem('stack')} className="rounded-lg">
              <Plus className="w-4 h-4 mr-2" /> Ajouter
            </Button>
          </div>
          {formData.stack.map((item: string, i: number) => (
            <div key={i} className="flex gap-2">
              <Input value={item} onChange={(e) => handleArrayChange(i, e.target.value, 'stack')} className="rounded-xl" />
              <Button variant="ghost" size="icon" onClick={() => removeArrayItem(i, 'stack')} className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-center">
            <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Défis</label>
            <Button variant="outline" size="sm" onClick={() => addArrayItem('challenges')} className="rounded-lg">
              <Plus className="w-4 h-4 mr-2" /> Ajouter
            </Button>
          </div>
          {formData.challenges.map((item: string, i: number) => (
            <div key={i} className="flex gap-2">
              <Input value={item} onChange={(e) => handleArrayChange(i, e.target.value, 'challenges')} className="rounded-xl" />
              <Button variant="ghost" size="icon" onClick={() => removeArrayItem(i, 'challenges')} className="text-destructive">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="ghost" onClick={onCancel} className="rounded-xl font-bold">Annuler</Button>
        <Button onClick={() => onSubmit(formData)} className="rounded-xl font-black px-8">Enregistrer</Button>
      </div>
    </div>
  );
}

export function BlogPostForm({ initialData, onSubmit, onCancel, title }: FormProps) {
  const [formData, setFormData] = useState(initialData || {
    title: '',
    excerpt: '',
    content: '',
    category: 'Tech',
    imageUrl: '',
    date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' }),
    author: 'Alexandre Rivière',
    readTime: '5 min de lecture'
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-2xl font-black uppercase tracking-tight">{title}</h3>
        <button onClick={onCancel} className="p-2 hover:bg-secondary rounded-full">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Titre de l'article</label>
          <Input name="title" value={formData.title} onChange={handleChange} className="rounded-xl text-lg font-bold" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Catégorie</label>
          <Input name="category" value={formData.category} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Temps de lecture</label>
          <Input name="readTime" value={formData.readTime} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Image URL</label>
          <Input name="imageUrl" value={formData.imageUrl} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Extrait (Excerpt)</label>
          <Textarea name="excerpt" value={formData.excerpt} onChange={handleChange} className="rounded-xl" />
        </div>
        <div className="space-y-2 md:col-span-2">
          <label className="text-xs font-black uppercase tracking-widest text-muted-foreground">Contenu (HTML supporté)</label>
          <Textarea name="content" value={formData.content} onChange={handleChange} className="rounded-xl min-h-[300px]" />
        </div>
      </div>

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="ghost" onClick={onCancel} className="rounded-xl font-bold">Annuler</Button>
        <Button onClick={() => onSubmit(formData)} className="rounded-xl font-black px-8">Publier</Button>
      </div>
    </div>
  );
}