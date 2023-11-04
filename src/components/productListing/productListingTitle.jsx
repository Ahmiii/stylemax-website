import { Skeleton } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';

const ProductListingTitle = () => {
  const { categories, loading } = useSelector((st) => st.category);
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const subcategory = queryParams.get('sub_category');

  const generateTitle = () => {
    if (category || subcategory) {
      let title = '';

      let selectedCat = categories?.filter((el) => el.id === +category)[0];
      let subCat = selectedCat?.subCategories?.filter(
        (ele) => ele.id === +subcategory
      )[0];

      title = `${subCat?.label} for ${selectedCat?.label}`;
      return subCat?.label && selectedCat?.label ? title : '';
    }
  };

  return <>{!loading && generateTitle()}</>;
};

export default ProductListingTitle;
