const course = require("../models/course");
const { multipleMongooseToObject } = require("../../until/mongoose");

class meController {
  // [GET] /me/stored/courses
  storedCourses(req, res, next) {
    Promise.all([course.find({}), course.countDocumentsDeleted({ deletedAt: { $ne: null } })])
      .then(([courses, countDeleted]) => {
        res.render("me/storedCourses", {
          countDeleted,
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch(next);
  }

  // [GET] /me/trash/courses
  trashCourses(req, res, next) {
    course
      .findDeleted({ deletedAt: { $ne: null } })
      .then((courses) => {
        res.render("me/trashCourses", {
          courses: multipleMongooseToObject(courses),
        });
      })
      .catch((error) => {
        res.status(400).json({ error: "Có lỗi xảy ra" });
      });
  }
}

module.exports = new meController();
