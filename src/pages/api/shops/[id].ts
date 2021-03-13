import { NextApiRequest, NextApiResponse } from 'next';
import nc from 'next-connect';
import { Customize, PrismaClient } from '@prisma/client';

const handler = nc<NextApiRequest, NextApiResponse>();

const prisma = new PrismaClient();

interface ExtendedRequest {
  query: {
    id: number;
  };
}
interface ExtendedResponse {
  cookie: (name: string, value: string) => void;
}

// Note: no use
handler.get<ExtendedRequest, ExtendedResponse>(async (req, res) => {
  const { id } = req.query;

  const customize = await prisma.customize.findUnique({
    where: { id: +id }
  });
  res.json({ customize });
});

export default handler;
