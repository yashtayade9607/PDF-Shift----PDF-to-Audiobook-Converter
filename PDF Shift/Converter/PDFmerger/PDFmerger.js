const alertPlaceholder = document.getElementById('liveAlertPlaceholder');
let MergedPdfUrl;
const appendAlert = (message, type, svg) => {
        const wrapper = document.createElement('div')
        wrapper.classList.add("alert-parent");
        wrapper.innerHTML = [
            `<div class="alert alert-${type} alert-dismissible d-flex" role="alert">`,
            `${svg}`,
            `   <div>${message}</div>`,
            '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
            '</div>'
        ].join('')

        alertPlaceholder.append(wrapper)
}

function mergePDF(){
    document.addEventListener('DOMContentLoaded', () => {
        const pdfFilesInput = document.getElementById('pdfInput');
        const mergeButton = document.getElementById('mergeBtn');
        const downloadLink = document.getElementById('downloadLink');
        const downloadBtn = document.getElementById('download-btn-row');

        mergeButton.addEventListener('click', async () => {
            const files = pdfFilesInput.files;
            const messageElement = document.querySelector('.alert-parent');

            if(messageElement)
            {
                messageElement.remove();
            }

            if (files.length < 2) {
                appendAlert('Select at least two PDF files to merge. !!!', 'primary','<i class="bi bi-x-circle-fill mx-1"></i>')
                return;
            }

            const pdfDoc = await PDFLib.PDFDocument.create();

            for (let i = 0; i < files.length; i++) {
                const arrayBuffer = await files[i].arrayBuffer();
                const externalPdfDoc = await PDFLib.PDFDocument.load(arrayBuffer);
                const copiedPages = await pdfDoc.copyPages(externalPdfDoc, externalPdfDoc.getPageIndices());
                copiedPages.forEach((page) => pdfDoc.addPage(page));
            }

            const mergedPdfBlob = new Blob([await pdfDoc.save()]);
            const mergedPdfUrl = URL.createObjectURL(mergedPdfBlob);

            downloadLink.href = mergedPdfUrl;
            downloadBtn.style.display = 'block';
            appendAlert('PDF Merged Successfully !!!', 'primary','<i class="bi bi-check-circle-fill mx-1"></i>')
        });
    });
}
mergePDF();


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
        start: "top 0%",
        end: "top -70%",
        scrub: 1
    }
})


function CursorMoving() {
    document.getElementById("pdf-to-audio-page1").addEventListener("mouseenter", function (dets) {
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
    document.getElementById("pdf-to-audio-page1").addEventListener("mouseleave", function () {
        gsap.to("#main-cursor", {
            scale: 0,
            opacity: 0
        })
    })


    document.getElementById("pdf-to-audio-page2").addEventListener("mouseenter", function () {
        gsap.to("#main-cursor", {
            scale: 1,
            opacity: 1
        })
    })

    document.getElementById("pdf-to-audio-page2").addEventListener("mouseleave", function () {
        gsap.to("#main-cursor", {
            scale: 0,
            opacity: 0
        })
    })
}
CursorMoving();




var download = {
  init: function(settings) {
    download.config = {
      element: $("#show"),
      btn: $("#download-btn")
    };
    $.extend(download.config, settings);
    download.start();
  },
  start: function() {
    download.config.btn.on("click", function() {
      download.toggleShowElement();
    });
  },
  elementIsHidden: function() {
    download.config.element.hasClass("hide");
  },
  toggleShowElement: function() {
    if (download.elementIsHidden) {
      download.config.element.toggleClass("show");
      $("pdf-to-audio-page2").toggleClass("on");
      download.config.btn.toggleClass("active");
    }
  }
};

$(document).ready(download.init);
