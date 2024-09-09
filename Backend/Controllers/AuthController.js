const bcrypt = require('bcrypt');
const UserModel = require("../Models/User");


const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await UserModel.findOne({ email });
        if (user) {
            return res.status(409)
                .json({ message: 'User already exists..', success: false });
        }

        const userModel = new UserModel({ name, email, password });
        userModel.password = await bcrypt.hash(password, 100);
        await userModel.save();
        res.status(201)
            .json({
                message: "signup successful",
                success: true
            })
    } catch (err) {
        res.status(500)
            .json({
                message: "Internal server error",
                error: err.message,
                success: false
            })

    }
}

module.exports = {
    signup
}