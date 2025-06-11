// src/data/allBrands.ts
import { geometryBrands } from './geometryBrands';
import { hairCareBrands } from './hairCareBrands';
import { facialCareBrands } from './facialCareBrands';
import { bodyCareBrands } from './bodyCareBrands';

export const allProductBrands = [
  ...geometryBrands.map((b) => ({ ...b, category: 'geometry' })),
  ...hairCareBrands.map((b) => ({ ...b, category: 'hairCare' })),
  ...facialCareBrands.map((b) => ({ ...b, category: 'facialCare' })),
  ...bodyCareBrands.map((b) => ({ ...b, category: 'bodyCare' })),
];
