const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

exports.signup = (req, res, next) => {
    const { name, email, password, confirmPassword, contactNumber } = req.body;
    User.findOne({ email: email })
        .then(user => {
            if (user) {
                return res.status(400).json({ message: 'User already exists' })
            }
            else if (password !== confirmPassword) {
                return res.status(300).json({ message: 'Passwords do not match' });
            }

            bcrypt.hash(password, 12)
                .then(hashedPassword => {
                    const newUser = {
                        name: name,
                        email: email,
                        password: hashedPassword,
                        contactNumber: contactNumber
                    }
                    User.create(newUser)
                        .then(result => {
                            return res.status(200).json({ message: 'User created successfully.' })
                        })
                        .catch(err => {
                            console.log(err)
                        })
                })
        })
        .catch(err => {
            res.json(err);
        })
}

exports.loginUser = (req, res, next) => {
    const { email, password } = req.body;
    let authUser;

    User.findOne({ email: email })
        .then(user => {
            if (!user) {
                return res.status(400).json({ message: "User is not present" })
            }
            authUser = user;
            return bcrypt.compare(password, user.password)
        })
        .then(isMatch => {
            if (isMatch) {
                const payload = {
                    _id: authUser._id,
                    name: authUser.name
                }
                jwt.sign(
                    payload,
                    'secret',
                    { expiresIn: 3600 },
                    (err, token) => {
                        if (err) {
                            return res.status(400).json(err);
                        }
                        return res.status(200)
                            .json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                    })
            }
            else {
                return res.status(400).json({ message: "Password incorrect" })
            }
        })
        .catch(err => {
            res.status(400).json(err);
        })

}