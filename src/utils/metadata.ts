import { Metadata } from 'next';

const metadataConfig = {
  title: 'Next.js Template',
  description: 'Next.js Template',
  url: 'https://nextjs.org/',
  image: '/favicon.ico',
  twitter: 'https://twitter.com/nickderaj',
  email: 'nickderaj@gmail.com',
  github: 'https://github.com/nickderaj',
  facebook: 'https://www.facebook.com/nickderaj/',
  youtube: 'https://youtube.com/nickderaj',
  linkedin: 'https://www.linkedin.com/in/nickderaj/',
};

export const SharedMetadata: Metadata = {
  robots: 'follow, index',
  title: metadataConfig.title,
  description: metadataConfig.description,
  openGraph: {
    title: metadataConfig.title,
    description: metadataConfig.description,
    url: metadataConfig.url,
    images: [{ url: metadataConfig.image, width: 256, height: 256, alt: 'favicon' }],
  },
  twitter: {
    title: metadataConfig.title,
    description: metadataConfig.description,
    site: metadataConfig.twitter,
    images: [{ url: metadataConfig.image, width: 256, height: 256, alt: 'favicon' }],
  },
};
