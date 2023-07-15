import { Metadata } from 'next';

const title = 'Next.js Template';
const description = 'Next.js Template';

export const SharedMetadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    // url: 'https://nextjs.org/',
    images: [{ url: '/favicon.ico', width: 256, height: 256, alt: 'favicon' }],
  },
};
