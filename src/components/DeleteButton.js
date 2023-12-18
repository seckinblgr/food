import React from "react";
import { useState } from "react";

const DeleteButton = ({ label, onDelete }) => {
  const [showConfirm, setShowConfrim] = useState(false);

  if (showConfirm) {
    return (
      <>
        <div>
          <label className="text-sm text-gray-500">Are you sure you want to delete ?</label>
        </div>
        <div className="flex gap-2 mt-1">
          <button type="button" onClick={() => setShowConfrim(false)}>
            Cancel
          </button>
          <button
            type="button"
            className="bg-red-500 text-white"
            onClick={onDelete}
          >
            Delete
          </button>
        </div>
      </>
    );
  }
  return (
    <button type="button" onClick={() => setShowConfrim(true)}>
      {label}
    </button>
  );
};

export default DeleteButton;
