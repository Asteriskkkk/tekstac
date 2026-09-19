let TV = {
    name: "TV",
    status: "OFF"
};

let Lamp = {
    name: "Lamp",
    status: "OFF"
};

let Oven = {
    name: "Oven",
    status: "OFF"
};

function turnOnAppliance(appliance) {
    try {
        if (appliance.status === "ON") {
            throw new Error(appliance.name + " is already ON");
        }

        appliance.status = "ON";
        return appliance.name + " turned ON successfully";
    } catch (error) {
        return error.message;
    } finally {
        console.log("Operation completed");
    }
}

function turnOffAppliance(appliance) {
    try {
        if (appliance.status === "OFF") {
            throw new Error(appliance.name + " is already OFF");
        }

        appliance.status = "OFF";
        return appliance.name + " turned OFF successfully";
    } catch (error) {
        return error.message;
    } finally {
        console.log("Operation completed");
    }
}

console.log(turnOnAppliance(TV));
console.log(turnOnAppliance(Lamp));
console.log(turnOnAppliance(Oven));

console.log(turnOffAppliance(TV));
console.log(turnOffAppliance(Lamp));
console.log(turnOffAppliance(Oven));

console.log(turnOffAppliance(TV));