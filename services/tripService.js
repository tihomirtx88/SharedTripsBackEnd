const Trip = require(`../models/Trip`);
const User = require(`../models/User`);

async function getAllTrips() {
    return Trip.find({});
    //done
}

function getTripById(id) {
    return Trip.findById(id);
    //done
}

 async function getBuddiesFromTrip(tripid) {
    const joinUsers = [];
    const trip = await Trip.findById(tripid);
    
    
    for (const buddie of trip.buddies) {
        const user = await User.findById(buddie);
        joinUsers.push(user.email);
    }
    
    return joinUsers;
    //done
}

async function createTrip(trip) {
    const result = new Trip(trip);
    await result.save();
   
    //done

    const user = await User.findById(result.owner);
    user.trips.push(result._id);
    // pop
    await user.save(); 

    return result;
}

async function updateTrip(id, trip) {
    const existing = await Trip.findById(id);

    existing.start = trip.start;
    existing.end = trip.end;
    existing.date = trip.date;
    existing.time = trip.time;
    existing.carImg = trip.carImg;
    existing.carBrand = trip.carBrand;
    existing.seats = trip.seats;
    existing.price = trip.price;
    existing.description = trip.description;

    await existing.save();
    return existing;
    //done
}

async function deleteTrip(tripId) {
    const trip =  await Trip.findByIdAndDelete(tripId);
    const user = await User.findById(trip.owner);
    user.trips.pop(tripId);
    
    await user.save();
    
    
}

async function getTripsByUser(userId) {
    return Trip.find({ owner: userId }).lean();
}
//done

async function getTripAndUsers(id) {
    return Trip.findById(id).populate(`owner`).populate(`buddies`);
}
//done

async function joinTrip(tripId, userId) {
    const trip = await Trip.findById(tripId);
    
    if (trip.buddies.includes(userId)) {
        throw new Error(`User is already part of the trip`);
    }
    

    trip.buddies.push(userId);
    trip.seats -= 1;
    await trip.save();
    return trip;
}

module.exports = {
    createTrip,
    getTripById,
    getAllTrips,
    getTripAndUsers,
    updateTrip,
    deleteTrip,
    joinTrip,
    getTripsByUser,
    getBuddiesFromTrip
}