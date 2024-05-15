import classNames from 'classnames/bind';

import styles from './Rank.module.scss';

import TypeDescFrame from '~/component/TypeDescFrame/TypeDescFrame';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import GenreFrame from '~/component/GenreFrame/GenreFrame';
import CarItem from '~/component/CardItem/CardItem';
import ReactPaginate from 'react-paginate';

import {
    getAllComicNewUpdate,
    getComicByPage,
    getGenre,
    getListGenre,
    getListOnPage,
} from '~/service/getFromApi';

const cx = classNames.bind(styles);
const sort = [
    { title: 'Top viewed', to: '&sort=4', api: 'sort=4' },
    { title: 'Top liked', to: '&sort=5', api: 'sort=5' },
];
function Rank() {
    const [activeSortIndex, setActiveSortIndex] = useState(0);

    const [listComic, setListComic] = useState([]);
    const [listOfGenre, setListOfGenre] = useState([]);

    const [pagination, setPagination] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    const pathName = useLocation();
    const active = (array) => {
        const result = array.map((item, i) => {
            let activeIndex = -1;
            if (pathName.pathname.indexOf(item.to) !== -1) {
                activeIndex = i;
            }

            return activeIndex;
        });
        return result.find((item) => item > -1);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('path')}>
                <span>Trang chủ </span>{' '}
                <box-icon name="chevrons-right" color="#ccc" size="16px" />{' '}
                <span className={cx('title')}>Thể loại</span>
            </div>

            <div className={cx('genre')}>
                <div className={cx('genre__filter')}>
                    <TypeDescFrame type={'all'} />
                    <div className={cx('filter')}>
                        <p>Sắp xếp theo: </p>
                        <div className={cx('selections')}>
                            <div className={cx('sort')}>
                                {sort.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={`${item.to}`}
                                        className={cx(
                                            'sort__btn',
                                            `${
                                                i === activeSortIndex
                                                    ? 'active'
                                                    : ''
                                            }`,
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className={cx('list-comic')}>
                        {listComic.map((comic, index) => (
                            <CarItem item={comic} key={index} />
                        ))}
                    </div>
                </div>
                <div className={cx('genre_box')}>
                    <GenreFrame
                        listGenre={listOfGenre}
                        path={pathName.pathname}
                    />
                </div>
            </div>
        </div>
    );
}

export default Rank;
