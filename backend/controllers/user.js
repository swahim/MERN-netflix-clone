const User = require('../models/User');
const CryptoJS = require('crypto-js');
class Controller {
    //UPDATE
    async update(req, res, next) {
        if(req.params.id === req.user.id || req.user.isAdmin){
            if(req.body.password){
                req.body.password = CryptoJS.AES.encrypt(
                    password,
                    process.env.SECRET_KEY
                  ).toString();
            }
            try{
                const user = await User.findByIdAndUpdate(req.params.id, {$set : req.body},
                    {new : true});
                res.status(200).json(user);
            }catch(err){
                res.status(500).json(err);
                next(err);
            }
        }else{
            res.status(403).json("You cant update account");
        }
    }
    //DELETE
    //GET
    //GET ALL
    //GET ALL USER STATS
}

module.exports = new Controller();