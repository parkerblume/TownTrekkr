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
const addUser = async (req, res) =>
{
    const {town_id, user_id} = req.body

    try
    {
        const town = await Town.addUser(town_id, user_id)

        res.status(200).json({message: "User added to town" + town.name})

    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }

}



module.exports = 
{
    createTown,
    addUser
}