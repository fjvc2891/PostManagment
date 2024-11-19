const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => {
  const response = await fetch(API_URL);
  return response.json();
};

export const createPost = async (post) => {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  });
  return response.json();
};

export const updatePost = async (id, post) => {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(post)
  });
  return response.json();
};

export const deletePost = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
