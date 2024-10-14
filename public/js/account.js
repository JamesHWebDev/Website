



document.getElementById('VerifyButton').addEventListener('click', function(event){

document.getElementById('VerifyEmailCon').style.display = 'block'


    const randomNumber = Math.floor(100000 + Math.random() * 900000);
    
    console.log(randomNumber);
    
    const ender = `/VerifyMyEmail/${randomNumber}`

    fetch(ender, {
        method: 'GET',
    })
    .then(response => response.json())
    .then(data => {

    })
    .catch((err) => {
        console.log(err)
    })



})


const accountInfoButton = document.getElementById("accountInfo")

const ButtonNums = document.querySelectorAll('.ButtonNum')
const NumEntered = document.querySelectorAll('.NumbersE')


for(let i = 0; i < ButtonNums.length; i++){
    console.log('hi')
    ButtonNums[i].addEventListener('click', () => {
        console.log('Hello ' + i)

        for(let x = 0; x < NumEntered.length;x++){
            if(NumEntered[x].textContent == ""){
                if(i !== 9){
                NumEntered[x].textContent = i + 1
                }
                else{
                    NumEntered[x].textContent = 0
                }
                if(NumEntered[5].textContent !== ""){

                    const textContents = Array.from(NumEntered).map(p => p.textContent);

                    const combinedText = textContents.join('');
                    console.log(combinedText)

                    const Light = `/CheckMyCode/${combinedText}`


                    fetch(Light, {
                        method: 'GET',
                    })
                    .then(response => response.json())
                    .then((data) => {
                        if(data.message == 'Right Code'){
                            document.getElementById('RightCode').style.height = "60px"
                            document.getElementById('RightCode').style.transition = "height .3s"
                            document.getElementById('VeryText').textContent = 'Verified Email Address!'
                            document.getElementById('RightCode').style.border = 'solid 1px black'
                            setTimeout(function(){
                                location.reload()
                            }, 2000 )
                        }
                        if(data.message == 'Wrong Code'){
                            document.getElementById('WrongCode').style.height = "60px"
                            document.getElementById('WrongCode').style.transition = "height .3s"
                            document.getElementById('WrongText').textContent = 'Incorrect Code'
                            document.getElementById('WrongCode').style.border = 'solid 1px black'
                            setTimeout(function(){
                                location.reload()
                            }, 2000 )
                        }
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                    
                }
                break;
               
            }
        }


    })
}

const form = document.getElementById('myForm');

form.addEventListener('submit', function(event) {
    const formData = new FormData(this);
    const subBea = document.getElementById('subform')
     const retri = `/changePfp/${subBea.dataset.doc}`
    
        fetch(retri, {
            method: 'PUT',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if(data.message == 'Update successful'){
                window.location.href = '/account'
            }
        })
        .catch(error => {
            console.error('Error uploading file:', error);
        });
})


    
















function YesLogOut(){

const yesornodiv = document.getElementById('AreYouSure').style.display = 'none'
const YLogO = document.getElementById('logoutbut').style.display = 'block'


}



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

