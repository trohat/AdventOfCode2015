console.log("AOC 2015 - Day 21: RPG Simulator 20XX");

const splitLines = data => data.split(String.fromCharCode(10));

const prepare = data => {
    const re = /^(.*): (\d+)$/;
    let boss = {};
    for (const line of data) {
        let [ , property, size ] = re.exec(line);
        property = property.toLowerCase();
        if (property === "hit points") property = "hp";
        boss[property] = +size;
    }
    return boss;
};

const prepare2 = data => {
    const re = /^([\w+\d ]+)\s+(\d+)\s+(\d+)\s+(\d+)$/;
    const items = [];
    for (const item of data) {
        const [ , name, cost, damage, armor ] = re.exec(item);
        items.push({ name: name.trim(), cost: +cost, damage: +damage, armor: +armor});
    }
    return items;
};

const task = (boss, weapons, armor, rings, task) => {

    const simulateFight = (me, boss) => {
        boss = { ...boss};

        while (true) {
            let damage = me.damage - boss.armor > 1 ? me.damage - boss.armor : 1;
            boss.hp -= damage;
            if (boss.hp <= 0) return true;
            damage = boss.damage - me.armor > 1 ? boss.damage - me.armor : 1;
            me.hp -= damage;
            if (me.hp <= 0) return false;
        }
    }

    //me = { hp: 8, armor: 5, damage: 5};
    //boss = { hp: 12, armor: 2, damage: 7};
    //simulateFight(me, boss);
    
    armor.push({ name: "none", damage: 0, armor: 0, cost: 0});
    rings.push({ name: "none", damage: 0, armor: 0, cost: 0});
    rings.push({ name: "none", damage: 0, armor: 0, cost: 0});

    let cheapest = 10e10;
    let mostExpensive = 0;
    
    for (const weapon of weapons) {
        for (const myArmor of armor) {
            for (const ring1 of rings) {
                for (const ring2 of rings) {
                    if (ring1 === ring2) continue;
                    const me = { hp: 100, armor: 0, damage: 0};
                    me.armor += myArmor.armor + ring1.armor + ring2.armor;
                    me.damage += weapon.damage + ring1.damage + ring2.damage;
                    const totalCost = weapon.cost + myArmor.cost + ring1.cost + ring2.cost;
                    if (simulateFight(me, boss)) {
                        if (totalCost < cheapest) cheapest = totalCost;
                    } else {
                        if (totalCost > mostExpensive) mostExpensive = totalCost;
                    }
                }
            }
        }
    }
    if (task === "task2") return mostExpensive;
    return cheapest;
};

let testdata = ``;

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

weapons = prepare2(splitLines(weapons));

console.log(weapons);

armor = prepare2(splitLines(armor));

console.log(armor);

rings = prepare2(splitLines(rings));

console.log(rings);

console.log("");

console.time("Task 1");
console.log("Task 1: " + task(inputdata, weapons, armor, rings));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata, weapons, armor, rings, "task2"));
console.timeEnd("Task 2");