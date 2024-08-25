// script.js

// Function to update the generated market tip display
function updateGeneratedTip(data) {
    const generatedTip = `
        <strong>Company Name:</strong> ${data.companyName} <br>
        <strong>Current Market Price:</strong> ${data.currentPrice} <br>
        <strong>Expected Target Price:</strong> ${data.targetPrice} <br>
        <strong>Stoploss:</strong> ${data.stoploss} <br>
        <strong>Duration:</strong> ${data.duration}
    `;

    document.getElementById("generatedTip").innerHTML = generatedTip;
    document.getElementById("outputSection").style.display = 'block'; // Show the output section

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

// Event listener for form submission
document.getElementById("contactForm").addEventListener("submit", function(event) {
    event.preventDefault(); // Prevent form from submitting in the traditional way

    let companyName = document.getElementById("companyName").value;
    let currentPrice = document.getElementById("currentPrice").value;
    let targetPrice = document.getElementById("targetPrice").value;
    let stoploss = document.getElementById("stoploss").value;
    let duration = document.querySelector("input[name='duration']").value;

    // Create an object with the form data
    let marketTipData = {
        companyName: companyName,
        currentPrice: currentPrice,
        targetPrice: targetPrice,
        stoploss: stoploss,
        duration: duration
    };

    // Update the output section to display the formatted market tip
    updateGeneratedTip(marketTipData);
});

// Event listener to clear displayed data
document.getElementById("clearData").addEventListener("click", function() {
    document.getElementById("generatedTip").innerHTML = "";
    document.getElementById("outputSection").style.display = 'none'; // Hide the output section

    // Reset header section height dynamically
    adjustLayout();
});