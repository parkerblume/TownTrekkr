const Post = require('../models/postModel')

const createPost = async (req, res) => {
    const { imagePath, user_id, town, coordinateX, coordinateY } = req.body

    try {
        const post = await Post.createpost( imagePath, user_id, town, coordinateX, coordinateY)



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

module.exports = {
    createPost,
    getPost,
    getPosts,
    deletePost
}