"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import MyArticle from "@/components/profile/MyArticle";
import { useUser } from "@/components/context/userContext";
import toast from "react-hot-toast";
import { Articles } from "@/types/types";
import axiosInstance from "@/services";
import { getArticlesByAuthor } from "@/services/newsService";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import CustomLoader from "@/components/loader/CustomLoader";

export default function UserProfilePage() {
  const { user } = useUser();
  const [articles, setArticles] = useState<Articles[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1); 
  const [hasMore, setHasMore] = useState(true); 

  // Fetch more articles when scrolling reaches the end
  const fetchMoreArticles = async () => {
    if (!hasMore) return; // Stop if no more data
    try {
      const data = await getArticlesByAuthor(user?.id,page); // Fetch next page of articles
      if (data?.articles?.length > 0) {
        setArticles((prev) => [...prev, ...data?.articles]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false); // No more articles to fetch
      }
    } catch (err) {
      setError("Failed to fetch more articles");
    } finally {
      setLoading(false);
    }
  };

   // Use custom infinite scroll hook to trigger fetching more articles
   const [isFetching] = useInfiniteScroll(fetchMoreArticles);


  useEffect(() => {
    const fetchArticles = async () => {
      if (!user) {
        setLoading(false);
        return;
      }
      try {
        const response = await getArticlesByAuthor(user?.id,page);
        setArticles(response?.articles);
        if (response?.articles.length === 0) {
          toast.error("No articles found");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          // Handle specific Axios errors
          if (!error.response) {
            // Network error
            setError("Network error. Please check your connection.");
            toast.error("Network error. Please check your connection.");
          } else {
            // API response error
            setError(error.response.data?.message || "Failed to fetch articles");
            toast.error(error.response.data?.message || "Failed to fetch articles");
          }
        } else {
          // Other errors
          setError("An unexpected error occurred");
          toast.error("An unexpected error occurred");
        }
      } finally {
        setLoading(false);
      }
    };
  
    fetchArticles();
  }, [user]);

  const handleDelete = async (articleId: number) => {
    try {
      await axiosInstance.delete(`/api/articles/${articleId}`);
      setArticles((prevArticles) =>
        prevArticles.filter((article) => article.id !== articleId) // Check if both are numbers
      );
      toast.success("Article deleted successfully!");
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Handle specific Axios errors
        if (!error.response) {
          // Network error
          toast.error("Network error. Please check your connection.");
        } else {
          // API response error
          toast.error(
            error.response.data?.message || "Failed to delete the article"
          );
        }
      } else {
        // Other errors
        toast.error("An unexpected error occurred");
      }
    }
  };
  
  
  if (error) {
    return (
      <div className="container mx-auto p-6 text-center">
        <h1 className="text-2xl font-bold mb-6">My Articles</h1>
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Try Again
        </button>
      </div>
    );
  }

  if(articles.length === 0){
    return (
      <div className="container">
        <h1 className="text-2xl font-bold mb-6">My Articles</h1>
        <p className="text-red-500">No articles found</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">My Articles</h1>
      <MyArticle articles={articles} onDelete={handleDelete} loading={loading} />
      {isFetching && hasMore && <CustomLoader/>}
    </div>
  );
}