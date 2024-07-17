import { Client, Databases, Storage, ID } from "appwrite";
import envConf from "../envConf/envConf";
import { comment } from "postcss";

class ManagePostService {
  constructor() {
    this.client = new Client()
      .setEndpoint(envConf.appwriteEndpoint)
      .setProject(envConf.appwriteProjectID);

    this.database = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  // CURD operation of Posts
  async createPost({
    slug,
    title,
    content,
    imageID,
    userID,
    userName,
    status = "active",
    views = 0,
  }) {
    try {
      const doc = await this.database.createDocument(
        envConf.appwriteDatabaseID,
        envConf.appwriteCollectionID,
        slug,
        {
          title: title,
          content: content,
          imageID: imageID,
          userID: userID,
          userName: userName,
          status: status,
          views: views,
        }
      );
      return doc ? doc : null;
    } catch (error) {
      console.log("Appwrite serive :: createPost :: error", error);
    }
  }

  async updatePost({ slug, title, content, imageID,views ,likedBy,comments}) {
    try {
      const doc = await this.database.updateDocument(
        envConf.appwriteDatabaseID,
        envConf.appwriteCollectionID,
        slug,
        { title: title, content: content, imageID: imageID,views:views ,likedBy :likedBy,comments : comments}
      );
      return doc ? doc : null;
    } catch (error) {
      console.log("Appwrite serive :: updatePost :: error", error);
    }
  }

  async getPost() {
    try {
      let posts = await this.database.listDocuments(
        envConf.appwriteDatabaseID,
        envConf.appwriteCollectionID,
        []
      );
      return posts ? posts : null;
    } catch (error) {
      console.log("Appwrite serive :: gettingPost :: error", error);
    }
  }
  async deletePost({ slug }) {
    try {
      const result = await this.database.deleteDocument(
        envConf.appwriteDatabaseID,
        envConf.appwriteCollectionID,
        slug
      );
      return result ? result : null;
    } catch (error) {
      console.log("Appwrite serive :: deletePost :: error", error);
    }
  }

  // File upload in my case its going to be image
  async uploadFile(file) {
    try {
      const result = await this.storage.createFile(
        envConf.appwriteBucketID,
        ID.unique(),
        file
      );
      return result ? result : null;
    } catch (error) {
      console.log("Appwrite serive :: uploadFile :: error", error);
    }
  }

  async deleteFile(fileID) {
    try {
      const result = await this.storage.deleteFile(
        envConf.appwriteBucketID,
        fileID
      );
      return result ? result : null;
    } catch (error) {
      console.log("Appwrite serive :: deleteFile :: error", error);
      return false;
    }
  }

  getFilePreview(fileID) {
    try {
      const result = this.storage.getFilePreview(
        envConf.appwriteBucketID,
        fileID
      );
      return result ? result : null;
    } catch (error) {
      console.log("Appwrite serive :: getFilePreview :: error", error);
      return false;
    }
  }
}

const managePostService = new ManagePostService();
export default managePostService;
