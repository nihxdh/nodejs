const jwt = require('jsonwebtoken');

module.exports = (req,res,next) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if(!decoded.isAdmin){
            throw new Error();
        }

        req.user={
            _id: "admin",
            name: "admin",
            role: "admin"
        };

        next();
    } catch (error) {
        res.status(404).json({message: "admin authentication required"});
    }
};