import classNames from 'classnames/bind';

import style from './Comment.module.scss';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { commentAComic, getListComment } from '~/service/BEService';
import noImage from '~/asset/images/no-image.png';
import { useSelector } from 'react-redux';
import { selectUser } from '~/features/user/userSlice';
const cx = classNames.bind(style);
function Comment({ comic }) {
    const location = useLocation();
    const gradient = location.pathname.split('/');
    const [list, setList] = useState([]);
    const [comment, setComment] = useState('');
    const user = useSelector(selectUser);

    useEffect(() => {
        const fetchListComment = async () => {
            const listData = await getListComment(gradient[2]);
            setList(listData.data.reverse());
        };
        fetchListComment();
    }, [location.pathname]);

    const onChange = (e) => {
        let data = e.target.value;
        setComment(data);
    };
    const onSubmit = async (e) => {
        e.preventDefault();
        if (user.id) {
            let res = await commentAComic(
                user.id,
                gradient[2],
                comic.cover,
                comic.title,
                comment,
            );
            let newData = res.data;
            newData.User = user;
            setList((prev) => [newData, ...prev]);
            setComment('');
        } else {
            alert('Vui lòng đăng nhập để bình luận!');
        }
    };
    return (
        <div className={cx('wrapper')}>
            <ul className={cx('nav')}>
                <li className={cx('active')}>
                    <a data-toggle="tab" href="#nt_comments">
                        <box-icon
                            type="solid"
                            name="chat"
                            color="#FF9601"
                        ></box-icon>
                        NetTruyen (
                        <span className={cx('comment-count')}>
                            {list.length}
                        </span>
                        )
                    </a>
                </li>
                <li>
                    <a data-toggle="tab" href="#fb_comments">
                        Facebook (
                        <span className={cx('fb-comments-count ')}>
                            <span className={cx('fb_comments_count')}>0</span>
                        </span>
                        )
                    </a>
                </li>
            </ul>
            <div className={cx('comment-wrapper')}>
                <form className={cx('form-content')} onSubmit={onSubmit}>
                    <textarea
                        value={comment}
                        onChange={onChange}
                        placeholder="Mời bạn thảo luận, vui lòng không spam, share link kiếm tiền,... để tránh bị khóa tài khoản"
                    />
                    <button onSubmit={onSubmit}>Bình luận</button>
                </form>
                <div className={cx('comment-list')}>
                    {list.map((item, index) => (
                        <div className={cx('comment-item')} key={index}>
                            <div className={cx('user-avatar')}>
                                <img
                                    src={
                                        item.User.avatar
                                            ? item.User.avatar
                                            : noImage
                                    }
                                    alt="avatar"
                                />
                            </div>
                            <div className={cx('comment-content')}>
                                <div className={cx('user-info')}>
                                    <span className={cx('email')}>
                                        {item.User.email}
                                    </span>
                                    {item.User.role && (
                                        <span className={cx('role')}>
                                            {item.User.role}
                                        </span>
                                    )}
                                </div>
                                <div className={cx('content')}>
                                    {item.content}
                                </div>
                                <span className={cx('left-icon')}>
                                    <box-icon
                                        name="chevron-left"
                                        size="24px"
                                        color="#fff"
                                    ></box-icon>
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
export default Comment;
