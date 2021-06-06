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

    difference(point1 = [], point2 = []) {
        return [point2[0] - point1[0], point2[1] - point1[1]];
    }

    magnitude(point) {
        return Math.sqrt(Math.pow(point[0], 2) + Math.pow(point[1], 2));
    }

    phase(point) {
        if (point[0] == 0) {
            return Math.PI / 2;
        }
        else {
            return Math.atan(point[1] / point[0]);
        }
    }

    filter(poles = [[]], zeroes = [[]]) {
        let magResponse = []
        let phaseResponse = []
        let magNum, magDenum, phaseNum, phaseDenum, diff;
        for (const point of this.semiUnitCircle) {
            magNum = 1;
            magDenum = 1;
            phaseNum = 0;
            phaseDenum = 0;
            for (const zero of zeroes) {
                diff = this.difference(point, zero);
                magNum = magNum * this.magnitude(diff);
                phaseNum = phaseNum - this.phase(diff);
                if (Math.abs(phaseNum.toFixed(5)) == Math.PI.toFixed(5)) phaseNum = 0;
            }
            for (const pole of poles) {
                diff = this.difference(point, pole);
                magDenum = magDenum * this.magnitude(diff);
                phaseDenum = phaseDenum - this.phase(diff);
                if (Math.abs(phaseDenum.toFixed(5)) == Math.PI.toFixed(5)) phaseDenum = 0;
            }
            magResponse.push(magNum / magDenum);
            phaseResponse.push(phaseNum - phaseDenum);
        }
        return {
            "magnitude": magResponse,
            "phase": phaseResponse
        };
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
//     //   x, y
//     // [0, 5],
//     // [0, 1]
// ];
// zeroes = [
//     [0.5, 0.866],
//     [0.5, -0.866],
// ];

// const SAMPLING_RATE = 100;
// let ztrans = new ZTransform(SAMPLING_RATE)
// let { magnitude, phase } = ztrans.filter(poles, zeroes);
// let freqs = ztrans.frequencies
// plot(freqs,mag)
// plot(freqs,phase)