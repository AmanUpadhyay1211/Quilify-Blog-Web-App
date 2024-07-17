import React, { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { FiEye, IoIosHeartEmpty, FaRegCommentAlt } from "../components/React-icons/React-icons";
import { useSelector } from "react-redux";
import parse from "html-react-parser";
import managePostService from "../appwrite/managePostService";
import extraFeatures from '../appwrite/extraFeatures';
import authService from '../appwrite/authService';
import { Btn, Logo } from "../components/index";
import { formatDateTime } from '../components/Functions/functions';
import AllResponses from '../components/AllResponses';

function Post() {
  const userData = useSelector((state) => state.auth.userData);
  const [isAuthor, setIsAuthor] = useState(false);
  const [post, setPost] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  const [likesCount, setLikesCount] = useState(0);
  const [liked, setLiked] = useState(false);
  const [commentCount, setCommentCount] = useState(0);
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [comment, setComment] = useState('');
  const [showAllResponses, setShowAllResponses] = useState(false);

  useEffect(() => {
    const getPost = async () => {
      try {
        const dbPost = await managePostService.getPost();
        const foundPost = dbPost.documents.find((p) => p.$id === slug);
        if (dbPost) {
          setPost(foundPost);
          setLikesCount(foundPost.likedBy.length);
          setCommentCount(foundPost.comments.length);
          const user = await authService.getCurrentUser();
          setLiked(foundPost.likedBy.includes(user.name));
          if (foundPost.userID === userData.$id) {
            setIsAuthor(true);
          } else {
            setIsAuthor(false);
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, [slug, userData.$id]);

  const deletePost = async () => {
    managePostService.deletePost({ slug }).then((status) => {
      if (status) {
        managePostService.deleteFile(post.imageID);
        navigate("/all-post");
      }
    });
  };

  const handleLikes = async () => {
    const user = await authService.getCurrentUser();
    if (!liked) {
      setLikesCount(likesCount + 1);
      setLiked(true);
    } else {
      setLikesCount(likesCount - 1);
      setLiked(false);
    }
    await extraFeatures.toggleLike({ postID: slug, userName: user.name });
  };

  const handleViewIncrease = async () => {
    try {
      let posts = await managePostService.getPost();
      const foundPost = posts.documents.find((p) => p.$id === slug);
      if (foundPost) {
        await managePostService.updatePost({ slug, views: foundPost.views + 1 });
      }
    } catch (error) {
      console.log("Appwrite serive :: Increment views :: error", error);
    }
  };

  const handleComments = async () => {
    const user = await authService.getCurrentUser();
    await extraFeatures.handleCommentFeature({ postID: slug, userName: user.name, comment });
    setShowCommentBox(false);
    setComment('');
    setCommentCount(commentCount + 1);
  };

  useEffect(() => {
    handleViewIncrease();
  }, [slug]);

  return post ? (
    <div className="py-8">
      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={managePostService.getFilePreview(post.imageID)}
          alt={post.title}
          className="rounded-xl"
        />

        {isAuthor && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Btn className="mr-3 bg-green-500">Edit</Btn>
            </Link>
            <Btn className="bg-red-500" onClick={deletePost}>
              Delete
            </Btn>
          </div>
        )}
      </div>
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
        <div className='text-gray-600 text-sm mb-2'>
          <p>Created By: {post.userName}</p>
          <p>Posted: {formatDateTime(post.$createdAt)}</p>
        </div>
      </div>
      <div className="browser-css mb-6">{parse(post.content)}</div>
      <div className='flex items-center text-gray-600 mb-4'>
        <FiEye className='mr-1 text-blue-600' /> {post.views}
        <IoIosHeartEmpty onClick={handleLikes} className={`ml-2 mr-1 cursor-pointer ${liked ? 'text-red-500' : ''}`} /> {likesCount}
        <FaRegCommentAlt onClick={() => setShowCommentBox(true)} className='ml-2 mr-1 cursor-pointer text-green-600' /> {commentCount}
      </div>
      <div className='text-blue-500 cursor-pointer mb-4' onClick={() => setShowAllResponses(true)}>
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

      {showAllResponses && <AllResponses postID={slug} onClose={() => setShowAllResponses(false)} />}
    </div>
  ) : null;
}

export default Post;
