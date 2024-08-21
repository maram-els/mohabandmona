import React from 'react';
import '../styles.css'; // Assuming your styles file is in place

const ConfirmDeleteModal = ({ name, onConfirm, onCancel }) => {
  return (
    <div className="db-modal-backdrop">
      <div className="db-modal-content">
        <h2>Delete Confirmation</h2>
        <p>Are you sure you want to delete '{name}'?</p>
        <div className="db-modal-buttons">
          <button onClick={onConfirm} className="confirm-button">Yes</button>
          <button onClick={onCancel} className="cancel-button">No</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeleteModal;
