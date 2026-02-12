import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { blogPosts as mockBlogPosts, BlogPost } from '../../data/blogMockData';
import { Calendar, Clock, ArrowRight, ChevronLeft, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import { api } from '@/services/api';

export function BlogPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await api.get('/blog');
        setPosts(data);
      } catch (error) {
        setPosts(mockBlogPosts); // Fallback
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 lg:px-24 min-h-screen bg-background">
      <div className="max-w-7xl mx-auto">
        <div className="mb-20 text-center md:text-left">
          <Link to="/" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8 font-bold text-xs uppercase tracking-widest">
            <ChevronLeft className="w-4 h-4" />
            Retour à l'accueil
          </Link>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-6xl md:text-8xl font-black tracking-tighter mb-6 uppercase"
          >
            NOTRE <span className="text-primary">BLOG</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-xl text-muted-foreground max-w-2xl font-medium mx-auto md:mx-0"
          >
            Pensées, tutoriels et réflexions sur le design, la technologie et la créativité numérique.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group flex flex-col bg-card/50 backdrop-blur-sm border border-border rounded-[2.5rem] overflow-hidden hover:border-primary/50 transition-all duration-500 hover:-translate-y-2"
            >
              <Link to={`/blog/${post.id}`} className="relative aspect-video overflow-hidden">
                <img 
                  src={post.imageUrl} 
                  alt={post.title}
                  className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute top-6 left-6">
                  <span className="px-4 py-1.5 bg-background/80 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-primary border border-border">
                    {post.category}
                  </span>
                </div>
              </Link>
              
              <div className="p-8 flex flex-col flex-grow">
                <div className="flex items-center gap-4 text-muted-foreground text-[10px] font-black uppercase tracking-widest mb-6">
                  <div className="flex items-center gap-1.5">
                    <Calendar className="w-3.5 h-3.5 text-primary" />
                    {post.date}
                  </div>
                  <div className="flex items-center gap-1.5 text-primary/60">
                    <Clock className="w-3.5 h-3.5" />
                    {post.readTime}
                  </div>
                </div>
                
                <Link to={`/blog/${post.id}`}>
                  <h2 className="text-2xl font-bold leading-tight mb-4 group-hover:text-primary transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                </Link>
                
                <p className="text-muted-foreground mb-8 line-clamp-2 font-medium leading-relaxed">
                  {post.excerpt}
                </p>
                
                <div className="mt-auto pt-6 border-t border-border flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-secondary flex items-center justify-center">
                      <User className="w-3 h-3" />
                    </div>
                    <span className="text-[10px] font-black uppercase tracking-widest">{post.author}</span>
                  </div>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="p-3 rounded-2xl bg-secondary text-foreground group-hover:bg-primary group-hover:text-primary-foreground transition-all"
                  >
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}