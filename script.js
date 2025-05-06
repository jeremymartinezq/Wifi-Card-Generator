document.addEventListener('DOMContentLoaded', () => {
    // Elements
    const ssidInput = document.getElementById('ssid');
    const passwordInput = document.getElementById('password');
    const qrcodeDiv = document.getElementById('qrcode');
    const printBtn = document.getElementById('printBtn');
    
    // Initial QR code (empty)
    updateQRCode();
    
    // Event listeners
    ssidInput.addEventListener('input', updateQRCode);
    passwordInput.addEventListener('input', updateQRCode);
    printBtn.addEventListener('click', printWifiCard);
    
    // Functions
    function updateQRCode() {
        const ssid = ssidInput.value.trim();
        const password = passwordInput.value.trim();
        
        // Clear previous QR code
        qrcodeDiv.innerHTML = '';
        
        // Only generate QR code if there's a network name
        if (ssid) {
            // Generate WiFi connection string
            // Format: WIFI:S:<SSID>;T:<WPA|WEP|>;P:<password>;;
            const wifiString = `WIFI:S:${encodeURIComponent(ssid)};T:WPA;P:${encodeURIComponent(password)};;`;
            
            // Generate QR code
            const qr = qrcode(0, 'L');
            qr.addData(wifiString);
            qr.make();
            
            // Create and append QR code to container
            const qrImage = qr.createImgTag(4);
            qrcodeDiv.innerHTML = qrImage;
        }
    }
    
    function printWifiCard() {
        // Check if SSID is entered
        if (!ssidInput.value.trim()) {
            alert('Please enter a network name before printing.');
            ssidInput.focus();
            return;
        }
        
        // Print the page
        window.print();
    }
    
    // Add sample data for testing (can be removed for production)
    if (!ssidInput.value && !passwordInput.value) {
        ssidInput.value = 'The Coding Wizard';
        passwordInput.value = 'Pass123';
        updateQRCode();
    }
}); 