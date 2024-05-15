import classNames from 'classnames/bind';

import styles from './RankList.module.scss';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
// import httpRequest from '~/utils/httpRequest';
import { getTopList } from '~/service/getFromApi';
const cx = classNames.bind(styles);
function RankList({ ...props }) {
    const [topList, setTopList] = useState([]);
    useEffect(() => {
        const getList = async () => {
            const res = await getTopList(true, 4);
            setTopList(res.mangas.slice(0, 9));
        };
        getList();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('rank__header')}>
                <ul className={cx('list__title')}>
                    <li className={cx('list__item', 'active')}>Most Viewed</li>
                    <li className={cx('list__item')}>Most Liked</li>
                </ul>
            </div>
            <div className={cx('rank__content')}>
                <ul className={cx('top__list')}>
                    {topList.map((item, index) => (
                        <li
                            key={index}
                            className={cx(
                                'top__list__item',
                                `${index === 0 ? 'no-border' : ''}`,
                            )}
                        >
                            <div
                                className={cx(
                                    'order',
                                    `${index === 0 ? 'blue' : ''}`,
                                    `${index === 1 ? 'green' : ''}`,
                                    `${index === 2 ? 'primary' : ''}`,
                                )}
                            >
                                0{index + 1}
                            </div>
                            <div className={cx('item')}>
                                <div
                                    className={cx('poster')}
                                    // style={{
                                    //     backgroundImage: `url(${item.cover})`,
                                    // }}
                                >
                                    <img
                                        alt={item.cover}
                                        src={item.cover}
                                    ></img>
                                </div>
                                <div className={cx('desc')}>
                                    <Link
                                        to={`/manga/${item.mangaEP}`}
                                        className={cx('name')}
                                    >
                                        {item.title}
                                    </Link>
                                    <span>{item.lastChap}</span>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default RankList;
