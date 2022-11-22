const mognoose = require('mongoose');
const config = require('./config.json');

module.exports = {
    initMongoose: () => {
        mognoose.connect(config.mongoUrl);
        
        mognoose.connection.on('connected', () => console.log("Connected to mongodb"));
        mognoose.connection.on('disconnected', () => console.log("Disonnected from mongodb"));
        mognoose.connection.on('error', () => console.error(error));
    }
}