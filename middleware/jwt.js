/*const jwt = require('jsonwebtoken');
const UsersModel = require ('../models/Users');

const SECRET_KEY = 'some_secret_key';

module.exports = {
    encode: async (req, res, next)  => {
        try{
            const { userId } = req.params;
            const user = await UsersModel.getUserById(userId)
              const payload = {
              userId : user._id,
              userType: user.type,
       } ;
       const authToken = jwt.sign(payload, SECRET_KEY) 
       console.log('Auth', authToken)
       req.authToken = authToken;
       next()
} catch(err) {
    return res.status(400).json({ success: false, message: err.err})
}
    },
    
    
    decode :  (req, res, next) => {
        if (!req.headers['authorization']) {
            return res.status(400).json({ success: false, message: 'No access token provided' });
          }
          const accessToken = req.headers.authorization.split(' ')[1];
          try {
            const decoded = jwt.verify(accessToken, SECRET_KEY);
            req.userId = decoded.userId;
            req.userType = decoded.type;
            return next();
          } catch (error) {
            return res.status(401).json({ success: false, message: error.message });
          }
    }

}*/
   


