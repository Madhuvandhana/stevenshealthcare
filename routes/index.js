const xss = require('xss');
const users = require('./users');
const reservationData = require('../data/reservation');
const hospitalData = require('../data/hospitals');
const path = require('path');
const usersData = require('../data/users');
const doctorData = require('../data/doctors');
//const doctorsList = require('./doctorsDetails');

const constructorMethod = (app) => {
	var loggingMiddleware = function (req, res, next) {
		let user = req.session.user;
		// res.status(200).json('user logged out')
	
		if(!user){
		  console.log(new Date().toUTCString(), req.method  ,req.originalUrl, "(Non-Authenticated User)" );
		}
		else{
			console.log(new Date().toUTCString(), req.method  ,req.originalUrl, "(Authenticated User)" )
		}
		next()
	  }
	var authenticationMiddleware = function (req, res, next) {
		let user = req.session.user;
		if(!user && (req.originalUrl.includes("/reservation") || req.originalUrl.includes("/doctors"))){
			res.status(403).json({error: 'The user is not logged in'});
		
		  }
		  else{
	
			next();
		  }
		
	  }
	  var logInMiddleware = function (req, res, next) {
		let user = req.session.user;
		if(!user){
			next();
		
		  }
		  else {
			res.status(200).redirect('/doctors');
		
		  }
		
	  }
	 app.use(loggingMiddleware)
	 app.get('/logout', async (req, res) => {
		// res.status(200).json('user logged out')
		res.clearCookie("AuthCookie");
		req.session.destroy();
		res.redirect('/')
	  })
	  app.get('/', async(req, res) => {
		try{
			let hospitalList = await hospitalData.getAllHospitals();
			let docsList = await doctorData.getAllDoctors();
			let docSearchList = await doctorData.getAllDoctors();
			let user = req.session.user;
			res.render('doctors',{docsList:docsList,user:user, hospitalList: hospitalList, docSearchList:docSearchList});
			}
			catch(e) {
				res.status(500).redirect('/');
			}
	});
	 app.use(authenticationMiddleware)
	 //new appointment with prefilled doctors, user details, dropdown for hopitals
	 app.get('/reservation/new/:id/:hospital', async(req, res) => {
		 let user = req.session.user;
 
		 if((!req.params.id || req.params.id===undefined) || (!req.params.hospital || req.params.hospital===undefined)){
			res.status(400).json({error: 'Data is missing or not provided.'});
			return;
		 }
		 try{
		 let HospitalList = await hospitalData.getHospitalByDoc(xss(req.params.id));
		 let docsList = await doctorData.getDoctor(xss(req.params.id));
		 let hospital ="";
		 try{
			hospital = await hospitalData.getHospitalById(xss(req.params.hospital));
		 }
		 catch(err){
			console.log(err);
		 }
		 //res.render('reservation_new', { doctorList: doctorList, spList: specialismList.List });
		 res.render('reservation_new',{user:user,HospitalList:HospitalList,docsList:docsList,title:"Book new Appointment", hospital:hospital});
		
	 } catch (e) {
		 res.status(400).render('reservation_new');
	   }
	 });
	 app.get('/reservation/new/:id', async(req, res) => {
		let user = req.session.user;

		if(!req.params.id || req.params.id===undefined){
		   res.status(400).json({error: 'Data is missing or not provided.'});
		   return;
		}
		try{
		let HospitalList = await hospitalData.getHospitalByDoc(xss(req.params.id));
		let docsList = await doctorData.getDoctor(xss(req.params.id));
		//res.render('reservation_new', { doctorList: doctorList, spList: specialismList.List });
		res.render('reservation_new',{user:user,HospitalList:HospitalList,docsList:docsList,title:"Book new Appointment"});
	   
	} catch (e) {
		res.status(400).render('reservation_new');
	  }
	});
 
 //new appointment information by user id
	 app.post('/reservation/new/:id', async (req, res) => {
		 let user = req.session.user;
		 let userid = user._id;
		 if(!req.params.id || !req.body.hospitals || !req.body.app_date){
			res.status(400).json({error: 'Data is missing or not provided.'});
			return;
		 }
		 if(req.params.id ===undefined || req.body.hospitals===undefined || req.body.app_date===undefined){
			res.status(400).json({error: 'Data is missing or not provided.'});
			return;
		 }
		 let docid = xss(req.params.id);
		 let hospid = xss(req.body.hospitals);
		 let resvDate = xss(req.body.app_date);
		 
		 try {
			 const reservation = await reservationData.makereservation(userid, docid, resvDate, hospid);
			 const doctor = await doctorData.getDoctor(docid);
			 const hospital = await hospitalData.getHospitalById(hospid);
			 res.render('reservation',{user:user,appointment:reservation, doctor:doctor, hospital:hospital, title:"New Appointment Created."});
		 } catch (e) {
		   res.status(400).render('reservation_new');
		 }
	   });
 
		//edited apoointment render(by appointment id)
		app.post('/reservation/edit/:id', async (req, res) => {
 
		 let user = req.session.user;
 
		 let userid = user._id;
		 let appointmentId = xss(req.params.id);
		 //new date
		 let resvDate = xss(req.body.app_date);
		 try {
			 const reservation = await reservationData.editReservation(appointmentId, resvDate);
			 const doctor = await doctorData.getDoctor(reservation.doctor_id);
			 const hospital = await hospitalData.getHospitalById(reservation.hospital_id);
			 res.render('reservation',{user:user,appointment:reservation, doctor:doctor, hospital:hospital, title:"Your appointment date has been changed."});
		 } catch (e) {
		   res.status(400).redirect('/reservation');
		 }
	   });
 
	   
	   // render apoointment details after adding notes, id is appointment id
	   app.patch('/reservation/notes/:id', async(req, res) => {
 
		 let user = req.session.user;
		 if(!req.params.id || req.params.id===undefined || !req.body.notes || req.body.notes===undefined){
			res.status(400).json({error: 'Data is missing or not provided.'});
			return;
		 }
		 let appointmentId = xss(req.params.id);
		 let notes = xss(req.body.notes);
		 try{
		 const updateNotes = await reservationData.updateNotesById(appointmentId,notes);
		 res.send(updateNotes);
		 }catch (e) {
			 res.status(400).redirect('/reservation');
		   }
	 });
 
	  // /reservation/edit/{{appointment._id}}
	   app.get('/reservation/edit/:id', async(req, res) => {
		 let user = req.session.user;
		 if(!req.params.id || req.params.id===undefined)
		 {
			res.status(400).json({error: 'Data is missing or not provided.'});
			return;
		 }
		 try{
		 const oldAppointment =  await reservationData.getAppointmentById(xss(req.params.id));
		 let docsList = await doctorData.getDoctor(oldAppointment.doctor_id);
		 let HospitalList = await hospitalData.getHospitalByDoc(docsList._id);
		 res.render('reservation_new',{user:user,HospitalList:HospitalList,docsList:docsList,oldAppointment:oldAppointment,title:"Change Appointment Details"});
		 }catch (e) {
		 res.status(400).redirect('/reservation');
	   }
	 });
 
	   //get single reservation based on clicked reservation on list of appointments
	   app.get("/reservation/get/:id",async (req, res) => {
		 let user = req.session.user;
		 if(!req.params.id || req.params.id===undefined){
			res.status(400).json({error: 'Data is missing or not provided.'});
			return;
		 }
		 try {
			 const reservation = await reservationData.getAppointmentById(xss(req.params.id));
			 const doctor = await doctorData.getDoctor(reservation.doctor_id);
			 const hospital = await hospitalData.getHospitalById(reservation.hospital_id);//by doc id
			 res.render('reservation',{user:user,appointment:reservation, doctor:doctor, hospital:hospital,title:"Appointments Details."});
		 } catch (e) {
		   res.status(400).redirect('/reservation');
		 }
	 });
 
	  // delete appointment
	  app.get('/reservation/delete/:id', async (req , res) =>{
		 let user = req.session.user;
		 if(!req.params.id || req.params.id===undefined){
			 res.status(400).json({error: 'Data is missing or not provided.'});
			return;
		 }
		 try{
		 const deletedAppoint = await reservationData.deleteAppointment(xss(req.params.id));
		 res.redirect('/reservation');
		 }
		 catch(e) {
			 res.status(500).redirect('/reservation');
		 }
	   });
 
	 
		// show all appointments page
		 app.get("/reservation",async (req, res) => {
			 let user = req.session.user;
			 
			 try{
			 const reservationList = await reservationData.getReservationList(user._id);
 
			 res.render('all_reservations', { user: req.session.user, reservationList: reservationList ,title:"All Booked Reservations."});
		 }catch(e) {
				 res.status(500).redirect('/reservation');
			 }
		 });
 
	 //doctors details
	 app.get('/doctors', async (req, res) => {
		 let user = req.session.user;
		 try{
		 let hospitalList = await hospitalData.getAllHospitals();
		 let docsList = await doctorData.getAllDoctors();
		 let docSearchList = await doctorData.getAllDoctors();
		 res.render('doctors',{docsList:docsList,user:user, hospitalList: hospitalList, docSearchList:docSearchList});
		 }
		 catch(e) {
			 res.status(500).redirect('/');
		 }
	 });
 
	 app.get('/search', async (req, res) => {
		 let user = req.session.user;
		 let hospitalList = await hospitalData.getAllHospitals();
		 let docSearchList = await doctorData.getAllDoctors();
		 let docsList;
		 let hospital;
		 let hospitalID;
		 if (!req.query.id) {
			res.status(400).json({error: 'You must provide id'});
			return;
		  }
		  if (!req.query.hospital) {
			res.status(400).json({error: 'You must provide search value'});
			return;
		  }
		 const searchValue = xss(req.query.hospital);
		 //console.log(req.query.hospital)
		 try{
		  hospital = await hospitalData.getHospitalById(xss(req.query.id));
		  hospitalID = hospital._id;
		 }
		 catch(err){
				 //console.log(err);
		 }
		 if(hospital){
		  docsList = await doctorData.getDoctorsByHospital(hospital);
		 }
		 else{
			 docsList = await doctorData.getDoctors(xss(req.query.id));
		 }
		 res.render('doctors',{docsList:docsList,user:user, hospitalList: hospitalList, docSearchList:docSearchList, searchValue:searchValue, hospital:hospitalID});
 
	 });
	app.use(logInMiddleware)
	app.use('/users', users);

	app.use("*", (req, res) => {
		res.status(404).json({ error: "Not found" });
	  });
	//app.use('/reservation_new', reservationData);
};

module.exports = constructorMethod;
