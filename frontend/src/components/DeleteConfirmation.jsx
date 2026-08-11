import React from "react";
import './DeleteConfirmation.css';

const DeleteConfirmation = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Delete Transaction",
  message = "Are you sure you want to delete this transaction? This action cannot be undone."
}) => {

  if (!isOpen) return null;

  return (
    <div className="deleteOverlay">

      <div className="deleteModal">

        <h2>
          {title}
        </h2>

        <p>
          {message}
        </p>


        <div className="deleteActions">

          <button
            onClick={onClose}
            className="cancelBtn"
          >
            Cancel
          </button>


          <button
            onClick={onConfirm}
            className="deleteBtn"
          >
            Delete
          </button>

        </div>

      </div>

    </div>
  );
};

export default DeleteConfirmation;