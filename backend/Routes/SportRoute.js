const Router=require('express')
const sportSchema=require("../models/sportSchema.js");
const bookingSchema=require("../models/bookingSchema.js");
const UserSchema = require("../models/UserSchema.js");
// const fetchUserDetails = require('../shoppingFolder/components/UserDetails/fetchUserDetails.jsx');
const mongoose = require("mongoose");
const userwallet = require("../models/userwallet.js");




const router = Router();  
const port = 5000;

// MARK:owner routes

// ->For creation
router.post("/owner/create", async (req, res) => {
    const { label, body, cost, address, contact_mail, slot_timings, date } = req.body;
    const slot = slot_timings
    
    // console.log(req.body);


    // Basic validation to ensure required fields are present
    if (!label || !body || !cost || !address || !contact_mail || !slot|| !Array.isArray(slot) || slot.length === 0 || !date) {
        return res.status(400).json({ message: "All fields are required, slots must be a non-empty array, and date must be provided." });
    }

    try {
        // Create a new sport document
        const newSport = new sportSchema({
            label,
            body,
            cost,
            address,
            contact_mail
        });

        // Save the new sport to the database
        await newSport.save();

        // Create booking slots associated with the new sport
        const bookings = slot.map(slot => ({
            sport_foreignkey: newSport._id,
            date: new Date(date), // Use the provided date
            slot,
            is_booked: false
        }));
        console.log(bookings);

        // Save all booking slots to the database
        await bookingSchema.insertMany(bookings);

        res.status(201).json({
            message: "Sport and slots created successfully!",
            sport: newSport,
            bookings
        });

    } catch (error) {
        console.error("Error creating sport and slots:", error);
        res.status(500).json({ message: "Failed to create sport and slots", error: error.message });
    }
}); 


router.put("/owner/update/:id", async (req,res) => {
    const {label, body, cost, address, contact_mail,slot_timings, date} = req.body; 
    const slot = slot_timings;  

    const {id} = req.params;

    console.log(`The request body: ${req.body}`); 

    if (!label||!body||!cost||!address||!contact_mail||!slot||!data||!Array.isArray(slot)||slot.length == 0 || !date) {
        return res.status(400).json({message:"All fields are required even in case of updating the cases"});
    }

    try {
        const updatedSport = await sportSchema.findByIdAndUpdate(id ,
        {label, body, cost, address, contact_mail},
        {new: true, runValidators: true} //It will check the validation and new refers to it is an updated product
    );

    if (!updatedSport) {
        res.status(404).json({message:"Sport not found"});
    } 



    // updating the slots 

    const bookings = slot.map((slot) => ({
        sport_foreignkey:updatedSport._id, 
        date: new Date(date), 
        slot,
        is_booked:false,
    })); 

    await bookingSchema.insertMany(bookings);

    } 

    catch(error) {
        console.log("An error has occured while updating the sports section"); 
        res.status(404).json({message:"Unable to update the sports booking", error});
    }


})



// ->For getting all the data
router.get("/owner/get", async (req, res) => { 
    try {
        const data = await sportSchema.find();
        return res.send(data);
        
    } catch (error) {
        console.log(message = "Cannot get the data", error);
    }
});  


// -> For deleting a specific sport item
router.delete("/owner/delete/:id", async (req, res) => {
    try {
        const { id } = req.params;

        // Delete all bookings associated with the sport
        const deleteBookings = await bookingSchema.deleteMany({ sport_foreignkey: id });

        // Delete the sport document
        const deletedSport = await sportSchema.findByIdAndDelete(id);

        if (!deletedSport) {
            return res.status(404).send({ message: "Sport item not found" });
        }

        // If no bookings were found, we can still send a success response
        return res.status(200).send({
            message: "Sport deleted successfully",
            deletedBookingsCount: deleteBookings.deletedCount // Return number of deleted bookings
        });
    } catch (error) {
        console.error("Cannot delete the data:", error);
        return res.status(500).send({ message: "Server error", error: error.message });
    }
});



// -> For Booking the slot 
router.get('/booking',async(req,res)=>{
    const { id } = req.params;
    const bookings = await bookingSchema.find(id);
    res.status(201).send(bookings);
})


router.get('/slots/:id', async (req, res) => {
    const { id } = req.params;

    try {
        // Fetch the bookings associated with the sport ID
        const slots = await bookingSchema.find({ sport_foreignkey: id }); // Changed to find by foreign key
        
        res.status(200).json(slots); // Ensure you're sending back the slots
    } catch (error) {
        console.error("Error fetching slots:", error);
        res.status(500).json({ message: "Failed to fetch slots", error: error.message });
    }
});
 

// MARK: Transaction


router.put('/booking/:id', async (req, res) => {
    const { id } = req.params;           // The booking ID
    const { is_booked, email } = req.body;     // The booking status (true/false)

    const session = await mongoose.startSession(); // Start session

    try {
        // Start transaction
        session.startTransaction();

        // Update the booking status
        const updatedBooking = await bookingSchema.findByIdAndUpdate(
            id,
            { is_booked: is_booked },
            { new: true, session }
        );

        if (!updatedBooking) {
            return res.status(404).json({ message: "Booking not found" });
        }

        // Fetch user ID from the request (assuming fetchUserDetails is a function you have)
        const userId = fetchUserDetails(req); 

        // Update the user document (push the booking ID into the sports_bookings field)
        const updatedUser = await UserSchema.findByIdAndUpdate(
            userId,
            { $push: { sport_bookings: id } },
            { new: true, session }
        );

        if (!updatedUser) {
            console.log('User not found');
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if userwallet exists
        let userWallet = await userwallet.findOne({ Uid: userId }).session(session);

        if (!userWallet) {
            // If no userwallet, create a new one
            userWallet = new userwallet({
                Uid: userId,  // Link to the user  
                email: email,
                sports_bookings: []  // Start with an empty sports_bookings array
            });

            await userWallet.save({ session });
        }

        // Now update the userwallet
        userWallet.sports_bookings.push(id); // Add the booking ID to the sports_bookings array
        await userWallet.save({ session });

        // Commit the transaction
        await session.commitTransaction();
        res.status(200).json({ updatedBooking, updatedUser, updatedUserWallet: userWallet });

    } catch (error) {
        // Rollback the transaction in case of error
        await session.abortTransaction();
        console.error("Error updating booking:", error);
        res.status(500).send("Server Error");
    } finally {
        // End the session
        session.endSession();
    }
});









router.post("/booking/create", async (req, res) => {
    const { sportId, slot, user } = req.body;

    try {
        // Fetch the sport to check its available slots
        const sport = await sportSchema.findById(sportId).populate("slot_timings"); // Adjust the field based on your sports schema
        if (!sport) {
            return res.status(404).json({ message: "Sport not found" });
        }

        // Check if the requested slot exists in the sport's slot timings
        if (!sport.slot_timings.includes(slot)) {
            return res.status(400).json({ message: "Invalid slot timing" });
        }

        // Check if the slot is already booked
        const existingBooking = await bookingSchema.findOne({ sport: sportId, slot: slot });
        if (existingBooking) {
            return res.status(400).json({ message: `Slot ${slot} is already booked!` });
        }

        // Create a new booking
        const newBooking = new bookingSchema({
            sport: sportId,
            slot: slot,
            user: user,
        });

        await newBooking.save();
        res.status(201).json({ message: "Slot booked successfully!" });

    } catch (error) {
        console.error("Booking error:", error); // Log error for debugging
        res.status(500).json({ message: "Failed to book slot", error });
    }
});


router.post("/user/booking/create", async (req, res) => {
    const { sportId, slot, user, date } = req.body; // Including date in the request body

    // Basic validation for required fields
    if (!sportId || !slot || !user || !date) {
        return res.status(400).json({ message: "Sport ID, slot, user, and date are required" });
    }

    try {
        // Fetch the sport to get its available slots
        const sport = await sportSchema.findById(sportId);
        if (!sport) {
            return res.status(404).json({ message: "Sport not found" });
        }

        // Check if the requested slot exists in the sport's slot timings
        if (!sport.slot_timings || !sport.slot_timings.includes(slot)) {
            return res.status(400).json({ message: "Invalid slot timing" });
        }

        // Check if the slot is already booked on the specified date
        const existingBooking = await bookingSchema.findOne({
            sport_foreignkey: sportId,
            slot: slot,
            date: date // Check for the specific date
        });
        if (existingBooking) {
            return res.status(400).json({ message: `Slot ${slot} is already booked on ${date}!` });
        }

        // Create a new booking
        const newBooking = new bookingSchema({
            sport_foreignkey: sportId, // Use foreign key reference
            slot: slot,
            booked_user_details: user, // Use the user reference
            date: date // Save the date in the booking
        });

        await newBooking.save();
        res.status(201).json({ message: "Slot booked successfully!", booking: newBooking });

    } catch (error) {
        console.error("Booking error:", error); // Log error for debugging
        res.status(500).json({ message: "Failed to book slot", error: error.message });
    }
});




// -> For getting the slot

router.get("/update-bookings", async (req, res) => {
    try {
        // Fetch sports data
        const response = await fetch(`http://localhost:${port}/sport/owner/get`);
        if (!response.ok) {
            return res.status(500).json({ message: "Failed to fetch sports data" });
        }
        
        const sportsData = await response.json();

        // Loop through each sport and update bookings
        for (const sport of sportsData) {
            const { _id: sportId, slot_timings } = sport;

            // Ensure slot timings exist for the sport
            if (!slot_timings || !Array.isArray(slot_timings)) {
                continue; // Skip if there are no valid slot timings
            }

            // Loop through each slot timing
            for (const slot of slot_timings) {
                // Check if the slot is already booked
                const existingBooking = await bookingSchema.findOne({
                    sport_foreignkey: sportId, // Use foreign key reference
                    slot: slot
                });

                // If not booked, create a new booking (assuming a placeholder user)
                if (!existingBooking) {
                    const newBooking = new bookingSchema({
                        sport_foreignkey: sportId, // Use foreign key reference
                        slot: slot,
                        booked_user_details: "Placeholder User" // Replace with actual user info if needed
                    });

                    await newBooking.save();
                }
            }
        }

        res.status(200).json({ message: "Bookings updated successfully!" });
    } catch (error) {
        console.error("Error updating bookings:", error); // Log the error for debugging
        res.status(500).json({ message: "Failed to update bookings", error: error.message });
    }
});

module.exports=router
