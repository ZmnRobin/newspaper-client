"use client";
import React, { useState, useEffect } from "react";
import axiosInstance from "@/services";
import { useRouter } from "next/navigation";
import { backendUrl } from "@/configs/constants";
import { getImageSrc } from "@/utils/sharedFunction";
import toast from "react-hot-toast";
import { FaPlus, FaTimes } from "react-icons/fa";
import { createGenre } from "@/services/newsService";
import { useUser } from "../context/userContext";

interface Genre {
  id: number;
  name: string;
}

interface ArticleFormProps {
  article?: {
    title: string;
    content: string;
    thumbnail: string;
    Genres: Genre[];
  };
  editId?: string;
}

export default function ArticleForm({ article, editId }: ArticleFormProps) {
  const [title, setTitle] = useState(article?.title || "");
  const [content, setContent] = useState(article?.content || "");
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [genres, setGenres] = useState<Genre[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<number[]>(
    article?.Genres ? article.Genres.map((genre) => genre.id) : []
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newGenreName, setNewGenreName] = useState("");
  const router = useRouter();
  const { setCreatedArticle } = useUser();

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await axiosInstance.get(`${backendUrl}/api/genres`);
        setGenres(response.data);
      } catch (error) {
        console.error("Error fetching genres:", error);
        toast.error("Failed to fetch genres");
      }
    };
    fetchGenres();

    // Set initial thumbnail preview for edit mode
    if (editId && article?.thumbnail) {
      setThumbnailPreview(getImageSrc(article.thumbnail));
    }
  }, [editId, article]);

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setThumbnailFile(file);
      const previewUrl = URL.createObjectURL(file);
      setThumbnailPreview(previewUrl);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    setThumbnailPreview(null);
  };

  const handleGenreToggle = (id: number) => {
    setSelectedGenres((prevGenres) =>
      prevGenres.includes(id) ? prevGenres.filter((genreId) => genreId !== id) : [...prevGenres, id]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title.trim()) {
      toast.error("Title is required");
      return;
    }

    if (!content.trim()) {
      toast.error("Content is required");
      return;
    }

    if (!thumbnailPreview && !editId) {
      toast.error("A thumbnail image is required in order to create an article");
      return;
    }

    if (selectedGenres.length === 0) {
      toast.error("At least one genre must be selected");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }
    selectedGenres.forEach((genreId) => {
      formData.append("genreIds[]", genreId.toString());
    });

    try {
      if (editId) {
        await axiosInstance.put(`${backendUrl}/api/articles/${editId}`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Article updated successfully!");
        router.push("/profile");
      } else {
        await axiosInstance.post(`${backendUrl}/api/articles`, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        toast.success("Article created successfully!");
        setCreatedArticle(true);
        router.push("/");
      }
    } catch (error) {
      console.error(editId ? "Error updating article" : "Error creating article", error);
      toast.error("An error occurred while submitting the article");
    }
  };

  const handleCreateGenre = async () => {
    if (!newGenreName.trim()) {
      toast.error("Genre name cannot be empty");
      return;
    }

    try {
      const createdGenre = await createGenre(newGenreName);
      setGenres([...genres, createdGenre]);
      setIsModalOpen(false);
      setNewGenreName("");
      toast.success("Genre created successfully!");
    } catch (error) {
      console.error("Error creating genre:", error);
      toast.error("Failed to create genre");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
        <input
          type="text"
          placeholder="Give a title to your article"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full text-2xl font-bold p-2 border border-gray-300 rounded"
          required
        />

        <div className="relative w-full border p-2">
          {thumbnailPreview ? (
            <>
              <img src={thumbnailPreview} alt="Thumbnail preview" className="w-full mt-2" />
              <FaTimes
                onClick={handleRemoveThumbnail}
                className="absolute top-2 right-2 cursor-pointer text-red-600 bg-white rounded-full p-1"
                size={20}
              />
            </>
          ) : (
            <input type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleThumbnailChange} />
          )}
        </div>

        <h2 className="text-lg font-bold flex justify-between">
          Select Genres
          <FaPlus
            onClick={() => setIsModalOpen(true)}
            className="ml-2 text-gray-500 cursor-pointer bg-gray-200 rounded-full p-1"
            size={30}
            title="Create new genre"
          />
        </h2>
        <div className="flex flex-wrap gap-2">
          {genres.map((genre) => (
            <span
              key={genre.id}
              onClick={() => handleGenreToggle(genre.id)}
              className={`cursor-pointer px-3 py-1 rounded-full text-white ${
                selectedGenres.includes(genre.id) ? "bg-blue-500" : "bg-gray-500"
              }`}
            >
              {genre.name}
            </span>
          ))}
        </div>

        <textarea
          placeholder="Write your article content here . . ."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full h-64 p-2 border border-gray-300 rounded"
          required
        ></textarea>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded mb-5">
          {editId ? "Update Article" : "Create Article"}
        </button>
      </form>

      {/* Genre Creation Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Create New Genre</h2>
            <input
              type="text"
              placeholder="Genre name"
              value={newGenreName}
              onChange={(e) => setNewGenreName(e.target.value)}
              className="w-full border p-2 rounded mb-4"
            />
            <div className="flex justify-end gap-2">
              <button
                onClick={() => {
                  setIsModalOpen(false);
                  setNewGenreName("");
                }}
                className="bg-gray-500 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button onClick={handleCreateGenre} className="bg-blue-600 text-white px-4 py-2 rounded">
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}