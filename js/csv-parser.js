define(function () {

    var DOT_TEMPLATE = '"<from>" -> "<to>" [<data>]';

    function csvToDot(csvData, labelField) {

        var data = csvToData(csvData),
            keys = R.keys(data[0]).map(unquotedStr);

        function objToDot(obj) {
            return DOT_TEMPLATE.replace("<from>", obj.from)
                .replace("<to>", obj.to)
                .replace("<data>", objData(obj));
        }

        function objData(obj) {
            return keys.reduce(function (data, key) {
                if (R.contains(key, ["to", "from"])) {
                    return data;
                }
                return data + (data != "" ? ", " : "") + (key == labelField ? "label" : key) + '="' + obj[key] + '"';
            },  "");
        }

        return 'flow_graph {' + data.map(objToDot).join("\n") + '}';

   }

   function csvToData(csvData) {

        var csvRows = csvData.split("\n"),
            titles = R.take(1, csvRows)[0].split(","),
            rows = R.drop(1, csvRows);

        function rowToData(row) {
            return row.split(",").reduce(function (obj, value, index) {
                return Object.assign({}, obj, {[titles[index]]: unquotedStr(value)});
            }, {});
        }

        return rows.map(rowToData);
    }

    function unquotedStr(s) {
        return s.replace(/^\"+|\"+$/g, '');
    }

    return {
        asDot: csvToDot,
        asObj: csvToData
    };
});

