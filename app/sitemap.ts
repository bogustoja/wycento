import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://wycento.app', lastModified: new Date(), changeFrequency: 'monthly', priority: 1 },
    { url: 'https://wycento.app/ile-kosztuje-remont-lazienki', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://wycento.app/ile-kosztuje-remont-kuchni', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: 'https://wycento.app/wycena-remontu-pokoju', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://wycento.app/wycena-remontu-warszawa', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://wycento.app/wycena-remontu-krakow', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: 'https://wycento.app/en', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: 'https://wycento.app/login', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.5 },
  ]
}
