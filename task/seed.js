var dbConnection = require("../config/mongoConnection");
var hospitalData = require('../data/hospitals')
var doctorData = require('../data/doctors')
var userData = require('../data/users')
async function main() {
    var db = await dbConnection();
    await db.dropDatabase();
    //hospitals
    let hos1 = {
      "name": "Riverside hospital",
      "address":"1485 Bloomfield St, Hoboken, NJ ",
      "holidays":["Sunday"]
      };
    let hos2 = {
        "name": "Christ Hospital",
        "address":"176 Palisade Avenue Jersey City, New Jersey",
        "holidays":["Saturday", "Sunday"]
        };
    let hos3 = {
          "name": "Essex County Hospital Center",
          "address":"Cedar Grove, New Jersey",
          "holidays":["Saturday", "Sunday"]
      };
     let hos4 = {
        "name": "Pascack Valley Medical Center",
        "address":"250 Old Hook Road, Westwood, New Jersey",
        "holidays":["Sunday"]
    };
    let hos5 = {
      "name": "Jefferson Cherry Hill Hospital",
      "address":"Cherry Hill, NJ 08002",
      "holidays":["Saturday", "Sunday"]
  };
  let hos6 = {
    "name": "Jefferson Stratford Hospital",
    "address":"18 East Laurel Road Stratford",
    "holidays":["Saturday", "Sunday"]
};
let hos7 = {
  "name": "Jefferson Washington Township Hospital",
  "address":"435 Hurffville-Cross Keys Road Turnersville",
  "holidays":["Sunday"]
};
let hos8 = {
  "name": "Jersey City Medical Center",
  "address":"355 Grand Street, Jersey City, Hudson County",
  "holidays":["Sunday"]
};
let hos9 = {
  "name": "East Mountain Hospital",
  "address":" 252 County Road 601, Belle Mead, NJ",
  "holidays":["Sunday"]
};
let hos10 = {
  "name": "East Orange General Hospital",
  "address":"80 S Munn Ave, East Orange, NJ",
  "holidays":["Sunday"]
};
    
      var hospital1 = await hospitalData.addHospitals(hos1);
      var hospital2 = await hospitalData.addHospitals(hos2);
      var hospital3 = await hospitalData.addHospitals(hos3);
      var hospital4 = await hospitalData.addHospitals(hos4);
      var hospital5 = await  hospitalData.addHospitals(hos5);
      var hospital6 = await hospitalData.addHospitals(hos6);
      var hospital7 = await hospitalData.addHospitals(hos7);
      var hospital8 = await  hospitalData.addHospitals(hos8);
      var hospital9 = await hospitalData.addHospitals(hos9);
      var hospital10 = await  hospitalData.addHospitals(hos10);


      // doctors

      let doc1= {
         "name": "Dr. Shalini",
         "gender":"Female",
        "specialization":"gynecologist",
        "education":"MBBS, MD",
        "medical_registration_verified":true,
        "experience":"12 years",
        "description":"Dr. Shalini is a gynecologist, in Washington street, New Jersey and has an"+
        "experience of 12 years in these fields.",
        "hospitals":[
        {
        "_id":hospital1._id,
        "available_slots":[
        "10:00 am", "11:00 am",
        "2:00 pm"],
        "fee": 100
        },
        {
        "_id":hospital5._id,
        "available_slots":[
        "3:00 pm", "4:00 pm", "7:00 pm", "8:00 pm"],
        "fee": 150
        }
        ]
      };
      var doctor1= await doctorData.addDoctors(doc1);
      await hospitalData.addDoctorsToHospital(doctor1, hospital1._id);
      await hospitalData.addDoctorsToHospital(doctor1, hospital5._id);

      let doc2= {
        "name": "Dr. Lisa Hadley",
        "gender":"Female",
       "specialization":"OB-GYN",
       "education":"MD",
       "medical_registration_verified":true,
       "experience":"20 years",
       "description":"Dr. Lisa Hadleyis a OB-GYN, in New Jersey and has an"+
       "experience of 20 years in these fields.",
       "hospitals":[
       {
       "_id":hospital2._id,
       "available_slots":[
       "10:00 am", "11:00 am",
       "2:00 pm","3:00 pm", "4:00 pm"],
       "fee": 110
       }
       ]
     };
     var doctor2= await doctorData.addDoctors(doc2);
     await hospitalData.addDoctorsToHospital(doctor2, hospital2._id);
    
     let doc3= {
      "name": "Dr. Charles Pearson",
      "gender":"Male",
     "specialization":"Dentist",
     "education":"MBBS, MD",
     "medical_registration_verified":true,
     "experience":"17 years",
     "description":"Dr. Charles Pearson is a Dentist, in hoboken, New Jersey and has an"+
     "experience of 17 years in these fields.",
     "hospitals":[
     {
     "_id":hospital1._id,
     "available_slots":[
     "10:00 am", "11:00 am",
     "2:00 pm"],
     "fee": 100
     },
     {
     "_id":hospital5._id,
     "available_slots":[
     "3:00 pm", "4:00 pm"],
     "fee": 150
     },
     {
      "_id":hospital8._id,
      "available_slots":[
       "6:00 pm", "7:00 pm", "8:00 pm"],
      "fee": 80
      }
     ]
   };
   var doctor3= await doctorData.addDoctors(doc3);
   await hospitalData.addDoctorsToHospital(doctor3, hospital1._id);
   await hospitalData.addDoctorsToHospital(doctor3, hospital5._id);
   await hospitalData.addDoctorsToHospital(doctor3, hospital8._id);
   
   let doc4= {
    "name": "Dr. Jamie Bassel",
    "gender":"Male",
   "specialization":"Chiropractor",
   "education":"MBBS, MD",
   "medical_registration_verified":true,
   "experience":"13 years",
   "description":"Dr. Jamie Bassel is a Chiropractor, in New Jersey and has an"+
   "experience of 13 years in these fields.",
   "hospitals":[
   {
   "_id":hospital5._id,
   "available_slots":[
   "10:00 am", "11:00 am",
   "2:00 pm"],
   "fee": 100
   },
   {
   "_id":hospital6._id,
   "available_slots":[
   "3:00 pm", "4:00 pm"],
   "fee": 150
   },
   {
    "_id":hospital7._id,
    "available_slots":[
     "6:00 pm", "7:00 pm", "8:00 pm"],
    "fee": 80
    }
   ]
 };

 var doctor4= await doctorData.addDoctors(doc4);
 await hospitalData.addDoctorsToHospital(doctor4, hospital5._id);
 await hospitalData.addDoctorsToHospital(doctor4, hospital6._id);
 await hospitalData.addDoctorsToHospital(doctor4, hospital7._id);

 let doc5= {
  "name": "Dr. Monica C. Martin",
  "gender":"Female",
 "specialization":"Cardiologist",
 "education":"MBBS, MD",
 "medical_registration_verified":true,
 "experience":"11 years",
 "description":"Dr. Monica C. Martin is a Cardiologist, in New Jersey and has an"+
 "experience of 11 years in these fields.",
 "hospitals":[
 {
 "_id":hospital5._id,
 "available_slots":[
 "10:00 am", "11:00 am",
 "2:00 pm"],
 "fee": 100
 },
 {
 "_id":hospital6._id,
 "available_slots":[
 "3:00 pm", "4:00 pm"],
 "fee": 150
 },
 {
  "_id":hospital7._id,
  "available_slots":[
   "6:00 pm", "7:00 pm", "8:00 pm"],
  "fee": 80
  }
 ]
};
var doctor5= await doctorData.addDoctors(doc5);
await hospitalData.addDoctorsToHospital(doctor5, hospital5._id);
await hospitalData.addDoctorsToHospital(doctor5, hospital6._id);
await hospitalData.addDoctorsToHospital(doctor5, hospital7._id);

let doc6= {
  "name": "Dr. Michael Pollak",
  "gender":"Male",
 "specialization":"Primary Care Doctor",
 "education":"MBBS, MD",
 "medical_registration_verified":true,
 "experience":"10 years",
 "description":"Dr. Michael Pollak is a Primary Care Doctor, in New Jersey and has an"+
 "experience of 10 years in these fields.",
 "hospitals":[
 {
 "_id":hospital5._id,
 "available_slots":[
 "10:00 am", "11:00 am",
 "2:00 pm"],
 "fee": 100
 },
 {
 "_id":hospital6._id,
 "available_slots":[
 "3:00 pm", "4:00 pm"],
 "fee": 150
 },
 {
  "_id":hospital7._id,
  "available_slots":[
   "6:00 pm", "7:00 pm", "8:00 pm"],
  "fee": 80
  }
 ]
};
var doctor6= await doctorData.addDoctors(doc6);
await hospitalData.addDoctorsToHospital(doctor6, hospital5._id);
await hospitalData.addDoctorsToHospital(doctor6, hospital6._id);
await hospitalData.addDoctorsToHospital(doctor6, hospital7._id);

let doc7= {
  "name": "Dr. Prahlad Gadhavi",
  "gender":"Male",
 "specialization":"Primary Care Doctor",
 "education":"MBBS, MD",
 "medical_registration_verified":true,
 "experience":"5 years",
 "description":"Dr. Prahlad Gadhavi is a Primary Care Doctor, in New Jersey and has an"+
 "experience of 5 years in these fields.",
 "hospitals":[
 {
 "_id":hospital5._id,
 "available_slots":[
 "10:00 am", "11:00 am",
 "2:00 pm"],
 "fee": 100
 },
 {
 "_id":hospital6._id,
 "available_slots":[
 "3:00 pm", "4:00 pm"],
 "fee": 150
 },
 {
  "_id":hospital7._id,
  "available_slots":[
   "6:00 pm", "7:00 pm", "8:00 pm"],
  "fee": 80
  }
 ]
};
var doctor7= await doctorData.addDoctors(doc7);
await hospitalData.addDoctorsToHospital(doctor7, hospital5._id);
await hospitalData.addDoctorsToHospital(doctor7, hospital6._id);
await hospitalData.addDoctorsToHospital(doctor7, hospital7._id);

let doc8= {
  "name": "Dr. Jonathan Dominguez",
  "gender":"Male",
 "specialization":"Primary Care Doctor",
 "education":"MBBS, MD",
 "medical_registration_verified":true,
 "experience":"5 years",
 "description":"Dr. Jonathan Dominguez is a Primary Care Doctor, in New Jersey and has an"+
 "experience of 5 years in these fields.",
 "hospitals":[
 {
 "_id":hospital3._id,
 "available_slots":[
 "3:00 pm", "4:00 pm"],
 "fee": 150
 }
 ]
};
var doctor8= await doctorData.addDoctors(doc8);
await hospitalData.addDoctorsToHospital(doctor8, hospital3._id);

let doc9= {
  "name": "Dr. Deval Gadhvi",
  "gender":"Female",
 "specialization":"Primary Care Doctor",
 "education":"MBBS, MD",
 "medical_registration_verified":true,
 "experience":"24 years",
 "description":"Dr. Deval Gadhvi is a Primary Care Doctor, in New Jersey and has an"+
 "experience of 24 years in these fields.",
 "hospitals":[
 {
 "_id":hospital9._id,
 "available_slots":[
 "10:00 am", "11:00 am",
 "2:00 pm"],
 "fee": 100
 },
 {
  "_id":hospital10._id,
  "available_slots":[
   "6:00 pm", "7:00 pm", "8:00 pm"],
  "fee": 80
  }
 ]
};
var doctor9= await doctorData.addDoctors(doc9);
await hospitalData.addDoctorsToHospital(doctor9, hospital9._id);
await hospitalData.addDoctorsToHospital(doctor9, hospital10._id);

let doc10= {
  "name": "Dr. Robert Mmereole",
  "gender":"Male",
 "specialization":"Primary Care Doctor",
 "education":"MBBS, MD",
 "medical_registration_verified":true,
 "experience":"22 years",
 "description":"Dr. Robert Mmereole is a Primary Care Doctor, in New Jersey and has an"+
 "experience of 22 years in these fields.",
 "hospitals":[
 {
 "_id":hospital9._id,
 "available_slots":[
 "10:00 am", "11:00 am",
 "2:00 pm"],
 "fee": 100
 },
 {
  "_id":hospital10._id,
  "available_slots":[
   "6:00 pm", "7:00 pm", "8:00 pm"],
  "fee": 80
  }
 ]
};
var doctor10= await doctorData.addDoctors(doc10);
await hospitalData.addDoctorsToHospital(doctor10, hospital9._id);
await hospitalData.addDoctorsToHospital(doctor10, hospital10._id);

    await db.serverConfig.close();
}
main();