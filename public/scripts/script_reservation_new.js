
function DateRestrict() {
    let today = new Date();
    let day = today.getDate();
    let month = today.getMonth() + 1;
    let year = today.getFullYear();
    if (day < 10) {
        day = '0' + day
    }
    if (month < 10) {
        month = '0' + month
    }

    today = year + '-' + month + '-' + day;
    document.getElementById("resvDate").setAttribute("min", today);
} 

function RefreshRestrict(){
    if (window.history.replaceState) {
        window.history.replaceState( null, null, window.location.href);
      }
}
function cancelReserv(reservation){
    let confirmation = confirm('Are you sure you want to delete this appointment?');
    if(confirmation) {
      location.href = '/reservation/delete/'+reservation;
    }
  }

  function cancelReserv(reservation){
    let confirmation = confirm('Are you sure you want to delete this appointment?'+reservation);
    if(confirmation) {
      location.href = '/reservation/delete/'+reservation;
    }
  }

  function addNotes(){
    let hidden = false;
    //addNotesSubmit enable
      const text = document.getElementById("textAreaNote");
      text.value="";
      const button = document.getElementById('addNotesSubmit');
      //ydocument.getElementById("addNoteButton").disabled = true;

      if(button.style.display === "none"){
        button.style.display = "block";
      }


      if (text.style.display === "none") {
        text.style.display = "block";
        button.style.display = "block";
      } else {
        text.style.display = "none";
        button.style.display = "none";
      }
        
        //location.href = '/reservation/notes/'+reservation;
}

function updateNotes(appointment) {
    
    let notelabel = document.getElementById("notesID");
    let textfield = document.getElementById("textAreaNote");
    let notes = textfield.value;
    textfield.style.display = "none";
    notelabel.style.display = "block";
    
    if($("#textAreaNote").val().trim().length < 1)
        {
            alert("Please enter notes for the Appointments.");
            document.getElementById('addNotesSubmit').style.display='none';
            return; 
        }
    $.ajax({
      url: `/reservation/notes/${appointment}`,
      type: 'PATCH',
      data:{notes:notes},
      //appointment data in response
      success: function (res) { 
        //alert(res);
        
        let ptag = document.getElementById('addedNotes');
        ptag.style.display = "block";
        document.getElementById("addedNotes").innerHTML = res.notes;
        document.getElementById("h1").innerHTML = "Your notes has been added.";
        //invisible update note button
        document.getElementById('addNotesSubmit').style.display='none';
         
        //alert(out);
      },
      error: function (err) {
        document.getElementById("h1").innerHTML = "Notes could not be added. Please try again.";
      }
    });
  }

  /* function updateAppointment(appointment) {
    document.getElementById("addNotesSubmit").disabled = true;
    
    let notelabel = document.getElementById("notesID");
    let textfield = document.getElementById("textAreaNote");
    let notes = textfield.value;
    textfield.style.display = "none";
    notelabel.style.display = "block";
    
    if($("#textAreaNote").val().trim().length < 1)
        {
            alert("Please enter notes for the Appointments.");
            document.getElementById('addNoteButton').disabled = false;
            document.getElementById('addNotesSubmit').disabled = true;
            return; 
        }
    $.ajax({
      url: `/reservation/notes/${appointment}`,
      type: 'PATCH',
      data:{notes:notes},
      //appointment data in response
      success: function (res) { 
        alert(res);
        
        let ptag = document.getElementById('addedNotes');
        ptag.style.display = "block";
        document.getElementById("addedNotes").innerHTML = res.notes;
        document.getElementById("h1").innerHTML = "Your notes has been added.";
        
         
        //alert(out);
      },
      error: function (err) {
        document.getElementById("h1").innerHTML = "Notes could not be added. Please try again.";
      }
    });
  } */

  function showElement(elem) {
    if ($(elem)) $(elem).fadeIn();
    document.getElementById("h1").innerHTML = "Edit your Appointment.";
    
  }
  function hideElement(elem) {
    if ($(elem)) $(elem).hide();
  }