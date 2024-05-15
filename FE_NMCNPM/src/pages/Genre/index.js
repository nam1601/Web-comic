import classNames from 'classnames/bind';

import styles from './Genre.module.scss';
import TypeDescFrame from '~/component/TypeDescFrame/TypeDescFrame';
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
    getAllComicNewUpdate,
    getComicByPage,
    getGenre,
    getListGenre,
    getListOnPage,
} from '~/service/getFromApi';
import GenreFrame from '~/component/GenreFrame/GenreFrame';
import CarItem from '~/component/CardItem/CardItem';
import ReactPaginate from 'react-paginate';

const cx = classNames.bind(styles);
const status = [
    { title: 'Tất cả', to: '/genre', api: 'list=true' },
    { title: 'Hoàn thành', to: '/complete', api: 'list=true&status=2' },
    { title: 'Đang tiến hành', to: '/on-going', api: 'list=true&status=0' },
];

const sort = [
    { title: 'Ngày cập nhập', to: '&sort=2', api: 'sort=2' },
    { title: 'Truyện mới', to: '&sort=3', api: 'sort=3' },
    { title: 'Top viewed', to: '&sort=4', api: 'sort=4' },
    { title: 'Top liked', to: '&sort=5', api: 'sort=5' },
];
function Genre() {
    const [listComic, setListComic] = useState([]);
    const [listOfGenre, setListOfGenre] = useState([]);

    const [pagination, setPagination] = useState(1);
    const [maxPage, setMaxPage] = useState(0);

    const [activeIndex, setActiveIndex] = useState(0);
    const [activeSortIndex, setActiveSortIndex] = useState(0);

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

    //Call list of genre
    const memorizedGenre = useMemo(() => {
        const res = getListGenre();
        return res;
    }, [status]);
    // const fetchByPage = async () => {
    //     const res = await getComicByPage(
    //         `${status[activeIndex].api}&${sort[activeSortIndex].api}&page=${
    //             pagination + 1
    //         }`,
    //     );
    //     setListComic(res.mangas);
    // };
    // useEffect(() => {
    //     const getListByPage = async () => {
    //         const res = await getListOnPage(pagination);
    //         setListComic(res.mangas);
    //     };
    //     getListByPage();
    // }, [pagination]);
    const handlePageClick = async (e) => {
        setPagination(e.nextSelectedPage + 1);
        let data = await getAllComicNewUpdate(
            `${status[activeIndex].api}&${sort[activeSortIndex].api}&page=${
                e.nextSelectedPage + 1
            }`,
        );
        setListComic(data.mangas);
    };
    useEffect(() => {
        memorizedGenre.then((res) => {
            setListOfGenre(res.data.genresListFilter);
        });
    }, [memorizedGenre]);
    useEffect(() => {
        setActiveIndex(active(status));
        setActiveSortIndex(active(sort) === undefined ? 0 : active(sort));
    }, [pathName.pathname]);
    useEffect(() => {
        const fetchListComic = async () => {
            await setPagination(1);
            const res = await getAllComicNewUpdate(
                `${status[activeIndex].api}&${sort[activeSortIndex].api}&page=${pagination}`,
            );
            setMaxPage(res.totalPages);
            setListComic(res.mangas);
        };
        fetchListComic();
    }, [activeIndex, activeSortIndex, pagination]);

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
                            <div className={cx('status')}>
                                {status.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={`${item.to}`}
                                        className={cx(
                                            'status__btn',
                                            `${
                                                i === activeIndex
                                                    ? 'active'
                                                    : ''
                                            }`,
                                        )}
                                    >
                                        {item.title}
                                    </Link>
                                ))}
                            </div>
                            <div className={cx('sort')}>
                                {sort.map((item, i) => (
                                    <Link
                                        key={i}
                                        to={`${
                                            status[activeIndex].to + item.to
                                        }`}
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
                    <div className={cx('pagination-wrapper')}>
                        <ReactPaginate
                            // onPageChange={handlePageClick}
                            onClick={handlePageClick}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={3}
                            pageCount={maxPage}
                            previousLabel="<"
                            nextLabel=">"
                            pageClassName={cx('page-item')}
                            pageLinkClassName={cx('page-link')}
                            previousClassName={cx('page-item')}
                            previousLinkClassName={cx('page-link')}
                            nextClassName={cx('page-item')}
                            nextLinkClassName={cx('page-link')}
                            breakLabel="..."
                            breakClassName={cx('page-item')}
                            breakLinkClassName={cx('page-link')}
                            containerClassName={cx('pagination')}
                            activeClassName={cx('active')}
                            renderOnZeroPageCount={null}
                        />
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

export default Genre;
