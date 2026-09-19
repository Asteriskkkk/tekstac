let TV = {
    name: "TV",
    isTurnedOn: false
};

let Lamp = {
    name: "Lamp",
    isTurnedOn: false
};

let Oven = {
    name: "Oven",
    isTurnedOn: false
};


function turnOnAppliance(appliance) {
    try {
        if (appliance.isTurnedOn === true) {
            throw new Error(appliance.name + " is already ON");
        }

        appliance.isTurnedOn = true;
        return appliance.name + " turned ON successfully";

    } catch (error) {
        return error.message;

    } finally {
        console.log("Operation completed");
    }
}


function turnOffAppliance(appliance) {
    try {
        if (appliance.isTurnedOn === false) {
            throw new Error(appliance.name + " is already OFF");
        }

        appliance.isTurnedOn = false;
        return appliance.name + " turned OFF successfully";

    } catch (error) {
        return error.message;

    } finally {
        console.log("Operation completed");
    }
}


// Test
console.log(turnOnAppliance(TV));
console.log(turnOnAppliance(Lamp));
console.log(turnOnAppliance(Oven));

console.log(turnOffAppliance(TV));
console.log(turnOffAppliance(Lamp));
console.log(turnOffAppliance(Oven));

console.log(turnOffAppliance(TV));