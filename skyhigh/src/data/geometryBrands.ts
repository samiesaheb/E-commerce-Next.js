import { Brand } from '@/types/brand'; // adjust path if needed

export const geometryBrands: Brand[] = [
  {
    id: "1",
    slug: 'geometry-whitening-facial-foam',
    name: 'Geometry Facial Foam',
    image: '/brands/geometry-whitening-facial-foam.jpg', // Make sure this image path exists in your public folder
    description: 'A gentle, pH-balanced cleansing foam that purifies and refreshes skin without stripping moisture. Ideal for daily use to remove impurities and leave skin feeling soft and supple.',
    shortDescription: 'Gently purifies and refreshes skin for daily glow.',
    price: 12.99,
  },
  {
    id: "2",
    slug: 'geometry-extra-hair-serum',
    name: 'Geometry Hair Serum',
    image: '/brands/geometry-extra-hair-serum.jpg', // Make sure this image path exists in your public folder
    description: 'A lightweight hair serum formulated with argan oil and keratin to add shine, reduce frizz, and protect against heat damage. Promotes healthy-looking, silky smooth hair.',
    shortDescription: 'Adds shine, reduces frizz, and protects hair.',
    price: 19.99,
  },
  {
    id: "3",
    slug: 'geometry-sunscreen-facial-cream',
    name: 'Geometry Sunscreen SPF 50',
    image: '/brands/geometry-sunscreen-facial-cream.jpg', // Make sure this image path exists in your public folder
    description: 'Broad-spectrum SPF 50 sunscreen offering superior protection against UVA/UVB rays. Non-greasy, fast-absorbing formula suitable for all skin types, leaving no white cast.',
    shortDescription: 'Broad-spectrum SPF 50, non-greasy protection.',
    price: 24.99,
  }
];
