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
        
        const app = await gradio.client("yisol/IDM-VTON");
        const result = await app.predict("/tryon", [		
            {"background": backgroundImage, "layers":[], "composite":null},
            garmentImage,
            "Hello!!",
            true,
            true,
            3,
            3
        ]);
        
        console.log(result);
        document.getElementById('result').innerText = JSON.stringify(result, null, 2);
    } catch (error) {
        console.error("Error:", error);
        document.getElementById('result').innerText = "An error occurred. Check the console for details.";
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const runModelBtn = document.getElementById('runModelBtn');
    runModelBtn.addEventListener('click', runModel);
});