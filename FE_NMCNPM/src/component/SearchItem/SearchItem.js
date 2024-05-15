import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import styles from './SearchItem.module.scss';

const cx = classNames.bind(styles);

function SearchItem({ item, ...props }) {
    return (
        <div className={cx('item')}>
            <div
                className={cx('poster')}
                // style={{
                //     backgroundImage: `url(${item.cover})`,
                // }}
            >
                <img alt={item.cover} src={item.cover}></img>
            </div>
            <div className={cx('desc')}>
                <Link to={`/manga/${item.mangaEP}`} className={cx('name')}>
                    {item.title}
                </Link>
                <span>{item.lastChap}</span>
            </div>
        </div>
    );
}

export default SearchItem;
