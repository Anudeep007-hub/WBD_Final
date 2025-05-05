const mongoose=require("mongoose"); 


const sportSchema = new mongoose.Schema(
    {
        label: {
            type: String, 
            required: true,
            maxlength: 30, 
            match: /^[A-Za-z]+$/
        }, 

        
        body: {
            type: String, 
            required: true,
            validate: {
                validator: function(v) {
                    // Regular expression to allow letters, numbers, and specific special characters
                    const regex = /^[A-Za-z0-9.,'"\/?\-\s]+$/;
                    // Check if the string matches the pattern
                    const validFormat = regex.test(v);
                    // Count the number of letters in the string (both upper and lowercase)
                    const letterCount = (v.match(/[A-Za-z]/g) || []).length;
                    // Ensure at least 5 letters and valid format
                    return validFormat && letterCount >= 5;
                },
                message: 'Body must have at least 5 letters and can only contain letters, numbers, and the special characters: ".", ",", "\'", "/", "?", and "-"',
            }
        },
        cost: {
            type: Number, 
            required: true,
            min: 0,
            max: 10000
        }, 
        address: {
            type: String, 
            required: true,
            maxlength: 200, // Maximum length of 200 characters
            validate: {
                validator: function(v) {
                    // Regular expression to allow letters, numbers, and specific special characters
                    const regex = /^[A-Za-z0-9.,'"\/\-\s]+$/;
                    // Check if the string matches the pattern
                    const validFormat = regex.test(v);
                    // Count the number of letters in the string (both upper and lowercase)
                    const letterCount = (v.match(/[A-Za-z]/g) || []).length;
                    // Ensure at least 5 letters and valid format
                    return validFormat && letterCount >= 4;
                },
                message: 'Address must have at least 4 letters and can only contain letters, numbers, and the special characters: ".", ",", "\'", "/", and "-"',
            }
        },

        contact_mail: {
            type: String, 
            required: true,
            match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, // Regular expression for validating email format
            message: 'Please enter a valid email address',
        }
    }
);


module.exports = mongoose.model('sports', sportSchema);