import db from '../models/index'
import CRUD from '../services/CRUDService'
import userService from '../services/userService'
let handleLogin = async(req,res) => {
    let email = req.body.email
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode:1,
            message: 'Missing input parameter'
        })
    }
    let userData = await userService.handleUserLogin(email,password)
    console.log(userData)
    return res.status(200).json({
        errCode: userData.errCode,
        message: userData.errMessage,
        user: userData.user ? userData.user : {}
    })
}
let handleChangeInfoUser = async(req,res)=> {
    let id = req.body.userId;
    let data = req.body.updateData;
    let userData = await userService.changeInfoUser(id,data);
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {}
  })
}
let handleChangePass = async(req,res) => {
  let id = req.body.userId;
  let oldPass=req.body.oldPass;
  let newPass = req.body.newPass;
  let userData = await userService.handleUserChangePass(id,oldPass,newPass);

  return res.status(200).json({
    errCode: userData.errCode,
    message: userData.errMessage,
    user: userData.user ? userData.user : {}
  })  
}
let handleRegister = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;
  
    if (!email || !password) {
      return res.status(500).json({
        errCode: 1,
        message: 'Missing input parameter',
      });
    }
  
    let userData = await userService.handleRegister(email, password);
    console.log(userData);
    return res.status(200).json({
      errCode: userData.errCode,
      message: userData.errMessage,
      user: userData.user ? userData.user : {},
    });
  };
let getFollow = async(req,res)=> {
  let userId= req.query.userId
  let list = await userService.getFollowList(userId);
  console.log(list)
  
    return res.status(200).json({
      errCode: 0,
      message: 'Get list follow success',
      comics: list? list: []
    })
  }
let FollowComic = async(req,res)=> {
  
  let userId = req.body.userId;
  
  let mangaEp = req.body.mangaEp;
  
  let title = req.body.title;
 
  let cover = req.body.cover;
 

  let lastChap = req.body.lastChap;
 
  let newChap = req.body.newChap
  
  let lastUpdate= req.body.lastUpdate
  try {
    let dataFollow = await userService.handleFollow(userId,mangaEp,title,cover,lastChap,newChap,lastUpdate)
    return res.status(200).json({
      errCode: dataFollow.errCode,
      message: dataFollow.errMessage,
      data: dataFollow ? dataFollow : {},
    });
  } catch (error) {
      console.log(error);
      return res.status(500).json({
        errCode: 500,
        message: "Internal server error",
        data: {},
      });
  }
}
let checkTheUserFollowComic = async(req,res) => {
  let userId = req.query.userId;
  let mangaEp = req.query.mangaEp;
  try {
    let checkFollow = await userService.checkFollowAComic(userId,mangaEp);
    return res.status(200).json({
      errCode: checkFollow.errCode,
      message: checkFollow.errMessage,
      data: checkFollow ? checkFollow : {},
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      errCode: 500,
      message: "Internal server error",
      data: {},
    });
  }
}
let unFollowComic = async(req,res)=> {
  console.log('body: ',req.body)
    let userId = req.body.userId;
    console.log('userId: ',userId)
    let mangaEp = req.body.mangaEp;
    console.log('mangaEp: ',mangaEp)
    try {
        let dataUnFollow = await userService.handleUnFollow(userId, mangaEp);
        return res.status(200).json({
            errCode: dataUnFollow.errCode,
            message: dataUnFollow.message,
            data: dataUnFollow ? dataUnFollow : {},
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
    }
}
let commentAComic = async(req,res) => {
  console.log('req.body: ',req.body)
  let userId = req.body.userId;
  let mangaEp = req.body.mangaEp;
  let cover = req.body.cover;
  let title = req.body.title;
  let content = req.body.content;
  try {
    let dataComment = await userService.createAComment(userId, mangaEp,cover,title,content);
    return res.status(200).json({
      errCode: dataComment.errCode,
      message: dataComment.message,
      data: dataComment ? dataComment.comment : {},
  });
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let listComment = async(req,res)=> {
  console.log('req.query: ', req.query);
  let mangaEp = req.query.mangaEp;
  try {
    let list = await userService.getCommentList(mangaEp);
    return res.status(200).json({
      errCode: list.errCode,
      message: list.message,
      data: list ? list.data : {},
    });
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let allComment = async(req,res) => {
  let userId = req.query.userId;
  console.log('userId from all comment: ', userId)
  try {
    let listComment = await userService.getAllComment(userId);
    return res.status(200).json({
      errCode: 0,
      message: 'Get all comments success',
      data: listComment? listComment: {}
    })
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let updateHistoryComic = async(req,res)=> {
  let userId = req.body.userId;
  let mangaEp = req.body.mangaEp;
  let newChap = req.body.newChap;
  try {
    let listComment = await userService.updateHistory(userId,mangaEp, newChap);
    return res.status(200).json({
      errCode: 0,
      message: 'Get all comments success',
      data: listComment? listComment: {}
    })
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let historyRead = async(req,res)=> {
  let userId = req.body.userId;
  let mangaEp = req.body.mangaEp;
  let title = req.body.title;
  let currentChap = req.body.currentChap;
  let cover = req.body.cover;
  console.log('-------------------------------------')
  console.log('userId: ',userId);
  console.log('mangaEp: ',mangaEp);
  console.log('currentChap: ',currentChap);
  console.log('cover: ',cover);
  console.log('-------------------------------------')
  try {
    let listHistory = await userService.history(userId,mangaEp,title,currentChap,cover);
    return res.status(200).json({
      errCode: 0,
      message: 'Get all comments success',
      data: listHistory? listHistory: {}
    })
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let checkUserRead = async(req,res)=> {
  try {
    let userId = req.query.userId;
    let mangaEp = req.query.mangaEp;

    let checkHistory = await userService.checkUserInHistory(userId,mangaEp);
    return res.status(200).json({
      errCode: 0,
      message: 'Get check read success',
      data: checkHistory? checkHistory: {}
    })
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let updateRead = async(req,res)=> {
  let userId = req.body.userId;
  let mangaEp = req.body.mangaEp;
  let currentChap = req.body.currentChap;
  try {
    let listHistory = await userService.updateRead(userId,mangaEp,currentChap);
    return res.status(200).json({
      errCode: 0,
      message: 'Get all comments success',
      data: listHistory? listHistory: {}
    })
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let getRead = async(req,res)=> {
  let userId= req.query.userId;
  try {
    let list = await userService.getHistory(userId);
    return res.status(200).json({
      errCode: 0,
      message: 'Get all comments success',
      data: list? list: []
    })
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
let getInfoFollow = async(req,res)=> {
  let userId=req.query.userId
  let mangaEp = req.query.mangaEp
  try {
    let data = await userService.getAFollowInfo(userId,mangaEp);
    return res.status(200).json({
      errCode: 0,
      message: 'Get all comments success',
      data: data? data: {}
    })
  } catch (error) {
    console.log(error);
        return res.status(500).json({
            errCode: 500,
            message: "Internal server error",
            data: {},
        });
  }
}
module.exports= {
    handleLogin,
    handleRegister,
    handleChangeInfoUser,
    handleChangePass,
    getFollow,
    FollowComic,
    checkTheUserFollowComic,
    unFollowComic,
    commentAComic,
    listComment,
    allComment,
    updateHistoryComic,
    historyRead,
    checkUserRead,
    updateRead,
    getRead,
    getInfoFollow
}