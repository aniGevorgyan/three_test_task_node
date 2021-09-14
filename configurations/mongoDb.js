const mongoose = require('mongoose');

class mongoDb {
    static connect(DB_URL, option = null) {

        mongoose.connect(DB_URL, option);

        mongoose.connection.on('error', err => {
            console.error(err);
            console.log('MongoDB connection failed: ' + DB_URL);
            process.exit();
        });
    }

    static async close() {
       await mongoose.connection.close();
    }
}

module.exports = mongoDb;
