class Plot {
    constructor(w, h) {
        this.width = w;
        this.height = h;
    }
    plot = (x1, y1, x2, y2, label1, label2) => {
        this.freq = d3.select("body").append("div")
            .attr("id", "freqResp")
            .attr("style", "position: relative;margin: auto;")
            .attr("width", this.width).attr("height", this.height);
        this.canvas = d3.select("#freqResp").append("canvas")
            .attr("id", "myChart1");

        this.phase = d3.select("body").append("div")
        .attr("id", "phaseResp")
        .attr("style", "position: relative;margin: auto;")
        .attr("width", this.width).attr("height", this.height);
        this.canvas = d3.select("#phaseResp").append("canvas")
        .attr("id", "myChart2");

        this.ctx1 = document.getElementById('myChart1');
        this.ctx2 = document.getElementById('myChart2');

        let data1 = {
            labels: x1,
            datasets: [{
                label: label1,
                data: y1,
                fill: false,
                borderColor: 'rgb(75, 192, 192)'
            }]
        }

        let data2 = {
            labels: x2,
            datasets: [{
                label: label2,
                data: y2,
                fill: false,
                borderColor: 'rgb(75, 192, 192)'
            }]
        }
        let options = {
            maintainAspectRatio: false,
            animation: false
        }
        var myChart1 = new Chart(this.ctx1, {
            type: 'line',
            options: options,
            data: data1
        });
        var myChart2 = new Chart(this.ctx2, {
            type: 'line',
            options: options,
            data: data2
        });
    }
    destroy = () => {
        d3.select("#myChart1").remove();
        d3.select("#myChart2").remove();
    }
}