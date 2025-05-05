const fetchUserDetails = (req) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            throw new Error('No token found - user might not be logged in');
        }

        const token = authHeader.split(" ")[1];
        const payload = token.split('.')[1];
        const decodedPayload = JSON.parse(Buffer.from(payload, 'base64').toString());

        const userId = decodedPayload.userId;
        console.log(`The user ID for the logged-in user: ${userId}`);
        
        return userId;
    } catch (error) {
        console.error('Error:', error);
        throw error;
    }
};

module.exports = fetchUserDetails;