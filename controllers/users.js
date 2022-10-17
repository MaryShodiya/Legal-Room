const validator = require('validator')
const  { UserModel,  USER_TYPES } = require('../models/Users')

module.exports = {
createUser: async (req, res) => {
   try{
       const validation = validator(types => ({
           payload: req.body,
           checks:{
               firstName: { type: types.string },
               lastName: { type: types.string },
               type: { type: types.enum, options: { enum : USER_TYPES } },  
           }
       }));
       if(!validation.success) return res.status(400).json({ ...validation });

       const { firstName, lastName, type } = req.body
       const user = await UserModel.createUser(firstName, lastName, type)
       //return res.status(200).json({ success:true, user }) 
       return res.render("createUser.ejs", { user: req.user})
   } catch (err) {
      return res.status(500).json({ success:false, err:err}) 
   }
},

  getUserById: async (req, res) => {
      try{
          const user = await UserModel.getUserById(req.params.id);
         // return res.status(200).json({success:true, user})
      } catch(err) {
          return res.status(500).json({success:false, err: err})
      }
  },
  getAllUsers: async (req, res) => {
      try{
          const users = await UserModel.getUsers();
          return res.status(200).json({ success:true, users })
      } catch(err) {
          return res.status(500).json({success:false, err: err})
      }
  },
  deleteUserById: async (req, res) => {
      try{
          const user = await UserModel.deleteByUserById(req.params.id)
          return res.status(200).json({ 
              success:true, 
              message: `Deleted a count of ${user.deletedCount} user`
            })
      } catch(err){
          return res.status(500).json({success:false, err: err})
      }
  },
}