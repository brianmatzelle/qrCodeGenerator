// const html2canvas = require("./html2canvas");

var qrcode = new QRCode(document.getElementById("qrcode"));
const container = document.getElementById('container');
const qrContainer = document.getElementById('qrcode');
const bottomContainer = document.getElementById('bottom-container');
const printButton = document.getElementById('print-button');
const downloadButton = document.getElementById('download-button');
const returnHome = document.getElementById('return-home');

var userData;       // will be for downloading later
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
    
    qrContainer.classList.remove('hide');
    printButton.classList.remove('hide');
    downloadButton.classList.remove('hide');

    qrcode.makeCode(userData);
    src = qrContainer.children[0].toDataURL("image/png");
    console.log(src);
}

function printContent() {
    var restorePage = document.body.innerHTML;
    var printContent = qrContainer.innerHTML;
    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = restorePage;
}

function downloadContent() {
    var a = document.createElement("a");
    a.href = src;
    a.download = userData + ".png";
    a.click();
}