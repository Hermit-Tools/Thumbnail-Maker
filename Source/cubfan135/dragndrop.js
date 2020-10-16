/* ======================================================= */
/* ======= Drag and drop Script by nsandor-webDev ======== */
/* = This file is called after script.js file and jQuery = */
/* ========= Can be overwritten toscript.js file ========= */
/* ======= jQuery downloaded from CDNJS cloudflare ======= */
/* == Recommended to download jQuery and use it locally == */
/* ======================================================= */

(function($) {
    // VARIABLES and CSS objects
    var body = $('body'),
        dropZone = body.find('#dropzone'), // Full page overlay drop zone element
        dropInput = body.find('#bgInput'),  // input file element from right part
        lastTarget = null,
        cssHide = { // CSS object to hide the drop zone element
            visibility: 'hidden',
            opacity: 0
        },
        cssShow = { // CSS object to show the drop zone element
            visibility: 'visible',
            opacity: 1
        },
        titleFrontSize = {      // Front size for H1 title in drop zone element
            fontSize: '3em'     // transition effect
        };

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
            if (dt.types[i] === "Files") {
                return true;
            }
        }
        return false;
    }
    // Set CSS for dropZone then find TITLE H1 element and set FontSize
    // Add class to INPUT FILE element - become an overlay full page input
    function showDropZone() {
        dropZone.css(cssShow).find('h1').css(titleFrontSize);
        dropInput.addClass('dropInput');
    }
    // Set CSS for dropZone to HIDE it and then find TITLE H1 element and set FontSize to 0 (reset transition effet)
    // REMOVE class to INPUT FILE element - become a default input element
    function hideDropZone() {
        dropZone.css(cssHide).find('h1').css('font-size', 0);
        dropInput.removeClass('dropInput');
    }

})(jQuery);
// Used jQuery framework - for future development I decided for this notation
// When you will be using some JS framework with "$" symbol, this part of CODE will be always in jQuery