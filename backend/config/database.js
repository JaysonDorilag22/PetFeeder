const mongoose = require('mongoose');

// Function to connect to MongoDB
const connectDatabase = async () => {
    try {
        // Log the database URI for debugging
        console.log('Database URI:', process.env.DB_URI);

        // Connect to MongoDB
        await mongoose.connect(process.env.DB_URI, {
            tls: true, // Ensure TLS is enabled
            // tlsAllowInvalidCertificates: true // Uncomment for debugging (not for production)
        });

        // Log successful connection
        console.log(`MongoDB Database connected with HOST: ${mongoose.connection.host}`);
    } catch (err) {
        // Log any connection errors
        console.error('Error connecting to MongoDB:', err);
    }
}

// Export the function for use in other parts of your application
module.exports = connectDatabase;
