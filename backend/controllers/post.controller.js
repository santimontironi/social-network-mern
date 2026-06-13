import postRepository from "../repository/post.repository.js";
import cloudinary from "../config/cloudinary.config.js";

class PostController {
    async createPost(req, res) {
        try {
            const { description } = req.body;

            if (!description) {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            const userId = req.user.id

            let imageUrl = null;

            if (req.file) {
                const b64 = Buffer.from(req.file.buffer).toString('base64')
                const dataURI = `data:${req.file.mimetype};base64,${b64}`

                const uploadResult = await cloudinary.uploader.upload(dataURI, { folder: 'argentex' });

                imageUrl = uploadResult.secure_url;
            } else {
                return res.status(400).json({ message: 'Todos los campos son obligatorios' });
            }

            const post = await postRepository.createPost(description, imageUrl, userId);
            return res.status(201).json({ message: 'Post creado correctamente', post });
        }
        catch (error) {
            return res.status(500).json({ message: 'Error al subir el post', error });
        }
    }

    async deletePost(req,res){
        try{
            const { idPost } = req.params;
            const post = await postRepository.deletePost(idPost);

            if(!post){
                return res.status(404).json({ message: 'Post no encontrado' });
            }

            return res.status(200).json({ message: 'Post eliminado correctamente', post });
        }
        catch(error){
            return res.status(500).json({ message: 'Error al eliminar el post', error });
        }
    }

    async getMyPosts(req,res){
        try{
            const userId = req.user.id

            const posts = await postRepository.getMyPosts(userId);

            if(!posts.length === 0){
                return res.status(404).json({ message: 'Posts no encontrados' });
            }

            return res.status(200).json({ message: 'Posts obtenidos correctamente', posts:posts });
        }
        catch(error){
            return res.status(500).json({ message: 'Error al obtener los posts', error });
        }
    }
}

const postController = new PostController();

export default postController;