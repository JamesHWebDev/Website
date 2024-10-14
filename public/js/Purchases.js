
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
    Bought.style.backgroundColor = '#aed6f3'
})


WithdrawButt.addEventListener('mouseover', () => {
    WithdrawButt.style.backgroundColor = '#aed6f3'
    WithdrawButt.style.transition = "background-Color .3s"
})

WithdrawButt.addEventListener('mouseout', () => {
    WithdrawButt.style.backgroundColor = '#e2f0fa'
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
const download = document.querySelectorAll('a.delete')
const VPdown = document.querySelectorAll('a.VPdown')
const MMdown = document.querySelectorAll('a.MMdown')
const DKdown = document.querySelectorAll('a.DKdown')


for(let i = 0; i < VPdown.length; i++){
    const item = document.getElementById('VPItem_' + i)

    if(item){
        item.addEventListener('click', () => {
            const go = `/VPUnlink/${item.dataset.file}`

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



for(let i = 0; i < MMdown.length; i++){
    const item = document.getElementById('MMItem_' + i)

    if(item){
        item.addEventListener('click', () => {
            const go = `/MMunlink/${item.dataset.file}`

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




for(let i = 0; i < download.length; i++){
    const item = document.getElementById('BTItem_' + i)

    if(item){
        item.addEventListener('click', () => {
            const go = `/Unlink/${item.dataset.file}`

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

for(let i = 0; i < DKdown.length; i++){
    const item = document.getElementById('DKItem_' + i)

    if(item){
        item.addEventListener('click', () => {
            const go = `/DKunlink/${item.dataset.file}`

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

