import className from 'classnames/bind';
import 'boxicons';

import styles from './Search.module.scss';

import HeadlessTippy from '@tippyjs/react/headless';
import 'tippy.js/dist/tippy.css'; // optional
import 'tippy.js/dist/tippy.css';

import Wrapper from '~/component/Popper';
import { useRef, useState, useEffect } from 'react';
import useDebounce from '~/Hooks/useDebounce';
import { searchComic } from '~/service/getFromApi';
import SearchItem from '../SearchItem/SearchItem';

const cx = className.bind(styles);

function Search() {
    const [searchValue, setSearchValue] = useState('');
    const [searchResult, setSearchResult] = useState([]);
    const [showResult, setShowResult] = useState(false);
    const [loading, setLoading] = useState(false);
    const debounceValue = useDebounce(searchValue, 800);
    const inputRef = useRef();

    useEffect(() => {
        if (!debounceValue.trim()) {
            setSearchResult([]);
            return;
        }
        const fetchApi = async () => {
            setLoading(true);
            const result = await searchComic(debounceValue);
            setSearchResult(result.mangas);
            setLoading(false);
        };
        fetchApi();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [debounceValue]);

    const handleClear = () => {
        setSearchResult([]);
        setSearchValue('');

        inputRef.current.focus();
    };

    const handleHideResult = () => {
        setShowResult(false);
    };
    const handleChange = (e) => {
        const searchValue = e.target.value;
        if (!searchValue.startsWith(' ') || searchValue.trim()) {
            setSearchValue(searchValue);
        }
    };
    return (
        <HeadlessTippy
            interactive
            visible={searchResult && searchResult.length > 0}
            offset={[-5, 8]}
            render={(attrs) => (
                <div className={cx('search-result')} tabIndex="-1" {...attrs}>
                    <Wrapper>
                        {' '}
                        <h4 className={cx('search-title')}>Truyện tranh</h4>
                        {searchResult.map((item, index) => (
                            <SearchItem item={item} key={index} />
                        ))}
                    </Wrapper>
                </div>
            )}
            onClickOutside={handleHideResult}
        >
            <div className={cx('search')}>
                <input
                    ref={inputRef}
                    value={searchValue}
                    placeholder="Tìm truyện..."
                    className={cx('search__input')}
                    spellCheck={false}
                    onChange={handleChange}
                    onFocus={() => setShowResult(true)}
                />
                {searchValue && !loading && (
                    <button className={cx('clear')} onClick={handleClear}>
                        <box-icon name="x"></box-icon>
                    </button>
                )}
                {loading && (
                    <div>
                        <span className={cx('loading')}>
                            <box-icon name="loader-circle"></box-icon>
                        </span>
                    </div>
                )}
                <button
                    className={cx('search__button')}
                    onMouseDown={(e) => e.preventDefault()}
                >
                    <box-icon
                        name="search"
                        className={cx('search__icon')}
                        size="18px"
                    ></box-icon>
                </button>
            </div>
        </HeadlessTippy>
    );
}

export default Search;
