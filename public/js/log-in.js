

const myForm = document.querySelector('.myForm')

function isChecked(event){
  var x = document.getElementById("NewPass");
  if (event.target.checked) {
    x.type = "text";
  } else {
    x.type = "password";
  }
}

document.getElementById('checkbox').addEventListener('change', isChecked)


console.log(myForm)

myForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);


  const jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
});


  
fetch('/account', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify(jsonData),
})
.then((response) => response.json())
.then((data) => {
  if(data.message == 'Username does not exist'){
    document.getElementById('WrongUser').style.display = 'block'
    document.getElementById('userp').style.display = 'none'
     document.getElementById('WrongPass').style.display = 'none'
     document.getElementById('passp').style.display = 'block'
  }
  if(data.message == "Incorrect Password"){
    document.getElementById('WrongPass').style.display = 'block'
    document.getElementById('passp').style.display = 'none'
    document.getElementById('userp').style.display = 'block'
    document.getElementById('WrongUser').style.display = 'none'
  }
  if(data.message == 'Correct Login'){
    document.getElementById('WrongUser').style.display = 'none'
    document.getElementById('userp').style.display = 'block'
     document.getElementById('WrongPass').style.display = 'none'
    document.getElementById('passp').style.display = 'block'
    window.location.href = '/'
  }
})
.catch((err) => console.log(err))


})









  