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

townSchema.statics.createTown = async function(name, description, topLeftCoord, botRightCoord, creatingUsername)
{
    const nameExists = await this.findOne({ name })
    let area = (topLeftCoord.latitude - botRightCoord.latitude) *
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

townSchema.statics.addUser = async function(town_id, user_id) {
	let town, user;

	try {
		town = await this.findById(town_id);
		if (!town) {
			throw new Error(`Town with ID ${town_id} does not exist`);
		}
	} catch (error) {
		console.error(`Error finding town with ID ${town_id}:`, error.message);
		throw error; // Re-throw the error to be caught by the calling function
	}

	try {
		user = await User.findById(user_id);
		if (!user) {
			throw new Error(`User with ID ${user_id} does not exist`);
		}
	} catch (error) {
		console.error(`Error finding user with ID ${user_id}:`, error.message);
		throw error;
	}

	if (town.townMembers.find(member => member.userId.toString() === user_id.toString())) {
		const errorMessage = `User with ID ${user_id} is already registered to the town with ID ${town_id}`;
		console.error(errorMessage);
		throw new Error(errorMessage);
	}

	try {
		user.activeTowns.push({ town_id: town_id });
		town.townMembers.push({ userId: user_id });

		await user.save();
		await town.save();
	} catch (error) {
		console.error(`Error adding user with ID ${user_id} to town with ID ${town_id}:`, error.message);
		throw error; // Ensures that any error during saving is caught and logged
	}

	return town;
};


module.exports = mongoose.model('Town', townSchema)
