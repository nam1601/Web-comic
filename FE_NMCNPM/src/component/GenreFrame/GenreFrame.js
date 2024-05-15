import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import style from './GenreFrame.module.scss';

const cx = classNames.bind(style);

function GenreFrame({ listGenre, path, ...props }) {
    return (
        <div className={cx('wrapper')}>
            <h3>Thể loại</h3>
            <ul className={cx('list-genre')}>
                {listGenre.map((genre, index) => (
                    <li className={cx('genre-item')} key={index}>
                        <Link to={`${genre.EP}`}>{genre.genre}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default GenreFrame;
