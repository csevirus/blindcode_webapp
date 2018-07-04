var idx = 0;
var ques = ["What is your name?", "What is your college name ?", "Your roll no. ?", "Your contact no. ?", "Your Email address ?", "Which Language do you prefer ?", "Please start the contest."];

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
      if (msg != null && msg != "")
        return true;
      else
        return false;
    case 1:
      if (msg != null && msg != "") {
        user.name = msg;
        return true;
      } else {
        return false;
      }
    case 2:
      if (msg != null && msg != "") {
        user.college = msg;
        return true;
      } else {
        return false;
      }
    case 3:
      if (Number.isInteger(Number(msg))) {
        user.rollno = msg;
        return true;
      } else {
        return false;
      }
    case 4:
      var phoneNum = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
      if (msg.match(phoneNum)) {
        user.contact = msg;
        return true;
      } else {
        return false;
      }
    case 5:
      var atpos = msg.indexOf("@");
      var dotpos = msg.lastIndexOf(".");
      if (atpos < 1 || dotpos < atpos + 2 || dotpos + 2 >= msg.length)
        return false;
      else {
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

function myTrim(x) {
  return x.replace(/\r?\n|\r/g, '');
}

function add(msg) {
  msg.trim();
  myTrim(msg);
  msg.trim();
  document.getElementById("chatbox").innerHTML += "<div class='chat self'><div class='user-photo'></div><p class='chat-message'>" + msg + "</p></div>";
  document.getElementById("message").value = "";
  var next = "";
  if (idx > 6)
    next = "Sorry, but I am not programmed to talk further"
  else if (isValidResponse(msg)) {
    next = ques[idx];
    idx++;
  } else {
    next = invalidResponse;
  }
  document.getElementById("chatbox").innerHTML += "<div class='chat friend'><div class='user-photo'><img src='resources/bot.png'></div><p class='chat-message'>" + next + "</p></div>";
  document.getElementById("chatbox").scrollTop += 200;
}

function keypress(event) {
  console.log(event.keyCode);
  if (event.keyCode == "13") {
    var msg = document.getElementById('message').value;
    add(msg);
  }
  return true;
}

// returns char for corresponding keycode
function getChar(event) {

  // event.which returns the key or mouse button clicked
  if(event.keyCode == 13)
  return "\n"
  if (event.which == null) {

    // Return the char if not a special character
    return String.fromCharCode(event.keyCode); // IE
  } else if (event.which!=0 && event.charCode!=0) {
    return String.fromCharCode(event.which);   // Other Browsers
  } else {
    return null; // Special Key Clicked
  }
}

var countdown = {
  minutes: 5,
  seconds: 0,
  x: 0,
  charcount: 0,
  codestr: "",
  myClock: function() {
    if(countdown.seconds == 0)
    {
      countdown.minutes = countdown.minutes - 1;
      countdown.seconds = 59;
    }
    else {
      countdown.seconds = countdown.seconds - 1;
    }
    document.getElementById("timer").innerHTML ="<b>TimeLeft </b>- 0" + countdown.minutes + ":" + countdown.seconds ;
    if (countdown.minutes < 0) {
      document.getElementById("timer").innerHTML = "<b>TimeLeft </b>- EXPIRED";
      countdown.stop();
    }
  },
  clock: function() {
    x = setInterval(countdown.myClock,1000);
  },
  stop: function() {
    clearInterval(x);
    countdown.submit();
  },
  charpress: function(event) {
    // pervent Backspace
    if(event.keyCode == 8)
    {
      event.preventDefault();
      alert("Backspace is not allowed here");
      return ;
    }
    countdown.charcount += 1;
    var str = ""
    for (var i = 0; i < countdown.charcount; i++) {
      str +="*";
    }
    document.getElementById("code").value = str;
    document.getElementById("charcount").innerHTML =" <b>CharacterCount :</b>" + countdown.charcount;
    var char = getChar(event);
    if(char != null)
    countdown.codestr += char;
  },
  retry: function() {
    countdown.codestr = "";
    countdown.charcount = 0;
    document.getElementById("charcount").innerHTML =" <b>CharacterCount :</b> " + countdown.charcount;
    document.getElementById("code").value = "";
  },
  submit: function() {
    // display code written so far and the result
    document.getElementById('result').value = countdown.codestr;
    document.getElementById("modal").style.display = "block";
  }
}

function noPaste() {
  countdown.retry();
  alert("You cannot paste here ... it's cheating");
}
