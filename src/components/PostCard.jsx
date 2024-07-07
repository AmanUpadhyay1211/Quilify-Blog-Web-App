import React from 'react';
import { FiEye } from "react-icons/fi";
import { Link } from 'react-router-dom';
import managePostService from '../appwrite/managePostService';


function PostCard({ post }) {
    const postID = post.$id;


    function formatDateTime(dateTimeStr) {
        // Parse the input datetime string into a Date object
        const date = new Date(dateTimeStr);
        // Get the components of the date
        const hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const day = date.getUTCDate();
        const month = date.toLocaleString('default', { month: 'long', timeZone: 'UTC' });
        const year = date.getUTCFullYear();
    
        // Format hours and minutes
        const formattedHours = (hours % 12 === 0 ? 12 : hours % 12).toString().padStart(2, '0');
        const formattedMinutes = minutes.toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
    
        // Construct the formatted string
        const formattedDate = `${formattedHours}:${formattedMinutes} ${ampm} / ${day} ${month} ${year}`;
    
        return formattedDate;
    }
    

    const handleViewIncrease = async () => {
        try {
            let posts = await managePostService.getPost()
            const foundPost = posts.documents.find((p) => p.$id === postID);
            console.log(foundPost.views + 1)
            if (foundPost) {
                await managePostService.updatePost({ slug: postID, views: foundPost.views + 1 })
            }
        } catch (error) {
            console.log("Appwrite serive :: Increment views :: error", error);
        }
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
                    <p>Posted: {formatDateTime(post.$createdAt)}</p>
                    <p>Created By: {post.userName}</p>
                </div>
                <div className='flex items-center text-gray-600'>
                    <FiEye className='mr-1' /> {post.views}
                </div>
            </Link>
        </div>
    );
}

export default PostCard;
