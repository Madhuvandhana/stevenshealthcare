
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const { ObjectId } = require('mongodb');
module.exports = {
async getUser(id) {
    if (!id) throw 'You must provide an id to search for';
    if(typeof id !== 'string' && typeof id !== 'object') throw 'id must be a string or object';

    if(typeof id === 'string'){
     id = ObjectId.createFromHexString(id);
    }
   
    const userCollection = await users();
    const user = await userCollection.findOne({ _id: id });
    if (user === null) throw 'No user with that id';

    return user;
},

async getAllUsers() {
    const userCollection = await users();

    const userList = await userCollection.find({}).toArray();

    return userList;
},
 async addUsers(userName,  email){
    const userCollection = await users();
    let newuser = {
        userName: userName,
        email: email.toLowerCase()
    };

    const insertInfo = await userCollection.insertOne(newuser);
    if (insertInfo.insertedCount === 0) throw 'Insert failed';

    const newId = insertInfo.insertedId;
    const user = await this.getUser(newId);
    return user;
},

async checkLogin( email){
    const userOld = await this.checkEmail(email);
    return userOld;
},
async checkEmail(email){
    const userCollection = await users();
    const userOld = await userCollection.findOne({ email: email.toLowerCase() });
    return userOld;
},
async removeuser(id) {
    const userCollection = await users();
    const user = await this.getUser(id);
    if(typeof id === 'string'){
        id = ObjectId.createFromHexString(id);
    }
    const deletionInfo = await userCollection.deleteOne({ _id: id });

    if (deletionInfo.deletedCount === 0) {
        throw `Could not delete user with id of ${id}`;
    }
    let deleteduser = {
        deleted: true,
        data: user,
    }
    return deleteduser;
},
async updateuser(userId, userName, email) {
    const userCollection = await users();
    const user = await this.getUser(userId);
    const updateduser = {
        userName: userName,
        email: email.toLowerCase()
    };

    if(typeof userId !== 'string' && typeof userId !== 'object') throw 'id must be a string or object';

    if(typeof userId === 'string'){
        userId = ObjectId.createFromHexString(userId);
    }

    // const objId = ObjectId.createFromHexString(userId);

    const updatedInfo = await userCollection.updateOne({ _id: userId }, { $set: updateduser });
    if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
        throw 'Update failed';
    }

    return await this.getUser(userId);
},
async addAddress(userID, addressId, address, city, state, zip, country) {
    // let currentBand = await this.getBand(bandId);
    // console.log(currentBand);

    const userCollection = await users();
    const updateInfo = await userCollection.updateOne(
      {_id: userID},
      {$addToSet: {address: {id: addressId, address: address, city: city, state:state, zip:zip, country:country}}}
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await this.getBand(userID);
  },

  async updateAddress(userId, addressId, address, city, state, zip, country) {
    // let currentBand = await this.getBand(bandId);
    // console.log(currentBand);
    let secondUpdate = {
        $pull: {address: {id: addressId}}
      }


    const userCollection = await users();
    const deletePrevInfo = await userCollection.updateOne(
        {_id: userId}, secondUpdate);

    if (!deletePrevInfo.matchedCount && !deletePrevInfo.modifiedCount) throw 'Update failed';

    const updateInfo = await userCollection.updateOne(
      {_id: userId},
      {$addToSet: {address: {id: addressId, address: address, city: city, state:state, zip:zip, country:country}}}
    );

    if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';

    return await this.getUser(userId);
  },

  async updatePassword(userId) {
    const userCollection = await users();
    const user = await this.getUser(userId);
    const updateduser = {
        userName: user.userName,
        email: user.email
    };

    if(typeof userId !== 'string' && typeof userId !== 'object') throw 'id must be a string or object';

    if(typeof userId === 'string'){
        userId = ObjectId.createFromHexString(userId);
    }

    // const objId = ObjectId.createFromHexString(userId);

    const updatedInfo = await userCollection.updateOne({ _id: userId }, { $set: updateduser });
    if (!updatedInfo.matchedCount && !updatedInfo.modifiedCount) {
        throw 'Update failed';
    }

    return await this.getUser(userId);
  }


};