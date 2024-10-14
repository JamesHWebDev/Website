





const seemorebutton = document.getElementById("zeroOneMinSeeMore");
const seemorebutton1 = document.getElementById("OneToTwoMinSeeMore");
const zeroToOne = document.querySelectorAll(".hide")
const OneToTwo = document.querySelectorAll(".hide1")
const Filter = document.getElementById("FilterDiv")
const closeButton = document.getElementById('closeButton')
const zeroToOneMin = document.querySelectorAll(".zeroToOneMin")
const nothingToSeeHere = document.getElementById("nothingToSeeHere")
const oneto2min = document.querySelectorAll(".onetotwo")
const nothingToSeeHere2 = document.getElementById("nothingToSeeHere2")
const twoto3min = document.querySelectorAll(".twotothree")
const nothingToSeeHere3 = document.getElementById("nothingToSeeHere3")
const numSelect = document.getElementById("NumSelectedTags")
const Form = document.getElementsByClassName('SellinForm')[0]
const dissa = document.getElementById('dissapear')
const BeatName = document.getElementById('beatnameques')
const priceBeat = document.getElementById('priceBeatInput')
const fileUpload = document.getElementById('audioUpload')
const ZO = document.getElementById('ZOfield')
const BeatField = document.querySelectorAll('.audioContainer')
const PB = document.querySelectorAll('.play-btn')
const pause = document.querySelector('.pause-btn')
const BotPlay = document.querySelector('.playr')
const MainAud = document.getElementById('MainAud')

const PumpupBeat = document.querySelectorAll('.PumpedUp')
const PumpupTag = document.querySelectorAll('.PumpedUpTag')
const PumpupButton = document.getElementById('PumpedUp')

const SadBeat = document.querySelectorAll('.Sad')
const SadTag = document.querySelectorAll('.SadTag')
const SadButton = document.getElementById('Sad')

const ChillBeat = document.querySelectorAll('.Chill')
const ChillButton = document.getElementById('Chill')
const ChillTag = document.querySelectorAll('.ChillTag')

const LofiBeat = document.querySelectorAll('.LoFi')
const LofiButton = document.getElementById('LoFi')
const LofiTag = document.querySelectorAll('.LoFiTag')

const DubStepBeat = document.querySelectorAll('.DubStep')
const DubStepButton = document.getElementById('DubStep')
const DubStepTag = document.querySelectorAll('.DubStepTag')

const HipHopBeat = document.querySelectorAll('.HipHop')
const HipHopButton = document.getElementById('HipHop')
const HipHopTag = document.querySelectorAll('.HipHopTag')

const RandBBeat = document.querySelectorAll('.RandB')
const RandBButton = document.getElementById('RandB')
const RandBTag = document.querySelectorAll('.RandBTag')

const IndieBeat = document.querySelectorAll('.Indie')
const IndieButton = document.getElementById('Indie')
const IndieTag = document.querySelectorAll('.IndieTag')

const SlowBeat = document.querySelectorAll('.Slow')
const SlowButton = document.getElementById('Slow')
const SlowTag = document.querySelectorAll('.SlowTag')

const FastBeat = document.querySelectorAll('.Fast')
const FastButton = document.getElementById('Fast')
const FastTag = document.querySelectorAll('.FastTag')

const PianoBeat = document.querySelectorAll('.Piano')
const PianoButton = document.getElementById('Piano')
const PianoTag = document.querySelectorAll('.PianoTag')

const GuitarBeat = document.querySelectorAll('.Guitar')
const GuitarButton = document.getElementById('Guitar')
const GuitarTag = document.querySelectorAll('.GuitarTag')

const ElectricGuitarBeat = document.querySelectorAll('.ElectricGuitar')
const ElectricGuitarButton = document.getElementById('ElectricGuitar')
const ElectricGuitarTag = document.querySelectorAll('.ElectricGuitarTag')

const DrillBeat = document.querySelectorAll('.Drill')
const DrillButton = document.getElementById('Drill')
const DrillTag = document.querySelectorAll('.DrillTag')

const NOTAGS = document.querySelectorAll('.NOTAGS')









document.addEventListener('DOMContentLoaded', () => {
    const players = Array.from(document.querySelectorAll('audio')).map(player => new Plyr(player, {
        controls: [ 'progress', 'current-time', 'mute', 'volume'],
        autoplay: false,
        loop: { active: true },
        
    }));
});









var Playing = false

const favbtn = document.querySelectorAll('.fav-btn')

for(let i = 0; i < BeatField.length; i++){
    const item = document.getElementById('Beat_' + i)
    const favi = document.getElementById('Fav_' + i)

    if(item){
       
        item.addEventListener('mouseover', () => {
            
            PB[i].style.display = 'block'
            favi.style.display = 'block'
            

        })
        item.addEventListener('mouseout',() => {
            if(Playing == false){
                PB[i].style.display = 'none'
                favi.style.display = 'none'

            }
            else{
                if(PB[i].textContent == '| |'){
                PB[i].style.display = 'block'
                     favi.style.display = 'block'
                      
                }
                else{
                PB[i].style.display = 'none'
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

const beatname = document.querySelectorAll('.beatname')
const bl = document.querySelectorAll('.AddList')



const BasBut = document.getElementById('BasButton')
const ProBut = document.getElementById('ProButton')

function OrderPro(){

const ord = BasBut.dataset.bas

console.log(ord)

const go = `/OrderProPack/${ord}`

fetch(go, {
    method: 'PUT',
})
.then((response) => response.json())
.then((data) => {
    console.log(data)
    if(data.message == 'Ordered Package'){
        console.log('worked')
        document.getElementById('SOP').style.overflow = 'hidden'
        document.getElementById('SOPtxt').textContent = 'Successfully Purchased The Pro Package'
        document.getElementById('SOP').style.height = '100px'
        document.getElementById('SOP').style.transition = 'height .3s'
        setTimeout(function() {
            document.getElementById('SOP').style.overflow = 'hidden'
            document.getElementById('SOP').style.height = '0px'
        document.getElementById('SOP').style.transition = 'height .3s'
        }, 3000)
    }
    if(data.message == 'Already Owned'){
        document.getElementById('ALO').style.overflow = 'hidden'
        document.getElementById('ALOtxt').style.textContent = 'You Already Own The Pro Package'
        document.getElementById('ALO').style.height = '100px'
        document.getElementById('ALO').style.transition = 'height .3s'
        setTimeout(function() {
            document.getElementById('ALO').style.overflow = 'hidden'
            document.getElementById('ALO').style.height = '0px'
        document.getElementById('ALO').style.transition = 'height .3s'
        }, 3000)
    }
})
.catch((err) => {
    console.log(err)
})


}

function OrderBasic(){

const ord = ProBut.dataset.pro

console.log(ord)

const go = `/OrderBasicPack/${ord}`

fetch(go, {
    method: 'PUT',
})
.then((response) => response.json())
.then((data) => {
    if(data.message == 'Ordered Package'){
        console.log('worked')
        document.getElementById('SOPtxt').textContent = 'Successfully Purchased The Basic Package'
        document.getElementById('SOP').style.overflow = 'hidden'

        document.getElementById('SOP').style.height = '100px'
        document.getElementById('SOP').style.transition = 'height .3s'
        setTimeout(function() {
        document.getElementById('SOP').style.overflow = 'hidden'

            document.getElementById('SOP').style.height = '0px'
        document.getElementById('SOP').style.transition = 'height .3s'
        }, 3000)
    }
    if(data.message == 'Already Owned'){
        document.getElementById('ALO').style.overflow = 'hidden'
        document.getElementById('ALOtxt').style.textContent = 'You Already Own The Pro Package'
        document.getElementById('ALO').style.height = '100px'
        document.getElementById('ALO').style.transition = 'height .3s'
        setTimeout(function() {
            document.getElementById('ALO').style.overflow = 'hidden'
            document.getElementById('ALO').style.height = '0px'
        document.getElementById('ALO').style.transition = 'height .3s'
        }, 3000)
    }
})
.catch((err) => {
    console.log(err)
})

}


for(let i = 0; i < BeatField.length; i++){
    const item = document.getElementById('Fav_' + i)

    if(item){
        item.addEventListener('click', () => {

            if(item.textContent == '♡'){
           

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
                    document.getElementById('NotLoggedInDiv').style.height = '400px'
                    document.getElementById('NotLoggedInDiv').style.opacity = '1'
                    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
                 item.textContent =  '♡'
                    
                }
                
                if(data.message == 'Favorited Beat'){
                     item.textContent =  '♥'
                   
          

                    document.getElementById('favp').textContent = 'Favorited Beat!'
                    document.getElementById('sucfavbeat').style.height = '40px'
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
                         document.getElementById('favp').textContent = 'Removed out of Favorites'
                       

                  
                    document.getElementById('sucfavbeat').style.height = '40px'
                 
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



document.getElementById('NoThanks').addEventListener('click', () => {


    document.getElementById('NotLoggedInDiv').style.height = '0px'
    document.getElementById('NotLoggedInDiv').style.opacity = '0'
    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
        document.body.style.overflow = 'auto'
    
    


})

let pumptrue = false
let sadtrue = false
let chilltrue = false
let lofitrue = false
let dubsteptrue = false
let hiphoptrue = false
let RandBtrue = false
let indietrue = false
let slowtrue = false
let fasttrue = false
let pianotrue = false
let guitartrue = false
let egtrue = false
let drilltrue = false


const divHolder = document.getElementById('divBeatHolder')
const allDivs = document.querySelectorAll('.zerooneminbeats')
const curr = document.getElementById('curr')

window.onload = function(){
    curr.style.textDecoration = 'underline'
    curr.style.fontSize = '1.5rem'
    curr.style.color = 'blue'

}

    

function zeroToOneShow(){
    console.log(2 + 2)
    for(let i = 0; i < zeroToOne.length;i++){
        if(zeroToOne[i].style.display == 'block'){
            zeroToOne[i].style.display = 'none'
            seemorebutton.textContent = "V"
        }
        else{
            zeroToOne[i].style.display = 'block'
            seemorebutton.textContent = "Λ"
        }

    }
}


function oneToTwoShow(){
    for(let i = 0; i < OneToTwo.length;i++){
        if(OneToTwo[i].style.display == 'block'){
            OneToTwo[i].style.display = 'none'
            seemorebutton1.textContent = "V"
        }
        else{
            OneToTwo[i].style.display = 'block'
            seemorebutton1.textContent = "Λ"
        }

    }
}


document.getElementById('filterButton').addEventListener('click', () => {


    Filter.style.display = "block"
    

})




document.getElementById('closeButton').addEventListener('click', () => {


    Filter.style.display = 'none'
})



let a = 0









document.getElementById('PumpedUp').addEventListener('click', () => {







    if(pumptrue == false){
    PumpupButton.style.backgroundColor = "white"
    PumpupButton.style.border = ""
    PumpupButton.style.fontWeight = "bold"
    {a++;}globalThis
    numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(pumptrue == true){
    PumpupButton.style.backgroundColor = "aliceblue"
    PumpupButton.style.border = ""
    PumpupButton.style.fontWeight = "normal"
    {a--;}globalThis
    numSelect.textContent = "Selected Tags (" + a + ")"
       
}


})











document.getElementById('Sad').addEventListener('click', () => {





    if(sadtrue == false ){
        SadButton.style.backgroundColor = "white"
        SadButton.style.border = ""
        SadButton.style.fontWeight = "bold"
        {a++;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(sadtrue == true ){
        SadButton.style.backgroundColor = "aliceblue"
        SadButton.style.border = ""
        SadButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
   
    }
        
    
    
})








document.getElementById('Chill').addEventListener('click', () => {




    
    if(chilltrue == false){
        ChillButton.style.backgroundColor = "white"
        ChillButton.style.border = ""
        ChillButton.style.fontWeight = "bold"
        {a++;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(chilltrue == true){
        ChillButton.style.backgroundColor = "aliceblue"
        ChillButton.style.border = ""
        ChillButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
    
    }
       
}) 







document.getElementById('LoFi').addEventListener('click', () => {




    
    if(lofitrue == false){
        LofiButton.style.backgroundColor = "white"
        LofiButton.style.border = ""
        LofiButton.style.fontWeight = "bold"
        {a++;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(lofitrue == true ){
        LofiButton.style.backgroundColor = "aliceblue"
        LofiButton.style.border = ""
        LofiButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"

    }
        
       
})







document.getElementById('HipHop').addEventListener('click', () => {




    
    if(hiphoptrue == false){
        HipHopButton.style.backgroundColor = "white"
        HipHopButton.style.border = ""
        HipHopButton.style.fontWeight = "bold"
        {a++;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(hiphoptrue == true){
        HipHopButton.style.backgroundColor = "aliceblue"
        HipHopButton.style.border = ""
        HipHopButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
   
    }
        
       
})




document.getElementById('DubStep').addEventListener('click', () => {



    
    if(dubsteptrue == false){
        DubStepButton.style.backgroundColor = "white"
        DubStepButton.style.border = ""
        DubStepButton.style.fontWeight = "bold"
        {a++;}globalThis
    numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(dubsteptrue == true){
        DubStepButton.style.backgroundColor = "aliceblue"
        DubStepButton.style.border = ""
        DubStepButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
  
    }
        
       
})








document.getElementById('RandB').addEventListener('click', () => {




    
    if(RandBtrue == false ){
        RandBButton.style.backgroundColor = "white"
        RandBButton.style.border = ""
        RandBButton.style.fontWeight = "bold"
        {a++;}globalThis
    numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(RandBtrue == true){
        RandBButton.style.backgroundColor = "aliceblue"
        RandBButton.style.border = ""
        RandBButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
  
    }
        
       
})








document.getElementById('Indie').addEventListener('click', () => {




    
    if(indietrue == false ){
        IndieButton.style.backgroundColor = "white"
        IndieButton.style.border = ""
        IndieButton.style.fontWeight = "bold"
        {a++;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(indietrue == true ){
        IndieButton.style.backgroundColor = "aliceblue"
        IndieButton.style.border = ""
        IndieButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
  
    }
        
})






document.getElementById('Slow').addEventListener('click', () => {




    
    if(slowtrue == false ){
        SlowButton.style.backgroundColor = "white"
        SlowButton.style.border = ""
        SlowButton.style.fontWeight = "bold"
        {a++;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(slowtrue == true ){
        SlowButton.style.backgroundColor = "aliceblue"
        SlowButton.style.border = ""
        SlowButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
     
    }
        
        
})













document.getElementById('Fast').addEventListener('click', () => {



    
    if(fasttrue == false){
        FastButton.style.backgroundColor = "white"
        FastButton.style.border = ""
        FastButton.style.fontWeight = "bold"
        {a++;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(fasttrue == true ){
        FastButton.style.backgroundColor = "aliceblue"
        FastButton.style.border = ""
        FastButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
   
    }
        
       
})








document.getElementById('Piano').addEventListener('click', () => {




    if(pianotrue == false ){
        PianoButton.style.backgroundColor = "white"
        PianoButton.style.border = ""
        PianoButton.style.fontWeight = "bold"
        {a++;}globalThis
    numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(pianotrue == true ){
        PianoButton.style.backgroundColor = "aliceblue"
        PianoButton.style.border = ""
        PianoButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
  
    }
        
})







document.getElementById('Guitar').addEventListener('click', () => {



 
    
    if(guitartrue == false ){
        GuitarButton.style.backgroundColor = "white"
        GuitarButton.style.border = ""
        GuitarButton.style.fontWeight = "bold"
        {a++;}globalThis
    numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(guitartrue == true ){
        GuitarButton.style.backgroundColor = "aliceblue"
        GuitarButton.style.border = ""
        GuitarButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
  
    }
        
        
})




document.getElementById('ElectricGuitar').addEventListener('click', () => {




    
    if(egtrue == false ){
        ElectricGuitarButton.style.backgroundColor = "white"
        ElectricGuitarButton.style.border = ""
        ElectricGuitarButton.style.fontWeight = "bold"
        {a++;}globalThis
    numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(egtrue == true ){
        ElectricGuitarButton.style.backgroundColor = "aliceblue"
        ElectricGuitarButton.style.border = ""
        ElectricGuitarButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
  
    }
        
})






document.getElementById('Drill').addEventListener('click', () => {




    
    if(drilltrue == false ){
        DrillButton.style.backgroundColor = "white"
        DrillButton.style.border = ""
        DrillButton.style.fontWeight = "bold"
        {a++;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
    }
    else if(drilltrue == true ){
        DrillButton.style.backgroundColor = "aliceblue"
        DrillButton.style.border = ""
        DrillButton.style.fontWeight = "normal"
        {a--;}globalThis
        numSelect.textContent = "Selected Tags (" + a + ")"
   
    }
        
       
})

document.getElementById('PumpedUp').addEventListener('click', () => {
    if(pumptrue == false){
        {pumptrue = true}globalThis
    }
    else{
        {pumptrue = false}globalThis
    }
})

document.getElementById('Sad').addEventListener('click', () => {


    if(sadtrue == false){
        {sadtrue = true}globalThis
    }
    else{
        {sadtrue = false}globalThis
    }
})

document.getElementById('Chill').addEventListener('click', () => {

    if(chilltrue == false){
        {chilltrue = true}globalThis
    }
    else{
        {chilltrue = false}globalThis
    }
})

document.getElementById('LoFi').addEventListener('click', () => {


    if(lofitrue == false){
        {lofitrue = true}globalThis
    }
    else{
        {lofitrue = false}globalThis
    }
})

document.getElementById('DubStep').addEventListener('click', () => {

    if(dubsteptrue == false){
        {dubsteptrue = true}globalThis
    }
    else{
        {dubsteptrue = false}globalThis
    }
})

document.getElementById('HipHop').addEventListener('click', () => {

    if(hiphoptrue == false){
        {hiphoptrue = true}globalThis
    }
    else{
        {hiphoptrue = false}globalThis
    }
})

document.getElementById('RandB').addEventListener('click', () => {

    if(RandBtrue == false){
        {RandBtrue = true}globalThis
    }
    else{
        {RandBtrue = false}globalThis
    }
})

document.getElementById('Indie').addEventListener('click', () => {

    if(indietrue == false){
        {indietrue = true}globalThis
    }
    else{
        {indietrue = false}globalThis
    }
})

document.getElementById('Slow').addEventListener('click', () => {

    if(slowtrue == false){
        {slowtrue = true}globalThis
    }
    else{
        {slowtrue = false}globalThis
    }
})

document.getElementById('Fast').addEventListener('click', () => {

    if(fasttrue == false){
        {fasttrue = true}globalThis
    }
    else{
        {fasttrue = false}globalThis
    }
})

document.getElementById('Piano').addEventListener('click', () => {

    if(pianotrue == false){
        {pianotrue = true}globalThis
    }
    else{
        {pianotrue = false}globalThis
    }
})

document.getElementById('Guitar').addEventListener('click', () => {

    if(guitartrue == false){
        {guitartrue = true}globalThis
    }
    else{
        {guitartrue = false}globalThis
    }
})

document.getElementById('ElectricGuitar').addEventListener('click', () => {

    if(egtrue == false){
        {egtrue = true}globalThis
    }
    else{
        {egtrue = false}globalThis
    }
})
document.getElementById('Drill').addEventListener('click', () => {

    if(drilltrue == false){
        {drilltrue = true}globalThis
    }
    else{
        {drilltrue = false}globalThis
    }
})








document.getElementById('TagsSearchButton').addEventListener('click', () => {



    Filter.style.display = 'none'

    for(let i = 0; i < NOTAGS.length;i++){
        NOTAGS[i].style.display = 'none'
    }



    if(pumptrue == false){
        
        for(let i = 0;i < PumpupBeat.length;i++){
            PumpupBeat[i].style.display = 'none'
        }
        for(let i = 0;i < PumpupTag.length;i++){
            PumpupTag[i].style.fontWeight = "normal"
            PumpupTag[i].style.border = ""
        }
    }


    if(sadtrue == false){
        for(let i = 0;i < SadBeat.length;i++){
            SadBeat[i].style.display = 'none'
        }
        for(let i = 0;i < SadTag.length;i++){
            SadTag[i].style.fontWeight = "normal"
            SadTag[i].style.border = ""
        }
    }



    if(chilltrue == false){
        for(let i = 0;i < ChillBeat.length;i++){
            ChillBeat[i].style.display = 'none'
        }
        for(let i = 0;i < ChillTag.length;i++){
            ChillTag[i].style.fontWeight = "normal"
            ChillTag[i].style.border = ""
        }
    }



    if(lofitrue == false){
        for(let i = 0;i < LofiBeat.length;i++){
            LofiBeat[i].style.display = 'none'
        }
        for(let i = 0;i < LofiTag.length;i++){
            LofiTag[i].style.fontWeight = "normal"
            LofiTag[i].style.border = ""
        }
    }


    if(dubsteptrue == false){
        for(let i = 0;i < DubStepBeat.length;i++){
            DubStepBeat[i].style.display = 'none'
        }
        for(let i = 0;i < DubStepTag.length;i++){
            DubStepTag[i].style.fontWeight = "normal"
            DubStepTag[i].style.border = ""
        }
    }



    if(hiphoptrue == false){
        for(let i = 0;i < HipHopBeat.length;i++){
            HipHopBeat[i].style.display = 'none'
        }
        for(let i = 0;i < HipHopTag.length;i++){
            HipHopTag[i].style.fontWeight = "normal"
            HipHopTag[i].style.border = ""
        }
    }



    if(RandBtrue == false){
        for(let i = 0;i < RandBBeat.length;i++){
            RandBBeat[i].style.display = 'none'
        }
        for(let i = 0;i < RandBTag.length;i++){
            RandBTag[i].style.fontWeight = "normal"
            RandBTag[i].style.border = ""
        }
    }



    if(indietrue == false){
        for(let i = 0;i < IndieBeat.length;i++){
            IndieBeat[i].style.display = 'none'
        }
        for(let i = 0;i < IndieTag.length;i++){
            IndieTag[i].style.fontWeight = "normal"
            IndieTag[i].style.border = ""
        }
    }



    if(slowtrue == false){
        for(let i = 0;i < SlowBeat.length;i++){
            SlowBeat[i].style.display = 'none'
        }
        for(let i = 0;i < SlowTag.length;i++){
            SlowTag[i].style.fontWeight = "normal"
            SlowTag[i].style.border = ""
        }
    }



    if(fasttrue == false){
        for(let i = 0;i < FastBeat.length;i++){
            FastBeat[i].style.display = 'none'
        }
        for(let i = 0;i < FastTag.length;i++){
            FastTag[i].style.fontWeight = "normal"
            FastTag[i].style.border = ""
        }
    }



    if(pianotrue == false){
        for(let i = 0;i < PianoBeat.length;i++){
            PianoBeat[i].style.display = 'none'
        }
        for(let i = 0;i < PianoTag.length;i++){
            PianoTag[i].style.fontWeight = "normal"
            PianoTag[i].style.border = ""
        }
    }




    if(guitartrue == false){
        for(let i = 0;i < GuitarBeat.length;i++){
            GuitarBeat[i].style.display = 'none'
        }
        for(let i = 0;i < GuitarTag.length;i++){
            GuitarTag[i].style.fontWeight = "normal"
            GuitarTag[i].style.border = ""
        }
    }



    
    if(egtrue == false){
        for(let i = 0;i < ElectricGuitarBeat.length;i++){
            ElectricGuitarBeat[i].style.display = 'none'
        }
        for(let i = 0;i < ElectricGuitarTag.length;i++){
            ElectricGuitarTag[i].style.fontWeight = "normal"
            ElectricGuitarTag[i].style.border = ""
        }
    }



    if(drilltrue == false){
        for(let i = 0;i < DrillBeat.length;i++){
            DrillBeat[i].style.display = 'none'
        }
        for(let i = 0;i < DrillTag.length;i++){
            DrillTag[i].style.fontWeight = "normal"
            DrillTag[i].style.border = ""
        }
    }








   if(pumptrue == true){
    for(let i = 0;i < PumpupBeat.length;i++){
        PumpupBeat[i].style.display = 'block'

    }
    for(let i = 0;i < PumpupTag.length;i++){
        PumpupTag[i].style.fontWeight = "bold"
        PumpupTag[i].style.border = ""
    }
   }
   



   if(sadtrue == true){
    for(let i = 0;i < SadBeat.length;i++){
        SadBeat[i].style.display = 'block'
    }
    for(let i = 0;i < SadTag.length;i++){
        SadTag[i].style.fontWeight = "bold"
        SadTag[i].style.border = ""
    }
    }   
   



    if(chilltrue == true){
        for(let i = 0;i < ChillBeat.length;i++){
            ChillBeat[i].style.display = 'block'
        }
        for(let i = 0;i < ChillTag.length;i++){
            ChillTag[i].style.fontWeight = "bold"
            ChillTag[i].style.border = ""
        }
    }
    



    if(lofitrue == true){
        for(let i = 0;i < LofiBeat.length;i++){
            LofiBeat[i].style.display = 'block'
        }
        for(let i = 0;i < LofiTag.length;i++){
            LofiTag[i].style.fontWeight = "bold"
            LofiTag[i].style.border = ""
        }
    }
    



    if(dubsteptrue == true){
        for(let i = 0;i < DubStepBeat.length;i++){
            DubStepBeat[i].style.display = 'block'
        }
        for(let i = 0;i < DubStepTag.length;i++){
            DubStepTag[i].style.fontWeight = "bold"
            DubStepTag[i].style.border = ""
        }
    }
   



    if(hiphoptrue == true){
        for(let i = 0;i < HipHopBeat.length;i++){
            HipHopBeat[i].style.display = 'block'
        }
        for(let i = 0;i < HipHopTag.length;i++){
            HipHopTag[i].style.fontWeight = "bold"
            HipHopTag[i].style.border = ""
        }
    }
    




    if(RandBtrue == true){
        for(let i = 0;i < RandBBeat.length;i++){
            RandBBeat[i].style.display = 'block'
        }
        for(let i = 0;i < RandBTag.length;i++){
            RandBTag[i].style.fontWeight = "bold"
            RandBTag[i].style.border = ""
        }
    }
   



    if(indietrue == true){
        for(let i = 0;i < IndieBeat.length;i++){
            IndieBeat[i].style.display = 'block'
        }
        for(let i = 0;i < IndieTag.length;i++){
            IndieTag[i].style.fontWeight = "bold"
            IndieTag[i].style.border = ""
        }
    }
   


    if(slowtrue == true){
        for(let i = 0;i < SlowBeat.length;i++){
            SlowBeat[i].style.display = 'block'
        }
        for(let i = 0;i < SlowTag.length;i++){
            SlowTag[i].style.fontWeight = "bold"
            SlowTag[i].style.border = ""
        }
    }
    


    if(fasttrue == true){
        for(let i = 0;i < FastBeat.length;i++){
            FastBeat[i].style.display = 'block'
        }
        for(let i = 0;i < FastTag.length;i++){
            FastTag[i].style.fontWeight = "bold"
            FastTag[i].style.border = ""
        }
    }
    


    if(pianotrue == true){
        for(let i = 0;i < PianoBeat.length;i++){
            PianoBeat[i].style.display = 'block'
        }
        for(let i = 0;i < PianoTag.length;i++){
            PianoTag[i].style.fontWeight = "bold"
            PianoTag[i].style.border = ""
        }
    }
    



    if(guitartrue == true){
        for(let i = 0;i < GuitarBeat.length;i++){
            GuitarBeat[i].style.display = 'block'
        }
        for(let i = 0;i < GuitarTag.length;i++){
            GuitarTag[i].style.fontWeight = "bold"
            GuitarTag[i].style.border = ""
        }
    }
   



    if(egtrue == true){
        for(let i = 0;i < ElectricGuitarBeat.length;i++){
            ElectricGuitarBeat[i].style.display = 'block'
        }
        for(let i = 0;i < ElectricGuitarTag.length;i++){
            ElectricGuitarTag[i].style.fontWeight = "bold"
            ElectricGuitarTag[i].style.border = ""
        }
    }
   



    if(drilltrue == true){
        for(let i = 0;i < DrillBeat.length;i++){
            DrillBeat[i].style.display = 'block'
        }
        for(let i = 0;i < DrillTag.length;i++){
            DrillTag[i].style.fontWeight = "bold"
            DrillTag[i].style.border = ""
        }
    }
    
    let not = 0



    for(let i = 0; i < zeroToOneMin.length;i++){
        if(zeroToOneMin[i].style.display == 'none'){
            not++
            console.log(not)
            if(not == zeroToOneMin.length){
                nothingToSeeHere.style.display = 'block'
            }
            else{
                nothingToSeeHere.style.display = 'none'
            }
        }
    }





    
if(a == 0){
    nothingToSeeHere.style.display = 'none'

    for(let i = 0; i < NOTAGS.length;i++){
        NOTAGS[i].style.display = 'block'
    }

    for(let i = 0;i < PumpupBeat.length;i++){
        PumpupBeat[i].style.display = 'block'
    }
    for(let i = 0;i < PumpupTag.length;i++){
        PumpupTag[i].style.fontWeight = "normal"
        PumpupTag[i].style.border = ""
    }
    
    for(let i = 0;i < SadBeat.length;i++){
        SadBeat[i].style.display = 'block'
    }
    for(let i = 0;i < SadBeat.length;i++){
        SadTag[i].style.fontWeight = "normal"
        SadTag[i].style.border = ""
    }

    for(let i = 0;i < ChillBeat.length;i++){
        ChillBeat[i].style.display = 'block'
    }
    for(let i = 0;i < ChillBeat.length;i++){
        ChillTag[i].style.fontWeight = "normal"
        ChillTag[i].style.border = ""
    }


    for(let i = 0;i < LofiBeat.length;i++){
        LofiBeat[i].style.display = 'block'
    }
    for(let i = 0;i < LofiBeat.length;i++){
        LofiTag[i].style.fontWeight = "normal"
        LofiTag[i].style.border = ""
    }


    for(let i = 0;i < DubStepBeat.length;i++){
        DubStepBeat[i].style.display = 'block'
    }
    for(let i = 0;i < DubStepBeat.length;i++){
        DubStepTag[i].style.fontWeight = "normal"
        DubStepTag[i].style.border = ""
    }


    for(let i = 0;i < HipHopBeat.length;i++){
        HipHopBeat[i].style.display = 'block'
    }
    for(let i = 0;i < HipHopBeat.length;i++){
        HipHopTag[i].style.fontWeight = "normal"
        HipHopTag[i].style.border = ""
    }


    for(let i = 0;i < RandBBeat.length;i++){
        RandBBeat[i].style.display = 'block'
    }
    for(let i = 0;i < RandBBeat.length;i++){
        RandBTag[i].style.fontWeight = "normal"
        RandBTag[i].style.border = ""
    }


    for(let i = 0;i < IndieBeat.length;i++){
        IndieBeat[i].style.display = 'block'
    }
    for(let i = 0;i < IndieBeat.length;i++){
        IndieTag[i].style.fontWeight = "normal"
        IndieTag[i].style.border = ""
    }


    for(let i = 0;i < SlowBeat.length;i++){
        SlowBeat[i].style.display = 'block'
    }
    for(let i = 0;i < SlowBeat.length;i++){
        SlowTag[i].style.fontWeight = "normal"
        SlowTag[i].style.border = ""
    }


    for(let i = 0;i < FastBeat.length;i++){
        FastBeat[i].style.display = 'block'
    }
    for(let i = 0;i < FastBeat.length;i++){
        FastTag[i].style.fontWeight = "normal"
        FastTag[i].style.border = ""
    }


    for(let i = 0;i < PianoBeat.length;i++){
        PianoBeat[i].style.display = 'block'
    }
    for(let i = 0;i < PianoBeat.length;i++){
        PianoTag[i].style.fontWeight = "normal"
        PianoTag[i].style.border = ""
    }


    for(let i = 0;i < GuitarBeat.length;i++){
        GuitarBeat[i].style.display = 'block'
    }
    for(let i = 0;i < GuitarBeat.length;i++){
        GuitarTag[i].style.fontWeight = "normal"
        GuitarTag[i].style.border = ""
    }



    for(let i = 0;i < ElectricGuitarBeat.length;i++){
        ElectricGuitarBeat[i].style.display = 'block'
    }
    for(let i = 0;i < ElectricGuitarBeat.length;i++){
        ElectricGuitarTag[i].style.fontWeight = "normal"
        ElectricGuitarTag[i].style.border = ""
    }


    for(let i = 0;i < DrillBeat.length;i++){
        DrillBeat[i].style.display = 'block'
    }
    for(let i = 0;i < DrillBeat.length;i++){
        DrillTag[i].style.fontWeight = "normal"
        DrillTag[i].style.border = ""
    }
    
}
    
        
   
})







function closeSell(){
    Form.style.display = 'none'
    dissa.style.display = 'block'
}

const BNlab = document.getElementById('BNlab')

function UploadBeat(){
    
const BN = BeatName.value

if(BN.length > 20){
   BNlab.style.display = 'block'
   BNlab.style.color = 'red'
   BNlab.style.fontWeight = 'bold'
   
}
else{
    BNlab.style.display = 'none'
   BNlab.style.color = 'black'
   BNlab.style.fontWeight = 'normal'
}


}






const tag1 = document.getElementById('tag1')
const tag2 = document.getElementById('tag2')
const tag3 = document.getElementById('tag3')
const TagAlrChose = document.getElementById('tagAlrChose')
const seltnum = 0

function PumpedUpADD(){



    if(tag1.value == ''){
        tag1.value = 'PumpedUp'
        {seltnum++}globalThis;
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'PumpedUp'
         TagAlrChose.style.display = 'none'
         {seltnum++}globalThis;
        if(tag1.value == 'PumpedUp'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'PumpedUp'
         TagAlrChose.style.display = 'none'
         {seltnum++}globalThis;
        if(tag2.value == 'PumpedUp'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}



function SadADD(){

    if(tag1.value == ''){
        tag1.value = 'Sad'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'Sad'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'Sad'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'Sad'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'Sad'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}


function ChillADD(){

    if(tag1.value == ''){
        tag1.value = 'Chill'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'Chill'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'Chill'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'Chill'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'Chill'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}



function LoFiADD(){

    if(tag1.value == ''){
        tag1.value = 'LoFi'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'LoFi'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'LoFi'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'LoFi'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'LoFi'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}


function DubStepADD(){

    if(tag1.value == ''){
        tag1.value = 'DubStep'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'DubStep'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'DubStep'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'DubStep'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'DubStep'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}


function HipHopADD(){

    if(tag1.value == ''){
        tag1.value = 'HipHop'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'HipHop'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'HipHop'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'HipHop'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'HipHop'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}


function RandBADD(){

    if(tag1.value == ''){
        tag1.value = 'RandB'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'RandB'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'RandB'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'RandB'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'RandB'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}




function IndieADD(){

    if(tag1.value == ''){
        tag1.value = 'Indie'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'Indie'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'Indie'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'Indie'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'Indie'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}



function SlowADD(){

    if(tag1.value == ''){
        tag1.value = 'Slow'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'Slow'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'Slow'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'Slow'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'Slow'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}


function FastADD(){

    if(tag1.value == ''){
        tag1.value = 'Fast'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'Fast'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'Fast'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'Fast'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'Fast'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}



function PianoADD(){

    if(tag1.value == ''){
        tag1.value = 'Piano'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'Piano'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'Piano'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'Piano'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'Piano'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}



function GuitarADD(){

    if(tag1.value == ''){
        tag1.value = 'Guitar'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'Guitar'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'Guitar'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'Guitar'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'Guitar'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}



function ElectricGuitarADD(){

    if(tag1.value == ''){
        tag1.value = 'ElectricGuitar'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'ElectricGuitar'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'ElectricGuitar'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'ElectricGuitar'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'ElectricGuitar'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}



function DrillADD(){

    if(tag1.value == ''){
        tag1.value = 'Drill'
    }
    else if(tag2.value == '' && tag1.value !== ''){
        tag2.value = 'Drill'
         TagAlrChose.style.display = 'none'
        if(tag1.value == 'Drill'){
            TagAlrChose.style.display = 'block'
            tag2.value = ''
        }
    }
    else if(tag3.value == '' && tag2.value !== ''){
        tag3.value = 'Drill'
         TagAlrChose.style.display = 'none'
        if(tag2.value == 'Drill'){
            TagAlrChose.style.display = 'block'
            tag3.value = ''
        }
    }


}

var yn = true



document.getElementById('TagSearchButton').addEventListener('mouseover', () => {
    TagButton.style.borderBottom = 'solid 2px #1aafdc'
 
 })
 
 
 
 document.getElementById('TagSearchButton').addEventListener('click', () => {
 
 
     document.getElementById('pricesort').style.display = 'none'
    document.getElementById('searchfiltertagcon').style.display = 'block'
    document.getElementById('UserSearch').style.display = 'none'
    document.getElementById('FavSearch').style.display = 'none'
 
    document.getElementById('FavsButton').style.borderBottom = 'solid 2px lightgray'
    document.getElementById('TagSearchButton').style.borderBottom = 'solid 2px #1aafdc'
    document.getElementById('PriceSearchButton').style.borderBottom = 'solid 2px lightgray'
     document.getElementById('UsernameSearchButton').style.borderBottom = 'solid 2px lightgray'
     
 })
 
 document.getElementById('PriceSearchButton').addEventListener('click', () => {
 
     document.getElementById('pricesort').style.display = 'block'
     document.getElementById('searchfiltertagcon').style.display = 'none'
     document.getElementById('FavSearch').style.display = 'none'
 
     document.getElementById('UserSearch').style.display = 'none'
    document.getElementById('FavsButton').style.borderBottom = 'solid 2px lightgray'
 
     document.getElementById('PriceSearchButton').style.borderBottom = 'solid 2px #1aafdc'
     document.getElementById('UsernameSearchButton').style.borderBottom = 'solid 2px lightgray'
     document.getElementById('TagSearchButton').style.borderBottom = 'solid 2px lightgray'
 
 })
 
 document.getElementById('UsernameSearchButton').addEventListener('click', () => {
 
 
     document.getElementById('pricesort').style.display = 'none'
     document.getElementById('searchfiltertagcon').style.display = 'none'
     document.getElementById('FavSearch').style.display = 'none'
 
     document.getElementById('UserSearch').style.display = 'block'
    document.getElementById('FavsButton').style.borderBottom = 'solid 2px lightgray'
 
     document.getElementById('UsernameSearchButton').style.borderBottom = 'solid 2px #1aafdc'
 document.getElementById('TagSearchButton').style.borderBottom = 'solid 2px lightgray'
 document.getElementById('PriceSearchButton').style.borderBottom = 'solid 2px lightgray'
 
 })
 
 
 document.getElementById('FavsButton').addEventListener('click', () => {
 
 
     document.getElementById('pricesort').style.display = 'none'
     document.getElementById('searchfiltertagcon').style.display = 'none'
     document.getElementById('UserSearch').style.display = 'none'
     document.getElementById('FavSearch').style.display = 'block'
 
 
     document.getElementById('UsernameSearchButton').style.borderBottom = 'solid 2px lightgray'
 
     document.getElementById('FavsButton').style.borderBottom = 'solid 2px #1aafdc'
 document.getElementById('TagSearchButton').style.borderBottom = 'solid 2px lightgray'
 document.getElementById('PriceSearchButton').style.borderBottom = 'solid 2px lightgray'
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





