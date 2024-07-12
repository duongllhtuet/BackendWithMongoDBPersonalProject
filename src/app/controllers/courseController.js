const course = require("../models/course");
const { mongooseToObject } = require("../../until/mongoose");
const { json } = require("express");

class courseController {
  // [GET] /course/:slug
  show(req, res, next) {
    course
      .findOne({ slug: req.params.slug })
      .then((course) => {
        res.render("course/show", { course: mongooseToObject(course) });
      })
      .catch(next);
  }

  // [GET] /course/create
  create(req, res, next) {
    res.render("course/create");
  }

  // [POST] /course/store
  store(req, res, next) {
    req.body.image = `https://img-youtube.%20com/vi/${req.body.videoID}/sddefault.jpg`;

    const newCourse = new course(req.body);

    newCourse
      .save()
      .then(() => res.redirect("/me/stored/courses"))
      .catch((error) => next(error));
  }

  // [GET] /course/:id/edit
  async edit(req, res, next) {
    try {
      const findCourse = await course.findById(req.params.id);
      console.log(findCourse);

      res.render("course/edit", {
        findCourse: mongooseToObject(findCourse),
      });
    } catch (error) {
      console.log("nothing");
    }
  }

  // [PUT] /course/:id
  update(req, res, next) {
    course
      .updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect("/me/stored/courses"))
      .catch(next);
  }

  // [DELETE] /course/:id
  delete(req, res, next) {
    course
      .delete({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [DELETE] /course/:id/force
  forceDelete(req, res, next) {
    course
      .deleteOne({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  // [Patch] /course/:id/restore
  restore(req, res, next) {
    course
      .restore({ _id: req.params.id })
      .then(() => res.redirect("back"))
      .catch(next);
  }

  //  [POST] /course/handleFormActions
  handleFormActions(req, res, next) {
    switch (req.body.action) {
      case 'delete':
        course.delete({ _id: { $in: req.body.courseIds } })
          .then(() => res.redirect("back"))
          .catch(next);
      
        break;
    
      default:
        res.render("error", { error: 'Action is invalid!!' });
    }
  }
}

module.exports = new courseController();
