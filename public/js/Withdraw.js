
const container = document.getElementById("heading")

const usertag = document.getElementById("usernametag")
const emailtag = document.getElementById("emailtag")
const monthtag = document.getElementById("monthtag")
const daytag = document.getElementById("daytag")
const yeartag = document.getElementById("yeartag")
const accountInfoButton = document.getElementById("accountInfo")
const paymentHistoryButton = document.getElementById("paymentHistory")
const Logout = document.getElementById('LogOut')
const WithdrawButt = document.getElementById('Withdraw')
const Bought = document.getElementById('Bought')


Bought.addEventListener('mouseover', () => {
    Bought.style.backgroundColor = '#aed6f3'
    Bought.style.transition = "background-Color .3s"
})

Bought.addEventListener('mouseout', () => {
    Bought.style.backgroundColor = '#e2f0fa'
})
WithdrawButt.addEventListener('mouseover', () => {
    WithdrawButt.style.backgroundColor = '#aed6f3'
    WithdrawButt.style.transition = "background-Color .3s"
})

WithdrawButt.addEventListener('mouseout', () => {
    WithdrawButt.style.backgroundColor = '#aed6f3'
})


Logout.addEventListener('mouseover', () => {
    Logout.style.backgroundColor = '#aed6f3'
    Logout.style.transition = "background-Color .3s"
})

Logout.addEventListener('mouseout', () => {
    Logout.style.backgroundColor = '#e2f0fa'
})

paymentHistoryButton.addEventListener('mouseover', () => {
    paymentHistoryButton.style.backgroundColor = '#aed6f3'
    paymentHistoryButton.style.transition = "background-Color .3s"
})

paymentHistoryButton.addEventListener('mouseout', () => {
    paymentHistoryButton.style.backgroundColor = '#e2f0fa'
})

accountInfoButton.addEventListener('mouseover', () => {
    accountInfoButton.style.backgroundColor = '#aed6f3'
    accountInfoButton.style.transition = "background-Color .3s"
})

accountInfoButton.addEventListener('mouseout', () => {
    accountInfoButton.style.backgroundColor = '#e2f0fa'
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

