import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { useState } from 'react';

import { selectUser, updateUser } from '~/features/user/userSlice';
import noImage from '../../asset/images/no-image.png';
import style from './DetailProfile.module.scss';
import { Padding } from '@mui/icons-material';
import FollowInfo from '~/component/FollowInfo/FollowInfo';

const cx = classNames.bind(style);
function DetailProfile() {
    const user = useSelector(selectUser);
    console.log('user from dp', user);
    const dispatch = useDispatch();

    const [avatar, setAvatar] = useState(user.avatar || noImage);
    const [firstName, setFirstName] = useState(user.firstName || '');
    const [lastName, setLastName] = useState(user.lastName || '');
    const [sex, setSex] = useState(user.gender || 'Nam');
    const [role, setRole] = useState(user.role || 'Bình thường');

    const handleFNC = (e) => {
        const input = e.target.value;
        setFirstName(input);
    };
    const handleLNC = (e) => {
        const input = e.target.value;
        setLastName(input);
    };
    const handleSex = (e) => {
        const input = e.target.value;
        setSex(input);
    };
    const handleRole = (e) => {
        const input = e.target.value;
        setRole(input);
    };
    const onImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setAvatar(URL.createObjectURL(event.target.files[0]));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const userId = user.id;
        const data = { firstName, lastName, sex, role, avatar };
        await dispatch(updateUser({ userId, data }));
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
                                <li className={cx('nav-item', 'active')}>
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
                                    <Link to="/" className={cx('item-link')}>
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
                    <h1 className={cx('page-title')}>Thông tin tài khoản</h1>
                    <div className={cx('info-block')}>
                        <h3>Cập nhập thông tin tài khoản</h3>
                    </div>
                    <div className={cx('info-detail')}>
                        <form
                            className={cx('form')}
                            method="PUT"
                            onSubmit={handleSubmit}
                        >
                            <div className={cx('text-info')}>
                                <div className={cx('group')}>
                                    <label htmlFor="email">Email</label>
                                    <input
                                        className={cx('input')}
                                        id="email"
                                        value={user.email}
                                        disabled={true}
                                    />
                                </div>
                                <div className={cx('group')}>
                                    <label htmlFor="firstName">Họ</label>
                                    <input
                                        className={cx('input')}
                                        id="firstName"
                                        value={firstName}
                                        placeholder="First name"
                                        onChange={handleFNC}
                                    />
                                </div>
                                <div className={cx('group')}>
                                    <label htmlFor="lastName">Tên</label>
                                    <input
                                        className={cx('input')}
                                        id="lastName"
                                        value={lastName}
                                        placeholder="Last name"
                                        onChange={handleLNC}
                                    />
                                </div>
                                <div className={cx('group')}>
                                    <label htmlFor="gender">Giới tính</label>
                                    <select
                                        className={cx('input')}
                                        id="gender"
                                        value={sex}
                                        onChange={handleSex}
                                    >
                                        <option>Nam</option>
                                        <option>Nữ</option>
                                    </select>
                                </div>
                                <div className={cx('group')}>
                                    <label htmlFor="role">Loại cấp bậc</label>
                                    <select
                                        className={cx('input')}
                                        id="role"
                                        value={role}
                                        onChange={handleRole}
                                    >
                                        <option>Bình thường</option>
                                        <option>Tu tiên</option>
                                        <option>Tinh không</option>
                                    </select>
                                </div>
                                <button
                                    type="submit"
                                    className={cx('btn')}
                                    onSubmit={handleSubmit}
                                >
                                    Cập nhật
                                </button>
                            </div>
                            <div className={cx('img-info')}>
                                <label htmlFor="avatar">Avatar</label>
                                <img alt="preview" src={avatar} />
                                <label className={cx('custom-file-upload')}>
                                    <input
                                        type="file"
                                        id="avatar"
                                        onChange={onImageChange}
                                        className="filetype"
                                        title="Upload ảnh"
                                    />
                                    Upload image
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DetailProfile;
