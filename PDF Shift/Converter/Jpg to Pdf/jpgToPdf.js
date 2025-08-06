// Elements
const dropContainer = document.getElementById("dropcontainer");
const fileInput = document.getElementById("fileInput");
const preview = document.getElementById('preview');
const downloadLink = document.getElementById('downloadLink');
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Handle drag over event
dropContainer.addEventListener("dragover", e => {
    // Prevent default behavior to allow drop
    e.preventDefault();
}, false);

// Add "drag-active" class when dragging over
dropContainer.addEventListener("dragenter", () => {
    dropContainer.classList.add("drag-active");
});

// Remove "drag-active" class when dragging leaves
dropContainer.addEventListener("dragleave", () => {
    dropContainer.classList.remove("drag-active");
});

// Handle file drop event
dropContainer.addEventListener("drop", e => {
    e.preventDefault();
    dropContainer.classList.remove("drag-active");

    fileInput.files = e.dataTransfer.files;  // Update the input files
    const file = e.dataTransfer.files[0];
    handleFile(file);
});

// Handle file input change event (when selecting files via file dialog)
fileInput.addEventListener('change', (e) => {
    const file = e.target.files[0];
    handleFile(file);
});

// Handle the selected file
function handleFile(file) {
    // Check if the file is a JPG or JPEG image
    if (file && (file.type === 'image/jpeg' || file.type === 'image/jpg')) {
        const imageURL = URL.createObjectURL(file);

        // Display the image in the preview section
        preview.style.display = 'block';
        preview.src = imageURL;
    } else {
        // Reset the preview if the selected file is not a JPG or JPEG image
        preview.style.display = 'none';
        alert('Please select a valid JPG or JPEG image.');
    }
}

// Handle the image to PDF conversion
document.getElementById('convertButton').addEventListener('click', async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please upload a JPG image first.");
        return;
    }

    const img = new Image();
    const reader = new FileReader();

    reader.onload = function (event) {
        img.src = event.target.result;
    };

    img.onload = function () {
        // Set canvas dimensions based on image size
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Generate PDF
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF({
            orientation: img.width > img.height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [img.width, img.height],
        });

        const imgData = canvas.toDataURL('image/jpeg');
        pdf.addImage(imgData, 'JPEG', 0, 0, img.width, img.height);

        // Create a blob and generate a download link
        const pdfBlob = pdf.output('blob');
        const pdfURL = URL.createObjectURL(pdfBlob);
        downloadLink.href = pdfURL;
        downloadLink.style.display = 'block';
        downloadLink.textContent = "Download PDF";
    };

    reader.readAsDataURL(file);
});
