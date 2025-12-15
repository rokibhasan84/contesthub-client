import React from "react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col justify-center items-center text-center px-3">
      <h1 className="text-6xl font-bold text-red-500">404</h1>
      <p className="text-xl mt-4">Page Not Found</p>

      <Link
        to="/"
        className="mt-6 bg-blue-500 text-white px-6 py-2 rounded"
      >
        Go Home
      </Link>
    </div>
  );
}