import classNames from 'classnames/bind';

import styles from './Chap.module.scss';

import { Link, useLocation, useNavigate } from 'react-router-dom';
import 'react-js-dropdavn/dist/index.css';
import { useEffect, useState } from 'react';
import { getComicChapPage, getComic } from '~/service/getFromApi';
import Comment from '~/component/Comment/Comment';
import { useSelector } from 'react-redux';
import { selectUser } from '~/features/user/userSlice';
import {
    checkFollowAComic,
    checkRead,
    followAComic,
    unFollowAComic,
    updateHistoryComic,
    updateRead,
    updateChapRead,
} from '~/service/BEService';

const cx = classNames.bind(styles);
function Chap() {
    const chapURL = useLocation();
    const gradient = chapURL.pathname.split('/');

    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const linkListChap = `/manga/${gradient[2]}`;

    const [comic, setComic] = useState({});
    const [chap, setChap] = useState({});
    const [pages, setPages] = useState([]);
    const [listChap, setListChap] = useState([]);
    const [isFollow, setIsFollow] = useState(false);

    useEffect(() => {
        const getComicForChap = async () => {
            const res = await getComic(linkListChap);
            setComic(res);
            let sample = res.chaps.reverse();
            setListChap(sample);
        };
        const checkFollow = async () => {
            let userId = user.id;
            const res = await checkFollowAComic(userId, gradient[2]);
            setIsFollow(res.data.isFollow === 1 ? true : false);
        };

        getComicForChap();
        if (user.id) {
            checkFollow();
            // read();
        }
    }, []);
    useEffect(() => {
        const updateHistory = async () => {
            let userId = user.id;
            let mangaEp = gradient[2];
            let newChap = gradient[3];
            await updateHistoryComic(userId, mangaEp, newChap);
        };
        const checkReadInDB = async () => {
            let userId = user.id;
            let mangaEp = gradient[2];
            let isHave = await checkRead(userId, mangaEp);
            return isHave.data.bool;
        };
        const read = async () => {
            let userId = user.id;
            let mangaEp = gradient[2];
            let currentChap = gradient[3];
            const res = await getComic(linkListChap);
            let title = res.title;
            let cover = res.cover;
            let isHave = await checkReadInDB();
            if (isHave) {
                await updateChapRead(userId, mangaEp, currentChap);
            } else {
                await updateRead(userId, mangaEp, title, currentChap, cover);
            }
        };
        const getPage = async () => {
            const res = await getComicChapPage(
                gradient[1],
                gradient[2],
                gradient[3],
            );
            setChap(res);
            setPages(res.pages);
        };

        getPage();
        if (user.id) {
            updateHistory();
            read();
        }
    }, [chapURL.pathname]);
    const handleClick = async () => {
        let userId = user.id;
        let title = comic.title;
        let mangaEp = gradient[2];
        let cover = comic.cover;
        let lastChap = gradient[3];
        let newChap = comic.chapsTotal;
        let lastUpdate = comic.lastUpdate;
        await followAComic({
            userId,
            mangaEp,
            title,
            cover,
            lastChap,
            newChap,
            lastUpdate,
        });
        setIsFollow(true);
    };
    const handleUnFollow = async () => {
        let userId = user.id;
        let mangaEp = gradient[2];
        await unFollowAComic(userId, mangaEp);
        setIsFollow(false);
    };
    const handlePrevChap = () => {
        if (chap.prevChapter) {
            navigate(`${linkListChap}/${chap.prevChapter}`);
        }
    };
    const handleNextChap = () => {
        if (chap.nextChapter) {
            navigate(`${linkListChap}/${chap.nextChapter}`);
        }
    };
    const handleChange = (e) => {
        navigate(`${linkListChap}/${e.target.value}`);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info__chap')}>
                <div className={cx('chap__path')}>
                    <span>Trang chủ </span>{' '}
                    <box-icon name="chevrons-right" color="#ccc" size="16px" />{' '}
                    <span className={cx('path__name')}>{comic.title}</span>
                    <box-icon
                        name="chevrons-right"
                        color="#ccc"
                        size="16px"
                    />{' '}
                    <span className={cx('chap__number')}>
                        {chap.currentChapter}
                    </span>
                </div>
                <div className={cx('comic__name')}>
                    <span className={cx('title')}>{comic.title}</span>
                    {' - '}
                    <span>{chap.currentChapter}</span>{' '}
                    <span className={cx('time')}>
                        {'[Cập nhập lúc: '}
                        {listChap.map((item, index) => {
                            if (item.chapEP === gradient[3]) {
                                return item.chapTime + ']';
                            }
                            return '';
                        })}
                    </span>
                </div>
                <div className={cx('preventive')}>
                    <span>
                        Nếu không xem được truyện vui lòng đổi SERVER bên dưới
                    </span>
                    <div className={cx('list__server')}>
                        <button className={cx('server', 'active')}>
                            Server 1
                        </button>
                        <button className={cx('server')}>Server 2</button>
                        <button className={cx('server')}>Server 3</button>
                    </div>
                    <button className={cx('error__button')}>
                        <box-icon
                            type="solid"
                            name="error"
                            color="#fff"
                            size="16px"
                        ></box-icon>{' '}
                        Báo lỗi
                    </button>
                </div>
                <div className={cx('chapter__nav')}>
                    <Link to="/" className={cx('home__nav')}>
                        <box-icon name="home" type="solid" color="#d9534f">
                            {' '}
                        </box-icon>
                    </Link>
                    <Link to={linkListChap} className={cx('detail__nav')}>
                        <box-icon
                            name="list-ul"
                            color="#d9534f"
                            size="30px"
                        ></box-icon>
                    </Link>
                    <button
                        className={cx(
                            'chap__button',
                            'prev',
                            `${chap.prevChapter === '' ? 'disable' : ''}`,
                        )}
                        onClick={handlePrevChap}
                    >
                        <box-icon
                            type="solid"
                            name="chevron-left"
                            color="#fff"
                        ></box-icon>
                    </button>
                    {/* <input type="text" id="myInput"></input> */}
                    <select
                        value={pages.currentChapter}
                        placeholder={pages.currentChapter}
                        onChange={handleChange}
                    >
                        {listChap.map((chapter, index) => (
                            <option key={index} value={chapter.chapEP}>
                                {chapter.chapTitle}
                            </option>
                        ))}
                    </select>

                    <button
                        className={cx(
                            'chap__button',
                            'next',
                            `${chap.nextChapter === '' ? 'disable' : ''}`,
                        )}
                        onClick={handleNextChap}
                    >
                        <box-icon
                            type="solid"
                            name="chevron-right"
                            color="#fff"
                        ></box-icon>
                    </button>
                    {isFollow && (
                        <button
                            className={cx('unfollow__btn')}
                            onClick={handleUnFollow}
                        >
                            <box-icon
                                name="x"
                                size="14px"
                                fontWeight="500"
                                color="#fff"
                            ></box-icon>
                            Bỏ theo dõi
                        </button>
                    )}
                    {!isFollow && (
                        <button
                            className={cx('follow__btn')}
                            onClick={handleClick}
                        >
                            <box-icon
                                type="solid"
                                name="heart"
                                color="#fff"
                                size="18px"
                            ></box-icon>
                            Theo dõi
                        </button>
                    )}
                </div>
            </div>
            <div className={cx('chap__pages')}>
                {pages.map((page, index) => (
                    <div className={cx(`page__${index}`)} key={index}>
                        <img src={page} alt={`page${index}`} />
                    </div>
                ))}
            </div>
            <div className={cx('chap__footer')}>
                <div className={cx('chap__nav--bottom')}>
                    <button
                        className={cx(
                            `${chap.prevChapter === '' ? 'disable' : ''}`,
                        )}
                        onClick={handlePrevChap}
                    >
                        <box-icon
                            type="solid"
                            name="chevron-left"
                            color="#fff"
                        ></box-icon>
                        Chap trước
                    </button>
                    <button
                        className={cx(
                            `${chap.nextChapter === '' ? 'disable' : ''}`,
                        )}
                        onClick={handleNextChap}
                    >
                        Chap sau
                        <box-icon
                            type="solid"
                            name="chevron-right"
                            color="#fff"
                        ></box-icon>
                    </button>
                </div>
                <div className={cx('chap__path')}>
                    <span>Trang chủ </span>{' '}
                    <box-icon name="chevrons-right" color="#ccc" size="16px" />{' '}
                    <span className={cx('path__name')}>{comic.title}</span>
                    <box-icon
                        name="chevrons-right"
                        color="#ccc"
                        size="16px"
                    />{' '}
                    <span className={cx('chap__number')}>
                        {chap.currentChapter}
                    </span>
                </div>
            </div>
            <Comment comic={comic} />
        </div>
    );
}

export default Chap;
