export default class GeneratePDF {

    constructor(pages) {
        this.pages = [...pages];
        this.options = {
            margin: 0,
            filename: 'test.pdf',
            image: {
                type: 'jpeg',
                quality: 0.98
            },
            html2canvas: {
                dpi: 300,
                scale: 6
            },
            jsPDF: {
                unit: 'in',
                format: [8.25, 6],
                orientation: 'landscape'
            }
        };
        this.worker = html2pdf().set(this.options).from(pages[0]).toPdf();

        this.init();
    }

    init() {
        let progress = 0;
        console.log(`Total pages : ${this.pages.length}`);

        // Generate the PDF
        this.pages.forEach((page, i) => {
            if (i > 0) {
                this.worker = this.worker.get('pdf').then(pdf => {
                    pdf.addPage();
                }).from(page).toContainer().toCanvas().toPdf().then(() => {
                    progress = Math.round((i / (this.pages.length - 1)) * 100);
                    console.log(`Progress : ${progress}%`);
                });
            }
        });

        // Send the PDF
        this.worker = this.worker.save();
        // this.worker.get('pdf').output('datauristring').then(dataUriString => {
        //     this.send(dataUriString);
        //     this.debugBase64(dataUriString);
        // });

    }

    send(dataUriString) {
        let pdfObj = {
            id: "test1",
            content: dataUriString
        }

        fetch('/save-pdf', {
            method: 'POST',
            body: JSON.stringify(pdfObj),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            console.log('Response:', response);
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }

    debugBase64(base64URL) {
        let win = window.open();
        win.document.write(`<iframe src='${base64URL}' frameborder='0' style='border:0; top:0px; left:0px; bottom:0px; right:0px; width:100%; height:100%;' allowfullscreen></iframe>`);
    }

}