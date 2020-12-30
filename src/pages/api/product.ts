// import type { NextApiRequest, NextApiResponse } from 'next';
// import { Post, PrismaClient } from '@prisma/client';
// import { GraphQLClient, gql } from 'graphql-request';

// type Data = {
//   name: string;
//   posts: Post[];
//   shopify: any;
// };

// const prisma = new PrismaClient();

// interface CustomRequest extends NextApiRequest {
//   GraphQLClient: GraphQLClient;
// }
// export default async (req: CustomRequest, res: NextApiResponse<Data>) => {
//   const query = gql`
//     query {
//       shop {
//         id
//         primaryDomain {
//           host
//           sslEnabled
//           url
//         }
//         description
//         paymentSettings {
//           supportedDigitalWallets
//         }
//       }
//     }
//   `;
//   const shopify = await req.GraphQLClient.request(query);
//   const posts = await prisma.post.findMany();
//   res.status(200).json({ name: 'John Doe', posts, shopify });
// };
