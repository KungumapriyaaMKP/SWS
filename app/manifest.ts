import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Sumya Web Studio',
    short_name: 'Sumya Web Studio',
    description: 'Digital Products Built to Move Businesses Forward',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#3B0764',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  };
}
