const shop = document.querySelectorAll('button.delete')
const MB = document.getElementById('mailbox')
const Inbox = document.getElementById('Inbox')
const NotiNum = document.getElementById('NumNoti')
const ViewNoti = document.querySelector('a.ViewNoti')
const VP = document.querySelectorAll('vocalpreset')
const DAW = document.querySelectorAll('daw')

document.querySelector('.homepagefield').addEventListener('mouseover', () => {

    document.getElementById('homeIcon').src = '/Images/Home Icon Black.jpg'


})


document.querySelector('.homepagefield').addEventListener('mouseout', () => {

    document.getElementById('homeIcon').src = '/Images/Home Icon White.jpg'


})

document.getElementById('buynowbutton').addEventListener('click', (req, res) => {

fetch('/GotoMySC', {
    method: 'POST',
})
.then(response => response.json())
.then((data) => {
    if(data.message == 'Not Logged'){
        document.body.style.overflow = 'hidden'
        document.getElementById('NotLoggedInDiv').style.height = '400px'
        document.getElementById('NotLoggedInDiv').style.opacity = '1'
        document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
    }
    if(data.message == 'Purchased Items'){
        document.getElementById('BoughtVPPurchaseCon').style.height = '130px'
        document.getElementById('BoughtVPPurchaseCon').style.transition = 'height .3s'
        setTimeout(() => {
        window.location.reload()
            
        }, 5000);
    }
})
.catch((err) => {
    console.log(err)
})



})

document.getElementById('NoThanks').addEventListener('click', () => {


    document.getElementById('NotLoggedInDiv').style.height = '0px'
    document.getElementById('NotLoggedInDiv').style.opacity = '0'
    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
        document.body.style.overflow = 'auto'
    
    


})

for(let i = 0; i < shop.length; i++){
    const item = document.getElementById('CartItem_' + i)

    if(item){
        item.addEventListener('click', () => {
            const go = `/shoppingcart/${item.dataset.cart}`

            fetch(go, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => window.location.href = data.redirect)
            .catch((err) => console.log(err))

        })
    }
}

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



