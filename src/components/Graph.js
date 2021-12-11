import React, { Component } from "react";
import Chart from "react-apexcharts";

export default class Graph extends Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
        chart: {
          id: "area-graph",
          toolbar: { show: false },
          zoom: {
            enabled: false,
          },
        },
        stroke: {
          width: 2,
          dashArray: this.props.dash,
        },
        xaxis: {
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          crosshairs: {
            show: false,
          },
          // tooltip: {
          //     enabled: true,
          // }
        },
        yaxis: {
          labels: {
            show: false,
          },
          axisTicks: {
            show: false,
          },
          axisBorder: {
            show: false,
          },
          crosshairs: {
            show: false,
          },
          // tooltip: {
          //     enabled: true,
          // }
        },
        fill: {
          type: "gradient",
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7,
            opacityTo: 0.5,
            stops: [0, 90, 100],
            inverseColors: this.props.rev && true,
          },
        },
        dataLabels: {
          enabled: false,
        },
        tooltip: {
          enabled: false,
        },
        grid: {
          show: false,
        },
        colors: this.props.color,
      },
      series: [
        {
          name: "series-1",
          data: this.props.data,
        },
      ],
    };
  }

  render() {
    return (
      <div className="chart-container">
        <Chart
          options={this.state.options}
          series={this.state.series}
          type="area"
          width={this.props.width}
          height={this.props.height}
          style={{ display: "flex", justifyContent: "center" }}
        />
      </div>
    );
  }
}
