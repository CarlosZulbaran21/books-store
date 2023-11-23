import { useEffect, useState } from "react";
import { findAllBooks } from "./services/find-all-books";
import { filterByGenre } from "./services/filter-genre";
import { Link } from "react-router-dom";

export default function Component() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    findAllBooks().then((res) => setBooks(res.data));
  }, []);

  const handleChange = async (e) => {
    const value = e.target.value;
    const { data } = await filterByGenre(value);
    setBooks(data);
  };
  return (
    <section className="w-full min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="container px-4 mx-auto text-center">
        <div className="flex items-start space-x-4">
          <input
            type="text"
            placeholder="Search Genres..."
            className="ml-10 px-4 py-2 bg-gray-800 text-white border border-gray-700 rounded-md focus:outline-none focus:border-blue-500"
            onChange={handleChange}
          />
        </div>
        <div className="mt-8">
          <div className="space-y-2">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-500">
              Books store
            </h1>
            <p className="max-w-[600px] text-zinc-200 text-sm sm:text-base md:text-lg dark:text-zinc-100 mx-auto">
              Our books are available to enhance your productivity and
              streamline your workflow.
            </p>
          </div>
          <div className="w-full max-w-full mt-6 space-y-4 mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
              {books.map((book) => (
                <Link
                  className="flex flex-col items-center space-y-2 border-gray-800 p-4 rounded-lg transition-transform hover:scale-105 cursor-pointer shadow-md"
                  key={book._id}
                  to={{ pathname: `/book/${book._id}` }}
                >
                  <div className="p-2 bg-black bg-opacity-50 rounded-full">
                    <IconInbox className="text-white h-6 w-6 mb-2 opacity-75" />
                  </div>
                  <h2 className="text-lg sm:text-xl font-bold text-white">
                    {book.title}
                  </h2>
                  <p className="text-xs sm:text-sm md:text-base text-zinc-200 dark:text-zinc-100">
                    {book.description}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function IconInbox(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="22 12 16 12 14 15 10 15 8 12 2 12" />
      <path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" />
    </svg>
  );
}
