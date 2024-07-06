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

        newCourse.save()
            .then(() => res.redirect('/'))
            .catch(error => next(error))

    }

    // [GET] /course/:id/edit
    async edit(req, res, next) {
        try {
            const findCourse = await course.findById(req.params.id);
            console.log(findCourse);

            res.render('course/edit', {
                findCourse: mongooseToObject(findCourse)
            })
        } catch (error) {
            console.log('nothing');
        }
    }
    
    // [PUT] /course/:id
    update(req, res, next) {
        course.updateOne({ _id: req.params.id }, req.body)
            .then(() => res.redirect('/me/stored/courses'))
            .catch(next);
    }

}

module.exports = new courseController();
