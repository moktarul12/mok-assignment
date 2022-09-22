import './Home.css';
import { useNavigate } from 'react-router-dom';

import { categoryFilter } from '../../utils/utils';
import { useData } from '../../contexts/data-context';
import { ActionType, Filters } from '../../DataReducer/constants';
import { useEffect, useState } from 'react';

import { Footer } from '../../components';
import menimg  from "../../images/men.webp"
import womenimg  from "../../images/women.webp"
import kids  from "../../images/kids.webp"
import Countdown from 'react-countdown';
import { ProductCard } from '../ProductList/components/ProductCard/ProductCard';
import '../ProductList/components/ProductListMain/ProductListMain.css';

export const Home = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useData();

 console.log(state);
  const [flashSaleData, setFlashSaleData] = useState([]);


  useEffect(() => {
    dispatch({ type: ActionType.ClearFilter });
  }, []);


  useEffect(() => {
    
    dispatch({
      type: ActionType.FLASH_SALE,
      payload: {
        filterType: Filters.FLASH_SALE,
        filterValue: '',
      }})

  }, []);


  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state


      dispatch({
        type: ActionType.ClearFlashSale,
        payload: {
        }})
      return <>Flash sales is over now !!!!!!</>;
    } else {
      // Render a countdown
      return <span>{hours}:{minutes}:{seconds}</span>;
    }
  };



  const categoryFilter = (cat) => {
    dispatch({
      type: ActionType.ChangeFilter,
      payload: {
        filterType: Filters.Categories,
        filterValue: {
          ...Object.keys(state.filters.categories).reduce((acc, curr) => {
            return { ...acc, [curr]: false };
          }, {}),
          [cat]: true,
        },
      },
    });
    navigate('/products');
  };
  return (
    <>
      <div className='home-container'>
        <div className='home-hero-img-container'>
          <img
            onClick={() => navigate('/products')}
            className='img-responsive home-hero-img'
            src='https://pbs.twimg.com/profile_banners/767733424106995713/1588601987/1500x500'
            alt='home-image'
          />
        </div>

        <div className='home-subheading-image'>
          <img
            src='https://res.cloudinary.com/donqbxlnc/image/upload/v1648895557/fashify/0b21bba9-e1e2-4dd9-ac99-4a759abe68801648705771876-Shop-By-Category_w2adx7.webp'
            alt=''
          />
        </div>
        <div className='home-cards'>
          <div
            onClick={() => categoryFilter('Men')}
            className='card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq'
          >
            <div className='card-img-container-hz home-card-img-container'>
              <img
                className='card-img index-card-img brd-rd-semi-sq'
                src={menimg}
                alt='card image'
              />
            </div>
            <div className='card-content'>
              <div className='card-text'>
                <div></div>
              </div>
              <div className='card-footer-elements'>
                <div className='card-footer-elements'>
                  <div className='home-card-footer-title'>
                    <h3>Men Collection</h3>
                  </div>
                  <p>Check out our best men collection</p>
                </div>
              </div>
            </div>
          </div>
          <div
            onClick={() => categoryFilter('Women')}
            className='card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq'
          >
            <div className='card-img-container-hz home-card-img-container'>
              <img
                className='card-img index-card-img brd-rd-semi-sq'
                src={womenimg}
                alt='card image'
              />
            </div>
            <div className='card-content'>
              <div className='card-text'>
                <div></div>
              </div>
              <div className='card-footer-elements'>
                <div className='home-card-footer-title'>
                  <h3>Women Collection</h3>
                </div>
                <p>Check out our best women collection</p>
              </div>
            </div>
          </div>
          <div
            onClick={() => categoryFilter('Kids')}
            className='card-container card-container-hz home-card-container card-container-shadow brd-rd-semi-sq'
          >
            <div className='card-img-container-hz home-card-img-container'>
              <img
                className='card-img index-card-img brd-rd-semi-sq'
                src={kids}
                alt='card image'
              />
            </div>

            <div className='card-content'>
              <div className='card-text'>
                <div></div>
              </div>
              <div className='card-footer-elements'>
                <div className='card-footer-elements'>
                  <div className='home-card-footer-title'>
                    <h3>Kids Collection</h3>
                  </div>
                  <p>Check out our best kids collection</p>
                </div>
              </div>
            </div>
          </div>
        </div>



    <main className='wishlist-main-container'>
    <div className='flashsale'>
      <div class="fleft"><h3>Flash Sale count down!!!  </h3></div>
      <div class="fleft"> 
       <Countdown date={Date.now() + 180000} 
       renderer={renderer}
       >
        <span>Flash sales is over now !!!!!!</span>
    </Countdown>
    </div><div className='cboth'></div>
    </div>
      <div className='wishlist-main-heading text-align-center'>
        {state.flashsale.length === 0 && (
          <h4>There is no flash sale now !!!!</h4>
        )}
      </div>
      <div className='productlist-main-card-container'>
        {state.flashsale.length > 0 &&
          state.flashsale.map((el) => {
            return el.in_stock ? <ProductCard product={el} key={el._id} />: <></>;
          })}
      </div>
    </main>

      </div>
      <Footer />
    </>
  );
};
