export interface Comment {
  id: string;
  author: string;
  content: string;
  date: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  imageUrl: string;
  readTime: string;
  content: string;
  comments?: Comment[];
}

export const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "L'avenir du design minimaliste dans le web moderne",
    excerpt: "Découvrez comment le minimalisme continue de façonner nos expériences numériques en 2025.",
    date: "15 Mai 2025",
    author: "Alexandre Rivière",
    category: "Design",
    imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/future-of-design-9fa925ad-1770729236550.webp",
    readTime: "5 min de lecture",
    content: `
      <p>Le minimalisme n'est pas seulement une absence de décoration, c'est une quête de l'essentiel. Dans un monde saturé d'informations, la clarté devient un luxe.</p>
      <h3>Pourquoi le minimalisme ?</h3>
      <p>Il permet de réduire la charge cognitive et d'améliorer la conversion. Voici un exemple simple de structure CSS minimaliste :</p>
      <pre><code class="language-css">
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.button {
  background: none;
  border: 1px solid currentColor;
  padding: 0.5rem 1rem;
  transition: opacity 0.2s;
}
      </code></pre>
      <p>En 2025, nous voyons également l'émergence du "Minimalisme organique", qui allie lignes épurées et textures naturelles.</p>
    `,
    comments: [
      { id: "c1", author: "Marie Dupont", content: "Super article ! Le minimalisme est vraiment la clé.", date: "16 Mai 2025" }
    ]
  },
  {
    id: "2",
    title: "Optimiser son flux de travail créatif avec les bons outils",
    excerpt: "Une sélection rigoureuse d'outils et de méthodes pour booster votre productivité au quotidien.",
    date: "10 Mai 2025",
    author: "Alexandre Rivière",
    category: "Productivité",
    imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/productivity-hacks-c4aff4d6-1770729238242.webp",
    readTime: "8 min de lecture",
    content: `
      <p>La productivité ne consiste pas à en faire plus, mais à faire mieux avec moins d'efforts. Voici mes secrets pour rester concentré.</p>
      <p>L'utilisation de scripts d'automatisation peut vous faire gagner des heures. Par exemple, ce petit script Node.js pour organiser vos fichiers :</p>
      <pre><code class="language-javascript">
const fs = require('fs');
const path = require('path');

const organizeFiles = (dir) => {
  const files = fs.readdirSync(dir);
  files.forEach(file => {
    const ext = path.extname(file);
    if (!fs.existsSync(path.join(dir, ext))) {
      fs.mkdirSync(path.join(dir, ext));
    }
    fs.renameSync(path.join(dir, file), path.join(dir, ext, file));
  });
};

organizeFiles('./downloads');
      </code></pre>
    `
  },
  {
    id: "3",
    title: "L'impact de l'IA sur le développement frontend",
    excerpt: "Comment les nouveaux outils d'IA transforment la manière dont nous concevons les interfaces.",
    date: "5 Mai 2025",
    author: "Alexandre Rivière",
    category: "Technologie",
    imageUrl: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/564508a5-e18e-4304-b909-f59e34b774ee/the-power-of-connection-5bc9afc2-1770729236444.webp",
    readTime: "6 min de lecture",
    content: `
      <p>L'IA ne remplace pas le développeur, elle l'augmente. Analysons comment intégrer ces outils dans notre workflow.</p>
      <p>Avec l'IA, nous pouvons générer des composants React de manière fulgurante :</p>
      <pre><code class="language-typescript">
import React from 'react';

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const AIComponent: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button 
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {label}
    </button>
  );
};
      </code></pre>
    `
  }
];