const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./userModel')

const townSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    topLeftLat: {
        type: Number,
        required: true
    },
    topLeftLong: {
        type: Number,
        required: true
    },
    botRightLat: {
        type: Number,
        required: true
    },
    botRightLong: {
        type: Number,
        required: true,
    },
    description : {
        type: String
    },
    // array of users who are members of the town
    townMembers : [
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }
    ]
})

townSchema.statics.getTowns = async function (userId) {
    let towns;
    if (userId)
    {
        towns = await this.find({ 'townMembers.userId': userId });
    }
    else
    {
        towns = await this.find({});
    }

    return towns
}

townSchema.statics.createTown = async function(name, description, topLeftCoord, botRightCoord)
{
    const nameExists = await this.findOne({ name })

    if (nameExists) 
        throw Error("Town with this name already exists")

    // Could maybe do a check to see if the bounds are close enough to an existing town
    // But idk how to do that and I don't think it's entirely necessary for our scope
    console.log(topLeftCoord, botRightCoord);
    const town = await this.create({ 
        name, 
        description, 
        topLeftLat: topLeftCoord.latitude,
        topLeftLong: topLeftCoord.longitude,
        botRightLat: botRightCoord.latitude,
        botRightLong: botRightCoord.longitude
    });

    return town
}

townSchema.statics.deleteTown = async function(town_id)
{
    const town = await this.findOneAndDelete({_id: town_id})

    if (!town) throw Error("Town does not exist")

    return town
}

townSchema.statics.addUser = async function(town_id, user_id)
{
    const town = await this.findById(town_id)
    const user = await User.findById(user_id)

    if (!user)
        throw Error("User does not exist")

    if (!town)
        throw Error("Town does not exist")

    if (town.townMembers.find(member => member.userId.toString() === user_id.toString()))
        throw Error("User is already registered to this town")

    user.activeTowns.push({town_id: town_id})
    town.townMembers.push({userId: user_id})

    await user.save()
    await town.save()

    return town
}


module.exports = mongoose.model('Town', townSchema)