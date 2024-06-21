import conf from "../conf/conf";

import { Client, Account, ID } from "appwrite";

export class AuthService {
    client = new Client();
    account;

    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.projectId)

        this.account = new Account(this.client)
    }
    async createAccount({email, password, name}){
        try {
           const userAccount = this.account.create(ID.unique(), email, password, name)
            if(userAccount){
                // login method
                return this.login({email, password})
            }
            else{
                return userAccount;
            }

        } catch (error) {
            throw error
        }
    }

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            throw error;
        }
    }

    async getcurrentUser (){
        try {
            return await this.account.get()
        } catch (error) {
            throw error;
        }

        return null;
    }

    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            throw error;
        }
        return null;
    }
}

const authService = new AuthService();

export default authService;