document.getElementById('convertButton').addEventListener('click', () => {
  const pdfFileInput = document.getElementById('pdfInput');
  const pdfContainer = document.getElementById('pdfContainer');
  
  const file = pdfFileInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      const data = new Uint8Array(e.target.result);
      pdfjsLib.getDocument(data).promise.then(pdf => {
        const numPages = pdf.numPages;
        const jpgImages = [];

        function convertPageToJPG(pageNumber) {
          if (pageNumber <= numPages) {
            pdf.getPage(pageNumber).then(page => {
              const canvas = document.createElement('canvas');
              const context = canvas.getContext('2d');
              const viewport = page.getViewport({ scale: 1.0 });

              canvas.height = viewport.height;
              canvas.width = viewport.width;

              page.render({ canvasContext: context, viewport: viewport }).promise.then(() => {
                const jpgImage = canvas.toDataURL('image/jpeg');
                jpgImages.push(jpgImage);

                const jpgImageElement = document.createElement('img');
                jpgImageElement.src = jpgImage;
                jpgImageElement.classList.add("img-fluid");
                pdfContainer.appendChild(jpgImageElement);

                // Create download button for this page
                const downloadButton = document.createElement('button');
                downloadButton.classList.add('download-button');
                downloadButton.textContent = `Download Page ${pageNumber}`;
                downloadButton.addEventListener('click', function() {
                  // Create a temporary anchor element to trigger the download
                  const tempLink = document.createElement('a');
                  tempLink.href = jpgImage;
                  tempLink.download = `page_${pageNumber}.jpg`;
                  tempLink.click();
                });
                pdfContainer.appendChild(downloadButton);

                // Continue converting the next page
                convertPageToJPG(pageNumber + 1);
              });
            });
          }
        }

        // Start converting pages, beginning with page 1
        convertPageToJPG(1);
      });
    };
    reader.readAsArrayBuffer(file);
  }
});