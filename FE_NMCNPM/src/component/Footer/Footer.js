import classNames from 'classnames/bind';

import style from './Footer.module.scss';
import logo from '../../asset/images/logo-nettruyen.png';
import { Link } from 'react-router-dom';
const cx = classNames.bind(style);
const keyWords = [
    'Truyện tranh',
    'Truyện tranh online',
    'Đọc truyện tranh',
    'Truyện tranh hot',
    'Truyện tranh hay',
    'Truyện ngôn tình',
    'Manhwa',
    'Manga',
    'Manhua',
    'truyenqq',
    'mi2manga',
    'doctruyen3q',
    'toptruyen',
    'cmanga',
    'vlogtruyen',
    'blogtruyen',
    'truyentranhaudio',
    'vcomi',
];
function Footer() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('organization')}>
                    <Link to="/" className={cx('logo')}>
                        <img alt="footer__logo" src={logo} />
                    </Link>
                    <div className={cx('contact')}>
                        <span>Liên hệ bản quyền</span>
                        <span>Chính sách bảo mật</span>
                    </div>
                    <p>Copyright © 2022 NetTruyen</p>
                </div>
                <div className={cx('link-footer')}>
                    <h3>Từ khóa</h3>
                    <ul className={cx('keyword')}>
                        {keyWords.map((keyWord, index) => (
                            <li key={index} className={cx('btn')}>
                                {keyWord}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
