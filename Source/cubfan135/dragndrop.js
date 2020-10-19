/* ======================================================= */
/* ======= Drag and drop Script by nsandor-webDev ======== */
/* ====== This file is called after script.js file ======= */
/* ========= Can be overwritten toscript.js file ========= */
/* ======================================================= */
    // VARIABLES
    var dropZone = document.getElementById('dropzone'), // Full page overlay drop zone element
        dropInput = document.getElementById('bgInput'), // Input file element from right part
        dropZoneTitle = dropZone.getElementsByTagName("H1")[0]; // Title in dropZone element
        lastTarget = null;

    // Stop original events when dragover
    window.addEventListener("dragover", function (e){
        preventDef(e);
    });

    // Show drop zone element when u drag a file in window
    window.addEventListener("dragenter", function (e) {
        if (isFile(e)) {
            lastTarget = e.target;
            showDropZone();
        }
    });

    // Hide drop zone element when you leave windows during drag
    window.addEventListener("dragleave", function (e) {
        preventDef(e);
        if (e.target === lastTarget || e.target === document) {
            hideDropZone();
        }
    });

    // Hide drop zone element when you drop file - to see result
    window.addEventListener("drop", function () {
        hideDropZone();
    });

    // Function that stop triggering default action of the event
    // Stop bubbling up the DOM tree, preventing any parent from sharing events
    function preventDef(e) {
        e.preventDefault();
        e.stopPropagation();
    }
    // Checking dragged element
    function isFile(evt) {
        var dt = evt.dataTransfer;
        for (var i = 0; i < dt.types.length; i++) {
            if (dt.items[i].kind === 'file') { // Dragged item is a file
                if (dt.items[i].type.indexOf('image') === 0) { // Drageed file is an image
                    return true;
                }
            }
        }
        return false;
    }
    // Set CSS for dropZone and set FontSize to  TITLE H1 element
    // Add class to INPUT FILE element - become an overlay full page input
    function showDropZone() {
        dropZone.style.visibility = "visible";
        dropZone.style.opacity = 1;
        dropZoneTitle.style.fontSize = "3rem";
        dropInput.classList.add('dropInput')
    }
    // Set CSS for dropZone and set FontSize to  TITLE H1 element - Hiding element
    // REMOVE class to INPUT FILE element - become a default input element
    function hideDropZone() {
        dropZone.style.visibility = "";
        dropZone.style.opacity = "";
        dropZoneTitle.style.fontSize = "";
        dropInput.classList.remove('dropInput')
    }
