"use client";
import ArticleList from "@/components/articles/ArticleList";
import CustomLoader from "@/components/loader/CustomLoader";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import { getRecommensdedArticles } from "@/services/newsService";
import { Articles } from "@/types/types";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

function RecommendationsPage() {
  const [articles, setArticles] = useState<Articles[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1); 
  const [error, setError] = useState("");
  const [hasMore, setHasMore] = useState(true); 

  const fetchMoreArticles = async () => {
    if (!hasMore) return; // Stop if no more data
    try {
      const data = await getRecommensdedArticles(page); // Fetch next page of articles
      if (data?.articles?.length > 0) {
        setArticles((prev) => [...prev, ...data?.articles]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false); // No more articles to fetch
      }
    } catch (err) {
      setError("Failed to fetch more articles");
      toast.error("Failed to fetch more articles");
    } finally {
      setLoading(false);
    }
  };

  const [isFetching] = useInfiniteScroll(fetchMoreArticles);

  // Fetch initial news on component mount
  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      try {
        const data = await getRecommensdedArticles(page);
        setArticles(data?.articles);
        setPage((prev) => prev + 1); 
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, []);

  return (
    <>
      {error && <div>{error}</div>}
      <ArticleList articles={articles} loading={loading} />
      {isFetching && hasMore && <CustomLoader/>}
    </>
  );
}

export default RecommendationsPage;
