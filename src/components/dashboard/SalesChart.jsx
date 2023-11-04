import { Box, useTheme } from '@mui/material';
import React, { useEffect, useState } from 'react';
import Chart from 'react-apexcharts';
import ContentLoader from '../loader/ContentLoader';

const getOrderStatusData = (pending, delivered) => {
  // Create an object to store the orders by date
  const ordersByDate = [];

  // Group pending sales by createdAt date
  if (pending)
    for (const order of pending) {
      const date = order.createdAt.split('T')[0];
      let existingOrder = ordersByDate.find((item) => item.date === date);

      if (!existingOrder) {
        existingOrder = {
          date,
          pending: { orders: 0, total: 0 },
          delivered: { orders: 0, total: 0 },
        };
        ordersByDate.push(existingOrder);
      }
      existingOrder.pending = {
        orders: ++existingOrder.pending.orders,
        total: existingOrder.pending.total + order.final_price,
      };
    }

  // Group delivered sales by createdAt date
  if (delivered)
    for (const order of delivered) {
      const date = order.createdAt.split('T')[0];
      let existingOrder = ordersByDate.find((item) => item.date === date);

      if (!existingOrder) {
        existingOrder = {
          date,
          pending: { orders: 0, total: 0 },
          delivered: { orders: 0, total: 0 },
        };
        ordersByDate.push(existingOrder);
      }
      existingOrder.delivered = {
        orders: ++existingOrder.delivered.orders,
        total: existingOrder.delivered.total + order.final_price,
      };
    }
  return ordersByDate;
};

const columnChartOptions = {
  chart: {
    height: 500,
    type: 'bar',
  },
  plotOptions: {
    bar: {
      borderRadius: 10,
      // dataLabels: {
      //   position: 'top', // top, center, bottom
      // },
    },
  },
  dataLabels: {
    enabled: false,
    formatter: function (val) {
      if (val !== 0) return `$` + val;
    },
    style: {
      fontSize: '15px',
      colors: ['#304758'],
    },
  },

  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    position: 'top',
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    crosshairs: {
      fill: {
        type: 'gradient',
        gradient: {
          colorFrom: '#D8E3F0',
          colorTo: '#BED1E6',
          stops: [0, 100],
          opacityFrom: 0.4,
          opacityTo: 0.5,
        },
      },
    },
    tooltip: {
      enabled: true,
    },
  },
  yaxis: {
    axisBorder: {
      show: false,
    },
    axisTicks: {
      show: false,
    },
    labels: {
      show: false,
      formatter: function (val) {
        if (y !== 0) return '$' + val;
      },
    },
  },
};

const SalesChart = ({ pendingSales, deliveredSales }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;
  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.error.light;
  const successDark = theme.palette.success.main;

  const [dates, setDates] = useState([]);
  const [loading, setLoading] = useState(true);

  const [options, setOptions] = useState(columnChartOptions);
  const [series, setSeries] = useState([
    {
      name: 'Pending',
      data: [2.3, 3.1, 4.0, 10.1, 4.0, 3.6],
    },
    {
      name: 'Delivered',
      data: [4.0, 6.1, 3.0, 9.1, 4.0, 3.6],
    },
  ]);

  useEffect(() => {
    const graphData = getOrderStatusData(pendingSales, deliveredSales);
    setDates(
      graphData?.map((el) =>
        new Date(el.date).toLocaleString('default', {
          day: '2-digit',
          month: 'short',
        })
      )
    );

    setSeries(() => [
      {
        name: 'Pending',
        data: graphData?.map((el) => el?.pending?.total) || [],
      },
      {
        name: 'Delivered',
        data: graphData?.map((el) => el?.delivered?.total) || [],
      },
    ]);
    setLoading(false);
  }, [pendingSales, deliveredSales]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, successDark],
      xaxis: {
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
        categories: dates,
      },

      yaxis: {
        labels: {
          style: {
            colors: [secondary],
          },
        },
      },
      grid: {
        borderColor: line,
      },
      legend: {
        position: 'bottom',
        horizontalAlign: 'center',
        labels: {
          colors: 'grey.500',
        },
      },
      tooltip: {
        theme: 'light',
        shared: false,
        intersect: true,
        y: {
          formatter: (y) => {
            if (typeof y !== 'undefined') return `$${y} Sales`;
            return y;
          },
        },
      },
    }));
  }, [primary, secondary, line, warning, primaryMain, successDark, dates]);

  return (
    <Box mt={4}>
      {loading ? (
        <ContentLoader />
      ) : (
        <Chart options={options} series={series} type='bar' height={500} />
      )}
    </Box>
  );
};

export default SalesChart;
