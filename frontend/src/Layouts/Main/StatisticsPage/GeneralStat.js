import React from "react";
import {
  BarChart,
  Tooltip,
  Bar,
  XAxis,
  Legend,
  YAxis,
  ResponsiveContainer,
  Surface,
  Symbols,
  Label
} from "recharts";
import _ from "lodash";

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';



class GeneralStat extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      disabled: [],
      chartColors: {
        others: "#40ee86",
        IVE: "#67d6c0",
        SPACE: "#127197",
        HKCC: "#e96d8d"
      },
      chartData: []
    };
  }

  handleClick = dataKey => {
    if (_.includes(this.state.disabled, dataKey)) {
      this.setState({
        disabled: this.state.disabled.filter(obj => obj !== dataKey)
      });
    } else {
      this.setState({ disabled: this.state.disabled.concat(dataKey) });
    }
  };

  renderCusomizedLegend = ({ payload }) => {
    return (
      <div className="customized-legend">
        {payload.map(entry => {
          const { dataKey, color } = entry;
          const active = _.includes(this.state.disabled, dataKey);
          const style = {
            marginRight: 10,
            color: active ? "#AAA" : "#000"
          };

          return (
            <span
              className="legend-item"
              onClick={() => this.handleClick(dataKey)}
              style={style}
            >
              <Surface width={10} height={10} viewBox="0 0 10 10">
                <Symbols cx={5} cy={5} type="circle" size={50} fill={color} />
                {active && (
                  <Symbols
                    cx={5}
                    cy={5}
                    type="circle"
                    size={25}
                    fill={"#FFF"}
                  />
                )}
              </Surface>
              <span>{dataKey}</span>
            </span>
          );
        })}
      </div>
    );
  };

  componentDidMount() {
    const chartData = require("./AllOffer.json");
    this.setState({ chartData: chartData });
  }

  handleChange = (event) => {
    if(event.target.value=="All Uni"){
      this.state.chartData = require("./AllOffer.json");
    }

    if(event.target.value=="HKU"){
      this.state.chartData = require("./HKUOffer.json");
    }

    if(event.target.value=="CUHK"){
      this.state.chartData = require("./CUOffer.json");
    }

    if(event.target.value=="UST"){
      this.state.chartData = require("./USTOffer.json");
    }
  };


  render() {

    return (
      <div>
        <h1> General Statistics for admission GPA of non-JUPAS Programmes </h1>
        <label for="Filter"> University Filter: </label>
        <FormControl sx={{ m: 1, minWidth: 200 }}>
        <InputLabel id="University">Select an University</InputLabel>
        <Select labelId="University" label="-- select an University --" name="University" id="University" onChange={this.handleChange} onClick={this.handleClick}>
          <MenuItem value="All Uni">All</MenuItem>
          <MenuItem value="HKU">HKU</MenuItem>
          <MenuItem value="CUHK">CUHK</MenuItem>
          <MenuItem value="UST">UST</MenuItem>
        </Select>
        </FormControl>


        <ResponsiveContainer height={470} width="90%">
          <BarChart layout="vertical" data={this.state.chartData}>
            {_.toPairs(this.state.chartColors)
              .filter(pair => !_.includes(this.state.disabled, pair[0]))
              .map(pair => (
                <Bar
                  stackId="a"
                  key={pair[0]}
                  dataKey={pair[0]}
                  fill={pair[1]}
                />
              ))}
            <YAxis
              domain={[3, 4]}
              dataKey="GPA"
              interval="preserveStartEnd"
              padding={{ top: 20, bottom: 20 }}
              tickCount={11}
              name="GPA" label={{ value: 'GPA', angle: -90, position: 'insideLeft' }}
            />
            <XAxis type="number" tickCount={6}>
              <Label value="Student Number" offset={0} position="insideBottom" />
            </XAxis>
            <Legend
              verticalAlign="top"
              height={36}
              payload={_.toPairs(this.state.chartColors).map(pair => ({
                dataKey: pair[0],
                color: pair[1]
              }))}
              content={this.renderCusomizedLegend}
            />
            <Tooltip />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }
}

export default GeneralStat;
