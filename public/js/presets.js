

const dropdown = document.getElementById("dropdown");
const dropdown1 = document.getElementById("dropdown1");
const dropdown2 = document.getElementById("dropdown2");
const dropdown3 = document.getElementById("dropdown3");
const dropdown4 = document.getElementById("dropdown4");
const dropdown5 = document.getElementById("dropdown5");
const dropdown6 = document.getElementById("dropdown6");
const dropdown7 = document.getElementById("dropdown7");
const dropdown8 = document.getElementById("dropdown8");
const dropdown9 = document.getElementById("dropdown9");
const dropdown10 = document.getElementById("dropdown10");
const dropdown11 = document.getElementById("dropdown11");
const dropdown12 = document.getElementById("dropdown12");
const dropdown13 = document.getElementById("dropdown13");
const dropdown14 = document.getElementById("dropdown14");
const dropdown15 = document.getElementById("dropdown15");
const dropdown16 = document.getElementById("dropdown16");
const dropdown17 = document.getElementById("dropdown17");



const artistname = document.getElementById("artistname1")
const artistname1 = document.getElementById("artistname2")
const artistname2 = document.getElementById("artistname3")
const artistname3 = document.getElementById("artistname4")
const artistname4 = document.getElementById("artistname5")
const artistname5 = document.getElementById("artistname6")
const artistname6 = document.getElementById("artistname7")
const artistname7 = document.getElementById("artistname8")
const artistname8 = document.getElementById("artistname9")
const artistname9 = document.getElementById("artistname10")
const artistname10 = document.getElementById("artistname11")
const artistname11 = document.getElementById("artistname12")
const artistname12 = document.getElementById("artistname13")
const artistname13 = document.getElementById("artistname14")
const artistname14 = document.getElementById("artistname15")
const artistname15 = document.getElementById("artistname16")
const artistname16 = document.getElementById("artistname17")
const artistname17 = document.getElementById("artistname18")





const price = document.getElementById("price");
const price1 = document.getElementById("price1");
const price2 = document.getElementById("price2");
const price3 = document.getElementById("price3");
const price4 = document.getElementById("price4");
const price5 = document.getElementById("price5");
const price6 = document.getElementById("price6");
const price7 = document.getElementById("price7");
const price8 = document.getElementById("price8");
const price9 = document.getElementById("price9");
const price10 = document.getElementById("price10");
const price11 = document.getElementById("price11");
const price12 = document.getElementById("price12");
const price13 = document.getElementById("price13");
const price14 = document.getElementById("price14");
const price15 = document.getElementById("price15");
const price16 = document.getElementById("price16");
const price17 = document.getElementById("price17");




const LogicProXButton = document.getElementById("LogicButton")
const FLStudioButton= document.getElementById("FLStudioButton")
const SearchBar = document.getElementById('Search')
const NF = document.getElementById('NothingFound')





const fade1 = 0; 
const fade2 = 300
const fade3 = 750
const fade4 = 1250
const fade5 = 1710
const fade6 = 2160

window.onload = function(){
        const sec1 = document.querySelectorAll('.fade1')
        for(let i = 0; i < sec1.length; i++){
                sec1[i].style.opacity = '1'
                sec1[i].style.transition = 'opacity 1.3s'
        }
}


// Function to be executed when scroll position is reached
function handleScroll() {
    // Get the current scroll position
    const currentScroll = window.scrollY || window.pageYOffset;
    console.log(currentScroll)
    // Check if the scroll position has reached the trigger point
    if (currentScroll >= fade2){
        const sec2 = document.querySelectorAll('.fade2')
        for(let i = 0; i < sec2.length; i++){
                sec2[i].style.opacity = '1'
                sec2[i].style.transition = 'opacity 1.3s'
        }
    }
    if(currentScroll >= fade3) {
        const sec3 = document.querySelectorAll('.fade3')
        for(let i = 0; i < sec3.length; i++){
                sec3[i].style.opacity = '1'
                sec3[i].style.transition = 'opacity 1.3s'
        }
    }
    if(currentScroll >= fade4){
        const sec4 = document.querySelectorAll('.fade4')
        for(let i = 0; i < sec4.length; i++){
                sec4[i].style.opacity = '1'
                sec4[i].style.transition = 'opacity 1.3s'
        }
    }
    if(currentScroll >= fade5){
        const sec5 = document.querySelectorAll('.fade5')
        for(let i = 0; i < sec5.length; i++){
                sec5[i].style.opacity = '1'
                sec5[i].style.transition = 'opacity 1.3s'
        }
    }
    if(currentScroll >= fade6){
        const sec6 = document.querySelectorAll('.fade6')
        for(let i = 0; i < sec6.length; i++){
                sec6[i].style.opacity = '1'
                sec6[i].style.transition = 'opacity 1.3s'
        }
    }
    
}


window.addEventListener('scroll', handleScroll);













const PriceFields = document.querySelectorAll('.price')
let alre = 0
document.getElementById('LogicButton').addEventListener('click', () => {




LogicProXButton.style.borderBottom = "solid 4px #009EFF"
FLStudioButton.style.borderBottom = "solid 2px lightgray"


LogicProXButton.addEventListener("mouseover", () => {

        LogicProXButton.style.borderBottom = "solid 4px #009EFF"

})


LogicProXButton.addEventListener("mouseout", () => {

        LogicProXButton.style.borderBottom = "solid 4px #009EFF"

})




FLStudioButton.addEventListener("mouseover", () => {

        FLStudioButton.style.borderBottom = "solid 2px #009EFF"

})


FLStudioButton.addEventListener("mouseout", () => {

        FLStudioButton.style.borderBottom = "solid 2px lightgray"

})




dropdown.selectedIndex = "1"
dropdown1.selectedIndex = "1"
dropdown2.selectedIndex = "1"
dropdown3.selectedIndex = "1"
dropdown4.selectedIndex = "1"
dropdown5.selectedIndex = "1"
dropdown6.selectedIndex = "1"
dropdown7.selectedIndex = "1"
dropdown8.selectedIndex = "1"
dropdown9.selectedIndex = "1"
dropdown10.selectedIndex = "1"
dropdown11.selectedIndex = "1"
dropdown12.selectedIndex = "1"


artistname.textContent = "autumn! Logic Pro X Vocal Preset"
artistname1.textContent = "Destroy Lonely Logic Pro X Vocal Preset"
artistname2.textContent = "Ken Carson Logic Pro X Vocal Preset"
artistname3.textContent = "Tory Lanez Logic Pro X Vocal Preset"
artistname4.textContent = "Frank Ocean Logic Pro X Vocal Preset"
artistname5.textContent = "Don Toliver Logic Pro X Vocal Preset"
artistname6.textContent = "Brent Faiyaz Logic Pro X Vocal Preset"
artistname7.textContent = "The Weeknd Logic Pro X Vocal Preset"
artistname8.textContent = "Bryson Tiller Logic Pro X Vocal Preset"
artistname9.textContent = "Travis Scott Logic Pro X Vocal Preset"
artistname10.textContent ="PlayBoi Carti Logic Pro X Vocal Preset"
artistname11.textContent = "Lil Tjay Logic Pro X Vocal Preset"
artistname12.textContent = "Post Malone Logic Pro X Vocal Preset"
artistname13.textContent = "SoFaygo Logic Pro X Vocal Preset"
artistname14.textContent = "TheKidLAROI Logic Pro X Vocal Preset"
artistname15.textContent = "Trippie Redd Logic Pro X Vocal Preset"
artistname16.textContent = "Lil Uzi Vert Logic Pro X Vocal Preset"
artistname17.textContent = "YNW Melly Logic Pro X Vocal Preset"





})


const ArtistsNames = [
        'frank ocean',
        'autumn!',
        'brentfaiyaz',
        'dontoliver',
        'bryson tiller',
        'liltjay',
        'playboicarti',
        'theweeknd',
        'torylanez',
        'travisscott',
        'destroy lonely',
        'ken carson',
        'postmalone',
        'sofaygo',
        'thekidlaroi',
        'trippieredd',
        'lil uzi vert',
        'ynw melly',
]



const LilBabyProduct = document.getElementById('LilBabyProduct')
const TylerTheCreatorProduct = document.getElementById('TylerTheCreatorProduct')
const YeatProduct = document.getElementById('YeatProduct')
const ToryLanezProduct = document.getElementById('ToryLanezProduct')
const PoloGProduct = document.getElementById('BabyKeemProduct')
const DonToliverProduct = document.getElementById('DonToliverProduct')
const BrentFaiyazProduct = document.getElementById('BrentFaiyazProduct')
const TheWeekendProduct = document.getElementById('TheWeekendProduct')
const JojiProduct = document.getElementById('JojiProduct')
const TravisScottProduct = document.getElementById('TravisScottProduct')
const PlayBoiCartiProduct = document.getElementById('PlayBoiCartiProduct')
const LilTjayProduct = document.getElementById('LilTjayProduct')
const PostMaloneProduct = document.getElementById('PostMaloneProduct')
const SoFaygoProduct = document.getElementById('SoFaygoProduct')
const TheKidLaroiProduct = document.getElementById('TheKidLaroiProduct')
const TrippieReddProduct = document.getElementById('TrippieReddProduct')
const TyDollaSignProduct = document.getElementById('TyDollaSignProduct')
const YNWMellyProduct = document.getElementById('YNWMellyProduct')



const ArtistsProducts = [
        PoloGProduct,
        LilBabyProduct,
        BrentFaiyazProduct,
        DonToliverProduct,
        JojiProduct,
        LilTjayProduct,
        PlayBoiCartiProduct,
        TheWeekendProduct,
        ToryLanezProduct,
        TravisScottProduct,
        TylerTheCreatorProduct,
        YeatProduct,
        PostMaloneProduct,
        SoFaygoProduct,
        TheKidLaroiProduct,
        TrippieReddProduct,
        TyDollaSignProduct,
        YNWMellyProduct,
]


document.getElementById('Search').addEventListener('keydown', () => {




const sec1 = document.querySelectorAll('.fade1')
const sec2 =document.querySelectorAll('.fade2')
const sec3 =document.querySelectorAll('.fade3')
const sec4 =document.querySelectorAll('.fade4')
const sec5 =document.querySelectorAll('.fade5')
const sec6 =document.querySelectorAll('.fade6')



for(let i = 0; i < sec1.length; i++){
        sec1[i].style.opacity = '1'
        sec2[i].style.opacity = '1'
        sec3[i].style.opacity = '1'
        sec4[i].style.opacity = '1'
        sec5[i].style.opacity = '1'
        sec6[i].style.opacity = '1'

}

const SB = SearchBar.value.toLowerCase()
let working = true
for(let i = 0; i < SB.length;i++){
       
        
        for(let x = 0; x < ArtistsNames.length; x++){
                if(ArtistsNames[x].charAt(i) != SB.charAt(i)){
                        
                       ArtistsProducts[x].style.display = 'none'
                      
                }
                else{
                       console.log('Sorry we do not have what your searching for')
                }
                }
        }
})






document.getElementById('FLStudioButton').addEventListener('click', () => {




        FLStudioButton.style.borderBottom = "solid 4px #009EFF"
        LogicProXButton.style.borderBottom = "solid 2px lightgray"

        FLStudioButton.addEventListener("mouseover", () => {

                FLStudioButton.style.borderBottom = "solid 4px #009EFF"
        
        })
        
        
        FLStudioButton.addEventListener("mouseout", () => {
        
                FLStudioButton.style.borderBottom = "solid 4px #009EFF"
        
        })



        LogicProXButton.addEventListener("mouseover", () => {

                LogicProXButton.style.borderBottom = "solid 2px #009EFF"
        
        })
        
        
        LogicProXButton.addEventListener("mouseout", () => {
        
                LogicProXButton.style.borderBottom = "solid 2px lightgray"
        
        })
        
        dropdown.selectedIndex = "2"
        dropdown1.selectedIndex = "2"
        dropdown2.selectedIndex = "2"
        dropdown3.selectedIndex = "2"
        dropdown4.selectedIndex = "2"
        dropdown5.selectedIndex = "2"
        dropdown6.selectedIndex = "2"
        dropdown7.selectedIndex = "2"
        dropdown8.selectedIndex = "2"
        dropdown9.selectedIndex = "2"
        dropdown10.selectedIndex = "2"
        dropdown11.selectedIndex = "2"
        dropdown12.selectedIndex = "2"


        artistname.textContent = "Autumn! FL Studio Vocal Preset"
artistname1.textContent = "Destroy Lonely FL Studio Vocal Preset"
artistname2.textContent = "Ken Carson FL Studio Vocal Preset"
artistname3.textContent = "Tory Lanez FL Studio Vocal Preset"
artistname4.textContent = "Frank Ocean FL Studio Vocal Preset"
artistname5.textContent = "Don Toliver FL Studio Vocal Preset"
artistname6.textContent = "Brent Faiyaz FL Studio Vocal Preset"
artistname7.textContent = "The Weeknd FL Studio Vocal Preset"
artistname8.textContent = "Bryson Tiller FL Studio Vocal Preset"
artistname9.textContent = "Travis Scott FL Studio Vocal Preset"
artistname10.textContent ="PlayBoi Carti FL Studio Vocal Preset"
artistname11.textContent = "Lil Tjay FL Studio Vocal Preset"
artistname12.textContent = "Post Malone FL Studio Vocal Preset"
artistname13.textContent = "SoFaygo FL Studio Vocal Preset"
artistname14.textContent = "TheKidLAROI FL Studio Vocal Preset"
artistname15.textContent = "Trippie Redd FL Studio Vocal Preset"
artistname16.textContent = "Lil Uzi Vert FL Studio Vocal Preset"
artistname17.textContent = "YNW Melly FL Studio Vocal Preset"










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




const date1 = new Date();
const date2 = new Date(Date.now())
const day = date1.setDate(date1.getDate() + 3)

console.log(date2)
console.log(date1)
console.log(date1 - date2)

