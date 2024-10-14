

const page1 = document.getElementById('newspage1')
const page2 = document.getElementById('newspage2')
const page3 = document.getElementById('newspage3')
const page4 = document.getElementById('newspage4')
const page5 = document.getElementById('newspage5')




document.getElementById('next1').addEventListener('click', () => {
    page1.style.display = 'none'
    page2.style.display = 'block'
    page3.style.display = 'none'
    page4.style.display = 'none'
    page5.style.display = 'none'
})



document.getElementById('back1').addEventListener('click', () => {
    page1.style.display = 'block'
    page2.style.display = 'none'
    page3.style.display = 'none'
    page4.style.display = 'none'
    page5.style.display = 'none'
})


document.getElementById('next2').addEventListener('click', () => {
    page1.style.display = 'none'
    page2.style.display = 'none'
    page3.style.display = 'block'
    page4.style.display = 'none'
    page5.style.display = 'none'
})


document.getElementById('back2').addEventListener('click', () => {

    page1.style.display = 'none'
    page2.style.display = 'block'
    page3.style.display = 'none'
    page4.style.display = 'none'
    page5.style.display = 'none'
})


document.getElementById('next3').addEventListener('click', () => {
    page1.style.display = 'none'
    page2.style.display = 'none'
    page3.style.display = 'none'
    page4.style.display = 'block'
    page5.style.display = 'none'
})


document.getElementById('back3').addEventListener('click', () => {

    page1.style.display = 'nne'
    page2.style.display = 'none'
    page3.style.display = 'block'
    page4.style.display = 'none'
    page5.style.display = 'none'
})

document.getElementById('next4').addEventListener('click', () => {
    page1.style.display = 'none'
    page2.style.display = 'none'
    page3.style.display = 'none'
    page4.style.display = 'none'
    page5.style.display = 'block'
})

document.getElementById('Aleft5').addEventListener('click', () => {

    page1.style.display = 'none'
    page2.style.display = 'none'
    page3.style.display = 'none'
    page4.style.display = 'block'
    page5.style.display = 'none'
})






const fade1 = 400; // for example, trigger at 500px from top
const fade2 = 920
const fade3 = 1390
const fade4 = 1800

// Function to be executed when scroll position is reached
function handleScroll() {
    // Get the current scroll position
    const currentScroll = window.scrollY || window.pageYOffset;
    console.log(currentScroll)
    // Check if the scroll position has reached the trigger point
    if (currentScroll >= fade1) {
        document.getElementById('news').style.opacity = '1'
        document.getElementById('news').style.transition = 'opacity 2s'

    }
    if(currentScroll >= fade2) {
        document.getElementById('AU').style.opacity = '1'
        document.getElementById('AU').style.transition = 'opacity 2s'

    }
    if(currentScroll >= fade3){
        document.getElementById('WCU').style.opacity = '1'
        document.getElementById('WCU').style.transition = 'opacity 2s'

    }
    if(currentScroll >= fade4){
        document.getElementById('FAQ').style.opacity = '1'
        document.getElementById('FAQ').style.transition = 'opacity 2s'

    }
    
}

// Attach the scroll event listener to the window
window.addEventListener('scroll', handleScroll);

const SeeMoreOFAQ = document.querySelectorAll('.SeeMoreOFAQ')

document.getElementById('showFAQ1').addEventListener('click', function(){
    CloseFAQ2();
    CloseFAQ3();
    CloseFAQ4();
    CloseFAQ5();
    if(SeeMoreOFAQ[0].textContent == 'V'){
        SeeMoreOFAQ[0].textContent = 'Λ'
    document.getElementById('FirstQuesAns').style.display = 'block'

   document.getElementById('FirstQuesAns').style.borderRight = 'solid 1px white'
   document.getElementById('FirstQuesAns').style.borderLeft = 'solid 1px white'
   document.getElementById('FirstQuesAns').style.borderBottom = 'solid 1px white'
    
    }
    else{
        SeeMoreOFAQ[0].textContent = 'V'

        document.getElementById('FirstQuesAns').style.display = 'none'

        document.getElementById('FirstQuesAns').style.borderRight = 'none'
   document.getElementById('FirstQuesAns').style.borderLeft = 'none'
   document.getElementById('FirstQuesAns').style.borderBottom = 'none'
    }
})



document.getElementById('showFAQ2').addEventListener('click', function(){
    CloseFAQ1();
    CloseFAQ3();
    CloseFAQ4();
    CloseFAQ5();
    if(SeeMoreOFAQ[1].textContent == 'V'){
        SeeMoreOFAQ[1].textContent = 'Λ'
    document.getElementById('SecondQuesAns').style.display = 'block'

    document.getElementById('SecondQuesAns').style.borderRight = 'solid 1px white'
    document.getElementById('SecondQuesAns').style.borderLeft = 'solid 1px white'
    document.getElementById('SecondQuesAns').style.borderBottom = 'solid 1px white'
    
    }
    else{
        SeeMoreOFAQ[1].textContent = 'V'

        document.getElementById('SecondQuesAns').style.display = 'none'

        document.getElementById('SecondQuesAns').style.borderRight = 'none'
   document.getElementById('SecondQuesAns').style.borderLeft = 'none'
   document.getElementById('SecondQuesAns').style.borderBottom = 'none'
    }
})


document.getElementById('showFAQ3').addEventListener('click', function(){
    CloseFAQ2();
    CloseFAQ1();
    CloseFAQ4();
    CloseFAQ5();
    if(SeeMoreOFAQ[2].textContent == 'V'){
        SeeMoreOFAQ[2].textContent = 'Λ'
    document.getElementById('ThirdQuesAns').style.display = 'block'

    document.getElementById('ThirdQuesAns').style.borderRight = 'solid 1px white'
    document.getElementById('ThirdQuesAns').style.borderLeft = 'solid 1px white'
    document.getElementById('ThirdQuesAns').style.borderBottom = 'solid 1px white'
    
    }
    else{
        SeeMoreOFAQ[2].textContent = 'V'

        document.getElementById('ThirdQuesAns').style.display = 'none'
        document.getElementById('ThirdQuesAns').style.borderRight = 'none'
        document.getElementById('ThirdQuesAns').style.borderLeft = 'none'
        document.getElementById('ThirdQuesAns').style.borderBottom = 'none'
    }
})



document.getElementById('showFAQ4').addEventListener('click', function(){
    CloseFAQ2();
    CloseFAQ3();
    CloseFAQ1();
    CloseFAQ5();
    if(SeeMoreOFAQ[3].textContent == 'V'){
        SeeMoreOFAQ[3].textContent = 'Λ'
    document.getElementById('FourthQuesAns').style.display = 'block'

    document.getElementById('FourthQuesAns').style.borderRight = 'solid 1px white'
    document.getElementById('FourthQuesAns').style.borderLeft = 'solid 1px white'
    document.getElementById('FourthQuesAns').style.borderBottom = 'solid 1px white'
    
    }
    else{
        SeeMoreOFAQ[3].textContent = 'V'

      document.getElementById('FourthQuesAns').style.display = 'none'

      document.getElementById('FourthQuesAns').style.borderRight = 'none'
      document.getElementById('FourthQuesAns').style.borderLeft = 'none'
      document.getElementById('FourthQuesAns').style.borderBottom = 'none'
    }
})



document.getElementById('showFAQ5').addEventListener('click', function(){
    CloseFAQ2();
    CloseFAQ3();
    CloseFAQ4();
    CloseFAQ1();
    if(SeeMoreOFAQ[4].textContent == 'V'){
        SeeMoreOFAQ[4].textContent = 'Λ'
        document.getElementById('FifthQuesAns').style.display = 'block'

        document.getElementById('FifthQuesAns').style.borderRight = 'solid 1px white'
        document.getElementById('FifthQuesAns').style.borderLeft = 'solid 1px white'
        document.getElementById('FifthQuesAns').style.borderBottom = 'solid 1px white'
 
    
    }
    else{
        SeeMoreOFAQ[4].textContent = 'V'

        document.getElementById('FifthQuesAns').style.display = 'none'

        document.getElementById('FifthQuesAns').style.borderRight = 'none'
        document.getElementById('FifthQuesAns').style.borderLeft = 'none'
        document.getElementById('FifthQuesAns').style.borderBottom = 'none'

    }
})
    



function CloseFAQ1(){
    SeeMoreOFAQ[0].textContent = 'V'

       document.getElementById('FirstQuesAns').style.display = 'none'
}


function CloseFAQ2(){
    SeeMoreOFAQ[1].textContent = 'V'

   document.getElementById('SecondQuesAns').style.display = 'none'

}


function CloseFAQ3(){

    SeeMoreOFAQ[2].textContent = 'V'

     document.getElementById('ThirdQuesAns').style.display = 'none'


}


function CloseFAQ4(){

    SeeMoreOFAQ[3].textContent = 'V'

      document.getElementById('FourthQuesAns').style.display = 'none'


}

function CloseFAQ5(){

    SeeMoreOFAQ[4].textContent = 'V'

     document.getElementById('FifthQuesAns').style.display = 'none'



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

