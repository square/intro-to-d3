(function() {
  /* Simple transition examples */
  var days = [],
      maxCount = 0;

  d3.selectAll('.ex-2 .example-source table').each(function() {
    var table = d3.select(this),
        data = [];

    table.selectAll('tbody tr').each(function() {
      var row = d3.select(this),
          product = null,
          count = null;

      row.selectAll('td').each(function(d, i) {
        var td = d3.select(this);
        if (i == 0) {
          product = td.text();
        } else {
          count = parseInt(td.text());
          maxCount = Math.max(count, maxCount);
        }
      });

      data.push({
        product: product,
        count: count
      });
    })

    days.push(data);
  });

  var sales = days[0];

  var width = 300,
      height = 75;

  var x = d3.scale.linear()
    .range([0, 300])
    .domain([0, maxCount]);
  var y = d3.scale.ordinal()
    .rangeRoundBands([0, height])
    .domain(sales.map(function(d, i) {
      return d.product;
    }));

  (function() {
    /* Plain example, jump transition */
    var sales = days[0];

    var svg = d3.select('.ex-2 .example-result svg')

    d3.select('.ex-2 .toggle').on('click', function() {
      sales = (sales == days[0]) ? days[1] : days[0];
      update();
    })

    function update() {
      var rects = svg.selectAll('rect')
        .data(sales, function(d, i) { return d.product });

      // When we enter, we only want to add the rect
      rects.enter()
        .append('rect');

      // The default selection is the update selection
      rects
        .attr('x', x(0))
        .attr('y', function(d, i) {
          return y(d.product);
        })
        .attr('height', y.rangeBand())
        .attr('width', function(d, i) {
          return x(d.count);
        });
    };

    update();
  })();

  (function() {
    /* Fancy example, smooth transition */
    var sales = days[0];

    var svg = d3.select('.ex-3 .example-result svg');

    d3.select('.ex-3 .toggle').on('click', function() {
      sales = (sales == days[0]) ? days[1] : days[0];
      update();
    })

    function update() {
      var rects = svg.selectAll('rect')
        .data(sales, function(d, i) { return d.product });

      // When we enter, we only want to add the rect
      rects.enter()
        .append('rect');

      rects.transition()
        .duration(1000)
        .attr('x', x(0))
        .attr('y', function(d, i) {
          return y(d.product);
        })
        .attr('height', y.rangeBand())
        .attr('width', function(d, i) {
          return x(d.count);
        });
    };

    update();
  })();
})();