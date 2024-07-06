const course = require('../models/course');
const { multipleMongooseToObject } = require('../../until/mongoose');

class meController {

    // [GET] /me/stored/courses
    async storedCourses(req, res, next) {
        try {
            const courses = await course.find({})

            console.log(courses);

            res.render('me/storedCourses', {
                courses: multipleMongooseToObject(courses),
            })
        } catch (error) {
            res.status(400).json( {error: "Co loi xay ra"} );
        }
    }

}

module.exports = new meController();
