// Classical Sorting Algorithms in JavaScript

// Radix Sort (LSD) – only for non-negative integers
function getMax(arr) {
    let max = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] > max) max = arr[i];
    }
    return max;
}

function countSort(arr, exp) {
    const n = arr.length;
    const output = new Array(n);
    const count = new Array(10).fill(0);

    // Count occurrences
    for (let i = 0; i < n; i++) {
        const index = Math.floor(arr[i] / exp) % 10;
        count[index]++;
    }

    // Accumulate counts
    for (let i = 1; i < 10; i++) {
        count[i] += count[i - 1];
    }

    // Build output array (stable)
    for (let i = n - 1; i >= 0; i--) {
        const index = Math.floor(arr[i] / exp) % 10;
        output[count[index] - 1] = arr[i];
        count[index]--;
    }

    // Copy back
    for (let i = 0; i < n; i++) {
        arr[i] = output[i];
    }
}

function radixSort(arr) {
    const arrCopy = [...arr];
    if (arrCopy.length === 0) return arrCopy;

    const max = getMax(arrCopy);
    let exp = 1;
    while (Math.floor(max / exp) > 0) {
        countSort(arrCopy, exp);
        exp *= 10;
    }
    return arrCopy;
}

// Heap Sort
function heapify(arr, n, i) {
    let largest = i;
    const left = 2 * i + 1;
    const right = 2 * i + 2;

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];
        heapify(arr, n, largest);
    }
}

function heapSort(arr) {
    const arrCopy = [...arr];
    const n = arrCopy.length;

    // Build max heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arrCopy, n, i);
    }

    // Extract elements
    for (let i = n - 1; i > 0; i--) {
        [arrCopy[0], arrCopy[i]] = [arrCopy[i], arrCopy[0]];
        heapify(arrCopy, i, 0);
    }

    return arrCopy;
}

// Merge Sort
function merge(left, right) {
    const result = [];
    let i = 0, j = 0;

    while (i < left.length && j < right.length) {
        if (left[i] < right[j]) {
            result.push(left[i]);
            i++;
        } else {
            result.push(right[j]);
            j++;
        }
    }
    return result.concat(left.slice(i)).concat(right.slice(j));
}

function mergeSort(arr) {
    if (arr.length <= 1) return [...arr];

    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));

    return merge(left, right);
}

// Quick Sort (recursive, in-place)
function partition(arr, low, high) {
    const pivot = arr[high];
    let i = low - 1;

    for (let j = low; j < high; j++) {
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    return i + 1;
}

function quickSortHelper(arr, low, high) {
    if (low < high) {
        const pi = partition(arr, low, high);
        quickSortHelper(arr, low, pi - 1);
        quickSortHelper(arr, pi + 1, high);
    }
}

function quickSort(arr) {
    const arrCopy = [...arr];
    quickSortHelper(arrCopy, 0, arrCopy.length - 1);
    return arrCopy;
}

// Bubble Sort (optimized)
function bubbleSort(arr) {
    const arrCopy = [...arr];
    const n = arrCopy.length;
    let swapped;

    for (let i = 0; i < n - 1; i++) {
        swapped = false;
        for (let j = 0; j < n - i - 1; j++) {
            if (arrCopy[j] > arrCopy[j + 1]) {
                [arrCopy[j], arrCopy[j + 1]] = [arrCopy[j + 1], arrCopy[j]];
                swapped = true;
            }
        }
        if (!swapped) break;
    }
    return arrCopy;
}

// Insertion Sort
function insertionSort(arr) {
    const arrCopy = [...arr];
    for (let i = 1; i < arrCopy.length; i++) {
        const key = arrCopy[i];
        let j = i - 1;
        while (j >= 0 && arrCopy[j] > key) {
            arrCopy[j + 1] = arrCopy[j];
            j--;
        }
        arrCopy[j + 1] = key;
    }
    return arrCopy;
}

// Shell Sort (gap halving)
function shellSort(arr) {
    const arrCopy = [...arr];
    let gap = Math.floor(arrCopy.length / 2);

    while (gap > 0) {
        for (let i = gap; i < arrCopy.length; i++) {
            const temp = arrCopy[i];
            let j = i;
            while (j >= gap && arrCopy[j - gap] > temp) {
                arrCopy[j] = arrCopy[j - gap];
                j -= gap;
            }
            arrCopy[j] = temp;
        }
        gap = Math.floor(gap / 2);
    }
    return arrCopy;
}

// Selection Sort
function selectionSort(arr) {
    const arrCopy = [...arr];
    for (let i = 0; i < arrCopy.length - 1; i++) {
        let minIdx = i;
        for (let j = i + 1; j < arrCopy.length; j++) {
            if (arrCopy[j] < arrCopy[minIdx]) minIdx = j;
        }
        [arrCopy[i], arrCopy[minIdx]] = [arrCopy[minIdx], arrCopy[i]];
    }
    return arrCopy;
}

// Exporting all algorithms
window.sortingAlgorithms = {
    radixSort,
    heapSort,
    mergeSort,
    quickSort,
    bubbleSort,
    insertionSort,
    shellSort,
    selectionSort
};
