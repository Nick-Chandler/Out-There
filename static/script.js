
document.addEventListener("DOMContentLoaded", function () {
    
    const states = [
        "All","Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
        "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
        "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
        "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
        "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
        "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
        "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
    ];

    const stateSelect = document.getElementById("state");

    states.forEach(state => {
        const option = document.createElement("option");
        option.value = state;
        option.textContent = state;
        stateSelect.appendChild(option);
    });

    const ageLowerSelect = document.getElementById("age-lower");
    const ageHigherSelect = document.getElementById("age-higher");

    // Generate age options from 18 to 99
    for (let age = 18; age <= 99; age++) {
        const lowerOption = document.createElement("option");
        lowerOption.value = age;
        lowerOption.textContent = age;
        ageLowerSelect.appendChild(lowerOption);

        const higherOption = document.createElement("option");
        higherOption.value = age;
        higherOption.textContent = age;
        ageHigherSelect.appendChild(higherOption);
    }

    ageHigherSelect.value = 99; // Set default value for age higher select


    const incomeSlider = document.getElementById("min-income-slider");
    const incomeSliderVal = document.getElementById("min-income-value");

    incomeSlider.addEventListener("input", function () {
        if (incomeSlider.value == 500000) 
            incomeSliderVal.textContent = "500,000+";
        else 
            incomeSliderVal.textContent = String(incomeSlider.value);
    });

    const race = document.getElementById("race");
    const allPreferenceOption = document.getElementById("all-preference");
    const raceOptions = race.querySelectorAll('input[name="race"]:not(#all-preference)');

    race.addEventListener("change", function () {
        if (allPreferenceOption.checked) {
            // If "No preference" is selected, uncheck all other options
            raceOptions.forEach(option => option.checked = false);
        } else {
            // If any other option is selected, uncheck "No preference"
            allPreferenceOption.checked = false;
        }

    });

    const minHeightSlider = document.getElementById("min-height-slider");
    const minHeightValue = document.getElementById("min-height-value");

    minHeightSlider.addEventListener("input", function () {
        const totalInches = parseInt(minHeightSlider.value, 10);
        const feet = Math.floor(totalInches / 12); // Convert inches to feet
        const inches = totalInches % 12; // Remainder is inches
        minHeightValue.textContent = `${feet} ft ${inches} in`;

        if (totalInches == 77) 
            minHeightValue.textContent = "6 ft 5 in+";
    });

    const maxHeightSlider = document.getElementById("max-height-slider");
    const maxHeightValue = document.getElementById("max-height-value");

    maxHeightSlider.addEventListener("input", function () {
        const totalInches = parseInt(maxHeightSlider.value, 10);
        const feet = Math.floor(totalInches / 12); // Convert inches to feet
        const inches = totalInches % 12; // Remainder is inches
        maxHeightValue.textContent = `${feet} ft ${inches} in`;

        if (totalInches == 77) 
            maxHeightValue.textContent = "6 ft 5 in+";
    });
    
});

function getSliderValues() {
    console.log("Getting slider values...");
    const minIncomeSlider = document.getElementById("min-income-slider");
    const minHeightSlider = document.getElementById("min-height-slider");
    const maxHeightSlider = document.getElementById("max-height-slider");

    return {
        minIncome: minIncomeSlider ? minIncomeSlider.value : null,
        minHeight: minHeightSlider ? minHeightSlider.value : null,
        maxHeight: maxHeightSlider ? maxHeightSlider.value : null,
    };
}

function getDropdownValues() {
    console.log("Getting dropdown values...");
    const genderDropdown = document.getElementById("gender");
    const stateDropdown = document.getElementById("state");
    const ageLowerDropdown = document.getElementById("age-lower");
    const ageHigherDropdown = document.getElementById("age-higher");
    const educationDropdown = document.getElementById("education");

    return {
        gender: genderDropdown ? genderDropdown.value : null,
        state: stateDropdown ? stateDropdown.value : null,
        ageLower: ageLowerDropdown ? ageLowerDropdown.value : null,
        ageHigher: ageHigherDropdown ? ageHigherDropdown.value : null,
        education: educationDropdown ? educationDropdown.value : null,
    };
}

function getRadioValues() {
    console.log("Getting radio values...");
    const raceRadios = document.querySelectorAll('input[name="race"]');
    const politicsRadios = document.querySelectorAll('input[name="politics"]');

    let selectedRace = null;
    raceRadios.forEach(radio => {
        if (radio.checked) {
            selectedRace = radio.value;
        }
    });

    let selectedPolitics = null;
    politicsRadios.forEach(radio => {
        if (radio.checked) {
            selectedPolitics = radio.value;
        }
    });

    return {
        selectedRace,
        selectedPolitics,
    };
}

function generateUrl(data) {
    const {
        gender,
        state,
        ageLower,
        ageHigher,
        minIncome,
        selectedRace,
        minHeight,
        maxHeight,
        education,
        selectedPolitics,
    } = data;

    // Construct the URL string
    const url = `/standards/results/${gender}/${state}/${ageLower}/${ageHigher}/${minIncome}/${selectedRace}/${minHeight}/${maxHeight}/${education}/${selectedPolitics}/`;

    return url;
}

function getResults() {
    console.log("Getting results...");

    // Call helper functions
    const sliderValues = getSliderValues();
    console.log("Finished getting slider values...");
    const dropdownValues = getDropdownValues();
    console.log("Finished getting dropdown values...");
    const radioValues = getRadioValues();
    console.log("Finished getting radio values...");

    // Combine all results into one object
    const data = {
        ...sliderValues,
        ...dropdownValues,
        ...radioValues,
    };

    let url = generateUrl(data);
    console.log("Generated URL: ", url);
    window.location.href = url;
    return url;
}
