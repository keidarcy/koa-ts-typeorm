import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { PrismaClient } from '@prisma/client';
import { gql, GraphQLClient } from 'graphql-request';

const handler = nc<NextApiRequest, NextApiResponse>();

const prisma = new PrismaClient();

interface ExtendedRequest {
  shop: string;
  GraphQLClient: GraphQLClient;
}
interface ExtendedResponse {
  cookie: (name: string, value: string) => void;
}

handler.get<ExtendedRequest, ExtendedResponse>(async (req, res) => {
  const customize = await prisma.customize.findUnique({
    where: { shop: req.shop }
  });

  const query = gql`
    query {
      shop {
        id
        primaryDomain {
          host
          sslEnabled
          url
        }
        description
        paymentSettings {
          supportedDigitalWallets
        }
      }
    }
  `;
  const shopify = await req.GraphQLClient.request(query);

  res.json({ customize, shopify });
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
