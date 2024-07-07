import { Client, Account, ID } from "appwrite";
import envConf from "../envConf/envConf";

class AuthService {
  constructor() {
    this.client = new Client()
      .setEndpoint(envConf.appwriteEndpoint)
      .setProject(envConf.appwriteProjectID);

    this.account = new Account(this.client);
  }

  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(
        ID.unique(),
        email,
        password,
        name
      );
     return (userAccount ? userAccount :  null)

    } catch (error) {
      throw error;
    }
  }

  async login({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      if (session) {
        return session;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async createSession({ email, password }) {
    try {
      const session = await this.account.createEmailPasswordSession(email, password);
      if (session) {
        return session;
      } else {
        return false;
      }
    } catch (error) {
      throw error;
    }
  }

  async logout() {
    try {
      const deleteSession = await this.account.deleteSession('current');
      return !!deleteSession;
    } catch (error) {
      throw error;
    }
  }


//   ... your initilization functions

// export async function getLoggedInUser() {
//   try {
//     const { account } = await createSessionClient();
//     return await account.get();
//   } catch (error) {
//     return null;
//   }
// }

  async getCurrentUser() {
    try {
      const result = await this.account.get();
       return result
    } catch (error) {
      console.log("Appwrite serive :: getCurrentUser :: error", error);
    }
    return null;
  }
}

const authService = new AuthService();

export default authService;
