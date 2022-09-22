import './ProductList.css';
import {
  ProductListDrawar,
  ProductListMain,
} from './components';
import { useData } from '../../contexts/data-context';
import { useEffect, useState } from 'react';
import { ProductlistFooter } from './components/ProductlistFooter/ProductlistFooter';
import { Footer } from '../../components';

export const ProductList = () => {
  const { setLoader } = useData();
  const [open, setOpen] = useState(false);
  useEffect(() => {
    setLoader(true);
    const id = setTimeout(() => {
      setLoader(false);
    }, 500);
    window.scrollTo(0, 0);
    return () => clearTimeout(id);
  }, []);

  return (
    <>
      <div className='productlist-content'>
        <ProductListDrawar open={open} setOpen={setOpen} />
        <ProductListMain />
        <ProductlistFooter setOpen={setOpen} />
      </div>
      <Footer />
    </>
  );
};
