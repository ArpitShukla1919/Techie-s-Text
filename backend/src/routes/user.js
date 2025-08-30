import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { sign, verify } from 'hono/jwt';
import { signupInput, signinInput } from "@100xdevs/medium-common";

export const userRouter = new Hono();

// ------------------- Middleware to verify JWT -------------------
userRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization");
  if (authHeader && authHeader.startsWith("Bearer ")) {
    const token = authHeader.split(" ")[1];
    try {
      const payload = await verify(token, c.env.JWT_SECRET);
      c.set("userId", payload.id);
      return next();
    } catch {
      c.status(401);
      return c.json({ message: "Unauthorized" });
    }
  }
  return next();
});

// ------------------- SIGNUP -------------------
userRouter.post('/signup', async (c) => {
  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs not correct" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: body.username }
    });
    if (existingUser) {
      c.status(409);
      return c.json({ message: "Email already registered" });
    }

    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name,
        about: body.about || "",
        image: body.image || ""
      }
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt, name: user.name });
  } catch (e) {
    console.log(e,"error is");
    c.status(500);
    return c.text("Something went wrong11");
  }
});

// ------------------- SIGNIN -------------------
userRouter.post('/signin', async (c) => {
  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({ message: "Inputs not correct" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
      }
    });

    if (!user) {
      c.status(403);
      return c.json({ message: "Incorrect credentials" });
    }

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);

    return c.json({ jwt, name: user.name });
  } catch (e) {
    console.log(e);
    c.status(500);
    return c.text("Something went wrong");
  }
});

// ------------------- PROFILE -------------------

// Get profile
userRouter.get('/profile', async (c) => {
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const user = await prisma.user.findUnique({
      where: { id: Number(userId) },
      select: { id: true, username: true, name: true, about: true, image: true }
    });

    if (!user) {
      c.status(404);
      return c.json({ message: "User not found" });
    }

    return c.json(user);
  } catch (e) {
    console.log(e);
    c.status(500);
    return c.text("Something went wrong");
  }
});

// Update profile
userRouter.put('/profile', async (c) => {
  const userId = c.get("userId");
  if (!userId) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }

  const body = await c.req.json();

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const updatedUser = await prisma.user.update({
      where: { id: Number(userId) },
      data: {
        name: body.name,
        password: body.password,
        about: body.about,
        image: body.image,
      },
      select: { id: true, username: true, name: true, about: true, image: true }
    });

    return c.json(updatedUser);
  } catch (e) {
    console.log(e);
    c.status(500);
    return c.text("Something went wrong");
  }
});
