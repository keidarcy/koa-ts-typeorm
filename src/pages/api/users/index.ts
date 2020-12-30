import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { Customize, User, PrismaClient } from '@prisma/client';

const handler = nc<NextApiRequest, NextApiResponse>();

const prisma = new PrismaClient();

handler.get(async (req, res) => {
  const shop = req.cookies.shopOrigin;

  const user = await prisma.user.create({
    data: {
      shop,
      customize: {
        create: {}
      }
    }
  });

  res.status(200).json({ user });
});
export default handler;
