const Town = require('../models/townModel')
// const userModel = require('../models/userModel')

// creating a town
const createTown = async (req, res) => 
{
    const { name, description, topLeftCoord, botRightCoord } = req.body

    try
    {
        const town = await Town.createTown(name, description, topLeftCoord, botRightCoord)

        res.status(200).json({ town })
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

// registering a user as a member of a town
// const registerUser = async (req, res) =>
// {
//     const {name, email} = req.body

//     try
//     {
//         const town = await Town.registerUser( name, email )

//         const user = await userModel.findOne({ email })
//         const userId = user._id

//         res.status(200).json({ town, userId})

//     }
//     catch (error)
//     {
//         res.status(400).json({error: error.message})
//     }

// }



module.exports = 
{
    createTown,
    // registerUser
}