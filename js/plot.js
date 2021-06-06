class Plot {
    constructor(w, h) {
        this.width = w;
        this.height = h;
    }
    plot = (x, y,label) => {
        this.canvas = d3.select("body").append("div")
            .attr("id", "freqResp")
            .attr("style", "position: relative;margin: auto;");
        this.canvas = d3.select("#freqResp").append("canvas")
            .attr("id", "myChart");


        this.ctx = document.getElementById('myChart');
        let data = {
            labels: x,
            datasets: [{
                label : label,
                data: y,
                fill: false,
                borderColor: 'rgb(75, 192, 192)'
            }]
        }
        let options = {
            maintainAspectRatio: false,
            animation : false
        }
        var myChart = new Chart(this.ctx, {
            type: 'line',
            options: options,
            data: data
        });
        d3.select("#freqResp").attr("width", this.width).attr("height", this.height);
    }
    destroy = () => {
        d3.select("#myChart").remove();
    }
}