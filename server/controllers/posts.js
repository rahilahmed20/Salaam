import Post from "../models/Post.js";
import User from "../models/User.js";

// Create
export const createPost = async (req, res) => {
  try {
    const { userId, description, picturePath } = req.body;
    const user = await User.findById(userId);
    const newPost = new Post({
      userId,
      firstName: user.firstName,
      lastName: user.lastName,
      location: user.location,
      description,
      userPicturePath: user.picturePath,
      picturePath,
      likes: {},
      comments: [],
    });
    await newPost.save();

    const post = await Post.find();

    res.status(201).json({
      success: true,
      post,
      message: "Post Created Successfully",
    });
  } catch (err) {
    res.status(409).json({
      success: false,
      error: err.message,
      message: "Something Went wrong while creating user",
    });
  }
};

// Read
export const getFeedPosts = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json({
      success: true,
      post,
      message: "Posts Feed Retrieve Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
      message: "Something Went wrong while fetching feed Posts",
    });
  }
};

export const getUserPosts = async (req, res) => {
  try {
    const { userId } = req.params;
    const post = await Post.find({ userId }).sort({ _id: -1 });

    res.status(200).json({
      success: true,
      post,
      message: "Retrieved all the posts of the User Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
      message: "Something went wrong while fetching User's post",
    });
  }
};

// Update
export const likePost = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId } = req.body;
    const post = await Post.findById(id);
    const isLiked = post.likes.get(userId);

    if (isLiked) {
      post.likes.delete(userId);
    } else {
      post.likes.set(userId, true);
    }

    const updatedPost = await Post.findByIdAndUpdate(
      id,
      { likes: post.likes },
      { new: true }
    );

    res.status(200).json({
      success: true,
      updatedPost,
      message: "Post Updated Successfully",
    });
  } catch (err) {
    res.status(404).json({
      success: false,
      error: err.message,
      message: "Something went wrong while updating Post",
    });
  }
};
