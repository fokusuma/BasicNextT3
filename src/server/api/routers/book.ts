import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { bookSchema, bookParamsSchema } from "../schemas";

export const bookRouter = createTRPCRouter({
  // get all books
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const books = await ctx.db.book.findMany();
      return {
        success: true,
        message: "Books fetched successfully",
        data: books,
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to fetch books",
        data: [],
      };
    }
  }),

  // get book by id
  getById: publicProcedure
    .input(bookParamsSchema)
    .query(async ({ ctx, input }) => {
      try {
        const book = await ctx.db.book.findUnique({ where: { id: input.id } });
        return {
          success: true,
          message: "Book fetched successfully",
          data: book,
        };
      } catch (error) {
        return {
          success: false,
          message: "Unable to get book with id " + input.id,
          data: [],
        };
      }
    }),

  // create book
  create: publicProcedure.input(bookSchema).mutation(async ({ ctx, input }) => {
    try {
      await ctx.db.book.create({
        data: {
          title: input.title,
          description: input.description,
          categoryId: input.categoryId,
          pages: parseInt(input.pages),
          price: parseInt(input.price),
          image: input.image,
          author: input.author,
          createdById: input.createdById,
        },
      });

      return {
        success: true,
        message: "Book created successfully",
        data: [],
      };
    } catch (error) {
      return {
        success: false,
        message: "Unable to create book",
        data: [],
      };
    }
  }),
});
