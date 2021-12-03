const fs = require('fs');
const Heap = require('./Heap');
const LinkedList = require('./LinkedList');
const Node = require('./Node')
var commands = []


const HEAP_SIZE = 30
// apenas indicar se uma area da memoria está alocada ou não.
// no exemplo: as 5 primeiras posições estão alocadas para a,
// as 3 seguintes para b

const heap = new Heap(HEAP_SIZE);
var heap_strategy = ""

const strategyMap = {
    first: heap.FirstFit,
    best: heap.BestFit,
    worst: heap.WorstFit,
    next: heap.NextFit,
}

try {
    const data = fs.readFileSync('example.txt', 'UTF-8');
    const lines = data.split(/\r?\n/);
    lines.forEach((line) => {
        commands.push(line)
    });
} catch (err) {
    console.error(err);
}


commands.map(function(cmd) {
    
    if(cmd.includes('heap')){
        if(cmd.includes('first')){
            heap_strategy = 'first'
        }
        if(cmd.includes('best')){
            heap_strategy = 'best'

        }
        if(cmd.includes('worst')){
            heap_strategy = 'worst'
        }
        if(cmd.includes('next')){
            heap_strategy = 'next'
        }
    }
    if(cmd.includes('new')){
        // remove a palara new
        const vars = cmd.slice(4);
        const func = strategyMap[heap_strategy]
        func(vars[0], Number(vars[2]))
    }
    if(cmd.includes('del')){
        const vars = cmd.slice(4);
        heap.Del(vars[0])
    }
    if(cmd.includes('exibe')){
        heap.printHeap()
    }
    if(cmd.includes('=')){
        heap.swap(cmd[4], cmd[0])
        console.log('=')
    }
})