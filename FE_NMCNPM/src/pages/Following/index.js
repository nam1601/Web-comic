import classNames from 'classnames/bind';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';

import { selectUser } from '~/features/user/userSlice';
import {
    fetchComicFollow,
    selectFollowList,
} from '~/features/follow/followSlice';

import style from './Following.module.scss';
import Frame from '~/component/Frame/Frame';
import RankList from '~/component/RankList/RankList';
import CardItem from '~/component/CardItem/CardItem';

const cx = classNames.bind(style);
function Following() {
    const user = useSelector(selectUser);
    const dispatch = useDispatch();
    const followList = useSelector(selectFollowList);
    console.log('follow: ', followList);
    useEffect(() => {
        dispatch(fetchComicFollow(user.id));
    }, [dispatch]);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('path')}>
                <span>Trang chủ </span>{' '}
                <box-icon name="chevrons-right" color="#ccc" size="16px" /> Theo
                dõi
            </div>
            <div className={cx('content')}>
                <div className={cx('following')}>
                    <h3>
                        Truyện theo dõi <span>{'>'}</span>
                    </h3>
                    <div className={cx('list')}>
                        {followList.map((item, index) => (
                            <CardItem item={item} key={index} />
                        ))}
                    </div>
                </div>
                <div className={cx('frame')}>
                    <Frame type="Lịch sử đọc" link="/read" />
                    <RankList />
                </div>
            </div>
        </div>
    );
}

export default Following;
