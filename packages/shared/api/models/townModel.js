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
        userIds: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
    }
    ]
})

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

// townSchema.statics.registerUser = async function(name, id)
// {
//     const town = await this.findOne({ name })

//     if (!town)
//         throw Error("Town does not exist")

//     if (town.townMembers.findOne({ id }))
//         throw Error("User is already registered to this town")

//     town.townMembers.add(id)

//     return town
// }


module.exports = mongoose.model('Town', townSchema)