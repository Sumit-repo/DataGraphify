fetch('Visulization_objects/start_year.json')
    .then(response => response.json())
    .then(topics => {
        const labels = Object.keys(topics);
        const data = Object.values(topics);

        const ctx = document.getElementById('start_year_chart').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Events Started (Year)",
                    data: data,
                    backgroundColor: 'rgba(0, 255, 0, 0.266)', // Area fill color
                    borderColor: 'rgba(0, 255, 0, 1)', // Line color
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
        });
    });
