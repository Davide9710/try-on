import { client } from './gradio-client.js';

window.gr = { Client: client };

document.addEventListener('DOMContentLoaded', () => {
    async function runModel() {
        try {
            const backgroundInput = document.getElementById('backgroundImage');
            const garmentInput = document.getElementById('garmentImage');
            
            if (!backgroundInput.files[0] || !garmentInput.files[0]) {
                alert("Please upload both images.");
                return;
            }

            const backgroundImage = backgroundInput.files[0];
            const garmentImage = garmentInput.files[0];

            const app = await gr.Client("yisol/IDM-VTON");
            const result = await app.predict("/tryon", [
                {"background": backgroundImage, "layers":[], "composite":null},
                garmentImage,
                "Hello!!",
                true,
                true,
                20,
                3
            ]);

            console.log(result);
            // Fetch the image from the URL
            const response = await fetch(result.data[0].url);
            const blob = await response.blob();

            // Create an <img> element
            const imgElement = document.createElement('img');
            imgElement.src = URL.createObjectURL(blob);

            // Clear previous content and append the image to the result element
            const resultElement = document.getElementById('result');
            resultElement.innerHTML = ''; // Clear previous content
            resultElement.appendChild(imgElement);

        } catch (error) {
            console.error("Error:", error);
            document.getElementById('result').innerText = "An error occurred. Check the console for details.";
        }
    }

    const runModelBtn = document.getElementById('runModelBtn');
    runModelBtn.addEventListener('click', runModel);
});
