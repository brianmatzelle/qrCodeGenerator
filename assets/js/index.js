var qrcode = new QRCode(document.getElementById("qrcode"));

// html id list
const container = document.getElementById('container'); // container with everything, only will be hidden when print is called. Do not touch otherwise.
const qrContainer = document.getElementById('qrcode');  // actual QR code
const bottomContainer = document.getElementById('bottom-container');    // container for print and download buttons
const printButton = document.getElementById('print-button');
const downloadButton = document.getElementById('download-button');

var userData;       // global variables will be for downloading later
var src;

function makeContent(){         // function for making the QR Code
    userData = document.getElementById("submitText").value;
    
    if (!userData) {
        alert("Please input text...");
        return;
    }

    if (userData.length > 4296) {
        alert("Please input less than 4,296 characters... Your string is " + userData.length + " characters long.");
        return;
    }
    
    qrContainer.classList.remove('hide');       // show QR code and bottom container
    printButton.classList.remove('hide');
    downloadButton.classList.remove('hide');

    qrcode.makeCode(userData);      // make QR code with user input
    src = qrContainer.children[0].toDataURL("image/png");       // actual image data---stored in src
}

function printContent() {       // print function---hides everything except QR code, then prints
    var restorePage = document.body.innerHTML;
    var printContent = qrContainer.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = restorePage;
}

function downloadContent() {        // download function---creates "a" in HTML, then downloads src content
    var a = document.createElement("a");
    a.href = src;
    a.download = userData + ".png";
    a.click();
}