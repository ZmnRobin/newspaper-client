import React, { useState } from "react";
import Modal from "../common/Modal";
import ArticleCard from "./ArticleCard";
import { Articles } from "@/types/types";
import ArticleCardSkeleton from "../skeleton/ArticleCardSkeleton";

interface MyArticleProps {
  articles: Articles[];
  onDelete: (id: number) => void;
  loading: boolean;
}

export default function MyArticle({ articles, onDelete, loading }: MyArticleProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [articleToDelete, setArticleToDelete] = useState<number | null>(null);

  const handleDelete = (id: number) => {
    setIsModalOpen(true);
    setArticleToDelete(id);
  };

  const confirmDelete = () => {
    if (articleToDelete !== null) {
      onDelete(articleToDelete);
    }
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading
          ? Array.from({ length: 8 }).map((_, index) => (
              <ArticleCardSkeleton key={index} />
            ))
          : articles.map((article) => (
              <ArticleCard
                key={article.id}
                article={article}
                onDelete={handleDelete}
              />
            ))}
      </div>

      <Modal
        title="Confirm Delete"
        message="Are you sure you want to delete this article?"
        isOpen={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        onOk={confirmDelete}
      />
    </>
  );
}