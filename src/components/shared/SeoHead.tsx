import { useEffect } from 'react';
import { useProfile } from '@/hooks/useProfile';

/**
 * Dynamic SEO meta tags component.
 * Updates document.title and meta tags based on settings from API > store > defaults.
 */
export function SeoHead() {
  const { seo, name } = useProfile();

  useEffect(() => {
    // Title
    if (seo.siteTitle) {
      document.title = seo.siteTitle;
    }

    // Meta description
    updateMeta('description', seo.metaDescription);
    updateMeta('keywords', seo.keywords);
    updateMeta('author', name);

    // Open Graph
    updateMeta('og:title', seo.ogTitle || seo.siteTitle, 'property');
    updateMeta('og:description', seo.metaDescription, 'property');
    updateMeta('og:type', seo.ogType, 'property');
    updateMeta('og:site_name', name, 'property');
    if (seo.ogImage) {
      updateMeta('og:image', seo.ogImage, 'property');
    }

    // Twitter
    updateMeta('twitter:title', seo.ogTitle || seo.siteTitle, 'property');
    updateMeta('twitter:description', seo.metaDescription, 'property');
    if (seo.ogImage) {
      updateMeta('twitter:image', seo.ogImage, 'property');
    }
  }, [seo, name]);

  return null;
}

function updateMeta(name: string, content: string, attr: 'name' | 'property' = 'name') {
  if (!content) return;
  let el = document.querySelector(`meta[${attr}="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}
