// src/components/AllResponses.js
import React, { useState, useEffect } from 'react';
import { IoIosHeartEmpty } from "react-icons/io";
import managePostService from '../appwrite/managePostService';

function AllResponses({ postID, onClose }) {
  const [post, setPost] = useState(null);

  useEffect(() => {
    const fetchPostData = async () => {
      try {
        let posts = await managePostService.getPost();
        const foundPost = posts.documents.find((p) => p.$id === postID);
        setPost(foundPost);
      } catch (error) {
        console.error("Error fetching post data:", error);
      }
    };

    fetchPostData();
  }, [postID]);

  if (!post) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Loading...</h2>
            <button onClick={onClose} className="text-red-500 hover:text-red-700">&times;</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">All Responses</h2>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">&times;</button>
        </div>
        <div className="flex">
          <div className="w-1/2 p-2">
            <h3 className="text-lg font-semibold mb-2">Liked by</h3>
            {post.likedBy.map((user, index) => (
              <div key={index} className="flex items-center mb-2">
                <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                  <span className="text-lg font-bold">{user.charAt(0)}</span>
                </div>
                <span className="font-medium">{user}</span>
              </div>
            ))}
          </div>
          <div className="w-1/2 p-2">
            <h3 className="text-lg font-semibold mb-2">Comments</h3>
            {post.comments.map((comment, index) => {
              const parsedComment = JSON.parse(comment);
              return (
                <div key={index} className="mb-2 p-3 border rounded-lg">
                  <div className="flex items-center mb-2">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center mr-3">
                      <span className="text-lg font-bold">{parsedComment.userName.charAt(0)}</span>
                    </div>
                    <span className="font-medium">{parsedComment.userName}</span>
                  </div>
                  <p>{parsedComment.comment}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AllResponses;
