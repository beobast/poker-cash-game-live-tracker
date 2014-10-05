var margin = {top: 20, right: 20, bottom: 30, left: 50},
    width = 900 - margin.left - margin.right,
    height = 500 - margin.top - margin.bottom;

var bisect = d3.bisector(function(d) { return d.session; }).left;

var x = d3.scale.linear()
    .range([0, width]);

var y = d3.scale.linear()
    .range([height, 0]);

var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom");

var yAxis = d3.svg.axis()
    .scale(y)
    .orient("left");

var line = d3.svg.line()
    .x(function(d) { return x(d.session); })
    .y(function(d) { return y(d.total); });

var svg = d3.select("body").append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("cash-game.csv", function(error, data) {

        var handsPerHour = 25;
        var totalEarnings = 0;
        var totalHours = 0;
        var sessions = 0;
        var winningSessions = 0;
        var losingSessions = 0;
        var totalWins = 0;
        var totalLosses = 0;

        data.forEach(function(d) {
            d.value = +d.value;
            totalEarnings += d.value;
            totalHours += +d.duration;
            sessions = d.session;
            d.total = totalEarnings;
            if (d.value > 0) {
                winningSessions += 1;
                totalWins += d.value;
            }
            else if (d.value < 0) {
                losingSessions += 1;
                totalLosses += d.value;
            }
        });

        x.domain([0,sessions]);
        y.domain(d3.extent(data, function(d) { return d.total; }));

        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
          .append("text")
            .attr("x", width)
            .attr("y", -6)
            .attr("text-anchor", "end")
            .text("Sessions");

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
          .append("text")
            .attr("x", 6)
            .attr("dy", ".71em")
            .text("Earnings (€)");

        svg.append("path")
            .datum(data)
            .attr("class", "line")
            .attr("d", line);

        svg.append("text")
            .attr("x", margin.left)
            .attr("y", 2*margin.top)
            .text("Total earnings : " + totalEarnings + " €")

        svg.append("text")
            .attr("x", margin.left)
            .attr("y", 3*margin.top)
            .text("Total hours : " + totalHours);
        
        svg.append("text")
            .attr("x", margin.left)
            .attr("y", 4*margin.top)
            .text("Winrate : " + d3.round(totalEarnings/totalHours, 2) + " € / h");
        
        svg.append("text")
            .attr("x", margin.left)
            .attr("y", 5*margin.top)
            .text("Total hands : " + totalHours * handsPerHour);
        
        svg.append("text")
            .attr("x", margin.left)
            .attr("y", 6*margin.top)
            .text(d3.round((100*totalEarnings)/(2*totalHours*handsPerHour)) + " big blinds / 100 hands");

        svg.append("text")
            .attr("x", margin.left)
            .attr("y", 7*margin.top)
            .text("Average session duration : " + d3.round(totalHours/sessions, 2));

        svg.append("text")
            .attr("x", margin.left)
            .attr("y", 8*margin.top)
            .text("Average win per session : " + d3.round(totalEarnings/sessions, 2) + " €");

        svg.append("text")
            .attr("x", margin.left)
            .attr("y", 9*margin.top)
            .text("Winning sessions : " + d3.round(winningSessions/sessions, 2)*100 + " % - Average : " + d3.round(totalWins/winningSessions, 2) + " €");

        svg.append("text")
            .attr("x", margin.left)
            .attr("y", 10*margin.top)
            .text("Losing sessions : " + d3.round(losingSessions/sessions, 2)*100 + " % - Average : " + d3.round(totalLosses/losingSessions, 2) + " €");

        var detailsDate = svg.append("text")
                             .attr("x", margin.left)
                             .attr("y", 12*margin.top);

        var detailsValue = svg.append("text")
                              .attr("x", margin.left)
                              .attr("y", 13*margin.top);

        var focus = svg.append("g")
            .attr("class", "focus")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 4.5);

        svg.append("rect")
            .attr("class", "overlay")
            .attr("width", width)
            .attr("height", height)
            .on("mouseover", function() { focus.style("display", null); })
            .on("mouseout", function() { 
                    focus.style("display", "none");
                    detailsDate.text("");
                    detailsValue.text("");
            })
            .on("mousemove", mousemove);

        function mousemove() {
            var x0 = x.invert(d3.mouse(this)[0]),
                i = bisect(data, x0, 1),
                d0 = data[i - 1],
                d1 = data[i],
                d = x0 - d0.session > d1.session - x0 ? d1 : d0;

            if(d.session == 0) return;

            focus.attr("transform", "translate(" + x(d.session) + "," + y(d.total) + ")");
            detailsDate.text("Session " + d.session + " on " + d.date);
            if(d.value < 0) {
                detailsValue.attr("fill", "red");
                detailsValue.text("Lost " + d.value + " € in " + d.duration + " hours");
            }
            else {
                detailsValue.attr("fill", "green");
                detailsValue.text("Won " + d.value + " € in " + d.duration + " hours");
            }

        }
});

