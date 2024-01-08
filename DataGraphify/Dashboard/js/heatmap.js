fetch('Visulization_objects/heatmap.json')
    .then(response => response.json())
    .then(topics => {
        google.charts.load('current', { 'packages': ['corechart', 'scatter'] });
        google.charts.setOnLoadCallback(drawStuff);
        function drawStuff() {
            var chartDiv = document.getElementById('heatmap');

            var data = new google.visualization.DataTable();
            data.addColumn('string', 'Topic');
            data.addColumn('number', 'Intensity');
            data.addColumn('number', 'Likelihood');
            data.addColumn('number', 'Relevance');

            var rows = topics.map(e => [e[0], e[1], e[2], e[3]]);
            rows.sort((a, b) => a[0].localeCompare(b[0]));
            data.addRows(rows);
            var materialOptions = {
                width: 1450,
                height: 720,
                series: {
                    0: { axis: 'Intensity' },
                    1: { axis: 'Likelihood' }
                },
                axes: {
                    y: {
                        'Intensity': { label: 'Intensity' },
                        'Likelihood': { label: 'Likelihood' }
                    }
                },
            };
            
            function drawMaterialChart() {
                var materialChart = new google.charts.Scatter(chartDiv);
                materialChart.draw(data, google.charts.Scatter.convertOptions(materialOptions));
            }

            drawMaterialChart();
        }
    });