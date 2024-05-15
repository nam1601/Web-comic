import db from "../models"
import CRUD from '../services/CRUDService'
let getHomePage = async(req,res) => {
    try {
        let data = await db.User.findAll()
        return res.render('homePage.ejs',{
            data: JSON.stringify(data)
        })

    } catch (error) {
        console.log(error.message)
    }
}
let getAboutPage = (req,res) => {
    return res.render('about.ejs')
}
let getCRUD = (req,res) => {
    return res.render('crud.ejs')
}
let postCRUD = async(req,res) => {
    let message = await CRUD.createNewUser(req.body)
    console.log(message)
    return res.send('Create success')
}
let displayCRUD = async(req,res) => {
    try {
        let data = await CRUD.getAllUser()
        return res.render('displayCRUD.ejs',{data: data})
    } catch (error) {
        console.log(error)
    }
    
}
let getEditCRUD = async(req,res) => {
    let userId = req.query.id
    if (userId) {
        let userData = await CRUD.getUserInfoById(userId)
        return res.render('editCRUD.ejs',{data: userData})
    }
    else {
        return res.send('get crud')
    } 
}
let putCRUD = async(req,res) => {
    let data = req.body;
    let allUser = await CRUD.updateUserData(data)
    return res.render('displayCRUD.ejs',{data: allUser})
}
let deleteCRUD = async(req,res) => {
    let userId = req.query.id
    if(userId){
        await CRUD.deleteUserById(userId)
        return res.send('deleted')
    }
    return res.send('Do not found the user')
}
module.exports = {
    getHomePage: getHomePage,
    getAboutPage,
    getCRUD: getCRUD,
    postCRUD,
    displayCRUD,
    getEditCRUD,
    putCRUD,
    deleteCRUD,
}