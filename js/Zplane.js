// import '/digital-filter-design/d3/d3'
class Zplane {
    constructor(width, height) {

        //equation x**2 + y**2 = 1
        this.w = width
        this.h = height
        let padding = 30 ;
        this.dataSet = [];

        this.middlePointOf_x = width / 2 ;
        this.middlePointOf_y = height / 2 ;
        // add svg element 
        this.svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

        // set our scale
        // scale x
        this.xNegativScale = d3.scaleLinear().domain([-1, 0]).range([padding, this.middlePointOf_x]);
        this.xPositiveScale = d3.scaleLinear().domain([0, 1]).range([this.middlePointOf_x, this.w - padding]);
        //scale y 
        this.yNegativScale = d3.scaleLinear().domain([-1, 0]).range([this.middlePointOf_y, this.h - padding]);
        this.yPositiveScale = d3.scaleLinear().domain([0, 1]).range([this.middlePointOf_y, padding]);

        // set up x axis
        this.xPositiveAxis = d3.axisBottom(this.xPositiveScale);
        this.xNegativeAxis = d3.axisBottom(this.xNegativScale);
        // set up y axis
        this.yPositiveAxis = d3.axisLeft(this.yPositiveScale);
        this.yNegativeAxis = d3.axisLeft(d3.scaleLinear().domain([0, -1]).range([this.middlePointOf_y, this.h - padding]));
        // svg.append("circle").attr("cx", 250).attr("cy", 250).attr("r", 250 - xPadding).attr("stroke", "black")
        //     .attr("stroke-width", "2")
        //     .attr("opacity", 0.1)

        this.types = {
            pole : "pole",
            zero : "zero"
        };
    }
    plot_axis(){
        //plot x
        this.svg.append("g").call(this.xPositiveAxis).attr("class", "axis")
            .attr("transform", "translate(0," + this.middlePointOf_y + ")");
        this.svg.append("g").call(this.xNegativeAxis).attr("class", "axis")
            .attr("transform", "translate(0," + this.middlePointOf_y + ")");
        //plot y
        this.svg.append("g").call(this.yPositiveAxis).attr("class", "axis")
            .attr("transform", "translate(" + this.middlePointOf_x + ",0)");
        this.svg.append("g").call(this.yNegativeAxis).attr("class", "axis")
            .attr("transform", "translate(" + this.middlePointOf_x + ",0)");
    }
    add_point(point,type){
        // plot
        this.dataSet.push({
            point : point,
            type : type
        });
        let points = this.svg.selectAll(".point").data(this.dataSet);
        if(type == this.types.pole) {
            points.append("text").text("X").attr("x",(d) => {
                
            }).attr("y",()=>{

            })
        }else {

        }
    }
}
