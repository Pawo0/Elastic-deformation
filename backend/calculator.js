const math = require('mathjs');

class Calculator {
    createIntegrator(xx = 10) {
        // Integracja numeryczna z prostą implementacją Gauss-Legendre.
        return (func, from, to, steps = Math.max(50, xx * 20)) => {
            const h = (to - from) / steps;
            let result = 0;

            for (let i = 0; i < steps; i++) {
                const x1 = from + i * h;
                const x2 = x1 + h;
                const xm = (x1 + x2) / 2;
                result += func(xm) * h;
            }

            return result;
        };
    }

    solve(N) {
        this.integralCalc = this.createIntegrator(N)
        this.validate(N);
        // console.log("")
        // console.log("Rozwiązuję dla N =", N);
        const macierzB = this.createMatrix(N);
        // console.log("Macierz B:", macierzB);
        const wektorL = this.createVector(N);
        // console.log("Wektor L:", wektorL);


        const wspolczynniki = this.solveEquation(macierzB, wektorL);
        // console.log("Współczynniki:", wspolczynniki);

        const wyniki = [...wspolczynniki, 0];
        // console.log(wyniki);
        return { od: 0.0, do: 2.0, wyniki };
    }

    createMatrix(N) {
        const macierzB = math.zeros(N, N)._data;
        for (let n = 0; n < N; n++) {
            for (let m = 0; m < N; m++) {
                const calka = this.countIntegral(N, n, m);
                // console.log("Calka", n, m, calka);
                macierzB[n][m] = -3.0 * this.shapeFunction(N, n, 0) * this.shapeFunction(N, m, 0) + calka;
            }
        }
        return macierzB;
    }

    countIntegral(N, n, m) {
        if (Math.abs(m - n) > 1) return 0;

        const from = 2.0 * Math.max(Math.max(n, m) - 1, 0) / N;
        const to = 2.0 * Math.min(Math.min(n, m) + 1, N) / N;

        return this.integralCalc(
            (x) => this.E(x) * this.derivativeShapeFunction(N, n, x) * this.derivativeShapeFunction(N, m, x),
            from,
            to
        );
    }

    createVector(N) {
        const wektorL = Array(N).fill(0);
        wektorL[0] = -30.0 * this.shapeFunction(N, 0, 0);
        return wektorL;
    }

    solveEquation(bMatrix, lVector) {
        return math.lusolve(bMatrix, lVector).map((v) => v[0]);
    }

    validate(N) {
        if (N < 2) {
            throw new Error("Liczba elementów skończonych musi być >= 2");
        }
    }

    E(x) {
        return x <= 1.0 ? 3.0 : 5.0;
    }

    shapeFunction(N, i, x) {
        const h = 2.0 / N;
        const mid = (2.0 * i) / N;
        const left = mid - h;
        const right = mid + h;

        if (x < left || x > right) return 0.0;
        return x <= mid ? (x - left) * (N / 2.0) : (right - x) * (N / 2.0);
    }

    derivativeShapeFunction(N, i, x) {
        const h = 2.0 / N;
        const mid = (2.0 * i) / N;
        const left = mid - h;
        const right = mid + h;

        if (x < left || x > right) return 0.0;
        return x <= mid ? N / 2.0 : -N / 2.0;
    }
}

const calc = new Calculator();

module.exports = { calc: calc }