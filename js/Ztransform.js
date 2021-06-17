class ZTransform {
    constructor() {
        this.MAX_POINTS = 500
        this.semiUnitCircle = this.generateSemiUnitCircle();
    }

    get frequencies() {
        return this.theta;
    }

    generateSemiUnitCircle() {
        this.theta = this.linspace(0, Math.PI, this.MAX_POINTS);
        let points = [];
        let x, y;
        for (let i = 0; i < this.MAX_POINTS; i++) {
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
            return - Math.atan(point[1] / point[0]);
        }
    }

    filter(poles = [[]], zeroes = [[]], allPass = [[]]) {
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
                phaseNum = phaseNum + this.phase(diff);
            }
            for (const pole of poles) {
                diff = this.difference(point, pole);
                magDenum = magDenum * this.magnitude(diff);
                phaseDenum = phaseDenum + this.phase(diff);
            }
            for (const a of allPass) {
                diff = this.difference(point, a);
                phaseNum = phaseNum + this.phase([1-point[0]*a[0] - point[1]*a[1],point[0]*a[1] - point[1]*a[0]]);
                phaseDenum = phaseDenum + this.phase(diff);
            }
            magResponse.push((magNum / magDenum).toFixed(5));
            phaseResponse.push(phaseNum - phaseDenum.toFixed(5));
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
            arr[i] = (start + (i * step)).toFixed(5);
        }
        return arr;
    }
}