const { handleUpload } = require('../middleware/upload')
const Post = require('../models/postModel')

const createPost = async (req, res) => {
    const { user_id, town, title, coordinateX, coordinateY } = req.body

    try {
        const fileId = await handleUpload(req, null, req.file)
        
        const post = await Post.createpost( fileId, user_id, town, title, coordinateX, coordinateY)



        res.status(200).json({ post })
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getPost = async (req, res) => {
    const { post_id } = req.body

    try {
        const post = await Post.getpost( post_id )
        
        res.status(200).json(post)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getPosts = async (req, res) => {
    try {
        const posts = await Post.getposts()

        res.status(200).json(posts)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const deletePost = async (req, res) => {
    const {post_id} = req.body
    try {
        const post = await Post.deletepost(post_id)

        res.status(200).json(post)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const ratePost = async (req, res) => {
    try {
        const {post_id, user_id, rating} = req.body
        await Post.rate(post_id, user_id, rating)

        res.status(200).json({message: "Success"})
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

const getPostsByTown = async (req, res) => {
    try {
        const { townId } = req.body;
        const posts = await Post.getPostByTown(townId);

        res.status(200).json(posts);
    } catch (error) {
        res.status(400).json({message: 'Error getting posts by town', error: error.message });
    }
}

module.exports = {
    createPost,
    getPost,
    getPosts,
    getPostsByTown,
    deletePost,
    ratePost
}