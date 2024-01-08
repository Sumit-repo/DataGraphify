fetch('Visulization_objects/Data.json')
    .then(response => response.json())
    .then(topics => {
        const jsonData = topics;
        let dataForFiltering = topics;

        const table = document.getElementById('dataTable');
        const tbody = table.querySelector('tbody');
        const itemsPerPage = 14;
        let currentPage = 1;

        function generateTable(startIndex, endIndex, data) {
            const rowsData = data || jsonData;
            tbody.innerHTML = '';

            for (let i = startIndex; i < endIndex; i++) {
                const rowData = rowsData[i];
                if (!rowData) break;

                const row = document.createElement('tr');
                row.innerHTML = `
            <td>${rowData[0]}</td>
            <td>${rowData[1]}</td>
            <td>${rowData[2]}</td>
            <td>${rowData[3]}</td>
            <td>${rowData[4]}</td>
            <td>${rowData[5]}</td>
            <td>${rowData[6]}</td>
            <td>${rowData[7]}</td>
            <td>${rowData[8]}</td>
            <td>${rowData[9]}</td>
            <td>${rowData[10]}</td>
            <td>${rowData[11]}</td>
            <td>${rowData[12]}</td>
            <td>${rowData[13]}</td>
            <td>${rowData[14]}</td>
            <td>${rowData[15]}</td>
            <td>${rowData[16]}</td>
            <td>${rowData[17]}</td>
            <td>${rowData[18]}</td>
            <td>${rowData[19]}</td>
            <td>${rowData[20]}</td>
        `;
                tbody.appendChild(row);
            }
        }

        function getUniqueValues(data, columnIndex) {
            const uniqueValuesSet = new Set();
            data.forEach(row => {
                const value = row[columnIndex];
                if (value !== null) {
                    uniqueValuesSet.add(value);
                }
            });
            return Array.from(uniqueValuesSet);
        }

        function populateFilterOptions(selectElement, options) {
            selectElement.innerHTML = '<option value="">All</option>';
            options.forEach(option => {
                const optionElement = document.createElement('option');
                optionElement.value = option;
                optionElement.textContent = option;
                selectElement.appendChild(optionElement);
            });
        }


        function generatePagination(data) {
            const totalPages = Math.ceil((data.length || jsonData.length) / itemsPerPage);
            const paginationDiv = document.getElementById('pagination');
            paginationDiv.innerHTML = '';

            const totalVisibleButtons = 5; // Including ellipsis buttons

            let startPage;
            let endPage;

            if (totalPages <= totalVisibleButtons) {
                startPage = 1;
                endPage = totalPages;
            } else {
                startPage = Math.max(1, currentPage - Math.floor(totalVisibleButtons / 2));
                endPage = Math.min(totalPages, startPage + totalVisibleButtons - 1);

                if (endPage - startPage + 1 < totalVisibleButtons) {
                    startPage = Math.max(1, endPage - totalVisibleButtons + 1);
                }
            }

            // Previous Button
            const previousButton = document.createElement('button');
            previousButton.textContent = 'Previous';
            previousButton.className = 'pagination-button';
            previousButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage--;
                    generatePagination(data); // Re-generate pagination on Previous click
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = currentPage * itemsPerPage;
                    generateTable(startIndex, endIndex, data);
                    updateActiveButton(data);
                }
            });

            // First Page Button
            const firstPageButton = document.createElement('button');
            firstPageButton.textContent = 'First';
            firstPageButton.className = 'pagination-button';
            firstPageButton.addEventListener('click', () => {
                if (currentPage > 1) {
                    currentPage = 1;
                    generatePagination(data);
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = currentPage * itemsPerPage;
                    generateTable(startIndex, endIndex, data);
                    updateActiveButton(data);
                }
            });

            paginationDiv.appendChild(previousButton);
            paginationDiv.appendChild(firstPageButton);

            for (let i = startPage; i <= endPage; i++) {
                const pageButton = document.createElement('button');
                pageButton.textContent = i;
                pageButton.className = 'pagination-button';

                pageButton.addEventListener('click', () => {
                    currentPage = i;
                    generatePagination(data); // Re-generate pagination on button click
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = currentPage * itemsPerPage;
                    generateTable(startIndex, endIndex, data);
                    updateActiveButton(data);
                });

                paginationDiv.appendChild(pageButton);
            }
            // Last Page Button
            const lastPageButton = document.createElement('button');
            lastPageButton.textContent = 'Last';
            lastPageButton.className = 'pagination-button';
            lastPageButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage = totalPages;
                    generatePagination(data);
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = currentPage * itemsPerPage;
                    generateTable(startIndex, endIndex, data);
                    updateActiveButton(data);
                }
            });

            paginationDiv.appendChild(lastPageButton);

            // Next Button
            const nextButton = document.createElement('button');
            nextButton.textContent = 'Next';
            nextButton.className = 'pagination-button';
            nextButton.addEventListener('click', () => {
                if (currentPage < totalPages) {
                    currentPage++;
                    generatePagination(data); // Re-generate pagination on Next click
                    const startIndex = (currentPage - 1) * itemsPerPage;
                    const endIndex = currentPage * itemsPerPage;
                    generateTable(startIndex, endIndex, data);
                    updateActiveButton(data);
                }
            });

            paginationDiv.appendChild(nextButton);

            updateActiveButton(data);
        }

        function applyFilters() {

            const filters = {
                'end-year': document.getElementById('end-year-filter').value,
                'topics': document.getElementById('topics-filter').value,
                'sector': document.getElementById('sector-filter').value,
                'region': document.getElementById('region-filter').value,
                'pest': document.getElementById('pest-filter').value,
                'swot': document.getElementById('swot-filter').value,
                'country': document.getElementById('country-filter').value,
                'city': document.getElementById('city-filter').value,
            };

            const filteredData = dataForFiltering.filter(row => {
                return Object.entries(filters).every(([key, value]) => {
                    const dataValue = row[getColumnIndex(key)];

                    // Treat "all" option as no filtering
                    if (value === 'all') {
                        return true;
                    } else if (value === '' && (dataValue === null || dataValue === '')) {
                        return true;
                    } else {
                        return dataValue && dataValue.toString().toLowerCase().includes(value.toLowerCase());
                    }
                });
            });

            console.log(filters);
            console.log(filteredData);

            if (Object.values(filters).every(value => value === '' || value === 0)) {
                generateTable(0, itemsPerPage);
                generatePagination(jsonData);
            } else {
                currentPage = 1;
                generateTable((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage, filteredData);
                generatePagination(filteredData);
            }
        }

        function fetchDataAndInitiate() {
            const filterFields = [
                'end-year', 'topics', 'sector', 'region', 'pest', 'swot', 'country', 'city'
            ];

            filterFields.forEach(field => {
                const filterElement = document.getElementById(`${field}-filter`);
                const uniqueValues = getUniqueValues(dataForFiltering, getColumnIndex(field));
                populateFilterOptions(filterElement, uniqueValues);
                filterElement.addEventListener('change', applyFilters);
            });

            // Initial table and pagination generation
            currentPage = 1;
            generateTable((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);
        }

        function updateActiveButton() {
            const buttons = document.querySelectorAll('.pagination-button');
            buttons.forEach((button, index) => {
                const buttonPage = index === 1 ? 1 : parseInt(button.textContent);
                if (buttonPage === currentPage) {
                    button.classList.add('pagination-active');
                } else {
                    button.classList.remove('pagination-active');
                }
            });
        }



        function getColumnIndex(fieldName) {
            // Adjust this function to map field names to column indices in your data
            switch (fieldName) {
                case 'end-year': return 0;
                case 'topics': return 5;
                case 'sector': return 4;
                case 'region': return 9;
                case 'pest': return 17;
                case 'swot': return 7;
                case 'country': return 15;
                case 'city': return 14;
                default: return -1;
            }
        }
        // Initial table and pagination generation
        generateTable(0, itemsPerPage);
        generatePagination(jsonData);
        fetchDataAndInitiate();
    });