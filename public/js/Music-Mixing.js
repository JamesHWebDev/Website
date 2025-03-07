



const cap = document.getElementById("cap")
const prog = document.getElementById("progressbar")
const full = document.getElementById("full")
const emp = document.getElementById("empty")
const prognum = document.getElementById("prognum")
const ques2 = document.getElementById("whatDAW")
const ques3 = document.getElementById("anyelse")
const explain = document.getElementById("explain")
const other = document.getElementById("other1")
const ques4 = document.getElementById("fastship")
const ques5 = document.getElementById("checkout")
const addfee = document.getElementById("fastyes")
const totalamount = document.getElementById("addfee")
const nofee = document.getElementById("fastno")
const hl = document.getElementById("howlong0")
const hl1 = document.getElementById("howlong1")
const hl2 = document.getElementById("howlong2")
const hl3 = document.getElementById("howlong3")
const hl4 = document.getElementById("howlong4")
const ta = document.getElementById("totalamount")
const total = document.getElementById("totalsss")
const AudUp = document.getElementById('audioUpload')
const filelab = document.getElementById('fileuplab')
const mmques2 = document.querySelectorAll('.musicmixQues2')
const mmques2label = document.getElementById('musicmixQues3')
const anyelselabel = document.getElementById('anyelselabel')
const anyQues = document.querySelectorAll('.anyelseQues')
const maybspec = document.getElementById('maybspec')
const fsl = document.getElementById('fastshiplabel')
const fsq = document.querySelectorAll('.fastshipques')
const ProBorder = document.querySelectorAll('.ProRowProVsBas')
const BasBorder = document.querySelectorAll('.BasRowProVsBas')
const PPros = document.querySelectorAll('.MMPtitlessPro')
const PBas = document.querySelectorAll('.MMPtitlessBas')
const ProBut = document.getElementById('ProBut')
const BasBut = document.getElementById('BasBut')
const WhichPack = document.getElementById('WhichPack')

let ProfessionalPack = false
let BasicPack = false


document.getElementById('MMForm').addEventListener('submit', function(event){

event.preventDefault()
const formData = new FormData(this);
    


document.getElementById('LoadingOuter').style.display = 'block'
document.querySelector('.products').classList.add('filterBlur')



fetch('/Music-Mixing', {
    method: 'POST',
    body: formData,

})
.then((response) => response.json())
.then((data) => {
    if(data.message == 'Success'){


document.getElementById('LoadingOuter').style.display = 'none'
document.querySelector('.products').classList.remove('filterBlur')

        
        document.getElementById('purMM').style.height = '110px'
       
        setTimeout(function() {
            window.location.href = '/Music-Mixing'
        }, 5000)
    }
})
.catch((err) => console.log(err))

})


document.getElementById('BasBut').addEventListener('click', () => {



    document.getElementById('formques4').value = 'Basic Package $10.00'

    {BasicPack = true}globalThis
    {ProfessionalPack = false}globalThis
     ProBut.style.backgroundColor = 'white'
     ProBut.style.color = 'black'
    ProBut.style.fontWeight = 'normal'
    BasBut.style.backgroundColor = '#1D1D1D'
     BasBut.style.color = 'white'
    BasBut.style.fontWeight = 'bold'
        document.getElementById('BasicRowTitle').style.borderTop = 'solid 2px #020024'
    document.getElementById('BasicRowPlugins').style.borderBottom = 'solid 2px #373737'
    for(let i = 0; i< BasBorder.length;i++){
         BasBorder[i].style.borderLeft = 'solid 2px #020024'
         BasBorder[i].style.borderRight = 'solid 2px #373737'
         BasBorder[i].style.backgroundColor = '#F3F3F3'
          
    }
    for(let i = 0; i < PBas.length;i++){
        PBas[i].style.fontWeight = 'bold'
    }
    for(let i = 0; i < PPros.length;i++){
        PPros[i].style.fontWeight = 'normal'
        PPros[i].style.color = 'black'
    }
    for(let i = 0; i < ProBorder.length;i++){
        ProBorder[i].style.borderLeft = 'none'
        ProBorder[i].style.borderRight = 'none'
 ProBorder[i].style.backgroundColor = 'white'

    }

})

document.getElementById('ProBut').addEventListener('click', () => {



    document.getElementById('formques4').value = 'Pro Package $25.00'

    {ProfessionalPack = true}globalThis
    {BasicPack = false}globalThis
    ProBut.style.backgroundColor = '#000446'
    ProBut.style.color = 'white'
    ProBut.style.fontWeight = 'bold'
    BasBut.style.backgroundColor = 'white'
     BasBut.style.color = 'black'
    BasBut.style.fontWeight = 'normal'
    document.getElementById('BasicRowTitle').style.borderTop = 'white'
    document.getElementById('BasicRowPlugins').style.borderBottom = 'white'
    for(let i = 0; i < ProBorder.length;i++){
        
        ProBorder[i].style.borderLeft = 'solid 2px #020024'
        ProBorder[i].style.borderRight = 'solid 2px #00d4ff'
        ProBorder[i].style.backgroundColor = '#E0F2FB'
    }
    for(let i = 0; i < BasBorder.length;i++){
        BasBorder[i].style.borderLeft = 'none'
        BasBorder[i].style.borderRight = 'none'
        BasBorder[i].style.backgroundColor = 'white'
    }
    for(let i = 0; i < PPros.length;i++){
        PPros[i].style.fontWeight = 'bold'
        PPros[i].style.color = '#001032'
    }
    for(let i = 0; i < PBas.length;i++){
        PBas[i].style.fontWeight = 'normal'
    }
})







document.getElementById('mixMyMusic').addEventListener('click', () => {
    ques2.style.display = 'block'
    cap.style.display = 'none'
    prog.style.display = 'block'
    emp.style.display = 'block'
    full.style.display = 'block'
    full.style.borderBottom = "solid 1px black"
    full.style.borderTop = "solid 1px black"
    full.style.borderRight = "solid 1px black"
    emp.style.borderBottom = "solid 1px black"
    emp.style.borderTop = "solid 1px black"
    emp.style.borderRight = "solid 1px black"
    full.style.width = '25%'
    emp.style.width = '75%'
    prognum.textContent = "25%"
     
   emp.style.borderBottomLeftRadius = "0px"
    emp.style.borderTopLeftRadius = "0px"
})
    



function next1(){

    cap.style.display = 'none'
    prog.style.display = 'block'
    ques2.style.display = 'block'
    full.style.display = 'block'
    full.style.borderBottom = "solid 1px black"
    full.style.borderTop = "solid 1px black"
    full.style.borderRight = "solid 1px black"
    emp.style.display = 'block'
    emp.style.borderBottom = "solid 1px black"
    emp.style.borderTop = "solid 1px black"
    emp.style.borderRight = "solid 1px black"
    full.style.width = '25%'
    emp.style.width = '75%'
    prognum.textContent = "25%"
    emp.style.borderBottomLeftRadius = "0px"
    emp.style.borderTopLeftRadius = "0px"
     
}


function back1(){
   
    cap.style.display = 'block'
    prog.style.display = 'none'
    ques2.style.display = 'none'
    full.style.display = 'none'
    emp.style.display = 'none'
}

document.getElementById('back2').addEventListener('click', () => {
    cap.style.display = 'block'
    prog.style.display = 'none'
    ques2.style.display = 'none'
    full.style.border = 'none'
    full.style.transition = '.5s'
    emp.style.display = 'block'
    emp.style.borderBottom = "solid 1px black"
    emp.style.borderTop = "solid 1px black"
    emp.style.borderRight = "solid 1px black"
    full.style.width = '0%'
    emp.style.width = '100%'
    prognum.textContent = "0%"
    emp.style.borderBottomLeftRadius = "10px"
    emp.style.borderTopLeftRadius = "10px"
})
   


const genre5 = document.getElementById('genre5')

const mm2 = document.querySelectorAll('input[name="genre"]');

for(let i = 0; i < mm2.length - 1; i++){
    console.log('lhfdksejhf')
    mm2[i].addEventListener('change', (event) => {
        if(mm2[i].checked){
        console.log("yoyoyoyogang")
        other.style.display = 'none'
        }
    })
}

genre5.addEventListener('change', (event) => {
    if(genre5.checked){
         other.style.display = 'block'
    }
})











 



document.getElementById('nothing1').addEventListener('change', (event) => {
if(event.target.checked){
explain.style.display = "block"
}


})
    
   




document.getElementById('next2').addEventListener('click', () => {
    

let x = 0
let a = 0
for(let i = 0; i < mmques2.length;i++){
if(mmques2[i].checked){
    a = 1
    if(mmques2[i].value == 'other'){
    document.getElementById('formques2').value = other.value

    }
    else{
    document.getElementById('formques2').value = mmques2[i].value
    }

}
else{
    x++
}

}

if(a == 0){
    console.log('if')
    mmques2label.style.color = 'red';
    mmques2label.style.fontWeight = 'bold';
    return;
}
else{
    console.log('else')
    mmques2label.style.color = 'black';
    mmques2label.style.fontWeight = 'normal';
}


   
    cap.style.display = 'none'
    prog.style.display = 'block'
    ques2.style.display = 'none'
    ques3.style.display = 'block'
    full.style.display = 'block'
    full.style.borderBottom = "solid 1px black"
    full.style.borderTop = "solid 1px black"
    full.style.borderLeft = "solid 1px black"
    emp.style.display = 'block'
    emp.style.borderBottom = "solid 1px black"
    emp.style.borderTop = "solid 1px black"
    emp.style.borderRight = "solid 1px black"
    full.style.width = '50%'
    emp.style.width = '50%'
    prognum.textContent = "50%"
    emp.style.borderBottomLeftRadius = "0px"
    emp.style.borderTopLeftRadius = "0px"
})


document.getElementById('nothing').addEventListener('change', (event) => {
    if(event.target.checked){
        explain.style.display = 'none'

    }
  
})
    



document.getElementById('back3').addEventListener('click', () => {

   
    cap.style.display = 'none'
    prog.style.display = 'block'
    ques2.style.display = 'block'
    ques3.style.display = 'none'
    full.style.display = 'block'
    full.style.borderBottom = "solid 1px black"
    full.style.borderTop = "solid 1px black"
    full.style.borderLeft = "solid 1px black"
    emp.style.display = 'block'
    emp.style.borderBottom = "solid 1px black"
    emp.style.borderTop = "solid 1px black"
    emp.style.borderRight = "solid 1px black"

    full.style.width = '25%'
    emp.style.width = '75%'
    prognum.textContent = "25%"
    emp.style.borderBottomLeftRadius = "0px"
    emp.style.borderTopLeftRadius = "0px"
})

document.getElementById('next3').addEventListener('click', () => {


let a = 0
let x = 0
    for(let i = 0; i < anyQues.length;i++){
        if(anyQues[i].checked){
            a = 1
            if(anyQues[i].value == 'yes'){
                document.getElementById('formques3').value = explain.value
            }
            else{
                document.getElementById('formques3').value = "no specific requests"
            }
        }
        else{
            x++
        }
    }

    if(a == 0){
        anyelselabel.style.color = 'red';
        anyelselabel.fontWeight = 'bold';
        maybspec.style.color = 'red';
        maybspec.style.fontWeight = 'bold';
        window.alert('If Not Then Please Select "no"')
        return;
    }
    else{
        anyelselabel.style.color = 'black';
        anyelselabel.fontWeight = 'normal';
        maybspec.style.color = 'black';
        maybspec.style.fontWeight = 'normal';
    }
   
    cap.style.display = 'none'
    prog.style.display = 'block'
    ques2.style.display = 'none'
    ques3.style.display = 'none'
    ques4.style.display = 'block'
    full.style.display = 'block'
    full.style.borderBottom = "solid 1px black"
    full.style.borderTop = "solid 1px black"
    full.style.borderLeft = "solid 1px black"
    emp.style.display = 'block'
    emp.style.borderBottom = "solid 1px black"
    emp.style.borderTop = "solid 1px black"
    emp.style.borderRight = "solid 1px black"
    full.style.width = '75%'
    emp.style.width = '25%'
    prognum.textContent = "75%"
    emp.style.borderBottomLeftRadius = "0px"
    emp.style.borderTopLeftRadius = "0px"
})
document.getElementById('back4').addEventListener('click', () => {

  
    cap.style.display = 'none'
    prog.style.display = 'block'
    ques2.style.display = 'none'
    ques3.style.display = 'block'
    ques4.style.display = 'none'
    full.style.display = 'block'
    full.style.borderBottom = "solid 1px black"
    full.style.borderTop = "solid 1px black"
    full.style.borderLeft = "solid 1px black"
    emp.style.display = 'block'
    emp.style.borderBottom = "solid 1px black"
    emp.style.borderTop = "solid 1px black"
    emp.style.borderRight = "solid 1px black"
    full.style.width = '50%'
    emp.style.width = '50%'
    prognum.textContent = "50%"
    emp.style.borderBottomLeftRadius = "0px"
    emp.style.borderTopLeftRadius = "0px"
})
document.getElementById('next4').addEventListener('click', () => {


    let a = 0
    let j = 0


    if(BasicPack == true){
        ta.textContent = '$10.00 '
        WhichPack.textContent = '| Essentials Music Mixing Package'
    }
    if(ProfessionalPack == true){
        ta.textContent = '$25.00 '
        WhichPack.textContent = '| Professional Music Mixing Package'
    }




    cap.style.display = 'none'
    prog.style.display = 'block'
    ques2.style.display = 'none'
    ques3.style.display = 'none'
    ques4.style.display = 'none'
    ques5.style.display = 'block'
    full.style.display = 'block'
    full.style.borderBottom = "solid 1px black"
    full.style.borderTop = "solid 1px black"
    full.style.borderLeft = "solid 1px black"
    emp.style.transition = ".5s"
    emp.style.border = 'none'
    
    full.style.width = '76%'
    emp.style.width = '0%'
    prognum.textContent = "100%"
    full.style.borderBottomRightRadius = "10px"
    full.style.borderTopRightRadius = "10px"


   
})

document.getElementById('back5').addEventListener('click', () => {


    

    cap.style.display = 'none'
    prog.style.display = 'block'
    ques2.style.display = 'none'
    ques3.style.display = 'none'
    ques4.style.display = 'block'
    ques5.style.display = 'none'
    full.style.display = 'block'
    full.style.borderBottom = "solid 1px black"
    full.style.borderTop = "solid 1px black"
    full.style.borderLeft = "solid 1px black"
    emp.style.display = 'block'
    emp.style.borderBottom = "solid 1px black"
    emp.style.borderTop = "solid 1px black"
    emp.style.borderRight = "solid 1px black"
    full.style.width = '75%'
    emp.style.width = '25%'
    prognum.textContent = "75%"
    full.style.borderBottomRightRadius = "0px"
    full.style.borderTopRightRadius = "0px"


    
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


document.getElementById('closeLogg').addEventListener('click', () => {
    document.getElementById('NotLoggedInR').style.display = 'none'
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

