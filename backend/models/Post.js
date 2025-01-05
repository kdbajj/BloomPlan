const { getDb } = require("../db");
const { ObjectId } = require("mongodb");

class Post {
  static collection() {
    return getDb().collection("posts");
  }

  // Helper function to convert MongoDB document to a format suitable for the frontend
  static async transformDocument(doc, userId) {
    if (!doc) return null;

    return {
      id: doc._id.toString(), // Konwertuj _id na id
      title: doc.title,
      description: doc.description,
      likesCount: doc.likes ? doc.likes.length : 0, // Liczba lików
      hasLiked: doc.likes ? doc.likes.includes(userId) : false, // Czy użytkownik już polubił
      comments: doc.comments || [], // Upewnij się, że comments jest tablicą
      date: doc.date,
      _id: undefined, // Usuń oryginalne pole _id
    };
  }

  // Create a new post
  static async create(postData) {
    const collection = this.collection();
    const result = await collection.insertOne(postData);
    const newPost = await collection.findOne({ _id: result.insertedId });
    return this.transformDocument(newPost);
  }

  // Fetch all posts
  static async findAll(userId) {
    const collection = this.collection();
    const posts = await collection.find().sort({ date: -1 }).toArray();
    return Promise.all(
      posts.map((post) => this.transformDocument(post, userId))
    );
  }

  // Find a post by ID
  static async findById(id) {
    const collection = this.collection();
    const post = await collection.findOne({ _id: new ObjectId(id) });
    return this.transformDocument(post);
  }

  // Like or unlike a post
  static async likePost(id, userId) {
    const collection = this.collection();
    const post = await collection.findOne({ _id: new ObjectId(id) });

    if (!post) {
      throw new Error("Post not found");
    }

    // Check if the user has already liked the post
    const hasLiked = post.likes && post.likes.includes(userId);

    let updatedPost;
    if (hasLiked) {
      // Remove the like (userId from the likes array)
      updatedPost = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $pull: { likes: userId } },
        { returnDocument: "after" }
      );
    } else {
      // Add the like (userId to the likes array)
      updatedPost = await collection.findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $addToSet: { likes: userId } }, // Use $addToSet to ensure no duplicates
        { returnDocument: "after" }
      );
    }

    return this.transformDocument(updatedPost.value);
  }

  // Add a comment to a post
  static async addComment(id, userId, text) {
    const collection = this.collection();
    const comment = {
      id: new ObjectId().toString(),
      userId,
      text,
      createdAt: new Date(),
    };
    await collection.updateOne(
      { _id: new ObjectId(id) },
      { $push: { comments: comment } }
    );
    const updatedPost = await collection.findOne({ _id: new ObjectId(id) });
    return this.transformDocument(updatedPost);
  }
}

module.exports = Post;
