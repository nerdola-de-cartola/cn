const sup = require('superscript-number');

function main() {
    const P1 = new Polynomial([6, -1, -7, 1, 1]);
    const P2 =  new Polynomial(P1.a.slice().reverse());
    const P3 =  new Polynomial(P1.a.map((c, i) => i % 2 === 0 ? c : -c));
    const P4 =  new Polynomial(P2.a.map((c, i) => i % 2 === 0 ? c : -c));
    const L1 = P1.l;
    const L2 = 1/P2.l;
    const L3 = -P3.l;
    const L4 = -1/P4.l;
    console.log(`As raízes negativas do polinômio P(x) = ${P1.print()} estão entre`);
    console.log(`L3 = ${L3.toFixed(2)} e L4=${L4.toFixed(2)}`);
    console.log(`As raízes positivas do polinômio P(x) = ${P1.print()} estão entre`);
    console.log(`L2 = ${L2.toFixed(2)} e L1=${L1.toFixed(2)}`);
    // console.log(P1.calculate(0))
    console.log("P(x) = 0 -> x =~ " + bisectionMethod((x) => P1.calculate(x), -4, 1.5))
}

function bisectionMethod(f, a, b) {
    if(a > b) throw "a greater than b";

    if(f(a) === 0) return a;
    if(f(b) === 0) return b;

    if(f(a)*f(b) >= 0) throw "There is no root between a and b"

    const absoluteError = 10 ** (-8);
    const k = Math.ceil( Math.log2((b-a)/absoluteError));

    let c;
    for(let i = 0; i <= k; i++) {
        c = (b+a)/2;

        if(f(a)*f(c) < 0) b = c;
        else if(f(c)*f(b) < 0) a = c;
    }

    return c;
}

class Polynomial {
    constructor(a) {
        if(a[a.length - 1] === 0) throw "Greatest coefficient equals zero";

        this.a = a;                    
        this.n = a.length;                    
        this.k = biggestIndexOfNegativeCoefficient(this.a);
        this.b = biggestNegativeCoefficient(this.a);
        this.l = LagrangeCoefficient(this.a, this.b, this.k);
    }

    calculate(x) {
        let r = 0;

        for(let i = 0; i < this.n; i++) {
            r += this.a[i] * (x ** i);
        }

        return r;
    }

    print() {
        let str = '';

        for(let i = 0; i < this.n; i++) {
            if(Math.abs(this.a[i]) !== 1) {
                str += `${Math.abs(this.a[i])}`;
            }
            if(i !== 0) {
                str += `X`;
                if(i !== 1) {
                    str += `${sup(i)}`;
                }
            }
            if(i < this.n -1) {
                str += this.a[i+1] >= 0 ? ' + ' : ' - ';
            }
        }

        return str;
    }
}

function LagrangeCoefficient(a, B, k) {
    const an = a[a.length - 1];
    return 1 + ((B/an) ** (1/(a.length-k)));
}

function biggestNegativeCoefficient(a) {
    const min = Math.min(...a);
    if(min >= 0) throw "No negative coefficient";
    return Math.abs(min);
}

function biggestIndexOfNegativeCoefficient(a) {
    for(let i = a.length - 1; i >= 0; i--) {
        if(a[i] < 0) return i+1;
    }

    return 0;
}

main();