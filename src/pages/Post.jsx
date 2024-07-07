import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import parse from "html-react-parser";
import { Link, useNavigate, useParams } from "react-router-dom";
import managePostService from '../appwrite/managePostService';
import { Btn, Logo } from '../components';
import authService from '../appwrite/authService';

function Post() {
  const userData = useSelector((state) => state.auth.userData);
  const [isAuthor, setIsAuthor] = useState(false);
  const navigate = useNavigate()

  const [post, setPost] = useState(null)
  const { slug } = useParams()

  useEffect(() => {
    const getPost = async () => {
      try {
        const dbPost = await managePostService.getPost();
        const foundPost = dbPost.documents.find((p) => p.$id === slug)
        if (dbPost) {
          setPost(foundPost);
          if (foundPost.userID === userData.$id) {
            setIsAuthor(true)
          }
          else {
            setIsAuthor(false)
          }
        }
      } catch (err) {
        console.log(err);
      }
    };
    getPost();
  }, []);


  const deletePost = async () => {
    managePostService.deletePost({ slug }).then((status) => {
      if (status) {
        managePostService.deleteFile(post.imageID);
        navigate("/all-post");
      }
    });
  }



  return post ? (
    <div className="py-8">

      <div className="w-full flex justify-center mb-4 relative border rounded-xl p-2">
        <img
          src={managePostService.getFilePreview(post.imageID)}
          alt={post.title}
          className="rounded-xl"
        />

        {isAuthor === true && (
          <div className="absolute right-6 top-6">
            <Link to={`/edit-post/${post.$id}`}>
              <Btn className="mr-3 bg-green-500">
                Edit
              </Btn>
            </Link>
            <Btn className="bg-red-500" onClick={deletePost}>
              Delete
            </Btn>
          </div>
        )}
      </div>
      <div className="w-full mb-6">
        <h1 className="text-2xl font-bold">{post.title}</h1>
      </div>
      <div className="browser-css">
        {parse(post.content)}
      </div>

    </div>
  ) : null;
}

export default Post