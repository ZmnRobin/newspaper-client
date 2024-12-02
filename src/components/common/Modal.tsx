// components/Modal.tsx
import React from 'react';

interface ModalProps {
  title: string;
  message: string;
  isOpen: boolean;
  onCancel: () => void;
  onOk: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, message, isOpen, onCancel, onOk }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>
        <p className="mb-6">{message}</p>
        <div className="flex justify-end space-x-4">
          <button
            className="bg-gray-300 text-black px-4 py-2 rounded hover:bg-gray-400"
            onClick={onCancel}
          >
            Cancel
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            onClick={onOk}
          >
            OK
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
