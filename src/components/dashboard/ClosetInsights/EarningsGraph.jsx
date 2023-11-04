import PropTypes from 'prop-types';
import { useState, useEffect } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';

// third-party
import ReactApexChart from 'react-apexcharts';
import ContentLoader from '../../loader/ContentLoader';

// chart options
const areaChartOptions = {
  chart: {
    height: 450,
    type: 'area',
    toolbar: {
      show: false,
    },
  },
  dataLabels: {
    enabled: false,
  },
  stroke: {
    curve: 'smooth',
    width: 4,
  },
  grid: {
    strokeDashArray: 0,
  },
};

// ==============================|| INCOME AREA CHART ||============================== //

const EarningsGraph = ({ earnings, loading }) => {
  const theme = useTheme();

  const { primary, secondary } = theme.palette.text;
  const line = theme.palette.divider;

  const [options, setOptions] = useState(areaChartOptions);

  let sortedArray =
    earnings &&
    earnings?.durationGraph?.sort(function (a, b) {
      return new Date(a.date) - new Date(b.date);
    });

  useEffect(() => {
    setOptions((prevState) => ({
      ...prevState,
      colors: [theme.palette.primary.main, theme.palette.primary[700]],
      xaxis: {
        categories: sortedArray
          ? sortedArray
              ?.map((el) => el.date)
              ?.map((el) =>
                new Date(el).toLocaleString('default', {
                  day: '2-digit',
                  month: 'short',
                })
              )
          : [],
        labels: {
          style: {
            colors: [
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
              secondary,
            ],
          },
        },
        axisBorder: {
          show: true,
          color: line,
        },
        tickAmount: 10,
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
    }));
  }, [primary, secondary, line, theme, sortedArray]);

  const [series, setSeries] = useState([
    {
      name: 'Earnings',
      data: [0, 86, 28, 115, 48, 210, 136],
    },
  ]);

  useEffect(() => {
    setSeries([
      {
        name: 'Earnings',
        data: earnings?.durationGraph
          ? [...earnings?.durationGraph?.map((el) => el.earnings)]
          : [],
      },
    ]);
  }, [earnings?.durationGraph]);

  return loading ? (
    <ContentLoader />
  ) : (
    <ReactApexChart
      options={options}
      series={series}
      type='area'
      height={450}
    />
  );
};

EarningsGraph.propTypes = {
  slot: PropTypes.string,
};

export default EarningsGraph;
