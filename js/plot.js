class Plot {
    constructor(w, h) {
        this.width = w;
        this.height = h;
    }
    plot = (x1, y1, x2, y2, x3, y3, label1, label2, label3) => {
        this.freq = d3.select("#plot1").append("div")
            .attr("id", "freqResp")
            .attr("style", "position: relative;margin: auto;")
            .attr("width", this.width).attr("height", this.height);
        this.canvas = d3.select("#freqResp").append("canvas")
            .attr("id", "myChart1");

        this.phase = d3.select("#plot2").append("div")
            .attr("id", "phaseResp")
            .attr("style", "position: relative;margin: auto;")
            .attr("width", this.width).attr("height", this.height);
        this.canvas = d3.select("#phaseResp").append("canvas")
            .attr("id", "myChart2");

        this.phase = d3.select("#plot3").append("div")
            .attr("id", "allPassResp")
            .attr("style", "position: relative;margin: auto;")
            .attr("width", this.width).attr("height", this.height);
        this.canvas = d3.select("#allPassResp").append("canvas")
            .attr("id", "myChart3");

        this.ctx1 = document.getElementById('myChart1');
        this.ctx2 = document.getElementById('myChart2');
        this.ctx3 = document.getElementById('myChart3');

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

        let data3 = {
            labels: x3,
            datasets: [{
                label: label3,
                data: y3,
                fill: false,
                borderColor: 'rgb(75, 192, 192)'
            }]
        }

        let options = {
            maintainAspectRatio: false,
            animation: false,
            scales : {
                x : {
                    ticks : {
                        sampleSize : 5
                    }
                }
                
            }

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

        var myChart3 = new Chart(this.ctx3, {
            type: 'line',
            options: options,
            data: data3
        });
        return {myChart1 , myChart2 , myChart3 };
    }
    destroy = () => {
        d3.select("#myChart1").remove();
        d3.select("#myChart2").remove();
        d3.select("#myChart3").remove();
    }
}