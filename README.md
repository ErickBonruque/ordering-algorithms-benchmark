# 🚀 Comparação de Algoritmos de Ordenação

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E)
![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white)
![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white)
![Chart.js](https://img.shields.io/badge/chart.js-F5788D.svg?style=for-the-badge&logo=chart.js&logoColor=white)

Uma ferramenta interativa para benchmark e comparação visual de diferentes algoritmos de ordenação. Este projeto permite visualizar o desempenho de algoritmos clássicos de ordenação em diversos cenários.

## 📊 Visão Geral

Este projeto é uma ferramenta de benchmark que compara o tempo de execução de vários algoritmos de ordenação em diferentes tipos de conjuntos de dados. Os usuários podem selecionar o tamanho do array, a configuração inicial (ordenado, invertido, aleatório) e os algoritmos específicos para teste.

Os resultados são apresentados em uma tabela detalhada e um gráfico intuitivo, permitindo uma análise visual imediata do desempenho relativo de cada algoritmo.

## ✨ Funcionalidades

- Benchmark de 8 algoritmos de ordenação clássicos
- Personalização do tamanho do conjunto de dados (até 2 milhões de elementos)
- Opções para diferentes configurações iniciais do array (ordenado, invertido, aleatório)
- Visualização dos resultados em tabela e gráfico de barras
- Interface responsiva com tema escuro
- Processamento assíncrono para conjuntos grandes de dados
- Verificação de corretude da ordenação

## 🧮 Algoritmos Implementados

- **Radix Sort**: Ordenação não-comparativa que processa dígitos individuais
- **Heap Sort**: Utiliza uma estrutura de heap para encontrar o elemento máximo
- **Merge Sort**: Algoritmo de divisão e conquista com complexidade O(n log n)
- **Quick Sort**: Método de divisão e conquista que utiliza pivôs
- **Bubble Sort**: Algoritmo de comparação simples que "borbulha" elementos
- **Insertion Sort**: Constrói o array ordenado um elemento por vez
- **Shell Sort**: Generalização do Insertion Sort que permite a troca de elementos distantes
- **Selection Sort**: Seleciona repetidamente o menor elemento

## 🛠️ Tecnologias Utilizadas

- JavaScript puro para implementação dos algoritmos
- HTML5 e CSS3 para a interface
- Chart.js para visualização gráfica dos resultados
- Processamento assíncrono via setTimeout para melhor experiência do usuário

## 📋 Pré-requisitos

Este é um projeto front-end puro, sem dependências de servidor. Você precisa apenas de:

- Um navegador web moderno (Chrome, Firefox, Edge, etc.)

## 🚀 Instalação

1. Clone o repositório:
```bash
git clone https://github.com/ErickBonruque/ordering-algorithms-benchmark
```

2. Navegue até o diretório do projeto:
```bash
cd ordering-algorithms-benchmark
```

3. Abra o arquivo `index.html` em seu navegador:
```bash
# No Windows
start index.html

# No macOS
open index.html

# No Linux
xdg-open index.html
```

## 🧪 Como Usar

1. Defina o tamanho do array (entre 1 e 2.000.000)
2. Selecione a ordem inicial dos elementos (ordenado, invertido ou aleatório)
3. Marque os algoritmos que deseja comparar
4. Clique em "Iniciar Comparação" 
5. Aguarde a execução e visualize os resultados na tabela e no gráfico

## 📈 Entendendo os Resultados

- A tabela mostra o tempo de execução de cada algoritmo em milissegundos
- O status indica se a ordenação foi bem-sucedida
- O gráfico de barras permite uma comparação visual rápida entre os algoritmos
- Algoritmos mais rápidos aparecem primeiro na tabela

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Abrir issues para reportar bugs ou sugerir melhorias
2. Enviar pull requests para adicionar novos algoritmos ou otimizar os existentes
3. Contribuir com melhorias na interface ou documentação

## 📜 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ⚠️ Observações

- Para conjuntos muito grandes (>100.000 elementos), algoritmos O(n²) como Bubble Sort e Selection Sort podem levar muito tempo para completar
- O projeto utiliza setTimeout para processar arrays grandes de forma assíncrona, permitindo que a interface se mantenha responsiva

---

Desenvolvido para fins educacionais e de pesquisa comparativa entre algoritmos de ordenação.
