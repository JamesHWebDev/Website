const Form = document.getElementById('EmailForm')
document.querySelector('.homepagefield').addEventListener('mouseover', () => {

    document.getElementById('homeIcon').src = '/Images/Home Icon Black.jpg'


})


document.querySelector('.homepagefield').addEventListener('mouseout', () => {

    document.getElementById('homeIcon').src = '/Images/Home Icon White.jpg'


})
document.querySelector('.shopcartfield').addEventListener('mouseover', () => {

    document.getElementById('cartIcon').src = '/Images/ShopCart White.jpg'


})


document.querySelector('.shopcartfield').addEventListener('mouseout', () => {

    document.getElementById('cartIcon').src = '/Images/ShopCart Blue.jpg'


})

Form.addEventListener('submit', function(event) {

    event.preventDefault()
    const formData = new FormData(this);


  const jsonData = {};
  formData.forEach((value, key) => {
      jsonData[key] = value;
});

    fetch('/SendMail', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then(response => response.json())
    .then((data) => {
        if(data.message = 'Email Sent'){
            document.getElementById('SusLg').style.display = 'block'

            document.getElementById('SusLg').style.animation = 'slidein .6s ease'

            setTimeout(function() {
                window.location.href = '/account/sdukfgsefopiwsyudopeduqweslkjfjhseuifphoisea'
            }, 1100)
        }
    })
    .catch((err) => {
        console.log(err)
    })


})








const MB = document.getElementById('mailbox')
const Inbox = document.getElementById('Inbox')
const NotiNum = document.getElementById('NumNoti')
const ViewNoti = document.querySelector('a.ViewNoti')

Inbox.addEventListener('mouseover', () => {//HOVERING OVER MAILBOX
    MB.style.display = 'block'
    NotiNum.style.display = 'none'
})

MB.addEventListener('mouseover', () => {
     MB.style.display = 'block'
     
})

MB.addEventListener('mouseout', () => {
    MB.style.display = 'none'
})

Inbox.addEventListener('mouseout', () => {//NOT HOVERING OVER MAILBOX
MB.style.display = 'none'
NotiNum.style.display = 'none'
})


ViewNoti.addEventListener('click', (e) => {

const endpoint = `/Noti/${ViewNoti.dataset.doc}`

fetch(endpoint, {
    method: 'DELETE'
})
.then((response) => response.json())
.then((data) => window.location.href = data.redirect)
.catch((err) => console.log(err))
})

