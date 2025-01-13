let qrCodeInstance;

function generateQRCode() {
    var url = document.getElementById("linkedin-url").value;
    var qrCodeDiv = document.getElementById("qr-code");
    var downloadButton = document.getElementById("download-btn");

    // Clear previous QR code
    qrCodeDiv.innerHTML = "";
    downloadButton.style.display = "none";

    if (url.trim() !== "") {
        qrCodeInstance = new QRCode(qrCodeDiv, {
            text: url,
            width: 150,
            height: 150,
            colorDark: "#000000",
            colorLight: "#ffffff",
        });
        
        setTimeout(() => {
            downloadButton.style.display = "block";
        }, 500);
    } else {
        alert("Please enter a valid URL.");
    }
}

function downloadQRCode() {
    const qrCodeImg = document.querySelector("#qr-code img");

    if (qrCodeImg) {
        const padding = 40;  // White border padding
        const borderRadius = 30;  // Rounded border radius
        const qrSize = qrCodeImg.width;
        const canvasSize = qrSize + padding * 2;
        
        const canvas = document.createElement('canvas');
        canvas.width = canvasSize;
        canvas.height = canvasSize;
        const ctx = canvas.getContext('2d');

        // ✅ Draw a white rounded rectangle as background
        ctx.fillStyle = "#ffffff";
        ctx.beginPath();
        ctx.moveTo(borderRadius, 0);
        ctx.arcTo(canvasSize, 0, canvasSize, canvasSize, borderRadius);
        ctx.arcTo(canvasSize, canvasSize, 0, canvasSize, borderRadius);
        ctx.arcTo(0, canvasSize, 0, 0, borderRadius);
        ctx.arcTo(0, 0, canvasSize, 0, borderRadius);
        ctx.closePath();
        ctx.fill();

        // ✅ Draw the QR code centered
        const qrCodeImage = new Image();
        qrCodeImage.src = qrCodeImg.src;
        qrCodeImage.onload = function () {
            ctx.drawImage(qrCodeImage, padding, padding, qrSize, qrSize);

            // ✅ Trigger download
            const downloadLink = document.createElement('a');
            downloadLink.href = canvas.toDataURL("image/png");
            downloadLink.download = "qr_code_rounded.png";
            downloadLink.click();
        };
    } else {
        alert("Please generate a QR code first.");
    }
}
