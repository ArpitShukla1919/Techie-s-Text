import { createBlogInput, updateBlogInput } from "@100xdevs/medium-common";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { verify } from "hono/jwt";

export const blogRouter = new Hono();

blogRouter.use("/*", async (c, next) => {
  const authHeader = c.req.header("authorization") || "";
  try {
    const user = await verify(authHeader, c.env.JWT_SECRET);
    if (user && user.id) {
      c.set("userId", user.id);
      await next();
    } else {
      c.status(403);
      return c.json({
        message: "You are not logged in",
      });
    }
  } catch (e) {
    c.status(403);
    return c.json({
      message: "You are not logged in",
    });
  }
});

// blogRouter.post("/", async (c) => {
//   const body = await c.req.json();

//   // Basic validation
//   if (!body.title || !body.shortDescription || !body.content) {
//     c.status(400);
//     return c.json({ message: "Missing required fields" });
//   }

//   // Default to draft if not provided
//   const status = body.status === "published" ? "PUBLISHED" : "DRAFT";

//   const authorId = c.get("userId");

//   console.log(authorId,"888888888888888888888888888888")

//   const prisma = new PrismaClient({
//     datasourceUrl: c.env.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const blog = await prisma.blog.create({
//     data: {
//       title: body.title,
//       shortDescription: body.shortDescription,
//       content: body.content,
//       status, // ✅ save draft/published
//       authorId: Number(authorId),
//     },
//   });

//   return c.json({
//     id: blog.id,
//     status: blog.status,
//   });
// });


blogRouter.post("/", async (c) => {
  const body = await c.req.json();

  // Basic validation
  if (!body.title || !body.shortDescription || !body.content) {
    c.status(400);
    return c.json({ message: "Missing required fields" });
  }

  // Default to draft if not provided
  const status = body.status === "published" ? "PUBLISHED" : "DRAFT";

  // 🔑 Extract & verify JWT
  const token = c.req.header("Authorization") || "";
  if (!token) {
    c.status(401);
    return c.json({ message: "Unauthorized" });
  }

  let authorId;
  try {
    const payload = await verify(token, c.env.JWT_SECRET); // decode JWT
    authorId = payload.id; // 👈 must exist in JWT at sign-in
  } catch (err) {
    c.status(401);
    return c.json({ message: "Invalid or expired token" });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.create({
    data: {
      title: body.title,
      shortDescription: body.shortDescription,
      content: body.content,
      status:body.status, // ✅ save draft/published
      authorId: Number(authorId),
    },
  });

  return c.json({
    id: blog.id,
    status: blog.status,
  });
});

blogRouter.put("/", async (c) => {
  const body = await c.req.json();
  const { success } = updateBlogInput.safeParse(body);
  if (!success) {
    c.status(411);
    return c.json({
      message: "Inputs not correct",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.json({
    id: blog.id,
  });
});

// Todo: add pagination
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    where: {
      status: "PUBLISHED",
    },
    select: {
      content: true,
      shortDescription: true,
      title: true,
      id: true,
      updatedAt: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({
    blogs,
  });
});

blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blog = await prisma.blog.findFirst({
      where: {
        id: Number(id),
      },
      select: {
        id: true,
        title: true,
        content: true,
        updatedAt: true,
        author: {
          select: {
            name: true,
            about: true,
          },
        },
      },
    });

    return c.json({
      blog,
    });
  } catch (e) {
    c.status(411);
    return c.json({
      message: "Error while fetching blog post",
    });
  }
});

blogRouter.get("/users/posts", async (c) => {
  const userId = c.get("userId");

  if (!userId) {
    c.status(403);
    return c.json({
      message: "You are not logged innnn",
    });
  }

  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const blogs = await prisma.blog.findMany({
      where: {
        authorId: Number(userId),
      },
      select: {
        id: true,
        title: true,
        shortDescription: true,
        content: true,
        status:true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        updatedAt: "desc", // newest first
      },
    });

    return c.json({
      blogs,
    });
  } catch (e) {
    c.status(500);
    return c.json({
      message: "Error fetching user posts",
    });
  }
});
