const mongoose = require('mongoose')
const Schema = mongoose.Schema

const townSchema = new Schema({
    name : {
        type: String,
        required: true,
        unique: true
    },
    topLeftCoord : {
        type: Number,
        required: true
    },
    botRightCoord : {
        type: Number,
        required: true
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

townSchema.statics.getTowns = async function () {
    const towns = await this.find({})

    return towns
}

townSchema.statics.createTown = async function(name, description, topLeftCoord, botRightCoord)
{
    // const nameExists = await this.findOne({ name })

    // if (nameExists) 
    //     throw Error("Town with this name already exists")


    // Could maybe do a check to see if the bounds are close enough to an existing town
    // But idk how to do that and I don't think it's entirely necessary for our scope

    const town = await this.create({ name, description, topLeftCoord, botRightCoord})

    return town
}

townSchema.statics.addUser = async function(town_id, user_id)
{
    const town = await this.findById(town_id)

    if (!town)
        throw Error("Town does not exist")

    if (town.townMembers.find(member => member.userId.toString() === user_id.toString()))
        throw Error("User is already registered to this town")

    town.townMembers.push({userId: user_id})

    await town.save()

    return town
}


module.exports = mongoose.model('Town', townSchema)