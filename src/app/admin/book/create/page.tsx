"use client";

import type { NextPage } from "next";
import Image from "next/image";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import type { BookType } from "@/server/api/schemas";
import { bookSchema } from "@/server/api/schemas";
import { api } from "@/trpc/react";

const CreateBook: NextPage = () => {
  const {
    register,
    handleSubmit,
    setValue,
    setError,
    clearErrors,
    watch,
    formState: { errors },
  } = useForm<BookType>({
    mode: "onSubmit",
    resolver: zodResolver(bookSchema),
    defaultValues: {
      title: "",
      author: "",
      description: "",
      image: undefined,
      price: "",
      pages: "",
      categoryId: "",
      createdById: "",
    },
  });

  // handles the form submit event
  const { mutateAsync } = api.book.create.useMutation();
  const onSubmit: SubmitHandler<BookType> = async (data) => {
    await mutateAsync(data);
  };

  // hnadles the file change event
  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      const validTypes = ["image/jpeg", "image/png"];
      if (!validTypes.includes(file.type)) {
        // Set an error message if the file type is not valid
        setError("image", {
          type: "validate",
          message: "Only jpg and png files are allowed",
        });
      } else {
        // Clear any previous errors and set the file as the value of the image field
        clearErrors("image");

        // convert image file to base64 string
        const reader = new FileReader();
        reader.readAsDataURL(file as Blob);
        reader.onload = () => {
          setValue("image", reader.result as string);
        };
      }
    }
  };

  // render the uploaded image
  const renderImage = () => {
    const image = watch("image");
    if (image) {
      return (
        <div className="relative h-32 w-32">
          <Image
            src={image}
            alt="Book Cover"
            layout="fill"
            objectFit="cover"
            className="rounded-xl"
          />
        </div>
      );
    }
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
              {...register("title", { required: "This is required" })}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
            <small className="text-red-500">{errors.title?.message}</small>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Author</label>
            <input
              {...register("author", { required: "This is required" })}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
            <small className="text-red-500">{errors.author?.message}</small>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Description</label>
            <textarea
              {...register("description", {
                required: "This is required",
                maxLength: {
                  value: 200,
                  message: "Max length exceeded",
                },
              })}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            />
            <small className="text-red-500">
              {errors.description?.message}
            </small>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Cover</label>
            <input
              onChange={onFileChange}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="file"
            />
            <small className="text-red-500">{errors.image?.message}</small>

            {renderImage()}
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Price</label>
            <input
              {...register("price", {
                required: "This is required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Only numbers are allowed",
                },
              })}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
            <small className="text-red-500">{errors.price?.message}</small>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Pages</label>
            <input
              {...register("pages", {
                required: "This is required",
                pattern: {
                  value: /^[0-9]+$/i,
                  message: "Only numbers are allowed",
                },
              })}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
              type="text"
            />
            <small className="text-red-500">{errors.pages?.message}</small>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Category</label>
            <select
              {...register("categoryId", { required: "This is required" })}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              <option value="65740ced69db79c7514e6e76">Test</option>
            </select>
            <small className="text-red-500">{errors.categoryId?.message}</small>
          </div>
          <div className="flex flex-col items-center justify-center gap-4">
            <label className="text-2xl font-bold">Created By</label>
            <select
              {...register("createdById", { required: "This is required" })}
              className="rounded-full bg-white/10 px-10 py-3 font-semibold no-underline transition hover:bg-white/20"
            >
              <option value="65740d5069db79c7514e6e78">John Doe</option>
            </select>
            <small className="text-red-500">
              {errors.createdById?.message}
            </small>
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
