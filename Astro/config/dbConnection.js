const mongoose = require('mongoose')

exports.dbConnection = () => {
    const URI = process.env.MONGODB_URL
    mongoose.connect(URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => { console.log("Db connection done") })
        .catch((err) => {
            console.error("An error occured", err)
            process.exit(1)
        });
}