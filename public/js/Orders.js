const del = document.querySelectorAll('.download')
const deleteBeat = document.querySelectorAll('.Delete')
const accountInfoButton = document.getElementById("accountInfo")
const paymentHistoryButton = document.getElementById("paymentHistory")
const Logout = document.getElementById('LogOut')
const WithdrawButt = document.getElementById('Withdraw')
const Bought = document.getElementById('Bought')
const Orders = document.getElementById('Orders')
const Ignore = document.querySelectorAll('.Ignore')


console.log(del.length)
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
for(let i = 0; i < del.length; i++){
    const item = document.getElementById('download_' + i)
    
    if(item){
        item.addEventListener('click', () => {

            const go = `/MMOR/${item.dataset.file}`
            console.log(go)
            fetch(go, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.message == 'File Deleted'){
                    location.reload()
                }
            })
            .catch((err) => console.log(err))

        })
    }
}



for(let i = 0; i < deleteBeat.length; i++){
    const item = document.getElementById('del_' + i)
    
    if(item){
        item.addEventListener('click', () => {

            const go = `/DeleteBeat/${item.dataset.file}`
            console.log(go)
            fetch(go, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.message == 'File Deleted'){
                    location.reload()
                }
            })
            .catch((err) => console.log(err))

        })
    }
}





for(let i = 0; i < Ignore.length; i++){
    const item = document.getElementById('Ign_' + i)
    
    if(item){
        item.addEventListener('click', () => {

            const go = `/DeleteReport/${item.dataset.file}`
            console.log(go)
            fetch(go, {
                method: 'DELETE'
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.message == 'File Deleted'){
                    location.reload()
                }
            })
            .catch((err) => console.log(err))

        })
    }
}
WithdrawButt.addEventListener('mouseover', () => {
    WithdrawButt.style.backgroundColor = '#aed6f3'
    WithdrawButt.style.transition = "background-Color .3s"
})

WithdrawButt.addEventListener('mouseout', () => {
    WithdrawButt.style.backgroundColor = '#e2f0fa'
})

Bought.addEventListener('mouseover', () => {
    Bought.style.backgroundColor = '#aed6f3'
    Bought.style.transition = "background-Color .3s"
})

Bought.addEventListener('mouseout', () => {
    Bought.style.backgroundColor = '#e2f0fa'
})
Orders.addEventListener('mouseover', () => {
    Orders.style.backgroundColor = '#aed6f3'
    Orders.style.transition = "background-Color .3s"
})

Orders.addEventListener('mouseout', () => {
    Orders.style.backgroundColor = '#aed6f3'
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

