console.log("AOC 2015 - Day 11: Corporate Policy");

const task = password => {
    const next = password => {
        newPassword = "";
        for (let i = password.length - 1; i >= 0; i--) {
            if (password[i] === "z") newPassword = "a" + newPassword;
            else {
                newPassword = password.slice(0, i) + String.fromCharCode(password.charCodeAt(i) + 1) + newPassword;
                return newPassword;
            }
        }
    };

    const isValid = password => {
        if (password.indexOf("i") !== -1) return false;
        if (password.indexOf("o") !== -1) return false;
        if (password.indexOf("l") !== -1) return false;
        let increasing = false;
        for (let i = 0; i < password.length - 2; i++) {
            if (password.charCodeAt(i) === password.charCodeAt(i+1) - 1 && password.charCodeAt(i) === password.charCodeAt(i+2) - 2) increasing = true;
        }
        let pairs = "";
        for (let i = 0; i < password.length - 1; i++) {
            if (password[i] === password[i+1]) pairs += password[i];
        }
        return increasing && new Set(pairs).size > 1;
    };

    while (true) {
        password = next(password);
        if (isValid(password)) return password;
    }
};

console.log("");

console.time("Task 1");
console.log("Task 1:", inputdata = task(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata));
console.timeEnd("Task 2");