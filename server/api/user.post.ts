import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event);

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(body.password, salt);
    await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash
      }
    });
    return { data: 'success!' };
  }
  catch (error: any) {
    console.log(error.code);

    if (error.code === 'P2002') {
      throw createError({ statusCode: 409, statusMessage: 'Email already exists' });
    }
    throw error
    
  }


});