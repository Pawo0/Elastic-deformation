const math = require('mathjs');

class KalkulatorProsty {
    constructor() {
        this.maszynkaDoCaleczek = this.createIntegrator();
    }

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

    rozwiaz(N) {
        this.maszynkaDoCaleczek = this.createIntegrator(N)
        this.sprawdz(N);
        console.log("")
        console.log("Rozwiązuję dla N =", N);
        const macierzB = this.zbudujMacierz(N);
        console.log("Macierz B:", macierzB);
        const wektorL = this.zbudujWektor(N);
        console.log("Wektor L:", wektorL);


        const wspolczynniki = this.rozwiazRownanie(macierzB, wektorL);
        console.log("Współczynniki:", wspolczynniki);

        const wyniki = [...wspolczynniki, 0];
        // console.log(wyniki);
        return { od: 0.0, do: 2.0, wyniki };
    }

    zbudujMacierz(N) {
        const macierzB = math.zeros(N, N)._data;
        for (let n = 0; n < N; n++) {
            for (let m = 0; m < N; m++) {
                const calka = this.policzCalke(N, n, m);
                console.log("Calka", n, m, calka);
                macierzB[n][m] = -3.0 * this.funkcjaKsztaltu(N, n, 0) * this.funkcjaKsztaltu(N, m, 0) + calka;
            }
        }
        return macierzB;
    }

    policzCalke(N, n, m) {
        if (Math.abs(m - n) > 1) return 0;

        const calkaOd = 2.0 * Math.max(Math.max(n, m) - 1, 0) / N;
        const calkaDo = 2.0 * Math.min(Math.min(n, m) + 1, N) / N;

        return this.maszynkaDoCaleczek(
            (x) => this.E(x) * this.pochodnaFunkcjiKsztaltu(N, n, x) * this.pochodnaFunkcjiKsztaltu(N, m, x),
            calkaOd,
            calkaDo
        );
    }

    zbudujWektor(N) {
        const wektorL = Array(N).fill(0);
        wektorL[0] = -30.0 * this.funkcjaKsztaltu(N, 0, 0);
        return wektorL;
    }

    rozwiazRownanie(bMatrix, lVector) {
        return math.lusolve(bMatrix, lVector).map((v) => v[0]);
    }

    sprawdz(N) {
        if (N < 2) {
            throw new Error("Liczba elementów skończonych musi być >= 2");
        }
    }

    E(x) {
        return x <= 1.0 ? 3.0 : 5.0;
    }

    funkcjaKsztaltu(N, i, x) {
        const h = 2.0 / N;
        const srodek = (2.0 * i) / N;
        const lewa = srodek - h;
        const prawa = srodek + h;

        if (x < lewa || x > prawa) return 0.0;
        return x <= srodek ? (x - lewa) * (N / 2.0) : (prawa - x) * (N / 2.0);
    }

    pochodnaFunkcjiKsztaltu(N, i, x) {
        const h = 2.0 / N;
        const srodek = (2.0 * i) / N;
        const lewa = srodek - h;
        const prawa = srodek + h;

        if (x < lewa || x > prawa) return 0.0;
        return x <= srodek ? N / 2.0 : -N / 2.0;
    }
}

const kalkulator = new KalkulatorProsty();

module.exports = { kalkulator }