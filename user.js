
function setUserName() {
    const username = localStorage.getItem('loggedInUser') || 'User';  // Default to 'User' if not set
    document.getElementById('username').innerText = username;
}
function downloadReport() {
      const { jsPDF } = window.jspdf;
      const doc = new jsPDF();

      // Get the values from the page
      const username = document.getElementById('username').innerText;
      const address = document.getElementById('userAddress').innerText;
      const batteryStatus = document.getElementById('batteryStatus').innerText;
      const deviceStatus = document.getElementById('deviceStatus').innerText;
      const heartRate = document.getElementById('heartRate').innerText;
      const stressLevel = document.getElementById('stressLevel').innerText;
      const bodyTemp = document.getElementById('bodyTemp').innerText;
      const glucoseAlert = document.getElementById('glucoseAlert').innerText;
      const stressAlert = document.getElementById('stressAlert').innerText;

      // Document title and formatting
      doc.setFontSize(22);
      doc.text("Patient Health Monitoring Report", 105, 20, null, null, "center");

      // Patient Information Section
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 128);
      doc.text("Patient Information", 20, 40);
      doc.setLineWidth(0.5);
      doc.line(20, 42, 190, 42); // Add a line separator

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Name: ${username}`, 20, 50);
      doc.text(`Address: ${address}`, 20, 60);

      // Device Status Section
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 128);
      doc.text("Device Status", 20, 80);
      doc.line(20, 82, 190, 82); // Line separator

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Battery Status: ${batteryStatus}`, 20, 90);
      doc.text(`Device Status: ${deviceStatus}`, 20, 100);

      // Monitoring Data Section
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 128);
      doc.text("Health Monitoring Data", 20, 120);
      doc.line(20, 122, 190, 122); // Line separator

      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(`Heart Rate: ${heartRate}`, 20, 130);
      doc.text(`Stress Level: ${stressLevel}`, 20, 140);
      doc.text(`Body Temperature: ${bodyTemp}`, 20, 150);

      // Alerts Section
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 128);
      doc.text("Alerts", 20, 170);
      doc.line(20, 172, 190, 172); // Line separator

      doc.setFontSize(12);
      doc.setTextColor(255, 0, 0); // Red color for alerts
      doc.text(`Glucose Alert: ${glucoseAlert}`, 20, 180);
      doc.text(`Stress Alert: ${stressAlert}`, 20, 190);

      // Save the PDF with a custom file name
      doc.save(`${username}_Health_Report.pdf`);
  }

function simulateMonitor() {
    // Simulate battery check
    const batteryLevel = Math.floor(Math.random() * 100) + 1;
    document.getElementById('batteryStatus').innerText = `Battery: ${batteryLevel}%`;

    // Simulate heart rate, stress, and body temp monitoring
    const heartRate = Math.floor(Math.random() * 40) + 60; // Heart rate between 60 and 100 bpm
    const stress = Math.floor(Math.random() * 10); // Stress level between 0 and 10
    const bodyTemp = (Math.random() * 2 + 36.5).toFixed(1); // Body temp between 36.5°C and 38.5°C

    document.getElementById('heartRate').innerText = `Heart Rate: ${heartRate} bpm`;
    document.getElementById('stressLevel').innerText = `Stress: ${stress}`;
    document.getElementById('bodyTemp').innerText = `Body Temp: ${bodyTemp}°C`;

    // Check glucose level after detecting eating activity
    const eatingDetected = Math.random() < 0.5; // Randomly detect eating activity
    if (eatingDetected) {
        checkGlucoseLevel();
    } else {
        checkStressLevel(stress);
    }

    // Battery power management
    if (batteryLevel < 20) {
        document.getElementById('deviceStatus').innerText = 'Device: Low Battery - Entering Power Saving Mode';
    } else {
        document.getElementById('deviceStatus').innerText = 'Device: Normal Operation';
    }
}
function checkGlucoseLevel() {
    const glucoseLevel = Math.floor(Math.random() * 200) + 50; // Glucose between 50 and 250 mg/dL
    const glucoseStatus = glucoseLevel > 140 ? 'High' : glucoseLevel < 70 ? 'Low' : 'Normal';
    document.getElementById('glucoseAlert').innerText = `Glucose Level: ${glucoseStatus}`;
}
function checkStressLevel(stress) {
    const stressStatus = stress > 7 ? 'High Stress' : 'Normal Stress';
    document.getElementById('stressAlert').innerText = `Stress Level: ${stressStatus}`;
}

function fetchUserData() {
    const currentUser = JSON.parse(localStorage.getItem('user'));
    
    if (!currentUser) {
        window.location.href = 'login.html'; // Redirect to login if no user is logged in
    } else if (currentUser.role !== 'user') {
        window.location.href = 'login.html'; // Redirect to login if the user is not a regular user
    } else {
        // Fetch the user's own details (assuming the user is stored locally or can be fetched from a source)
        fetch('users.json')
            .then(response => response.json())
            .then(data => {
                const loggedInUser = currentUser.username; // Get the logged-in user's username from localStorage
                const user = data.users.find(user => user.username === loggedInUser); // Find the logged-in user in the data

                if (user) {
                    // Show user details on the page
                    document.getElementById('userName').innerText = `Name: ${user.personDetails.name}`;
                    const userAddress = user.personDetails.address ? user.personDetails.address : 'Address: Not Available';
                    document.getElementById('userAddress').innerText = `Address: ${userAddress}`;
                } else {
                    window.location.href = 'login.html';
                }
            })
            .catch(error => {
                console.error('Error fetching user data:', error);
            });
    }
}
window.onload = () => {
    setUserName();
    fetchUserData();
};

  // Function to download the health report as a PDF

  // Log out function (to be implemented)
  function logOut() {
      window.location.href = "login.html";  // Change this to the appropriate logout URL
  }


  