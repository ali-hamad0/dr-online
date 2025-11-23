import React, { useState } from "react";
import "../styles/Dashboard.css";

const Dashboard = ({ user, posts, setPosts }) => {
  const [postText, setPostText] = useState("");
  const [filter, setFilter] = useState("all");

  const [commentInput, setCommentInput] = useState({});
  const [editingPostId, setEditingPostId] = useState(null);
  const [editText, setEditText] = useState("");

  if (!user) {
    return (
      <div className="dashboard">
        <header className="dash-header">
          <h1>Discussion Board</h1>
        </header>
        <p>‼️ Please login or register to join the discussion.</p>
      </div>
    );
  }

  // ✅ add post
  const handlePost = (e) => {
    e.preventDefault();
    if (!postText.trim()) return;

    const newPost = {
      id: Date.now(),
      author: user.name,
      role: user.role,
      text: postText,
      likes: [],
      comments: [],
      date: new Date().toLocaleString(),
    };

    setPosts((prev) => [newPost, ...prev]);
    setPostText("");
  };

  // ✅ delete post
  const handleDelete = (id) => {
    setPosts((prev) => prev.filter((p) => p.id !== id));
  };

  // ✅ start edit
  const startEdit = (post) => {
    setEditingPostId(post.id);
    setEditText(post.text);
  };

  // ✅ save edit
  const saveEdit = () => {
    if (!editText.trim()) return;

    setPosts((prev) =>
      prev.map((p) => (p.id === editingPostId ? { ...p, text: editText } : p))
    );

    setEditingPostId(null);
    setEditText("");
  };

  // ✅ cancel edit
  const cancelEdit = () => {
    setEditingPostId(null);
    setEditText("");
  };

  // ✅ like / unlike
  const toggleLike = (id) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === id
          ? {
              ...p,
              likes: p.likes.includes(user.name)
                ? p.likes.filter((n) => n !== user.name)
                : [...p.likes, user.name],
            }
          : p
      )
    );
  };

  //   add comment
  const addComment = (postId) => {
    const text = commentInput[postId];
    if (!text || !text.trim()) return;

    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? {
              ...p,
              comments: [...p.comments, { author: user.name, text }],
            }
          : p
      )
    );

    setCommentInput((prev) => ({ ...prev, [postId]: "" }));
  };

  // filter

  const filteredPosts =
    filter === "all" ? posts : posts.filter((p) => p.role === filter);

  return (
    <div className="dashboard">
      <header className="dash-header">
        <h1>Discussion Board</h1>
        <p>
          Welcome <b>{user.name}</b> ({user.role})
        </p>
      </header>

      {/* CREATE POST */}
      <form className="new-post-form" onSubmit={handlePost}>
        <textarea
          placeholder={
            user.role === "doctor"
              ? "Share medical advice or studies..."
              : "Ask a question..."
          }
          value={postText}
          onChange={(e) => setPostText(e.target.value)}
        />
        <button type="submit" className="post-btn">
          Post
        </button>
      </form>

      {/* FILTERS */}
      <div className="filters">
        <button
          onClick={() => setFilter("all")}
          className={filter === "all" ? "active" : ""}
        >
          All
        </button>
        <button
          onClick={() => setFilter("doctor")}
          className={filter === "doctor" ? "active" : ""}
        >
          Doctors
        </button>
        <button
          onClick={() => setFilter("patient")}
          className={filter === "patient" ? "active" : ""}
        >
          Patients
        </button>
      </div>

      {/* POSTS */}
      <div className="posts-section">
        {filteredPosts.length === 0 ? (
          <p>No posts yet...</p>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <div className="post-header">
                <b>{post.author}</b>
                <span className={`tag ${post.role}`}>{post.role}</span>
              </div>

              {editingPostId === post.id ? (
                <div className="edit-box">
                  <textarea
                    value={editText}
                    onChange={(e) => setEditText(e.target.value)}
                  />
                  <div className="edit-actions">
                    <button onClick={saveEdit}>Save</button>
                    <button onClick={cancelEdit}>Cancel</button>
                  </div>
                </div>
              ) : (
                <p className="post-text">{post.text}</p>
              )}

              <div className="post-footer">
                <small>{post.date}</small>
                <button onClick={() => toggleLike(post.id)}>
                  ❤️ {post.likes.length}
                </button>
                {post.author === user.name ? (
                  <div>
                    <button onClick={() => startEdit(post)}>Edit</button>
                    <button onClick={() => handleDelete(post.id)}>
                      Delete
                    </button>
                  </div>
                ) : null}
              </div>

              {/* COMMENTS */}
              <div className="comments">
                {post.comments.map((c, i) => (
                  <p key={i} className="comment">
                    <b>{c.author}</b>: {c.text}
                  </p>
                ))}

                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInput[post.id] || ""}
                  onChange={(e) =>
                    setCommentInput({
                      ...commentInput,
                      [post.id]: e.target.value,
                    })
                  }
                />
                <button onClick={() => addComment(post.id)}>Send</button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
