fetch('Visulization_objects/pestle.json')
    .then(response => response.json())
    .then(topics => {

        const dataArray = Object.entries(topics).map(([label, value]) => ({ label, value }));
        const labels = dataArray.map(e => e.label);
        const data = dataArray.map(e => e.value);

        const ctx = document.getElementById('pestle_chart').getContext('2d');

        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    label: "Top Pestles",
                    backgroundColor: [
                        'rgba(255, 206, 86, 0.4)',
                        'rgba(54, 162, 235, 0.4)',
                        'rgba(75, 192, 192, 0.2)',
                        'rgba(255, 99, 132, 0.4)',
                    ], 
                    borderColor: [
                        'rgba(255, 206, 86, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(255, 99, 132, 1)',
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