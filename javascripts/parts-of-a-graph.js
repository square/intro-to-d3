(function() {
  /* First graph example, simple line chart */
  var data = [];

  d3.selectAll('.ex-1 .example-source tbody tr').each(function() {
    var row = d3.select(this),
        date = null,
        amount = null;

    row.selectAll('td').each(function(d, i) {
      var td = d3.select(this);
      if (i == 0) {
        date = new Date(Date.parse(td.text()));
      } else {
        amount = parseFloat(td.text().replace(/\D/, ''));
      }
    })

    data.push({
      date: date,
      amount: amount
    });
  });

  function getDate(d) {
    return d.date;
  }

  function getAmount(d) {
    return d.amount;
  }

  function translate(x, y) {
    return 'translate(' + x + ',' + y + ')';
  }

  var width = 350,
      height = 120,
      margin = { top: 10, right: 50, bottom: 30, left: 50 },
      x = d3.scaleTime()
          .range([0, width])
          .domain(d3.extent(data, getDate)),
      y = d3.scaleLinear()
          .range([height, 0])
          .domain([0, d3.max(data, getAmount)]),
      xAxis = d3.axisBottom(x)
               .ticks(3),
      yAxis = d3.axisLeft(y)
              .tickFormat(d3.format('$,d'))
              .ticks(5);

  var svg = d3.select('.ex-1 .example-result')
    .append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
    .append('g')
      .attr('transform', translate(margin.left, margin.top));

  svg.append('g')
    .attr('class', 'x axis')
    .attr('transform', translate(0, height))
    .call(xAxis);

  svg.append('g')
    .attr('class', 'y axis')
    .call(yAxis);

  var line = d3.line()
      .x(function(d) { return x(getDate(d)) })
      .y(function(d) { return y(getAmount(d)) })

  svg.append("path")
    .datum(data)
    .attr("class", "line")
    .attr("d", line);
})();

