const Entretien = require('../Models/entretien')


const index = (req,res,next) => {
    Entretien.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}



const show = (req, res, next) =>{
    let entretienID = req.body.entretienID
    console.log(entretienID)
    Entretien.findById(entretienID)
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            mesaage: 'An error occured'
        })
    })
}


const add = (req, res, next) => {
        let entretien = new Entretien({
            title: req.body.title,
            date: req.body.date,
       //     car: req.body.car,
            description: req.body.description,
            owned_by: req.body.owned_by,
        })
    
        entretien.save()
        .then(response => {
            res.json({
                message: 'entretien added'
            })
        })
        .catch(error => {
            res.json({
                message: 'error'
            })
        })
}



const destroy = (req, res, next) => {
    let entretientID = req.body.entretientID
    Entretien.findByIdAndDelete(entretientID)
    .then(() => {
        res.json({
            message: 'Entretien deleted'
        })
    })
    .catch(error => {
        res.json({
            message: 'error'
        })
    })
}

const usersEntretien = (req, res, next) => {
    let userID = req.params.userID
    console.log(userID)
    Entretien.find({owned_by: userID})
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured'
        })
    })
}


module.exports = {
    index,show,add,destroy,usersEntretien
}