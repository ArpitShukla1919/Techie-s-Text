import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";

export const contactRouter = new Hono();

contactRouter.get("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const contacts = await prisma.contact.findMany({
      orderBy: { createdAt: "desc" },
    });
    return c.json({ success: true, data: contacts });
  } catch (error) {
    console.error("Error fetching contacts:", error);
    c.status(500);
    return c.json({ success: false, error: "Failed to fetch contacts" });
  }
});

contactRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  try {
    const body = await c.req.json();

    if (!body.name || !body.email || !body.message) {
      c.status(400);
      return c.json({
        success: false,
        error: "Name, email, and message are required",
      });
    }

    const newContact = await prisma.contact.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone || null,
        message: body.message,
      },
    });

    return c.json({ success: true, data: newContact });
  } catch (error) {
    console.error("Error saving contact:", error);
    c.status(500);
    return c.json({ success: false, error: "Failed to create contact" });
  }
});
