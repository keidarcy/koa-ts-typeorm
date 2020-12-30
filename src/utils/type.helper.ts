import { Customize } from '@prisma/client';

export enum VaniActionEnum {
  SET_API_VALUES = 'SET_API_VALUES',
  CHANGE_CUSTOMIZE_VALUE = 'CHANGE_CUSTOMIZE_VALUE',
  CHANGE_ROOT_VALUE = 'CHANGE_ROOT_VALUE'
}

type ShopifyPageType = 'Home page' | 'Cart page' | 'Product pages' | 'Collection pages';

export interface Feature {
  title: string;
  description: string;
  pages: ShopifyPageType[];
  showPreview: boolean;
  defaultTitle: string;
  previewUrl: string;
}

export type VaniActions =
  | { type: VaniActionEnum.SET_API_VALUES; customize: Customize }
  | {
      type: VaniActionEnum.CHANGE_CUSTOMIZE_VALUE;
      field: string;
      value: string | number | undefined | boolean | null;
    }
  | {
      type: VaniActionEnum.CHANGE_ROOT_VALUE;
      field: string;
      value: string | number | undefined | boolean | null;
    };
