import React, { Component } from 'react'
import Chart from "react-apexcharts";

export default class OverviewGraph extends Component {
    constructor(props){
        super(props);
        this.state = {
          
            series: [25,25,25,25],
            options: {
              chart: {
                type: 'donut',
              },
              labels:['38% MEN','42% WOMEN','12% KIDS','08% OTHERS'],
              colors: ['#2CD889', '#2CD889', '#F7617D', '#FFCD54'],
              responsive: [{
                breakpoint: 480,
                options: {
                  chart: {
                    width: 200
                  },
                  legend: {
                      show:false,
                    position: 'bottom'
                  }
                }
              }],
              dataLabels: {
                enabled: false,
              },
              plotOptions:{
                  pie:{
                      expandOnClick: false,
                      donut:{
                          size:"90px"
                      }
                  }
              }
            },
          
          
          };
    }
    render() {
        return (
            <div className="chart-container">
                {/* <Chart
                options={this.state.options}
                series={this.state.series}
                type="donut"
                width={this.props.width}
                height={this.props.height}
                // style={{display:'flex',justifyContent:'center'}}
                /> */}
                <Chart options={this.state.options} series={this.state.series} type="donut" height="200px"/>
            </div>
        )
    }
}
