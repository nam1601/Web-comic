import classNames from 'classnames/bind';

import styles from './TypeDescFrame.module.scss';

const cx = classNames.bind(styles);
function TypeDescFrame({ type, ...props }) {
    return (
        <div className={cx('type__frame')}>
            <h2>
                {type === 'all'
                    ? 'Tìm truyện tranh'
                    : `Truyện thuộc thể loại ${type}`}
            </h2>
            <p>
                {type === 'all'
                    ? 'Tất cả truyện tranh'
                    : `Truyện thuộc thể loại ${type}`}
            </p>
        </div>
    );
}

export default TypeDescFrame;
