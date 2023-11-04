import { Box, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { getProdBySelFilters } from '../../api/products';
import SaleItemTable from '../../tables/mySaleItems';
import ProductCard from '../cards/ProductCard';
import { CardWrapper } from '../common/CardWrapper';
import CustomTypo from '../common/CustomTypo';
import TableSearch from '../common/TableSearch';
import ProductList from '../productListing/productList';
import ProductCardNonEdit from './ProductCard';

const SaleItems = () => {
  const [search, setSearch] = useState('');
  const [saleType, setSaleType] = useState(null);
  const [saleItems, setSaleItems] = useState(null);

  const handleChange = (e) => {
    setSearch(e.target.value);
  };

  return (
    <React.Fragment>
      <CustomTypo fontFamily='KoHo' variant='h4'>
        Items for Sale
      </CustomTypo>
      <SaleItemTable type={saleType} products={saleItems} />
    </React.Fragment>
  );
};

export default SaleItems;
