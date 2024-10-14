const express = require('express')
const http = require("http");
const fs = require('fs')
const path = require('path')
const app = express()
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const secretKey = 'your-secret-key';
const multer = require('multer');
const helmet = require('helmet')
const mongoose = require('mongoose');
const rateLimit = require('express-rate-limit');
const session = require('express-session')
const bodyParser = require('body-parser');
const cors = require('cors');
const UD = require('./models/UD');
//REV IS BEING USED FOR BABYKEEM REV SINCE THE BABYKEEMREV FILE IS ACTING WEIRD
const REV = require('./models/Rev')
require('./models/JojiREV')
const BrentFaiyazREV = require('./models/BrentFaiyazREV')
const DonToliverREV = require('./models/DonToliverREV')
const LilBabyREV = require('./models/LilBabyRev')
const LilTjayREV = require('./models/LilTjayREV')
const PlayBoiCartiREV = require('./models/PlayBoiCartiREV')
const TheWeekndREV = require('./models/TheWeekndREV')
const ToryLanezREV = require('./models/ToryLanezREV')
const TravisScottREV = require('./models/TravisScottREV')
const TylerTheCreatorREV = require('./models/TylerTheCreatorREV')
const YeatREV = require('./models/YeatREV');
const JojiREV = require('./models/JojiREV');
const PostMaloneREV = require('./models/PostMaloneREV')
const SoFaygoREV = require('./models/SoFaygo')
const TheKidLaroiREV = require('./models/TheKidLaroiREV')
const TrippieReddREV = require('./models/TrippieReddREV')
const TyDollaSignREV = require('./models/TyDollaSign')
const YNWMellyREV = require('./models/YNWMelly')
const BT = require('./models/BeatShem');
const MM = require('./models/MMschema')
const Noti = require('./models/NotiSchema')
const SB = require('./models/SoldBeats')
const Sprice = require('./models/Sprice')
const SC = require('./models/ShoppingCart')
const BV = require('./models/BoughtVocal')
const DB = require('./models/DownloadBeat')
const FV = require('./models/Favorites')
const OD = require('./models/BeatPackage')
const RP = require('./models/Report')
const TB = require('./models/TrackBeat')
const ES = require('./models/EmailSent')
const PD = require('./models/Pending')
const CM = require('./models/ComMM')
const Verify = require('./models/Verify')
const DKO = require('./models/DrumKit1Rev')
const BDK = require('./models/BoughtDK')

const nodemailer = require('nodemailer');
const { resourceLimits } = require('worker_threads');






const DBuri = "mongodb+srv://jamesholmesblah:75GsoYK0idVVWCqP@soundmixerz.e4yc9pc.mongodb.net/?retryWrites=true&w=majority&appName=SoundMixerz";
mongoose.connect(DBuri)
.then((result) => {
    app.listen(3000)
})
.catch((err) => {
    console.log(err)
});




//Setting View Engine
app.set('view engine', 'ejs')
app.set('views', 'html')



//const tokens = new Map();
//Generating unique Token to Secure Audio Files in Inspect Element






//Making public folder public for the css stylesheets MIDDLEWARE
app.use(bodyParser.json());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            scriptSrc: ["'self'", "https://cdn.plyr.io"],
            styleSrc: ["'self'", "https://cdn.plyr.io", 'https://fonts.googleapis.com', "https://cdnjs.cloudflare.com", "https://www.youtube.com", "https://www.youtube-nocookie.com"],
            mediaSrc: ["'self'", "blob:"],
            frameSrc: ["https://www.youtube.com", "https://www.youtube-nocookie.com"],
        },
    },
}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));
app.use(session({
    secret: 'LIDHLWHdhuAWdliuhdo*7w378r03wr809OSdjdpoIJ',
    resave: true,
    saveUninitialized: false
}));
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
app.use(cors({
    origin: ['http://localhost:3000', 'http://soundmixerz.com'],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
}));











  const storage = multer.diskStorage({
   
    destination: function (req, file, cb) {
      cb(null, 'public/BeatsUploaded/'); // Destination folder for uploaded files
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9) + path.extname(file.originalname);
      cb(null,uniqueSuffix); // File naming format
    }
  });

  



  const upload = multer({ storage: storage });



/*
//Sending Data to the Database
app.get('/hihi', (req, res) => {
    const Username = new UD({
        Username: 'JamesHDev',
        Password: 'GoodTheOGYeet',
        Year: 2006,
        Month: 12,
        Day: 14,
        Email: 'soundmixerzzz@gmail.com'
    });

    Username.save()
    .then((result) =>{
        res.send(result)
    })
    .catch((err) => {
        console.log(err)
    })
})

*/



//REGISTRATION BACKEND CODE
app.post('/', (req, res) => {


 
    
    const Username = new UD({
        username: req.body.username,
        NewPass: req.body.NewPass,
        year: req.body.year,
        month: req.body.month,
        day: req.body.day,
        emailaddress: req.body.emailaddress,
        pfp: 'avatar.jpg',
        package: 'Free',
        verified: 'false',
    })
    if(req.body.month == 0){
        res.json({ message: 'Invalid Month' })
    }
    if(req.body.day == 'Day'){
        res.json({ message: 'Invalid Day' })
    }
    if(req.body.year == 'Year'){
        res.json({ message: 'Invalid Year' })
    }
    if(req.body.year >= 2011){
        res.json({ message: 'Too Young' })
    }
    if(req.body.emailaddress == ''){
        res.json({ message: 'Invalid Email Address' })
    }
    else if(req.body.month != 0 && req.body.day != 'Day' && req.body.year != 'Year'){
        
        UD.exists({
            username: req.body.username
        })
       .then((result) => {
        console.log(result)
        if(result == null){
            
            UD.exists({emailaddress: req.body.emailaddress})
            .then((result) => {
                if(result == null){
                    Username.save()
                    req.session.user = req.body.username
                    const transporter = nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                          user: "soundmixerzzz@gmail.com",
                          pass: "sbxl pajs moks arwu",
                        },
                      });


                      const mailOptions = {
                        from: '"SoundMixerz" <soundmixerzzz@gmail.com>',
                        to: req.body.emailaddress, // list of receivers
                        subject: 'Hello, ' + req.body.username + ' Welcome To SoundMixerz!', // Subject line
                        text: "Hello, " + req.body.username + ' We are super glad you decided to join SoundMixerz \n' +
                        '\n' +
                        'If you have not Signed Up to join SoundMixerz.com then let us know by emailing us back \n' + 
                        '\n' +
                        'If you experience any issues or problems with SoundMixerz you can email us using this Email \n' +
                        '\n' +
                        'We hope you Enjoy SoundMixerz.com!' 
                      }


                      transporter.sendMail(mailOptions, function(err, val){
                        if(err){
                            console.log(err)
                        }
                        else{
                            console.log('Success')
                        }
                    })
                    res.json({ message: 'Created Account' })
                }
                else{
                    res.json({ message: 'Email Already In Use' })
                }
            })
        }
        else{
            res.json({ message: 'Username Taken' })
            console.log('username taken')
        }
       })
       .catch((err) => {
        console.log(err)
        console.log("There was an Error")
       })
    }
    




})




//LOGIN BACKEND CODE
app.post('/account', (req, res) => {

    const username = req.body.username
    const NewPass = req.body.NewPass
    UD.exists({username: username})
    .then((result) => {
        if(result == null){
            
    res.json({ message: "Username does not exist"})
        }
        else{
            const user = result
            UD.findById(user)
            .then((result) => {
                if(result.NewPass == NewPass){
                    req.session.user = username
                    res.json({ message: 'Correct Login' })
                }
                else{
                    res.json({ message: 'Incorrect Password'})
                }
            })
        }
    })
    .catch((err) => {
        console.log(err)
        console.log("There was an Error")
    })
 
})



app.post('/SellBeat',upload.single('audioFile'), async (req, res) => {

   


    const beatname = req.body.beatname
    const beatlen = beatname.length
    const price = req.body.pob
    const BPM = req.body.BPM
    let regex = /[a-zA-Z]/
    let fg = 0

    if(regex.test(price)){
        res.json({ message: 'Price Contains Letters' })
        return;
    }

    if(regex.test(BPM)){
        res.json({ message: 'BPM Contains Letters' })
        return;
    }
    
    
    if(beatlen > 25){
        res.json({ message: 'Too Long' })
        return;

    }

    const username = req.session.user
try{
    const UserRes = await UD.exists({username: username})

        console.log(UserRes)
    

        const Lurks = await UD.findById(UserRes)

        if(Lurks.verified !== 'true'){
            res.json({message: "Not Verified"})
            return;
        }
        
            
            const now = new Date()
            
            const Day = now.getDate()
            const startOfDay = new Date(now.setHours(0, 0, 0, 0));
    const endOfDay = new Date(now.setHours(23, 59, 59, 999));

            console.log(Day)

            if(Lurks.package == 'Free'){
                const Date1 = await TB.find({createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }}).select('user')
            
                    var FreeUP = 0
                    console.log(Date1)
                    const values = Date1.map(doc => doc.user);

                    for(let i = 0; i<values.length;i++){
                        if(values[i] == username){
                            console.log('ALREADY UPLOADED A BEAT TODAY')
                            FreeUP++
                        }
                    }

                    if(FreeUP >= 3){
                        res.json({ message: 'Already Uploaded A Beat'})
                        return;
                    }
                    

            
            }

            if(Lurks.package == 'Basic'){
                const Date2 = await TB.find({createdAt: {
                    $gte: startOfDay,
                    $lte: endOfDay
                }}).select('user')
         
                    var BasicUP = 0
                    console.log(Date2)
                    const values = Date2.map(doc => doc.user);

                    for(let i = 0; i<values.length;i++){
                        if(values[i] == username){
                            console.log('ALREADY UPLOADED A BEAT TODAY')
                            BasicUP++
                        }
                    }
 



                    if(BasicUP >= 10){
                        res.json({ message: 'Already Uploaded 3 Beat'})
                        return;
                    }
                    
            
            }

            if(Lurks.package == 'Pro'){
               console.log('PRO PACKAGE USER')

            }

    
        }catch(err){
            console.log(err)
        }

   

//Saving a beat to the database
    const TrackBeat = new TB({
        user: req.session.user,
    })
    TrackBeat.save()
    .then((result) => {
        console.log(result)
    })
    .catch((err) => {
        console.log(err)
    })
    const Beat = new BT({
        username: req.session.user,
        file: req.file.filename,
        src: req.body.src,
        BPM: req.body.BPM,
        beatname: req.body.beatname,
        pob: req.body.pob,
        tag1: req.body.tag1,
        tag2: req.body.tag2,
        tag3: req.body.tag3,
        description: req.body.desc,
    })

    try {
        // Save to MongoDB
        const savedData = await Beat.save();
        console.log(savedData)
        res.json({ message: 'Uploaded Beat'})
        return;
    } catch (err) {
        res.json({ message: 'An Error Has Occured' })
        return;
    }


})


app.get('/Sellingform', (req, res) => {


    Noti.find().sort({ createdAt: -1 })

    .then((result) => {
        const Noti = result
        SC.find()
        .then((result) => {
            const Orders = result
            User = req.session.user
            UD.find()
            .then((result) => {
                const UD = result
                res.render('SellForm',{ Noti, User, Orders, UD })
            })
          
          } )
       
       

    })
   .catch((err) => {
    console.log(err)
   })
})


app.post('/Music-Mixing', upload.single('audioUpload'), async (req, res) => {
   
if(req.session.user == undefined){
    res.redirect('/Log-in')
}

const audioFile = req.file
console.log(audioFile.path)


const fileName = audioFile.filename
const filePath = audioFile.path



    const Mixing = new MM({
        user: req.session.user,
        file: req.file.filename,
        genre: req.body.genre,
        context: req.body.context,
        WhichPack: req.body.WhichPack,
    })
   
    Mixing.save()
    .then((result) => {
        console.log(result)
        UD.exists({username: req.session.user})
        .then((result) => {
            const ID = result
            UD.findById(ID)
            .then((result) => {
                console.log(result)
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                      user: "soundmixerzzz@gmail.com",
                      pass: "sbxl pajs moks arwu",
                    },
                  });
            
            
                  const mailOptions = {
                    from: '"SoundMixerz" <soundmixerzzz@gmail.com>',
                    to: "Sameboy2055@gmail.com", // list of receivers
                    subject: req.session.user + " Bought " +req.body.WhichPack, // Subject line
                    text: "New Music Mixing Order, From User: " + req.session.user + "\n\n" + 
                    "For Genre He Selected: " + req.body.genre + "\n\n" + 
                    "He Specifically asked For: " + req.body.context + "\n\n" +
                    "He Ordered The: " + req.body.WhichPack + '\n\n' + 
                    "His Email is: " + result.emailaddress + '\n\n' +
                    "The File name is: " + req.file.filename,
                    attatchments: [
                        {
                            filename: fileName,
                            path: filePath,
                        }
                    ]
                  }
                  
                  transporter.sendMail(mailOptions, function(err, val){
                    if(err){
                        console.log(err)
                    }
                    else{
                        res.json({message: 'Success'})
                    }
            })
            
        })
       
          })
            
          
    })
    .catch((err) => {
        console.log(err)
        res.redirect('/Log-in')
    })
   
})



app.get('/parse', (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    res.json({message: 'Success'})
    
})


app.post('/Presets/Joji', (req, res) => {

    
    const JR = new JojiREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    JR.save()
    .then((result) => {
        JojiREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

            Noti.find().sort({ createdAt: -1 })
        
            .then((result) => {
                User = req.session.user
                res.redirect('/Presets/BrysonTiller')
        
            })
           .catch((err) => {
            console.log(err)
           })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})


app.post('/Presets/BabyKeem', (req, res) => {

    
    const R = new REV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    R.save()
    .then((result) => {
        REV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

            Noti.find().sort({ createdAt: -1 })
        
            .then((result) => {
                User = req.session.user
                res.redirect('/Presets/FrankOcean')
        
            })
           .catch((err) => {
            console.log(err)
           })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})

app.post('/Presets/BrentFaiyaz', (req, res) => {

    
    const BFR = new BrentFaiyazREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    BFR.save()
    .then((result) => {
        BrentFaiyazREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/BrentFaiyaz')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})


app.post('/Presets/DonToliver', (req, res) => {

    
    const DTR = new DonToliverREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    DTR.save()
    .then((result) => {
        DonToliverREV.find().sort({ createdAt: -1 })
        .then((result) => {
            const Reviews = result

            Noti.find().sort({ createdAt: -1 })
        
            .then((result) => {
                User = req.session.user
                res.redirect('/Presets/DonToliver')
        
            })
           .catch((err) => {
            console.log(err)
           })
            
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})



app.post('/Presets/LilBaby', (req, res) => {

    
    const LBR = new LilBabyREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    LBR.save()
    .then((result) => {
        LilBabyREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/Autumn!')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})



app.post('/Presets/LilTjay', (req, res) => {

    
    const LTR = new LilTjayREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    LTR.save()
    .then((result) => {
        LilTjayREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

            Noti.find().sort({ createdAt: -1 })
        
            .then((result) => {
                User = req.session.user
                res.redirect('/Presets/LilTjay')
        
            })
           .catch((err) => {
            console.log(err)
           })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})


app.post('/Presets/PlayBoiCarti', (req, res) => {

    
    const PBR = new PlayBoiCartiREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    PBR.save()
    .then((result) => {
        PlayBoiCartiREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

            Noti.find().sort({ createdAt: -1 })
        
            .then((result) => {
                User = req.session.user
                res.redirect('/Presets/PlayBoiCarti')
        
            })
           .catch((err) => {
            console.log(err)
           })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})

app.delete('/DelFav/:id', (req, res) => {

    const ID = req.params.id

    FV.findByIdAndDelete(ID)
    .then((result) => {
        res.json({ message: 'Deleted Fav'})
    })
    .catch((err) => {
        console.log('ERROR: ' + err)
    })
})


app.post('/Presets/TheWeeknd', (req, res) => {

    
    const TWR = new TheWeekndREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    TWR.save()
    .then((result) => {
        TheWeekndREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/TheWeeknd')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})


app.post('/Presets/ToryLanez', (req, res) => {

    
    const TRR = new ToryLanezREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    TRR.save()
    .then((result) => {
        ToryLanezREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

            Noti.find().sort({ createdAt: -1 })
        
            .then((result) => {
                User = req.session.user
                res.redirect('/Presets/ToryLanez')
        
            })
           .catch((err) => {
            console.log(err)
           })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})


app.post('/Presets/TravisScott', (req, res) => {

    
    const TSR = new TravisScottREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    TSR.save()
    .then((result) => {
        TravisScottREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/TravisScott')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})



app.post('/Presets/TylerTheCreator', (req, res) => {

    
    const TCR = new TylerTheCreatorREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    TCR.save()
    .then((result) => {
        TylerTheCreatorREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/DestroyLonely')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})



app.post('/Presets/Yeat', (req, res) => {

    
    const YR = new YeatREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    YR.save()
    .then((result) => {
        YeatREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/KenCarson')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})

app.post('/Presets/PostMalone', (req, res) => {

    
    const PM = new PostMaloneREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    PM.save()
    .then((result) => {
        PostMaloneREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/PostMalone')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})


app.post('/Presets/SoFaygo', (req, res) => {

    
    const SF = new SoFaygoREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    SF.save()
    .then((result) => {
        SoFaygoREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/SoFaygo')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})


app.post('/Presets/TheKidLaroi', (req, res) => {

    
    const TKL = new TheKidLaroiREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    TKL.save()
    .then((result) => {
        TheKidLaroiREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/TheKidLaroi')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})


app.post('/Presets/TrippieRedd', (req, res) => {

    
    const TR = new TrippieReddREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    TR.save()
    .then((result) => {
        TrippieReddREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/TrippieRedd')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})


app.post('/Presets/TyDollaSign', (req, res) => {

    
    const TDS = new TyDollaSignREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    TDS.save()
    .then((result) => {
        TyDollaSignREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/LilUziVert')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})




app.post('/Presets/YNWMelly', (req, res) => {

    
    const YNW = new YNWMellyREV({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    YNW.save()
    .then((result) => {
        YNWMellyREV.find().sort({ createdAt: -1 })
        .then((result) => {

            const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            User = req.session.user
            res.redirect('/Presets/YNWMelly')
    
        })
       .catch((err) => {
        console.log(err)
       })
        })
        .catch((err) => {
            console.log(err)
        })
        
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })

})

//Routing

app.get('/', (req, res) =>{


    Noti.find().sort({ createdAt: -1 })
    
    .then((result) => {
        const Noti = result
        SC.find()
        .then((result) => {
            const Orders = result
        User = req.session.user
        UD.find()
        .then((result) => {
            const UD = result
            res.render('index',{ User, Orders, Noti, UD })

        })
      
    })
    })
   .catch((err) => {
    console.log(err)
   })
  
})


app.get('/presets', (req, res) =>{
REV.find().sort({createdAt: -1})
.then((result) => {
    const BabyKeem = result

    LilBabyREV.find().sort({createdAt: -1})
    .then((result) => {
        const LilBaby = result

        BrentFaiyazREV.find().sort({createdAt: -1})
        .then((result) => {
            const BrentFaiyaz = result

            DonToliverREV.find().sort({createdAt: -1})
            .then((result) => {
                const DonToliver = result

                LilTjayREV.find().sort({createdAt: -1})
                .then((result) => {
                    const LilTjay = result

                    PlayBoiCartiREV.find()
                    .then((result) => {
                        const PlayBoiCarti = result

                        TheWeekndREV.find()
                        .then((result) => {
                            const TheWeeknd = result

                            ToryLanezREV.find()
                            .then((result) => {
                                const ToryLanez = result

                                TravisScottREV.find()
                                .then((result) => {
                                    const TravisScott = result

                                    TylerTheCreatorREV.find()
                                    .then((result) => {
                                        const TylerTheCreator = result

                                        YeatREV.find()
                                        .then((result) => {
                                            const Yeat = result

                                            JojiREV.find()
                                            .then((result) => {
                                                const Joji = result

                                                PostMaloneREV.find()
                                                .then((result) => {
                                                    const PostMalone = result

                                                    SoFaygoREV.find()
                                                    .then((result) => {
                                                        const SoFaygo = result

                                                        TheKidLaroiREV.find()
                                                        .then((result) => {
                                                            const TheKidLaroi = result

                                                            TrippieReddREV.find()
                                                            .then((result) => {
                                                                const TrippieRedd = result

                                                                TyDollaSignREV.find()
                                                                .then((result) => {
                                                                    const TyDollaSign = result

                                                                    YNWMellyREV.find()
                                                                    .then((result) => {
                                                                        const YNWMelly = result


                                                                        UD.find()
                                                                        .then((result) => {
                                                                            const UD = result

                                                                            Noti.find().sort({ createdAt: -1 })
    
                                                                        

                                                                            .then((result) => {
                                                                                const Noti = result
                                                                                SC.find()
                                                                                .then((result) => {
                                                                                    const Orders = result
                                                                                    User = req.session.user
                                                                                res.render('Presets',
                                                                                    { User,
                                                                                         Noti,
                                                                                          Orders,
                                                                                           LilBaby, 
                                                                                           BabyKeem, 
                                                                                           BrentFaiyaz, 
                                                                                           DonToliver, 
                                                                                           LilTjay, 
                                                                                           PlayBoiCarti, 
                                                                                           TheWeeknd, 
                                                                                           ToryLanez, 
                                                                                           TravisScott, 
                                                                                           TylerTheCreator, 
                                                                                           Yeat, 
                                                                                           Joji, 
                                                                                           PostMalone, 
                                                                                           SoFaygo, 
                                                                                           TheKidLaroi,
                                                                                           TrippieRedd,
                                                                                           TyDollaSign,
                                                                                           YNWMelly,
                                                                                           UD
                                                                                         })
                                                                                })
                                                                                .catch((err) => {
                                                                                    console.log(err)
                                                                                })
                                                                        })
                                                                       
                                                                    })



                                                                   
                                                                })





                                                                
                                                            })

                                                            
                                                       
                                                        })
                                                    



                                                    })
                                                   
                                                })

                                                

    })
   .catch((err) => {
    console.log(err)
   })
                                            })
                                        })
                                    })
                                })
                            })
                        })
                    })
                })
            })
        })
        
})
    
  
})

})


app.get('/beats', async (req, res) =>{
const max = undefined
const min = undefined
const Susername = undefined
const Favs = undefined

const page = parseInt(req.query.page) || 1
console.log(page)
const limit = 22;
const skip = (page - 1) * limit;
const totalCount = await BT.countDocuments();
try{
    const Beats = await BT.aggregate([ { $sample: { size: totalCount } }, { $skip: (page - 1) * limit }, { $limit: limit } ]);
  
    const Beat = await BT.find().sort({ createdAt: -1 })
        const count = await BT.countDocuments()
        const Notis = await Noti.find().sort({ createdAt: -1 })
        const Orders = await SC.find()
        const FVs = await FV.find().sort({ createdAt: -1 })
        const UDs = await UD.find()
        const Counts = await FV.aggregate([
            {
                $group: {
                  _id: '$ID',
                  count: { $sum: 1 }
                }
              },
              {
                $sort: { count: -1 }
              },
              {
                $limit: 5
              }
        ]);
        
        

         User = req.session.user
         res.render('Beats',{BT: Beats,BTs: Beat, UD: UDs,  Count: Counts, current: page,Favs, pages: Math.ceil(count / limit), Noti: Notis, FV: FVs,User, max, min, Susername, Orders })
}catch (err){
console.log(err + 'ERROR FOUND')

}
   
    

})



app.get('/DrumKits', (req, res) => {

    Noti.find().sort({ createdAt: -1 })
    .then((result) => {
        const Noti = result
        User = req.session.user
        SC.find()
        .then((result) => {
            const Orders = result
            UD.find()
            .then((result) => {
                const UD = result
                DKO.find().sort({ createdAt: -1 })
                .then((result) => {
                    const DrumKitRev = result
                    res.render('Drumkit',{ Noti, User, Orders, UD, DKO: DrumKitRev })
                })
                
            })
            

        })
       

    })
   .catch((err) => {
    console.log(err)
   })

})

app.get('/DrumKits/SoundMixerzDrumKit1', (req, res) => {

    Noti.find().sort({ createdAt: -1 })
    .then((result) => {
        const Noti = result
        User = req.session.user
        SC.find()
        .then((result) => {
            const Orders = result
            UD.find()
            .then((result) => {
                const UD = result
                DKO.find().sort({ createdAt: -1 })
                .then((result) => {
                    const DrumKitRev = result
                res.render('DrumKitPage1',{ Noti, User, Orders, UD, DKO: DrumKitRev })

                })
             
            })
            

        })
       

    })
   .catch((err) => {
    console.log(err)
   })


})

app.post('/DrumKits1/Reviews', (req, res) => {


    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }

    const DrumKitRev = new DKO({
        username: req.session.user,
        rating: req.body.rating,
        review: req.body.review,
    })
    DrumKitRev.save()
    .then((result) => {
        console.log(result)
        res.redirect('/DrumKits/SoundMixerzDrumKit1')
    })
    .catch((err) => {
        console.log(err)
    })





})

app.get('/DrumKits/SoundMixerzDrumKit2', (req, res) => {

    res.send('Coming Soon!')

})

app.get('/Music-Mixing', (req, res) =>{

    Noti.find().sort({ createdAt: -1 })
    .then((result) => {
        const Noti = result
        User = req.session.user
        SC.find()
        .then((result) => {
            const Orders = result
            UD.find()
            .then((result) => {
                const UD = result
                res.render('Music-Mixing',{ Noti, User, Orders, UD })
            })
            

        })
       

    })
   .catch((err) => {
    console.log(err)
   })
    
})

app.get('/Account', (req, res) => {

    UD.exists({username: req.session.user})
    .then((result) => {
        ID = result
        if(ID == null){
            res.redirect('/Log-In')
        }
        UD.findById(ID).
        then((result) => {
            const UDs = result
          const Email = result.emailaddress
          const Day = result.day
          const month = result.month
          const year = result.year
          const package = result.package
          const verified = result.verified
          Noti.find().sort({ createdAt: -1 })
    
          .then((result) => {
            const Noti = result
              User = req.session.user
              SC.find()
              .then((result) => {
                  const Orders = result
                  UD.find()
                  .then((result) => {
                    const UD = result
                    res.render('account',
                        {username: req.session.user,
                            day: Day,
                        email: Email,
                        month: month,
                        year: year,
                        Noti,
                        package,
                        User,
                        Orders,
                        UDs: UDs,
                        UD,
                        verified
                    } )
          
                  })
                  
              })
      
          })
         .catch((err) => {
          console.log(err)
         })
        })
        .catch((err) => {
            console.log(err)
        })

    })
    
    .catch((err) => {
        console.log(err)
    })
   
    

})

app.get('/Account/Withdraw', (req, res) => {
    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }
    SB.find().sort({ createdAt: -1 })
    .then((result) => {
        const ToTSB = result
        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
              .then((result) => {
                  const Orders = result
                  User = req.session.user
                  UD.find()
                  .then((result) => {
                    const UD = result
                    res.render('Withdraw',{ Noti, User, SB: ToTSB, Orders, UD })
                  })
                 
                } )
            
    
        })
        .catch((err) => {
            console.log(err)
        })
    })
   
   .catch((err) => {
    console.log(err)
   })

})


app.get('/account/logout', (req, res) => {
    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }
    SB.find().sort({ createdAt: -1 })
    .then((result) => {
        const ToTSB = result
        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('Logout',{ Noti, User, SB: ToTSB, Orders, UD })
                })
                
              } )
            
            
    
        })
        .catch((err) => {
            console.log(err)
        })
    })
   
   .catch((err) => {
    console.log(err)
   })

})

app.get('/account/paymenthistory', (req, res) => {
    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }
    SB.find().sort({ createdAt: -1 })
    .then((result) => {
        const Beat = result
        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                BV.find().sort({ createdAt: -1 })
                .then((result) => {
                    const BoughtVP = result
                    MM.find().sort({ createdAt: -1 })
                    .then((result) => {
                        const MusicMixing = result
                        OD.find().sort({ createdAt: -1 })
                        .then((result) => {
                            const BeatOD = result
                            UD.find()
                            .then((result) => {
                                const UD = result
                                BDK.find().sort({ createdAt: -1 })
                                .then((result) => {
                                    const BDK = result
                                    res.render('PaymentHistory',{ Noti, BDK,  UD, BeatOD, User, SB: Beat, Orders, BoughtVP, MusicMixing })
                                })
                       

                            })
                      

                        })
                       
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
              } )
           
    
        })
        .catch((err) => {
            console.log(err)
        })
    })
   
   .catch((err) => {
    console.log(err)
   })
})

app.get('/account/purchases', (req, res) => {
    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }
    else{
    DB.find().sort({ createdAt: -1 })
    .then((result) => {
        const Beat = result
        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                BV.find().sort({ createdAt: -1 })
                .then((result) => {
                    const BoughtVP = result
                    MM.find().sort({ createdAt: -1 })
                    .then((result) => {
                        const MusicMixing = result
                        UD.find()
                        .then((result) => {
                            const UD = result
                            SB.find().sort({ createdAt: -1 })
                            .then((result) => {
                                const SMM = result
                        res.render('Purchases',{ Noti, User,SMM, UD, SB: Beat, Orders, BoughtVP, MusicMixing })

                            })
                        

                        })
                       
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
              } )
           
    
        })
        .catch((err) => {
            console.log(err)
        })
    })
   
   .catch((err) => {
    console.log(err)
   })
}
})


app.get('/account/SellersProfile', (req, res) => {

    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }
    else{
        BT.find().sort({ createdAt: -1 })
        .then((result) => {
            const Beats = result
            Noti.find().sort({ createdAt: -1})
            .then((result) => {
                const Noti = result
                SC.find()
                .then((resut) => {
                    const Orders = result
                    const User = req.session.user
                    UD.find()
                    .then((result) => {
                        const UD = result
                    res.render('SellerProfile', {Noti, Orders, User,UD, BT: Beats})

                    })
                   
        })
   
    
})
    })

}
})


app.get('/account/Display', (req, res) => {

    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }
    else{
        BT.find().sort({ createdAt: -1 })
        .then((result) => {
            const Beats = result
            Noti.find().sort({ createdAt: -1})
            .then((result) => {
                const Noti = result
                SC.find()
                .then((resut) => {
                    const Orders = result
                    const User = req.session.user
                    UD.find()
                    .then((result) => {
                        const UD = result
                    res.render('Display', {Noti, Orders, User,UD, BT: Beats})

                    })
                   
        })
   
    
})
    })

}

})





//SKULLY'S MM ORDERS
app.get('/account/awpdijowofihweojfwoeugwoiejfklshfomevjdswldenfpa', (req, res) => {

if(req.session.user !== 'SkullyFresh'){
    res.redirect('/Log-in')
}
Noti.find().sort({ createdAt: -1})
.then((result) => {
    const Noti = result
    SC.find()
    .then((result) => {
        const Orders = result
        MM.find().sort({ createdAt: 1})
        .then((result) => {
            const MM = result
            UD.find()
            .then((result) => {
                const UD = result
                res.render('Orders', {Noti, Orders, MM, UD})

            })
    

        })
     
    })
    
})


})

//SKULLY'S MM PENDING ORDERS

app.get('/account/awpdijowofihweojfwoeugwoiejfklshfomevjdswldenfpa/akehdkjhkjfhjhdhj', (req, res) => {

    if(req.session.user !== 'SkullyFresh'){
        res.redirect('/Log-in')
    }
    Noti.find().sort({ createdAt: -1})
    .then((result) => {
        const Noti = result
        SC.find()
        .then((result) => {
            const Orders = result
            PD.find().sort({ createdAt: 1})
            .then((result) => {
                const MM = result
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('OrdersPending', {Noti, Orders, MM, UD})
    
                })
        
    
            })
         
        })
        
    })
    
    
})

//SKULLY'S COMPLETED ORDERS
app.get('/account/awpdijowofihweojfwoeugwoiejfklshfomevjdswldenfpa/aaspaskodkasjdhasdjtsfted', (req, res) => {

        if(req.session.user !== 'SkullyFresh'){
            res.redirect('/Log-in')
        }
        Noti.find().sort({ createdAt: -1})
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                CM.find().sort({ createdAt: 1})
                .then((result) => {
                    const MM = result
                    UD.find()
                    .then((result) => {
                        const UD = result
                        res.render('OrdersCompleted', {Noti, Orders, MM, UD})
        
                    })
            
        
                })
             
            })
            
        })
        
        
})

//JAMESHDEV's REPORTS

app.get('/account/alwioudhfbuefoipnawsedpoqawopidsdwdawdjkhwa', (req, res) => {

if(req.session.user !== 'JamesHDev'){
    res.redirect('/Log-in')
}

Noti.find().sort({ createdAt: -1})
.then((result) => {
    const Noti = result
    SC.find()
    .then((result) => {
        const Orders = result
        RP.find().sort({ createdAt: 1})
        .then((result) => {
            const RP = result
            BT.find()
            .then((result) => {
                const BT = result
                UD.find()
                .then((result) => {
                    const UD = result
                res.render('Reports', {Noti, Orders, RP, BT, UD})

                })
               

            })
    

        })
     
    })
    
})




})

app.get('/account/sdukfgsefopiwsyudopeduqweslkjfjhseuifphoisea', (req, res) => {

if(req.session.user !== 'SoundMixerz'){
        res.redirect('/Log-in')
}

Noti.find().sort({ createdAt: -1})
.then((result) => {
    const Noti = result
    SC.find()
    .then((result) => {
        const Orders = result
        UD.find()
                .then((result) => {
                    const UD = result
                    res.render('Emails', {Noti, Orders, UD})
                })


    })

})


})

app.post('/SendMusicBackToUserKJSNDKJSDNKJSksdfndskSKDJFskdnf/:id',upload.single('audioFile'), async (req, res) => {

    const ID = req.params.id
    const filename = req.file.filename
    const Pending = await PD.findById(ID)
   console.log(Pending.user)
   console.log(filename)

    const Completed = new CM ({
        user: Pending.user,
        genre: Pending.genre,
        context: Pending.context,
        WhichPack: Pending.WhichPack,
    })
    Completed.save()
    .then((result) => {
        console.log(result)
        console.log('Completed Music Mixing Order')
    })


   const Purchase = new DB({
        UserCurr: Pending.user,
        bomm: 2,
        NameFile: filename,

   })
   Purchase.save()
  

const user = Pending.user
const UserID = await UD.exists({username: user})
const UserInfo = await UD.findById(UserID)
const Email = UserInfo.emailaddress







 const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "soundmixerzzz@gmail.com",
          pass: "sbxl pajs moks arwu",
        },
      });
      const mailOptions = {
        from: '"SoundMixerz" <soundmixerzzz@gmail.com>',
        to: Email,
        subject: "Your Music Has Been Mixed!",
        text: "Hello " + user + " Your Music has been Successfully Mixed!" + "\n\n" +  
        "Follow these Steps to Download your Mixed Music \n\n" + 
        "1.) Please Go To SoundMixerz.com and log into your account" + "\n\n" + 
        "2.) Then go to the account tab and then go to purchases" + "\n\n" + 
        "3.) Finally, you will see your Mixed Music ready to be downloaded, Enjoy!",
      }
      transporter.sendMail(mailOptions, function(err, val){
        if(err){
            console.log(err)
        }
        else{
            console.log(i)
            console.log('Sent Email Out!')
         
        }
    
    })




    const Delete = await PD.findByIdAndDelete(ID)
    console.log(Delete)
    console.log('DELETED PENDING ORDER')
    
   


    res.redirect('/account/awpdijowofihweojfwoeugwoiejfklshfomevjdswldenfpa/akehdkjhkjfhjhdhj')



})

//ANALYTICS

app.get('/account/klsddgfjksuFDKHGkjshdkjsFDRYWpljehbdwpeoriufjdks', (req, res) => {

    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }
    if(req.session.user !== "SoundMixerz" && req.session.user !== "JamesHDev" && req.session.user !== "SkullyFresh"){
        res.redirect('/Log-in')
    }
    SB.find().sort({ createdAt: -1 })
    .then((result) => {
        const Beat = result
        Noti.find().sort({ createdAt: -1 })
     
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                BV.find().sort({ createdAt: -1 })
                .then((result) => {
                    const BoughtVP = result
                    MM.find().sort({ createdAt: -1 })
                    .then((result) => {
                        const MusicMixing = result
                        OD.find().sort({ createdAt: -1 })
                        .then((result) => {
                            const BeatOD = result
                            UD.find()
                            .then((result) => {
                                const UD = result
                        res.render('Analytics',{ Noti, UD, BeatOD, User, SB: Beat, Orders, BoughtVP, MusicMixing })

                            })
                      

                        })
                       
                    })
                    .catch((err) => {
                        console.log(err)
                    })
                })
                .catch((err) => {
                    console.log(err)
                })
              } )
           
    
        })
        .catch((err) => {
            console.log(err)
        })
    })
   
   .catch((err) => {
    console.log(err)
   })


})

app.post('/SendMail', async (req, res) => {

console.log(req.body)
try{
const EmailSubject = req.body.EmailSubject
const EmailMessage = req.body.EmailMessage
const UserData = await UD.find({}).select('emailaddress')
const emails = UserData.map(doc => doc.emailaddress);
console.log(emails)
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: "soundmixerzzz@gmail.com",
          pass: "sbxl pajs moks arwu",
        },
      });
      const mailOptions = {
        from: '"SoundMixerz" <soundmixerzzz@gmail.com>',
        bcc: emails, // list of receivers
        subject: EmailSubject,
        text: EmailMessage,
      }
      transporter.sendMail(mailOptions, function(err, val){
        if(err){
            console.log(err)
        }
        else{
            console.log(i)
            console.log('Sent Email Out!')
         
        }
    
    })





} catch(err){
    console.log(err)
}
    const SendMail = new ES ({
        EmailSubject: req.body.EmailSubject,
        EmailMessage: req.body.EmailMessage,
    })
    SendMail.save()
    .then((result) => {
        console.log(result)
        res.json({message: 'Email Sent'})
    })
    .catch((err) => {
        console.log(err)
    })


})

app.delete('/MMOR/:id', (req, res) => {
    const ID = req.params.id
    MM.findById(ID)
    .then((result) => {
          let filename = result.file
        const filePath = `public/BeatsUploaded/${filename}`
        const Pending = new PD ({
            user: result.user,
            genre: result.genre,
            context: result.context,
            WhichPack: result.WhichPack,
        })
        Pending.save()
        .then((result) => {
            console.log(result)
        })
       
      

        fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete the file' })
      return;
    }
    console.log(`File ${filename} has been deleted`);
    MM.findByIdAndDelete(ID)
    .then((result) => {
        res.json({ message: `File Deleted` });
    })

    })
})
})


app.delete('/DeleteBeat/:id', async (req, res) => {

const ID = req.params.id
console.log(ID)
try{
    const result = await BT.findById(ID)
        console.log(result)
        const img = result.src
        const file = result.file
        const imgPath = `public/BeatsUploaded/${img}`
        const filePath = `public/BeatsUploaded/${file}`
        console.log(filePath)
        fs.unlink(filePath, (err) => {
            if(err){
                console.log(err)
            }
            else{
                console.log('AUDIO FILE WAS DELETED')
            }
        
        })
        if(img !== 'NoImg.jpg'){
            fs.unlink(imgPath, (err) => {
                if(err){
                    console.log(err)
                }
                else{
                    console.log('IMAGE FILE WAS DELETED')
                }

            })
        }

        const DelBeat = await BT.findByIdAndDelete(ID)
        console.log(DelBeat + ' RIGHT HERE BRO')
        console.log('DELETED THE BEAT BRO')
        const ReportDels = await RP.deleteMany({ BTid: ID });
        const FavsDel = await FV.deleteMany({ ID: ID });
        console.log('DELETED ALL REPORTS')
        res.json({ message: 'File Deleted' })
        

}catch(err){
    console.log(err)
}
})

/*
//FINDING A SINGLE PROFILE BY USERNAME
app.get('/singleProfile', (req, res) => {

    UD.find({
        username:req.session.user
})
.then((result) => {
    res.send(result)
})
.catch((err) => {
    console.log(err)
})

})
*/



app.get('/shopping-cart', (req, res) =>{

    SC.find().sort({createdAt: -1})
    .then((result) => {
        const Orders = result
            Noti.find().sort({ createdAt: -1 })
    
            .then((result) => {
                const Noti = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                res.render('shopping-cart',{Noti, User, Orders, UD})

                })
              

            })
            .catch((err) => {
                console.log(err)
            })
    })
})



app.delete('/shoppingcart/:id', (req, res) => {

    const ID = req.params.id

    SC.findByIdAndDelete(ID)
    .then(result => {
        res.json({ redirect: '/shopping-cart' })
    })
    .catch((err) => {
        console.log(err)
    })

})



app.get('/shoppingcart', (req, res) => {

    res.redirect('/shopping-cart')

})

app.post('/addSC', (req, res) => {



const ShopCart = new SC({
    user: req.session.user,
    VocalPreset: req.body.VocalPreset,
    DAW: req.body.DAW,
    price: req.body.price,
    src: req.body.src,
    bomm: req.body.bomm,
    SCNum: req.body.SCNum,
})

    if(req.body.user == ''){
       res.json({ message: 'hi'})
    }
    if(req.body.DAW == ''){
        res.json({ message: 'Please Select a DAW'})
    }
    ShopCart.save()
    .then((result) => {
        res.json({ message: 1})
    })
    .catch((err) => {
        console.log(err)
    })

    /*
    if(req.body.DAW == ''){
        res.redirect('/presets')
    }
    else{
        if(req.body.price == ''){
            res.redirect('/presets')
        }
        else{
            const Shop = new SC(req.body)

            Shop.save()
            .then((result) => {
                console.log(result)
                res.redirect('/Presets')
            })
            .catch((err) => {
                console.log(err)
                res.redirect('/Log-in')
            })
        }
    }
        */
    
})


//LOGIN DIRECTORIES

app.get('/Log-in', (req, res) =>{

    res.render('Log-in')
  
})


//Redirects

app.get('/login', (req, res) => {


    res.redirect('/Log-in')

})



app.get('/Registration', (req, res) =>{

  res.render('Registration-page')
  
})



//Preset Pages

app.get('/Presets/FrankOcean', (req, res) =>{
    
    REV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result
      
        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
            res.render('FrankOcean',{ Noti, User,UD, REV: Reviews, Orders })

                })
            
              } )
            
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })




   
})



app.get('/Presets/BrentFaiyaz', (req, res) =>{

    BrentFaiyazREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('Brentfaiyaz',{ Noti, User, BrentFaiyazREV: Reviews, Orders, UD })
                })
                
              } )
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })


   
})


app.get('/Presets/DonToliver', (req, res) =>{

    DonToliverREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('dontoliver',{ Noti,UD, User, DonToliverREV: Reviews, Orders })
                })
            
              } )
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
   
})

app.get('/Presets/BrysonTiller', (req, res) =>{

    JojiREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('BrysonTiller',{ Noti, User, JojiREV: Reviews, Orders, UD })
                })
               
              } )
            
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    
})



app.get('/Presets/Autumn!', (req, res) =>{

    LilBabyREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('Autumn',{ Noti, User, UD, LilBabyREV: Reviews, Orders })
                })
                
              } )
          
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    
})


app.get('/Presets/LilTjay', (req, res) =>{

    LilTjayREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('LilTjay',{ Noti, User, LilTjayREV: Reviews, Orders, UD })
                })
              
              } )
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    
})



app.get('/Presets/TheWeeknd', (req, res) =>{

    TheWeekndREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('TheWeekend',{ Noti, User, TheWeekndREV: Reviews, Orders, UD })
                })
           
              } )
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    
})


app.get('/Presets/ToryLanez', (req, res) =>{

   
    ToryLanezREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('ToryLanez',{ Noti, User, ToryLanezREV: Reviews, Orders, UD })
                })
                
              } )
          
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    
})


app.get('/Presets/TravisScott', (req, res) =>{

    TravisScottREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('TravisScott',{ Noti, User, TravisScottREV: Reviews, Orders, UD })
                })
             
              } )
          
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    
})


app.get('/Presets/DestroyLonely', (req, res) =>{

    TylerTheCreatorREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('DestroyLonely',{ Noti, User, TylerTheCreatorREV: Reviews, Orders, UD })
                })
           
              } )
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    
    })

})


app.get('/Presets/KenCarson', (req, res) =>{


    YeatREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('KenCarson',{ Noti, User,UD, YeatREV: Reviews, Orders })
                })
                
              } )
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    
})

app.get('/Presets/PlayBoiCarti', (req, res) =>{

    PlayBoiCartiREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('playboicarti',{ Noti, User, PlayBoiCartiREV: Reviews, Orders, UD })
                })
               
              } )
           
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    

})

app.get('/Presets/PostMalone', (req, res) =>{

    PostMaloneREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('PostMalone',{ Noti, User, PostMaloneREV: Reviews, Orders, UD })
                })
                
              } )
           
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    

})



app.get('/Presets/SoFaygo', (req, res) =>{

    SoFaygoREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('SoFaygo',{ Noti, User, SoFaygoREV: Reviews, Orders, UD })
                })
               
              } )
           
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    

})



app.get('/Presets/TheKidLaroi', (req, res) =>{

    TheKidLaroiREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('TheKidLaroi',{ Noti, User, TheKidLaroiREV: Reviews, Orders, UD })
                })
              
              } )
           
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    

})


app.get('/Presets/TrippieRedd', (req, res) =>{

    TrippieReddREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('TrippieRedd',{ Noti, User, TrippieReddREV: Reviews, Orders, UD })
                })
              
              } )
           
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    

})


app.get('/Presets/LilUziVert', (req, res) =>{

    TyDollaSignREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                    res.render('LilUziVert',{ Noti, User, TyDollaSignREV: Reviews, Orders, UD })
                })
                
              } )
           
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    

})



app.get('/Presets/YNWMelly', (req, res) =>{

    YNWMellyREV.find().sort({ createdAt: -1 })
    .then((result) => {

        const Reviews = result

        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                res.render('YNWMelly',{ Noti, User, YNWMellyREV: Reviews, Orders, UD })

                })
               
              } )
           
           
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    .catch((err) => {
        console.log(err)
    })
    

})


app.delete('/MMunlink/:id', (req, res) => {

console.log('Reached Music Mix Unlinked')

const ID = req.params.id

DB.findByIdAndDelete(ID)

.then((result) => {
    console.log(result)
    res.json({message: 'File Deleted'})
})


})

app.delete('/VPunlink/:id', (req, res) => {

    console.log('Reached Vocal Preset Unlink')

    const ID = req.params.id

    DB.findByIdAndDelete(ID)

    .then((result) => {
        console.log(result)
        res.json({message: 'File Deleted'})
    })

})


app.delete('/DKunlink/:id', (req, res) => {

    console.log('Reached Vocal Preset Unlink')

    const ID = req.params.id

    DB.findByIdAndDelete(ID)

    .then((result) => {
        console.log(result)
        res.json({message: 'File Deleted'})
    })

})



app.delete('/Unlink/:id', (req, res) => {

    const ID = req.params.id
console.log(ID)
   DB.findById(ID)
    .then((result) => {
        console.log(result.NameFile)
        const filename = result.NameFile
        if(result.src !== undefined){
            const imagefile = result.src
            const imgpath = `public/BeatsUploaded/${imagefile}`
            if(imagefile !== 'NoImg.jpg'){
                fs.unlink(imgpath, (err) => {
                    if (err) {
                      console.error(err);
                      res.status(500).json({ message: 'Failed to delete the file' });
                      return;
                    }
                })
            }
        }
        
        
        const filePath = `public/BeatsUploaded/${filename}`;
         
        

        fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      res.status(500).json({ message: 'Failed to delete the file' });
      return;
    }
    
    console.log(`File ${filename} has been deleted`);
    DB.findByIdAndDelete(ID)
    .then((result) => {
        res.json({ message: `File Deleted` });
    })



})
    })

})

app.post('/newFav', (req, res) => {


const user = req.body.user
const ID = req.body.id

console.log(req.body)

if(user == ''){
    res.json({message: 'Not Logged In'})
} else{
    const Favorites = new FV ({
        user: req.body.user,
        ID: req.body.id,
    })
    Favorites.save()
    .then((result) => {
        console.log(result._id)
        res.json({message: 'Favorited Beat', FVid: result._id})
    })
    .catch((err) => {
        res.redirect('/Log-in')
    })
}
})



    


app.get('/beats/:id', (req,res) => {
    const ID = req.params.id

   
        FV.find()
        .then((result) => {
            const FV = result
            BT.find().sort({ createdAt: -1 })
        .then((result) => {
            const ult = result
            BT.findById(ID)
            .then((result) => {
                const spec = result
                if(result.username == null){
                    res.redirect('/log-in')
                }
                speuser = result.username
               
                User = req.session.user
                Noti.find().sort({ createdAt: -1 })
        
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UDs = result
                    res.render('SellPage',{ Noti, UD: UDs, User, FV: FV,BTall: ult, BT: spec, User , title: speuser + "'s" + " Beats", Orders })
                })
               
              } )
            
    
        })
       .catch((err) => {
        console.log(err)
       })
            })
           
        })
        .catch((err) => {
            console.log(err)
        })
      
        
    
        })
 

   
    
})

app.get('/ReportBeat/:id', (req, res) => {

    const ID = req.params.id

   
        FV.find()
        .then((result) => {
            const FV = result
            BT.find().sort({ createdAt: -1 })
        .then((result) => {
            const ult = result
            BT.findById(ID)
            .then((result) => {
                const spec = result
                if(result.username == null){
                    res.redirect('/log-in')
                }
                speuser = result.username
               
                User = req.session.user
                Noti.find().sort({ createdAt: -1 })
        
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UDs = result
                    res.render('Report',{ Noti, UD: UDs, User, FV: FV,BTall: ult, BT: spec, User , title: speuser + "'s" + " Beats", Orders })
                })
               
              } )
            
    
        })
       .catch((err) => {
        console.log(err)
       })
            })
           
        })
        .catch((err) => {
            console.log(err)
        })
      
        
    
        })
 


})

app.post('/ReportBeatSubmit/:id', (req, res) => {

const reason = req.body.reason
console.log('reached bro')
if(reason == undefined){
    res.json({ message: 'No Reason Selected' })
    return;
}


const NewReport = new RP({
    reason: req.body.reason,
    ExtContext: req.body.ExtContext,
    BTid: req.body.BTid
})
NewReport.save()
.then((result) => {
    console.log(result)
    res.json({ message: 'Report Submitted' })
})
.catch((err) => {
    console.log(err)
})

})

app.get('/OtherBeats/:user', (req, res) => {

    const speuser = req.params.user

    FV.find()
    .then((result) => {
        const FV = result
        BT.find().sort({ createdAt: -1 })
    .then((result) => {
        const ult = result
        Noti.find().sort({ createdAt: -1 })
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UDs = result
                res.render('OtherBeats',{ Noti, UD: UDs,Auser: speuser, User, FV: FV,BTall: ult, User , title: speuser + "'s" + " Beats", Orders })

                })
               
              } )
            
    
        })
       .catch((err) => {
        console.log(err)
       })
    })
    
    
        })
       
})
const validateTimestamp = (req, res, next) => {
    console.log('Reached bro')
    const { lksjbdfkljlskdufhkjsdhflkihsdfkjyhgsdflihsedoiugfpos8eayfr9pawyerufgsiedhfsgdbjfhbsjxmgfiusegopfgsdufhksljdzgfblkjgszedfpihsaeifhksjldgfjkhgsadifugsaeldkjfghjskahdbgfjhgsaeiudfguisaedfsdbhjfblksjbdfkljlskdufhkjsdhflkihsdfkjyhgsdflihsedoiugfpos8eayfr9pawyerufgsiedhfsgdbjfhbsjxmgfiusegopfgsdufhksljdzgfblkjgszedfpihsaeifhksjldgfjkhgsadifugsaeldkjfghjskahdbgfjhgsaeiudfguisaedfsdbhjfb } = req.query;
        console.log('Timestamp: ' + lksjbdfkljlskdufhkjsdhflkihsdfkjyhgsdflihsedoiugfpos8eayfr9pawyerufgsiedhfsgdbjfhbsjxmgfiusegopfgsdufhksljdzgfblkjgszedfpihsaeifhksjldgfjkhgsadifugsaeldkjfghjskahdbgfjhgsaeiudfguisaedfsdbhjfblksjbdfkljlskdufhkjsdhflkihsdfkjyhgsdflihsedoiugfpos8eayfr9pawyerufgsiedhfsgdbjfhbsjxmgfiusegopfgsdufhksljdzgfblkjgszedfpihsaeifhksjldgfjkhgsadifugsaeldkjfghjskahdbgfjhgsaeiudfguisaedfsdbhjfb)
        const timestamp = lksjbdfkljlskdufhkjsdhflkihsdfkjyhgsdflihsedoiugfpos8eayfr9pawyerufgsiedhfsgdbjfhbsjxmgfiusegopfgsdufhksljdzgfblkjgszedfpihsaeifhksjldgfjkhgsadifugsaeldkjfghjskahdbgfjhgsaeiudfguisaedfsdbhjfblksjbdfkljlskdufhkjsdhflkihsdfkjyhgsdflihsedoiugfpos8eayfr9pawyerufgsiedhfsgdbjfhbsjxmgfiusegopfgsdufhksljdzgfblkjgszedfpihsaeifhksjldgfjkhgsadifugsaeldkjfghjskahdbgfjhgsaeiudfguisaedfsdbhjfb
    if (!timestamp) {
       
        return res.status(400).send('Timestamp is required');
        
    }

    const requestTime = parseInt(timestamp, 10);
    console.log(requestTime)
    console.log(Date.now())
    if (isNaN(requestTime) || Date.now() > requestTime + 1000) { // URL valid for 1 second
       
        return res.status(403).send('Nice try dude');
    }

    next();
};

app.get('/audio/:id', validateTimestamp, async (req, res) => {

    const ID = req.params.id;
    console.log("ID: " + ID)
    
    const Beat = await BT.findById(ID);

    const filePath = path.join(__dirname + '/public/BeatsUploaded/', Beat.file);

    console.log(filePath);

    res.sendFile(filePath);

    
    
   
})


app.get('/VerifyMyEmail/:Num', async (req, res) => {

    const Num = req.params.Num

    const user = req.session.user
    try{

        const UserID = await UD.exists({username: user})
        

        const UserInfo = await UD.findById(UserID)
        

        const Email = UserInfo.emailaddress

        const Expire = new Date(Date.now() + 20 * 60 * 1000);

        const confir = new Verify({
            username: user,
            Number: Num,
            expiresAt: Expire,
        })
        confir.save()
        .then((result) => {
            console.log(result)
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: "soundmixerzzz@gmail.com",
                  pass: "sbxl pajs moks arwu",
                },
              });
        
        
              const mailOptions = {
                from: '"SoundMixerz" <soundmixerzzz@gmail.com>',
                to: Email, // list of receivers
                subject: Num,
                text: 'The Code to Verify your email is' + '\n\n' + 
                Num
              }
              transporter.sendMail(mailOptions, function(err, val){
                if(err){
                    console.log(err)
                }
                else{
                    
                    console.log('Sent Notification!')
                }
              })
        })
        .catch((err) => {
            console.log(err)
        })
        



    } catch(err){
        
    }


    

})

app.get('/CheckMyCode/:Num', async (req, res) => {
    
    const Num = req.params.Num

    console.log("The Number Is: " + Num)

    try{

        const con = await Verify.exists({Number: Num})
        console.log(con)
        if(con == null){
            res.json({message: "Wrong Code"})
        }
        else{
            const findUser = await Verify.findById(con)
            const user = findUser.username
            const exi = await UD.exists({username: user})
            
            const UserInf = await UD.findById(exi)
            const Updated = UserInf
            Updated.verified = 'true'

            const item = await UD.findByIdAndUpdate(exi, Updated, { new: true, runValidators: true });
            const del = await Verify.findByIdAndDelete(con)
            console.log(del)
            res.json({message: "Right Code"})
        }


    } catch(err){
        console.log(err)
    }


})


app.get('/PlayAudio/:id', (req, res) => {

    const ID = req.params.id

    BT.findById(ID)
    .then((result) => {
        const file = result.file
        const price= result.pob
        const Beatname = result.beatname
        const src = result.src
        const user = result.username
        

       
        const timestamp = Date.now();
        const url = `http://localhost:3000/audio/${ID}?lksjbdfkljlskdufhkjsdhflkihsdfkjyhgsdflihsedoiugfpos8eayfr9pawyerufgsiedhfsgdbjfhbsjxmgfiusegopfgsdufhksljdzgfblkjgszedfpihsaeifhksjldgfjkhgsadifugsaeldkjfghjskahdbgfjhgsaeiudfguisaedfsdbhjfblksjbdfkljlskdufhkjsdhflkihsdfkjyhgsdflihsedoiugfpos8eayfr9pawyerufgsiedhfsgdbjfhbsjxmgfiusegopfgsdufhksljdzgfblkjgszedfpihsaeifhksjldgfjkhgsadifugsaeldkjfghjskahdbgfjhgsaeiudfguisaedfsdbhjfb=${timestamp}`;
        

       

        res.json({ message: url, price: price,user: user,src: src, beatname:Beatname, ID: ID })
    })
    .catch((err) => {
        console.log(err)
    })


})

app.put('/OrderBasicPack/:user', async (req, res) => {

    const user = req.params.user
try{
    const findUser = await UD.exists({ username: user })
    const updatedUser = await UD.findById(findUser)
    
   
    const ID = updatedUser._id
    const username = updatedUser.username
    const NewPass = updatedUser.NewPass
    const year = updatedUser.year
    const month = updatedUser.month
    const day = updatedUser.day
    const emailaddress = updatedUser.emailaddress
    const pfp = updatedUser.pfp
    updatedUser.package = 'Basic'
    const package = updatedUser.package

    req.body = { username, NewPass, year, month, day, emailaddress, pfp, package}

const newInfo = req.body

            const UpInfo = await UD.findByIdAndUpdate(ID, newInfo, { new: true });
    
}catch(err) {
    console.log(err)
}
    console.log(user)
    
    const OrderedPack = new OD({
        user: user,
        Package: 'Basic Package',
    })
    OrderedPack.save()
    .then((result) => {
        console.log(result)
        console.log('ORDERED THE BASIC PACK BRUH W')
        res.json({ message: 'Ordered Package' })
    })
    .catch((err) => {
        console.log(err)
    })
    

})


app.put('/OrderProPack/:user', async (req, res) => {

    const user = req.params.user
 
    try{
        const findUser = await UD.exists({ username: user })
        const updatedUser = await UD.findById(findUser)
        
        
        const ID = updatedUser._id
        const username = updatedUser.username
        const NewPass = updatedUser.NewPass
        const year = updatedUser.year
        const month = updatedUser.month
        const day = updatedUser.day
        const emailaddress = updatedUser.emailaddress
        const pfp = updatedUser.pfp
        updatedUser.package = 'Pro'
        const package = updatedUser.package
    
        req.body = { username, NewPass, year, month, day, emailaddress, pfp, package}
    
    const newInfo = req.body
    
                const UpInfo = await UD.findByIdAndUpdate(ID, newInfo, { new: true });
        
    }catch(err) {
        console.log(err)
    }
    console.log(user)
    
    const OrderedPack = new OD({
        user: user,
        Package: 'Pro Package',
    })
    OrderedPack.save()
    .then((result) => {
        console.log(result)
        console.log('ORDERED THE PRO PACK BRUH W')
        res.json({ message: 'Ordered Package' })
    })
    .catch((err) => {
        console.log(err)
    })
    
})






app.delete('/Noti/:id', (req, res) => {

    const ID = req.params.id

    Noti.findByIdAndDelete(ID)
    .then((result) => {
        res.json({ redirect: '/account/withdraw' })
    })
    .catch((err) => {
        console.log(err)
    })

})


app.put('/EditSellerProfilecon/:id', upload.single('src'), async(req, res) => {

try{
    const ID = req.params.id
    BT.findById(ID)
    .then((result) => {
        console.log(result.src)
        const imagefile = result.src
        const imgpath = `public/BeatsUploaded/${imagefile}`
        if(imagefile !== 'NoImg.jpg'){
            fs.unlink(imgpath, (err) => {
                if (err) {
                  console.error(err);
                  res.status(500).json({ message: 'Failed to delete the file' });
                  return;
                }
                console.log(' YOOO DELETED' + imagefile + 'FILE WWW')
            })
        }
    })
    const { beatname, pob, tag1, tag2, tag3, description, file } = req.body
    const updatedUserInfo = req.body;
    const NP = req.file.filename
    updatedUserInfo.src = NP
    updatedUserInfo.username = req.session.user
    console.log(updatedUserInfo)

    const updatedUser = await BT.findByIdAndUpdate(ID, updatedUserInfo, { new: true });
    
    if (!updatedUser) {
        return res.json({ message: 'User not found' });
    }
    res.json({ message: 'Updated Success'})
} catch(err){
    console.log(err)
}
    
})

app.put('/changePfp/:id', upload.single('pfp'),  async (req, res) => {

    const ID = req.params.id
    UD.findById(ID)
    .then((result) => {
        console.log(result.pfp + ' THIS ONE IDIOT')
        const ImgPath = `public/BeatsUploaded/${result.pfp}`
        if(ImgPath !== 'avatar.jpg'){
            fs.unlink(ImgPath, (err) => {
                if(err){
                    console.log(err)
                }
                else{
                    console.log('DELETED THE FILE: ' + ImgPath)
                }
            })
            
        }
        
    })
    
    console.log(ID)
    const { userp, emailp, monthp, dayp, yearp, NewPass } = req.body

    console.log(req.body)
    const updatedUserInfo = req.body
    updatedUserInfo.pfp = req.file.filename
   
    const updatedUser = await UD.findByIdAndUpdate(ID, updatedUserInfo, { new: true });
    
    if (!updatedUser) {
        return res.json({ message: 'User not found' });
    }
    res.json({ message: 'Update successful'});
    console.log('UPDATED INFO')
})


app.delete('/DeleteReport/:id', (req, res) => {

const ID = req.params.id

RP.findByIdAndDelete(ID)
.then((result) => {
    console.log('DELETED THE REPORT')
    res.json({ message: 'File Deleted' })
})
.catch((err) => {
    console.log(err)
})

})

app.get('/EditSellerProfile/:id', (req, res) => {

    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }
    else{
    const ID = req.params.id

    BT.findById(ID)
    .then((result) => {
        const Edit = result
        if(result.username !== req.session.user){
            res.redirect('/Log-in')
        }
        Noti.find().sort({ createdAt: -1 })
    
        .then((result) => {
            const Noti = result
            SC.find()
            .then((result) => {
                const Orders = result
                User = req.session.user
                UD.find()
                .then((result) => {
                    const UD = result
                res.render('EditSellerProfile',{ Noti, User, Edit, Orders, UD })

                })
                
              } )
           
           
    
        })
       .catch((err) => {
        console.log(err)
       })

    })    
    }

})


app.post('/BoughtBeat', (req, res) => {
    console.log(req.body.CurrUser + 'THIS ONE')
    if(req.body.CurrUser == ''){
        res.json({ message: 'Not Logged In'})
        return;
    }
    
    const SoldBeat = new Noti (req.body)
    ID = req.body.ID
    FV.deleteMany({ ID: ID })
    .then((result) => {
        console.log(result)
        console.log('SUCCESSFULLY DELETED ALL FAVS')
    })
        
        
   
  
        SoldBeat.save()
        .then((result) => {
            const SellerMon = new SB ({
                SellUser: req.body.SellUser,
                pobBeat: req.body.pobBeat,
                bomm: 1,
                CurrUser: req.body.CurrUser,
                NameBeat: req.body.NameBeat,
                filename: req.body.filename,
                
            })
            SellerMon.save()
            .then((result) => {
                console.log(result)
                SellUser = result.SellUser
                CurrUser = result.CurrUser
                pobBeat = result.pobBeat
                Beatname = result.NameBeat
               
                const DownloadBeat = new DB ({
                    UserCurr: req.body.UserCurr,
                    bomm: 1,
                    UserSell: req.body.UserSell,
                    Beatpob: req.body.Beatpob,
                    BeatName: req.body.BeatName,
                    NameFile: req.body.NameFile,
                    src: req.body.src,
                })
                res.json({ message: 'Purchased Beat' })
                DownloadBeat.save()
                
                
                .then((result) => {
                    
                    
                    UD.exists({username: SellUser})
                .then((result) => {
                    ID = result
                    UD.findById(ID)
                    .then((result) => {
                        const transporter = nodemailer.createTransport({
                            service: 'gmail',
                            auth: {
                              user: "soundmixerzzz@gmail.com",
                              pass: "sbxl pajs moks arwu",
                            },
                          });
                    
                    
                          const mailOptions = {
                            from: '"SoundMixerz" <soundmixerzzz@gmail.com>',
                            to: result.emailaddress, // list of receivers
                            subject: CurrUser + " Has Just Bought Your Beat!",
                            text: 'Congratulations, ' + SellUser + '! ' + CurrUser + ' Has Just Bought ' + 
                            'Your Beat, ' + '"' + Beatname + '"' + ' For $' + pobBeat + '.00' ,
                          }
                          transporter.sendMail(mailOptions, function(err, val){
                            if(err){
                                console.log(err)
                            }
                            else{
                                
                                console.log('Sent Notification!')
                            }
                          })
                })
              
                
                    })
                })
                    
                
                
            })
        })
        .then((result) => {
            BT.findByIdAndDelete(ID)
            .then((result) => {
                console.log(result)
            })
           .catch((err) => {
            console.log(err)
           })
        })
        .catch((err) => {
            console.log(err)
        })
    
})

app.post('/BoughtVPLP', (req, res) => {

    console.log('REACHED LOGIC PRO ')

    const WA = req.body.Wvpbr
    let file;

    switch(WA){
        case "1":
            console.log('Autumn!')
            file = '/PresetAudios/AUTUMN!.patch.zip'
            break;
        case "2":
            console.log('Destroy Lonely')
            file = '/PresetAudios/Destroy Lonely .patch.zip'
            break;
        case "3":
            console.log('Ken Carson')
            file = '/PresetAudios/Ken Carson .patch.zip'
            break;
        case "4":
            console.log('Tory Lanez')
            file = '/PresetAudios/Tory Lanez .patch.zip'
            break;
        case "5":
            console.log('Frank Ocean')
            file = '/PresetAudios/FRANK OCEAN .patch.zip'
            break;
        case "6":
            console.log('Don Toliver')
            file = '/PresetAudios/Don Toliver .patch.zip'
            
            break;
        case "7":
            console.log('Bryson Tiller')
              file = '/PresetAudios/BRYSON TILLER .patch.zip'
            break;
        case "8":
            console.log('Travis Scott')
            file = '/PresetAudios/TRAVIS SCOTT 1.patch.zip'
            break;
        case "9":
            console.log('Lil Tjay')
            file = '/PresetAudios/LIL TJAY .patch.zip'
            break;
        case "10":
            console.log('SoFaygo')
            file = '/PresetAudios/SOFAYGO .patch.zip'
            break;
        case "11":
            console.log('The Kid Laroi')
            file = '/PresetAudios/THE KID LAROI.patch.zip'
            break;
        case "12":
            console.log('Lil Uzi Vert')
            file = '/PresetAudios/LIL UZI .patch.zip'
            break;
}


    if(req.body.VPdaw == ''){
        res.json({message: 'No DAW'})
        return;
    }
    if(req.body.VPuser == ''){
        res.json({message: 'Not Logged'})
        return;
    }


const BoughtV = new BV(req.body)

BoughtV.save()
.then((result) => {
    console.log(result)
    const SellerMon = new DB ({
        bomm: 3,
        UserCurr: req.body.VPuser,
        NameFile: file,
        DAW: 'LogicPro',
    })
    SellerMon.save()
    .then((result) => {
        console.log(result)
        res.json({message: 'Purchased'})
    return;
    })
    
})
.catch((err) => {
    console.log(err)
    res.redirect('/Log-in')
})



})





app.post('/BoughtVPFL', (req, res) => {

    console.log('REACHED FL STUDIO ')


    const WA = req.body.Wvpbr
    let file;

    switch(WA){
        case "1":
            console.log('Autumn!')
            file = '/PresetAudios/[Autumn!] FL Studio.fst'
            break;
        case "2":
            console.log('Destroy Lonely')
            file = '/PresetAudios/[Destroy Lonely] FL Studio .fst'
            break;
        case "3":
            console.log('Ken Carson')
            file = '/PresetAudios/[Ken Carson] FL Studio  (1).fst'
            break;
        case "4":
            console.log('Tory Lanez')
            file = '/PresetAudios/[Tory Lanez] FL Studio  (1).fst'
            break;
        case "5":
            console.log('Frank Ocean')
            file = '/PresetAudios/[Frank Ocean] FL Studio .fst'
            break;
        case "6":
            console.log('Don Toliver')
            file = '/PresetAudios/[Don Toliver] FL Studio .fst'
            
            break;
        case "7":
            console.log('Bryson Tiller')
              file = '/PresetAudios/[Bryson Tiller] FL Studio .fst'
            break;
        case "8":
            console.log('Travis Scott')
            file = '/PresetAudios/Travis Scott FL Studio  (1).fst'
            break;
        case "9":
            console.log('Lil Tjay')
            file = '/PresetAudios/[Lil tjay] FL Studio .fst'
            break;
        case "10":
            console.log('SoFaygo')
            file = '/PresetAudios/[SoFaygo] FL Studio.fst'
            break;
        case "11":
            console.log('The Kid Laroi')
            file = '/PresetAudios/[The Kid LAROI] FL Studio .fst'
            break;
        case "12":
            console.log('Lil Uzi Vert')
            file = '/PresetAudios/Lil Uzi Vert FL Studio  (1).fst'
            break;
}


    if(req.body.VPdaw == ''){
        res.json({message: 'No DAW'})
        return;
    }
    if(req.body.VPuser == ''){
        res.json({message: 'Not Logged'})
        return;
    }


const BoughtV = new BV(req.body)

BoughtV.save()
.then((result) => {
    console.log(result)
    const SellerMon = new DB ({
        bomm: 3,
        UserCurr: req.body.VPuser,
        NameFile: file,
        DAW: 'FLStudio',
    })
    SellerMon.save()
    .then((result) => {
        console.log(result)
        res.json({message: 'Purchased'})
    return;
    })
    
})
.catch((err) => {
    console.log(err)
    res.redirect('/Log-in')
})



})



app.post('/BuyDrumKit1', (req, res) => {

    if(req.session.user == undefined){
        res.json({message: 'hi'})
        return
    }

    const Purchased = new DB({
        UserCurr: req.session.user,
        bomm: 4,
        NameFile: '/dks/SOUNDMIXERS DRUM KIT 1.zip',
    })
    Purchased.save()
    .then((result) => {
        console.log(result)
        const PayHis = new BDK({
            user: req.session.user,
            DrumKit: 'SoundMixerz DrumKit Part 1',
            price: 20,
        })
        PayHis.save()
        .then((result) => {
            console.log(result)
            res.json({message: "Purchased"})
        })

    })




})

app.post('/GotoMySC', async (req, res) => {

let file = []    
let name = []
let bomm = []
    

    if(req.session.user == undefined){
        res.json({message: 'Not Logged'})
        return;
    }

    try{

    const ShopCart = await SC.find({user: req.session.user})
    
    for(let i = 0; i < ShopCart.length;i++){
        switch(ShopCart[i].bomm){
            case 1:

                switch(ShopCart[i].SCNum){
                    case "1":
                        console.log('Autumn!')
                        array = '/PresetAudios/[Autumn!] FL Studio.fst'
                        file.push(array)
                        name.push('Autumn! Vocal Preset')
                        bomm.push(3)
                        break;
                    case "2":
                        console.log('Destroy Lonely')
                        array = '/PresetAudios/[Destroy Lonely] FL Studio .fst'
                        file.push(array)
                        name.push('Destroy Lonely Vocal Preset')
                        bomm.push(3)

                        break;
                    case "3":
                        console.log('Ken Carson')
                        array = '/PresetAudios/[Ken Carson] FL Studio  (1).fst'
                        file.push(array)
                        name.push('Ken Carson Vocal Preset')
                        bomm.push(3)


                        break;
                    case "4":
                        console.log('Tory Lanez')
                    array = '/PresetAudios/[Tory Lanez] FL Studio  (1).fst'
                    file.push(array)
                    name.push('Tory Lanez Vocal Preset')
                    bomm.push(3)


                        break;
                    case "5":
                        console.log('Frank Ocean')
                    array = '/PresetAudios/[Frank Ocean] FL Studio .fst'
                    file.push(array)
                    name.push('Frank Ocean Vocal Preset')
                    bomm.push(3)


                        break;
                    case "6":
                        console.log('Don Toliver')
                        array = '/PresetAudios/[Don Toliver] FL Studio .fst'
                        file.push(array)
                        name.push('Don Toliver Vocal Preset')
                        bomm.push(3)


                        break;
                    case "7":
                        console.log('Bryson Tiller')
                        array = '/PresetAudios/[Bryson Tiller] FL Studio .fst'
                        file.push(array)
                        name.push('Bryson Tiller Vocal Preset')
                        bomm.push(3)


                        break;
                    case "8":
                        console.log('Travis Scott')
                        array = '/PresetAudios/Travis Scott FL Studio  (1).fst'
                        file.push(array)
                        name.push('Travis Scott Vocal Preset')
                        bomm.push(3)


                        break;
                    case "9":
                        console.log('Lil Tjay')
                        array = '/PresetAudios/[Lil tjay] FL Studio .fst'
                        file.push(array)
                        name.push('Lil Tjay Vocal Preset')
                        bomm.push(3)


                        break;
                    case "10":
                        console.log('SoFaygo')
                        array = '/PresetAudios/[SoFaygo] FL Studio.fst'
                        file.push(array)
                        name.push('SoFaygo Vocal Preset')
                        bomm.push(3)


                        break;

                    case "11":
                        console.log('The Kid Laroi')
                        array = '/PresetAudios/[The Kid LAROI] FL Studio .fst'
                        file.push(array)
                        name.push('The Kid Laroi Vocal Preset')
                        bomm.push(3)


                        break;
                    case "12":
                        console.log('Lil Uzi Vert')
                        array = '/PresetAudios/Lil Uzi Vert FL Studio  (1).fst'
                        file.push(array)
                        name.push('Lil Uzi Vert Vocal Preset')
                        bomm.push(3)


                        break;
            }
            
                break;
            case 2:
                switch(ShopCart[i].SCNum){
                case "1":
                    console.log('Autumn!')
                    array = '/PresetAudios/AUTUMN!.patch.zip'
                    file.push(array)
                    name.push('Autumn! Vocal Preset')
                    bomm.push(3)

                    
                    break;
                case "2":
                    console.log('Destroy Lonely')
                    array = '/PresetAudios/Destroy Lonely .patch.zip'
                    file.push(array)
                    name.push('Destroy Lonely Vocal Preset')
                    bomm.push(3)


                    break;
                case "3":
                    console.log('Ken Carson')
                    array = '/PresetAudios/Ken Carson .patch.zip'
                    file.push(array)
                    name.push('Ken Carson Vocal Preset')
                    bomm.push(3)


                    break;
                case "4":
                    console.log('Tory Lanez')
                    array = '/PresetAudios/Tory Lanez .patch.zip'
                    file.push(array)
                    name.push('Tory Lanez Vocal Preset')
                    bomm.push(3)


                    break;
                case "5":
                    console.log('Frank Ocean')
                    array = '/PresetAudios/FRANK OCEAN .patch.zip'
                    file.push(array)
                    name.push('Frank Ocean Vocal Preset')
                    bomm.push(3)


                    break;
                case "6":
                    console.log('Don Toliver')
                    array = '/PresetAudios/Don Toliver .patch.zip'
                    file.push(array)
                    name.push('Don Toliver Vocal Preset')
                    bomm.push(3)


                    break;
                case "7":
                    console.log('Bryson Tiller')
                    array = '/PresetAudios/BRYSON TILLER .patch.zip'
                    file.push(array)
                    name.push('Bryson Tiller Vocal Preset')
                    bomm.push(3)


                    break;
                case "8":
                    console.log('Travis Scott')
                    array = '/PresetAudios/TRAVIS SCOTT 1.patch.zip'
                    file.push(array)
                    name.push('Travis Scott Vocal Preset')
                    bomm.push(3)


                    break;
                case "9":
                    console.log('Lil Tjay')
                    array = '/PresetAudios/LIL TJAY .patch.zip'
                    file.push(array)
                    name.push('Lil Tjay Vocal Preset')
                    bomm.push(3)


                    break;
                case "10":
                    console.log('SoFaygo')
                    array = '/PresetAudios/SOFAYGO .patch.zip'
                    file.push(array)
                    name.push('SoFaygo Vocal Preset')
                    bomm.push(3)


                    break;
                case "11":
                    console.log('The Kid Laroi')
                    array = '/PresetAudios/THE KID LAROI.patch.zip'
                    file.push(array)
                    name.push('The Kid Laroi Vocal Preset')
                    bomm.push(3)


                    break;
                case "12":
                    console.log('Lil Uzi Vert')
                    array = '/PresetAudios/LIL UZI .patch.zip'
                    file.push(array)
                    name.push('Lil Uzi Vert Vocal Preset')
                    bomm.push(3)


                    break;
                }
            case 3:
                switch(ShopCart[i].SCNum){
                    case "1":
                        array = '/dks/SOUNDMIXERS DRUM KIT 1.zip'
                        file.push(array)
                        name.push('SoundMixerz DrumKit Part 1')
                        bomm.push(4)

                        break;
                }
        }
    }

    for(let i = 0; i < file.length;i++){
        const Download = new DB({
            UserCurr: req.session.user,
            NameFile: file[i],
            bomm: bomm[i],
        })
        Download.save()
        const DelShop = await SC.deleteMany({user: req.session.user})
        console.log(DelShop)
        res.json({message: 'Purchased Items'})


    }




    } catch(err){
        console.log(err)
    }


})



app.get('/beatsearch', async (req, res) => {
    const min = req.query.min
    const max = req.query.max
    const Favs = undefined
    const Susername = undefined
    
    const page = parseInt(req.query.page) || 1
    const limit = 22
    
    try{
         const Beats = await BT.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec()
         const Beat = await BT.find().sort({ createdAt: -1 })
            const count = await BT.countDocuments()
            const Notis = await Noti.find().sort({ createdAt: -1 })
            const Orders = await SC.find()
            const Favorites = await FV.find()
            const UDs = await UD.find()
            const Counts = await FV.aggregate([
                { $group: { _id: '$ID', count: { $sum: 1 } } }
            ]);
             User = req.session.user
             res.render('Beats',{BT: Beats, BTs: Beat,Count: Counts, Favs,UD: UDs, FV: Favorites,current: page, pages: Math.ceil(count / limit), Noti: Notis, User, max, min, Susername, Orders })
    }catch (err){
    console.log(err + 'ERROR FOUND')
    
    }
       
        
    
})


app.get('/BeatUserSearch', async (req, res) => {
    const Susername = req.query.username
    const min = undefined
    const max = undefined
    const Favs = undefined

     
    const page = parseInt(req.query.page) || 1
    const limit = 22
    
    try{
         const Beats = await BT.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec()
         const Beat = await BT.find().sort({ createdAt: -1 })
            const count = await BT.countDocuments()
            const Notis = await Noti.find().sort({ createdAt: -1 })
            const Orders = await SC.find()
            const Favorites = await FV.find()
            const UDs = await UD.find()
            const Counts = await FV.aggregate([
                { $group: { _id: '$ID', count: { $sum: 1 } } }
            ]);
             User = req.session.user
             res.render('Beats',{BT: Beats, BTs: Beat, Count: Counts,UD: UDs, Favs, FV: Favorites,current: page, pages: Math.ceil(count / limit), Noti: Notis, User, max, min, Susername, Orders })
    }catch (err){
    console.log(err + 'ERROR FOUND')
    
    }
})


app.get('/MyFavsSearch', async (req, res) => {
    const Susername = undefined
    const min = undefined
    const max = undefined
    const NotDef = 'Defined'
    const Favs = NotDef
    console.log(Favs)

    const page = parseInt(req.query.page) || 1
    const limit = 22
    try{
        const Beats = await BT.find().sort({ createdAt: -1 }).skip((page - 1) * limit).limit(limit).exec()
        const Beat = await BT.find().sort({ createdAt: -1 })
           const count = await BT.countDocuments()
           const Notis = await Noti.find().sort({ createdAt: -1 })
           const Orders = await SC.find()
           const Favorites = await FV.find()
           const UDs = await UD.find()
           const Counts = await FV.aggregate([
               { $group: { _id: '$ID', count: { $sum: 1 } } }
           ]);
            User = req.session.user
            res.render('Beats',{BT: Beats, BTs: Beat, Count: Counts,UD: UDs,  Favs, FV: Favorites,current: page, pages: Math.ceil(count / limit), Noti: Notis, User, max, min, Susername, Orders })
   }catch (err){
   console.log(err + 'ERROR FOUND')
   
   }


})





app.delete('/Logout', (req, res) => {
    res.json({ message: 'Logged Out'});
    req.session.destroy()((err) => {
        if (err) {
            console.log('ERROR' + err)

        }
         
    });

})












//404 ERROR PAGE
app.use((req, res) => {

    res.status(404).render('404')

})






