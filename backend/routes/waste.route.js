const router = require('express').Router();
const WasteListing = require('../models/waste.model.js');

router.get('/', async (req, res) => {
  try {
    const listings = await WasteListing.find({});
    res.status(200).json(listings);
  } catch (error) { res.status(500).json({ message: "Server error." }); }
});

router.post('/', async (req, res) => {
  try {
    const newListing = new WasteListing(req.body);
    await newListing.save();
    res.status(201).json({ message: "Listing created." });
  } catch (error) {
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.error("!!! ERROR WHILE CREATING LISTING !!!");
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    console.error("Error Name:", error.name);
    console.error("Error Message:", error.message);
    console.error("Full Error Stack:", error.stack); // यह सबसे ज़रूरी है
    console.error("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!");
    res.status(500).json({ message: "Server error occurred. Check backend logs." }); // Frontend को थोड़ा अलग मैसेज भेजें
}
});

module.exports = router;

/* ROUTE 3: DELETE A WASTE LISTING
// URL: /api/listings/:id
router.delete('/:id', async (req, res) => {
  try {
    const deletedListing = await WasteListing.findByIdAndDelete(req.params.id);

    if (!deletedListing) {
      return res.status(404).json({ message: "Listing not found." });
    }

    res.status(200).json({ message: "Listing deleted successfully." });

  } catch (error) {
    console.error("Error deleting listing:", error);
    res.status(500).json({ message: "Server error while deleting listing." });
  }
}); */