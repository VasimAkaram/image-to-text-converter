const imageInput = document.getElementById('image-input');
const previewImage = document.getElementById('preview-image');
const convertBtn = document.getElementById('convert-btn');
const output = document.getElementById('output');
const loader = document.getElementById('loader');

// Preview the selected image
imageInput.addEventListener('change', function () {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            previewImage.src = event.target.result;
        };
        reader.readAsDataURL(file);
    }
});

// Convert image to text using Tesseract.js
convertBtn.addEventListener('click', function () {
    const file = imageInput.files[0];
    if (!file) {
        alert('Please upload an image first!');
        return;
    }

    loader.style.display = 'block'; // Show loader
    output.textContent = ''; // Clear previous output

    Tesseract.recognize(
        file,
        'eng',
        {
            logger: (m) => console.log(m), // Optional logger for progress
        }
    ).then(({ data: { text } }) => {
        loader.style.display = 'none'; // Hide loader
        output.textContent = text; // Show extracted text
    }).catch(error => {
        loader.style.display = 'none'; // Hide loader on error
        output.textContent = 'Error: ' + error.message;
    });
});
