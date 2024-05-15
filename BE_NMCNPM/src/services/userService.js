import db from "../models/index"
import bcrypt from 'bcryptjs'
const { Op } = require('sequelize');
let handleUserLogin = (email,password) => {
    return new Promise (async(resolve,reject)=> {
        try {
            let userData = {}
            let isExist = await checkUserEmail(email)
            if(isExist){
                let user = await db.User.findOne({
                    attributes: ['id','email','password','avatar','firstName','lastName','sex','role'],
                    where: { email: email},raw: true
                })
                if(user){
                    let check = await bcrypt.compareSync(password,user.password)
                    if (check) {
                        userData.errCode = 0;
                        userData.errMessage = 'OK';
                        delete user['password'];
                        userData.user = user;
                    }
                    else{
                        userData.errCode = 3;
                        userData.errMessage = 'Wrong password';
                    }
                }
                else {
                    userData.errCode= 2;
                    userData.errMessage=`User not found`
                }
            }
            else {
                userData.errCode = 1,
                userData.errMessage = `Your email isn't exist in our system`
                
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}
let changeInfoUser = (id,data)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {}
           
            let user = await db.User.findByPk(id);
            if (user) {
                await user.update(data);
                userData.errCode = 0;
                userData.errMessage = 'Update success';
                userData.user = user;
            } else {
                userData.errCode = 1;
                userData.errMessage = 'User not found';
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}
let checkUserEmail = (email)=> {
    return new Promise(async(resolve,reject)=> {
        try {
            let user = await db.User.findOne({where: {email: email}}) 
            if(user){
                resolve(true)
            }
            else {
                resolve(false)
            }
        } catch (error) {
            reject(error)
        }
    })
} 
let handleRegister = (email, password) => {
    return new Promise(async (resolve, reject) => {
      try {
        let userData = {};
        let isExist = await checkUserEmail(email);
        if (!isExist) {
          // Đăng ký người dùng mới
          // ... Thực hiện các bước đăng ký tại đây ...
          // Ví dụ: Tạo một người dùng mới trong cơ sở dữ liệu
  
          // Lưu ý: Trong ví dụ này, tôi sử dụng 'bcrypt' để mã hóa mật khẩu.
          // Bạn có thể sử dụng các thư viện mã hóa mật khẩu khác hoặc phương pháp mã hóa phù hợp với hệ thống của bạn.
  
          let hashedPassword = await bcrypt.hashSync(password, 10);
          let newUser = await db.User.create({
            email: email,
            password: hashedPassword,
          });
          console.log(newUser)
          // Thông tin đăng ký thành công
          userData.errCode = 0;
          userData.errMessage = 'Register successful';
          delete newUser['password'];

          userData.user = newUser;
          
        } else {
          // Email đã tồn tại trong hệ thống
          userData.errCode = 1;
          userData.errMessage = 'Email already exists';
        }
  
        resolve(userData);
      } catch (error) {
        reject(error);
      }
    });
  };
let handleUserChangePass = (userId, oldPass, newPass) => {
    return new Promise(async(resolve, reject) => {
        try {
            let userData = {};
            let user = await db.User.findOne({
                attributes: ['id','email','password','avatar','firstName','lastName','sex','role'],
                where: { id: userId}
            })
            if(user){
                let check = await bcrypt.compareSync(oldPass,user.password)
                if (check) {
                    userData.errCode = 0;
                    userData.errMessage = 'OK';
                    
                    let hashedPassword = await bcrypt.hashSync(newPass, 10);
                    await user.update({password: hashedPassword})
                    delete user['password'];
                    userData.user = user;
                }
                else{
                    userData.errCode = 3;
                    userData.errMessage = 'Wrong password';
                }
            }
            else {
                userData.errCode= 2;
                userData.errMessage=`User not found`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}
let getFollowList = async(userId)=> {
    try {
        const result = await db.Follow.findAll({attributes: ['mangaEp','cover','title','lastChap','newChap','lastUpdate'],
          where: {
            userId: userId
          },raw:true
        });
        return result;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
}
let getAFollowInfo = (userId, mangaEp)=> {
    return new Promise(async(resolve, reject) => {
        let info={}
        try {
            let data= await db.Follow.findOne({
                where: {
                    userId:userId,
                    mangaEp: mangaEp
                }
            })
            if(data){
                info.data= data
            }
            resolve(info)
        } catch (error) {
            reject(error)
        }
    })
}
let handleFollow = (userId,mangaEp,title,cover,lastChap,newChap,lastUpdate)=> {
    return new Promise(async(resolve, reject) => {
        let info = {}
        try {
            let newData = await db.Follow.create({
                userId: userId, 
                mangaEp: mangaEp,
                title: title, 
                cover: cover, 
                lastChap: lastChap, 
                newChap: newChap,
                lastUpdate: lastUpdate})
            console.log(newData)
            info.errCode =0;
            info.message = 'Follow success'
            resolve(info)
        } catch (error) {
            console.log(error)
            reject(error)
        }
    })
}
let handleUnFollow = (userId, mangaEp) => {
    return new Promise(async(resolve, reject) => {
        let info = {}
        try {
            // Tìm và xóa dữ liệu trong table theo userId và mangaEp
            await db.Follow.destroy({
                where: {
                    userId: userId,
                    mangaEp: mangaEp
                }
            });
            
            info.errCode = 0;
            info.message = 'Unfollow success';
            info.isFollow = 0;
            resolve(info);
        } catch (error) {
            console.log(error);
            reject(error);
        }
    });
}
let checkFollowAComic = (userId, mangaEp)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let check = {}
            let isFollow = await db.Follow.findOne({
                where: {
                    userId: userId, 
                    mangaEp: mangaEp
                }})
            if(isFollow){
                check.errCode =0;
                check.message = 'Request success'
                check.isFollow = 1
            }
            else {
                check.errCode =0;
                check.message = 'Request success'
                check.isFollow = 0
            }       
            resolve(check)
        } catch (error) {
            reject(error)
        }
    })
}
let createAComment = (userId, mangaEp,cover,title, content)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let data = {}
            let comment = await db.Comment.create({mangaEp, userId,cover,title, content});
            // let user = await db.User.findOne({where: {id: userId}, raw:true})
            // console.log('user: ',user)
            data.errCode = 0;
            data.message = 'Register successful';
            data.comment = comment;
            // data.data.User = user
            // console.log('data: ', data)
            resolve(data)
        } catch (error) {
            reject(error)
        }
    })
}
let getCommentList = (mangaEp) => {
    return new Promise(async(resolve, reject) => {
        try {
            let list = {}
            let comment = await db.Comment.findAll({ 
                where: { mangaEp },
                include: [{ model: db.User }],
            })
            list.errCode=0;
            list.message = 'Get list comment success';
            list.data = comment;
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}
let getAllComment =  (userId) => {
    return new Promise(async(resolve, reject) => {
        try {
            let list = {};
            let allComment = await db.Comment.findAll({
                where: {userId}
            })
            list.data=allComment;
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}
let updateHistory = (userId, mangaEP, newChap)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let list = {}
            let info = await db.Follow.findOne({
                where: {
                    userId: userId,
                    mangaEp: mangaEP
                }})
            if(info){
                await info.update({lastChap: newChap})
                list.data=info;
            }
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}
async function removeDuplicateRows() {
    try {
      const duplicates = await db.History.findAll({
        attributes: ['userId', 'mangaEp', [db.sequelize.fn('MAX', db.sequelize.col('updatedAt')), 'maxUpdatedAt']],
        group: ['userId', 'mangaEp'],
        having: db.sequelize.literal('COUNT(*) > 1'),
      });
  
      const deletePromises = duplicates.map(async (duplicate) => {
        const { userId, mangaEp, maxUpdatedAt } = duplicate.get();
  
        await db.History.destroy({
          where: {
            userId,
            mangaEp,
            updatedAt: {
              [Op.lt]: maxUpdatedAt,
            },
          },
        });
      });
  
      await Promise.all(deletePromises);
  
      console.log('Các dòng bị trùng và có updatedAt trễ hơn đã được xóa thành công');
    } catch (error) {
      console.error('Lỗi khi xóa các dòng bị trùng:', error);
    }
  }
let history =(userId, mangaEp,title, currentChap, cover)=>{
    return new Promise(async(resolve, reject) => {
        try {
            let list= {}
            let check = await db.History.findOne({
                where: {
                    userId: userId,
                    mangaEp: mangaEp,
                }
            }) 
            console.log('==============')
            console.log(check)
            console.log('==============')
            if(!check){
                let history = await db.History.create({userId, mangaEp,title, currentChap, cover})
                list.data= history;
            }
            await removeDuplicateRows()
            resolve(list)
        } catch (error) {
            reject(error)
        }
    })
}
let checkUserInHistory = (userId, mangaEp)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let check={}
            let info = await db.History.findOne({
                where:{
                    userId: userId,
                    mangaEp: mangaEp
                }})
            if(info){             
                check.bool = 1
            }
            else{
                
                check.bool = 0
            }
            resolve(check)
        } catch (error) {
            reject(error)
        }
    })
}
let updateRead = (userId, mangaEP, currentChap)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let info = {}
            let history = await db.History.findOne({
                where: {
                    userId,
                    mangaEP
                }
            })
            if(history){
                await history.update({currentChap: currentChap})
                info.data= history;
            }
            await removeDuplicateRows()
            resolve(history)
        } catch (error) {
            reject(error)
        }
    })
}
let getHistory = (userId)=> {
    return new Promise(async(resolve, reject) => {
        try {
            let list ={}
            let read = await db.History.findAll({where: {userId: userId}})
            list.data= read;
            resolve(list);
        } catch (error) {
            reject(error)
        }
    })
}
let getInfoToContinue = (userId, mangaEp)=> {

}
module.exports = {
    handleUserLogin,
    handleRegister,
    getFollowList,
    getAFollowInfo,
    handleFollow,
    changeInfoUser,
    handleUserChangePass,
    checkFollowAComic,
    handleUnFollow,
    createAComment,
    getCommentList,
    getAllComment,
    updateHistory,
    history,
    checkUserInHistory,
    updateRead,
    getHistory,
} 