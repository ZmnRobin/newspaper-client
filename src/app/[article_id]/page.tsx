"use client";
import SingleArticle from "@/components/singleArticle/SingleArticle";
import SingleArticleSkeleton from "@/components/skeleton/SingleArticleSkeleton";
import { getSingleArticlesById } from "@/services/newsService";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ArticleDetailsPage() {
  const params = useParams();
  const { article_id } = params;
  const [article, setArticle] = useState(null);
  const [loading,setLoading]= useState(false);
  const [error,setError]=useState("");

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      try {
        const data = await getSingleArticlesById(article_id);
        setArticle(data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch news');
        toast.error('Failed to fetch single news');
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return <SingleArticleSkeleton />;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
  <>
    {error && <div>{error}</div>}
    {article && <SingleArticle article={article} />}
  </>
);
}
