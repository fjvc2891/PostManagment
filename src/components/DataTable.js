import React, { useState, useEffect } from "react";
import { fetchPosts, deletePost, updatePost, createPost } from "../services/api";
import PostFormModal from "./PostFormModal";
import NotificationModal from "./NotificactionModal";
import "../styles.css"

const DataTable = () => {
  const [posts, setPosts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalType, setModalType] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);
  const [notification, setNotification] = useState("");

  const postsPerPage = 10;

  useEffect(() => {
    fetchPosts().then(setPosts);
  }, []);

  // Eliminar un post basado en userId e id
  const handleDelete = async (userId, id) => {
    await deletePost(id);
    setPosts((prevPosts) =>
      prevPosts.filter((post) => !(post.userId === userId && post.id === id))
    );
    setNotification("Post deleted successfully");
  };

  // Guardar un post (crear o actualizar)
const handleSave = async (post) => {
  if (modalType === "edit") {
    await updatePost(post.id, post);
    setPosts((prevPosts) =>
      prevPosts.map((p) =>
        p.id === post.id && p.userId === post.userId ? post : p
      )
    );
    setNotification("Post updated successfully");
  } else if (modalType === "create") {
    const newPost = await createPost(post);
    // Agregar manualmente el userId al nuevo post
    newPost.userId = 11;
    setPosts([...posts, newPost]);
    setNotification("Post created successfully");
  }
  closeModal();
};


  // Cambiar de página
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Abrir y cerrar modales
  const openModal = (type, post = null) => {
    setModalType(type);
    setSelectedPost(post);
  };

  const closeModal = () => {
    setModalType(null);
    setNotification("");
  };

  // Obtener posts paginados
  const paginatedPosts = posts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  return (
    <div>
      <button className="btn btn-create" onClick={() => openModal("create")}>
  + Create Post
</button>
      <table className="datatable">
        <thead>
          <tr>
            <th>User Id</th>
            <th>Id</th>
            <th>Title</th>
            <th>Body</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedPosts.map((post) => (
            <tr key={`${post.userId}-${post.id}`}>
              <td>{post.userId}</td>
              <td>{post.id}</td>
              <td>{post.title}</td>
              <td>{post.body}</td>
              <td>
                <button onClick={() => openModal("edit", post)}>Edit</button>
                <button
                  onClick={() => handleDelete(post.userId, post.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Pagination
        currentPage={currentPage}
        totalPages={Math.ceil(posts.length / postsPerPage)}
        onPageChange={handlePageChange}
      />
      {modalType && (
        <PostFormModal
          type={modalType}
          post={selectedPost}
          onClose={closeModal}
          onSave={handleSave}
        />
      )}
      {notification && (
        <NotificationModal message={notification} onClose={closeModal} />
      )}
    </div>
  );
};

// Componente de paginación (sin cambios)
const Pagination = ({ currentPage, totalPages, onPageChange }) => (
  <div className="pagination">
    {Array.from({ length: totalPages }, (_, i) => (
      <button
        key={i + 1}
        onClick={() => onPageChange(i + 1)}
        className={currentPage === i + 1 ? "active" : ""}
      >
        {i + 1}
      </button>
    ))}
  </div>
);

export default DataTable;
