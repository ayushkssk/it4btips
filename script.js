// script.js

// Function to update the generated market tip display
function updateGeneratedTip(data) {
    const riskClass = data.riskLevel; // Get the risk level from the form input
    const riskText = riskClass === 'risky' ? 'Risky' : 'Safe';

    // Check for duplicate tips
    const existingTips = document.querySelectorAll('.tip');
    for (let tip of existingTips) {
        if (
            tip.dataset.companyName === data.companyName &&
            tip.dataset.currentPrice === data.currentPrice &&
            tip.dataset.targetPrice === data.targetPrice &&
            tip.dataset.stoploss === data.stoploss &&
            tip.dataset.duration === data.duration &&
            tip.dataset.riskLevel === data.riskLevel
        ) {
            alert("Already Added. If you want to edit, please click on edit.");
            return; // Prevent duplicate entry
        }
    }

    const tipHTML = `
        <div class="tip" 
             data-company-name="${data.companyName}" 
             data-current-price="${data.currentPrice}" 
             data-target-price="${data.targetPrice}" 
             data-stoploss="${data.stoploss}" 
             data-duration="${data.duration}" 
             data-risk-level="${data.riskLevel}">
            <button class="edit-button" onclick="editTip(this)">Edit</button>
            <span class="risk-indicator ${riskClass}">${riskText}</span>
            <strong>Company Name:</strong> ${data.companyName} <br>
            <strong>Current Market Price:</strong> ${data.currentPrice} <br>
            <strong>Expected Target Price:</strong> ${data.targetPrice} <br>
            <strong>Stoploss:</strong> ${data.stoploss} <br>
            <strong>Duration:</strong> ${data.duration}
        </div>
    `;

    // Append the new tip to the output section
    document.getElementById("outputSection").insertAdjacentHTML('beforeend', tipHTML);

    // Adjusting the height dynamically to ensure full visibility
    adjustLayout();
}

// Function to adjust the layout dynamically
function adjustLayout() {
    const outputSection = document.getElementById("outputSection");
    const headerSection = document.querySelector(".header-section");

    // Increase header section height based on content
    if (outputSection.style.display === 'block') {
        headerSection.style.minHeight = (headerSection.scrollHeight + 100) + 'px';
    }
}

// Function to edit a tip
function editTip(button) {
    const tipDiv = button.parentElement;

    // Move cursor to input fields for editing
    document.getElementById("companyName").value = tipDiv.dataset.companyName;
    document.getElementById("currentPrice").value = tipDiv.dataset.currentPrice;
    document.getElementById("targetPrice").value = tipDiv.dataset.targetPrice;
    document.getElementById("stoploss").value = tipDiv.dataset.stoploss;
    document.querySelector("input[name='duration']").value = tipDiv.dataset.duration;
    document.getElementById("riskLevel").value = tipDiv.dataset.riskLevel;

    // Scroll to top to edit fields
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Event listener for form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way

    let companyName = document.getElementById("companyName").value;
    let currentPrice = document.getElementById("currentPrice").value;
    let targetPrice = document.getElementById("targetPrice").value;
    let stoploss = document.getElementById("stoploss").value;
    let duration = document.querySelector("input[name='duration']").value;
    let riskLevel = document.getElementById("riskLevel").value;

    // Create an object with the form data
    let marketTipData = {
        companyName: companyName,
        currentPrice: currentPrice,
        targetPrice: targetPrice,
        stoploss: stoploss,
        duration: duration,
        riskLevel: riskLevel
    };

    // Update the output section to display the formatted market tip
    updateGeneratedTip(marketTipData);
});

// Event listener to clear all tips
document.getElementById("clearData").addEventListener("click", function() {
    document.getElementById("outputSection").innerHTML = ""; // Clear all tips
    adjustLayout(); // Reset layout
});