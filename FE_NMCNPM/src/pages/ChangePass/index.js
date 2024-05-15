import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { selectUser, logOut, changePass } from '~/features/user/userSlice';
import noImage from '../../asset/images/no-image.png';
import style from './ChangePass.module.scss';

import { useState } from 'react';
const cx = classNames.bind(style);
function ChangePass() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const [oldPass, setOldPass] = useState('');
    const [newPass, setNewPass] = useState('');

    const handleOP = (e) => {
        const input = e.target.value;
        setOldPass(input);
    };
    const handleNP = (e) => {
        const input = e.target.value;
        setNewPass(input);
    };
    const handleExit = async () => {
        await dispatch(logOut());
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = user.id;
        console.log(userId);
        console.log(oldPass);
        console.log(newPass);
        await dispatch(changePass({ userId, oldPass, newPass }));
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('chap__path')}>
                <span>Trang chủ </span>{' '}
                <box-icon name="chevrons-right" color="#ccc" size="16px" />{' '}
                <span className={cx('path__name')}>Đổi mật khẩu</span>
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
                                <li className={cx('nav-item')}>
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
                                <li className={cx('nav-item', 'active')}>
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
                    <h1 className={cx('page-title')}>Đổi mật khẩu</h1>
                    <form
                        className={cx('form')}
                        method="PUT"
                        onSubmit={handleSubmit}
                    >
                        <div className={cx('group')}>
                            <label htmlFor="oldPass">Mật khẩu hiện tại</label>
                            <input
                                type="password"
                                className={cx('input')}
                                id="oldPass"
                                value={oldPass}
                                onChange={handleOP}
                                placeholder="Nhập mật khẩu hiện tại"
                            />
                        </div>
                        <div className={cx('group')}>
                            <label htmlFor="newPass">Mật khẩu mới</label>
                            <input
                                type="password"
                                className={cx('input')}
                                id="newPass"
                                value={newPass}
                                onChange={handleNP}
                                placeholder="Nhập mật khẩu mới"
                            />
                        </div>
                        <button
                            type="submit"
                            className={cx('btn')}
                            onSubmit={handleSubmit}
                        >
                            Cập nhật
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default ChangePass;
