import { PrismaClient } from "@prisma/client";



export default defineEventHandler(async (event) => {
  const body = await readBody(event);

  const prisma = new PrismaClient();
  console.log('User registration body:', body);

  await prisma.user.create({
    data: {
      email: body.email,
      password: body.password
    }
  });
 
  return { data: 'hello' }
});