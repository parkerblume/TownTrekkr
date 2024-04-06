const Town = require('../models/townModel')

// get town
const getTown = async (req, res) => {
    try {
        const { townId } = req.body

        const town = await Town.getTown(townId)

        res.status(200).json(town)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// get towns
const getTowns = async (req, res) => {
    try {
        const userId = req.query.userId;

        // support pagination for lazy loading
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 20;

        const towns = await Town.getTowns(userId, page, limit);

        res.status(200).json(towns)
    }
    catch (error) {
        res.status(400).json({error: error.message})
    }
}

// creating a town
const createTown = async (req, res) => 
{
    const { name, description, topLeftCoord, botRightCoord, creatingUser_id, creatingUsername } = req.body

    try
    {
        const town = await Town.createTown(name, description, topLeftCoord, botRightCoord, creatingUsername);

        // Add the user who creates the town as a user immediately
        Town.addUser(town._id, creatingUser_id);

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
    getTown,
    getTowns,
    createTown,
    deleteTown,
    addUser
}