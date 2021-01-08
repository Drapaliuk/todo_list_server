const getUserById = require("../../utils/getUserById");

const middlewares = {
    put: async (req, res) => {
        const {newValue} = req.body;
        const user = await getUserById(req.userId)
        const [key, value] = Object.entries(newValue)[0]
        user.settings[key] = value
        user.save();

        res.status(200).json({changedValue: newValue})
      },
}

module.exports = middlewares;