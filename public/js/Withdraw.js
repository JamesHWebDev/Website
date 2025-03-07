
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

document.getElementById('CreateAcc').addEventListener('click', function(){
 
       

    const referer = window.location.href

    
        fetch('/create-connected-account', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           
            body: JSON.stringify({referer: referer})
        })  .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(json => Promise.reject(json));
            }
        })
        .then(({ message }) => {
            console.log(message)
            window.location.reload();
      
       
    }).catch(error => {
        console.log(error)
    })

})

document.getElementById('button').addEventListener('click', function(){


    

    const referer = window.location.href

    
        fetch('/create-account-link', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
           
            body: JSON.stringify({referer: referer})
        })  .then(res => {
            if (res.ok) {
                return res.json();
            } else {
                return res.json().then(json => Promise.reject(json));
            }
        })
        .then(({ url }) => {
            
        console.log(url)
        window.location.href = url
        
        //window.location.href = url
    }).catch(error => {
        console.log(error)
    })





})


document.getElementById('Dashboard').addEventListener('click', () => {


    const referer = window.location.href

    
    fetch('/create-account-link', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
       
        body: JSON.stringify({referer: referer})
    })  .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then(json => Promise.reject(json));
        }
    })
    .then(({ url }) => {
        
    console.log(url)
    window.location.href = url

    //window.location.href = url
}).catch(error => {
    console.log(error)
})


})


document.getElementById('WithDrawButton').addEventListener('click', () => {


    const referer = window.location.href

    
    fetch('/transfer-funds', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
       
        body: JSON.stringify({referer: referer})
    })  .then(res => {
        if (res.ok) {
            return res.json();
        } else {
            return res.json().then(json => Promise.reject(json));
        }
    })
    .then(({ transfer }) => {
        
    console.log(transfer)


    //window.location.href = url
}).catch(error => {
    console.log(error)
})


})





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

