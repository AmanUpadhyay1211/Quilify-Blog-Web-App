import React, { useState, useEffect } from 'react';
import managePostService from '../appwrite/managePostService';
import { PostCard } from '../components/index';

function AllPost() {
  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const dbPosts = await managePostService.getPost();
        if (dbPosts) {
          setPosts(dbPosts.documents);
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        {loading ? (
          <div className="flex justify-center items-center">
            <h1 className="text-2xl font-bold text-gray-700">Loading...</h1>
          </div>
        ) : (
          <div className="flex flex-wrap justify-center">
            {posts && posts.length > 0 ? (
              posts.map((post) => (
                <div key={post.$id} className="p-4 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
                  <PostCard post={post} />
                </div>
              ))
            ) : (
              <div className="flex justify-center items-center w-full">
                <h1 className="text-2xl font-bold text-gray-700">No Posts Available</h1>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default AllPost;
