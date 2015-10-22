 console.log("Assignment 3");

//Set up drawing environment with margin conventions
var margin = {t:20,r:20,b:50,l:50};
var width = document.getElementById('plot').clientWidth - margin.l - margin.r,
    height = document.getElementById('plot').clientHeight - margin.t - margin.b;

var plot = d3.select('#plot')
    .append('svg')
    .attr('width',width + margin.l + margin.r)
    .attr('height',height + margin.t + margin.b)
    .append('g')
    .attr('class','plot-area')
    .attr('transform','translate('+margin.l+','+margin.t+')');

//Initialize axes
//Consult documentation here https://github.com/mbostock/d3/wiki/SVG-Axes
var scaleX,scaleY;

var axisX=d3.svg.axis()
    .orient('bottom');
var axisY=d3.svg.axis()
    .orient('left');



//Start importing data
d3.csv('data/world_bank_2012.csv', parse, dataLoaded);

function parse(d){

    //Eliminate records for which gdp per capita isn't available
    if (d['GDP per capita, PPP (constant 2011 international $)'] == "..")
        {return;
    }

    //Check "primary completion" and "urban population" columns
    //if figure is unavailable and denoted as "..", replace it with undefined
    //otherwise, parse the figure into numbers
    return {
        cName: d['Country Name'],
        cCode: d['Country Code'],
        gdp: d['GDP per capita, PPP (constant 2011 international $)']!=='..'?
            +d['GDP per capita, PPP (constant 2011 international $)']:undefined,
        pRate: d['Primary completion rate, total (% of relevant age group)']!=='..'?
            +d['Primary completion rate, total (% of relevant age group)']:undefined,
        urbanPop: d['Urban population (% of total)']!=='..'?
            +d['Urban population (% of total)']:undefined,
    };
}

function dataLoaded(error, rows){
    //with data loaded, we can now mine the data
    //console.log(rows);




    var gdpMin=d3.min(rows, function(d) {return d.gdp}),
        gdpMax=d3.max(rows, function(d) {return d.gdp});
    var pRateMin=d3.min(rows, function(d) {return d.pRate}),
        pRateMax=d3.max(rows, function(d) {return d.pRate});
    var urbanPopMin=d3.min(rows, function(d) {return d.urbanPop}),
        urbanPopMax=d3.max(rows, function(d) {return d.urbanPop});

    console.log(gdpMin, gdpMax);
    console.log(pRateMin, pRateMax);
    console.log(urbanPopMin, urbanPopMax);
//make gdp the x and ubranPop the y to match in-class ~RM
//I'm not sure what blue lines are, but maybe make them a new join on top? or a new graph? ~RM


    //with mined information, set up domain and range for x and y scales
    //Log scale for x, linear scale for y
    //scaleX = d3.scale.log()...



    //Draw axisX and axisY


    scaleX = d3.scale.log()
        .domain([gdpMin,gdpMax])
        .range([0,width]),
    scaleY = d3.scale.linear()
        .domain([0,200])
        .range([height,0]);

    axisX.scale(scaleX);
    axisY.scale(scaleY);

    plot.append('g')
        .attr('class','axis axis-x')
        .attr('transform','translate(0,'+height+')')
        .call(axisX);

    plot.append('g')
        .attr('class','axis axis-y')
        .call(axisY);


var draw = plot.selectAll('.line')
    .data(rows)
    .enter()
    .append('g')
    .attr('class','line');


    draw.append ('line')
    .filter(function(d){return d.urbanPop !== undefined})
    .attr('x1', function(d){return scaleX(d.gdp)})
    .attr('x2', function(d){return scaleX(d.gdp)})
    .attr('y1', scaleY(0))
    .attr('y2', function(d){return scaleY(d.urbanPop)})
    .style('stroke', 'rgb(199, 0, 0)')
    //.style('stroke-opacity', .23)
    .style('stroke-width', '1px')
    .on('click', function(d){
            console.log(d);
    });


    draw.append ('line')
    .filter(function(d){return d.pRate !== undefined})
    .attr('x1', function(d){return scaleX(d.gdp)})
    .attr('x2', function(d){return scaleX(d.gdp)})
    .attr('y1', scaleY(0))
    .attr('y2', function(d){return scaleY(d.pRate)})
    .style('stroke', 'rgb(0, 0, 199)')
    .style('stroke-opacity', .25)
    .style('stroke-width', '1px')
    .on('click', function(d){
            console.log(d);
    });


/* Why can't I use the join function twice (see below)?

plot.selectAll('line') //what are we selecting when we select

    .data(rows)
    .enter()
    .append('line')
    .attr('x1', function(d){return scaleX(d.gdp)})
    .attr('x2', function(d){return scaleX(d.gdp)})
    .attr('y1', scaleY(0))
    .attr('y2', function(d){return scaleY(d.urbanPop)})
    .style('stroke', 'rgb(199, 0, 0)')
    .style('stroke-width', '1px')
    .on('click', function(d){
            console.log(d);
    });

plot.selectAll('line')

    .data(rows)
    .enter()
    .append('line')
    .attr('x1', function(d){return scaleX(d.gdp)})
    .attr('x2', function(d){return scaleX(d.gdp)})
    .attr('y1', scaleY(0))
    .attr('y2', function(d){return scaleY(d.pRate)})
    .style('stroke', 'rgb(0, 0, 199)')
    .style('stroke-width', '1px')
    .on('click', function(d){
            console.log(d);
    });*/

}








    //draw <line> elements to represent countries
    //each country should have two <line> elements, nested under a common <g> element



