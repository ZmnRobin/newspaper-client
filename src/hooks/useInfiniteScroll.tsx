"use client";
import { useEffect, useState } from "react";

export const useInfiniteScroll = (fetchMoreData: () => Promise<void>) => {
  const [isFetching, setIsFetching] = useState(false);

  const handleScroll = () => {
    if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight || isFetching) {
      return;
    }
    setIsFetching(true);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isFetching]);

  useEffect(() => {
    if (!isFetching) return;
    fetchMoreData().then(() => setIsFetching(false));
  }, [isFetching, fetchMoreData]);

  return [isFetching];
};
