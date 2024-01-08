google.charts.load('current', {
    'packages': ['geochart'],
});
google.charts.setOnLoadCallback(fetchAndDrawRegionsMap);

function fetchAndDrawRegionsMap() {
    fetch('Visulization_objects/country&projects.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(jsonArray => {
            drawRegionsMap(jsonArray);
        })
        .catch(error => {
            console.error('Error fetching the file:', error);
        });
}

function drawRegionsMap(jsonArray) {
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Country');
    data.addColumn('number', 'Projects');
    
    var dataArray = Object.entries(jsonArray).map(([region, projects]) => [region, projects]);
    dataArray.map(e => {
        if(e[0]=='United States of America'){
            e[0]='United States';
        }
    })
    data.addRows(dataArray);
    var options = {
        colorAxis: { colors: ['#5924ee'] },
        backgroundColor: 'white' ,
        datalessRegionColor: 'lightgreen',
    };

    var chart = new google.visualization.GeoChart(document.getElementById('regions_div'));
    chart.draw(data, options);
}
