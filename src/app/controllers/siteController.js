const course = require('../models/course');
const { multipleMongooseToObject } = require('../../until/mongoose');

class siteController {
    // [GET] /
    async home(req, res) {
        try {
            const courses = await course.find({});
        
            res.render('home', {
                courses: multipleMongooseToObject(courses),
            });
        } catch (error) {
            res.status(400).json( {error: "Co loi xay ra"} );
        }

    }

    // [GET] /search
    search(req, res) {
        res.render('search');
    }
}

module.exports = new siteController();
