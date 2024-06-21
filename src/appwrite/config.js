import conf from "../conf/conf";

import { Client, Account, ID, Databases, Storage, Query } from "appwrite";

export class Service {
    client = new Client()
    databases;
    bucket;
    constructor(){
        this.client
        .setEndpoint(conf.appWriteUrl)
        .setProject(conf.projectId)
        this.databases = new Databases(this.client)
        this.bucket = new Storage(this.client)
    }

    async createPost({title, slug, content, featuredImage, status, userId }){
        try {
            await this.databases.createDocument(
                conf.dbId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                }
            )
        } catch (error) {
            throw error
        }
    }
    async updatePost(slug, {title, content, featuredImage, status }){
        try {
           return await this.databases.updateDocument(
                conf.dbId,
                conf.collectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                }
            )
        } catch (error) {
            throw error
        }
    }
    async deleteDocument(slug){
        try {
            
            await this.databases.deleteDocument(
                conf.dbId,
                conf.collectionId,
                slug
            )
            return true;

        } catch (error) {
            throw error;
            return false;
        }
    }
    async getPost(slug){
        try {
            
            return await this.databases.getDocument(
                conf.dbId,
                conf.collectionId,
                slug
            )

        } catch (error) {
            throw error
        }
    } 
    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            
            return await this.databases.listDocuments(
                conf.dbId,
                conf.collectionId,
                queries,
            )

        } catch (error) {
            throw error
        }

    }

    // file upload services

    async uploadFile(file){
        try {
            
            return await this.bucket.createFile(
                conf.bucketId,
                ID.unique(),
                file,

            )

        } catch (error) {
            throw error
        }
    }
    async deleteFile(fileId){
        try {
            await this.bucket.deleteFile(
                conf.bucketId,
                fileId
            )
            return true;

        } catch (error) {
            throw error
            return false
        }
    }
    getFilePreview(fileId){
        return this.bucket.getFilePreview(
            conf.bucketId,
            fileId
        )
    }
}

const service = new Service();
export default service;