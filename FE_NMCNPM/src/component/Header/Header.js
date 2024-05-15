import classNames from 'classnames/bind';

import styles from './Header.module.scss';

import bgHeader from '~/asset/images/bg_header_2017.jpg';
import logo from '~/asset/images/logo-nettruyen.png';
import Search from '~/component/Search';
import { Link } from 'react-router-dom';
import noImage from '../../asset/images/no-image.png';
import MenuAccount from '../MenuAccount/MenuAccount';
const cx = classNames.bind(styles);
function Header({ user }) {
    return (
        <>
            <header
                className={cx('header')}
                style={{ backgroundImage: `url(${bgHeader})` }}
            >
                <div className={cx('wrapper')}>
                    <Link to="/" className={cx('logo')}>
                        <img src={logo} alt="logo" />
                    </Link>
                    <div className={cx('actions')}>
                        <Search />
                        <div className={cx('group')}>
                            <button className={cx('action__button')}>
                                <box-icon name="bulb" color="#fff"></box-icon>
                            </button>
                            <button className={cx('action__button')}>
                                <box-icon
                                    type="solid"
                                    name="bell"
                                    color="#fff"
                                ></box-icon>
                            </button>
                        </div>
                    </div>
                    {!user.id && (
                        <div className={cx('auth')}>
                            <Link to="/login" className={cx('login')}>
                                Đăng nhập
                            </Link>
                            <Link to="/register" className={cx('register')}>
                                Đăng ký
                            </Link>
                        </div>
                    )}
                    {user.id && (
                        <div className={cx('user__interact')}>
                            <MenuAccount user={user} />
                        </div>
                    )}
                </div>
            </header>
        </>
    );
}

export default Header;
