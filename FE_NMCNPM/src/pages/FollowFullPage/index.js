import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUser, logOut } from '~/features/user/userSlice';
import noImage from '../../asset/images/no-image.png';
import style from './FollowFullPage.module.scss';

import FollowInfo from '~/component/FollowInfo/FollowInfo';

const cx = classNames.bind(style);
function FollowFullPage() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const handleExit = async () => {
        await dispatch(logOut());
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('chap__path')}>
                <span>Trang chủ </span>{' '}
                <box-icon name="chevrons-right" color="#ccc" size="16px" />{' '}
                <span className={cx('path__name')}>Thông tin tài khoản</span>
            </div>
            <div className={cx('detail-block')}>
                <div className={cx('center-block')}>
                    <div className={cx('personal')}>
                        <section className={cx('user-sidebar')}>
                            <div className={cx('user-info')}>
                                <img
                                    alt="avatar"
                                    src={user.avatar || noImage}
                                />
                                <p>Tài khoản của: </p>
                                <span>{user.email}</span>
                            </div>
                        </section>
                        <nav className={cx('user-sidelink')}>
                            <ul className={cx('nav-list')}>
                                <li className={cx('nav-item')}>
                                    <Link
                                        to="/profile"
                                        className={cx('item-link')}
                                    >
                                        <box-icon
                                            size="16px"
                                            type="solid"
                                            name="tachometer"
                                        ></box-icon>
                                        Thông tin chung
                                    </Link>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link
                                        to="/profile/detail"
                                        className={cx('item-link')}
                                    >
                                        <box-icon
                                            size="16px"
                                            name="info-circle"
                                            type="solid"
                                        ></box-icon>
                                        Thông tin tài khoản
                                    </Link>
                                </li>
                                <li className={cx('nav-item', 'active')}>
                                    <Link
                                        to="/profile/follow"
                                        className={cx('item-link')}
                                    >
                                        <box-icon
                                            size="16px"
                                            type="solid"
                                            name="book"
                                        ></box-icon>
                                        Truyện theo dõi
                                    </Link>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link
                                        to="/profile/change-password"
                                        className={cx('item-link')}
                                    >
                                        <box-icon
                                            size="16px"
                                            type="solid"
                                            name="lock-alt"
                                        ></box-icon>
                                        Đổi mật khẩu
                                    </Link>
                                </li>
                                <li className={cx('nav-item')}>
                                    <Link
                                        to="/"
                                        className={cx('item-link')}
                                        onClick={handleExit}
                                    >
                                        <box-icon
                                            size="16px"
                                            name="exit"
                                        ></box-icon>
                                        Thoát
                                    </Link>
                                </li>
                            </ul>
                        </nav>
                    </div>
                </div>
                <div className={cx('general')}>
                    <h1 className={cx('page-title')}>Truyện theo dõi</h1>
                    <FollowInfo user={user} title="Truyện theo dõi" />
                </div>
            </div>
        </div>
    );
}

export default FollowFullPage;
