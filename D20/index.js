console.log("AOC 2015 - Day 20: Infinite Elves and Infinite Houses");

const factorizeToPrimes = number => {
    const primes = new Map;
    let i = 2;
    while (i <= number) {
        if (number % i === 0) {
            if (primes.has(i)) primes.set(i, primes.get(i) + 1);
            else (primes.set(i,1));
            number = number / i;
        } else i++;
    }
    return primes;
};

const sumDivisors = n => {
    let upperBorder = Math.sqrt(n);
    let sum = 1 + n;
    for (let i = 2; i < upperBorder; i++) {
        if (n % i === 0) sum += i + n / i;
    }
    if (n % upperBorder === 0) sum += upperBorder;
    return sum;
};

const logDivisors = n => {
    let upperBorder = Math.sqrt(n);
    let divisors = [ 1 , n];
    for (let i = 2; i < upperBorder; i++) {
        if (n % i === 0) divisors.push(i, n / i);
    }
    if (n % upperBorder === 0) divisors.push(upperBorder);
    return divisors.sort((a,b) => a-b);
};

const sumDivisors2 = n => {
    const primes = factorizeToPrimes(n);
    let product = 1;
    for (const [ prime, exponent ] of primes) {
        let factor = 0;
        for (let i = 0; i <= exponent; i++) factor += prime ** i;
        product *= factor;
    }
    return product;
}

const sumDivisorsWith50Limit = n => {
    let upperBorder = Math.sqrt(n);
    let sum = n;
    for (let i = 2; i < upperBorder; i++) {
        if (n % i === 0) {
            if (i * 50 >= n) sum += i;
            if (n / i * 50 >= n) sum += n / i;
        }
    }
    if (n % upperBorder === 0 && upperBorder < 50) sum += upperBorder;
    return sum;
};


const task1 = presents => {
    presents /= 10;
    for (let i = 0;; i++) {
        if (sumDivisors(i) >= presents) return i;
    }
};

const task2 = presents => {
    presents /= 11;
    for (let i = 0;; i++) {
        if (sumDivisorsWith50Limit(i) >= presents) return i;
    }
};

console.log("");

doEqualTest(task1(150), 8);

console.time("Task 1");
console.log("Task 1: " + task1(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task2(inputdata));
console.timeEnd("Task 2");

//console.time("1");
//sumDivisors2(665280)
//console.timeEnd("1");
//
//console.time("2");
//sumDivisors2(665280)
//console.timeEnd("2");