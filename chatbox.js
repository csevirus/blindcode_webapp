var idx = 0;
var ques = ["What is your name?","What is your college name ?", "Your roll no. ?","Your contact no. ?","Your Email address ?","Which Language do you prefer ?", "Please start the contest."];

var invalidResponse = "Please enter a valid response";

var user = {
  name: "",
  college: "",
  rollno: "",
  contact: "",
  email: "",
  lang: "cpp"
};

// this should validate the msg ques specific
// ques number can be fetch from idx var
function isValidResponse(msg) {
  switch (idx) {
    case 0:
      if(msg != null && msg != "")
      return true;
      else
      return false;
    case 1:
      if(msg != null && msg != "")
      {
        user.name = msg;
        return true;
      }
      else {
        return false;
      }
    case 2:
      if(msg != null && msg != "")
      {
        user.college = msg;
        return true;
      }
      else {
        return false;
      }
    case 3:
      if( Number.isInteger(Number(msg)) )
      {
        user.rollno = msg;
        return true;
      }
      else {
        return false;
      }
    case 4:
      var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if(msg.match(phoneNum))
      {
        user.contact = msg;
        return true;
      }
      else {
        return false;
      }
    case 5:
      var atpos = msg.indexOf("@");
      var dotpos = msg.lastIndexOf(".");
      if (atpos<1 || dotpos<atpos+2 || dotpos+2>=msg.length)
      return false;
      else
      {
        user.email = msg;
        return true;
      }
    case 6:
      user.lang = msg;
      return true;
    default:
      return true;
  }
}

function add(msg) {

  document.getElementById("chatbox").innerHTML += "<div class='chat self'><div class='user-photo'></div><p class='chat-message'>" + msg + "</p></div>";
  document.getElementById("message").value = "";

  var next = "";
  if(idx > 6)
    next = "Sorry, but I am not programmed to talk further"
  else if (isValidResponse(msg)) {
    next = ques[idx];
    idx++;
  } else {
    next = invalidResponse;
  }

  document.getElementById("chatbox").innerHTML += "<div class='chat friend'><div class='user-photo'><img src='resources/bot.png'></div><p class='chat-message'>" + next + "</p></div>";
}
