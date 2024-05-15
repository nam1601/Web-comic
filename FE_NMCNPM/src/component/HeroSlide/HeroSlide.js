import { useEffect, useState, useHistory, useRef } from 'react';
import classNames from 'classnames/bind';
import SwiperCore, { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css/autoplay';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
// import 'swiper/css/hash-navigation';
import 'swiper/swiper-bundle.css';

import styles from './HeroSlide.module.scss';
// import apiConfig from '~/api/apiConfig';
// import Button from '../Button';
import { parsePath, useNavigate } from 'react-router-dom';
import { getDaily } from '~/service/getFromApi';
// import Modal from '../Modal';
// import { ModalContent } from '../Modal/Modal';
// import stylesModal from '../Modal/Modal.module.scss';

// const cs = classNames.bind(stylesModal);
const cx = classNames.bind(styles);
function HeroSlide() {
    SwiperCore.use([Autoplay]);
    const [comicItems, setComicItems] = useState([]);
    useEffect(() => {
        const getComics = async () => {
            const res = await getDaily();
            setComicItems(res.daily);
        };
        getComics();
    }, []);

    return (
        <div className={cx('hero-slide')}>
            <Swiper
                loop={true}
                // observer={true}
                // observeParents={true}
                modules={[Autoplay]}
                grabCursor={true}
                spaceBetween={0}
                slidesPerView={1}
                // direction="vertical"
                // autoplay={{ delay: 5000 }}
            >
                {comicItems.map((item, index) => (
                    <SwiperSlide key={index}>
                        {({ isActive }) => (
                            <HeroSlideItem
                                item={item}
                                className={`${isActive ? 'active' : ''}`}
                            />
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}

export function HeroSlideItem({ item, className, ...props }) {
    let history = useNavigate();

    const background = item.cover;
    // const classesActive = cs('active');
    // const setModalActive = async () => {
    //     const modal = document.querySelector(`#modal_${item.id}`);
    //     const videos = await tmdbApi.getVideos(category.movie, item.id);
    //     if (videos.results.length > 0) {
    //         const videoSrc =
    //             'https://www.youtube.com/embed/' + videos.results[0].key;
    //         modal.querySelector(' iframe').setAttribute('src', videoSrc);
    //         console.log(modal.querySelector('iframe').src);
    //     } else {
    //         modal.querySelector('.modal__content').innerHTML =
    //             'No trailer video';
    //     }

    //     modal.classList.toggle(classesActive);
    // };
    const classes = cx('hero-slide__item', { [className]: className });
    return (
        <div
            className={classes}
            style={{ backgroundImage: `url(${background})` }}
        >
            <div className={cx('hero-slide__item__content')}>
                <div className={cx('hero-slide__item__content__info')}>
                    <h2 className={cx('title')}>{item.title}</h2>
                    {/* <div className={cx('overview')}>{item.lastCHap}</div> */}
                    <div className={cx('btns')}>{item.lastChap}</div>
                </div>
            </div>
            <div className={cx('hero-slide__item__content__poster')}>
                <img
                    className={cx('poster-img')}
                    src={item.cover}
                    alt="poster"
                />
            </div>
        </div>
    );
}
export default HeroSlide;
