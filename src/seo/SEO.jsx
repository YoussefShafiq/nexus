import React from 'react';
import { Helmet } from 'react-helmet';
import { useLocation } from 'react-router-dom';

// Small helper to safely build URLs
const joinUrl = (base, path) => {
  if (!base) return path || '/';
  try {
    const u = new URL(path || '/', base);
    return u.toString();
  } catch {
    return `${base.replace(/\/$/, '')}${path?.startsWith('/') ? '' : '/'}${path || ''}`;
  }
};

export function DefaultSEO({
  siteName = 'Nexus',
  defaultTitle = 'Nexus — Engineering Consultancy',
  titleTemplate = '%s | Nexus',
  description = 'NEXUS delivers precision engineering solutions for oil & gas, industrial, and architectural projects.',
  keywords = 'Nexus, engineering consultancy, oil and gas engineering, industrial projects, BIM, structural engineering',
  twitterHandle = '@nexus',
  siteUrl,
  image = '/Logo.png',
}) {
  const { pathname } = useLocation();
  const origin = typeof window !== 'undefined' ? window.location.origin : siteUrl;
  const canonical = joinUrl(origin, pathname);
  const ogUrl = canonical;
  const ogImage = image?.startsWith('http') ? image : joinUrl(origin, image);

  return (
    <Helmet defaultTitle={defaultTitle} titleTemplate={titleTemplate}>
      <html lang="en" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="theme-color" content="#0f4c81" />
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:title" content={defaultTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={ogUrl} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content={twitterHandle} />
      <meta name="twitter:title" content={defaultTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* Organization structured data */}
      <script type="application/ld+json">
        {JSON.stringify({
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: siteName,
          url: origin || siteUrl,
          logo: ogImage,
        })}
      </script>
    </Helmet>
  );
}

export function PageSEO({ title, description, image = '/Logo.png', siteName = 'Nexus' }) {
  const { pathname } = useLocation();
  const origin = typeof window !== 'undefined' ? window.location.origin : undefined;
  const canonical = joinUrl(origin, pathname);
  const ogImage = image?.startsWith('http') ? image : joinUrl(origin, image);

  return (
    <Helmet title={title}>
      {description && <meta name="description" content={description} />}
      <link rel="canonical" href={canonical} />

      {/* Open Graph */}
      {title && <meta property="og:title" content={title} />}
      {description && <meta property="og:description" content={description} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content={siteName} />
      <meta property="og:url" content={canonical} />
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      {title && <meta name="twitter:title" content={title} />}
      {description && <meta name="twitter:description" content={description} />}
      <meta name="twitter:image" content={ogImage} />
    </Helmet>
  );
}

export function NoIndex() {
  return (
    <Helmet>
      <meta name="robots" content="noindex, nofollow" />
    </Helmet>
  );
}
