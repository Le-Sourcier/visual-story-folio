import React from 'react';
import { Hero } from './components/portfolio/Hero';
import { ProjectGallery } from './components/portfolio/ProjectGallery';
import { About } from './components/portfolio/About';
import { Testimonials } from './components/portfolio/Testimonials';
import { Contact } from './components/portfolio/Contact';
import { Navbar } from './components/portfolio/Navbar';
import { Toaster } from 'sonner';

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground selection:bg-primary selection:text-primary-foreground font-sans antialiased">
      <Toaster position="top-center" expand={true} richColors theme="dark" />
      <Navbar />
      <main>
        <Hero />
        <ProjectGallery />
        <About />
        <Testimonials />
        <Contact />
      </main>
      
      <footer className="py-24 px-6 md:px-12 lg:px-24 bg-card border-t border-border">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
          <div className="flex flex-col items-center md:items-start gap-6">
            <a href="/" className="text-3xl font-black tracking-tighter">
              CREATIVE<span className="text-primary">.</span>
            </a>
            <p className="text-muted-foreground font-medium text-center md:text-left">
              Crafting premium digital experiences<br /> from London to the world.
            </p>
          </div>
          
          <div className="flex flex-wrap justify-center gap-12 md:gap-24">
            <div className="flex flex-col gap-4">
              <h4 className="text-xs font-black uppercase tracking-[0.3em] text-primary">Sitemap</h4>
              <a href="#work" className="font-bold hover:text-primary transition-colors">Work</a>
              <a href="#about" className="font-bold hover:text-primary transition-colors">About</a>
              <a href="#contact" className="font-bold hover:text-primary transition-colors">Contact</a>
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
            <a href="#" className="hover:text-primary transition-colors">Privacy</a>
            <a href="#" className="hover:text-primary transition-colors">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;