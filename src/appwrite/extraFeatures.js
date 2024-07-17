import { Client, Account, ID } from "appwrite";
import envConf from "../envConf/envConf";
import managePostService from "./managePostService";

class ExtraFeatures {
  constructor() {
    this.client = new Client()
      .setEndpoint(envConf.appwriteEndpoint)
      .setProject(envConf.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async toggleLike({ postID, userName }) {
    try {
      // console.log(postID)
      // console.log(userName)
      const posts = await managePostService.getPost();
      const post = posts.documents.find((post) => post.$id === postID);
      let updatedLikedBy = [...post.likedBy];
      const index = updatedLikedBy.indexOf(userName);
      if (index !== -1) {
        updatedLikedBy.splice(index, 1);
        // console.log(`if :- ${updatedLikedBy}`)
      } else {
        updatedLikedBy.push(userName);
        // console.log(`else :- ${updatedLikedBy}`)
      }

      // Update the likedBy array in the post document
      const updatedPost = await managePostService.updatePost({
        slug: postID,
        likedBy: updatedLikedBy,
      });

      return updatedPost;
    } catch {
      console.error("Error toggling like:", error);
      throw error;
    }
  }

  async handleCommentFeature({ postID, userName, comment }) {
    try {
      const posts = await managePostService.getPost();
      const post = posts.documents.find((post) => post.$id === postID);
  
      if (!post) {
        throw new Error('Post not found');
      }
  
      let updatedComments = [...post.comments];
      const newComment = {
        userName: userName,
        comment: comment,
      };
      updatedComments.push(JSON.stringify(newComment));
  
      const updatedPost = await managePostService.updatePost({
        slug: postID,
        comments: updatedComments // Ensure you provide the document data
      });
  
      return updatedPost;
    } catch (error) {
      console.error("Error handling comments:", error);
      throw error;
    }
  }
  
}

const extraFeatures = new ExtraFeatures();

export default extraFeatures;
