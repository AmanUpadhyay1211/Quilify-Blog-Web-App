import React, { useState,useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiEye, IoIosHeartEmpty, FaRegCommentAlt } from "../components/React-icons/React-icons";
import managePostService from '../appwrite/managePostService';
import extraFeatures from '../appwrite/extraFeatures';
import authService from '../appwrite/authService';
import { formatDateTime } from './Functions/functions';
import AllResponses from './AllResponses';

function PostCard({ post }) {
  const postID = post.$id;
  const [likesCount, setLikesCount] = useState(post.likedBy.length);
  const [liked, setLiked] = useState(post.likedBy.includes(authService.getCurrentUser().name));
  const [commentCount, setCommentCount] = useState(post.comments.length);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [showAllResponses, setShowAllResponses] = useState(false);

  useEffect(() => {
    const fetchLikedStatus = async () => {
      const user = await authService.getCurrentUser();
      setLiked(post.likedBy.includes(user.name));
    };

    fetchLikedStatus();
  }, [post.likedBy]);
  

  const handleLikes = async () => {
    const user = await authService.getCurrentUser();
    if (!liked) {
      setLikesCount(likesCount + 1);
      setLiked(true);
    } else {
      setLikesCount(likesCount - 1);
      setLiked(false);
    }
    await extraFeatures.toggleLike({ postID, userName: user.name });
  };

  const handleViewIncrease = async () => {
    try {
      let posts = await managePostService.getPost();
      const foundPost = posts.documents.find((p) => p.$id === postID);
      if (foundPost) {
        await managePostService.updatePost({ slug: postID, views: foundPost.views + 1 });
      }
    } catch (error) {
      console.log("Appwrite serive :: Increment views :: error", error);
    }
  };

  const handleComments = async () => {
    const user = await authService.getCurrentUser();
    await extraFeatures.handleCommentFeature({ postID, userName: user.name, comment });
    setShowCommentBox(false);
    setComment('');
    setCommentCount(commentCount + 1);
  };

  return (
    <div className='w-full bg-gray-100 rounded-xl p-4 shadow-md'>
      <Link to={`/post/${postID}`} onClick={handleViewIncrease}>
        <div className='w-full flex justify-center mb-4'>
          <img
            src={managePostService.getFilePreview(post.imageID)}
            alt={post.title}
            className='rounded-xl max-h-60 object-cover'
          />
        </div>
        <h2 className='text-xl font-bold mb-2'>{post.title}</h2>
        <div className='text-gray-600 text-sm mb-2'>
          <p>Created By: {post.userName}</p>
          <p>Posted: {formatDateTime(post.$createdAt)}</p>
        </div>
      </Link>
      <div className='flex items-center text-gray-600'>
        <FiEye className='mr-1 text-blue-600' /> {post.views}
        <IoIosHeartEmpty onClick={handleLikes} className={`ml-2 mr-1 cursor-pointer ${liked ? 'text-red-500' : ''}`} /> {likesCount}
        <FaRegCommentAlt onClick={() => setShowCommentBox(true)} className='ml-2 mr-1 cursor-pointer text-green-600' /> {commentCount}
      </div>
      <div className='text-blue-500 cursor-pointer mt-2' onClick={() => setShowAllResponses(true)}>
        All Responses
      </div>

      {showCommentBox && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <h3 className="text-xl font-semibold mb-4">Add a Comment</h3>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
              rows="4"
              placeholder="Write your comment here..."
            ></textarea>
            <div className="flex justify-end">
              <button
                onClick={() => setShowCommentBox(false)}
                className="mr-2 px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 focus:outline-none"
              >
                Cancel
              </button>
              <button
                onClick={handleComments}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {showAllResponses && <AllResponses postID={postID} onClose={() => setShowAllResponses(false)} />}
    </div>
  );
}

export default PostCard;
