// Function that auto selects <select> on split view on load
window.onload = function() {
    // Set the select element to the default value
    document.getElementById('select_split').value = 'select_split';
    // Hide all workout tables when the page reloads
    document.getElementById('ppl_table').style.display = 'none';
    document.getElementById('fullbody_table').style.display = 'none';
    document.getElementById('upperlower_table').style.display = 'none';
    document.getElementById('Max_Split').style.display = 'none';
};

// Function for only showing the selected split
function select_Workout(value) {
    // Hide all workout tables
    document.getElementById('ppl_table').style.display = 'none';
    document.getElementById('fullbody_table').style.display = 'none';
    document.getElementById('upperlower_table').style.display = 'none';
    document.getElementById('Max_Split').style.display = 'none';

    // Show selected table
    if (value === 'PPL') {
        document.getElementById('ppl_table').style.display = 'block';
    } else if (value === 'Full Body') {
        document.getElementById('fullbody_table').style.display = 'block';
    } else if (value === 'Upper/Lower') {
        document.getElementById('upperlower_table').style.display = 'block';
    } else if (value === 'Max_Split') {
        document.getElementById('Max_Split').style.display = 'block';
    }
}

// Workout Plan Generator
// athering user inputs
function generateWorkoutSplit() {
    let hours = document.getElementById('hours').value;
    let goal = document.getElementById('goal').value;

    // Get all selected days
    let selectedDays = Array.from(document.querySelectorAll('input[name="workoutDays"]:checked')).map(checkbox => checkbox.value);
    let days = selectedDays.length; // Number of selected days

    if (days === 0) {
        alert("Please select at least one day for your workouts.");
        return;
    }

    // Call your algorithm function with these inputs
    let result = suggestSplit(days, hours, goal, selectedDays);

    // Display the result table
    document.getElementById('result').innerHTML = result;

    // Create the CSV data from the table
    let csvContent = createCSV(result);

    // Create a download button
    let downloadButton = document.createElement('a');
    downloadButton.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    downloadButton.download = 'workout_split.csv';
    downloadButton.innerHTML = 'Download Workout Split';

    // Append the download button to the page
    document.getElementById('result').appendChild(downloadButton);
}

function suggestSplit(days, hours, goal, selectedDays) {
    let tableHTML = '<table><tr><th>Day</th><th>Workout</th></tr>';
    //will change to specific 7 day plan
    //will add option for specific days
    //to do: days <=7, <=6 and so forth
    //Change goal to emphasis, add specific muscles or regions
    if (goal === 'build muscle' && days === '1' && hours === '1') {
        tableHTML += `<tr><td>${selectedDays[0]}</td><td>Full-body workout</td></tr>`;
    } else if (goal === 'build muscle' && days === '1' && hours === '1-2') {
        tableHTML += `<tr><td>${selectedDays[0]}</td><td>Rest</td></tr>`;
        tableHTML += `<tr><td>${selectedDays[1]}</td><td>Full-body workout</td></tr>`;
        tableHTML += `<tr><td>${selectedDays[2]}</td><td>Rest</td></tr>`;
    } else if (goal === 'build muscle' && days === '1' && hours === '2-3') {
        tableHTML += `<tr><td>${selectedDays[0]}</td><td>Chest / Triceps</td></tr>`;
        tableHTML += `<tr><td>${selectedDays[1]}</td><td>Back / Biceps</td></tr>`;
        tableHTML += `<tr><td>${selectedDays[2]}</td><td>Legs</td></tr>`;
    } else if (goal === 'lose weight' && days === '1' && hours === '2-3') {
        tableHTML += `<tr><td>${selectedDays[0]}</td><td>Full-Body Workout</td></tr>`;
        tableHTML += `<tr><td>${selectedDays[1]}</td><td>Rest</td></tr>`;
        tableHTML += `<tr><td>${selectedDays[2]}</td><td>Cardio</td></tr>`;
    } else if (goal === 'lose weight' && days === '1' && hours === '1') {
        tableHTML += `<tr><td>${selectedDays[0]}</td><td>Upper Body</td></tr>`;
        tableHTML += `<tr><td>${selectedDays[1]}</td><td>Lower Body</td></tr>`;
    } else {
        selectedDays.forEach((day, index) => {
            tableHTML += `<tr><td>${day}</td><td>Workout for Day ${index + 1}</td></tr>`;
        });
    }

    tableHTML += '</table>';
    return tableHTML;
}

function createCSV(tableHTML) {
    let rows = tableHTML.match(/<tr>(.*?)<\/tr>/g).map(row => 
        row.replace(/<\/?(tr|td|th)>/g, '').split('</td><td>').join(',')
    );
    return rows.join('\n');
}
