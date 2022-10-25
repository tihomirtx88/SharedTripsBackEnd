const { getTripById } = require("../services/tripService");

module.exports = () => async(req, res, next) =>{
    const id = req.params.id;
    try {
        const trip = await getTripById(id).lean();
        trip._ownerId = trip.owner;
        res.locals.trip = trip;
       
        next();
    } catch (err) {
        res.status(404).json({message: `Record not found`});
    }
}