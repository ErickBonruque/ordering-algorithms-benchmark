document.addEventListener('DOMContentLoaded', function() {
    
    // Importar algoritmos do arquivo sorting.js
    const sortingAlgorithms = {
        radixSort: window.sortingAlgorithms.radixSort,
        heapSort: window.sortingAlgorithms.heapSort,
        mergeSort: window.sortingAlgorithms.mergeSort,
        quickSort: window.sortingAlgorithms.quickSort,
        bubbleSort: window.sortingAlgorithms.bubbleSort,
        insertionSort: window.sortingAlgorithms.insertionSort,
        shellSort: window.sortingAlgorithms.shellSort,
        selectionSort: window.sortingAlgorithms.selectionSort
    };

    const form = document.getElementById('sortForm');
    const arraySizeInput = document.getElementById('arraySize');
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.getElementById('loading');
    const resultsContainer = document.getElementById('resultsContainer');
    const chartDiv = document.getElementById('chart');
    const progressInfo = document.getElementById('progress-info');
    
    // Configurar tema escuro global para o Chart.js
    Chart.defaults.color = '#e0e0e0';
    Chart.defaults.borderColor = '#333333';
    
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obter os valores do formulário
        const arraySize = parseInt(document.getElementById('arraySize').value);
        const arrayType = document.querySelector('input[name="arrayType"]:checked').value;
        const selectedAlgorithms = Array.from(document.querySelectorAll('input[name="algorithm"]:checked'))
            .map(el => el.value);
        
        // Validar a seleção
        if (selectedAlgorithms.length === 0) {
            alert('Por favor, selecione pelo menos um algoritmo.');
            return;
        }
        
        // Validar o tamanho do array
        if (arraySize < 1 || arraySize > 2000000) {
            alert('Por favor, insira um tamanho entre 1 e 2.000.000.');
            return;
        }
        
        // Mostrar loading e limpar resultados anteriores
        resultsDiv.classList.remove('hidden');
        loadingDiv.classList.remove('hidden');
        resultsContainer.innerHTML = '';
        chartDiv.innerHTML = '';
        
        // Para conjuntos muito grandes, precisamos de processamento assíncrono
        progressInfo.textContent = 'Gerando conjunto de dados...';
        
        setTimeout(() => {
            // Gerar o array conforme o tipo selecionado usando um worker ou em chunks
            progressInfo.textContent = `Gerando ${arraySize.toLocaleString()} números...`;
            
            // Para conjuntos realmente grandes, vamos usar uma abordagem assíncrona
            if (arraySize > 100000) {
                generateLargeArrayAsync(arraySize, arrayType, (array) => {
                    processAlgorithms(array, selectedAlgorithms);
                });
            } else {
                const array = generateArray(arraySize, arrayType);
                processAlgorithms(array, selectedAlgorithms);
            }
        }, 100);
    });
    
    // Função para gerar arrays grandes de forma assíncrona
    function generateLargeArrayAsync(size, type, callback) {
        progressInfo.textContent = `Gerando ${size.toLocaleString()} números...`;
        
        setTimeout(() => {
            const array = generateArray(size, type);
            callback(array);
        }, 100);
    }
    
    // Função para processar os algoritmos - com timeout mais longo para algoritmos lentos
    function processAlgorithms(array, selectedAlgorithms) {
        const results = [];
        let processed = 0;
        
        // Garantir que o loading esteja visível no início
        loadingDiv.classList.remove('hidden');
        resultsDiv.classList.remove('hidden');
        
        function processNextAlgorithm() {
            if (processed < selectedAlgorithms.length) {
                const algorithmName = selectedAlgorithms[processed];
                progressInfo.textContent = `Executando ${formatAlgorithmName(algorithmName)}... (${processed + 1}/${selectedAlgorithms.length})`;
                
                setTimeout(() => {
                    try {
                        const algorithm = sortingAlgorithms[algorithmName];
                        if (algorithm) {
                            const arrayCopy = [...array];
                            const startTime = performance.now();
                            const sortedArray = algorithm(arrayCopy);
                            const endTime = performance.now();
                            const executionTime = endTime - startTime;
                            
                            const isSorted = array.length <= 100000 ? 
                                checkSorting(sortedArray) : 
                                checkSortingSample(sortedArray);
                            
                            results.push({
                                name: algorithmName,
                                time: executionTime.toFixed(2),
                                sorted: isSorted
                            });
                        }
                    } catch (error) {
                        console.error(`Erro ao executar ${algorithmName}:`, error);
                        results.push({
                            name: algorithmName,
                            time: "Erro",
                            sorted: false,
                            error: error.message
                        });
                    }
                    
                    processed++;
                    processNextAlgorithm();
                }, 10);
            } else {
                // Chamar finalizeResults apenas quando todos os algoritmos terminarem
                finalizeResults(results);
            }
        }
        
        processNextAlgorithm();
    }
    
    // Função para finalizar o processamento e exibir os resultados
    function finalizeResults(results) {
        // Ordenar os resultados pelo tempo de execução (mais rápido primeiro)
        results.sort((a, b) => {
            if (a.time === "Erro") return 1;
            if (b.time === "Erro") return -1;
            return parseFloat(a.time) - parseFloat(b.time);
        });
        
        // Garantir que a div de resultados esteja visível
        resultsDiv.classList.remove('hidden');
        // Ocultar explicitamente o loading
        loadingDiv.classList.add('hidden');
        // Limpar a mensagem de progresso
        progressInfo.textContent = '';
        
        // Atualizar a interface
        displayResults(results);
        createChart(results);
    }
    
    // Função para verificar apenas uma amostra do array ordenado (para grandes conjuntos)
    function checkSortingSample(array) {
        // Verificar apenas 1000 elementos aleatórios ou adjacentes
        const max = array.length - 1;
        const sampleSize = Math.min(1000, max);
        
        // Verificar alguns pares adjacentes
        for (let i = 0; i < sampleSize; i++) {
            const index = Math.floor(Math.random() * max);
            if (array[index] > array[index + 1]) {
                return false;
            }
        }
        
        // Verificar o início, meio e fim
        if (array[0] > array[1] || 
            array[Math.floor(max/2)] > array[Math.floor(max/2) + 1] ||
            array[max-1] > array[max]) {
            return false;
        }
        
        return true;
    }
    
    // Função para gerar o array conforme o tipo selecionado
    function generateArray(size, type) {
        const array = [];
        
        // Preencher o array
        for (let i = 0; i < size; i++) {
            array.push(i + 1);
        }
        
        // Ajustar conforme o tipo selecionado
        if (type === 'reversed') {
            // Array em ordem decrescente
            array.reverse();
        } else if (type === 'random') {
            // Array em ordem aleatória - usando Fisher-Yates shuffle que é mais eficiente
            let currentIndex = array.length;
            
            while (currentIndex !== 0) {
                // Escolher um elemento restante
                const randomIndex = Math.floor(Math.random() * currentIndex);
                currentIndex--;
                
                // Trocar com o elemento atual
                [array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
            }
        } // Se for 'sorted', o array já está em ordem crescente
        
        return array;
    }
    
    // Função para verificar se o array está ordenado
    function checkSorting(array) {
        for (let i = 1; i < array.length; i++) {
            if (array[i] < array[i - 1]) {
                return false;
            }
        }
        return true;
    }
    
    // Função para criar um gráfico de comparação
    function createChart(results) {
        // Filtrar resultados com erro
        const validResults = results.filter(r => r.time !== "Erro");
        
        if (validResults.length === 0) {
            chartDiv.innerHTML = '<p class="error-message">Não foi possível gerar o gráfico. Todos os algoritmos resultaram em erro.</p>';
            return;
        }
        
        // Limpar qualquer gráfico anterior
        chartDiv.innerHTML = '';
        
        const chartContainer = document.createElement('div');
        chartContainer.classList.add('chart-container');
        
        const canvas = document.createElement('canvas');
        chartContainer.appendChild(canvas);
        chartDiv.appendChild(chartContainer);
        
        const ctx = canvas.getContext('2d');
        
        const labels = validResults.map(result => formatAlgorithmName(result.name));
        const data = validResults.map(result => parseFloat(result.time));
        
        // Cores vibrantes para contrastar com o fundo escuro
        const colors = [
            'rgba(75, 192, 192, 0.8)',
            'rgba(255, 99, 132, 0.8)',
            'rgba(54, 162, 235, 0.8)',
            'rgba(255, 206, 86, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',
            'rgba(76, 175, 80, 0.8)',
            'rgba(233, 30, 99, 0.8)'
        ];
        
        const backgroundColors = validResults.map((_, i) => colors[i % colors.length]);
        
        new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Tempo de execução (ms)',
                    data: data,
                    backgroundColor: backgroundColors,
                    borderWidth: 1,
                    borderColor: backgroundColors.map(color => color.replace('0.8', '1')),
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: true,
                scales: {
                    y: {
                        beginAtZero: true,
                        title: {
                            display: true,
                            text: 'Tempo (ms)',
                            color: '#e0e0e0'
                        },
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#e0e0e0'
                        }
                    },
                    x: {
                        grid: {
                            color: 'rgba(255, 255, 255, 0.1)'
                        },
                        ticks: {
                            color: '#e0e0e0'
                        }
                    }
                },
                plugins: {
                    title: {
                        display: true,
                        text: 'Comparação dos Algoritmos de Ordenação',
                        color: '#ffffff',
                        font: {
                            size: 16
                        },
                        padding: {
                            top: 10,
                            bottom: 20
                        }
                    },
                    legend: {
                        display: false
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        titleColor: '#ffffff',
                        bodyColor: '#e0e0e0',
                        displayColors: false,
                        callbacks: {
                            label: function(context) {
                                return `Tempo: ${context.raw} ms`;
                            }
                        }
                    }
                }
            }
        });
    }
    
    // Função para exibir os resultados
    function displayResults(results) {
        // Criar uma tabela
        const table = document.createElement('table');
        
        // Cabeçalho da tabela
        const thead = document.createElement('thead');
        const headerRow = document.createElement('tr');
        
        const headers = ['Algoritmo', 'Tempo (ms)', 'Status'];
        headers.forEach(headerText => {
            const th = document.createElement('th');
            th.textContent = headerText;
            headerRow.appendChild(th);
        });
        
        thead.appendChild(headerRow);
        table.appendChild(thead);
        
        // Corpo da tabela
        const tbody = document.createElement('tbody');
        
        results.forEach(result => {
            const row = document.createElement('tr');
            
            // Nome do algoritmo (formatado)
            const nameCell = document.createElement('td');
            nameCell.textContent = formatAlgorithmName(result.name);
            
            // Tempo de execução
            const timeCell = document.createElement('td');
            timeCell.textContent = result.time === "Erro" ? "Erro" : result.time + ' ms';
            
            // Status da ordenação
            const statusCell = document.createElement('td');
            
            if (result.time === "Erro") {
                statusCell.textContent = "Falha";
                statusCell.style.color = '#ff5252';
                if (result.error) {
                    const errorSpan = document.createElement('span');
                    errorSpan.className = 'error-details';
                    errorSpan.textContent = ` (${result.error})`;
                    statusCell.appendChild(errorSpan);
                }
            } else {
                statusCell.textContent = result.sorted ? 'Sucesso' : 'Falha';
                statusCell.style.color = result.sorted ? '#4CAF50' : '#ff5252';
            }
            
            row.appendChild(nameCell);
            row.appendChild(timeCell);
            row.appendChild(statusCell);
            
            tbody.appendChild(row);
        });
        
        table.appendChild(tbody);
        resultsContainer.innerHTML = '';
        resultsContainer.appendChild(table);
    }
    
    // Função para formatar o nome do algoritmo
    function formatAlgorithmName(name) {
        return name
            .replace(/([A-Z])/g, ' $1')
            .replace(/^./, str => str.toUpperCase());
    }
});
