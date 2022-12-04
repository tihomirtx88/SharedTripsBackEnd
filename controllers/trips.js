const { createTrip, updateTrip, deleteTrip, joinTrip, getAllTrips, getTripById, getTripsByUser, getBuddiesFromTrip } = require("../services/tripService");
const mapErrors = require("../util/mapers");
const { isAuth, isOwner } = require(`../middleware/guards`);
const preload = require("../middleware/preload");

const router = require(`express`).Router();

router.get(`/buddies/:id`, preload(), async(req, res) => {
    const id = req.params.id;
    const buddies = await getBuddiesFromTrip(id);
    try {
        res.status(200).json(buddies);
        
        
    } catch (err) {
        console.error(err.message);
        const errors = mapErrors(err);
        res.status(400).json({ message: errors });
    }
});

router.get(`/profile`, isAuth(),  async(req, res) => {
    const tripsByUser = await getTripsByUser(req.user._id);
    req.user.tripsCount = tripsByUser.length;
    req.user.trips = tripsByUser;

    try {
        res.status(200).json(tripsByUser);
        
    } catch (err) {
        console.error(err.message);
        const errors = mapErrors(err);
        res.status(400).json({ message: errors });
    }
    
});
// for profile 

router.get(`/:id`, preload(), async(req, res) => {
    const id = req.params.id;
    const trip = await getTripById(id);
      
    if (trip) {
        res.json(trip);
    }else{
        res.status(404).json({ message: `Item ${id} not found` });
    }
});
//done details

router.get(`/`, async (req, res) => {
    
    if (req.query.where) {
        let ownerId = req.query.where.split('=')[1];
        ownerId = ownerId.substring(1, ownerId.length - 1);
        const data = await getTripsByUser(req.user._id)
        res.json(data);
    } else {
        const data = await getAllTrips();
        res.json(data);
    }
});
//done catalog and profile

router.post(`/`, isAuth(), async (req, res) => {
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
        owner: req.user._id
    }

    try {
        const result = await createTrip(trip);
        res.status(201).json(result);
        
    } catch (err) {
        console.error(err.message);
        const errors = mapErrors(err);
        res.status(400).json({ message: errors });
    }
});
//done create

router.put(`/:id`, preload(), isOwner(), async (req, res) => {
    const id = req.params.id;
    const trip = {
        start: req.body.start,
        end: req.body.end,
        date: req.body.date,
        time: req.body.time,
        carImg: req.body.carImg,
        carBrand: req.body.carBrand,
        seats: Number(req.body.seats),
        price: Number(req.body.price),
        description: req.body.description,
    }

    try {
        const result = await updateTrip(id, trip);
        res.status(200).json(result);
    } catch (err) {
        console.error(err.message);
        const errors = mapErrors(err);
        res.status(400).json({ message: errors });
    }
});
//done edit

router.delete(`/:id`, preload(), isOwner(), async (req, res) => {
    try {
        const id = req.params.id;
        await deleteTrip(id);
        res.status(204).end();
    } catch (err) {
        console.error(err.message);
        const errors = mapErrors(err);
        res.status(400).json({ message: errors });
    }
});
//done

module.exports = router;