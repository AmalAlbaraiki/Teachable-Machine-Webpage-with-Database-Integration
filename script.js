let model;
let videoElement = document.getElementById('video');
let detectionCount = 0;
let detectionCountElement = document.getElementById('detectionCount');

// Load the model from Teachable Machine
async function loadModel() {
    const modelURL = 'model/model.json';  // Your model URL
    model = await tmImage.load(modelURL);
    detectFrame();
}

// Set up the camera
navigator.mediaDevices.getUserMedia({ video: true }).then(stream => {
    videoElement.srcObject = stream;
});

// Detect objects
async function detectFrame() {
    const prediction = await model.predict(videoElement);
    const topPrediction = prediction[0];

    if (topPrediction.probability > 0.8) {
        simulateDetection(topPrediction.className); // Replace simulateDetection with your code
    }

    requestAnimationFrame(detectFrame); // Keep detecting for each frame
}

// Update the counter when a detection occurs
function simulateDetection(className) {
    detectionCount++;
    detectionCountElement.textContent = detectionCount;

    // Send the class name to the database
    fetch('update_counter.php', {
        method: 'POST',
        body: new URLSearchParams({
            'detection_count': detectionCount,
            'class_name': className
        })
    })
    .then(response => response.json())
    .then(data => console.log('Counter updated:', data))
    .catch(error => console.error('Error updating counter:', error));
}

// Reset the detection counter
function resetCounter() {
    detectionCount = 0;
    detectionCountElement.textContent = detectionCount;
}
loadModel();  // Load the model when the page loads
