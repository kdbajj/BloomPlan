import React, { useEffect, useState } from "react";
import useTrendingStore from "../../store/useTrendingStore";

const TrendingNowPage: React.FC = () => {
  const { posts, loading, error, fetchPosts, addPost, likePost, addComment } =
    useTrendingStore();

  const [newPostTitle, setNewPostTitle] = useState("");
  const [newPostDescription, setNewPostDescription] = useState("");

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const handleAddPost = () => {
    if (newPostTitle.trim() && newPostDescription.trim()) {
      addPost(newPostTitle, newPostDescription);
      setNewPostTitle("");
      setNewPostDescription("");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="p-8 bg-gray-50 min-h-screen">
      <h2 className="text-2xl font-bold mb-6 text-purple-700">Trending Now</h2>

      {/* Admin Section: Add New Post */}
      <div className="mb-8">
        <h3 className="text-xl font-semibold mb-4 text-purple-600">
          Add New Idea
        </h3>
        <div className="bg-white p-6 rounded-lg shadow-md border border-purple-200">
          <input
            type="text"
            value={newPostTitle}
            onChange={(e) => setNewPostTitle(e.target.value)}
            placeholder="Enter post title"
            className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <textarea
            value={newPostDescription}
            onChange={(e) => setNewPostDescription(e.target.value)}
            placeholder="Enter post description"
            className="w-full p-2 mb-4 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
          />
          <button
            onClick={handleAddPost}
            className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition duration-300"
          >
            Add Post
          </button>
        </div>
      </div>

      {/* List of Posts */}
      <div>
        {posts.map((post) => (
          <div
            key={post.id}
            className="bg-white p-6 rounded-lg shadow-md mb-6 border border-purple-200"
          >
            <h3 className="text-xl font-semibold mb-2 text-purple-700">
              {post.title}
            </h3>
            <p className="text-gray-700 mb-4">{post.description}</p>
            <div className="flex items-center mb-4">
              <button
                onClick={() => likePost(post.id)}
                className="flex items-center text-gray-600 hover:text-purple-500 transition duration-300"
              >
                <span className="material-icons mr-2">thumb_up</span>
                <span>{post.likes} Likes</span>
              </button>
            </div>

            {/* Comments Section */}
            <div>
              <h4 className="text-lg font-semibold mb-2 text-purple-600">
                Comments
              </h4>
              {post.comments && post.comments.length > 0 ? (
                post.comments.map((comment) => (
                  <div key={comment.id} className="mb-2">
                    <p className="text-gray-700">{comment.text}</p>
                    <p className="text-sm text-gray-500">
                      By User {comment.user.email} on{" "}
                      {new Date(comment.createdAt).toLocaleString()}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">This post has no comments yet.</p>
              )}

              {/* Add Comment */}
              <div className="mt-4">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  className="w-full p-2 border border-purple-300 rounded-lg focus:outline-none focus:border-purple-500"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && e.currentTarget.value.trim()) {
                      addComment(post.id, e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TrendingNowPage;
