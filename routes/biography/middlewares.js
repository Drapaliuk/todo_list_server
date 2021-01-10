const DBSelectors = require("../../utils/DBSelectors");

const middlewares = {
    put: async (req, res) => {
        const {newValue} = req.body;
        const user = await DBSelectors.getUserById(req.userId)
        const [key, value] = Object.entries(newValue)[0]
        user.biography[key] = value
        user.save();

        res.status(200).json({changedValue: newValue})
      },
}

module.exports = middlewares;