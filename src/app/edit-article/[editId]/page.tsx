"use client";
import ArticleForm from "@/components/articleForm/ArticleForm";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/services";
import { backendUrl } from "@/configs/constants";

export default function EditArticlePage() {
  const params = useParams();
  const { editId } = params as { editId: string };

  const [articleData, setArticleData] = useState(null);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axiosInstance.get(`${backendUrl}/api/articles/${editId}`);
        setArticleData(response.data); 
      } catch (error) {
        console.error("Error fetching article:", error);
      }
    };

    if (editId) {
      fetchArticle();
    }
  }, [editId]);

  return (
    <div className="mb-5">
      <h1 className="text-5xl m-8 text-center">Edit your article here . . .</h1>
      {/* Pass the fetched article data as props */}
      {articleData && <ArticleForm article={articleData} editId={editId} />}
    </div>
  );
}
