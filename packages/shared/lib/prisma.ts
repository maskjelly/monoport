import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';

export const getPrismaClient = (env: Record<string, string>) => {
  return new PrismaClient({
    datasources: {
      db: {
        url: `${env.PRISMA_ACCELERATE_BASE_URL}?api_key=${env.PRISMA_ACCELERATE_API_KEY}`,
      },
    },
  }).$extends(withAccelerate());
};