"use client";

import { type NextPage } from "next";
import Link from "next/link";
import NanoClamp from "nanoclamp";
// import { api } from "@/trpc/react";

const BookList: NextPage = () => {
  // const { data } = api.book.getAll.useQuery();
  const books = [
    {
      id: "60c6b8e0d8f9b2001b9b6e1a",
      title: "The Art of Doing Science and Engineering",
      description:
        "The Art of Doing Science and Engineering is a reminder that a childlike capacity for learning and creativity are accessible to everyone.",
      category: "Science",
      author: "Richard W. Hamming",
    },
    {
      id: "60c6b8e0d8f9b2001b9b6e1b",
      title: "Blood and Fire",
      description:
        "Blood and Fire is a history of the Christian church's mission to spread the Gospel and establish the church among poor and oppressed people.",
      category: "History",
      author: "Tom Frame",
    },
    {
      id: "60c6b8e0d8f9b2001b9b6e1c",
      title: "The Pragmatic Programmer",
      description:
        "The Pragmatic Programmer is a book about software engineering by Andrew Hunt and David Thomas, published in October 1999.",
      category: "Programming",
      author: "Andrew Hunt",
    },
    {
      id: "60c6b8e0d8f9b2001b9b6e1d",
      title: "The Art of Computer Programming",
      description:
        "The Art of Computer Programming is a comprehensive monograph written by Donald Knuth that covers many kinds of programming algorithms and their analysis.",
      category: "Programming",
      author: "Donald Knuth",
    },
  ];

  return (
    <main className="rounded-lg border bg-white py-4 sm:py-6 lg:py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:items-center">
          <div className="sm:flex-auto">
            <h1 className="text-base font-semibold leading-6 text-gray-900">
              Books
            </h1>
            <p className="mt-2 text-sm text-gray-700">
              A list of all the books in the store.
            </p>
          </div>
          <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
            <Link
              href="/admin/book/create"
              className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add book
            </Link>
          </div>
        </div>
        <div className="mt-8 flow-root">
          <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <table className="min-w-full divide-y divide-gray-300">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-3"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Author
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-3"
                    >
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {books.map((book) => (
                    <tr key={book.id} className="even:bg-gray-50">
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-3">
                        {book.title}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <NanoClamp lines={1} is="div" text={book.description} />
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {book.category}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {book.author}
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-3">
                        <a
                          href="#"
                          className="rounded-md bg-indigo-100 px-6 py-2 text-indigo-600 hover:bg-indigo-200 hover:text-indigo-900"
                        >
                          Edit<span className="sr-only">, {book.id}</span>
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default BookList;
