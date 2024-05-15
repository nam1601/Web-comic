import axios from 'axios';

export const handleRegister = async (email, password) => {
    try {
        let res = await axios.post('http://localhost:8081/api/register', {
            email,
            password,
        });
        console.log(res);
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const handleLogin = async (email, password) => {
    try {
        let res = axios.post('http://localhost:8081/api/login', {
            email,
            password,
        });

        return res;
    } catch (error) {
        console.log(error.data);
    }
};
export const getFollowList = async (userId) => {
    try {
        let res = axios.get('http://localhost:8081/api/follow', {
            params: { userId },
        });

        return res;
    } catch (error) {
        console.log(error.data);
    }
};
export const followAComic = async ({
    userId,
    mangaEp,
    title,
    cover,
    lastChap,
    newChap,
    lastUpdate,
}) => {
    try {
        let res = axios.post('http://localhost:8081/api/followComic', {
            userId,
            mangaEp,
            title,
            cover,
            lastChap,
            newChap,
            lastUpdate,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const changeUserInfo = async (userId, updateData) => {
    try {
        let res = axios.put('http://localhost:8081/api/change', {
            userId,
            updateData,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const changePassWord = async (userId, oldPass, newPass) => {
    try {
        let res = axios.put('http://localhost:8081/api/change-password', {
            userId,
            oldPass,
            newPass,
        });
        return res;
    } catch (error) {
        console.log(error);
    }
};
export const checkFollowAComic = async (userId, mangaEp) => {
    try {
        let res = await axios.get('http://localhost:8081/api/check-follow', {
            params: { userId, mangaEp },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const unFollowAComic = async (userId, mangaEp) => {
    try {
        console.log(userId, mangaEp);

        let res = await axios.delete('http://localhost:8081/api/unfollow', {
            data: { userId, mangaEp },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getListComment = async (mangaEp) => {
    try {
        let res = await axios.get('http://localhost:8081/api/list-comment', {
            params: { mangaEp },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const commentAComic = async (userId, mangaEp, cover, title, content) => {
    try {
        let res = await axios.post('http://localhost:8081/api/comment', {
            userId,
            mangaEp,
            cover,
            title,
            content,
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getAllComment = async (userId) => {
    try {
        // console.log('log from BE: ', userId);
        let res = await axios.get('http://localhost:8081/api/all-comment', {
            params: { userId },
        });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const updateHistoryComic = async (userId, mangaEp, newChap) => {
    try {
        let res = await axios.post('http://localhost:8081/api/update-history', {
            userId,
            mangaEp,
            newChap,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
export const updateRead = async (
    userId,
    mangaEp,
    title,
    currentChap,
    cover,
) => {
    console.log('-------------------------------------');
    console.log('userId: ', userId);
    console.log('mangaEp: ', mangaEp);
    console.log('currentChap: ', currentChap);
    console.log('cover: ', cover);
    console.log('-------------------------------------');
    try {
        let res = await axios.post('http://localhost:8081/api/read', {
            userId,
            mangaEp,
            title,
            currentChap,
            cover,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
export const checkRead = async (userId, mangaEp) => {
    try {
        let res = await axios.get('http://localhost:8081/api/check-read', {
            params: {
                userId,
                mangaEp,
            },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
export const updateChapRead = async (userId, mangaEp, currentChap) => {
    try {
        let res = await axios.put('http://localhost:8081/api/update-read', {
            userId,
            mangaEp,
            currentChap,
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
export const getRead = async (userId) => {
    try {
        let res = await axios.get('http://localhost:8081/api/get-read', {
            params: { userId },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
export const getInfoToContinue = async (userId, mangaEp) => {
    try {
        let res = await axios.get('http://localhost:8081/api/get-a-follow', {
            params: { userId, mangaEp },
        });
        return res.data;
    } catch (error) {
        throw error;
    }
};
