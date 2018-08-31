define(function () {

    return function (csvDataHandler) {

        document.getElementById("csv-data-file")
            .addEventListener("change", readCsvFile, false);

        function readCsvFile(e) {
            console.log(e);
            var file = e.target.files[0];
            if (! file) {
                return null; 
            }
            return extractFileContents(file, e);
        }

        function extractFileContents(file, e) {
            var reader = new FileReader();
            reader.onload = function (e) {
                csvDataHandler(e.target.result);
            };
            reader.readAsText(file);
        }

    };

});
