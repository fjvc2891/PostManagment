import React from "react";

const NotificationModal = ({ message, onClose }) => (
  <div className="modal">
    <p>{message}</p>
    <button onClick={onClose}>Close</button>
  </div>
);

export default NotificationModal;
