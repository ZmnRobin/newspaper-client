import React, { useEffect, useState } from "react";
import { convertDateFormat } from "@/utils/sharedFunction";
import { FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import Cookies from "js-cookie";
import Modal from "../common/Modal";
import { Comment } from "@/types/types";

interface CommentListProps {
  comments: Comment[];
  onDelete: (id: number) => void;
  onUpdate: (id: number, content: string) => void;
}

export default function CommentList({
  comments,
  onDelete,
  onUpdate,
}: CommentListProps) {
  const [editCommentId, setEditCommentId] = useState<number | null>(null);
  const [editContent, setEditContent] = useState<string>("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [deleteCommentId, setDeleteCommentId] = useState<number | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  useEffect(() => {
    const userData = Cookies.get("user");
    if (userData) {
      const parsedUser = JSON.parse(userData);
      setUserEmail(parsedUser.email);
    }
  }, []);

  const handleEdit = (comment: Comment) => {
    setEditCommentId(comment.id);
    setEditContent(comment.content);
  };

  const handleCancelEdit = () => {
    setEditCommentId(null);
    setEditContent("");
  };

  const handleConfirmDelete = (id: number) => {
    setIsDeleteModalOpen(true);
    setDeleteCommentId(id);
  };

  const handleDelete = () => {
    if (deleteCommentId) {
      onDelete(deleteCommentId);
    }
    setIsDeleteModalOpen(false);
  };

  const handleConfirmUpdate = (id: number, content: string) => {
    onUpdate(id, content);
    setEditCommentId(null);
    setEditContent("");
  };

  const isCommentOwner = (commentUserEmail: string) => {
    return userEmail === commentUserEmail;
  };

  return (
    <div className="mt-4 space-y-4">
    {comments.map((comment) => (
      <div key={comment.id} className="bg-white shadow p-4 rounded-lg">
        <div className="flex justify-between items-start">
          <div className="flex-grow">
            <h3 className="font-semibold">
              {comment.User.name} .{" "}
              <span className="text-xs text-gray-500">
                {convertDateFormat(comment.createdAt)}
              </span>
            </h3>
            {editCommentId === comment.id ? (
              <div className="flex items-center mt-2">
                <textarea
                  className="w-full border p-2"
                  value={editContent}
                  onChange={(e) => setEditContent(e.target.value)}
                />
                <button
                  onClick={() => handleConfirmUpdate(comment.id, editContent)}
                  className="ml-2 text-green-500"
                >
                  <FaCheck />
                </button>
                <button onClick={handleCancelEdit} className="ml-2 text-red-500">
                  <FaTimes />
                </button>
              </div>
            ) : (
              <p className="mt-2">{comment.content}</p>
            )}
          </div>
          {isCommentOwner(comment.User.email) && editCommentId !== comment.id && (
            <div className="flex space-x-2 ml-4">
              <button
                onClick={() => handleEdit(comment)}
                className="text-blue-500"
              >
                <FaEdit />
              </button>
              <button
                onClick={() => handleConfirmDelete(comment.id)}
                className="text-red-500"
              >
                <FaTrash />
              </button>
            </div>
          )}
        </div>
      </div>
    ))}
    {/* Delete confirmation modal */}
    <Modal
      title="Delete Comment"
      message="Are you sure you want to delete your comment for this article?"
      isOpen={isDeleteModalOpen}
      onCancel={() => setIsDeleteModalOpen(false)}
      onOk={handleDelete}
    />
  </div>
  );
}