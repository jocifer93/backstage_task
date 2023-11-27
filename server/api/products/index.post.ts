import { PrismaClient } from "@prisma/client";
import Product from "../../../types/product";

const prisma = new PrismaClient();

export default defineEventHandler(async (event) => {
  const product = await readBody<Product>(event);

  if (!product || !isProductValid(product)) {
    throw createError({
      statusCode: 400,
      statusMessage: "Bad Request",
      message:
        "Invalid product data. Please provide valid information for title, description, image, and price.",
    });
  }

  return prisma.product.create({
    data: product,
  });
});

const isProductValid = (product: Product) => {
  return (
    product.title != "" &&
    product.description != "" &&
    product.image != "" &&
    product.price > 0
  );
};
