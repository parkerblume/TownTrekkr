const mongoose = require('mongoose')
const Schema = mongoose.Schema
const User = require('./userModel')

const townSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    description : {
        type: String
    },
    creatingUsername : {
        type: String
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
    scoreMod : {
        type: Number
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

townSchema.statics.getTown = async function (townId) {
    const town = await this.findById(townId)

    if (!town) throw Error("Town does not exist with this id")

    return town
}

townSchema.statics.getTowns = async function (userId, page, limit) {
    let towns;
    const skip = (page - 1) * limit; // would be 0 if first page

    if (userId)
    {
        towns = await this.find({ 'townMembers.userId': userId })
                          .skip(skip)
                          .limit(limit)
                          .exec();
    }
    else
    {
        towns = await this.find({})
                          .skip(skip)
                          .limit(limit)
                          .exec();
    }

    return towns

    return towns
}

townSchema.statics.createTown = async function(name, description, topLeftCoord, botRightCoord, creatingUsername)
{
    const nameExists = await this.findOne({ name })
    const area = (topLeftCoord.latitude - botRightCoord.latitude) * 
                (topLeftCoord.longitude - botRightCoord.longitude)

    if (nameExists) 
        throw Error("Town with this name already exists")

    // No negative areas
    if (area < 0)
        area = area * (-1)

    // console.log(topLeftCoord, botRightCoord);
    const town = await this.create({ 
        name, 
        description,
        creatingUsername, 
        topLeftLat: topLeftCoord.latitude,
        topLeftLong: topLeftCoord.longitude,
        botRightLat: botRightCoord.latitude,
        botRightLong: botRightCoord.longitude,
        scoreMod: 1 + area  // We can fine tune the multiplier for balance later
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