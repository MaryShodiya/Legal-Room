const mongoose = require ('mongoose');
const { v4 : uuidv4 } = require('uuid') ;

const CHAT_ROOM_TYPES = {
    CONSUMER_TO_CONSUMER : "consumer-to-consumer",
    CONSUMER_TO_SUPPORT : "consumer-to-support",
}

const ChatRoomSchema = new mongoose.Schema(
    {
    _Id:{
        type: String,
        default: () => uuidv4().replace(/\-/g, ""),
    },
    userIds: Array,
    type: String,
    chatInitiator: String,
    },
    {
        timestamps: true,
        collection: "chatrooms",
      }
    );
    

ChatRoomSchema.statics.initiateChat = async function (
	userIds, type, chatInitiator
) {
  try {
    const availableRoom = await this.findOne({
      userIds: {
        $size: userIds.length,
        $all: [...userIds],
      },
      type,
    });
    if (availableRoom) {
      return {
        isNew: false,
        message: 'retrieving an old chat room',
        chatRoomId: availableRoom._doc._id,
        type: availableRoom._doc.type,
      }
    }
    const newRoom = await this.create({ userIds, type, chatInitiator });
    return {
      isNew: true,
      message: 'creating a new chatroom',
      chatRoomId: newRoom._doc._id,
      type: newRoom._doc.type,
    };
} catch (err) {
    console.log('err on start chat method', err);
    throw err
}
  }

  ChatRoomSchema.statics.getChatRoomByRoomId = async function (roomId) {
    try {
      const room = await this.findOne({ _id: roomId });
      return room;
    } catch (error) {
      throw error;
    }
  }

  ChatRoomSchema.statics.getChatRoomsByUserId = async function (userId) {
    try {
      const rooms = await this.find({ userIds: { $all: [userId] } });
      return rooms;
    } catch (error) {
      throw error;
    }
  }


  module.exports = mongoose.model('ChatRoom', ChatRoomSchema)
