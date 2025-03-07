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


window.addEventListener('scroll', () => {
    const ScrollHeight = window.scrollY;
    const OutOne = 450
    const triggerScroll = 500

    console.log(ScrollHeight)
    if(ScrollHeight > OutOne){
        document.getElementById('BestBeat').style.opacity = '1'
       
    }
    if(ScrollHeight > triggerScroll){
        document.getElementById('OneClick').style.opacity = '1'
        document.getElementById('OneClick').classList.add('animation')
       

    }
    if(ScrollHeight > 1200){
        document.getElementById('OneClick').style.opacity = '0'
       
        document.getElementById('OneClick').classList.remove('position')
    }
    


    console.log(ScrollHeight)
})


window.onload = function() {
    document.getElementById('BestBeat').style.opacity = '1'
   document.getElementById('BestBeat').classList.add('animation')


};






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

