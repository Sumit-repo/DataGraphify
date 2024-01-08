fetch('Visulization_objects/end_year.json')
    .then(response => response.json())
    .then(topics => {
        const labels = Object.keys(topics);
        const data = Object.values(topics);

        const ctx = document.getElementById('end_year_chart').getContext('2d');

        new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: "Events Finalization (Year)",
                    data: data,
                    backgroundColor: 'rgba(255, 252, 127, 0.2)', // Area fill color
                    borderColor: 'rgba(255, 240, 0, 1)', // Line color
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