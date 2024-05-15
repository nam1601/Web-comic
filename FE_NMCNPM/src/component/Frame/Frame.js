import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './Frame.module.scss';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '~/features/user/userSlice';
import {
    fetchComicFollow,
    selectFollowList,
} from '~/features/follow/followSlice';
import { getRead } from '~/service/BEService';

const cx = classNames.bind(styles);
function Frame({ type, link, ...props }) {
    // const [followList, setFollowList] = useState([]);
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const followList = useSelector(selectFollowList);
    const [read, setRead] = useState([]);
    useEffect(() => {
        const getAllRead = async () => {
            let userId = user.id;
            const res = await getRead(userId);
            console.log(res);
            setRead(res.data.data);
        };
        if (type === 'Truyện theo dõi') {
            dispatch(fetchComicFollow(user.id));
        } else {
            getAllRead();
        }
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header')}>
                <h3 className={cx('type')}>{type}</h3>
                <Link to={link} className={cx('see-all')}>
                    Xem tất cả
                </Link>
            </div>
            <div className={cx('frame__content')}>
                <ul className={cx('frame__list')}>
                    {followList.length === 0 && (
                        <li className={cx('frame__list__item', 'no-comic')}>
                            Chưa theo dõi truyện
                        </li>
                    )}
                    {read.length === 0 && type !== 'Truyện theo dõi' && (
                        <li className={cx('frame__list__item', 'no-comic')}>
                            Chưa đọc truyện
                        </li>
                    )}
                    {type === 'Truyện theo dõi' &&
                        followList.length > 0 &&
                        followList.map((item, index) => (
                            <li
                                key={index}
                                className={cx(
                                    'frame__list__item',
                                    `${index === 0 ? 'no-border' : ''}`,
                                )}
                            >
                                <div className={cx('item')}>
                                    <div className={cx('poster')}>
                                        <img
                                            alt={item.cover}
                                            src={item.cover}
                                        ></img>
                                    </div>
                                    <div className={cx('desc')}>
                                        <Link
                                            to={`/manga/${item.mangaEp}`}
                                            className={cx('name')}
                                        >
                                            {item.title}
                                        </Link>
                                        <span>Chapter {item.newChap}</span>
                                    </div>
                                    <div className={cx('time')}>
                                        <time>{item.lastUpdate}</time>
                                    </div>
                                </div>
                            </li>
                        ))}
                    {type !== 'Truyện theo dõi' &&
                        read.map((item, index) => (
                            <li
                                key={index}
                                className={cx(
                                    'frame__list__item',
                                    `${index === 0 ? 'no-border' : ''}`,
                                )}
                            >
                                <div className={cx('item')}>
                                    <div className={cx('poster')}>
                                        <img
                                            alt={item.cover}
                                            src={item.cover}
                                        ></img>
                                    </div>
                                    <div className={cx('desc')}>
                                        <Link
                                            to={`/manga/${item.mangaEp}`}
                                            className={cx('name')}
                                        >
                                            {item.title}
                                        </Link>
                                        <span>{item.currentChap}</span>
                                    </div>
                                    <div className={cx('time')}>
                                        <time>{item.lastUpdate}</time>
                                    </div>
                                </div>
                            </li>
                        ))}
                </ul>
            </div>
        </div>
    );
}

export default Frame;
