import React from 'react'
import { PostForm } from '../components/index';

function AddPost() {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl w-full bg-white p-8 rounded-lg shadow-md">
        <h2 className="mb-6 text-center text-3xl font-extrabold text-gray-900">Create a New Post</h2>
        <PostForm />
      </div>
    </div>
  );
}

export default AddPost;