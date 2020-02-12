const express= require ('express')
const {MongoClient,ObjectID}= require ('mongodb')
const bodyParser = require('body-parser')
const assert = require ('assert')


const app = express()
app.use(bodyParser.json())


const mongo_url='mongodb://localhost:27017'
const dataBase='firstApi'


MongoClient.connect(mongo_url,{ useUnifiedTopology: true },(err,client)=>{
    assert.equal(err,null,'data base connexion failed')  
    const db= client.db(dataBase)



    app.get('/contacts', (req,res) => {
        let newContact = req.body
        db.collection('contactList').find().toArray((err, data) => {
            if(err) console.log('cant find')
            else res.send(data)
        })

    })

    app.post('/contacts', (req,res)=>{
        let newContact = req.body
        db.collection('contactList').insertOne(newContact,(err,data)=>{
            if (err) console.log('cant add contact')
            else res.send(data)
        })
    })

    app.put('/contacts/:id', (req,res)=>{
        let newContact = req.body
        let id = ObjectID(req.params.id)
        db.collection('contactList').findOneAndUpdate({_id:id}, {$set:{...newContact}},(err,data)=>{
            if (err) console.log('cant add contact')
            else res.send(data)
        })
    })
    app.delete('/contacts/:id', (req,res)=>{
        
        let id = ObjectID(req.params.id)
        db.collection('contactList').findOneAndDelete({_id:id},(err,data)=>{
            if (err) console.log('cant add contact')
            else res.send(data)
        })
    })
   
})
app.listen(5000,(err)=>{
    if(err) console.log("server is not ranning")
    else console.log("server is running on port 5000")
})
