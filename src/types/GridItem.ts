// src/types/GridItem.ts

export interface GridItem {
    type: 'fogao' | 'mesa' | 'garcom' | 'cliente';
    x: number;
    y: number;
    status?: 'ocupado' | 'livre';
  }
  