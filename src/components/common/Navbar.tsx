"use client";
import { useEffect, useState } from "react";
import { formatedDate } from "@/utils/sharedFunction";
import Link from "next/link";
import { FaSearch, FaCaretDown } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { getAllGenres } from "@/services/newsService";
import { useUser } from "../context/userContext";
import { Genre } from "@/types/types";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useUser();
  const pathname = usePathname();
  const [showSearch, setShowSearch] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [categories, setCategories] = useState<Genre[]>([]);
  const [showMoreDropdown, setShowMoreDropdown] = useState(false);
  const [activeNavItem, setActiveNavItem] = useState<string | null>(null);
  const [selectedMoreLabel, setSelectedMoreLabel] = useState<string | null>(
    null
  );
  const router = useRouter();

  const MAX_VISIBLE_GENRES = 12;

  const toggleSearch = () => {
    setShowSearch(!showSearch);
  };

  const handleSearch = (e: { key: string }) => {
    if (e.key === "Enter" && searchTerm.trim()) {
      router.push(`/search-result?query=${encodeURIComponent(searchTerm)}`);
    }
  };

  useEffect(() => {
    getAllGenres()
      .then((data) => {
        setCategories(data);
      })
      .catch((err) => {
        toast.error("Failed to fetch genres!");
        console.log(err);
      });
  }, []);

  useEffect(() => {
    const genrePathMatch = pathname.match(/^\/genre\/(\d+)$/);
    if (genrePathMatch) {
      setActiveNavItem(genrePathMatch[1]);
    } else if (pathname === "/articles/recommendations") {
      setActiveNavItem("recommendations");
    } else {
      setActiveNavItem(null);
      setSelectedMoreLabel(null);
    }
  }, [pathname]);

  const visibleCategories = categories.slice(0, MAX_VISIBLE_GENRES);
  const hiddenCategories = categories.slice(MAX_VISIBLE_GENRES);

  return (
    <nav className="container mx-auto">
      <div className="flex justify-between items-center py-2 px-4 bg-white">
        <div className="text-xs text-gray-500">{formatedDate(new Date())}</div>
        <div className="text-center flex-grow">
          <Link href="/">
            <h1 className="text-5xl font-serif">The Newspaper</h1>
          </Link>
        </div>
        <div className="w-20 flex items-center justify-end">
          {!user ? (
            <Link href="/login">
              <button className="bg-black text-white px-3 py-1">Login</button>
            </Link>
          ) : (
            <div className="flex items-center space-x-4">
              <Link href="/profile">{user.name}</Link>
              <Link href="/create-article">
                <button className="bg-blue-600 text-white px-3 py-1">
                  Create
                </button>
              </Link>
              <button
                onClick={logout}
                className="bg-red-600 text-white px-3 py-1"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-center items-center py-2 px-4 relative">
          <div className="flex space-x-4 m-1">
            {visibleCategories.map((category) => (
              <Link
                key={category.id}
                href={`/genre/${category.id}`}
                className={`text-gray-700 hover:text-gray-900 ${
                  activeNavItem === category.id.toString()
                    ? "font-bold text-blue-600 border-b-2 border-blue-600 "
                    : ""
                }`}
                onClick={() => {
                  setActiveNavItem(category.id.toString());
                  setSelectedMoreLabel(null); // Reset the dropdown label
                }}
              >
                {category.name}
              </Link>
            ))}
            <Link
              href="/articles/recommendations"
              className={`text-gray-700 hover:text-gray-900 ${
                activeNavItem === "recommendations"
                  ? "font-bold text-blue-600 border-b-2 border-blue-600"
                  : ""
              }`}
              onClick={() => {
                setActiveNavItem("recommendations");
                setSelectedMoreLabel(null); // Reset the dropdown label
              }}
            >
              Recommendations
            </Link>

            {hiddenCategories.length > 0 && (
              <div
                className="relative"
                onMouseEnter={() => setShowMoreDropdown(true)}
                onMouseLeave={() => setShowMoreDropdown(false)}
              >
                <button
                  className={`flex items-center text-gray-700 hover:text-gray-900 ${
                    selectedMoreLabel
                      ? "font-bold text-blue-600 border-b-2 border-blue-600"
                      : ""
                  }`}
                >
                  {selectedMoreLabel || "More"}
                  <FaCaretDown className="ml-1" />
                </button>
                {showMoreDropdown && (
                  <div className="absolute top-full left-0 bg-white border border-gray-200 rounded shadow-lg z-10">
                    {hiddenCategories.map((category) => (
                      <Link
                        key={category.id}
                        href={`/genre/${category.id}`}
                        className={`block px-4 py-2 text-gray-700 hover:bg-gray-100 ${
                          activeNavItem === category.id.toString()
                            ? "font-bold text-blue-600 border-b-2 border-blue-600 bg-gray-100"
                            : ""
                        }`}
                        onClick={() => {
                          setActiveNavItem(category.id.toString());
                          setSelectedMoreLabel(category.name); // Set the dropdown label to selected item
                          setShowMoreDropdown(false); // Close the dropdown
                        }}
                      >
                        {category.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
          <div>
            <button onClick={toggleSearch} className="ml-6 mt-2">
              <FaSearch color="gray" />
            </button>
          </div>
        </div>

        {showSearch && (
          <div className="flex justify-center w-full bg-white m-2 px-10">
            <input
              type="text"
              placeholder="Search articles here ..."
              className="w-9/12 p-2 text-sm border border-gray-800 focus:ring-0"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearch}
            />
            <button
              className="text-4xl ml-4"
              onClick={() => setShowSearch(false)}
            >
              ×
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}
