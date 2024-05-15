import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import style from './AllComment.module.scss';
import {
    selectAllComment,
    fetchCommentList,
} from '~/features/comment/commentSlice';
import { useEffect } from 'react';

const cx = classNames.bind(style);
function AllComment({ user, title }) {
    const list = useSelector(selectAllComment) || [];
    const dispatch = useDispatch();
    useEffect(() => {
        const data = async () => {
            let newData = await dispatch(fetchCommentList(user.id));
            return newData;
        };
        data();
    }, []);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('relative')}>
                <h2 className={cx('post-title')}>{title}</h2>
                <Link className={cx('link')} to="/">
                    Xem tất cả
                </Link>
            </div>
            <section className={cx('comics-followed')}>
                <div className={cx('table-responsive')}>
                    <table className={cx('table')}>
                        <thead>
                            <tr>
                                <th></th>
                                <th className={cx('nowrap')}>Tên truyện</th>
                                <th className={cx('nowrap')}>Thời gian</th>
                                <th className={cx('nowrap')}>Nội dung</th>
                            </tr>
                        </thead>
                        <tbody>
                            {list.map((item, index) => (
                                <tr className={cx('unread')} key={index}>
                                    <td>
                                        <img
                                            src={item.cover}
                                            alt="poster"
                                            className={cx('poster')}
                                        />
                                    </td>
                                    <td>
                                        <Link
                                            to={`/manga/${item.mangaEp}`}
                                            className={cx('comic-name')}
                                        >
                                            {item.title}
                                        </Link>
                                        <div className={cx('follow-action')}>
                                            <button className={cx('read')}>
                                                <box-icon
                                                    name="check"
                                                    color="#23A903"
                                                    size="17px"
                                                ></box-icon>
                                                Đã đọc
                                            </button>
                                            <button className={cx('unsub')}>
                                                <box-icon
                                                    name="x"
                                                    color="#D9534F"
                                                    size="17px"
                                                ></box-icon>
                                                Bỏ theo dõi
                                            </button>
                                        </div>
                                    </td>
                                    <td className={cx('nowrap', 'chapter')}>
                                        <time className={cx('time')}>
                                            {item.createdAt}
                                        </time>
                                    </td>
                                    <td className={cx('nowrap', 'chapter')}>
                                        <span className={cx('last-chap')}>
                                            {item.content}
                                        </span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </section>
        </div>
    );
}

export default AllComment;
