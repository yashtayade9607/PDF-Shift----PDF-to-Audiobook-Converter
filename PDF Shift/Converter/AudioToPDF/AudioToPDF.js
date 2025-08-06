const startButton = document.getElementById('startButton');
        const stopButton = document.getElementById('stopButton');
        const convertButton = document.getElementById('convertButton');
        const result = document.getElementById('result');

        let recognition = new webkitSpeechRecognition();
        recognition.continuous = true;
        recognition.lang = 'en-US';

        recognition.onstart = function() {
            startButton.disabled = true;
            stopButton.disabled = false;
        };

        recognition.onend = function() {
            startButton.disabled = false;
            stopButton.disabled = true;
        };

        recognition.onresult = function(event) {
            const transcript = event.results[event.results.length - 1][0].transcript;
            result.textContent = transcript;
            convertButton.disabled = false;
        };

        startButton.addEventListener('click', () => {
            recognition.start();
        });

        stopButton.addEventListener('click', () => {
            recognition.stop();
        });

        convertButton.addEventListener('click', () => {
            const pdfDefinition = {
                content: [{ text: result.textContent }],
            };

            pdfMake.createPdf(pdfDefinition).download('speech_to_pdf.pdf');
        });