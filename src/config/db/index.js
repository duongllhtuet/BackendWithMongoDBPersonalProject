
const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

async function connect() {

    try {
        await mongoose.connect('mongodb://localhost:27017/Duong_Education_Dev', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Connect Successfully!!!')
    } catch (error) {
        console.log("Connect Fail!!!!")
    }

}

module.exports = { connect };