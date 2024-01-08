fetch('Visulization_objects/regions&projects.json')
    .then(response => response.json())
    .then(topics => {

        const dataArray = Object.entries(topics).map(([label, value]) => ({ label, value }));
        const top5Entries = dataArray.slice(0, 8);
        const othersValue = dataArray.slice(8).reduce((sum, entry) => sum + entry.value, 0);
        top5Entries.push({ label: "Others", value: othersValue });
        top5Entries.map(e => {
            if (e.label == "United Kingdom") {
                e.label = "UK";
            }
            if (e.label == "United States of America") {
                e.label = "USA";
            }
        });

        top5Entries.sort((a, b) => {
            return a.label.localeCompare(b.label);
        });
        const labels = top5Entries.map(e => e.label);
        const data = top5Entries.map(e => e.value);

        const ctx = document.getElementById('country_project_chart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    label: "Top Regions",
                    backgroundColor: ['rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(255, 206, 86, 0.4)'
                    ], 
                    borderColor: ['rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)'
                    ],
                    borderWidth: 3,
                    fill: 'origin', // Fill area below the line
                }]
            },
            options: {
                scales: {
                    x: {
                        ticks: {
                            color: 'black' // X-axis tick text color
                        }
                    },
                    y: {
                        ticks: {
                            color: 'black' // Y-axis tick text color
                        }
                    }
                },
                plugins: {
                    legend: {
                        labels: {
                            color: 'black' // Legend text color
                        }
                    }
                },
                title: {
                    display: true,
                    text: 'Chart Title',
                    color: 'black' // Title text color
                }
            }
        })
    });