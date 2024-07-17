import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import managePostService from '../appwrite/managePostService';
import { PostCard } from '../components/index';

function Home() {
  const userData = useSelector((state) => state.auth.userData);
  const userStatus = useSelector((state) => state.auth.status);

  const [posts, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPosts = async () => {
      try {
        const dbPosts = await managePostService.getPost();
        if (dbPosts) {
          setPosts(dbPosts.documents);
          console.log(posts)
        }
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    getPosts();
  
  }, [userStatus, userData]);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  if (userStatus === false) {
    return <div className = "text-3xl text-black bg-white flex justify-center items-center h-[60vh]"><h1>Login to Read Posts</h1></div>;
  }

  return (
    <div className="flex flex-wrap justify-center">
      {posts && posts.length > 0 ? (
        posts.map((post) => (
          <div key={post.$id} className="p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4">
            <PostCard post={post} />
          </div>
        ))
      ) : (
        <h1>No Posts Available</h1>
      )}
    </div>
  );
}

export default Home;
