(function($) {
    var body = $('body'),
        preview = body.find('#preview-area #preview-text'),
        previewHTML = ' <i class="material-icons-outlined">remove_red_eye</i> Preview';

        body.on('dragover', function (e) {
            e.preventDefault();
            e.stopPropagation();
            preview.addClass('drop');
            preview.html('DROP FILE HERE');
        });

        body.on('dragleave', function (e) {
            e.preventDefault();
            e.stopPropagation();
            preview.removeClass('drop');
            preview.html(previewHTML);
        });

})(jQuery);