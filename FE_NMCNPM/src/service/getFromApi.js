import * as httpRequest from '~/utils/httpRequest';
//Get list in Home
export const getDaily = async () => {
    try {
        const res = await httpRequest.get('/home');
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
//Get list comic follow pagination
export const getListOnPage = async (page) => {
    try {
        const res = await httpRequest.get('list?list=true', {
            params: { page },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
//Get list genre
export const getListGenre = async () => {
    try {
        const res = await httpRequest.get('/list');
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
//Get list Comic of genre
export const getGenre = async (genre, page = 1) => {
    try {
        const res = await httpRequest.get('/list', { params: { genre, page } });
        return res;
    } catch (error) {
        console.log(error);
        return error;
    }
};
//Get Top list
export const getTopList = async (list = true, sort) => {
    try {
        const res = await httpRequest.get('/list', { params: { list, sort } });
        return res.data;
    } catch (error) {
        console.log(error);
        return error;
    }
};
//Get one comic
export const getComic = async (name) => {
    try {
        const res = await httpRequest.get(`${name}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
//Get Chapter
export const getComicChapPage = async (type, name, chap) => {
    try {
        const res = await httpRequest.get(`/${type}/${name}/${chap}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
//Search Comic
export const searchComic = async (keyword) => {
    try {
        const res = await httpRequest.get(`/search`, { params: { keyword } });
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
//Get Comic follow sort
export const getAllComicNewUpdate = async (link) => {
    try {
        const res = await httpRequest.get(`/list?${link}`);
        return res.data;
    } catch (error) {
        console.log(error);
    }
};
export const getComicByPage = async (link) => {
    try {
        const res = await httpRequest.get(`/list?${link}`);
        return res.data;
    } catch (error) {
        console.log(error.message);
    }
};
