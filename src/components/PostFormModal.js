import React, { useState } from "react";


const PostFormModal = ({ type, post, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    userId: post?.userId || "",
    id: post?.id || "",
    title: post?.title || "",
    body: post?.body || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{type === "edit" ? "Edit Post" : "Create Post"}</h2>
        <form onSubmit={handleSubmit}>
          {type === "edit" && (
            <>
              <div className="form-group">
                <label>User ID</label>
                <input
                  type="text"
                  name="userId"
                  value={formData.userId}
                  readOnly
                  className="form-control"
                />
              </div>
              <div className="form-group">
                <label>ID</label>
                <input
                  type="text"
                  name="id"
                  value={formData.id}
                  readOnly
                  className="form-control"
                />
              </div>
            </>
          )}
          <div className="form-group">
            <label>Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter post title"
            />
          </div>
          <div className="form-group">
            <label>Body</label>
            <textarea
              name="body"
              value={formData.body}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter post body"
              rows="4"
            />
          </div>
          <div className="modal-actions">
            <button type="submit" className="btn btn-primary">
              Save
            </button>
            <button onClick={onClose} type="button" className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostFormModal;
