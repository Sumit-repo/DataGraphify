document.getElementById('refresh').addEventListener('click', () => {
    fetch('http://localhost:8080/executeJavaCode', {
        method: 'GET',
        mode: 'cors',
    })
        .then(response => response.text())
        .then(data => {
            window.prompt("Data Updated");
        })
        .catch(error => {
            window.prompt('Error executing Java code:', error);
        });

});