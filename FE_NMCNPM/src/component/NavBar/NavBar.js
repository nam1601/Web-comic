import classNames from 'classnames/bind';

import styles from './NavBar.module.scss';
import { Link } from 'react-router-dom';

const cx = classNames.bind(styles);
const listNav = [
    {
        title: (
            <box-icon
                name="home"
                type="solid"
                color="#ff9601"
                size="20px"
            ></box-icon>
        ),

        to: '/',
    },
    { title: 'Theo dõi', to: 'following' },
    {
        title: 'Thể loại',
        icon: (
            <box-icon
                type="solid"
                name="down-arrow"
                color="#fff"
                size="12px"
            ></box-icon>
        ),
        to: 'genre',
    },
    {
        title: 'Lịch sử',
        icon: <box-icon name="history" size="16px" color="#fff"></box-icon>,
        to: '/read',
    },
];
function NavBar() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('nav__content')}>
                {listNav.map((item, index) => (
                    <Link
                        key={index}
                        className={cx('nav__item', `${item.icon ? 'pd' : ''}`)}
                        to={item.to}
                    >
                        {item.title}{' '}
                        <span
                            className={cx(
                                'nav__icon',
                                `${
                                    item.title === 'Lịch sử' ? 'his__icon' : ''
                                } `,
                            )}
                        >
                            {item.icon}
                        </span>
                    </Link>
                ))}
            </div>
        </div>
    );
}

export default NavBar;
