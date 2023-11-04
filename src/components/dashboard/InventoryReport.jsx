import { Box, Grid, Button } from '@mui/material';
import React, { useEffect, useState } from 'react';
import CustomTypo from '../common/CustomTypo';
import MyInventoryTable from '../../tables/MyInventory';
import { getMyInventoryReportCSV } from '../../api/users';
import * as XLSX from 'xlsx';

const InventoryReport = () => {
  const [allReport, setAllReport] = useState([]);

  useEffect(() => {
    getMyInventoryReportCSV().then((res) => {
      setAllReport(res?.data?.products);
    });
  }, []);

  const downloadExcel = (data) => {
    const formattedData = data.map((i) => {
      return {
        ID: i.id ?? '',
        Label: i.label ?? '',
        Description: i.description ?? '',
        'Product Status': i.product_status ?? '',
        Price: i?.details?.price ?? '',
        'Offered Price': i.offered_price ?? '',
        Currency: i?.details?.currency ?? '',
        Condition: i?.details?.condition ?? '',
        Style: i?.details?.style ?? '',
        Material: i?.details?.material ?? '',
        'Quantity Type': i?.details?.quantity_type ?? '',
      };
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Sheet1');
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, 'DataSheet.xlsx');
  };


  return (
    <React.Fragment>
      <Box display='flex' flexDirection='column' justifyContent='end' gap={4}>
        <Box display='flex' justifyContent='space-between'>
          <CustomTypo fontFamily='KoHo' variant='h4'>
            My Inventory Report
          </CustomTypo>

          <Button
            color='primary'
            variant='contained'
            fontFamily='KoHo'
            onClick={() => downloadExcel(allReport)}
            disabled={allReport.length === 0}
          >
            Download Report
          </Button>
        </Box>
      </Box>
      <MyInventoryTable />
    </React.Fragment>
  );
};

export default InventoryReport;
