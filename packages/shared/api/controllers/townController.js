const Town = require('../models/townModel')
// const userModel = require('../models/userModel')

// get town
const getTowns = async (req, res) => {
    try {
        const userId = req.query.userId;

        const towns = await Town.getTowns(userId);

        res.status(200).json(towns)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// creating a town
const createTown = async (req, res) => 
{
    const { name, description, topLeftCoord, botRightCoord, creatingUser_id } = req.body

    try
    {
        // parse the string back into an object
        const parsedTopLeftCoord = JSON.parse(topLeftCoord);
        const parsedBotRightCoord = JSON.parse(botRightCoord);

        console.log(topLeftCoord);
        console.log(botRightCoord);
        console.log(parsedTopLeftCoord);
        console.log(parsedBotRightCoord);

        const town = await Town.createTown(name, description, parsedTopLeftCoord, parsedBotRightCoord);

        // Add the user who creates the town as a user immediately
        town.addUser(town._id, creatingUser_id)

        res.status(200).json({ town })
    }
    catch (error)
    {
        res.status(400).json({error: error.message})
    }
}

// With every creation there must exist an equal deletion.
// For every ying, there exists a yang
// There cannot be a create function without a delete function
// - John 1:14
const deleteTown = async (req, res) =>
{
    const { town_id } = req.body

    try
    {
        const town = await Town.deleteTown(town_id)
        res.status(200).json(town)
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
    getTowns,
    createTown,
    deleteTown,
    addUser
}