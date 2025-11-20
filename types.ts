export enum FlowerType {
  ROSE = 'ROSE',
  TULIP = 'TULIP',
  DAISY = 'DAISY',
  SUNFLOWER = 'SUNFLOWER',
  LILY = 'LILY'
}

export interface Memory {
  id: string;
  imageUrl: string;
  caption: string;
  date?: string;
  flowerType: FlowerType;
  color: string;
}

