import { PrismaClient } from '@prisma/client';
const p = new PrismaClient();
p.user.findMany().then((u) => console.log('users trong DB:', u.length, u.map((x) => x.email).join(', ') || '(rong)')).finally(() => p.$disconnect());
