import { Box, Button, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import React from 'react';
import {
  getIncludedParams,
  isUrlContainsParams,
} from '../../utils/filterMethods';

const params = ['category', 'sub_category'];

const RemoveFilter = ({ brands }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const filteredQueryParams = Object.fromEntries(searchParams.entries());
  delete filteredQueryParams.sub_category;
  delete filteredQueryParams.category;

  const navigate = useNavigate();

  const removeQueryParam = (param, value, remParamComp = false) => {
    const updatedQueryParams = Object.fromEntries(searchParams.entries());
    // delete updatedQueryParams['sub_category'];
    // delete updatedQueryParams
    if (remParamComp) {
      delete updatedQueryParams[param];
      return setSearchParams(updatedQueryParams);
    }

    const paramValues = updatedQueryParams[param].split(',');
    const index = paramValues.indexOf(value);
    if (index !== -1) {
      paramValues.splice(index, 1);
      updatedQueryParams[param] = paramValues.join(',');
      // delete the parameter if all sub-items are removed
      if (updatedQueryParams[param].length === 0)
        delete updatedQueryParams[param];
      // update the query parameters
      setSearchParams(updatedQueryParams);
    }
  };

  const handleClearAll = () => {
    let params = getIncludedParams(location, ['category', 'sub_category']);
    navigate(`?${params}`);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        marginLeft: '2.1%',
        flexWrap: 'wrap',
        marginBottom: '2rem',
      }}
    >
      {Object.keys(filteredQueryParams)
        .filter((el) => !params.includes(el))
        .map((param) =>
          param !== 'price' ? (
            <React.Fragment key={param}>
              {filteredQueryParams[param].split(',').map((value) => (
                <Button
                  key={`${param}-${value}`}
                  sx={{
                    py: 0.5,
                    px: 2,
                    //   marginBottom: '2%',
                    border: '1px solid #000',
                    borderRadius: '20px',
                  }}
                  startIcon={<CloseIcon />}
                  onClick={() => removeQueryParam(param, value)}
                >
                  <Typography variant='body1'>{value}</Typography>
                </Button>
              ))}
            </React.Fragment>
          ) : (
            <Button
              key={`${param}`}
              sx={{
                py: 0.5,
                px: 2,

                border: '1px solid #000',
                borderRadius: '20px',
              }}
              startIcon={<CloseIcon />}
              onClick={() => removeQueryParam(param, '', true)}
            >
              <Typography variant='body1'>
                {filteredQueryParams[param].split(',').map((value, ind) => (
                  <React.Fragment>
                    {ind < filteredQueryParams[param].split(',').length - 1
                      ? `$${value} - `
                      : `$${value}`}
                  </React.Fragment>
                ))}
              </Typography>
            </Button>
          )
        )}
      {filteredQueryParams && Object.keys(filteredQueryParams)?.length > 0 && (
        <Button
          size='large'
          sx={{
            fontWeight: 600,
          }}
          onClick={handleClearAll}
        >
          Clear All
        </Button>
      )}
    </Box>
  );
};

export default RemoveFilter;
