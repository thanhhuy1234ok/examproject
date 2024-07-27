const mongoose = require('mongoose');

class Mongo {
    constructor() {
        this._connect();
    }

    _connect() {
        const env = process.env.NODE_ENV;
        console.log('Environment:', env);
        let URI = '';

        if (env === 'dev') {
            URI = process.env.MONGO_URI_DEV;
        } else if (env === 'qc') {
            URI = process.env.MONGO_URI_QC;
        } else {
            URI = process.env.MONGO_URI_PROD;
        }

        console.log('MongoDB URI:', URI);

        mongoose.connect(URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('MongoDB Connected Success!!!!'))
            .catch(err => console.log(err));
    }
}

module.exports = new Mongo();
