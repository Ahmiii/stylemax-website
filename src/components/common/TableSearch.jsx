// material-ui
import {
  Box,
  FormControl,
  InputAdornment,
  OutlinedInput,
  styled,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

// ==============================|| HEADER CONTENT - SEARCH ||============================== //

const TableSearch = ({ handleChange }) => (
  <FormControl sx={{ maxWidth: '400px' }} fullWidth>
    <Outlined
      sx={{
        borderRadius: '20px',
      }}
      id='header-search'
      startAdornment={
        <InputAdornment position='start'>
          <SearchIcon />
        </InputAdornment>
      }
      aria-describedby='header-search-text'
      inputProps={{
        'aria-label': 'weight',
      }}
      placeholder='Search'
      onChange={handleChange}
    />
  </FormControl>
);

const Outlined = styled(OutlinedInput)(({ theme }) => ({
  '& .MuiOutlinedInput-notchedOutline': {
    borderRadius: '6px',
    border: `1px solid ${theme.palette.grey[500]}`,
  },
}));

export default TableSearch;
