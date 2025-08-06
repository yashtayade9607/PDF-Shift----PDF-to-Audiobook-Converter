
/* 
    change background color on scroll
*/
gsap.to("main", {
    backgroundColor: "#000",
    color: "#fff",
    scrollTrigger: {
        trigger: "main",
        scroller: "body",
        start: "top -30%",
        end: "top -80%",
        scrub: 2
    }
})

/* 
    change navbar background color on scroll
*/
gsap.to("#header", {
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    scrollTrigger: {
        trigger: "#header",
        scroller: "body",
        start: "top 5%",
        end: "top -70%",
        scrub: 1
    }
})


/* 
    Move Main Cursor Div
*/

function CursorMoving() {
    document.getElementById("audio-to-text-page1").addEventListener("mouseenter", function (dets) {
        gsap.to("#main-cursor", {
            scale: 1,
            opacity: 1,
            left: dets.x - 15,
            top: dets.y - 10
        })
    })
    document.addEventListener("mousemove", function (dets) {
        gsap.to("#main-cursor", {
            left: dets.x - 15,
            top: dets.y - 10
        })
    })
    document.getElementById("audio-to-text-page1").addEventListener("mouseleave", function () {
        gsap.to("#main-cursor", {
            scale: 0,
            opacity: 0
        })
    })


    document.getElementById("audio-to-text-page2").addEventListener("mouseenter", function () {
        gsap.to("#main-cursor", {
            scale: 1,
            opacity: 1
        })
    })

    document.getElementById("audio-to-text-page2").addEventListener("mouseleave", function () {
        gsap.to("#main-cursor", {
            scale: 0,
            opacity: 0
        })
    })
}
CursorMoving();


/* 
    Audio to Text Conversion
*/
const AudioToText = () => {
    let speechRecognition = window.webkitSpeechRecognition;
    let recognition = new webkitSpeechRecognition();
    let textbox = $("#textarea");
    let instructions = $("#instructions");
    let content = '';
    let flag = 0;

    recognition.continuous = true;

    // recongnition is started
    recognition.onstart = function () {
        instructions.text("Voice recognition is on");
    }

    recognition.onspeechend = function () {
        instructions.text("No Activity");
    }
    recognition.onerror = function () {
        instructions.text("Try Again");
    }

    recognition.onresult = function (event) {
        let current = event.resultIndex;
        let transcript = event.results[current][0].transcript;
        content += transcript;
        textbox.val(content);
    }

    $("#start-btn").click(function (event) {
        if (content.length) {
            content += '';

        }
        recognition.start();
        flag = 1;
    })
    $("#pause-btn").click(function (event) {
        if (flag == 1) {
            recognition.stop();
            instructions.text("Voice Recognition is Off");
            flag = 0;
        }
        else {
            alert("First Start the Recognition")
        }

    })

    textbox.on('input', function () {
        content = $(this).val();
    })
}
AudioToText();



