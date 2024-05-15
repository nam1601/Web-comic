import classNames from 'classnames/bind';

import style from './Read.module.scss';

import { useLocation } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';

import { selectUser } from '~/features/user/userSlice';
import {
    fetchComicFollow,
    selectFollowList,
} from '~/features/follow/followSlice';

import Frame from '~/component/Frame/Frame';
import RankList from '~/component/RankList/RankList';
import CardItem from '~/component/CardItem/CardItem';
import { getRead } from '~/service/BEService';
const cx = classNames.bind(style);
function Read() {
    const user = useSelector(selectUser);
    const [read, setRead] = useState([]);
    useEffect(() => {
        const getAllRead = async () => {
            let userId = user.id;
            const res = await getRead(userId);
            console.log(res);
            setRead(res.data.data);
        };
        getAllRead();
    }, []);
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
                        {read.map((item, index) => (
                            <CardItem type="read" item={item} key={index} />
                        ))}
                    </div>
                </div>
                <div className={cx('frame')}>
                    <Frame type="Truyện theo dõi" link="/read" />
                    <RankList />
                </div>
            </div>
        </div>
    );
}

export default Read;
