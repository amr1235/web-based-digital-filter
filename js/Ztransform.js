class ZTransform {
    constructor(samplingRate) {
        this.semiUnitCircle = this.generateSemiUnitCircle(parseInt(samplingRate / 2));
    }

    get frequencies() {
        return this.theta;
    }
    
    generateSemiUnitCircle(numberOfSamples) {
        this.theta = this.linspace(0, Math.PI, numberOfSamples);
        let points = [];
        let x, y;
        for (let i = 0; i < numberOfSamples; i++) {
            x = Math.cos(this.theta[i]);
            y = Math.sin(this.theta[i]);
            points[i] = [x, y]
        }
        return points;
    }

    distance(point1 = [], point2 = []) {
        return Math.sqrt(Math.pow(point1[0] - point2[0], 2) + Math.pow(point1[1] - point2[1], 2))
    }

    frequencyResponse(poles = [[]], zeroes = [[]]) {
        let response = []        
        for (const point of this.semiUnitCircle) {
            let num = 1;
            let denum = 1;
            for (const zero of zeroes) {
                num = num * this.distance(point, zero);
            }
            for (const pole of poles) {
                denum = denum * this.distance(point, pole);
            }
            response.push(num / denum);
        }
        return response;
    }
    
    linspace(start, end, num) {
        const step = (end - start) / (num - 1);
        let arr = [];
        for (let i = 0; i < num; i++) {
            arr[i] = start + (i * step);
        }
        return arr;
    }
}


// poles = [
// //   x, y
//     [0, 5],
//     [1, 1]
// ];
// zeroes = [
//     [1, 0]
// ];
// const SAMPLING_RATE = 10;
// let ztrans = new ZTransform(SAMPLING_RATE)
// let response = ztrans.frequencyResponse(poles, zeroes); //y-axis
// let freqs = ztrans.frequencies //x-axis
// console.log(response,freqs);