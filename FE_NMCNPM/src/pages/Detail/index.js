import classNames from 'classnames/bind';

import styles from './Detail.module.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getComic } from '~/service/getFromApi';
import { Link } from 'react-router-dom';
import RankList from '~/component/RankList/RankList';
import { useDispatch, useSelector } from 'react-redux';
import {
    checkFollowAComic,
    followAComic,
    getInfoToContinue,
    unFollowAComic,
} from '~/service/BEService';
import { selectUser } from '~/features/user/userSlice';
import Comment from '~/component/Comment/Comment';
import { Height } from '@mui/icons-material';
const cx = classNames.bind(styles);

function Detail() {
    const location = useLocation();
    const gradient = location.pathname.split('/');
    const [comic, setComic] = useState({});
    const [chapList, setChapList] = useState([]);
    const [isFollow, setIsFollow] = useState(false);
    const [height, setHeight] = useState(709);
    const [isShowAll, setIsShowAll] = useState(false);
    const [firstChap, setFirstChap] = useState('/');
    const [lastChap, setLastChap] = useState('/');
    const [aFollow, setAFollow] = useState({});
    const [isContinue, setIsContinue] = useState(false);

    const dispatch = useDispatch();
    const user = useSelector(selectUser);
    useEffect(() => {
        const getToContinue = async () => {
            const userId = user.id;

            const res = await getInfoToContinue(userId, gradient[2]);
            setAFollow(res.data.data);
            if (res.data.data.lastChap !== '0') {
                setIsContinue(true);
            }
        };
        getToContinue();
    }, []);
    useEffect(() => {
        const getInfo = async () => {
            const res = await getComic(location.pathname);
            setComic(res);
            const newList = res.chaps.reverse();
            setChapList(newList);
            setFirstChap(newList[newList.length - 1].chapEP);
            setLastChap(newList[0].chapEP);
        };
        const checkFollow = async () => {
            let userId = user.id;
            const res = await checkFollowAComic(userId, gradient[2]);
            setIsFollow(res.data.isFollow === 1 ? true : false);
        };
        let check = checkFollow();
        getInfo();
    }, [location.pathname]);

    const handleClick = async () => {
        let userId = user.id;
        let title = comic.title;
        let mangaEp = gradient[2];
        let cover = comic.cover;
        let lastChap = '0';
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
    const handleChangeHeight = () => {
        setHeight(100000);
        setIsShowAll(true);
    };
    const handleShowLess = () => {
        setHeight(709);
        setIsShowAll(true);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('info')}>
                <div className={cx('path')}>
                    <span>Trang chủ </span>{' '}
                    <box-icon name="chevrons-right" color="#fff" size="20px" />{' '}
                    {comic.title}{' '}
                </div>
                <div className={cx('comic')}>
                    <div className={cx('comic__name')}>
                        <h3 className={cx('name')}>{comic.title}</h3>
                        <span>[Cập nhâp lúc: {comic.lastUpdate}]</span>
                    </div>
                    <div className={cx('detail')}>
                        <div className={cx('poster')}>
                            <img src={comic.cover} alt={comic.title} />
                        </div>
                        <div className={cx('detail__block')}>
                            <ul className={cx('list')}>
                                <li className={cx('list__item')}>
                                    <span className={cx('item__title')}>
                                        <box-icon
                                            type="solid"
                                            name="user"
                                            color="#fff"
                                            size="20px"
                                        ></box-icon>
                                        Tác giả
                                    </span>
                                    <span className={cx('item__title__value')}>
                                        {comic.author}
                                    </span>
                                </li>
                                <li className={cx('list__item')}>
                                    <span className={cx('item__title')}>
                                        <box-icon
                                            name="station"
                                            color="#fff"
                                            size="20px"
                                        ></box-icon>
                                        Tình trạng
                                    </span>
                                    <span className={cx('item__title__value')}>
                                        {comic.status}
                                    </span>
                                </li>
                                <li className={cx('list__item')}>
                                    <span className={cx('item__title')}>
                                        <box-icon
                                            type="solid"
                                            name="purchase-tag-alt"
                                            color="#fff"
                                            size="20px"
                                        ></box-icon>
                                        Thể loại
                                    </span>
                                    <span
                                        className={cx(
                                            'item__title__value',
                                            'type',
                                        )}
                                    >
                                        {comic.genres?.map((genre, i) => (
                                            <span key={i}>
                                                {genre}
                                                {i !== comic.genres.length - 1
                                                    ? ' - '
                                                    : ''}
                                            </span>
                                        ))}
                                    </span>
                                </li>
                                <li className={cx('list__item')}>
                                    <span className={cx('item__title')}>
                                        <box-icon
                                            type="solid"
                                            name="book"
                                            color="#fff"
                                            size="20px"
                                        ></box-icon>
                                        Lượt xem
                                    </span>
                                    <span className={cx('item__title__value')}>
                                        {comic.view}
                                    </span>
                                </li>
                            </ul>
                            <div className={cx('rate')}>
                                <span>{comic.title}</span> {comic.rating} lượt
                                đánh giá
                            </div>
                            <div className={cx('rating')}>
                                <box-icon
                                    size="20px"
                                    type="solid"
                                    name="star"
                                    color="#f0ad4e"
                                ></box-icon>
                                <box-icon
                                    size="20px"
                                    type="solid"
                                    name="star"
                                    color="#f0ad4e"
                                ></box-icon>
                                <box-icon
                                    size="20px"
                                    type="solid"
                                    name="star"
                                    color="#f0ad4e"
                                ></box-icon>
                                <box-icon
                                    size="20px"
                                    type="solid"
                                    name="star"
                                    color="#f0ad4e"
                                ></box-icon>
                                <box-icon
                                    size="20px"
                                    color="#f0ad4e"
                                    name="star-half"
                                    type="solid"
                                ></box-icon>
                            </div>

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

                            <div className={cx('read__actions')}>
                                <Link to={firstChap} className={cx('link')}>
                                    <button className={cx('start', 'btn')}>
                                        Đọc từ đầu
                                    </button>
                                </Link>
                                <Link to={lastChap} className={cx('link')}>
                                    <button className={cx('last', 'btn')}>
                                        Đọc mới nhất
                                    </button>
                                </Link>
                                {isFollow && isContinue && (
                                    <Link
                                        to={`/manga/${gradient[2]}/${aFollow.lastChap}`}
                                        className={cx('link')}
                                    >
                                        <button
                                            className={cx('continue', 'btn')}
                                        >
                                            Đọc tiếp
                                            <span>{'   >'}</span>
                                        </button>
                                    </Link>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={cx('desc')}>
                    <div className={cx('category__title')}>
                        <box-icon name="file" color="#ff9601"></box-icon>
                        Nội dung
                    </div>
                    <div className={cx('brief')}>{comic.description}</div>
                </div>
                <div className={cx('chap')}>
                    <div className={cx('category__title')}>
                        <box-icon name="list-ul" color="#ff9601"></box-icon>
                        Danh sách chương
                    </div>

                    <table className={cx('chap__table')}>
                        <thead className={cx('table__title')}>
                            <tr>
                                <th className={cx('chap__title__quantity')}>
                                    Số chương
                                </th>
                                <th>Ngày cập nhập</th>
                                <th>Chap Ep</th>
                            </tr>
                        </thead>

                        <tbody className={cx('table__body')}>
                            <div
                                className={cx('chap__list')}
                                style={{ maxHeight: `${height}px` }}
                            >
                                {chapList.map((chap, index) => {
                                    return (
                                        <tr
                                            key={index}
                                            className={cx(
                                                `${
                                                    index === 0
                                                        ? 'no-border'
                                                        : ''
                                                }`,
                                            )}
                                        >
                                            <td className={cx('number')}>
                                                <Link
                                                    to={chap.chapEP}
                                                    className={cx('chap__link')}
                                                >
                                                    {chap.chapTitle}
                                                </Link>
                                            </td>
                                            <td>{chap.chapTime}</td>
                                            <td>N/A</td>
                                        </tr>
                                    );
                                })}
                            </div>
                            {!isShowAll && (
                                <div
                                    className={cx('show-all')}
                                    onClick={handleChangeHeight}
                                >
                                    Xem thêm
                                </div>
                            )}
                            {isShowAll && (
                                <div
                                    className={cx('show-all')}
                                    onClick={handleShowLess}
                                >
                                    Ẩn bớt
                                </div>
                            )}
                        </tbody>
                    </table>
                </div>
                <Comment comic={comic} />
            </div>
            <RankList />
        </div>
    );
}

export default Detail;
