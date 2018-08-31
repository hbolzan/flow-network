define(["require", "js/csv-read.js", "js/csv-parser.js"], function (require) {

    var DEBUG = true,
        initCsvReader = require("js/csv-read.js"),
        csvParser = require("js/csv-parser.js");

    initCsvReader(renderCsvData);

    function renderCsvData(csvData) {
        var dot = csvParser.asDot(csvData, "line"),
            parsedData = vis.network.convertDot(dot),
            data = {
                nodes: parsedData.nodes,
                edges: parsedData.edges
            },
            options = {
                layout: {
                    randomSeed: undefined,
                    improvedLayout:true,
                    hierarchical: {
                        enabled: true,
                        levelSeparation: 150,
                        nodeSpacing: 100,
                        treeSpacing: 200,
                        blockShifting: true,
                        edgeMinimization: true,
                        parentCentralization: true,
                        direction: 'UD',        // UD, DU, LR, RL
                        sortMethod: 'hubsize'   // hubsize, directed
                    }
                }
            },
            container = document.getElementById("flow-network"),
            network = new vis.Network(container, data, options);
    }

    function trace(x) {
        if (DEBUG) {
            console.log(x);
        };
        return x;
    }

});
