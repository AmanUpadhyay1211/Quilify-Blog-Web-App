import React, { useState, useEffect } from 'react'
import managePostService from '../appwrite/managePostService';
import { PostForm } from '../components/index';
import { useParams } from 'react-router-dom';

function EditPost() {
  const [post, setPost] = useState(null)
  const {slug} = useParams()

  useEffect(() => {
    const getPost = async () => {
      try {
        const dbPost = await managePostService.getPost();
        if (dbPost) {
          setPost(dbPost.documents.find((p)=>p.$id === slug));
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);


  return post ? (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Edit the Post</h2>
        <PostForm post={post} />
      </div>
    </div>
  ) : null
}

export default EditPost