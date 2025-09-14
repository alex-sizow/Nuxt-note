import prisma from "../../lib/prisma";
import bcrypt from "bcryptjs";
import validator from 'validator'
import jwt from 'jsonwebtoken'

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
    const user = await prisma.user.create({
      data: {
        email: body.email,
        password: passwordHash,
        salt: salt
      }
    });

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      throw createError({ statusCode: 500, statusMessage: 'JWT secret not configured' });
    }
    const token = jwt.sign({ id: user.id }, jwtSecret);

    setCookie(event, 'AlexNoteJWT', token);

    return { data: 'success!', token };
  }
  catch (error: any) {
    console.log(error.code);

    if (error.code === 'P2002') {
      throw createError({ statusCode: 409, statusMessage: 'Email already exists' });
    }
    throw error

  }


});