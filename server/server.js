let http=require('http')
let BodyParser=require('body-parser')
let express= require('express')
let port= 3000 || process.env.PORT
let path = require('path')
let bcrypt= require('bcrypt')
let jwt=require('jsonwebtoken')
let accountSchema=require('./mongoose-schema.js').accountSchema
let transactionSchema=require('./mongoose-schema.js').transactionSchema
let mongoose=require('mongoose')
let SECRET= 'thisismynotsosecretsignature'
let loginuser

mongoose.connect('mongodb://localhost:27017/veegilmedia')
mongoose.Promise=global.Promise

const Account= new mongoose.model('users', accountSchema)

Account.find({tel:123456789}, ['transactions']).exec().then((response)=>{console.log(response)})


let app = express()
app.use(express.static('static'))
app.use(BodyParser.json())

const auth=(req, res)=>{
    if(req.headers && req.headers.auth){
        jwt.verify(req.headers.auth, SECRET, (error, decoded)=>{
            if (error){
                return res.status(401).send()
                console.log('error')
            }
            else {
                console.dir(`decoded user ${decoded}`)
                req.user=decoded
            }
        }
        )
    }
}

app.get('/', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../static/index.html'))
})
app.get('/register', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../static/index.html'))
})
app.post('/api/register', (req,res)=>{
    let user = req.body
    if (user.password){
        bcrypt.hash(user.password, 20 ,(error, hash)=>{
            if (error){
                return res.status(500).send
            }
            else{
                Account.create({firstname:user.firstname, lastname:user.lastname,
                    email:user.email, tel:user.tel, password:hashedpassword})
            }
        })
    }
})
app.get('/login', (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../static/index.html'))
})
app.post('/login', (req,res,next)=>{
    loginuser=req.body
    let founduser
    Account.find({tel:loginuser.tel}).exec().then(response=>{founduser=response.lastname})
    if (loginuser){
        Account.find({tel:loginuser.tel}, ['userpassword']).exec().then(response=>{
            //New users will require bcrypt.compare() to log-in
            if(response.length!== 0){
                if(loginuser.password===response[0].userpassword){
                console.log('found user')
                res.setHeader('Access-Control-Allow-Origin', '*');
                res.json({token:jwt.sign({lastname:founduser},SECRET)})
            }
            else{
                res.json({errormsg:'Phone number and password mismatch'})
            }}
            else {
                console.log('user not found')
                res.json({errormsg:'User not found'})
            }
        })
    }
})
app.get('/home', auth, (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../static/index.html'))
})
app.get('/api/home', (req,res)=>{
    Account.find({tel:loginuser.tel}, ['transactions'])
        .exec()
        .then((response)=>{
            let credits= response[0].transactions.filter((item)=>{
                if(item.ttype==='credit'){
                    return item
                }
            })
            let debits= response[0].transactions.filter((item)=>{
                if(item.ttype==='debit'){
                    return item
                }
            })
            let totalcredits= credits.reduce((total, item)=>{
                let stramount=item.Total.slice(1)
                let amount= parseFloat(stramount)
                return total + amount
            },0)
            let totaldebits= debits.reduce((total, item)=>{
                let stramount=item.Total.slice(1)
                let amount= parseFloat(stramount)
                return total + amount
            },0)
           res.json({balance:(totalcredits-totaldebits).toFixed(2)})
        })
})
app.get('/transactions',auth, (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../static/index.html'))
})
app.get('/api/transactions', (req,res)=>{
    Account.find({tel:loginuser.tel}, ['transactions'])
        .exec()
        .then((response)=>{
            res.json(response[0].transactions)
        })
})
app.get('/deposit', auth, (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../static/index.html'))
})
app.post('/deposit', (req,res)=>{
    let transaction=req.body
    Account.updateOne({tel:loginuser.tel}, {$push:{transactions:transaction}})
        .exec()
        .then((results)=>{
            if(results){
                res.json(results)
            }
        })
})
app.get('/transfer', auth, (req,res)=>{
    res.sendFile(path.resolve(__dirname, '../static/index.html'))
})
app.post('/transfer', (req,res)=>{
    let transaction=req.body
    Account.updateOne({tel:loginuser.tel}, {$push:{transactions:transaction}})
        .exec()
        .then((results)=>{
            if(results){
                console.log(results)
                res.json(results)
            }
        })
})

app.get('*',(req,res)=>{
    res.sendFile(path.resolve(__dirname, '../static/index.html'))
})
http.createServer(app).listen(port, ()=>{
    console.log('App started at port 3000')
})

