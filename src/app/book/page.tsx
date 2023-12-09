"use client";

import { type NextPage } from "next";
import { api } from "@/trpc/react";

const BookList: NextPage = () => {
  const { data } = api.book.getAll.useQuery();

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#2e026d] to-[#15162c] text-white">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
        <h1 className="text-5xl font-extrabold tracking-tight sm:text-[5rem]">
          <span className="text-[hsl(280,100%,70%)]">Books</span>
        </h1>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {data?.data.map((book) => (
            <div
              key={book.id}
              className="flex flex-col gap-4 rounded-xl bg-white/10 p-4 hover:bg-white/20"
            >
              <h3 className="text-2xl font-bold">{book.title}</h3>
              <div className="text-lg">{book.author}</div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default BookList;
