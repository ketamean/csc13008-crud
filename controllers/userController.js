const controller = {};
const models = require("../models");
const { use } = require("../routes/userRouter");

controller.show = async (req, res) => {
  res.locals.users = await models.User.findAll({
    attributes: [
      "id",
      "imagePath",
      "username",
      "firstName",
      "lastName",
      "mobile",
      "isAdmin",
    ],
    order: [["createdAt", "DESC"]],
  });
  res.render("user-management");
};

controller.add = async (req, res) => {
  const { firstName, lastName, username, mobile, isAdmin } = req.body
  try {
    await models.User.create({
      firstName,
      lastName,
      username,
      mobile,
      isAdmin: isAdmin? true: false
    })
    res.redirect('/users')
  } catch (err) {
    console.err(err)
  }
}

controller.update = async (req, res) => {
  const { id, firstName, lastName, mobile, isAdmin } = req.body
  try {
    await models.User.update({
      firstName,
      lastName,
      mobile,
      isAdmin: isAdmin? true : false
    },
    {
      where: {id}
    })

    res.send('User updated successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('Cannot update user')
  }
}

controller.delete = async (req, res) => {
  try {
    const {username, id} = req.body
    await models.User.destroy({
      where: {username, id}
    })
    res.send('User deleted successfully')
  } catch (err) {
    console.error(err)
    res.status(500).send('Cannot delete user')
  }
}

module.exports = controller;
