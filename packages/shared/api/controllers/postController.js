const Post = require('../models/postModel')

const createPost = async (req, res) => {
    const { imagePath, user_id, coordinateX, coordinateY } = req.body

    try {
        const post = await Post.createpost( imagePath, user_id, coordinateX, coordinateY)

        res.status(200).json({ email })
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createPost
}