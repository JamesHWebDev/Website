
const container = document.getElementById("heading")

const usertag = document.getElementById("usernametag")
const emailtag = document.getElementById("emailtag")
const monthtag = document.getElementById("monthtag")
const daytag = document.getElementById("daytag")
const yeartag = document.getElementById("yeartag")
const BeatField = document.querySelectorAll('.audioContainer')
const accountInfoButton = document.getElementById("accountInfo")
const paymentHistoryButton = document.getElementById("paymentHistory")
const Logout = document.getElementById('LogOut')
const WithdrawButt = document.getElementById('Withdraw')
const Bought = document.getElementById('Bought')
const Orders = document.getElementById('Orders')
const SP = document.getElementById('SellerProfile')
const PB = document.querySelectorAll('.play-btn')




for(let i = 0; i < BeatField.length; i++){
    const item = document.getElementById('Beat_' + i)
   console.log('yoyoyoyoyoyo')

    if(item){
       
        item.addEventListener('mouseover', () => {
            console.log('yoyo')
            PB[i].style.display = 'block'
          
            

        })
        item.addEventListener('mouseout',() => {
            
                PB[i].style.display = 'none'

                
            
           
            


        })
    
    }
}












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

