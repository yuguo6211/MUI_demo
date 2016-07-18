export default {
  drawChart: (data) => {
    var area = new Morris.Area({
      element: 'revenue-chart',
      resize: true,
      data: data.area,
      xkey: 'y',
      ykeys: ['item1', 'item2'],
      labels: ['Item 1', 'Item 2'],
      lineColors: ['#a0d0e0', '#3c8dbc'],
      hideHover: 'auto'
    });
    var line = new Morris.Line({
      element: 'line-chart',
      resize: true,
      data: data.lines,
      xkey: 'y',
      ykeys: ['item1'],
      labels: ['Item 1'],
      lineColors: ['#efefef'],
      lineWidth: 2,
      hideHover: 'auto',
      gridTextColor: "#fff",
      gridStrokeWidth: 0.4,
      pointSize: 4,
      pointStrokeColors: ["#efefef"],
      gridLineColor: "#efefef",
      gridTextFamily: "Open Sans",
      gridTextSize: 10
    });
    area.redraw();
    line.redraw();
  }
}
