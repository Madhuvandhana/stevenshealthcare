
const mongoCollections = require('../config/mongoCollections');
const users = mongoCollections.users;
const hospitals = mongoCollections.hospitals;
const doctors = mongoCollections.doctors;
const { ObjectId } = require('mongodb');
const user = require("./users");

module.exports = {

    async getHospitalById(id) {

        if (!id) throw 'You must provide an id to search for';
        if(typeof id !== 'string' && typeof id !== 'object') throw 'id must be a string or object';
    
        if(typeof id === 'string'){
         id = ObjectId.createFromHexString(id);
        }
       
        const hospCollection = await hospitals();
        const hospital = await hospCollection.findOne({ _id: id });
        if (hospital === null) throw 'No hospital with that id';
        //whole doc data
        return hospital;
    },

    //doc id passed
    async getHospitalByDoc(id){

        if (!id) throw 'You must provide an id to search for';
        if(typeof id !== 'string' && typeof id !== 'object') throw 'id must be a string or object';

        if(typeof id === 'string'){
            id = ObjectId.createFromHexString(id);
           }
        const hospitalCollection = await hospitals();
        const docCollection = await doctors();
        const arrayOfHospitals = await hospitalCollection.find({'doctors._id':id}).toArray();
        if(arrayOfHospitals === null) throw 'no hospitals found.'
        return arrayOfHospitals;

    },

    async addHospitals(data){
        if(!data){
            throw 'Hospital data is not provided.'
        }
        const hospitalCollection = await hospitals();
        const insertInfo = await hospitalCollection.insertOne(data);
        if (insertInfo.insertedCount === 0) throw 'Insert failed';
    
        const newId = insertInfo.insertedId;
        const hospital = await this.getHospitalById(newId);
        return hospital;
    },
    async addDoctorsToHospital(data, hosID){
        if(typeof hosID === 'string'){
            hosID = ObjectId.createFromHexString(hosID);
        }
        if(!data){
            throw'doctors cannot be empty.'
        }
  
        const hospitalCollection = await hospitals();
        const updateInfo = await hospitalCollection.updateOne(
          {_id: hosID},
          {$addToSet: {doctors: data}}
        );
    
        if (!updateInfo.matchedCount && !updateInfo.modifiedCount) throw 'Update failed';
    
        return await this.getHospitalById(hosID);
    },
    async getAllHospitals() {

        const hospitalCollection = await hospitals();
    
        const hospList = await hospitalCollection.find({}).toArray();
        
        return hospList;//list of hospitals
    },
}