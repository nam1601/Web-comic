import express from 'express'
import homeController from '../controller/homeController';
import  userController from '../controller/userController';

let router = express.Router()

let initWebRoutes = (app) => {
    router.get('/',homeController.getHomePage);
    router.get('/about',homeController.getAboutPage)
    router.get('/crud',homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/display-crud', homeController.displayCRUD)
    router.get('/edit-crud', homeController.getEditCRUD)
    router.post('/put-crud',homeController.putCRUD)
    router.get('/delete-crud',homeController.deleteCRUD)


    router.post('/api/login',userController.handleLogin)
    router.post('/api/register', userController.handleRegister)
    router.get('/api/follow',userController.getFollow)
    router.post('/api/followComic',userController.FollowComic)
    router.put('/api/change', userController.handleChangeInfoUser)
    router.put('/api/change-password' , userController.handleChangePass)
    router.get('/api/check-follow',userController.checkTheUserFollowComic)
    router.delete('/api/unfollow', userController.unFollowComic)
    router.post('/api/comment', userController.commentAComic)
    router.get('/api/list-comment', userController.listComment)
    router.get('/api/all-comment', userController.allComment)
    router.post('/api/update-history', userController.updateHistoryComic)
    router.post('/api/read', userController.historyRead)
    router.get('/api/check-read',userController.checkUserRead)
    router.put('/api/update-read', userController.updateRead)
    router.get('/api/get-read', userController.getRead)
    router.get('/api/get-a-follow',userController.getInfoFollow)
    return app.use('/',router)
}
module.exports = initWebRoutes