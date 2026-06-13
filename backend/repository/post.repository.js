import Post from "../models/post.model.js";

class PostRepository{
    async createPost(description, photo, fk_user){
        return await Post.create({ description, photo, fk_user });
    }

    async deletePost(idPost){
        return await Post.findOneAndUpdate({_id: idPost, active: true}, { active: false }, { new: true });
    }

    async getMyPosts(idUser){
        return await Post.find({ fk_user: idUser, active: true });
    }
}

const postRepository = new PostRepository();

export default postRepository;