import React from "react";
import Link from "next/link";
import Image from "next/image";
import { convertDateFormat, getImageSrc } from "@/utils/sharedFunction";
import { FaTrash, FaEdit } from "react-icons/fa";
import { Articles } from "@/types/types";

interface ArticleCardProps {
  article: Articles;
  onDelete: (id: number) => void;
}

export default function ArticleCard({ article, onDelete }: ArticleCardProps) {
  return (
    <div className="bg-white border p-4">
      <Link href={`/${article.id}`}>
        <div className="relative w-full h-60">
          <Image
            src={getImageSrc(article?.thumbnail || "")}
            alt={article?.title as string}
            fill
            objectFit="cover"
            className=""
          />
        </div>
      </Link>
      <Link
        href={`/${article.id}`}
        className="text-lg font-bold mb-2 mt-2 line-clamp-1 hover:text-sky-500"
      >
        {article.title}
      </Link>
      <p className="text-sm mb-4 line-clamp-4">{article.content}</p>
      <p className="text-xs text-gray-500 mb-4">
        Published on: {convertDateFormat(article.createdAt.toString())}
      </p>
      <div className="flex space-x-2 justify-end">
        <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          <Link href={`/edit-article/${article.id}`}>
            <FaEdit />
          </Link>
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
          onClick={() => onDelete(article.id)}
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}
