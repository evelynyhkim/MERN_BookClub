const jwt = require("jsonwebtoken");

module.exports = {
    authenticate(req, res, next){
        jwt.verify(
            req.cookies.usertoken,
            process.env.JWT_SECRET,
            //once we compare the unhashed version of the cookie, run this callback function
            //jwt.verify is going to result in two possible objs, success payload data in side, unsuccessful err


            (err, payload)=>{
                if(err){
                    //not a valid token or cookie doesn't exist
                    res.status(401).json({ verified: false });
                }
                else{
                    console.log(payload);
                    next();
                }
            }
        );
    }
}