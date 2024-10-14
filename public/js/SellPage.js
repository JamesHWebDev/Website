const BeatField = document.querySelectorAll('.audioContainer')
const PB = document.querySelectorAll('.play-btn')
const pause = document.querySelector('.pause-btn')
const BotPlay = document.querySelector('.playr')
const MainAud = document.getElementById('MainAud')

if(!MainAud.playing){
    PB[0].innerHTML = '&#9654'
} else{
    PB[0].textContent = '| |'
}

const BoBeat = document.getElementById('Bobeat')

BoBeat.addEventListener('submit', function(event) {

    event.preventDefault();

    const formData = new FormData(this);    
    console.log('Working')

    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

   

    fetch('/BoughtBeat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
})
.then((response) => response.json())
.then((data) => {
    if(data.message == 'Not Logged In'){
        document.body.style.overflow = 'hidden'
        document.getElementById('NotLoggedInDiv').style.height = '430px'
                    document.getElementById('NotLoggedInDiv').style.opacity = '1'
                    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
    }
    if(data.message == 'Purchased Beat'){
        document.getElementById('PurchBeat').style.height = '200px'
        document.getElementById('PurchBeat').style.transition = 'height .3s'
        document.getElementById('PurchBeat').style.borderBottom = 'solid 2px black'

        setTimeout(function() {
            window.location.href = '/beats'
        }, 10000)
    }
})
.catch((err) => console.log(err))





})

const buy = document.getElementById('delete')

buy.addEventListener('click', function(event){

    const endpoint = `/beats/${buy.dataset.beat}`
    console.log(endpoint)
    fetch(endpoint, {
        method: 'DELETE'
    })
    .then((response) => response.json())
    .then((data) => {
        console.log('hihiih')
    })
    .catch((err) => console.log(err))


})




var Playing = false

const favbtn = document.querySelectorAll('.fav-btn')

for(let i = 0; i < BeatField.length; i++){
    const item = document.getElementById('Beat_' + i)
    const favi = document.getElementById('Fav_' + i)

    if(item){
       
        item.addEventListener('mouseover', () => {
            
            
            favi.style.display = 'block'
            

        })
        item.addEventListener('mouseout',() => {
            if(Playing == false){
                
                favi.style.display = 'none'

            }
            else{
                if(PB[i].textContent == '| |'){
                PB[i].style.display = 'block'
                     favi.style.display = 'block'
                      
                }
                else{
             
                 favi.style.display = 'none'

                }
            }
           
            


        })
    
    }
}


for(let i = 0; i < BeatField.length; i++){
    const item = document.getElementById('Play_' + i)

    if(item){
        item.addEventListener('click', () => {
            
            const go = `/PlayAudio/${item.dataset.doc}`
            console.log(go)
           fetch(go, {
            method: 'GET'
           })
           .then((response => response.json()))
           .then((data) => {
            Playing = true
                
            document.getElementById('BotDivPrice').textContent = `$` + (data.price).toFixed(2)
            document.getElementById('BottomDivBeatName').textContent = data.beatname
           
            document.getElementById('userPic').textContent = data.user
            document.getElementById('miniID').href = `/Beats/${data.ID}`
            if(data.src == 'NoImg.jpg'){
            document.getElementById('miniPic').src = `/Images/${data.src}`

            }
            else{
            document.getElementById('miniPic').src = `/BeatsUploaded/${data.src}`
            }
            const src = MainAud.src
            const url = data.message
            var s = data.message;
            s = s.substring(0, s.indexOf('?'));
            console.log("S: " + s)
            var n = src;
            n = n.substring(0, n.indexOf('?'));
            console.log("S: " + s)
            const newsrc = src.replace('http://localhost:3000', '')
            console.log("Src: " + src)
            console.log("Data.Message: " + data.message)
                if(item.textContent == '| |'){
                    item.innerHTML = '&#9654'
                MainAud.pause()
                    
                }
              
                else if(s !== n){
                    for(let i = 0; i < BeatField.length;i++){
                        PB[i].innerHTML = '&#9654'
                    }
                    item.textContent = '| |'
                    
                        MainAud.src = url;
                    

                    MainAud.play()

                BotPlay.style.borderTop = 'solid 1px black'
                BotPlay.style.height = '100px'
                BotPlay.style.transition = 'height .3s'
                }
                else{
                    item.textContent = '| |'
                
                    MainAud.play()
                }
                
                
           })
           .catch((err) => {
            console.log(err)
           })
        })
    }
}


for(let i = 0; i < BeatField.length; i++){
    const item = document.getElementById('Fav_' + i)

    if(item){
        item.addEventListener('click', () => {

            if(item.textContent == '♡'){
            item.textContent =  '♥'

                const id = item.dataset.id
                const user = item.dataset.user
        
                const jsonData = ({

                    id: id,
                    user: user,

                })
                console.log(jsonData)

            fetch('/newFav', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
              },
              body: JSON.stringify(jsonData),
              })
              .then((response) => response.json())
              .then((data) => {
                if(data.message == 'Not Logged In'){
                    document.body.style.overflow = 'hidden'
                    document.getElementById('NotLoggedInDiv').style.height = '430px'
                    document.getElementById('NotLoggedInDiv').style.opacity = '1'
                    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
                    item.textContent = '♡'
                }
                if(data.message == 'Favorited Beat'){
                   
                    document.getElementById('DelFav').style.display = 'none'

                    document.getElementById('favp').style.display = 'block'
                    document.getElementById('sucfavbeat').style.borderBottom = 'solid 1px black'
                    document.getElementById('sucfavbeat').style.height = '100px'
                    document.getElementById('sucfavbeat').style.transition = 'height .2s'
                    item.dataset.fv = data.FVid
                    console.log(data.FVid)
                    console.log(item.dataset.fv)
                    console.log('its this one')
                    setTimeout(function() {
                        document.getElementById('sucfavbeat').style.height = '0px'
                         document.getElementById('sucfavbeat').style.transition = 'height .2s'
                        document.getElementById('sucfavbeat').style.borderBottom = 'none'
                   
                    }, 3000)
                }
               
            })
            } else{
                item.textContent = '♡'
                console.log('its this two')
                
                const go = `/DelFav/${item.dataset.fv}`
                console.log(go)
                fetch(go, {
                    method: 'DELETE',
                })
                .then((response) => (response.json()))
                .then((data) => {
                    if(data.message == 'Deleted Fav'){
                        document.getElementById('favp').style.display = 'none'
        

                    document.getElementById('sucfavbeat').style.borderBottom = 'solid 1px black'
                    document.getElementById('sucfavbeat').style.height = '100px'
                    document.getElementById('DelFav').style.display = 'block'
                    document.getElementById('sucfavbeat').style.transition = 'height .2s'
                    setTimeout(function() {
                        document.getElementById('sucfavbeat').style.height = '0px'
                   

                         document.getElementById('sucfavbeat').style.transition = 'height .2s'
                        document.getElementById('sucfavbeat').style.borderBottom = 'none'
                   
                    }, 3000)
                    }
                })
                .catch((err) => {
                    console.log(err)
                })
            }
        })
    }
}



document.addEventListener('DOMContentLoaded', () => {
    const players = Array.from(document.querySelectorAll('audio')).map(player => new Plyr(player, {
        controls: [ 'progress', 'current-time', 'mute', 'volume'],
        autoplay: false,
        loop: { active: true },
    }));
});











const MB = document.getElementById('mailbox')
const Inbox = document.getElementById('Inbox')
const NotiNum = document.getElementById('NumNoti')
const ViewNoti = document.querySelector('a.ViewNoti')



document.getElementById('NoThanks').addEventListener('click', () => {


    document.getElementById('NotLoggedInDiv').style.height = '0px'
    document.getElementById('NotLoggedInDiv').style.opacity = '0'
    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
        document.body.style.overflow = 'auto'
    
    


})



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












