// Firebase config
var firebaseConfig = {
  apiKey: "AIzaSyCZ9pRFN8WtEDBvpz1Aaqrod_yv-uuUN_4",
  authDomain: "make-a-meal-bbbe9.firebaseapp.com",
  projectId: "make-a-meal-bbbe9",
  storageBucket: "make-a-meal-bbbe9.appspot.com",
  messagingSenderId: "611587806367",
  appId: "1:611587806367:web:d62b17b04f60ce6fc6feaa",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Register function

function register() {
 // Get input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  username = document.getElementById('username').value
  
  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false){
    alert('Email or Password is invalid')
    return
  }
  if (validate_field(username) == false){
    alert('Enter a valid username')
    return
  }

  // Move on with Auth
  auth.createUserWithEmailAndPassword(email,password)
  .then(function(){
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User Data
    var user_data = {
      email: email,
      username : username,
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).set(user_data)

    
    alert('Account Creation Succesful!')

  })
  .catch(function(error){
    // Firebase will use this to alert of errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })

}

// Set up our login function
function login() {
  // Get input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false){
    alert('Email or Password is invalid')
    return
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User Data
    var user_data = {
      last_login : Date.now()
    }

    database_ref.child('users/' + user.uid).update(user_data)

    alert('Login Successful!')

    var introName = `Welcome ${document.getElementById('email').value}!`
    sessionStorage.setItem("introName", introName)
    
    window.location.href = "index.html";
    
  })
  .catch(function(error){
    // Firebase will use this to alert of errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

function signUpPage(){
  window.location.href = "signup.html";
}
function logInPage(){
  window.location.href = "Login.html";
}

// Validate Functions
function validate_email(email){
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // email is valid
    return true
  } else {
    // email isn't valid
    return false
  }
}

function validate_password(password) {
  // Password must be greater than 6 characters
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
