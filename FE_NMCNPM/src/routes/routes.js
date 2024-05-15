import config from '~/config';
import Home from '~/pages/Home';
import Following from '~/pages/Following';
import Profile from '~/pages/Profile';
import Upload from '~/pages/Upload';
import Search from '~/pages/Search';
import Read from '~/pages/Read';
import Genre from '~/pages/Genre';
import Login from '~/pages/Login';
import Register from '~/pages/Register';
import Rank from '~/pages/Rank';
import Detail from '~/pages/Detail';
import Chap from '~/pages/Chap';
import DetailProfile from '~/pages/DetailProfile';
import ChangePass from '~/pages/ChangePass';
import FollowFullPage from '~/pages/FollowFullPage';
const publicRoutes = [
    {
        path: config.routes.home,
        component: Home,
    },
    {
        path: config.routes.following,
        component: Following,
    },
    {
        path: config.routes.read,
        component: Read,
    },
    {
        path: config.routes.profile,
        component: Profile,
    },
    {
        path: config.routes.upload,
        component: Upload,
    },
    {
        path: config.routes.search,
        component: Search,
        layout: null,
    },
    // {
    //     path: config.routes.read,
    //     component: Read,
    // },
    {
        path: config.routes.genre,
        component: Genre,
    },
    { path: config.routes.eachGenre, component: Genre },
    { path: config.routes.genreFilter, component: Genre },
    {
        path: config.routes.login,
        component: Login,
    },
    {
        path: config.routes.register,
        component: Register,
    },
    {
        path: config.routes.rank,
        component: Rank,
    },
    {
        path: config.routes.detail,
        component: Detail,
    },
    {
        path: config.routes.chap,
        component: Chap,
    },
    {
        path: config.routes.detailInfo,
        component: DetailProfile,
    },
    {
        path: config.routes.changePass,
        component: ChangePass,
    },
    {
        path: config.routes.listFollow,
        component: FollowFullPage,
    },
];

export { publicRoutes };
