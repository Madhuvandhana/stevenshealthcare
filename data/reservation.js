
const mongoCollections = require('../config/mongoCollections');
const appointments = mongoCollections.appointments;
const { ObjectId } = require('mongodb');
const user = require('./users');
const doctorData = require('./doctors');
const hospitalData = require('./hospitals');


module.exports = {
   
    async makereservation(userid, docid, resvDate, hospid) {
        if (userid === undefined || docid === undefined || hospid === undefined || resvDate ===undefined) {
            throw 'input is empty';
        }
        if (!userid || !docid || !hospid || !resvDate) {
            throw 'input is empty';
        }
        resvDate = new Date(resvDate);
        const datereserv = new Date(resvDate).toISOString().replace(/T.+/, '');
        console.log()
    
        const appointmentsCollections = await appointments();
        //userid, docid, resvDate, hospName
        
        const newAppointment = {
            patient_id: userid,
            doctor_id: docid,
            hospital_id: hospid,
            date: datereserv,
            days: 0,
            notes:"",
            status: 'confirmed'
        }
    
        const insertinfo = await appointmentsCollections.insertOne(newAppointment);
        if (insertinfo.insertedCount === 0) throw 'Insert reservation fail!';
        return await this.getAppointmentById(insertinfo.insertedId);
    },

    async getAppointmentById(id){

        if (!id) throw 'You must provide an id to search for';
        if(typeof id !== 'string' && typeof id !== 'object') throw 'id must be a string or object';
    
        if(typeof id === 'string'){
         id = ObjectId.createFromHexString(id);
        }
       
        const appointmentsCollection = await appointments();
        const appointment = await appointmentsCollection.findOne({ _id: id });
        if (appointment === null) throw 'No appointment with that id';
        //whole doc data
        return appointment;

    },

    //get list of reservtaion based on session user
    async getReservationList(pid) {

        if (pid === undefined || !pid) {
            throw 'input is empty';
        }
        /* if(typeof pid === 'string'){
            pid = ObjectId.createFromHexString(pid);
           } */
    
        const appointmentsCollection = await appointments();
        const targets = await appointmentsCollection.find({ patient_id: pid }).sort({ date: -1 }).toArray()
    
        for (let i = 0; i < targets.length; i++) {

            const reserv = await this.processReservationList(targets[i]);//process each reservation
        }
    
        let out = new Array(0);
        for(let x = 0 ;x < targets.length ; x++){
            if(targets[x].status != 'cancelled'){
                out.push(targets[x]);
            }
        }
    
        return out;
    },

    async processReservationList(reservation) {
       
        if(reservation) {
           //await doctorData.getDoctor(id);
            let doctor = await doctorData.getDoctor(reservation.doctor_id).catch(e => { throw e });
            let patient = await user.getUser(reservation.patient_id).catch(e => { throw e });
            let hospital = await hospitalData.getHospitalById(reservation.hospital_id).catch(e => { throw e });
            reservation["doctor"] = doctor;
            reservation["patient"] = patient;
            reservation["hospital"] = hospital; 
            reservation["date_formatted"] = new Date(reservation.date).toISOString().replace(/T.+/, '');
            reservation["status"] = reservation.status;
        }
            
        
        return reservation;
    },

    //delete appoitnment by apoointment id
    async deleteAppointment(id){

        if (!id) throw 'You must provide an id to delete for';
        if(typeof id !== 'string' && typeof id !== 'object') throw 'id must be a string or object';

        
        if(typeof id === 'string'){
            id = ObjectId.createFromHexString(id);
        }
        const appointmentsCollection = await appointments();
        const appointment = await this.getAppointmentById(id);
        
        const deletionInfo = await appointmentsCollection.deleteOne({ _id: id });

        if (deletionInfo.deletedCount === 0) {
            throw `Could not delete appointment with id of ${id}`;
        }
        let deletedAppointnment = {
            deleted: true,
            deletedAppointment: appointment,
        }
        return deletedAppointnment;

    },

    //based on apooitnment number and new date
    async editReservation(id,resvDate){
        
        if(id===undefined || resvDate===undefined) 
        throw "You must provide an id and new reservation date.";

        if (!id || !resvDate) 
        throw "You must provide an id and new reservation date.";

        let objId = id;
        const appointmentCollection = await appointments();

        const updatedDate = {
          date: resvDate
        };

        if(typeof id === 'string'){
            objId = ObjectId.createFromHexString(id);
        }
        

        const updatedReservation = await appointmentCollection.updateOne({ _id: objId }, { $set: updatedDate });
    
        if (updatedReservation.modifiedCount === 0) {
          throw "could not update reservation successfully";
        }
    
        return await this.getAppointmentById(id);

    },
   
    async updateNotesById(id, notes) {
        
        if (!id) throw "You must provide an id to search for";
    
        if (!notes) throw "You must provide a name for your Animal";

        let objId = id;
        const appointmentCollection = await appointments();
        const oldnotes = await this.getAppointmentById(id);
        const newNote = oldnotes.notes+" "+ notes;

        const updatedNote = {
          notes: newNote
        };

        if(typeof id === 'string'){
            objId = ObjectId.createFromHexString(id);
        }
        

        const updatedNotes = await appointmentCollection.updateOne({ _id: objId }, { $set: updatedNote });
    
        if (updatedNotes.modifiedCount === 0) {
          throw "could not update notes successfully";
        }
    
        return await this.getAppointmentById(id);
      }
    
    };