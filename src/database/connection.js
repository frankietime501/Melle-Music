const mongoose = require('mongoose');
const logger = require('../utils/logger');


module.exports = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000,
            autoIndex: false,
        });
        logger.info('Connected to MongoDB');
    } catch (error) {
        logger.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
};
