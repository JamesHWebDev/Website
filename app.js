const express = require('express')
const http = require("http");
const fs = require('fs')
const path = require('path')
const app = express()
require('dotenv').config()
const crypto = require('crypto');
const bcrypt = require('bcrypt')
const MongoStore = require('connect-mongo');
const cookieParser = require('cookie-parser');
const secretKey = 'your-secret-key';
const multer = require('multer');
const { S3 } = require('@aws-sdk/client-s3');
const { GetObjectCommand } = require('@aws-sdk/client-s3');
const multerS3 = require('multer-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const helmet = require('helmet')
const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);
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
const NSA = require('./models/NewStripe');
const MM = require('./models/MMschema')
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
const Noti = require('./models/NotiSchema');
const { urlToHttpOptions } = require('url');



const PORT = process.env.PORT || 3000


const DBuri = "mongodb+srv://jamesholmesblah:75GsoYK0idVVWCqP@soundmixerz.e4yc9pc.mongodb.net/?retryWrites=true&w=majority&appName=SoundMixerz";
mongoose.connect(DBuri)
.then((result) => {
    app.listen(PORT, () => {
        console.log(`Running on  ${PORT}`)
    })
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
app.use(cookieParser());
app.use(bodyParser.json());
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'", "https://soundmixerzbucket.nyc3.digitaloceanspaces.com"],
            scriptSrc: ["'self'", "https://cdn.plyr.io", "https://soundmixerzbucket.nyc3.digitaloceanspaces.com"],
            styleSrc: ["'self'", "https://cdn.plyr.io", 'https://fonts.googleapis.com', "https://cdnjs.cloudflare.com", "https://www.youtube.com", "https://www.youtube-nocookie.com", "https://soundmixerzbucket.nyc3.digitaloceanspaces.com"],
            mediaSrc: ["'self'", "blob:", "https://soundmixerzbucket.nyc3.digitaloceanspaces.com"],
            frameSrc: ["https://www.youtube.com", "https://www.youtube-nocookie.com", "https://soundmixerzbucket.nyc3.digitaloceanspaces.com"],
            imgSrc: ["'self'", "https://soundmixerzbucket.nyc3.digitaloceanspaces.com"],
        },
    },
}));
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: 'LIDHLWHdhuAWdliuhdo*7w378r03wr809OSdjdpoIJ',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://jamesholmesblah:75GsoYK0idVVWCqP@soundmixerz.e4yc9pc.mongodb.net/?retryWrites=true&w=majority&appName=SoundMixerz' }),
    cookie: { maxAge: 30 * 60 * 1000 }, // 30 minutes
  }));
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 2000, 
    message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);
const corsOptions = {
    origin: ['http://localhost:3000', 'https://soundmixerz.com', 'https://nyc3.digitaloceanspaces.com'], 
    methods: 'GET, PUT, DELETE, POST',
    allowedHeaders: '*',
  };
  app.use(cors(corsOptions));



app.use((req, res, next) => {
    if (req.cookies.userId && !req.session.user) {
      req.session.user = req.cookies.userId; // Restore session from cookie
      console.log(req.cookies.userId)
    }
    next();
  });


  console.log(process.env.DIGITALOCEAN_SPACES_SECRET)


  const s3 = new S3({
    endpoint: 'https://nyc3.digitaloceanspaces.com', // Use your region
    region: 'nyc3', // Your Space region
    credentials: {
      accessKeyId: 'DO00XMBKGTK36YP4Z49T', // Set in your environment
      secretAccessKey: 'gxmdE5opbbXVcDg+8FpPNnfJdEDNNlo4bGABpqub3JM', // Set in your environment
    },
  });



  const upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'soundmixerzbucket', // Replace with your space name
      acl: 'private', // Set to private
      key: (req, file, cb) => {
        cb(null, Date.now().toString() + '-' + file.originalname); // Unique key
      },
    }),
  });




  



  


//FIRST EVER TIME USING MONGODB DATABASE WOW 
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
                    const username = req.body.username
                    res.cookie('userId', username, { maxAge: 30 * 60 * 1000, httpOnly: true });
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
                    res.cookie('userId', username, { maxAge: 30 * 60 * 1000, httpOnly: true });
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

    const username = req.session.user
    const filename = req.file.key

    const data = await s3.listObjectsV2({
      Bucket: 'soundmixerzbucket',
    });


    const beatname = req.body.beatname
    const beatlen = beatname.length
    const price = req.body.pob
    const BPM = req.body.BPM
    let regex = /[a-zA-Z]/
    let fg = 0

    if(regex.test(price)){
        await s3.deleteObject({
            Bucket: 'soundmixerzbucket',
            Key: filename, // The filename to delete
          });
        res.json({ message: 'Price Contains Letters' })
       
        return;
    }

    if(regex.test(BPM)){
        await s3.deleteObject({
            Bucket: 'soundmixerzbucket',
            Key: filename, // The filename to delete
          });
        res.json({ message: 'BPM Contains Letters' })
        return;
    }
    
    
    if(beatlen > 25){
        await s3.deleteObject({
            Bucket: 'soundmixerzbucket',
            Key: filename, // The filename to delete
          });
        res.json({ message: 'Too Long' })
        return;

    }


    const Data = await UD.findOne({username: username})

    console.log(Data.emailaddress + ' THIS IS THE EMAIL ADDRESS')

    const email = Data.emailaddress


    
    const StripePayAcc = await NSA.findOne({email: email})

    if(StripePayAcc == null){
     console.log('REACHED NO STRIPE ACCOUNT')
     res.json({ message: 'No Stripe Account'})
     return;
    }
    
 
 
     //console.log(StripePayAcc.AccountID)
 
      //   const AccId = StripePayAcc.AccountID
 

    
try{
    const UserRes = await UD.exists({username: username})

        console.log(UserRes)
    

        const Lurks = await UD.findById(UserRes)

        if(Lurks.verified !== 'true'){
            await s3.deleteObject({
                Bucket: 'soundmixerzbucket',
                Key: filename, // The filename to delete
              });
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
                        await s3.deleteObject({
                            Bucket: 'soundmixerzbucket',
                            Key: filename, // The filename to delete
                          });
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
                        await s3.deleteObject({
                            Bucket: 'soundmixerzbucket',
                            Key: filename, // The filename to delete
                          });
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
        file: req.file.key,
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
        await s3.deleteObject({
            Bucket: 'soundmixerzbucket',
            Key: filename, // The filename to delete
          });
        res.json({ message: 'An Error Has Occured' })
        return;
    }


})

//Stripe Payments 

const storeItems = new Map([

    



    [1, { price: 2000, name: 'Autumn! FL Studio Vocal Preset' }],
    [2, { price: 2000, name: 'Autumn! Logic Pro X Vocal Preset' }],

    [3, { price: 2000, name: 'Destroy Lonely FL Studio Vocal Preset' }],
    [4, { price: 2000, name: 'Destroy Lonely Logic Pro X Vocal Preset' }],

    [5, { price: 2000, name: 'Ken Carson FL Studio Vocal Preset' }],
    [6, { price: 2000, name: 'Ken Carson Logic Pro X Vocal Preset' }],

    [7, { price: 2000, name: 'Tory Lanez FL Studio Vocal Preset' }],
    [8, { price: 2000, name: 'Tory Lanez Logic Pro X Vocal Preset' }],

    [9, { price: 2000, name: 'Frank Ocean FL Studio Vocal Preset' }],
    [10, { price: 2000, name: 'Frank Ocean Logic Pro X Vocal Preset' }],

    [11, { price: 2000, name: 'Don Toliver FL Studio Vocal Preset' }],
    [12, { price: 2000, name: 'Don Toliver Logic Pro X Vocal Preset' }],

    [13, { price: 2000, name: 'Bryson Tiller FL Studio Vocal Preset' }],
    [14, { price: 2000, name: 'Bryson Tiller Logic Pro X Vocal Preset' }],

    [15, { price: 2000, name: 'Travis Scott FL Studio Vocal Preset' }],
    [16, { price: 2000, name: 'Travis Scott Logic Pro X Vocal Preset' }],

    [17, { price: 2000, name: 'Lil Tjay FL Studio Vocal Preset' }],
    [18, { price: 2000, name: 'Lil Tjay Logic Pro X Vocal Preset' }],

    [19, { price: 2000, name: 'SoFaygo FL Studio Vocal Preset' }],
    [20, { price: 2000, name: 'SoFaygo Logic Pro X Vocal Preset' }],

    [21, { price: 2000, name: 'The Kid LAROI FL Studio Vocal Preset' }],
    [22, { price: 2000, name: 'The Kid LAROI Logic Pro X Vocal Preset' }],

    [23, { price: 2000, name: 'Lil Uzi Vert FL Studio Vocal Preset' }],
    [24, { price: 2000, name: 'Lil Uzi Vert Logic Pro X Vocal Preset' }],

    [25, { price: 2000, name: 'SoundMixerz DrumKit Part 1' }],

    [50, { price: `${process.env.BASIC_SUBSCRIPTION}`, name: 'Basic Subscription' }],
    [51, { price: `${process.env.PRO_SUBSCRIPTION}`, name: 'Pro Subscription' }],

    [999, { price: 0, name: 'PlaceHolder'}]//ID FOR BEATS
]);


app.get('/stripe', async (req, res) => {

    res.render('Stripe')

})

//STRIPE PAY CREATING A CHECKOUT ON THE BACKEND 

app.post('/create-checkout-session', async (req, res) => {
    
    const origin = req.body.referer
    
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment', // You can also use 'subscription' here
            line_items: req.body.items.map(item => {
               
                const storeItem = storeItems.get(Number(item.id)); // Convert to number
               
                if (!storeItem) {
                    throw new Error(`Item with id ${item.id} not found`);
                }
                const ProductName = storeItem.name

               
                if(item.id == 999){
                    console.log('THIS IS A BEAT')
                    console.log(req.body.Data)
                    const Data = req.body.Data
                    UrlAdd = 'bt'
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: Data.NameBeat, //NAME OF ITEM
                            },
                            unit_amount: Data.pobBeat * 100 //PRICE OF ITEM FROM ID
                        },
                        quantity: item.quantity// QUANTITY OF ITMES
                    };

                }else if(ProductName.includes('FL Studio')){
                    console.log('INCLUDES FL STUDIO')
                    UrlAdd = 'fl'
                } else if(ProductName.includes('Logic Pro X')){
                    console.log('INCLUDES LOGiC PRO')
                    UrlAdd = 'lp'
                } else if(item.id >= 25 & item.id < 30){
                    console.log('THIS IS A DRUMKIT')
                    UrlAdd = 'dk'
                   
                }
                if(item.id !== 999){
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name, //NAME OF ITEM
                        },
                        unit_amount: storeItem.price //PRICE OF ITEM FROM ID
                    },
                    quantity: item.quantity// QUANTITY OF ITMES
                };
            }
            }),
        
            success_url: `${origin}?success=true&DAW=${UrlAdd}&20-358u9rwdjsfhbndzfbgdsryiougtqae30984owr57yw346tsdfiulkyghSDKJULhfpaeowiyrt329w87453w4sekuyirgh5478936tyq3o9re4thgfekljrgt73045985q`,
            cancel_url: `${origin}?canceled=true`
          
        });
    
        res.json({ url: session.url });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }
});


app.post('/create-subscription-session', async (req, res) => {

    const origin = req.body.referer

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'subscription', // You can also use 'subscription' here
            line_items: req.body.items.map(item => {
               
                const storeItem = storeItems.get(Number(item.id)); // Convert to number
               
                if (!storeItem) {
                    throw new Error(`Item with id ${item.id} not found`);
                }
                const ProductName = storeItem.name

               if(item.id == 50){
           
                UrlAdd = 'bas'
         
               } else if(item.id == 51){

                UrlAdd = 'pro'

               }
               
              
                return {
                  price: storeItem.price,
                  quantity: 1
                };
            
            }),
        
            success_url: `${origin}?success=true&DAW=${UrlAdd}&20-358u9rwdjsfhbndzfbgdsryiougtqae30984owr57yw346tsdfiulkyghSDKJULhfpaeowiyrt329w87453w4sekuyirgh5478936tyq3o9re4thgfekljrgt73045985q`,
            cancel_url: `${origin}?canceled=true`
          
        });
    
        res.json({ url: session.url });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }



})


app.post("/create-connected-account", async (req, res) => {

    const username = req.session.user

    if(username == undefined || username == null){
        res.redirect('/Log-in')
    }

    const Data = await UD.findOne({username: username})


    console.log(Data.emailaddress)

    const email = Data.emailaddress
    


        try {


            const find = await NSA.findOne({email: email})

            console.log(find)

            const account = await stripe.accounts.create({
                type: "standard",  // Change to "standard" for Stripe Standard accounts
                country: "US",     // Change as needed
                email: email
            });


            if(find == null){

                
    
                const NewStripeAcc = await new NSA({
                    email: email,
                    AccountID: account.id,
                })

                NewStripeAcc.save()
                .then((result) => {
                    console.log(result)
                })
            } else{
                console.log('ALREADY HAS A STRIPE CONNECTED ACCOUNT')
                res.json({ message: 'Already has an Account' });
                return;
            }



           
        

           
    
            res.json({ message: account.id });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
});
    

app.post("/create-account-link", async (req, res) => {

    const username = req.session.user 

    if(username == undefined || username == null){
        res.redirect('/Log-in')
    }

    const UData = await UD.findOne({username: username})


    console.log(UData.emailaddress)

    const email = UData.emailaddress

    const StripePayAcc = await NSA.findOne({email: email})

    console.log(StripePayAcc.AccountID)

        const AccId = StripePayAcc.AccountID



        try {
            const accountLink = await stripe.accountLinks.create({
                account: AccId,
                refresh_url: `${process.env.SERVER_URL}/account/withdraw`,  // URL for the user to return if the process is interrupted
                return_url: `${process.env.SERVER_URL}/account/withdraw`,  // URL the user will be redirected to after completing onboarding
                type: "account_onboarding"  // For Standard accounts
            });
    
            res.json({ url: accountLink.url });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }


        
});




app.post("/get-dashboard-link", async (req, res) => {

    const username = req.session.user 

    if(username == undefined || username == null){
        res.redirect('/Log-in')
    }

    const UData = await UD.findOne({username: username})


    console.log(UData.emailaddress)

    const email = UData.emailaddress

    const StripePayAcc = await NSA.findOne({email: email})

    console.log(StripePayAcc.AccountID)

        const AccId = StripePayAcc.AccountID


    try {
        const loginLink = await stripe.accounts.createLoginLink(AccId);
        res.json({ url: loginLink.url });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});




app.post("/transfer-funds", async (req, res) => {

    const username = req.session.user 


    

    if(username == undefined || username == null){
        res.redirect('/Log-in')
    }

    const Sold = await SB.find({SellUser: username})

    console.log(Sold + "THIS IS SOLD")
    let i = 0
    let x = 0
    let list = []
    Sold.forEach(Sold => {
        console.log(Sold.pobBeat)
        list.push(Sold.pobBeat)
    })
    let total = 0
    if(list.lenth > 0){
    for(let j = 0;j < list.length;j++){
      
        total = total + list[j]
    }
    } else {
        console.log('REACHED ELSE')
        console.log(list[0] + ' THIS IS LIST')
        total = list[0]
    }
    console.log(total.toFixed(2) + ' THIS IS TOTAL')

    const UData = await UD.findOne({username: username})


    console.log(UData.emailaddress)

    const email = UData.emailaddress

    const StripePayAcc = await NSA.findOne({email: email})

    console.log(StripePayAcc.AccountID)

        const AccId = StripePayAcc.AccountID

    try {
        const transfer = await stripe.transfers.create({
            amount: total.toFixed(2) * 100,  // Convert dollars to cents
            currency: "usd",
            destination: AccId, // The connected Express account ID
            description: "Payout for user earnings"
        });

        res.json({ transfer });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});



const endpointSecret = 'whsec_04b38ebed80f0b9d5daf97e00d0ee470ce363f38b7dc7054d6c26ffa1338d530';

// Webhook endpoint to listen for Stripe events
app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
  
    let event;
    try {
      event = stripe.webhooks.constructEvent(req.body, sig, endpointSecret);
    } catch (err) {
      console.error('⚠️ Webhook signature verification failed.', err.message);
      return res.status(400).send(`Webhook Error: ${err.message}`);
    }
  
    // Handle successful checkout
    if (event.type === 'checkout.session.completed') {
      const session = event.data.object;
      
      console.log('✅ Payment successful:', session.id);
      console.log('Customer Email:', session.customer_email);
      console.log('Amount Paid:', session.amount_total / 100, session.currency.toUpperCase());
  
      // TODO: Store order details in your database here
    }
  
    res.status(200).json({ received: true });
  });









app.get('/Sellingform', async (req, res) => {
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
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
                res.render('SellForm',{ Noti, PFPurl, User, Orders, UD })
            })
          
          } )
       
       

    })
   .catch((err) => {
    console.log(err)
   })
})


app.post('/Music-Mixing', upload.single('audioUpload'), async (req, res) => {
    const filename = req.file.key

    console.log(filename)

    const data = await s3.listObjectsV2({
      Bucket: 'soundmixerzbucket',
    });
if(req.session.user == undefined){
    await s3.deleteObject({
        Bucket: 'soundmixerzbucket',
        Key: req.file.key, // The filename to delete
      });
    res.redirect('/Log-in')

}

const audioFile = req.file.key



const fileName = audioFile



    const Mixing = new MM({
        user: req.session.user,
        file: req.file.key,
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
                    "The File name is: " + req.file.key,
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
            res.redirect('/Presets/Autumn')
    
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

app.get('/', async (req, res) =>{
    let PFPurl = null
if(req.session.user !== undefined){
    const result = await UD.findOne({username: req.session.user})

    console.log(result.pfp + ' This is the result')

    const bucketName = 'soundmixerzbucket'; 


   


    const PFP = result.pfp

    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      });

    if(PFP !== 'avatar.jpg'){
        const foundFile = data.Contents.find(file => file.Key === PFP);

        

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              PFPurl = await getSignedUrl(s3, command);
             
          }
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
            res.render('index',{ User, PFPurl, Orders, Noti, UD })

        })
      
    })
    })
   .catch((err) => {
    console.log(err)
   })
  
})


app.get('/presets', async (req, res) =>{
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
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
                                                                                           UD,
                                                                                           PFPurl
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
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
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
    const Beats = await BT.aggregate([
        { $sample: { size: totalCount } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
    ]);


    const products = Beats.map(beat => ({
        id: beat._id,
        file: beat.src
        // add other fields as necessary
    }));


    const productFiles = products.map(product => product.file);
   
    console.log(productFiles)

    let i = 0

    let urls = []

    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 
    
    for(const productFile of productFiles){
    

        if(productFile == 'NoImg.jpg'){
            continue;
        }
        const foundFile = data.Contents.find(file => file.Key === productFile);

        

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

        

        urls.push(url)
    }







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

        FamPics = []
        pname = []

        for(const Count of Counts){
    
            console.log(Count._id + ' BACKEND COUNTS')

            const BTid = await BT.findById(Count._id)



            if(BTid.src == 'NoImg.jpg'){
                FamPics.push('Filler')
                continue;
            }



            const foundFile = data.Contents.find(file => file.Key === BTid.src);

            
    
            pname.push(foundFile.Key)
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };

                
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  FamPic = await getSignedUrl(s3, command);
                  console.log(FamPic + " THIS IS THE URL WOOHOO")

                  FamPics.push(FamPic)


        }

        console.log(pname[0] + ' THIS IS PNAME')

        let undefinedList = []

        if(Counts[0] == undefined){
            undefinedList[0] = 'Undef'
        } else{
            undefinedList[0] = 'NotUndef'
        }

        if(Counts[1] == undefined){
            undefinedList[1] = 'Undef'
        } else{
            undefinedList[1] = 'NotUndef'
        }

        if(Counts[2] == undefined){
            undefinedList[2] = 'Undef'
        } else{
            undefinedList[2] = 'NotUndef'
        }

        if(Counts[3] == undefined){
            undefinedList[3] = 'Undef'
        } else{
            undefinedList[3] = 'NotUndef'
        }

        if(Counts[4] == undefined){
            undefinedList[4] = 'Undef'
        } else{
            undefinedList[4] = 'NotUndef'
        }
        
        

         User = req.session.user
         res.render('Beats',{BT: Beats,BTs: Beat, PFPurl, undefinedList, productFiles,pname, FamPics,  urls,  UD: UDs,  Count: Counts, current: page,Favs, pages: Math.ceil(count / limit), Noti: Notis, FV: FVs,User, max, min, Susername, Orders })
}catch (err){
console.log(err + 'ERROR FOUND')

}
   
    

})



app.get('/DrumKits', async (req, res) => {

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('Drumkit',{ Noti, PFPurl, User, Orders, UD, DKO: DrumKitRev })
                })
                
            })
            

        })
       

    })
   .catch((err) => {
    console.log(err)
   })

})

app.get('/DrumKits/SoundMixerzDrumKit1', async (req, res) => {

    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

    
            let filePFPs = []
            let urls = []
            let Users = []
        
            const productFiles = products.map(product => product.user);
           
          
        
        
        
            const bucketName = 'soundmixerzbucket';
            const data = await s3.listObjectsV2({
                Bucket: bucketName,
              }); 
        
              for(const productFile of productFiles){
        
                const UDs = await UD.find({username: productFile})
        
                
                
                const products = UDs.map(Rev => ({
                    id: Rev._id,
                    file: Rev.pfp,
                    user: Rev.username
                    // add other fields as necessary
                }));
            
            
                const productFilesbruh = products.map(product => product.file);
        
                const User = products.map(product => product.user);
        
        
                
        
                filePFPs.push(productFilesbruh)
                Users.push(User)
        
        
        
        
              }
        
            
        
            let i = -1
        
            
            for(const filePFP of filePFPs){
        
                i++
        
                
                const PFPfile = filePFP[0]
        
                console.log(PFPfile + " THIS IS THE PFP FILE")
            
        
                
                const foundFile = data.Contents.find(file => file.Key === PFPfile);
        
                console.log(foundFile + ' THIS IS THE FOUND FILE')
        
            
                
        
           
                
                  const params = {
                      Bucket: bucketName, // Replace with your Space name
                      Key: foundFile.Key, // The file name in your Space
                      Expires: 60, // URL expiration time in seconds
                      ResponseContentType: 'image/jpeg', // Set to the correct content type
                      ResponseContentDisposition: 'inline', // Set to inline
           
                    };
                  
                  
                      const command = new GetObjectCommand(params); // Proper instantiation
                      url = await getSignedUrl(s3, command);
                  
        
                      urls.push(url)
        
            }
        
            

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
                res.render('DrumKitPage1',{ Noti, PFPurl, User, Users, urls, Orders, UD, DKO: DrumKitRev })

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

app.get('/DrumKits/SoundMixerzDrumKit2', async (req, res) => {
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

    res.send('Coming Soon!')

})

app.get('/Music-Mixing', async (req, res) =>{

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                res.render('Music-Mixing',{ Noti, PFPurl, User, Orders, UD })
            })
            

        })
       

    })
   .catch((err) => {
    console.log(err)
   })
    
})



app.get('/Account', async (req, res) => {

    
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }


    try{

        
        const Check = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
        
        
        if(Check == null){
            res.redirect('/Log-in')
        }
        let url = null
        const result = await UD.findById(Check._id)
        const PFP = result.pfp
            const data = await s3.listObjectsV2({
                Bucket: bucketName,
              });

            
              if(PFP !== 'avatar.jpg'){
              const foundFile = data.Contents.find(file => file.Key === PFP);

              

          
              

         
              
                const params = {
                    Bucket: bucketName, // Replace with your Space name
                    Key: foundFile.Key, // The file name in your Space
                    Expires: 60, // URL expiration time in seconds
                    ResponseContentType: 'image/jpeg', // Set to the correct content type
                    ResponseContentDisposition: 'inline', // Set to inline
         
                  };
                
                
                    const command = new GetObjectCommand(params); // Proper instantiation
                    url = await getSignedUrl(s3, command);
                
                }
              
        
        const UDs = result
          const Email = result.emailaddress
          const Day = result.day
          const month = result.month
          const year = result.year
          const package = result.package
          const verified = result.verified

        const Notis = await Noti.find().sort({ createdAt: -1 })

        User = req.session.user

        const Orders = await SC.find()

        const UDsss = await UD.find()

        res.render('Account',
            {username: req.session.user,
                day: Day,
            email: Email,
            month: month,
            year: year,
            Noti: Notis,
            package,
            User,
            Orders,
            UDs: UDs,
            UD: UDsss,
            verified,
            url,
            PFPurl,
        } )

        
    
    } catch(err){
        console.log(err)
    }
       

    })
    


app.get('/Account/Withdraw', async (req, res) => {
    let PFPurl = null
    let Prog = null
    let stat = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
    
        const bucketName = 'soundmixerzbucket'; 
    
    const username = req.session.user

    const Data = await UD.findOne({username: username})

    console.log(Data)

    const email = Data.emailaddress

    const Find = await NSA.findOne({email: email})

    
   
    

    if(Find == null){   
            Prog = 'First Step'
    }   
    if(Find !== null){
        try {
            const AccountID = Find.AccountID

    
            const account = await stripe.accounts.retrieve(AccountID);
           
                const verification = account.requirements
                const status =  account.charges_enabled ? 'Verified' : 'Pending'

               
                console.log(status + ' THIS IS status')

                stat = status

                if(status == 'Pending'){
                     Prog = 'Second Step'
                } else {
                    Prog = 'Complete'
                }

        
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
       
    }
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
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
                    res.render('Withdraw',{ Noti, Prog, stat, PFPurl, User, SB: ToTSB, Orders, UD })
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


app.get('/account/logout', async (req, res) => {

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
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
                    res.render('Logout',{ Noti, PFPurl, User, SB: ToTSB, Orders, UD })
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

app.get('/account/paymenthistory', async (req, res) => {

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
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
                                    res.render('PaymentHistory',{ Noti, PFPurl, BDK,  UD, BeatOD, User, SB: Beat, Orders, BoughtVP, MusicMixing })
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

app.get('/account/purchases', async (req, res) => {
    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

    try{

       



        const Beat = await DB.find().sort({ createdAt: -1 })

        const products = Beat.map(Beat => ({
            id: Beat._id,
            file: Beat.NameFile,
            user: Beat.UserCurr,
            bomm: Beat.bomm
            // add other fields as necessary
        }));
    let i = 0
    let urls = []
    let thefiles = []
        for(const product of products){
            if(product.user !== req.session.user){
                continue;
            }
            if(product.bomm == undefined || product.bomm > 2){
                continue;
            }

            i++;
            const data = await s3.listObjectsV2({
                Bucket: 'soundmixerzbucket',
              });

            const foundFile = data.Contents.find(file => file.Key === product.file);
              thefiles.push(product.file)
  

    
        if(foundFile == undefined){
            continue;
        }

   
        
          const params = {
              Bucket: 'soundmixerzbucket', // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

        

        urls.push(url)
        }


        console.log(urls + '\n\n' + thefiles)
        

      const Notis = await Noti.find().sort({ createdAt: -1 })
      const Orders = await SC.find()
      const BoughtVP = await BV.find().sort({ createdAt: -1 })
      const MusicMixing = await MM.find().sort({ createdAt: -1})
      const UDs = await UD.find()
      const SMM = await SB.find().sort({ createdAt: -1 })
        const User = req.session.user
        res.render('Purchases',{ Noti: Notis,urls, PFPurl, thefiles, User,SMM, UD: UDs, SB: Beat, Orders, BoughtVP, MusicMixing })

    }catch(err){
        console.log(err)
    }
})


app.get('/account/SellersProfile', async (req, res) => {

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

            const Beats = await BT.find({username: req.session.user})
        
        
            const products = Beats.map(beat => ({
                id: beat._id,
                file: beat.src
                // add other fields as necessary
            }));
        
        
            const productFiles = products.map(product => product.file);
           
            console.log(productFiles)
        
            let i = 0
        
            let urls = []
            let picnames = []
        
            const bucketName = 'soundmixerzbucket';
            const data = await s3.listObjectsV2({
                Bucket: bucketName,
              }); 
            
            for(const productFile of productFiles){
            
        
                if(productFile == 'NoImg.jpg'){
                    continue;
                }
                const foundFile = data.Contents.find(file => file.Key === productFile);
        
                
                
                picnames.push(foundFile.Key)
            
                
        
           
                
                  const params = {
                      Bucket: bucketName, // Replace with your Space name
                      Key: foundFile.Key, // The file name in your Space
                      Expires: 60, // URL expiration time in seconds
                      ResponseContentType: 'image/jpeg', // Set to the correct content type
                      ResponseContentDisposition: 'inline', // Set to inline
           
                    };
                  
                  
                      const command = new GetObjectCommand(params); // Proper instantiation
                      url = await getSignedUrl(s3, command);
                  
        
                
        
                urls.push(url)
                }
            

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
                    res.render('SellerProfile', {Noti, PFPurl, Orders, User,UD, BT: Beats, urls, picnames})

                    })
                   
        })
   
    
})
    })

}})



app.get('/account/Display', async (req, res) => {

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('Display', {Noti, PFPurl, Orders, User,UD, BT: Beats})

                    })
                   
        })
   
    
})
    })

}

})





//SKULLY'S MM ORDERS
app.get('/account/awpdijowofihweojfwoeugwoiejfklshfomevjdswldenfpa', async (req, res) => {

if(req.session.user !== 'SkullyFresh'){
    res.redirect('/Log-in')
}

let PFPurl = null
if(req.session.user !== undefined){
    const result = await UD.findOne({username: req.session.user})
    const bucketName = 'soundmixerzbucket'; 


   


    const PFP = result.pfp
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      });

    if(PFP !== 'avatar.jpg'){
        const foundFile = data.Contents.find(file => file.Key === PFP);

        

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              PFPurl = await getSignedUrl(s3, command);
             
          }
        }
try {

    const bucketName = 'soundmixerzbucket'


        const MusicMs = await MM.find().sort({ createdAt: 1})

        console.log(MusicMs + ' THIS IS THE MUSIC MS')

        let MMUrls = []
        let urls = []
       
        if(MusicMs.length > 0){
        MusicMs.forEach(MusicMs => {
            MMUrls.push(MusicMs.file)
        })
        
        console.log(MMUrls + ' THESE THEM')

     

        
        for(const MusicM of MusicMs){

            console.log(MusicM.file)

            const data = await s3.listObjectsV2({
                Bucket: 'soundmixerzbucket',
              });


            
         
              const foundFile = data.Contents.find(file => file.Key === MusicM.file);

       

          
              

         
              
                const params = {
                    Bucket: bucketName, // Replace with your Space name
                    Key: foundFile.Key, // The file name in your Space
                    Expires: 60 * 60 * 24 * 30, // URL expiration time in seconds
                    ResponseContentDisposition: 'inline', // Set to inline
         
                  };
                
                
                    const command = new GetObjectCommand(params); // Proper instantiation
                    url = await getSignedUrl(s3, command);
                
                

                    urls.push(url)

        }
    }
        

        const Notis = await Noti.find().sort({ createdAt: -1 })
        const Orders = await SC.find()
        const UDs = await UD.find()
        const User = req.session.user
        res.render('Orders', {Noti: Notis, PFPurl, Orders,MMUrls, urls, MM: MusicMs, UD: UDs, User})



} catch(err){
    console.log(err)
}







})

//SKULLY'S MM PENDING ORDERS

app.get('/account/awpdijowofihweojfwoeugwoiejfklshfomevjdswldenfpa/akehdkjhkjfhjhdhj', async (req, res) => {

    if(req.session.user !== 'SkullyFresh'){
        res.redirect('/Log-in')
    }

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
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
                    const User = req.session.user
                    res.render('OrdersPending', {Noti, PFPurl, Orders, MM, UD, User})
    
                })
        
    
            })
         
        })
        
    })
    
    
})

//SKULLY'S COMPLETED ORDERS
app.get('/account/awpdijowofihweojfwoeugwoiejfklshfomevjdswldenfpa/aaspaskodkasjdhasdjtsfted', async (req, res) => {

        if(req.session.user !== 'SkullyFresh'){
            res.redirect('/Log-in')
        }

        let PFPurl = null
        if(req.session.user !== undefined){
            const result = await UD.findOne({username: req.session.user})
            const bucketName = 'soundmixerzbucket'; 
        
        
           
        
        
            const PFP = result.pfp
            const data = await s3.listObjectsV2({
                Bucket: bucketName,
              });
        
            if(PFP !== 'avatar.jpg'){
                const foundFile = data.Contents.find(file => file.Key === PFP);
        
                
        
            
                
        
           
                
                  const params = {
                      Bucket: bucketName, // Replace with your Space name
                      Key: foundFile.Key, // The file name in your Space
                      Expires: 60, // URL expiration time in seconds
                      ResponseContentType: 'image/jpeg', // Set to the correct content type
                      ResponseContentDisposition: 'inline', // Set to inline
           
                    };
                  
                  
                      const command = new GetObjectCommand(params); // Proper instantiation
                      PFPurl = await getSignedUrl(s3, command);
                     
                  }
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
                        res.render('OrdersCompleted', {Noti, PFPurl, Orders, MM, UD})
        
                    })
            
        
                })
             
            })
            
        })
        
        
})

//JAMESHDEV's REPORTS

app.get('/account/alwioudhfbuefoipnawsedpoqawopidsdwdawdjkhwa', async (req, res) => {

if(req.session.user !== 'JamesHDev'){
    res.redirect('/Log-in')
}

let PFPurl = null
if(req.session.user !== undefined){
    const result = await UD.findOne({username: req.session.user})
    const bucketName = 'soundmixerzbucket'; 


   


    const PFP = result.pfp
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      });

    if(PFP !== 'avatar.jpg'){
        const foundFile = data.Contents.find(file => file.Key === PFP);

        

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              PFPurl = await getSignedUrl(s3, command);
             
          }
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
                res.render('Reports', {Noti, PFPurl, Orders, RP, BT, UD})

                })
               

            })
    

        })
     
    })
    
})




})

app.get('/account/sdukfgsefopiwsyudopeduqweslkjfjhseuifphoisea', async (req, res) => {

if(req.session.user !== 'SoundMixerz'){
        res.redirect('/Log-in')
}

let PFPurl = null
if(req.session.user !== undefined){
    const result = await UD.findOne({username: req.session.user})
    const bucketName = 'soundmixerzbucket'; 


   


    const PFP = result.pfp
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      });

    if(PFP !== 'avatar.jpg'){
        const foundFile = data.Contents.find(file => file.Key === PFP);

        

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              PFPurl = await getSignedUrl(s3, command);
             
          }
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
                    res.render('Emails', {Noti, PFPurl, Orders, UD})
                })


    })

})


})

app.post('/SendMusicBackToUserKJSNDKJSDNKJSksdfndskSKDJFskdnf/:id',upload.single('audioFile'), async (req, res) => {

    const ID = req.params.id
    const filename = req.file.key
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


    const data = await s3.listObjectsV2({
        Bucket: 'soundmixerzbucket',
      });
  
      const bucketName = 'soundmixerzbucket'
   
  
  
      const foundFile = data.Contents.find(file => file.Key === req.file.key)

      console.log('FOUND PFP IN DGS' + foundFile.Key)



    const params = {
        Bucket: bucketName, // Replace with your Space name
        Key: foundFile.Key, // The file name in your Space
        Expires: 60, // URL expiration time in seconds
        ResponseContentDisposition: 'inline', // Set to inline

      };
    
    
        const command = new GetObjectCommand(params); // Proper instantiation
        url = await getSignedUrl(s3, command);
    


   const Purchase = new DB({
        UserCurr: Pending.user,
        bomm: 2,
        NameFile: req.file.key,
        DownUrl: url,

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

app.get('/account/klsddgfjksuFDKHGkjshdkjsFDRYWpljehbdwpeoriufjdks', async (req, res) => {

    if(req.session.user == undefined){
        res.redirect('/Log-in')
    }
    if(req.session.user !== "SoundMixerz" && req.session.user !== "JamesHDev" && req.session.user !== "SkullyFresh"){
        res.redirect('/Log-in')
    }

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
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
                        res.render('Analytics',{ Noti, UD, PFPurl, BeatOD, User, SB: Beat, Orders, BoughtVP, MusicMixing })

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

app.delete('/MMOR/:id', async (req, res) => {
    const ID = req.params.id

    console.log('REACHED MMOR ')

    try{
        const result = await MM.findById(ID)
        const filename = result.file


        const Pending = new PD ({
            user: result.user,
            genre: result.genre,
            context: result.context,
            WhichPack: result.WhichPack,
        })
        Pending.save()
        await s3.deleteObject({
            Bucket: 'soundmixerzbucket',
            Key: filename, // The filename to delete
          });
    const delMM = await MM.findByIdAndDelete(ID)
    console.log(delMM)
    res.json({ message: `File Deleted` });
    return;

    } catch(err){
        console.log(err)
    }


   
    

    })




app.delete('/DeleteBeat/:id', async (req, res) => {

const ID = req.params.id
console.log(ID)
try{
    
    const result = await BT.findById(ID)
        console.log(result)
        const img = result.extSrc
        const file = result.file
       
      
        console.log(file)
        console.log(img)
        await s3.deleteObject({
            Bucket: 'soundmixerzbucket',
            Key: file, // The filename to delete
          });
        if(img !== 'NoImg.jpg'){
            await s3.deleteObject({
                Bucket: 'soundmixerzbucket',
                Key: img, // The filename to delete
              });


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



app.get('/shopping-cart', async (req, res) =>{

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                res.render('shopping-cart',{Noti, PFPurl, User, Orders, UD})

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

app.get('/Presets/FrankOcean', async (req, res) =>{

    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    






    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
    
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
            res.render('FrankOcean',{ Noti, PFPurl, User,UD, REV: Reviews, Orders, urls, Users })

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



app.get('/Presets/BrentFaiyaz', async (req, res) =>{

    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    



    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('Brentfaiyaz',{ Noti, PFPurl, User,UD, BrentFaiyazREV: Reviews, Orders, urls, Users })
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


app.get('/Presets/DonToliver', async (req, res) =>{

    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    


    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('dontoliver',{ Noti,UD, PFPurl, User, DonToliverREV: Reviews, Orders, urls, Users })
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

app.get('/Presets/BrysonTiller', async (req, res) =>{


    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    


    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('BrysonTiller',{ Noti, User, PFPurl, JojiREV: Reviews, Orders, UD, urls, Users })
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



app.get('/Presets/Autumn', async (req, res) =>{

    
    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    


    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('Autumn',{ Noti, User, PFPurl, UD, LilBabyREV: Reviews, Orders, Users, urls })
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


app.get('/Presets/LilTjay', async (req, res) =>{

       
    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    


    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('LilTjay',{ Noti, User, PFPurl, LilTjayREV: Reviews, Orders, UD, Users, urls })
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



app.get('/Presets/TheWeeknd', async (req, res) =>{

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('TheWeekend',{ Noti, User, PFPurl, TheWeekndREV: Reviews, Orders, UD })
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


app.get('/Presets/ToryLanez', async (req, res) =>{

         
    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    



    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

   
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
                    res.render('ToryLanez',{ Noti, PFPurl, User, ToryLanezREV: Reviews, Orders, UD, Users, urls })
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


app.get('/Presets/TravisScott', async (req, res) =>{

    
    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('TravisScott',{ Noti, PFPurl, User, TravisScottREV: Reviews, Orders, UD, Users, urls })
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


app.get('/Presets/DestroyLonely', async (req, res) =>{

    
    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('DestroyLonely',{ Noti, PFPurl, User, TylerTheCreatorREV: Reviews, Orders, UD, Users, urls })
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


app.get('/Presets/KenCarson', async (req, res) =>{

    
    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }


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
                    res.render('KenCarson',{ Noti, PFPurl, User,UD, YeatREV: Reviews, Orders, Users, urls })
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

app.get('/Presets/PlayBoiCarti', async (req, res) =>{


    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('playboicarti',{ Noti, User, PFPurl, PlayBoiCartiREV: Reviews, Orders, UD })
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

app.get('/Presets/PostMalone', async (req, res) =>{

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('PostMalone',{ Noti, User, PFPurl, PostMaloneREV: Reviews, Orders, UD })
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



app.get('/Presets/SoFaygo', async (req, res) =>{

    
    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    


    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('SoFaygo',{ Noti, User, PFPurl, SoFaygoREV: Reviews, Orders, UD, Users, urls })
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



app.get('/Presets/TheKidLaroi', async (req, res) =>{

    
    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('TheKidLaroi',{ Noti, User, PFPurl, TheKidLaroiREV: Reviews, Orders, UD, Users, urls })
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


app.get('/Presets/TrippieRedd', async (req, res) =>{

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('TrippieRedd',{ Noti, User, PFPurl, TrippieReddREV: Reviews, Orders, UD })
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


app.get('/Presets/LilUziVert', async (req, res) =>{

    
    const REVDT = await REV.find()


    const products = REVDT.map(Rev => ({
        id: Rev._id,
        user: Rev.username
        // add other fields as necessary
    }));

    let filePFPs = []
    let urls = []
    let Users = []

    const productFiles = products.map(product => product.user);
   
  



    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 

      for(const productFile of productFiles){

        const UDs = await UD.find({username: productFile})

        
        
        const products = UDs.map(Rev => ({
            id: Rev._id,
            file: Rev.pfp,
            user: Rev.username
            // add other fields as necessary
        }));
    
    
        const productFilesbruh = products.map(product => product.file);

        const User = products.map(product => product.user);


        

        filePFPs.push(productFilesbruh)
        Users.push(User)




      }

    

    let i = -1

    
    for(const filePFP of filePFPs){

        i++

        
        const PFPfile = filePFP[0]

        console.log(PFPfile + " THIS IS THE PFP FILE")
    

        
        const foundFile = data.Contents.find(file => file.Key === PFPfile);

        console.log(foundFile + ' THIS IS THE FOUND FILE')

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

              urls.push(url)

    }

    


    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                    res.render('LilUziVert',{ Noti, User, PFPurl, TyDollaSignREV: Reviews, Orders, UD, Users, urls })
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



app.get('/Presets/YNWMelly', async (req, res) =>{

    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

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
                res.render('YNWMelly',{ Noti, User, PFPurl, YNWMellyREV: Reviews, Orders, UD })

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



app.delete('/Unlink/:id', async (req, res) => {

    console.log('REACHED BITCH')

try{
    const ID = req.params.id
const result = await DB.findById(ID)

const filename = result.NameFile
const imagefile = result.src

const DelPur = await DB.findByIdAndDelete(ID)
console.log(DelPur)

    await s3.deleteObject({
        Bucket: 'soundmixerzbucket',
        Key: filename, // The filename to delete
      });


if(imagefile !== 'NoImg.jpg'){
    await s3.deleteObject({
        Bucket: 'soundmixerzbucket',
        Key: imagefile, // The filename to delete
      });
}

    
   
    
    res.json({ message: `File Deleted` });
    return;
}catch(err){
    console.log(err)
}

  
        
        
       
         




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



    


app.get('/beats/:id', async (req,res) => {
    const ID = req.params.id
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }


              
            }
    
            const BTD = await BT.findById(ID)
            let picurl = null
            const username = BTD.username
        
            console.log(BTD.src + ' The beat file is right here')
        
                
                
        if(BTD.src !== 'NoImg.jpg'){
            const bucketName = 'soundmixerzbucket';
            const data = await s3.listObjectsV2({
                Bucket: bucketName,
              }); 
            
          
        
                const foundFile = data.Contents.find(file => file.Key === BTD.src);
        
                
                
               
            
                
        
           
                
                  const params = {
                      Bucket: bucketName, // Replace with your Space name
                      Key: foundFile.Key, // The file name in your Space
                      Expires: 60, // URL expiration time in seconds
                      ResponseContentType: 'image/jpeg', // Set to the correct content type
                      ResponseContentDisposition: 'inline', // Set to inline
           
                    };
                  
                  
                      const command = new GetObjectCommand(params); // Proper instantiation
                      picurl = await getSignedUrl(s3, command);
                      console.log(picurl + " THIS IS THE PIC URL BROOOOOOOOO")
        
                }
        

    const UDs = await UD.findOne({username: username})

    console.log("PFP IS " + UDs.pfp)

    const PFP = UDs.pfp

    url = null

    if(PFP !== 'avatar.jpg'){
    const data = await s3.listObjectsV2({
        Bucket: 'soundmixerzbucket',
      });
  
      const bucketName = 'soundmixerzbucket'
   
  
  
      const foundFile = data.Contents.find(file => file.Key === PFP)

      console.log('FOUND PFP IN DGS' + foundFile.Key)



    const params = {
        Bucket: bucketName, // Replace with your Space name
        Key: foundFile.Key, // The file name in your Space
        Expires: 60, // URL expiration time in seconds
        ResponseContentType: 'image/jpeg', // Set to the correct content type
        ResponseContentDisposition: 'inline', // Set to inline

      };
    
    
        const command = new GetObjectCommand(params); // Proper instantiation
        url = await getSignedUrl(s3, command);
    
    }

    
    
   
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
                    res.render('SellPage',{ Noti, UD: UDs, url, PFPurl,picurl, User, FV: FV,BTall: ult, BT: spec, User , title: speuser + "'s" + " Beats", Orders })
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

app.get('/ReportBeat/:id', async (req, res) => {

    const ID = req.params.id
    let PFPurl = null

    const Beat = await BT.findById(ID)

    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }

            url = null

            if(Beat.src !== 'NoImg.jpg'){

                const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
            
                const data = await s3.listObjectsV2({
                    Bucket: bucketName,
                  });

            const foundFiles = data.Contents.find(file => file.Key === Beat.src);
    
            console.log(foundFiles.Key + ' FOUND FILE')
    
        
            
    
       
            
              const paramss = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFiles.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const commands = new GetObjectCommand(paramss); // Proper instantiation
                  url = await getSignedUrl(s3, commands);
              

            }
   
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
                    res.render('Report',{ Noti, UD: UDs, url, PFPurl, User, FV: FV,BTall: ult, BT: spec, User , title: speuser + "'s" + " Beats", Orders })
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

app.get('/OtherBeats/:user', async (req, res) => {

    const speuser = req.params.user
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
    
    let url = null
 

    const UDs = await UD.findOne({username: speuser})

    console.log("PFP IS " + UDs.pfp)

    const PFP = UDs.pfp

    if(PFP !== 'avatar.jpg'){
    const data = await s3.listObjectsV2({
        Bucket: 'soundmixerzbucket',
      });
  
      const bucketName = 'soundmixerzbucket'
   
  
  
      const foundFile = data.Contents.find(file => file.Key === PFP)

      console.log('FOUND PFP IN DGS' + foundFile.Key)



    const params = {
        Bucket: bucketName, // Replace with your Space name
        Key: foundFile.Key, // The file name in your Space
        Expires: 60, // URL expiration time in seconds
        ResponseContentType: 'image/jpeg', // Set to the correct content type
        ResponseContentDisposition: 'inline', // Set to inline

      };
    
    
        const command = new GetObjectCommand(params); // Proper instantiation
        url = await getSignedUrl(s3, command);
    
    }
   

    const Beats = await BT.find({username: speuser})

    const products = Beats.map(beat => ({
        id: beat._id,
        file: beat.src
        // add other fields as necessary
    }));


    const productFiles = products.map(product => product.file);
   
    console.log(productFiles)

    let i = 0

    let urls = []
    let picnames = []

    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 
    
    for(const productFile of productFiles){
    

        if(productFile == 'NoImg.jpg'){
            continue;
        }
        const foundFile = data.Contents.find(file => file.Key === productFile);

        pn = foundFile.Key

        picnames.push(pn)


        

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              urll = await getSignedUrl(s3, command);
          

        

        urls.push(urll)
    }



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
                res.render('OtherBeats',{ Noti, urls, picnames, UD: UDs,Auser: speuser, PFPurl, User, url, FV: FV,BTall: ult, User , title: speuser + "'s" + " Beats", Orders })

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

app.get('/audio/:id', async (req, res) => {

    const ID = req.params.id;
    console.log("ID: " + ID)
    const data = await s3.listObjectsV2({
        Bucket: 'soundmixerzbucket',
      });

    const bucketName = 'soundmixerzbucket'; 


    const Beat = await BT.findById(ID);

    const filename = Beat.file
    console.log(filename)

    const foundFile = data.Contents.find(file => file.Key === filename);

    const params = {
        Bucket: bucketName, // Replace with your Space name
        Key: foundFile.Key, // The file name in your Space
        Expires: 60, // URL expiration time in seconds
        ResponseContentType: 'application/octet-stream', // Set to the correct content type
        ResponseContentDisposition: 'inline', // Set to inline

      };
    
    
        const command = new GetObjectCommand(params); // Proper instantiation
        url = await getSignedUrl(s3, command);
    
    

    ;

    res.json({message: url})

    
    
   
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


app.get('/PlayAudio/:id', async (req, res) => {

    const ID = req.params.id

    const result = await BT.findById(ID)
    
        const file = result.file
        const price= result.pob
        const Beatname = result.beatname
        const src = result.src
        const user = result.username
        

       
        
        const data = await s3.listObjectsV2({
            Bucket: 'soundmixerzbucket',
          });
    
        const bucketName = 'soundmixerzbucket'; 
    
    
        const Beat = await BT.findById(ID);
    
        const filename = Beat.file
        console.log(filename)
    
        const foundFile = data.Contents.find(file => file.Key === filename);
      

        console.log(foundFile.Key)

        const fileName = foundFile.Key

        let contentType;
  if (fileName.endsWith('.mp3')) {
    contentType = 'audio/mpeg';
  } else if (fileName.endsWith('.wav')) {
    contentType = 'audio/wav';
  } else if (fileName.endsWith('.ogg')) {
    contentType = 'audio/ogg';
  } else if (fileName.endsWith('.aac')) {
    contentType = 'audio/aac';
  } else {
    contentType = 'application/octet-stream'; // Fallback
  }
    
        const params = {
            Bucket: bucketName, // Replace with your Space name
            Key: foundFile.Key, // The file name in your Space
            Expires: 60, // URL expiration time in seconds
            ResponseContentType: contentType, // Set to the correct content type
            ResponseContentDisposition: 'inline', // Set to inline
    
          };


        
        
            const command = new GetObjectCommand(params); // Proper instantiation
            const url = await getSignedUrl(s3, command);
        

urls = 'NoImg.jpg'

            if(src !== 'NoImg.jpg'){
                const pic = data.Contents.find(file => file.Key === src);
        
    
            const paramss = {
                Bucket: bucketName, // Replace with your Space name
                Key: pic.Key, // The file name in your Space
                Expires: 60, // URL expiration time in seconds
                ResponseContentType: 'image/jpeg', // Set to the correct content type
                ResponseContentDisposition: 'inline', // Set to inline
        
              };

              const commands = new GetObjectCommand(paramss); // Proper instantiation
              urls = await getSignedUrl(s3, commands);
              console.log(urls + " THIS IS THE URL WOOHOO")
            } 

       

        res.json({ message: url, price: price,user: user,src: urls, beatname:Beatname, ID: ID })


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
    const result = await BT.findById(ID)
    console.log(req.file.key + ' THIS SI THE KEY')
    const data = await s3.listObjectsV2({
        Bucket: 'soundmixerzbucket',
      });
        console.log(result.src)
        const imagefile = result.src
        
        if(imagefile !== 'NoImg.jpg'){
            console.log('Reached this bro fag')
            await s3.deleteObject({
                Bucket: 'soundmixerzbucket',
                Key: imagefile, // The filename to delete
              });

              console.log('DELETED THE FILE OFF DIGITAL OCEAN!')
        }
    
        const foundFile = data.Contents.find(file => file.Key === req.file.key);

        

    
        const bucketName = 'soundmixerzbucket'

   
        
          

    const { beatname, pob, tag1, tag2, tag3, description, file } = req.body
    const updatedUserInfo = req.body;
   
    updatedUserInfo.src = req.file.key
    updatedUserInfo.extSrc = req.file.key
    updatedUserInfo.username = req.session.user
    console.log(updatedUserInfo)

    const updatedUser = await BT.findByIdAndUpdate(ID, updatedUserInfo, { new: true });
    console.log(updatedUser)
    
    if (!updatedUser) {
        return res.json({ message: 'User not found' });
    }
    res.json({ message: 'Updated Success'})
} catch(err){
    console.log(err)
}
    
})

app.put('/changePfp/:id', upload.single('pfp'),  async (req, res) => {

    console.log('reached change pfp, upload should have worked maybe!')

    console.log(req.file.key)

    const filename = req.file.key

    const data = await s3.listObjectsV2({
      Bucket: 'soundmixerzbucket',
    });

 


    const foundFile = data.Contents.find(file => file.Key === filename)



    
    const ID = req.params.id

    try{

        const UserData = await UD.findById(ID)
        console.log(UserData)
        if(UserData.pfp !== 'avatar.jpg'){
            await s3.deleteObject({
                Bucket: 'soundmixerzbucket',
                Key: UserData.pfp, // The filename to delete
              });

              console.log('DELETED THE FILE OFF DIGITAL OCEAN!')
        }

    } catch(err){
    
    console.log(err)
    }
    
    console.log(ID)
    const { userp, emailp, monthp, dayp, yearp, NewPass, package, verified } = req.body

    console.log(req.body)
    const updatedUserInfo = req.body
    updatedUserInfo.pfp = filename
    
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

app.get('/EditSellerProfile/:id', async (req, res) => {
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
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
                res.render('EditSellerProfile',{ Noti, PFPurl, User, Edit, Orders, UD })

                })
                
              } )
           
           
    
        })
       .catch((err) => {
        console.log(err)
       })

    })    
    }

})


app.post('/BoughtBeat', async (req, res) => {
    console.log(req.body.CurrUser + 'THIS ONE')
    if(req.body.CurrUser == ''){
        res.json({ message: 'Not Logged In'})
        return;
    }
    const data = await s3.listObjectsV2({
        Bucket: 'soundmixerzbucket',
      });
  
    const bucketName = 'soundmixerzbucket'; 


    const foundFile = data.Contents.find(file => file.Key === req.body.NameFile);

              

          
              

         
              
                const params = {
                    Bucket: bucketName, // Replace with your Space name
                    Key: foundFile.Key, // The file name in your Space
                    Expires: 60 * 60 * 24 * 30000, // URL expiration time in second
                    ResponseContentDisposition: 'inline', // Set to inline
         
                  };
                
                
                    const command = new GetObjectCommand(params); // Proper instantiation
                    const url = await getSignedUrl(s3, command);
                
                
              
    
    const SoldBeat = new Noti (req.body)
    ID = req.body.ID
    FV.deleteMany({ ID: ID })
    .then((result) => {
        console.log(result)
        console.log('SUCCESSFULLY DELETED ALL FAVS')
    })
        
    const username = req.session.user
        
    const UData = await UD.findOne({username: req.body.SellUser})


    console.log(UData.emailaddress)

    console.log(UData)

    const email = UData.emailaddress

    const StripePayAcc = await NSA.findOne({email: email})

    const pack = UData.package

   

    console.log(StripePayAcc.AccountID)

        const AccId = StripePayAcc.AccountID

        let price = req.body.pobBeat

        let total = price

        if(pack == 'Free'){
            total = total * .85
        }

    try {
        const transfer = await stripe.transfers.create({
            amount: total * 100,  // Convert dollars to cents
            currency: "usd",
            destination: AccId, // The connected Express account ID
            description: "Payout for user earnings"
        });

        console.log(transfer)
    } catch (error) {
        console.log( error.message + ' THIS IS THE TRANSFER ERROR' );
    }
  
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
                    DownUrl: url,

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

/*
const storeItems = new Map([

    



    [1, { price: 2000, name: 'Autumn! FL Studio Vocal Preset' }],
    [2, { price: 2000, name: 'Autumn! Logic Pro X Vocal Preset' }],

    [3, { price: 2000, name: 'Destroy Lonely FL Studio Vocal Preset' }],
    [4, { price: 2000, name: 'Destroy Lonely Logic Pro X Vocal Preset' }],

    [5, { price: 2000, name: 'Ken Carson FL Studio Vocal Preset' }],
    [6, { price: 2000, name: 'Ken Carson Logic Pro X Vocal Preset' }],

    [7, { price: 2000, name: 'Tory Lanez FL Studio Vocal Preset' }],
    [8, { price: 2000, name: 'Tory Lanez Logic Pro X Vocal Preset' }],

    [9, { price: 2000, name: 'Frank Ocean FL Studio Vocal Preset' }],
    [10, { price: 2000, name: 'Frank Ocean Logic Pro X Vocal Preset' }],

    [11, { price: 2000, name: 'Don Toliver FL Studio Vocal Preset' }],
    [12, { price: 2000, name: 'Don Toliver Logic Pro X Vocal Preset' }],

    [13, { price: 2000, name: 'Bryson Tiller FL Studio Vocal Preset' }],
    [14, { price: 2000, name: 'Bryson Tiller Logic Pro X Vocal Preset' }],

    [15, { price: 2000, name: 'Travis Scott FL Studio Vocal Preset' }],
    [16, { price: 2000, name: 'Travis Scott Logic Pro X Vocal Preset' }],

    [17, { price: 2000, name: 'Lil Tjay FL Studio Vocal Preset' }],
    [18, { price: 2000, name: 'Lil Tjay Logic Pro X Vocal Preset' }],

    [19, { price: 2000, name: 'SoFaygo FL Studio Vocal Preset' }],
    [20, { price: 2000, name: 'SoFaygo Logic Pro X Vocal Preset' }],

    [21, { price: 2000, name: 'The Kid LAROI FL Studio Vocal Preset' }],
    [22, { price: 2000, name: 'The Kid LAROI Logic Pro X Vocal Preset' }],

    [23, { price: 2000, name: 'Lil Uzi Vert FL Studio Vocal Preset' }],
    [24, { price: 2000, name: 'Lil Uzi Vert Logic Pro X Vocal Preset' }],

    [25, { price: 2000, name: 'SoundMixerz DrumKit Part 1' }],

    [50, { price: `${process.env.BASIC_TEST_SUBSCRIPTION}`, name: 'Basic Subscription' }],
    [51, { price: `${process.env.PRO_TEST_SUBSCRIPTION}`, name: 'Pro Subscription' }],

    [999, { price: 0, name: 'PlaceHolder'}]//ID FOR BEATS
]);

*/

app.post('/GotoMySC', async (req, res) => {

let file = []    
let name = []
let bomm = []
let items = []


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
                        items.push({id: 1})
                        break;
                    case "2":
                        console.log('Destroy Lonely')
                        array = '/PresetAudios/[Destroy Lonely] FL Studio .fst'
                        file.push(array)
                        name.push('Destroy Lonely Vocal Preset')
                        bomm.push(3)
                        items.push({id: 3})
                        break;
                    case "3":
                        console.log('Ken Carson')
                        array = '/PresetAudios/[Ken Carson] FL Studio  (1).fst'
                        file.push(array)
                        name.push('Ken Carson Vocal Preset')
                        bomm.push(3)
                        items.push({id: 5})

                        break;
                    case "4":
                        console.log('Tory Lanez')
                    array = '/PresetAudios/[Tory Lanez] FL Studio  (1).fst'
                    file.push(array)
                    name.push('Tory Lanez Vocal Preset')
                    bomm.push(3)
                    items.push({id: 7})

                        break;
                    case "5":
                        console.log('Frank Ocean')
                    array = '/PresetAudios/[Frank Ocean] FL Studio .fst'
                    file.push(array)
                    name.push('Frank Ocean Vocal Preset')
                    bomm.push(3)
                    items.push({id: 9})

                        break;
                    case "6":
                        console.log('Don Toliver')
                        array = '/PresetAudios/[Don Toliver] FL Studio .fst'
                        file.push(array)
                        name.push('Don Toliver Vocal Preset')
                        bomm.push(3)
                        items.push({id: 11})

                        break;
                    case "7":
                        console.log('Bryson Tiller')
                        array = '/PresetAudios/[Bryson Tiller] FL Studio .fst'
                        file.push(array)
                        name.push('Bryson Tiller Vocal Preset')
                        bomm.push(3)
                        items.push({id: 13})

                        break;
                    case "8":
                        console.log('Travis Scott')
                        array = '/PresetAudios/Travis Scott FL Studio  (1).fst'
                        file.push(array)
                        name.push('Travis Scott Vocal Preset')
                        bomm.push(3)
                        items.push({id: 15})

                        break;
                    case "9":
                        console.log('Lil Tjay')
                        array = '/PresetAudios/[Lil tjay] FL Studio .fst'
                        file.push(array)
                        name.push('Lil Tjay Vocal Preset')
                        bomm.push(3)
                        items.push({id: 17})

                        break;
                    case "10":
                        console.log('SoFaygo')
                        array = '/PresetAudios/[SoFaygo] FL Studio.fst'
                        file.push(array)
                        name.push('SoFaygo Vocal Preset')
                        bomm.push(3)
                        items.push({id: 19})

                        break;

                    case "11":
                        console.log('The Kid Laroi')
                        array = '/PresetAudios/[The Kid LAROI] FL Studio .fst'
                        file.push(array)
                        name.push('The Kid Laroi Vocal Preset')
                        bomm.push(3)
                        items.push({id: 21})

                        break;
                    case "12":
                        console.log('Lil Uzi Vert')
                        array = '/PresetAudios/Lil Uzi Vert FL Studio  (1).fst'
                        file.push(array)
                        name.push('Lil Uzi Vert Vocal Preset')
                        bomm.push(3)
                        items.push({id: 23})

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
                    items.push({id: 2})
                    
                    break;
                case "2":
                    console.log('Destroy Lonely')
                    array = '/PresetAudios/Destroy Lonely .patch.zip'
                    file.push(array)
                    name.push('Destroy Lonely Vocal Preset')
                    bomm.push(3)
                    items.push({id: 4})

                    break;
                case "3":
                    console.log('Ken Carson')
                    array = '/PresetAudios/Ken Carson .patch.zip'
                    file.push(array)
                    name.push('Ken Carson Vocal Preset')
                    bomm.push(3)
                    items.push({id: 6})

                    break;
                case "4":
                    console.log('Tory Lanez')
                    array = '/PresetAudios/Tory Lanez .patch.zip'
                    file.push(array)
                    name.push('Tory Lanez Vocal Preset')
                    bomm.push(3)
                    items.push({id: 8})

                    break;
                case "5":
                    console.log('Frank Ocean')
                    array = '/PresetAudios/FRANK OCEAN .patch.zip'
                    file.push(array)
                    name.push('Frank Ocean Vocal Preset')
                    bomm.push(3)
                    items.push({id: 10})

                    break;
                case "6":
                    console.log('Don Toliver')
                    array = '/PresetAudios/Don Toliver .patch.zip'
                    file.push(array)
                    name.push('Don Toliver Vocal Preset')
                    bomm.push(3)
                    items.push({id: 12})

                    break;
                case "7":
                    console.log('Bryson Tiller')
                    array = '/PresetAudios/BRYSON TILLER .patch.zip'
                    file.push(array)
                    name.push('Bryson Tiller Vocal Preset')
                    bomm.push(3)
                    items.push({id: 14})

                    break;
                case "8":
                    console.log('Travis Scott')
                    array = '/PresetAudios/TRAVIS SCOTT 1.patch.zip'
                    file.push(array)
                    name.push('Travis Scott Vocal Preset')
                    bomm.push(3)
                    items.push({id: 16})

                    break;
                case "9":
                    console.log('Lil Tjay')
                    array = '/PresetAudios/LIL TJAY .patch.zip'
                    file.push(array)
                    name.push('Lil Tjay Vocal Preset')
                    bomm.push(3)
                    items.push({id: 18})

                    break;
                case "10":
                    console.log('SoFaygo')
                    array = '/PresetAudios/SOFAYGO .patch.zip'
                    file.push(array)
                    name.push('SoFaygo Vocal Preset')
                    bomm.push(3)
                    items.push({id: 20})

                    break;
                case "11":
                    console.log('The Kid Laroi')
                    array = '/PresetAudios/THE KID LAROI.patch.zip'
                    file.push(array)
                    name.push('The Kid Laroi Vocal Preset')
                    bomm.push(3)
                    items.push({id: 22})

                    break;
                case "12":
                    console.log('Lil Uzi Vert')
                    array = '/PresetAudios/LIL UZI .patch.zip'
                    file.push(array)
                    name.push('Lil Uzi Vert Vocal Preset')
                    bomm.push(3)
                    items.push({id: 24})

                    break;
                }
            case 3:
                switch(ShopCart[i].SCNum){
                    case "1":
                        array = '/dks/SOUNDMIXERS DRUM KIT 1.zip'
                        file.push(array)
                        name.push('SoundMixerz DrumKit Part 1')
                        bomm.push(4)
                        items.push({id: 25})
                        break;
                }
        }
    }

    items.forEach(item => {
        console.log(item)
    })



    


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



app.post('/create-checkout-shopcart', async (req, res) => {

    const origin = req.body.referer

    
let file = []    
let name = []
let bomm = []
let items = []


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
                        items.push({id: 1})
                        break;
                    case "2":
                        console.log('Destroy Lonely')
                        array = '/PresetAudios/[Destroy Lonely] FL Studio .fst'
                        file.push(array)
                        name.push('Destroy Lonely Vocal Preset')
                        bomm.push(3)
                        items.push({id: 3})
                        break;
                    case "3":
                        console.log('Ken Carson')
                        array = '/PresetAudios/[Ken Carson] FL Studio  (1).fst'
                        file.push(array)
                        name.push('Ken Carson Vocal Preset')
                        bomm.push(3)
                        items.push({id: 5})

                        break;
                    case "4":
                        console.log('Tory Lanez')
                    array = '/PresetAudios/[Tory Lanez] FL Studio  (1).fst'
                    file.push(array)
                    name.push('Tory Lanez Vocal Preset')
                    bomm.push(3)
                    items.push({id: 7})

                        break;
                    case "5":
                        console.log('Frank Ocean')
                    array = '/PresetAudios/[Frank Ocean] FL Studio .fst'
                    file.push(array)
                    name.push('Frank Ocean Vocal Preset')
                    bomm.push(3)
                    items.push({id: 9})

                        break;
                    case "6":
                        console.log('Don Toliver')
                        array = '/PresetAudios/[Don Toliver] FL Studio .fst'
                        file.push(array)
                        name.push('Don Toliver Vocal Preset')
                        bomm.push(3)
                        items.push({id: 11})

                        break;
                    case "7":
                        console.log('Bryson Tiller')
                        array = '/PresetAudios/[Bryson Tiller] FL Studio .fst'
                        file.push(array)
                        name.push('Bryson Tiller Vocal Preset')
                        bomm.push(3)
                        items.push({id: 13})

                        break;
                    case "8":
                        console.log('Travis Scott')
                        array = '/PresetAudios/Travis Scott FL Studio  (1).fst'
                        file.push(array)
                        name.push('Travis Scott Vocal Preset')
                        bomm.push(3)
                        items.push({id: 15})

                        break;
                    case "9":
                        console.log('Lil Tjay')
                        array = '/PresetAudios/[Lil tjay] FL Studio .fst'
                        file.push(array)
                        name.push('Lil Tjay Vocal Preset')
                        bomm.push(3)
                        items.push({id: 17})

                        break;
                    case "10":
                        console.log('SoFaygo')
                        array = '/PresetAudios/[SoFaygo] FL Studio.fst'
                        file.push(array)
                        name.push('SoFaygo Vocal Preset')
                        bomm.push(3)
                        items.push({id: 19})

                        break;

                    case "11":
                        console.log('The Kid Laroi')
                        array = '/PresetAudios/[The Kid LAROI] FL Studio .fst'
                        file.push(array)
                        name.push('The Kid Laroi Vocal Preset')
                        bomm.push(3)
                        items.push({id: 21})

                        break;
                    case "12":
                        console.log('Lil Uzi Vert')
                        array = '/PresetAudios/Lil Uzi Vert FL Studio  (1).fst'
                        file.push(array)
                        name.push('Lil Uzi Vert Vocal Preset')
                        bomm.push(3)
                        items.push({id: 23})

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
                    items.push({id: 2})
                    
                    break;
                case "2":
                    console.log('Destroy Lonely')
                    array = '/PresetAudios/Destroy Lonely .patch.zip'
                    file.push(array)
                    name.push('Destroy Lonely Vocal Preset')
                    bomm.push(3)
                    items.push({id: 4})

                    break;
                case "3":
                    console.log('Ken Carson')
                    array = '/PresetAudios/Ken Carson .patch.zip'
                    file.push(array)
                    name.push('Ken Carson Vocal Preset')
                    bomm.push(3)
                    items.push({id: 6})

                    break;
                case "4":
                    console.log('Tory Lanez')
                    array = '/PresetAudios/Tory Lanez .patch.zip'
                    file.push(array)
                    name.push('Tory Lanez Vocal Preset')
                    bomm.push(3)
                    items.push({id: 8})

                    break;
                case "5":
                    console.log('Frank Ocean')
                    array = '/PresetAudios/FRANK OCEAN .patch.zip'
                    file.push(array)
                    name.push('Frank Ocean Vocal Preset')
                    bomm.push(3)
                    items.push({id: 10})

                    break;
                case "6":
                    console.log('Don Toliver')
                    array = '/PresetAudios/Don Toliver .patch.zip'
                    file.push(array)
                    name.push('Don Toliver Vocal Preset')
                    bomm.push(3)
                    items.push({id: 12})

                    break;
                case "7":
                    console.log('Bryson Tiller')
                    array = '/PresetAudios/BRYSON TILLER .patch.zip'
                    file.push(array)
                    name.push('Bryson Tiller Vocal Preset')
                    bomm.push(3)
                    items.push({id: 14})

                    break;
                case "8":
                    console.log('Travis Scott')
                    array = '/PresetAudios/TRAVIS SCOTT 1.patch.zip'
                    file.push(array)
                    name.push('Travis Scott Vocal Preset')
                    bomm.push(3)
                    items.push({id: 16})

                    break;
                case "9":
                    console.log('Lil Tjay')
                    array = '/PresetAudios/LIL TJAY .patch.zip'
                    file.push(array)
                    name.push('Lil Tjay Vocal Preset')
                    bomm.push(3)
                    items.push({id: 18})

                    break;
                case "10":
                    console.log('SoFaygo')
                    array = '/PresetAudios/SOFAYGO .patch.zip'
                    file.push(array)
                    name.push('SoFaygo Vocal Preset')
                    bomm.push(3)
                    items.push({id: 20})

                    break;
                case "11":
                    console.log('The Kid Laroi')
                    array = '/PresetAudios/THE KID LAROI.patch.zip'
                    file.push(array)
                    name.push('The Kid Laroi Vocal Preset')
                    bomm.push(3)
                    items.push({id: 22})

                    break;
                case "12":
                    console.log('Lil Uzi Vert')
                    array = '/PresetAudios/LIL UZI .patch.zip'
                    file.push(array)
                    name.push('Lil Uzi Vert Vocal Preset')
                    bomm.push(3)
                    items.push({id: 24})

                    break;
                }
            case 3:
                switch(ShopCart[i].SCNum){
                    case "1":
                        array = '/dks/SOUNDMIXERS DRUM KIT 1.zip'
                        file.push(array)
                        name.push('SoundMixerz DrumKit Part 1')
                        bomm.push(4)
                        items.push({id: 25})
                        break;
                }
        }
    }
}catch(err){
    console.log(err)
}

    items.forEach(item => {
        console.log(item)
    })


    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment', // You can also use 'subscription' here
            line_items: items.map(item => {
               
                const storeItem = storeItems.get(Number(item.id)); // Convert to number
               
                if (!storeItem) {
                    throw new Error(`Item with id ${item.id} not found`);
                }
                const ProductName = storeItem.name

               
                if(item.id == 999){
                    console.log('THIS IS A BEAT')
                    console.log(req.body.Data)
                    const Data = req.body.Data
                    UrlAdd = 'bt'
                    return {
                        price_data: {
                            currency: 'usd',
                            product_data: {
                                name: Data.NameBeat, //NAME OF ITEM
                            },
                            unit_amount: Data.pobBeat * 100 //PRICE OF ITEM FROM ID
                        },
                        quantity: item.quantity// QUANTITY OF ITMES
                    };

                }else if(ProductName.includes('FL Studio')){
                    console.log('INCLUDES FL STUDIO')
                    UrlAdd = 'fl'
                } else if(ProductName.includes('Logic Pro X')){
                    console.log('INCLUDES LOGiC PRO')
                    UrlAdd = 'lp'
                } else if(item.id >= 25 & item.id < 30){
                    console.log('THIS IS A DRUMKIT')
                    UrlAdd = 'dk'
                   
                }
                if(item.id !== 999){
                return {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: storeItem.name, //NAME OF ITEM
                        },
                        unit_amount: storeItem.price //PRICE OF ITEM FROM ID
                    },
                    quantity: 1// QUANTITY OF ITMES
                };
            }
            }),
        
            success_url: `${origin}?success=true&DAW=${UrlAdd}&20-358u9rwdjsfhbndzfbgdsryiougtqae30984owr57yw346tsdfiulkyghSDKJULhfpaeowiyrt329w87453w4sekuyirgh5478936tyq3o9re4thgfekljrgt73045985q`,
            cancel_url: `${origin}?canceled=true`
          
        });
    
        res.json({ url: session.url });
    } catch (e) {
        console.error(e);
        res.status(500).json({ error: e.message });
    }

    
})



app.get('/beatsearch', async (req, res) => {
    const min = req.query.min
    const max = req.query.max
    const Favs = undefined
    const Susername = undefined
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
   const page = parseInt(req.query.page) || 1
console.log(page)
const limit = 22;
const skip = (page - 1) * limit;
const totalCount = await BT.countDocuments();
try{
    const Beats = await BT.aggregate([
        { $sample: { size: totalCount } },
        { $skip: (page - 1) * limit },
        { $limit: limit },
    ]);


    const products = Beats.map(beat => ({
        id: beat._id,
        file: beat.src
        // add other fields as necessary
    }));


    const productFiles = products.map(product => product.file);
   
    console.log(productFiles)

    let i = 0

    let urls = []

    const bucketName = 'soundmixerzbucket';
    const data = await s3.listObjectsV2({
        Bucket: bucketName,
      }); 
    
    for(const productFile of productFiles){
    

        if(productFile == 'NoImg.jpg'){
            continue;
        }
        const foundFile = data.Contents.find(file => file.Key === productFile);

        

    
        

   
        
          const params = {
              Bucket: bucketName, // Replace with your Space name
              Key: foundFile.Key, // The file name in your Space
              Expires: 60, // URL expiration time in seconds
              ResponseContentType: 'image/jpeg', // Set to the correct content type
              ResponseContentDisposition: 'inline', // Set to inline
   
            };
          
          
              const command = new GetObjectCommand(params); // Proper instantiation
              url = await getSignedUrl(s3, command);
          

        

        urls.push(url)
    }

    console.log(urls + ' LIST OF IMAGES BRUH')

    
    
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
             res.render('Beats',{BT: Beats, PFPurl, BTs: Beat, productFiles, urls, Count: Counts, Favs,UD: UDs, FV: Favorites,current: page, pages: Math.ceil(count / limit), Noti: Notis, User, max, min, Susername, Orders })
    }catch (err){
    console.log(err + 'ERROR FOUND')
    
    }
       
        
    
})


app.get('/BeatUserSearch', async (req, res) => {
    const Susername = req.query.username
    const min = undefined
    const max = undefined
    const Favs = undefined
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
     
            const page = parseInt(req.query.page) || 1
            console.log(page)
            const limit = 22;
            const skip = (page - 1) * limit;
            const totalCount = await BT.countDocuments();
            try{
                const Beats = await BT.aggregate([
                    { $sample: { size: totalCount } },
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                ]);
            
            
                const products = Beats.map(beat => ({
                    id: beat._id,
                    file: beat.src
                    // add other fields as necessary
                }));
            
            
                const productFiles = products.map(product => product.file);
               
                console.log(productFiles)
            
                let i = 0
            
                let urls = []
            
                const bucketName = 'soundmixerzbucket';
                const data = await s3.listObjectsV2({
                    Bucket: bucketName,
                  }); 
                
                for(const productFile of productFiles){
                
            
                    if(productFile == 'NoImg.jpg'){
                        continue;
                    }
                    const foundFile = data.Contents.find(file => file.Key === productFile);
            
                    
            
                
                    
            
               
                    
                      const params = {
                          Bucket: bucketName, // Replace with your Space name
                          Key: foundFile.Key, // The file name in your Space
                          Expires: 60, // URL expiration time in seconds
                          ResponseContentType: 'image/jpeg', // Set to the correct content type
                          ResponseContentDisposition: 'inline', // Set to inline
               
                        };
                      
                      
                          const command = new GetObjectCommand(params); // Proper instantiation
                          url = await getSignedUrl(s3, command);
                      
            
                    
            
                    urls.push(url)
                }
            
                console.log(urls + ' LIST OF IMAGES BRUH')
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
             res.render('Beats',{BT: Beats, PFPurl, BTs: Beat, productFiles, urls, Count: Counts,UD: UDs, Favs, FV: Favorites,current: page, pages: Math.ceil(count / limit), Noti: Notis, User, max, min, Susername, Orders })
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
    let PFPurl = null
    if(req.session.user !== undefined){
        const result = await UD.findOne({username: req.session.user})
        const bucketName = 'soundmixerzbucket'; 
    
    
       
    
    
        const PFP = result.pfp
        const data = await s3.listObjectsV2({
            Bucket: bucketName,
          });
    
        if(PFP !== 'avatar.jpg'){
            const foundFile = data.Contents.find(file => file.Key === PFP);
    
            
    
        
            
    
       
            
              const params = {
                  Bucket: bucketName, // Replace with your Space name
                  Key: foundFile.Key, // The file name in your Space
                  Expires: 60, // URL expiration time in seconds
                  ResponseContentType: 'image/jpeg', // Set to the correct content type
                  ResponseContentDisposition: 'inline', // Set to inline
       
                };
              
              
                  const command = new GetObjectCommand(params); // Proper instantiation
                  PFPurl = await getSignedUrl(s3, command);
                 
              }
            }
            const page = parseInt(req.query.page) || 1
            console.log(page)
            const limit = 22;
            const skip = (page - 1) * limit;
            const totalCount = await BT.countDocuments();
            try{
                const Beats = await BT.aggregate([
                    { $sample: { size: totalCount } },
                    { $skip: (page - 1) * limit },
                    { $limit: limit },
                ]);
            
            
                const products = Beats.map(beat => ({
                    id: beat._id,
                    file: beat.src
                    // add other fields as necessary
                }));
            
            
                const productFiles = products.map(product => product.file);
               
                console.log(productFiles)
            
                let i = 0
            
                let urls = []
            
                const bucketName = 'soundmixerzbucket';
                const data = await s3.listObjectsV2({
                    Bucket: bucketName,
                  }); 
                
                for(const productFile of productFiles){
                
            
                    if(productFile == 'NoImg.jpg'){
                        continue;
                    }
                    const foundFile = data.Contents.find(file => file.Key === productFile);
            
                    
            
                
                    
            
               
                    
                      const params = {
                          Bucket: bucketName, // Replace with your Space name
                          Key: foundFile.Key, // The file name in your Space
                          Expires: 60, // URL expiration time in seconds
                          ResponseContentType: 'image/jpeg', // Set to the correct content type
                          ResponseContentDisposition: 'inline', // Set to inline
               
                        };
                      
                      
                          const command = new GetObjectCommand(params); // Proper instantiation
                          url = await getSignedUrl(s3, command);
                      
            
                    
            
                    urls.push(url)
                }
            
                console.log(urls + ' LIST OF IMAGES BRUH')
            
            
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
            res.render('Beats',{BT: Beats, BTs: Beat, PFPurl, Count: Counts, productFiles, urls,UD: UDs,  Favs, FV: Favorites,current: page, pages: Math.ceil(count / limit), Noti: Notis, User, max, min, Susername, Orders })
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






