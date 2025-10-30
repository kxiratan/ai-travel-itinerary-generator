document.getElementById("userInputForm").addEventListener("submit", function(event) {
    event.preventDefault();

    const activitySelect = document.getElementById("activity")
    const selectedActivities = [];
    for (let i = 0; i < activitySelect.options.length; i++) {
        if (activitySelect.options[i].selected) {
            selectedActivities.push(activitySelect.options[i].value);
        }
    }

    const foodSelect = document.getElementById("food");
    const selectedFoods = [];
    for (let i = 0; i < foodSelect.options.length; i++) {
        if (foodSelect.options[i].selected) {
            selectedFoods.push(foodSelect.options[i].value);
        }
    }

    const userData = {
        origin: document.getElementById("origin").value,
        destination: document.getElementById("destination").value,
        start: document.getElementById("start").value,
        end: document.getElementById("end").value,
        numPeople: document.getElementById("numPeople").value,
        activity: selectedActivities,
        food: selectedFoods    
    };

    console.log("user data: ", userData)
});
