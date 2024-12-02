import React, { useState } from "react";
import { useUser } from "../context/userContext";
import Modal from "../common/Modal";
import { useRouter } from "next/navigation";

interface CommentFormProps {
  onCreate: (content: string) => void;
}

export default function CommentForm({ onCreate }: CommentFormProps) {
  const { user } = useUser();
  const [comment, setComment] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router=useRouter();

  const handleCreateComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    if (comment.trim()) {
      onCreate(comment);
      setComment("");
    }
  };

  return (
    <>
      <form className="mt-4" onSubmit={handleCreateComment}>
        <textarea
          className="w-full border p-2"
          placeholder="Write your comment here . . ."
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
        ></textarea>
        <button className="bg-blue-500 text-white px-4 py-2 mt-2">
          Create Comment
        </button>
      </form>
      {
        isModalOpen && (
          <Modal
            title="Login Required"
            message="You need to login to create a comment"
            isOpen={isModalOpen}
            onCancel={() => setIsModalOpen(false)}
            onOk={
              () => {
                setIsModalOpen(false);
                router.push("/login");
            }}
          />
        )
      }
    </>
  );
}
