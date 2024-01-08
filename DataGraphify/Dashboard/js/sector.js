fetch('Visulization_objects/sector.json')
    .then(response => response.json())
    .then(topics => {
        const labels = Object.keys(topics);
        const data = Object.values(topics);
        const top5 = labels.slice(0, 5).concat("Others");
        var othersValue = data.slice(5).reduce((data) => data + othersValue);
        data.concat(othersValue);

        var colors = [
            '#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', '#c2f0c2', '#ff9999', '#66b3ff', '#99ff99', '#ffcc99', '#c2c2f0', '#c2f0c2'
        ];

        const crt = [{
            type: 'pie',
            labels: top5,
            values: data,
            textinfo: 'label',
            insidetextorientation: 'radial',
            marker: {
                color: colors,
            },
        }];

        const layout = {
            title: 'Top 5 Sectors',
            height: 550,
            plot_bgcolor: 'rgb(159, 159, 159)'
        };

        Plotly.newPlot('sector', crt, layout);
    });