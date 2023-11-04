import { useEffect, useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import ContentLoader from '../../loader/ContentLoader';
import NoData from '../../common/Nodata';

// chart options
const columnChartOptions = {
  chart: {
    type: 'bar',
    height: 430,
    toolbar: {
      show: false,
    },
  },
  plotOptions: {
    bar: {
      columnWidth: '30%',
      borderRadius: 4,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    show: true,
    width: 8,
    colors: ['transparent'],
  },
  xaxis: {
    categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
  },
  yaxis: {
    title: {
      text: '',
    },
  },
  fill: {
    opacity: 1,
  },
  tooltip: {
    y: {
      formatter(val) {
        return `${val}`;
      },
    },
  },
  legend: {
    show: true,
    fontFamily: `'Public Sans', sans-serif`,
    offsetX: 10,
    offsetY: 10,
    labels: {
      useSeriesColors: false,
    },
    markers: {
      width: 16,
      height: 16,
      radius: '50%',
      offsexX: 2,
      offsexY: 2,
    },
    itemMargin: {
      horizontal: 15,
      vertical: 15,
    },
  },
  responsive: [
    {
      breakpoint: 600,
      options: {
        yaxis: {
          show: false,
        },
      },
    },
  ],
};

// ==============================|| SALES COLUMN CHART ||============================== //

const SalesGraph = ({ deliveredSales, loading }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const warning = theme.palette.warning.main;
  const primaryMain = theme.palette.primary.main;
  const successDark = theme.palette.success.dark;

  const [series, setSeries] = useState([
    {
      name: 'Delivered',
      data: [120, 45, 78, 150, 168, 99],
    },
  ]);

  const [options, setOptions] = useState(columnChartOptions);

  let sortedArray =
    deliveredSales &&
    deliveredSales?.sort(function (a, b) {
      return new Date(a.createdAt) - new Date(b.createdAt);
    });

  useEffect(() => {
    setSeries((st) => [
      {
        name: 'Delivered',
        data: deliveredSales
          ? [...deliveredSales?.map((el) => el.final_price)]
          : [],
      },
    ]);
  }, [deliveredSales]);

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [warning, primaryMain],
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
        categories: sortedArray
          ? sortedArray
              ?.map((el) => el.createdAt)
              ?.map((el) =>
                new Date(el).toLocaleString('default', {
                  day: '2-digit',
                  month: 'short',
                })
              )
          : [],
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
      tooltip: {
        theme: 'light',
      },
      legend: {
        position: 'top',
        horizontalAlign: 'right',
        labels: {
          colors: 'grey.500',
        },
      },
    }));
  }, [
    primary,
    secondary,
    line,
    warning,
    primaryMain,
    successDark,
    sortedArray,
  ]);

  return loading ? (
    <ContentLoader />
  ) : !deliveredSales ? (
    <NoData />
  ) : (
    <div id='chart'>
      <ReactApexChart
        options={options}
        series={series}
        type='bar'
        height={430}
      />
    </div>
  );
};

export default SalesGraph;
