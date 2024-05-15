import classNames from 'classnames/bind';
import styles from './Register.module.scss';
import { Link } from 'react-router-dom';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { registerUser, selectUser } from '~/features/user/userSlice';
const cx = classNames.bind(styles);

function Register() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const [error, setError] = useState(false);
    const [message, setMessage] = useState('');

    const user = useSelector(selectUser);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const onEmailChange = (e) => {
        let emailValue = e.target.value;
        setEmail(emailValue);
    };
    const onPasswordChange = (e) => {
        let passwordValue = e.target.value;
        setPassword(passwordValue);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        let data = await dispatch(registerUser({ email, password }));
        console.log(data);
        if (data.payload.errCode !== 0) {
            setError(true);
            setMessage(data.payload.message);
        } else {
            setError(false);
            navigate('/');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('path')}>
                <span>Trang chủ </span>{' '}
                <box-icon name="chevrons-right" color="#ccc" size="16px" />{' '}
                <span className={cx('title')}>Đăng ký</span>
            </div>
            <div className={cx('form')}>
                <h3>Đăng ký</h3>
                <form
                    className={cx('form__input')}
                    onSubmit={onSubmit}
                    method="post"
                >
                    <label htmlFor="email">Email</label>
                    <input
                        value={email}
                        id="email"
                        placeholder="Email"
                        className={cx('email')}
                        onChange={onEmailChange}
                    />

                    <label htmlFor="password">Mật khẩu</label>
                    <input
                        id="password"
                        value={password}
                        placeholder="Mật khẩu"
                        className={cx('password')}
                        onChange={onPasswordChange}
                    />
                    {error && <span>{message}</span>}
                    <Link to="/login" className={cx('register')}>
                        Đăng nhập
                    </Link>
                    <button type="submit" className={cx('submit')}>
                        Đăng ký
                    </button>
                </form>
                <button className={cx('register-by', 'face')}>
                    <box-icon
                        type="logo"
                        name="facebook"
                        color="#fff"
                        size="30px"
                    ></box-icon>
                    <span>Đăng nhập bằng Facebook</span>
                </button>
                <button className={cx('register-by', 'google')}>
                    <box-icon
                        name="google"
                        type="logo"
                        color="#fff"
                        size="30px"
                    ></box-icon>
                    <span>Đăng nhập bằng Google</span>
                </button>
            </div>
        </div>
    );
}

export default Register;
