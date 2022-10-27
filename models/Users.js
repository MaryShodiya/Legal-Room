/*const mongoose = require('mongoose');
const { v4 : uuidv4 } = require('uuid');

  const USER_TYPES = {
    CONSUMER: "consumer",
    SUPPORT: "support",
  };
  

const UsersSchema = new mongoose.Schema(
    {
        _id: {
            type: String,
            default : () => uuidv4().replace (/\-/g, ""),
        },
        firstName: String,
        lastName : String,
        type: String,
    },
    {
        timestamps: true,
        collection: 'users',
    }
);

UsersSchema.statics.createUser = async function(
    firstName,
    lastName,
    type
) {
    try {
        const users = await this.create ({ firstName, lastName, type })
        return user;
    }catch (err){ throw err}
}

UsersSchema.statics.getUserById = async function(id) {
    try{
        const users = await this.findOne ({ _id : id})
        if(!users) throw ({error: 'User not found'})
        return user;
    } catch (err) {
        throw err;
    }
}

UsersSchema.statics.getUsers = async function() {
    try{
        const users = await this.find()
        return users;
    }catch (err) {
        throw err;
    }
}

UsersSchema.statics.deleteByUserById = async function(id) {
    try{
        const result = await this.remove({ _id: id })
        return result
    }catch (err) {
        throw err;
    }
}

UsersSchema.statics.getUserByIds = async function (ids) {
    try {
      const users = await this.find({ _id: { $in: ids } });
      return users;
    } catch (error) {
      throw error;
    }
  }

 module.exports = mongoose.model('Users', UsersSchema)*/
