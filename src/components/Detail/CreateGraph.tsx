import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_spiritedaway from "@amcharts/amcharts4/themes/spiritedaway";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

function CreateGraph(props: any) {
  // Themes begin
  am4core.useTheme(am4themes_spiritedaway);
  am4core.useTheme(am4themes_animated);
  // Themes end

  let chart = am4core.create("chartdiv", am4charts.XYChart);

  let data = [];
  for (var i = 0; i < props.data.length; i++) {
    let date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(i);
    let newVal;
    if (typeof props.data[i].minTemp === "undefined") {
      newVal = props.data[i].temperature;
    } else {
      newVal = props.data[i].minTemp;
    }
    data.push({
      date: date,
      value: Math.round(newVal),
    });
    date.setHours(0, 0, 0, 0);
  }

  // for (var i = 0; i < 300; i++) {
  //   let date = new Date();
  //   date.setHours(0, 0, 0, 0);
  //   date.setDate(i);
  //   value -= Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
  //   data.push({ date: date, value: value });
  // }

  chart.data = data;

  // Create axes
  let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
  dateAxis.renderer.minGridDistance = 60;
  dateAxis.renderer.labels.template.disabled = true;

  let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

  // Create series
  let series = chart.series.push(new am4charts.LineSeries());
  series.dataFields.valueY = "value";
  series.dataFields.dateX = "date";
  series.tooltipText = "{value}";

  if (series.tooltip != null) {
    series.tooltip.pointerOrientation = "vertical";
  }

  // chart.cursor = new am4charts.XYCursor();
  // chart.cursor.snapToSeries = series;
  // chart.cursor.xAxis = dateAxis;

  return <div id="chartdiv"></div>;
}
export default CreateGraph;
