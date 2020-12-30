import { Feature, VaniActions, VaniActionEnum } from '../type.helper';
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
  showCart: true,
  enableSlideshow: true,
  showVariant: true,
  showPrice: true,
  cropImage: true,
  cartText: '',
  cartColor: '',
  titleColor: '',
  productNameColor: '',
  createdAt: new Date(),
  updatedAt: new Date(),
  deletedAt: null
};

export const initVaniState = {
  customize: initCustomize
};

export type VaniStateType = typeof initVaniState;

export const reducer = (state: VaniStateType, action: VaniActions): VaniStateType => {
  switch (action.type) {
    case VaniActionEnum.SET_API_VALUES:
      return { ...state, customize: action.customize };
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
