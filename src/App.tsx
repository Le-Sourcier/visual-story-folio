import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom';
import { Hero } from './components/portfolio/Hero';
import { ProjectGallery } from './components/portfolio/ProjectGallery';
import { About } from './components/portfolio/About';
import { Testimonials } from './components/portfolio/Testimonials';
import { Contact } from './components/portfolio/Contact';
import { Navbar } from './components/portfolio/Navbar';
import { BlogPage } from './components/portfolio/BlogPage';
import { BlogPostDetail } from './components/portfolio/BlogPostDetail';
import { AppointmentBooking } from './components/portfolio/AppointmentBooking';
import { LatestBlogPosts } from './components/portfolio/LatestBlogPosts';
import { LegalMentions } from './components/portfolio/LegalMentions';
import { PrivacyPolicy } from './components/portfolio/PrivacyPolicy';
import { TermsOfService } from './components/portfolio/TermsOfService';
import { NotFoundPage } from './components/portfolio/NotFoundPage';
import { Toaster } from 'sonner';

function ScrollToHash() {
  const { hash, pathname } = useLocation();

  useEffect(() => {
    if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [hash, pathname]);

  return null;
}

function HomePage() {
  return (
    <main>
      <Hero />
      <ProjectGallery />
      <About />
      <LatestBlogPosts />
      <section id="booking" className="py-24 px-6 md:px-12 lg:px-24 bg-secondary/30">
        <div className="max-w-4xl mx-auto">
          <AppointmentBooking />
        </div>
      </section>
      <Testimonials />
      <Contact />
    </main>
  );
}

function App() {
  return (
    <Router>
      <ScrollToHash />
      <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans antialiased">
        <Toaster position="top-center" expand={true} richColors theme="dark" />
        <Navbar />
        
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:id" element={<BlogPostDetail />} />
          <Route path="/mentions-legales" element={<LegalMentions />} />
          <Route path="/politique-confidentialite" element={<PrivacyPolicy />} />
          <Route path="/cgu" element={<TermsOfService />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
        
        <footer className="py-24 px-6 md:px-12 lg:px-24 bg-card border-t border-border">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div className="flex flex-col items-center md:items-start gap-6">
              <Link to="/" className="text-3xl font-black tracking-tighter">
                CREATIVE<span className="text-primary">.</span>
              </Link>
              <p className="text-muted-foreground font-medium text-center md:text-left">
                Crafting premium digital experiences<br /> from London to the world.
              </p>
            </div>
            
            <div className="flex flex-wrap justify-center gap-12 md:gap-24">
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Sitemap</h4>
                <a href="/#work" className="font-bold hover:text-primary transition-colors">Work</a>
                <a href="/#about" className="font-bold hover:text-primary transition-colors">About</a>
                <Link to="/blog" className="font-bold hover:text-primary transition-colors">Blog</Link>
                <a href="/#contact" className="font-bold hover:text-primary transition-colors">Contact</a>
              </div>
              <div className="flex flex-col gap-4">
                <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Connect</h4>
                <a href="#" className="font-bold hover:text-primary transition-colors">Twitter</a>
                <a href="#" className="font-bold hover:text-primary transition-colors">LinkedIn</a>
                <a href="#" className="font-bold hover:text-primary transition-colors">Behance</a>
              </div>
            </div>
          </div>
          
          <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-border flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-muted-foreground text-sm font-medium italic">
              &copy; {new Date().getFullYear()} Creative Portfolio. All rights reserved.
            </p>
            <div className="flex gap-8 text-sm font-bold uppercase tracking-widest text-muted-foreground/50">
              <Link to="/politique-confidentialite" className="hover:text-primary transition-colors">Confidentialité</Link>
              <Link to="/mentions-legales" className="hover:text-primary transition-colors">Mentions</Link>
              <Link to="/cgu" className="hover:text-primary transition-colors">CGU</Link>
            </div>
          </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;