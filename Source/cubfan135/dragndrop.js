(function($) {
    var body = $('body'),
        dropZone = body.find('#drop-zone'),
        displayFlex = 'block',
        displayNone = 'none',
        dropInput = body.find('#dropInput');

    // WORKING
    function preventDef(e) {
        e.preventDefault();
        e.stopPropagation();
    }


    var lastTarget = null;

    function isFile(evt) {
        var dt = evt.dataTransfer;

        for (var i = 0; i < dt.types.length; i++) {
            if (dt.types[i] === "Files") {
                return true;
            }
        }
        return false;
    }

    window.addEventListener("dragenter", function (e) {
        if (isFile(e)) {
            lastTarget = e.target;
            $("#dropzone").css('visibility','visible');
            $("#dropzone").css('opacity', '1');
            $("#dropzone h1").css('font-size', '3em');
            $("#bgInput").addClass('dropInput');
        }
    });

    window.addEventListener("dragleave", function (e) {
        e.preventDefault();
        if (e.target === lastTarget || e.target === document) {
            $("#dropzone").css('visibility', 'hidden');
            $("#dropzone").css('opacity', '0');
            $("#dropzone h1").css('font-size', '0em');
        }
    });

    window.addEventListener("dragover", function (e) {
        preventDef(e);
    });

    window.addEventListener("drop", function (e) {
        //preventDef(e);
        $("#dropzone").css('visibility', 'hidden');
        $("#dropzone").css('opacity', '0');
        $("#dropzone h1").css('font-size', '0em');
        $("#bgInput").removeClass('dropInput');
    });

})(jQuery);