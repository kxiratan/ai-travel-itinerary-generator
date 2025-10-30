// ============================================
// FRONTEND SCRIPT - User Interface Logic
// ============================================
// This runs in the browser and handles:
// 1. Collecting form data
// 2. Sending it to our backend server
// 3. Displaying the generated itinerary

document.getElementById("userInputForm").addEventListener("submit", async function(event) {
    // Prevent the form from refreshing the page
    event.preventDefault();

    // Step 1: Collect selected activities
    const activitySelect = document.getElementById("activity")
    const selectedActivities = [];
    for (let i = 0; i < activitySelect.options.length; i++) {
        if (activitySelect.options[i].selected) {
            selectedActivities.push(activitySelect.options[i].value);
        }
    }

    // Step 2: Collect selected food preferences
    const foodSelect = document.getElementById("food");
    const selectedFoods = [];
    for (let i = 0; i < foodSelect.options.length; i++) {
        if (foodSelect.options[i].selected) {
            selectedFoods.push(foodSelect.options[i].value);
        }
    }

    // Step 3: Create the userData object with all form values
    const userData = {
        origin: document.getElementById("origin").value,
        destination: document.getElementById("destination").value,
        start: document.getElementById("start").value,
        end: document.getElementById("end").value,
        numPeople: document.getElementById("numPeople").value,
        activity: selectedActivities,
        food: selectedFoods
    };

    console.log("User data collected:", userData);

    // Step 4: Show loading state
    const resultDiv = document.getElementById("itineraryResult");
    const loadingDiv = document.getElementById("loadingMessage");
    const errorDiv = document.getElementById("errorMessage");

    // Hide previous results and errors
    resultDiv.style.display = "none";
    errorDiv.style.display = "none";
    // Show loading message
    loadingDiv.style.display = "block";

    try {
        // Step 5: Send data to our backend server
        // fetch() is the modern way to make HTTP requests in JavaScript
        console.log("Sending request to backend...");
        const response = await fetch('/generate-itinerary', {
            method: 'POST', // We're sending data
            headers: {
                'Content-Type': 'application/json', // We're sending JSON
            },
            body: JSON.stringify(userData) // Convert userData object to JSON string
        });

        // Step 6: Check if the request was successful
        if (!response.ok) {
            throw new Error('Failed to generate itinerary');
        }

        // Step 7: Parse the response
        const data = await response.json();
        console.log("Received itinerary from backend!");

        // Step 8: Display the itinerary
        loadingDiv.style.display = "none";
        resultDiv.innerHTML = formatItinerary(data.itinerary);
        resultDiv.style.display = "block";

        // Scroll to the result
        resultDiv.scrollIntoView({ behavior: 'smooth' });

    } catch (error) {
        // If anything goes wrong, show an error message
        console.error("Error:", error);
        loadingDiv.style.display = "none";
        errorDiv.textContent = "Sorry, there was an error generating your itinerary. Please try again.";
        errorDiv.style.display = "block";
    }
});

// ============================================
// HELPER FUNCTION: Format Itinerary
// ============================================
// This converts the AI's text response into nicely formatted HTML
function formatItinerary(text) {
    // Convert line breaks to HTML and add some basic formatting
    // You can enhance this to add more sophisticated formatting!
    return text
        .split('\n')
        .map(line => {
            // Make headers bold (lines that start with ** or #)
            if (line.startsWith('**') || line.startsWith('#')) {
                return `<h3>${line.replace(/\*\*/g, '').replace(/#/g, '')}</h3>`;
            }
            // Regular lines become paragraphs
            return line ? `<p>${line}</p>` : '';
        })
        .join('');
}
