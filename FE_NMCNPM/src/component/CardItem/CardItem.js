import classNames from 'classnames/bind';

import styles from './CardItem.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
function CarItem({ item, ...props }) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('poster')}>
                <img src={item.cover} alt={item.title} />
            </div>
            <Link
                to={`${
                    item.mangaEP
                        ? `/manga/${item.mangaEP}`
                        : `/manga/${item.mangaEp}`
                }`}
                className={cx('name')}
            >
                {item.title}
            </Link>
            <div className={cx('chap--info')}>
                {props.type && (
                    <span className={cx('note', 'current-chap')}>
                        Chap hiện tại: {item.currentChap}
                    </span>
                )}
                {!props.type && (
                    <span className={cx('note')}>
                        Newest:{' '}
                        <span className={cx('number')}>
                            {item.newChap || item.lastChap}
                        </span>
                    </span>
                )}

                {/* <span className={cx('time')}>{item.lastUpdate}</span> */}
            </div>
        </div>
    );
}

export default CarItem;
