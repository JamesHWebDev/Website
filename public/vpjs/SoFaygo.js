const price = document.getElementById("price");
const DAWname = document.getElementById("vpname");
const dropdown = document.getElementById("dropdown");
const price1 = document.getElementById("price1");
const add = document.getElementById("add");

const rev = document.getElementById("createreview")
const rate1 = document.getElementById("star1")
const rate2 = document.getElementById("star2")
const rate3 = document.getElementById("star3")
const rate4 = document.getElementById("star4")
const rate5 = document.getElementById("star5")
const avgrev = document.getElementById("avgrev")
const RatingNumber = document.getElementById('rating')
const starselect = document.getElementById("starselect")
const reviewinput = document.getElementById("reviewinput")
const reviewsubmit = document.getElementById("reviewsubmit")

const container = document.getElementById('container')
const list = document.getElementById("list");
const listbut = document.getElementById("buttonshowlist")


const SeeMore = document.getElementById("SeeMore")
const MorePresets = document.querySelectorAll(".hidePresets")
const FLStudioButton = document.getElementById('FLStudioDAWButton')
const LogicProXButton = document.getElementById('LogicProXDAWButton')
let ratingnum = 0



RatingNumber.addEventListener('input', () => {


    if(RatingNumber.value > 5){
        window.alert("You can only rate a product 1-5 stars")
        RatingNumber.value = 5
    }
    if(RatingNumber.value < 0){
window.alert("You can only rate a product 1-5 stars")
        RatingNumber.value = 1

    }


    if(RatingNumber.value == 0){
        console.log('hi0')
        rate1.src = '/Images/Star empty.jpg'
        rate2.src = '/Images/Star empty.jpg'
        rate3.src = '/Images/Star empty.jpg'
        rate4.src = '/Images/Star empty.jpg'
        rate5.src = '/Images/Star empty.jpg'
        ratingnum = 0
    }
    if(RatingNumber.value == 1){
        console.log('hi1')
        rate1.src = '/Images/Star full.jpg'
        rate2.src = '/Images/Star empty.jpg'
        rate3.src = '/Images/Star empty.jpg'
        rate4.src = '/Images/Star empty.jpg'
        rate5.src = '/Images/Star empty.jpg'
        ratingnum = 1
    }
    if(RatingNumber.value == 2){
        console.log('hi2')
        rate1.src = '/Images/Star full.jpg'
        rate2.src = '/Images/Star full.jpg'
        rate3.src = '/Images/Star empty.jpg'
        rate4.src = '/Images/Star empty.jpg'
        rate5.src = '/Images/Star empty.jpg'
        ratingnum = 2
    }
    if(RatingNumber.value == 3){
        console.log('hi3')
        rate1.src = '/Images/Star full.jpg'
        rate2.src = '/Images/Star full.jpg'
        rate3.src = '/Images/Star full.jpg'
        rate4.src = '/Images/Star empty.jpg'
        rate5.src = '/Images/Star empty.jpg'
        ratingnum = 3
    }
    if(RatingNumber.value == 4){
        console.log('hi4')
        rate1.src = '/Images/Star full.jpg'
        rate2.src = '/Images/Star full.jpg'
        rate3.src = '/Images/Star full.jpg'
        rate4.src = '/Images/Star full.jpg'
        rate5.src = '/Images/Star empty.jpg'
        ratingnum = 4
    }
    if(RatingNumber.value == 5){
        console.log('hi5')
        rate1.src = '/Images/Star full.jpg'
        rate2.src = '/Images/Star full.jpg'
        rate3.src = '/Images/Star full.jpg'
        rate4.src = '/Images/Star full.jpg'
        rate5.src = '/Images/Star full.jpg'
        ratingnum = 5
    }
    
})

document.getElementById('buttonshowlist').addEventListener('click', () => {
    

    if(list.style.display !== 'block'){
        list.style.display = 'block'
        listbut.textContent = 'Plugins Used' + '   ' +  '↑'  
        
        listbut.style.fontSize = "1.1rem"
        
        
    }
    else if(list.style.display !== 'none'){
        list.style.display = 'none'
        listbut.textContent = 'Plugins Used' + '   ' +  '↓'  

        listbut.style.fontSize = "1.1rem"
      
    }


})

document.getElementById('closeitem').addEventListener('click', () => {

    document.querySelector('.itemadded').style.borderBottom = 'none'
    document.querySelector('.itemadded').style.height = '0px'
    document.querySelector('.itemadded').style.transition = 'height .4s'
})


document.getElementById('myForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);


    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    
    

    fetch('/addSC', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(jsonData),
    })
    .then((response) => response.json())
    .then((data) => {
        if(data.message == 'hi'){
    document.body.style.overflow = 'hidden'

          document.body.style.overflow = 'hidden'
                    document.getElementById('NotLoggedInDiv').style.height = '400px'
                    document.getElementById('NotLoggedInDiv').style.opacity = '1'
                    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
        }
        if(data.message == 'Please Select a DAW'){
            window.alert(data.message)
        }
        if(data.message == 1){
             document.querySelector('.itemadded').style.borderBottom = 'solid 2px black'
            document.querySelector('.itemadded').style.height = '270px'
            document.querySelector('.itemadded').style.transition = 'height .4s'
        }
    })
    .catch((err) => console.log(err))


})

document.getElementById('BuyVPForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const formData = new FormData(this);


    const jsonData = {};
    formData.forEach((value, key) => {
        jsonData[key] = value;
    });

    let goto;

    if(fl == 1){
        goto = '/BoughtVPFL'
    }
    else{
        goto = '/BoughtVPLP'
    }

    

fetch(goto, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(jsonData),
})
    .then(response => response.json())
    .then((data) => {
        if(data.message == 'Not Logged'){
            document.body.style.overflow = 'hidden'

          document.body.style.overflow = 'hidden'
                    document.getElementById('NotLoggedInDiv').style.height = '400px'
                    document.getElementById('NotLoggedInDiv').style.opacity = '1'
                    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
        }
        if(data.message == 'No DAW'){
            window.alert('Please Select a DAW')
        }
        if(data.message == 'Purchased'){
            document.getElementById('BoughtVPPurchaseCon').style.height = '130px'
            document.getElementById('BoughtVPPurchaseCon').style.borderBottom = 'solid 1px black'
            document.getElementById('BoughtVPPurchaseCon').style.transition = 'height .3s'
            setTimeout(() => {
            document.getElementById('BoughtVPPurchaseCon').style.height = '0px'
            document.getElementById('BoughtVPPurchaseCon').style.borderBottom = 'solid 0px black'

                
            }, 3000);
        }
    })
    .catch((err) => {
        console.log(err)
    })







})



document.getElementById('FLStudioDAWButton').addEventListener('click', () => {

    document.getElementById('DAWadded').textContent = 'FL Studio'
    document.getElementById('frameVid').src = 'https://www.youtube.com/embed/LjPATHuFKAs?si=7K2ao6tHL4sSKBVa'
 document.getElementById('bomm').value = '1'

    price.textContent = "$20" + ".00";
        price1.textContent = "$20" + ".00";
        DAWname.textContent = "FL Studio";
        document.getElementById('DAWInp').value = 'FL Studio'
        document.getElementById('BDAW').value = 'FL Studio'

        document.getElementById('PriceInp').value = 20
        document.getElementById('BPrice').value = 20


        {fl = 1}globalThis
        {lp = 0}globalThis

        list.innerHTML = ''
        const logplugin = document.createElement('li')
        logplugin.textContent = "Stock Plugins Only"
        list.appendChild(logplugin)


        FLStudioButton.style.border = '2px solid #00A2E8'
        LogicProXButton.style.border = '1px solid black'
        
        
        
            FLStudioButton.addEventListener('mouseover', () => {
                FLStudioButton.style.border = 'solid 2px #00A2E8'
            })
            FLStudioButton.addEventListener('mouseout', () => {
                FLStudioButton.style.border = 'solid 2px #00A2E8'
            })
      
        if(LogicProXButton.style.border == '1px solid black'){
        LogicProXButton.addEventListener('mouseover', () => {
            LogicProXButton.style.border = 'solid 1px #00A2E8'
            LogicProXButton.style.transition = "border .3s"
        })

        LogicProXButton.addEventListener('mouseout', () => {
            LogicProXButton.style.border = '1px solid black'
            LogicProXButton.style.transition = "border .3s"
        })
    }
        

    
})

document.getElementById('LogicProXDAWButton').addEventListener('click', () => {

    document.getElementById('DAWadded').textContent = 'Logic Pro X'
    document.getElementById('frameVid').src = 'https://www.youtube.com/embed/wfALrrjuDto?si=z8WYdRiDYZE_oRuS'
 document.getElementById('bomm').value = '2'
        price.textContent = "$20" + ".00";
        price1.textContent = "$20" + ".00";
        DAWname.textContent = "Logic Pro X";
        
    document.getElementById('DAWInp').value = 'Logic Pro X'
    document.getElementById('BDAW').value = 'Logic Pro X'

document.getElementById('PriceInp').value = 20
document.getElementById('BPrice').value = 20

        {lp = 1}globalThis
        {fl = 0}globalThis
        
        list.innerHTML = ''
        const logplugin = document.createElement('li')
        logplugin.textContent = "Stock Plugins Only"
        list.appendChild(logplugin)

        LogicProXButton.style.border = '2px solid #00A2E8'
        FLStudioButton.style.border = '1px solid black'
       
            LogicProXButton.addEventListener('mouseover', () => {
                LogicProXButton.style.border = 'solid 2px #00A2E8'
            })
            LogicProXButton.addEventListener('mouseout', () => {
                LogicProXButton.style.border = 'solid 2px #00A2E8'
            })
       
        if(FLStudioButton.style.border == '1px solid black'){
        FLStudioButton.addEventListener('mouseover', () => {
            FLStudioButton.style.border = 'solid 1px #00A2E8'
            FLStudioButton.style.transition = "border .3s"
        })

        FLStudioButton.addEventListener('mouseout', () => {
            FLStudioButton.style.border = '1px solid black'
            FLStudioButton.style.transition = "border .3s"
        })
    }
        
    
})

window.onload = function(){
    document.getElementById('VocalPresetAdded').textContent = 'SoFaygo Vocal Preset'
    document.getElementById('added').src = '/Images/SoFaygo.jpg'
    document.getElementById('src').value = 'Images/SoFaygo.jpg'
    document.getElementById('VPInp').value = 'SoFaygo Vocal Preset'
    document.getElementById('BVP').value = 'SoFaygo Vocal Preset'
    document.getElementById('Wvpbr').value = '10'
    document.getElementById('SCNum').value = '10'
    const logplugin = document.createElement('li')
        logplugin.textContent = "Select a Daw"
        list.appendChild(logplugin)

        {fl = 0}globalThis
        {lp = 0}globalThis

        let x = Math.floor(Math.random() * MorePresets.length)
        let b = Math.floor(Math.random() * MorePresets.length)
        let j = Math.floor(Math.random() * MorePresets.length)
        
        if(x != b && b != j && j != x && x != 13 && b != 13 && j != 13){
            console.log('working')
        MorePresets[x].style.display = 'block'
        MorePresets[b].style.display = 'block'
        MorePresets[j].style.display = 'block'
        }
        else{
          
            while(true){
            let x = Math.floor(Math.random() * MorePresets.length)
            let b = Math.floor(Math.random() * MorePresets.length)
            let j = Math.floor(Math.random() * MorePresets.length)
            console.log(x, b, j)
            if(x == b || b == j || j == x || x == 13 || b == 13 || j == 13){
                
                console.log("fail")
                continue
            }
            else{
                
                console.log("pass")
                MorePresets[x].style.display = 'block'
                MorePresets[b].style.display = 'block'
                MorePresets[j].style.display = 'block'
                break
            }
    
            }
        }
}


document.getElementById('NoThanks').addEventListener('click', () => {


    document.getElementById('NotLoggedInDiv').style.height = '0px'
    document.getElementById('NotLoggedInDiv').style.opacity = '0'
    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
        document.body.style.overflow = 'auto'
    
    


})


document.getElementById('createrev').addEventListener('click', () => {



    rev.style.display = 'block';
    
    
    })


    document.getElementById('close').addEventListener('click', () => {
        rev.style.display = 'none';
    })
    
function rating1(){



starselect.textContent = 1 + " Stars";


}


function rating2(){


    
 
    starselect.textContent = 2 + " Stars"

}

function rating3(){


    

    starselect.textContent = 3 + " Stars"
 
}
function rating4(){
    


    starselect.textContent = 4 + " Stars"
  
}
function rating5(){
    

    starselect.textContent = 5 + " Stars"
  
}

function show1(){

    rev.style.display = 'block';
    reviewinput.style.display = 'block';
    reviewsubmit.style.display = 'block';
    
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


