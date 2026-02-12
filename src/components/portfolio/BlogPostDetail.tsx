import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, Calendar, Clock, User, Share2, MessageSquare, Send } from 'lucide-react';
import { blogPosts as mockBlogPosts, BlogPost, Comment } from '../../data/blogMockData';
import { CodeHighlighter } from './CodeHighlighter';
import { toast } from 'sonner';
import { api } from '@/services/api';

export function BlogPostDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState<Comment[]>([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const data = await api.get('/blog');
        const found = data.find((p: any) => p.id === id);
        if (found) {
          setPost(found);
          setComments(found.comments || []);
        } else {
          const mock = mockBlogPosts.find(p => p.id === id);
          if (mock) {
            setPost(mock);
            setComments(mock.comments || []);
          } else {
            navigate('/404');
          }
        }
      } catch (error) {
        const mock = mockBlogPosts.find(p => p.id === id);
        if (mock) {
          setPost(mock);
          setComments(mock.comments || []);
        }
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
    window.scrollTo(0, 0);
  }, [id, navigate]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
    </div>
  );

  if (!post) return null;

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment: Comment = {
      id: Date.now().toString(),
      author: "Visiteur",
      content: newComment,
      date: new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    };

    setComments([comment, ...comments]);
    setNewComment("");
    toast.success("Commentaire ajouté !");
  };

  const renderContent = (htmlContent: string) => {
    if (!htmlContent) return null;
    const parts = htmlContent.split(/(<pre><code.*?>[\s\S]*?<\/code><\/pre>)/g);
    
    return parts.map((part, index) => {
      if (part.startsWith('<pre><code')) {
        const match = part.match(/class="language-(.*?)"/);
        const lang = match ? match[1] : 'javascript';
        const code = part.replace(/<pre><code.*?>|<\/code><\/pre>/g, '').trim();
        return <CodeHighlighter key={index} code={code} language={lang} />;
      }
      return <div key={index} className="prose prose-invert prose-primary max-w-none mb-6 font-medium leading-relaxed text-lg text-muted-foreground" dangerouslySetInnerHTML={{ __html: part }} />;
    });
  };

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 min-h-screen bg-background">
      <div className="max-w-4xl mx-auto">
        <Link to="/blog" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-12 font-bold text-xs uppercase tracking-widest">
          <ChevronLeft className="w-4 h-4" />
          Retour au blog
        </Link>

        <motion.header 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex gap-3 mb-6">
            <span className="px-4 py-1 bg-primary/10 text-primary rounded-full text-[10px] font-black uppercase tracking-widest border border-primary/20">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-[1.1]">
            {post.title}
          </h1>
          
          <div className="flex flex-wrap items-center gap-8 py-8 border-y border-border">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <User className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Auteur</p>
                <p className="text-sm font-bold">{post.author}</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Calendar className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Date</p>
                <p className="text-sm font-bold">{post.date}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Lecture</p>
                <p className="text-sm font-bold">{post.readTime}</p>
              </div>
            </div>

            <button className="ml-auto p-3 rounded-xl border border-border hover:bg-secondary transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </motion.header>

        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="relative aspect-video rounded-[2.5rem] overflow-hidden mb-16 shadow-2xl border border-border"
        >
          <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
        </motion.div>

        <article className="mb-24">
          {renderContent(post.content)}
        </article>

        <section className="pt-16 border-t border-border">
          <div className="flex items-center gap-4 mb-12">
            <MessageSquare className="w-8 h-8 text-primary" />
            <h3 className="text-3xl font-black tracking-tight">{comments.length} Commentaire{comments.length !== 1 && 's'}</h3>
          </div>

          <form onSubmit={handleAddComment} className="mb-16 p-8 rounded-3xl bg-card border border-border shadow-lg">
            <h4 className="text-sm font-black uppercase tracking-widest mb-6">Laisser un commentaire</h4>
            <textarea
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Qu'en pensez-vous ?"
              rows={4}
              className="w-full bg-background border border-border rounded-2xl p-6 focus:ring-2 focus:ring-primary transition-all resize-none mb-6"
            />
            <button className="flex items-center gap-3 px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-black hover:shadow-xl hover:shadow-primary/20 transition-all ml-auto">
              Publier
              <Send className="w-4 h-4" />
            </button>
          </form>

          <div className="space-y-8">
            <AnimatePresence>
              {comments.map((comment) => (
                <motion.div 
                  key={comment.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  className="p-8 rounded-3xl bg-secondary/20 border border-transparent hover:border-border transition-all"
                >
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary font-black text-xs">
                        {comment.author.charAt(0)}
                      </div>
                      <span className="font-bold">{comment.author}</span>
                    </div>
                    <span className="text-xs text-muted-foreground font-medium">{comment.date}</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">{comment.content}</p>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </section>
      </div>
    </div>
  );
}