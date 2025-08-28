import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import validator from 'validator'

export default defineEventHandler(async (event) => {

  try {
    const body = await readBody(event);

    if (!validator.isEmail(body.email)) {
      throw createError({ statusCode: 400, statusMessage: 'An email with this address exists.' });
    }

    if (!validator.isStrongPassword(body.password, {
      minLength: 8,
      minLowercase: 0,
      minUppercase: 0,
      minNumbers: 0,
      minSymbols: 0
    })) {
      throw createError({ statusCode: 400, statusMessage: 'Weak password. Please use a stronger password.' });
    }

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