const course = require('../models/course');
const { mongooseToObject } = require('../../until/mongoose');

class courseController {

    // [GET] /course/:slug
    show(req, res, next) {
        course.findOne({ slug: req.params.slug })
            .then(course => {
                res.render('course/show', { course: mongooseToObject(course) })
            })
            .catch(next)
    }

    // [GET] /course/create
    create(req, res, next) {
        res.render('course/create');
    }

    // [POST] /course/store
    store(req, res, next) {
        // res.json(req.body);
        const formData = req.body;

        formData.image = `https://img-youtube.%20com/vi/${formData.videoID}/sddefault.jpg`;

        const newCourse = new course(formData);

        newCourse.save();

        res.send("Course Save!!!1")
    }

}

module.exports = new courseController();
