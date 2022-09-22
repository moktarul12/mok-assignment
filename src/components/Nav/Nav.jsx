import './Nav.css';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/auth-context';
import { useData } from '../../contexts/data-context';
import { ActionType, Filters } from '../../DataReducer/constants';
import { useEffect, useState, useRef } from 'react';

import { searchFilter } from '../../utils/utils';
import { useOutsideClickHandler } from '../../Hooks/outsideClickHandler';
import { ThemeContext } from '../../GlobalComponents/ThemeProvider';

export const Nav = () => {
  //const { theme, setThemeMode } = useContext(ThemeContext); 
  //const [darkMode, setDarkMode] = useState(theme);

  const { token } = useAuth();
  const location = useLocation();
  const { state, dispatch } = useData();
  const [input, setInput] = useState('');
  const [searchData, setSearchData] = useState([]);
  const timerId = useRef();
  const navigate = useNavigate();
  const [showSearchOutputModal, setShowOutputModal] = useState(false);

  
  useEffect(() => {
    if (location.pathname !== '/products') {
      setInput('');
      dispatch({
        type: ActionType.ChangeFilter,
        payload: {
          filterType: Filters.Search,
          filterValue: '',
        },
      });
    }
  }, [location.pathname]);

  useEffect(() => {
    if (input !== '') {
      clearTimeout(timerId.current);
      timerId.current = setTimeout(() => {
        setSearchData(searchFilter(state.products, input));
      }, 500);
    } else {
      setSearchData([]);
      setShowOutputModal(false);
      dispatch({
        type: ActionType.ChangeFilter,
        payload: {
          filterType: Filters.Search,
          filterValue: '',
        },
      });
    }
  }, [input]);

  if (location.pathname === '/404') {
    return null;
  }
  return (
    <nav className='navigation home-nav'>
      <div className='nav-mobile-up'>
        <div className='nav-left productlist-nav-left'>
          <div className='nav-logo-container'>
            <div onClick={() => navigate('/')} className='nav-logo-link'>
             <span class="label link-label"><svg class="styles__StyledSVG-sc-1houmlx-0 hjRODf icon icon-lowes-logo-filled" viewBox="0 0 24 24" color="brand" aria-hidden="true" role="presentation" alt="Lowe's Home Improvement Logo" name="lowes-fill"><path fill-rule="evenodd" d="M5.803 9.051l6.1983-2.6506 6.1981 2.6506h3.8649v1.0814H24v7.268H0v-7.268h1.9367V9.051H5.803zm11.9214 3.108l.0002-1.175.0001.0001.9198.0003-.1587 1.176-.7614-.0014zm4.2842-.4663c-.274 0-.5055.2129-.5055.5019 0 .291.2315.505.5055.505.2711 0 .503-.214.503-.505 0-.289-.2319-.5019-.503-.5019zm0 .9227c.225 0 .4023-.1779.4023-.4208 0-.2383-.1773-.4177-.4023-.4177-.2279 0-.4053.1794-.4053.4177 0 .2429.1774.4208.4053.4208zm-.1919-.1298h.0867v-.2514h.1002l.1513.2514h.0972l-.1628-.255c.0842-.0106.1478-.0558.1478-.1597 0-.1146-.0672-.1653-.2019-.1653h-.2185v.58zm.3302-.4213c0 .0903-.0661.0958-.1393.0958h-.1042v-.1799h.1183c.0601 0 .1252.0132.1252.0841zM3.8284 10.9839v4.0042h1.6973v.9535H2.7315v-4.9577h1.0969zm11.0427 4.9578h2.6111v-.9548h-1.5087v-.6222h1.5087v-.9192h-1.5087v-.6256h1.5087v-.9589h-2.6111V15.9417zm-5.7393-.5211a.5217.5217 0 01-.522.5212h-2.119a.5217.5217 0 01-.5217-.5212v-3.0383a.5215.5215 0 01.5217-.5212h2.119c.2884 0 .522.2333.522.5212v3.0383zM8.0328 12.82h-.9647v2.163h.9648V12.82zm5.1121-.9588v3.1269h-.6623v-3.1269h-.9648v3.1269h-.6623v-3.1269h-1.099v3.5592c0 .2879.2337.5215.5222.5215h1.2989c.2189 0 .4226-.151.4226-.3695 0 .2185.2037.3695.4226.3695h1.2993a.5217.5217 0 00.5217-.5215v-3.5592h-1.0989zM21.3344 14.4l-.0003-.0003h-.0002c.0804.1698.1184.341.113.5081-.0195.6045-.4622.9599-.4669.9632-.193.1564-.4915.236-.8869.236h-.0002c-.7245 0-1.5407-.2699-1.5484-.2725l-.0138-.0047v-.9767l.0269.0101c.0084.0034.8515.3168 1.2673.3745l.0105.0014a.6404.6404 0 00.0887.0057c.2162 0 .3873-.1004.4259-.2497.0374-.144-.0527-.3061-.2296-.4121l-.0016-.0011c-.1563-.0927-.3234-.1685-.4847-.241l-.0008-.0003c-.3914-.1768-.7958-.3594-1.0481-.7964-.1963-.387-.1708-.9055.0602-1.2331.275-.3987.6972-.6007 1.2546-.6007.0662 0 .1351.0027.2047.0087.6054.0866 1.2048.4638 1.2109.4679l.0091.0057v.8907l-.0276-.0114a66.949 66.949 0 00-.5977-.2501c-.1506-.062-.4411-.1664-.6966-.1664-.1597 0-.2807.0413-.3597.1215-.0749.0641-.1022.1695-.0907.2366.0418.2388.4169.3859.5423.4351l.0012.0005.0222.0084c.6267.2503 1.0159.541 1.1897.889l.0068.0134.0131.0259.0067.0141z" clip-rule="evenodd"></path></svg></span>
            </div>
          </div>
        </div>
        <div className='nav-mid nav-desktop'>
          <div className='nav-search'>
            <input
              placeholder='search'
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
                setShowOutputModal(true);
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  dispatch({
                    type: ActionType.ChangeFilter,
                    payload: {
                      filterType: Filters.Search,
                      filterValue: e.target.value,
                    },
                  });
                  setSearchData([]);
                  setShowOutputModal(false);
                  navigate('/products');
                }
              }}
              className='nav-search-input brd-rd-semi-sq nav-text-input'
              type='search'
            />
            {showSearchOutputModal ? (
              <div className='nav-search-output-container brd-rd-semi-sq'>
                {searchData.length === 0 ? (
                  <p className='text-align-center'>No item to show</p>
                ) : (
                  searchData.map((el) => {
                    return (
                      <div
                        onClick={() => navigate(`product/${el._id}`)}
                        className='nav-search-output-item brd-rd-semi-sq'
                      >
                        <img
                          className='nav-search-output-item-image brd-rd-semi-sq'
                          src={el.image}
                          alt='nav search img'
                        />
                        <div className='nav-search-output-item-details'>
                          <div className='nav-search-output-item-upper'>
                            <p className='text-lg font-wt-semibold'>
                              {el.title}
                            </p>
                            <div className='nav-search-output-price-details'>
                              <p className='font-wt-semibold'>₹ {el.price}</p>
                            </div>
                          </div>
                          <div className='nav-search-output-item-desc'>
                            <p className='text-md'>{el.description}</p>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            ) : null}
          </div>
        </div>
        <div className='nav-right'>
          <ul className='nav-links'>
            <li className='nav-link-item nav-explore-link'>
              <Link to='/products'>All Product</Link>
            </li>
           
            <li className='nav-link-item'>
              <div
                className='badge-container'
                onClick={() => navigate('/wishlist')}
                title={'wishlist'}
              >
                <div className='badge-icon nav-badge-icon'>
                  <span className='material-icons-outlined'>
                    favorite_border
                  </span>
                </div>
                {token && state.wishlist.length > 0 && (
                  <div className='badge-number background-online'>
                    {state.products.reduce(
                      (acc, curr) => (curr.wished ? acc + 1 : acc),
                      0
                    )}
                  </div>
                )}
              </div>
            </li>
            <li className='nav-link-item'>
              <div
                className='badge-container'
                onClick={() => navigate('/cartlist')}
                title='cartlist'
              >
                <div className='badge-icon nav-badge-icon'>
                  <span className='material-icons-outlined'>shopping_cart</span>
                </div>
                {token && state.cartlist.length > 0 && (
                  <div className='badge-number background-online'>
                    {state.products.reduce(
                      (acc, curr) => (curr.carted ? acc + 1 : acc),
                      0
                    )}
                  </div>
                )}
              </div>
            </li>
          </ul>
        </div>
      </div>
      <div className='nav-mobile-down nav-mobile'>
        <div className='nav-search'>
          <input
            placeholder='search'
            className='brd-rd-semi-sq nav-text-input nav-search-input'
            type='search'
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              setShowOutputModal(true);
            }}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                dispatch({
                  type: ActionType.ChangeFilter,
                  payload: {
                    filterType: Filters.Search,
                    filterValue: e.target.value,
                  },
                });
                setSearchData([]);
                setShowOutputModal(false);
                navigate('/products');
              }
            }}
          />
          {showSearchOutputModal ? (
            <div className='nav-search-output-container brd-rd-semi-sq'>
              {searchData.length === 0 ? (
                <p className='text-align-center'>No item to show</p>
              ) : (
                searchData.map((el) => {
                  return (
                    <div
                      onClick={() => navigate(`product/${el._id}`)}
                      className='nav-search-output-item brd-rd-semi-sq'
                    >
                      <img
                        className='nav-output-smaller-img brd-rd-semi-sq'
                        src={el.image}
                        alt='nav search img'
                      />
                      <div className='nav-search-output-item-details'>
                        <div className='nav-search-output-item-upper nav-search-output-item-upper-smaller'>
                          <p className='text-lg font-wt-semibold'>{el.title}</p>

                          <p className='font-wt-md'>₹ {el.price}</p>
                        </div>
                        <div className='nav-search-output-item-desc'></div>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          ) : null}
        </div>
      </div>
    </nav>
  );
};
