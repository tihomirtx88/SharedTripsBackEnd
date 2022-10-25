const { isAuth } = require("../middleware/guards");
const preload = require("../middleware/preload");
const { joinTrip } = require("../services/tripService");

const router = require(`express`).Router();

router.post(`/:id`, preload(), isAuth(), async(req, res) => {
    const id = req.params.id;
    try {
       const trip = await joinTrip(id, req.user._id);
       res.json(trip);
    } catch (err) {
        console.error(err);     
    }
});


module.exports = router;