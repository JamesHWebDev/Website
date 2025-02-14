const Arrow = document.getElementById('ArrowButton')
const List = document.getElementById('ListDrumSound')

const rev = document.getElementById("createreview")
const rate1 = document.getElementById("star1")
const rate2 = document.getElementById("star2")
const rate3 = document.getElementById("star3")
const rate4 = document.getElementById("star4")
const rate5 = document.getElementById("star5")

const RatingNumber = document.getElementById('rating')
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
window.onload = function(){
    document.getElementById('PriceInp').value = 20
    document.getElementById('VocalPresetAdded').textContent = 'SoundMixerz DrumKit 1'
    document.getElementById('DAWadded').textContent = '500 Sounds'
    document.getElementById('added').src = '/Images/drumtrialimg.jpg'

    
}

Arrow.addEventListener('click', () => {

if(Arrow.textContent == 'V'){
    List.style.height = '334px'
    List.style.color = 'black'
    List.style.borderBottom = 'solid 1px black'
    List.style.transition = 'height .5s'
    Arrow.textContent = 'Λ'
    console.log(List.offsetHeight)
}
else{
    List.style.color = 'white'
    List.style.borderBottom = 'none'
    List.style.height = '0px'
    List.style.transition = 'height .5s'
    Arrow.textContent = 'V'
   
}


})


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



document.getElementById('WriteRev').addEventListener('click', () => {



    rev.style.display = 'block';
    
    
})


document.getElementById('close').addEventListener('click', () => {
        rev.style.display = 'none';
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


document.getElementById('NoThanks').addEventListener('click', () => {


    document.getElementById('NotLoggedInDiv').style.height = '0px'
    document.getElementById('NotLoggedInDiv').style.opacity = '0'
    document.getElementById('NotLoggedInDiv').style.transition = 'opacity .3s'
        document.body.style.overflow = 'auto'
    
    


})

document.getElementById('myDrumKitForm').addEventListener('submit', function(event){

    event.preventDefault();
    
    

    fetch('/BuyDrumKit1', {
        method: 'POST',
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
    .catch((err) => console.log(err))






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

