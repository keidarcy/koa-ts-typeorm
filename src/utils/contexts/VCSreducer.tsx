import { VaniActions, VaniActionEnum, ProductInterface } from '../type.helper';
import { Customize } from '@prisma/client';

const initCustomize: Customize = {
  id: 0,
  shop: '',
  newestProducts: false,
  recentlyViewedProducts: false,
  bestSellingProducts: false,
  recommendedProducts: false,
  npTitle: '',
  rvpTitle: '',
  bspTitle: '',
  rpTitle: '',
  showNumber: 4,
  showCart: true,
  showVariant: true,
  showPrice: true,
  cartText: '',
  cartColor: '',
  titleColor: '',
  productNameColor: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
};

const initProductValue: ProductInterface = {
  title: '',
  vendor: '',
  url: '',
  images: [''],
  options: [
    {
      name: '',
      position: 1,
      values: ['']
    }
  ],
  price: '',
  compareAtPrice: '',
  variants: [
    {
      availble: true,
      compareAtPrice: '',
      id: '',
      price: '',
      title: '',
      option1: '',
      option2: '',
      option3: ''
    }
  ],
  hasOnlyDefaultVariant: true
};

export const initVaniState = {
  customize: initCustomize,
  product: initProductValue,
  cartColorOpen: false,
  titleColorOpen: false,
  productNameColorOpen: false
};

export type VaniStateType = typeof initVaniState;

export const reducer = (state: VaniStateType, action: VaniActions): VaniStateType => {
  switch (action.type) {
    case VaniActionEnum.SET_API_VALUES:
      return { ...state, customize: action.customize, product: action.product };
    case VaniActionEnum.CHANGE_CUSTOMIZE_VALUE:
      return {
        ...state,
        customize: { ...state.customize, [action.field]: action.value }
      };
    case VaniActionEnum.CHANGE_ROOT_VALUE:
      return {
        ...state,
        [action.field]: action.value
      };
    default:
      return state;
  }
};
