import React from "react";
import Link from "next/link";

export default function RenderItem({ textName }) {
  return (
    <li className="mt-2">
      <Link href="">
        <a className="text-indigo-600 hover:text-teal-500 hover:underline">
          {textName}
        </a>
      </Link>
    </li>
  );
}
