import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { Customize, PrismaClient } from '@prisma/client';

const handler = nc<NextApiRequest, NextApiResponse>();

const prisma = new PrismaClient();

interface ExtendedRequest {
  shop: string;
}
interface ExtendedResponse {
  cookie: (name: string, value: string) => void;
}

handler.get<ExtendedRequest, ExtendedResponse>(async (req, res) => {
  const customize = await prisma.customize.findUnique({
    where: { shop: req.shop }
  });
  res.json(customize);
});

handler.put<ExtendedRequest, ExtendedResponse>(async (req, res) => {
  const {
    newestProducts,
    recentlyViewedProducts,
    bestSellingProducts,
    recommendedProducts,
    npTitle,
    rvpTitle,
    bspTitle,
    rpTitle,
    showCart,
    enableSlideshow,
    showVariant,
    showPrice,
    cropImage,
    cartText,
    cartColor,
    titleColor,
    productNameColor
  } = req.body;

  const data = await prisma.customize.update({
    where: { shop: req.shop },
    data: {
      newestProducts,
      recentlyViewedProducts,
      bestSellingProducts,
      recommendedProducts,
      npTitle,
      rvpTitle,
      bspTitle,
      rpTitle,
      showCart,
      enableSlideshow,
      showVariant,
      showPrice,
      cropImage,
      cartText,
      cartColor,
      titleColor,
      productNameColor
    }
  });
  res.json(data);
});

export default handler;
