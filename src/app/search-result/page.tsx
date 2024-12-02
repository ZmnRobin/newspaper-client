"use client";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { searchArticles } from "@/services/newsService";
import { Articles } from "@/types/types";
import SearchResultSkeleton from "@/components/skeleton/SearchResultSkeleton";
import SearchCard from "@/components/search/SearchCard";
import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import CustomLoader from "@/components/loader/CustomLoader";

export default function SearchResult() {
  const [results, setResults] = useState<Articles[]>([]);
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(true);
  const searchParams = useSearchParams();
  const query = searchParams.get("query");
  const [hasMore, setHasMore] = useState(true); 

  // Fetch more search articles when scrolling reaches the end
  const fetchMoreArticles = async () => {
    if (!hasMore) return; // Stop if no more data
    try {
      const data = await searchArticles(query, page); // Fetch next page of articles
      if (data?.articles?.length > 0) {
        setResults((prev) => [...prev, ...data.articles]);
        setPage((prev) => prev + 1);
      } else {
        setHasMore(false); // No more articles to fetch
      }
    } catch (err) {
      console.error("Failed to fetch more articles");
    } finally {
      setLoading(false);
    }
  };

  // Use custom infinite scroll hook to trigger fetching more articles
  const [isFetching] = useInfiniteScroll(fetchMoreArticles);

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setPage(1); // Reset page to 1 for a new search
      setHasMore(true); // Reset hasMore to true for a new search
      try {
        const data = await searchArticles(query, 1); // Always start with page 1
        setResults(data?.articles || []);
        setLoading(false);
      } catch (err) {
        console.error("Failed to fetch articles");
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [query]); // Run effect whenever `query` changes

  if (loading) {
    return (
      <div className="container mx-auto w-9/12 p-5">
        <SearchResultSkeleton />
      </div>
    );
  }

  if (!results.length) {
    return (
      <div className="container mx-auto w-9/12 p-5">
        <h1 className="text-3xl font-semibold mb-4">
          <span className="text-2xl text-gray-400">No results found for </span>"{query}".
        </h1>
      </div>
    );
  }

  return (
    <div className="container mx-auto w-9/12 p-5">
      <h1 className="text-3xl font-semibold mb-4">
        <span className="text-2xl text-gray-400">Search results for </span>"{query}".
      </h1>
      {results.map((article) => (
        <SearchCard key={article.id} article={article} />
      ))}
      {isFetching && hasMore && (
        <CustomLoader />
      )}
    </div>
  );
}
