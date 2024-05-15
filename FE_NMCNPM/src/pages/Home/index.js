import classNames from 'classnames/bind';
import ReactPaginate from 'react-paginate';

import styles from './Home.module.scss';
import HeroSlide from '~/component/HeroSlide/HeroSlide';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

import { selectUser } from '~/features/user/userSlice';
import { getListOnPage } from '~/service/getFromApi';
import CardItem from '~/component/CardItem/CardItem';
import RankList from '~/component/RankList/RankList';
import Frame from '~/component/Frame/Frame';

const cx = classNames.bind(styles);

function Home() {
    const [pagination, setPagination] = useState(1);
    const [totalPage, setTotalPage] = useState(0);
    const [comics, setComics] = useState([]);
    const handlePageClick = (e) => {
        setPagination(e.nextSelectedPage + 1);
    };
    useEffect(() => {
        const getComic = async () => {
            const res = await getListOnPage(pagination);
            setTotalPage(res.totalPages);
            setComics(res.mangas);
        };
        getComic();
    }, [pagination]);
    return (
        <>
            <HeroSlide />
            <div className={cx('wrapper')}>
                <div className={cx('comic')}>
                    <h2 className={cx('comic__title')}>Danh sách truyện </h2>
                    <div className={cx('comic-grid')}>
                        {comics.map((comic, i) => (
                            <CardItem item={comic} key={i} />
                        ))}
                    </div>
                    <div className={cx('pagination-wrapper')}>
                        <ReactPaginate
                            // onPageChange={handlePageClick}
                            onClick={handlePageClick}
                            pageRangeDisplayed={5}
                            marginPagesDisplayed={3}
                            pageCount={totalPage}
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
                <div className={cx('frame')}>
                    <Frame type="Truyện theo dõi" link="/following" />
                    <Frame type="Lịch sử đọc" link="/read" />
                    <RankList />
                </div>
            </div>
        </>
    );
}

export default Home;
