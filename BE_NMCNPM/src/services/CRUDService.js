import bcrypt from 'bcryptjs'
import db from '../models/index'


const salt = bcrypt.genSaltSync(10);
let createNewUser = async(data) => {
    return new Promise (async(resolve,reject)=> {
        try {
            let hashPassword = await hashUserPassword(data.password)
            data.password = hashPassword
            await db.User.create({
                email: data.email,
                password: data.password,
                firstName: data.firstName,
                lastName: data.lastName,
            })
            resolve('success to create new user')
        } catch (error) {
            reject(error)
        }
    })
}
let hashUserPassword = (password) => {
    return new Promise(async(resolve,reject)=> {
        try {
            let hash = await bcrypt.hashSync(password, salt);
            resolve(hash)
        } catch (error) {
            reject(error)
        }
    })
}
let getAllUser = () => {
    return new Promise(async(resolve,reject) => {
        try {
            let users = await db.User.findAll({raw:true})
            resolve(users)
        } catch (error) {
            reject(error)
        }
    })
}
let getUserInfoById = (userId) => {
    return new Promise(async(resolve,reject)=> {
        try {
            let user = await db.User.findOne({where : {id: userId},raw: true})
            if(user){
                resolve(user)
            }
            else {
                resolve({})
            }
        } catch (error) {
            reject(error)
        }
    })
}
let updateUserData = (data) => {
    return new Promise(async(resolve,reject)=> {
        try {
            let user = await db.User.findOne({where: {id:data.id}})
            console.log('data from update: ', user)
            if (user) {
                user.firstName = data.firstName,
                user.lastName = data.lastName,
                user.address = data.address
                await user.save()
                let allUser = await db.User.findAll()
                resolve(allUser)
            }
            else {
                resolve([])
            }
        } catch (error) {
            console.log(error)
        }
    })
}
let deleteUserById = (id) => {
    return new Promise(async(resolve,reject)=> {
        try {
            let user = await db.User.findOne({where: {id:id}})
            if(user) {
                await user.destroy()
            }
            resolve()
        } catch (error) {
            reject(error)
        }
    })
}
module.exports = {
    createNewUser,
    getAllUser,
    getUserInfoById,
    updateUserData,
    deleteUserById,
}