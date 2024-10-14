const x = document.getElementById('NewPass')


function checkIfChecked(event){
  if(event.target.checked){
      x.type = "text";
    } else {
      x.type = "password";
    }
}




document.getElementById('checkbox').addEventListener('change', checkIfChecked)








const myForm = document.querySelector('.myForm')

myForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);


  const jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
});

fetch('/', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
},
body: JSON.stringify(jsonData),
})
.then((response) => response.json())
.then((data) => {
  if(data.message == 'Invalid Month'){
    document.getElementById('IMonth').style.display = 'block'
    document.getElementById('NormDOB').style.display = 'none'
    document.getElementById('IDay').style.display = 'none'
    document.getElementById('IYear').style.display = 'none'
    document.getElementById('InvalidEmail').style.display = 'none'
    document.getElementById('emailp').style.display = 'block'
    document.getElementById('IUemail').style.display = 'none'
    document.getElementById('Iuser').style.display = 'none'
    document.getElementById('userp').style.display = 'block'
    document.getElementById('NormDOB').style.color = 'black'


  }
  if(data.message == 'Invalid Day'){
    document.getElementById('IMonth').style.display = 'none'
    document.getElementById('NormDOB').style.display = 'none'
    document.getElementById('IDay').style.display = 'block'
    document.getElementById('IYear').style.display = 'none'
    document.getElementById('InvalidEmail').style.display = 'none'
    document.getElementById('emailp').style.display = 'block'
    document.getElementById('IUemail').style.display = 'none'
    document.getElementById('Iuser').style.display = 'none'
    document.getElementById('userp').style.display = 'block'
    document.getElementById('NormDOB').style.color = 'black'


  }
  if(data.message == 'Invalid Year'){
    document.getElementById('IMonth').style.display = 'none'
    document.getElementById('NormDOB').style.display = 'none'
    document.getElementById('IDay').style.display = 'none'
    document.getElementById('IYear').style.display = 'block'
    document.getElementById('InvalidEmail').style.display = 'none'
    document.getElementById('emailp').style.display = 'block'
    document.getElementById('IUemail').style.display = 'none'
    document.getElementById('Iuser').style.display = 'none'
    document.getElementById('userp').style.display = 'block'
     document.getElementById('NormDOB').style.color = 'black'

  }
  if(data.message == 'Too Young'){
    document.getElementById('IMonth').style.display = 'none'
    document.getElementById('NormDOB').style.display = 'block'
    document.getElementById('NormDOB').style.color = 'red'
    document.getElementById('IDay').style.display = 'none'
    document.getElementById('IYear').style.display = 'none'
    document.getElementById('InvalidEmail').style.display = 'none'
    document.getElementById('emailp').style.display = 'block'
    document.getElementById('IUemail').style.display = 'none'
    document.getElementById('Iuser').style.display = 'none'
    document.getElementById('userp').style.display = 'block'
  }
  if(data.message == 'Invalid Email Address'){
    document.getElementById('IMonth').style.display = 'none'
    document.getElementById('NormDOB').style.display = 'block'
    document.getElementById('IDay').style.display = 'none'
    document.getElementById('IYear').style.display = 'none'
    document.getElementById('InvalidEmail').style.display = 'block'
    document.getElementById('emailp').style.display = 'none'
    document.getElementById('IUemail').style.display = 'none'
    document.getElementById('Iuser').style.display = 'none'
    document.getElementById('userp').style.display = 'block'
    document.getElementById('NormDOB').style.color = 'black'

  }
  if(data.message == 'Username Taken'){
    document.getElementById('IMonth').style.display = 'none'
    document.getElementById('NormDOB').style.display = 'block'
    document.getElementById('IDay').style.display = 'none'
    document.getElementById('IYear').style.display = 'none'
    document.getElementById('InvalidEmail').style.display = 'none'
    document.getElementById('emailp').style.display = 'block'
    document.getElementById('Iuser').style.display = 'block'
    document.getElementById('IUemail').style.display = 'none'
    document.getElementById('userp').style.display = 'none'
    document.getElementById('NormDOB').style.color = 'black'

  }
  if(data.message == 'Email Already In Use'){
    document.getElementById('IMonth').style.display = 'none'
    document.getElementById('NormDOB').style.display = 'block'
    document.getElementById('IDay').style.display = 'none'
    document.getElementById('IYear').style.display = 'none'
    document.getElementById('InvalidEmail').style.display = 'none'
    document.getElementById('emailp').style.display = 'none'
    document.getElementById('IUemail').style.display = 'block'
    document.getElementById('Iuser').style.display = 'none'
    document.getElementById('userp').style.display = 'block'
    document.getElementById('NormDOB').style.color = 'black'

  }
  if(data.message == 'Created Account'){
    document.getElementById('IMonth').style.display = 'none'
    document.getElementById('NormDOB').style.display = 'block'
    document.getElementById('IDay').style.display = 'none'
    document.getElementById('IYear').style.display = 'none'
    document.getElementById('InvalidEmail').style.display = 'none'
    document.getElementById('emailp').style.display = 'block'
    document.getElementById('IUemail').style.display = 'none'
    document.getElementById('Iuser').style.display = 'none'
    document.getElementById('userp').style.display = 'block'
    document.getElementById('NormDOB').style.color = 'black'
    window.location.href = '/'
  }
})
.catch((err) => console.log(err))





})










