var UserModel = require('../models/userModel.js');

 //userController.js
 // description :: Server-side logic for managing users.

module.exports = {

    //userController.list()
     
    list: function (req, res) {
        UserModel.find(function (err, users) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            return res.json(users);
        });
    },

    /**
     * userController.show()
     */
    show: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user.',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            return res.json(user);
        });
    },

    /**
     * userController.create()
     */
    create: function (req, res) {
        
        UserModel.findOne({
            $or: [{ username: req.body.username }, { email: req.body.email }]
        }, function (err, existingUser) {
            if (err) {
                return res.status(500).json({
                    message: 'Error checking database',
                    error: err
                });
            }

            
            if (existingUser) {
                return res.status(400).json({
                    message: "User with this username or email already exists."
                });
            }

            
            var user = new UserModel({
                username : req.body.username,
                email : req.body.email,
                password : req.body.password
            });

            
            user.save(function (err, savedUser) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when creating User',
                        error: err
                    });
                }
                
                
                return res.status(201).json(savedUser);
            });
        });
    },

    /**
     * userController.update()
     */
    update: function (req, res) {
        var id = req.params.id;

        UserModel.findOne({_id: id}, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when getting user',
                    error: err
                });
            }

            if (!user) {
                return res.status(404).json({
                    message: 'No such user'
                });
            }

            user.username = req.body.username ? req.body.username : user.username;
            user.email = req.body.email ? req.body.email : user.email;
            user.password = req.body.password ? req.body.password : user.password;
            
            user.save(function (err, user) {
                if (err) {
                    return res.status(500).json({
                        message: 'Error when updating user.',
                        error: err
                    });
                }

                return res.json(user);
            });
        });
    },

    /**
     * userController.remove()
     */
    remove: function (req, res) {
        var id = req.params.id;

        UserModel.findByIdAndRemove(id, function (err, user) {
            if (err) {
                return res.status(500).json({
                    message: 'Error when deleting the user.',
                    error: err
                });
            }

            return res.status(204).json();
        });
    },

    /**
     * userController.login()
     */
    login: function(req, res, next){ //The controller calls a custom authentication method from the Model to verify the password
        UserModel.authenticate(req.body.username, req.body.password, function(err, user){
            if(err || !user){
                
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            
            req.session.userId = user._id; //server saves the user's unique MongoDB _id into req.session
            req.session.username = user.username;
            
            
            return res.json({ 
                message: 'Login successful',
                user: { _id: user._id, username: user.username }
            });
        });
    },

    /**
     * userController.profile() checks if you login
     */
    profile: function(req, res, next){
        UserModel.findById(req.session.userId) //front-end requests user data, the controller checks req.session.userId
        .exec(function(error, user){
            if(error){
                return res.status(500).json({ message: 'Server error' });
            } else{
                if(user === null){
                    
                    return res.status(401).json({ message: 'Unauthorized, please log in' });
                } else{
                   
                    return res.json(user);
                }
            }
        });  
    },

    /**
     * userController.logout() user clicks logout, req.session.destroy() completely erases the session from the server's memory
     */
    logout: function(req, res, next){
        if(req.session){
            req.session.destroy(function(err){
                if(err){
                    return res.status(500).json({ message: 'Error during logout' });
                } else{
                    
                    return res.json({ message: 'Logout successful' });
                }
            });
        }
    }
};