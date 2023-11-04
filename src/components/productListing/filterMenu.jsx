import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { Box, styled } from '@mui/material';
import ContentLoader from '../loader/ContentLoader';
import { getAllCategories } from '../../store/slices/category/extraReducers';

function groupById(arr) {
  return arr.map((obj) => {
    let group = [];
    obj.subCategories.forEach((subCat) => {
      if (subCat.parent_subcategory) {
        let checkAlreadyExist = group.find(
          (e) => e.id === subCat.parent_subcategory.id
        );
        if (checkAlreadyExist) checkAlreadyExist.subCategories.push(subCat);
        else
          group.push({ ...subCat.parent_subcategory, subCategories: [subCat] });
      }
    });

    return { ...obj, subCategories: group };
  });
}

var closeCollapsed = function (obj, type) {
  type;
  Object.keys(obj).forEach(function (key) {
    if (key === type.toLowerCase()) obj[key] = !obj[key];
    else obj[key] = false;
  });
  return obj;
};

function sortByDate(arr) {
  return arr.sort((a, b) => {
    return new Date(b.createdAt) - new Date(a.createdAt);
  });
}

export default function FilterSideMenu({ prodLoading }) {
  const { categories, loading } = useSelector((st) => st.category);

  const [open, setOpen] = React.useState({
    men: false,
    women: false,
  });

  const [subCatOpen, setSubCatOpen] = React.useState({});

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category');
  const subcategory = queryParams.get('sub_category');

  const handleClick = (e) => {
    const { type } = e.currentTarget.dataset;
    setOpen((st) => ({ ...closeCollapsed(st, type) }));
  };

  const handleSubClick = (e) => {
    const { type } = e.currentTarget.dataset;
    setSubCatOpen((st) =>
      st ? { ...st, [type]: !subCatOpen[type] } : { [type]: !subCatOpen[type] }
    );
  };

  React.useEffect(() => {
    if (!categories) dispatch(getAllCategories());
    else {
      let obj = {};
      for (const item in categories)
        obj[categories[item].label.toLowerCase()] = false;
      setOpen(obj);
    }
  }, [categories]);

  if (loading) return <ContentLoader />;

  let selectedCat = category
    ? categories.filter((el) => el.id === +category)
    : categories;

  let selecCat = categories ? groupById(categories) : [];

  return (
    <>
      <List component='nav'>
        {selecCat
          ?.sort((a, b) => a.label.localeCompare(b.label))
          ?.map((el, ind) => (
            <Box key={el.id}>
              <ListItemButton
                data-type={el.label.toLowerCase()}
                onClick={handleClick}
                disableRipple
                sx={{ pl: 0 }}
              >
                <ListItemTextCat primary={el.label} disableTypography />
                <div style={{ fontSize: '1.7rem' }}>
                  {open[el.label.toLowerCase()] ? '-' : '+'}
                </div>
              </ListItemButton>
              <Collapse
                key={el.id}
                in={open[el.label.toLowerCase()]}
                timeout='auto'
                unmountOnExit
                sx={{ ...(ind < selectedCat.length - 1 && { mb: 4 }) }}
              >
                <List component='div' disablePadding>
                  {el.subCategories &&
                    [...el.subCategories]
                      ?.sort((a, b) => a.label.localeCompare(b.label))
                      .map((sub, indx) => (
                        <>
                          <Box key={sub.id} pl={3}>
                            <ListItemButton
                              data-type={sub.label}
                              onClick={handleSubClick}
                              disableRipple
                              sx={{ pl: 0 }}
                            >
                              <ListItemTextCat
                                primary={sub.label}
                                disableTypography
                              />
                              <div style={{ fontSize: '1.7rem' }}>
                                {subCatOpen[sub.label] ? '-' : '+'}
                              </div>
                            </ListItemButton>
                            <Collapse
                              key={sub.id}
                              in={subCatOpen[sub.label]}
                              timeout='auto'
                              unmountOnExit
                              sx={{
                                ...(indx < selectedCat.length - 1 && { mb: 4 }),
                              }}
                            >
                              <List component='div' disablePadding>
                                {sub.subCategories &&
                                  [...sub.subCategories]
                                    ?.sort((a, b) =>
                                      a.label.localeCompare(b.label)
                                    )
                                    .map((nesSub) => (
                                      <ListItemTextSub
                                        style={{ cursor: 'pointer' }}
                                        disabled={prodLoading}
                                        onClick={() => {
                                          if (!prodLoading)
                                            navigate(
                                              `/products/?category=${el.id}&sub_category=${nesSub.id}`
                                            );
                                        }}
                                        sx={{
                                          pl: 4,
                                          fontSize: '22px !important',
                                        }}
                                        key={`${el.id}-${nesSub.id}`}
                                        primary={nesSub.label}
                                        disableTypography
                                        subItem={nesSub.id === +subcategory}
                                      />
                                    ))}
                              </List>
                            </Collapse>
                          </Box>
                        </>
                      ))}
                </List>
              </Collapse>
            </Box>
          ))}
      </List>
    </>
  );
}

const ListItemTextCat = styled(ListItemText)(({ theme }) => ({
  color: theme.palette.error.dark,
  fontSize: `${theme.typography.h3.fontSize} !important`,
  fontWeight: 600,
}));

const ListItemTextSub = styled(ListItemText, {
  shouldForwardProp: (props) => props !== 'subItem',
})(({ subItem, theme }) => ({
  color: subItem ? theme.palette.error.dark : theme.palette.text.primary,
  fontSize: `${theme.typography.h3.fontSize} !important`,
  fontWeight: 400,
}));
