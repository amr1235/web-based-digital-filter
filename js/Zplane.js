// import '/digital-filter-design/d3/d3'
class Zplane {
    constructor(width, height) {

        //equation x**2 + y**2 = 1
        this.w = width
        this.h = height
        this.padding = 30 ;
        this.dataSet = [];

        this.middlePointOf_x = width / 2 ;
        this.middlePointOf_y = height / 2 ;
        // add svg element 
        this.svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .on("click",(ev) => {
                let xElement = ev.layerX;
                let yElement = ev.layerY;
                console.log(xElement,yElement)
                let xPlane ;
                let yPlane ;
                if ( xElement > this.middlePointOf_x) {
                    xPlane = this.xPositiveScale.invert(xElement);
                } else {
                    xPlane = this.xNegativScale.invert(xElement);
                }
                if ( yElement < this.middlePointOf_y) {
                    yPlane = this.yPositiveScale.invert(yElement);
                } else {
                    console.log("--")
                }
                if(this.isInside(xElement,yElement)){
                    console.log("inside")
                }else{
                    console.log("outside")
                }
            });

        // set our scale
        // scale x
        this.xNegativScale = d3.scaleLinear().domain([-1, 0]).range([this.padding, this.middlePointOf_x]);
        this.xPositiveScale = d3.scaleLinear().domain([0, 1]).range([this.middlePointOf_x, this.w - this.padding]);
        //scale y 
        this.yNegativScale = d3.scaleLinear().domain([-1, 0]).range([this.middlePointOf_y, this.h - this.padding]);
        this.yPositiveScale = d3.scaleLinear().domain([0, 1]).range([this.middlePointOf_y, this.padding]);

        // set up x axis
        this.xPositiveAxis = d3.axisBottom(this.xPositiveScale).tickValues([0.2,0.4,0.6,0.8])
        this.xNegativeAxis = d3.axisBottom(this.xNegativScale).tickValues([-0.2,-0.4,-0.6,-0.8]);
        // set up y axis
        this.yPositiveAxis = d3.axisLeft(this.yPositiveScale).tickValues([0.2,0.4,0.6,0.8]);
        this.yNegativeAxis = d3.axisLeft(d3.scaleLinear().domain([0, -1]).range([this.middlePointOf_y, this.h - this.padding]))
                                .tickValues([-0.2,-0.4,-0.6,-0.8]);
        // draw tha main circle
        this.svg.append("circle").attr("cx", this.middlePointOf_x).attr("cy", this.middlePointOf_y).attr("r", this.middlePointOf_x - this.padding)
            .attr("stroke", "rgb(115, 115, 115)")
            .attr("stroke-width", "1.8")
            .attr("fill", "none");

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
    //check if a point is inside the z-plane
    isInside(xElement,yElement){
        let firstPart = (xElement - this.middlePointOf_x)*(xElement - this.middlePointOf_x);
        let secondPart = (yElement - this.middlePointOf_y)*( yElement - this.middlePointOf_y);
        let thirdPart = (this.middlePointOf_x - this.padding)*(this.middlePointOf_x - this.padding);
        let ch = firstPart + secondPart - thirdPart
        if(ch > 1) return false;
        return true;
    }
    add_point(point,type){
        // plot
        this.dataSet.push({
            point : point,
            type : type
        });
        let points = this.svg.selectAll(".point").data(this.dataSet);
        if(type == this.types.pole) {
            points.enter().append("text").text("X").attr("x",(d) => {
                let v = 0;
                if (d["point"][0] > 0) {
                    v = this.xPositiveScale(d["point"][0]) - 4;
                } else {
                    v = this.xNegativScale(d["point"][0]) - 4;
                }
                return v;
            }).attr("y",(d)=>{
                let v = 0;
                if (d["point"][1] >= 0) {
                    v = this.yPositiveScale(d["point"][1]) + 6;
                } else {
                    v = this.yNegativScale(d["point"][1]) + 6;
                }
                return v;
            }).attr("class","point")
            .attr("font-family", "sans-serif")
            .attr("font-size", "15px")
            .attr("fill", "green")
            .on("mouseover",function(ev){
                d3.select(ev.target).attr("fill","red");
            })
            .on("mouseout",function(ev){
                d3.select(ev.target).attr("fill","green");
            })
            .attr("style","cursor: default;")
            .merge(points);
        }else {
            points.enter().append("circle").attr("cx",(d) => {
                let v = 0;
                if (d["point"][0] > 0) {
                    v = this.xPositiveScale(d["point"][0]);
                } else {
                    v = this.xNegativScale(d["point"][0]);
                }
                return v;
            }).attr("cy",(d)=>{
                let v = 0;
                if (d["point"][1] >= 0) {
                    v = this.yPositiveScale(d["point"][1]);
                } else {
                    v = this.yNegativScale(d["point"][1]);
                }
                return v;
            }).attr("r",5).attr("class","point")
            .attr("stroke", "green")
            .attr("stroke-width", "1")
            .attr("fill", "none")
            .on("mouseover",function(ev){
                d3.select(ev.target).attr("fill","red");
            })
            .on("mouseout",function(ev){
                d3.select(ev.target).attr("fill","none");
            })
            .merge(points);
        }
    }
}
