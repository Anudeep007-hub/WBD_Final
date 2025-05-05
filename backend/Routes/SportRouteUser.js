const Router=require('express');
const sportSchema = require("../models/sportSchema.js");
const bookingSchema = require("../models/bookingSchema.js"); 



const router = Router();  

// user routes

// ->For getting all the data
router.get("/user/get", async (req, res) => { 
    try {
        const data = await sportSchema.find();
        return res.status(200).json(data); // Return data with status 200
    } catch (error) {
        console.error("Cannot get the data:", error); // Log the error
        return res.status(500).json({ message: "Failed to get the data", error: error.message }); // Send error response
    }
});   


// -> For Booking the slot (Common for user and owner)
router.get('/user/booking/:id', async (req, res) => {
    const { id } = req.params; // Assuming 'id' is the booking ID or foreign key 

    try { 

        
        // Fetch bookings based on the id
        const bookings = await bookingSchema.find({ sport_foreignkey: id }); // Use the appropriate field to filter
        
        if (!bookings.length) {
            return res.status(404).json({ message: "No bookings found" });
        }

        res.status(200).json(bookings); // Use JSON response
    } catch (error) {
        console.error("Error fetching bookings:", error);
        res.status(500).json({ message: "Failed to fetch bookings", error: error.message });
    }
});


// export default router;
module.exports= router
