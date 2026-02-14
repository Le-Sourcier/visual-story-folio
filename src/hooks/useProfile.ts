import { useSettingsStore, type ProfileData, type SocialLinks, type SeoData } from '@/stores/settingsStore';
import { useApiSettings } from '@/hooks/queries';
import { cvData } from '@/data/cvData';

/**
 * Unified profile data hook.
 * Priority: API (backend DB) > settingsStore (localStorage) > cvData (hardcoded)
 */
export function useProfile() {
  const { data: apiSettings } = useApiSettings();
  const storeProfile = useSettingsStore((s) => s.profile);
  const storeSocial = useSettingsStore((s) => s.socialLinks);
  const storeSeo = useSettingsStore((s) => s.seo);

  // API data (highest priority)
  const apiProfile = apiSettings?.profile as ProfileData | undefined;
  const apiSocial = apiSettings?.socialLinks as SocialLinks | undefined;
  const apiSeo = apiSettings?.seo as SeoData | undefined;

  // Fallback chain helpers
  const cv = cvData.personalInformation;
  const pick = <T>(api: T | undefined, store: T, fallback: T): T =>
    api ?? (store || fallback);

  return {
    // Profile
    name: pick(apiProfile?.name, storeProfile.name, cv.name),
    email: pick(apiProfile?.email, storeProfile.email, cv.email),
    title: pick(apiProfile?.title, storeProfile.title, cv.title),
    location: pick(apiProfile?.location, storeProfile.location, cv.location),
    bio: pick(apiProfile?.bio, storeProfile.bio, cvData.profile.summary),
    avatar: pick(apiProfile?.avatar, storeProfile.avatar, ''),
    phone: cv.phone,

    // Social
    github: pick(apiSocial?.github, storeSocial.github, cv.github),
    linkedin: pick(apiSocial?.linkedin, storeSocial.linkedin, cv.linkedin),
    twitter: pick(apiSocial?.twitter, storeSocial.twitter, ''),
    website: pick(apiSocial?.website, storeSocial.website, ''),

    // SEO
    seo: {
      siteTitle: pick(apiSeo?.siteTitle, storeSeo.siteTitle, 'Yao David Logan | Portfolio'),
      metaDescription: pick(apiSeo?.metaDescription, storeSeo.metaDescription, ''),
      keywords: pick(apiSeo?.keywords, storeSeo.keywords, ''),
      ogImage: pick(apiSeo?.ogImage, storeSeo.ogImage, ''),
      ogTitle: pick(apiSeo?.ogTitle, storeSeo.ogTitle, ''),
      ogType: pick(apiSeo?.ogType, storeSeo.ogType, 'website'),
    },

    // Is loaded from API?
    isFromApi: !!apiSettings,
  };
}
