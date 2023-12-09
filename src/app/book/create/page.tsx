"use client";

import type { NextPage } from "next";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BookType } from "@/server/api/schemas";
import { bookSchema } from "@/server/api/schemas";
import { api } from "@/trpc/react";

const CreateBook: NextPage = () => {
  const { register, handleSubmit } = useForm<BookType>({
    mode: "onSubmit",
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      image: "",
      price: "",
      pages: "",
      categoryId: "",
      createdById: "",
    },
  });

  const { mutateAsync } = api.book.create.useMutation();
  const onSubmit: SubmitHandler<BookType> = async (data) => {
    await mutateAsync(data);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col items-center justify-center gap-4"
        >
          <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
            Create <span className="text-[hsl(280,100%,70%)]">Book</span>
          </h1>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Title</label>
            <input
              {...register("title")}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Author</label>
            <input
              {...register("author")}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Description</label>
            <textarea
              {...register("description")}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Cover</label>
            <input
              {...register("image")}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Price</label>
            <input
              {...register("price")}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Pages</label>
            <input
              {...register("pages")}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Category</label>
            <input
              {...register("categoryId")}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Created By</label>
            <input
              {...register("createdById")}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
          </div>
          <button
            type="submit"
            className="rounded-full bg-[#2e026d] px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
          >
            Submit
          </button>
        </form>
      </div>
    </main>
  );
};

export default CreateBook;
