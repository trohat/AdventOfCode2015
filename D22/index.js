console.log("AOC 2015 - Day 22: Wizard Simulator 20XX");

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

const task = (boss, task) => {
    const runSpellEffects = (armor, bossHP, mana, sTimer, pTimer, rTimer) => {
        if (sTimer > 0) {
            sTimer--;
            armor = 7;
        } 
        if (pTimer > 0) {
            pTimer--;
            bossHP -= 3;
        }
        if (rTimer > 0) {
            rTimer--;
            mana += 101;
        }

        return [ armor, bossHP, mana, sTimer, pTimer, rTimer ];
    };

    let states = new Set;
    let manasToWin = new Set;
    states.add("50-500-" + boss.hp + "-0-0-0-0");

    let steps = 0;
    while (states.size >0) {
        steps++;
        const newStates = new Set;
        for (const state of states) {

            //const newSpells = spells.filter(spell => spell.cost <= mana);
            
            for (const spell of spells) {
                let [ meHP, mana, bossHP, sTimer, pTimer, rTimer, usedMana ] = state.split("-").map(Number);

                if (task === "task2") {
                    meHP--;
                    if (meHP === 0) continue;
                }
            
                // spell effects 
                let armor = 0;
                [ armor, bossHP, mana, sTimer, pTimer, rTimer ] = runSpellEffects(armor, bossHP, mana, sTimer, pTimer, rTimer);
            
                if (bossHP <= 0) {
                    manasToWin.add(usedMana);
                    continue;
                }
                if (mana < spell.cost) continue;

                if (spell.name === "Shield" && sTimer > 0) continue;
                if (spell.name === "Poison" && pTimer > 0) continue;
                if (spell.name === "Recharge" && rTimer > 0) continue;

                usedMana += spell.cost;
                mana -= spell.cost;

                switch (spell.name) {
                    case "Magic Missile":
                        bossHP -= 4;
                        break;
                    case "Drain":
                        meHP += 2;
                        bossHP -= 2;
                        break;
                    case "Shield":
                        sTimer = spell.duration;
                        break;
                    case "Poison":
                        pTimer = spell.duration;
                        break;
                    case "Recharge":
                        rTimer = spell.duration;
                        break;
                    default:
                        console.error("Mistyped spell.");
                }

                // spell effects 
                armor = 0;
                [ armor, bossHP, mana, sTimer, pTimer, rTimer ] = runSpellEffects(armor, bossHP, mana, sTimer, pTimer, rTimer);

                if (bossHP <= 0) {
                    manasToWin.add(usedMana);
                    continue;
                }

                meHP -= boss.damage - armor;

                if (meHP <= 0) continue;

                newStates.add([ meHP, mana, bossHP, sTimer, pTimer, rTimer, usedMana ].join("-"));
            }
            
        }
        states = newStates;
        //console.log(steps, states);
        //console.log(Array.from(manasToWin).sort((a,b) => a-b).join("-"));
    }
    return Array.from(manasToWin).sort((a,b) => a-b)[0];
};

inputdata = prepare(splitLines(inputdata));

console.log(inputdata);

console.log("");

console.time("Task 1");
console.log("Task 1: " + task(inputdata));
console.timeEnd("Task 1");

console.log("");

console.time("Task 2");
console.log("Task 2: " + task(inputdata, "task2"));
console.timeEnd("Task 2");