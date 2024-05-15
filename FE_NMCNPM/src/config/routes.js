const routes = {
    home: '/',
    following: '/following',
    read: '/read',

    profile: '/profile',
    detailInfo: '/profile/detail',
    changePass: '/profile/change-password',
    listFollow: '/profile/follow',

    upload: '/upload',
    search: '/search',

    genre: '/genre&sort=1',
    genreFilter: '/:genre',
    eachGenre: '/:genre/:type',
    rank: '/ranked',
    login: '/login',
    register: '/register',
    detail: '/manga/:name',
    chap: '/manga/:name/:chap',
};
export default routes;
