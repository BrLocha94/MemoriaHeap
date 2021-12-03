
const LinkedList = require('./LinkedList');
const Node = require('./Node')

var lastIndex = 0

module.exports = class Heap{
    constructor(heapSize){
        this.heapSize = heapSize;
        this.array = new Array(heapSize).fill(false);
        this.list = new LinkedList(heapSize);

        this.FirstFit = this.FirstFit.bind(this)
        this.BestFit = this.FirstFit.bind(this)
        this.WorstFit = this.FirstFit.bind(this)
        this.NextFit = this.NextFit.bind(this)
        this.Del = this.Del.bind(this)
        this.swap = this.swap.bind(this)
    }

    printHeap(){
        console.table(this.array);
    }

    swap(id, newId){
        const positionsToChange = this.array.reduce(function(acc, curr, i){
            if(curr === id){
                acc.push(i);
            }
            return acc
        }, [])

        positionsToChange.forEach(pos => {
            this.array[pos] = newId
        });
    }

    fill(id, pos, size){
        if(pos+size > this.heapSize){
            lastIndex = 99999
        } else {
            lastIndex = pos+size
        }
        this.array = this.array.fill(id, pos, pos+size)
    }

    Del(id){
        const positionsToDelete = this.array.reduce(function(acc, curr, i){
            if(curr === id){
                acc.push(i);
            }
            return acc
        }, [])

        positionsToDelete.forEach(pos => {
            this.array[pos] = false
        });

        const deletedGap = positionsToDelete.length
        const lastPosition = positionsToDelete[deletedGap-1]
        const firstPosition = positionsToDelete[0]
        const nextFree = this.array.indexOf(false, lastPosition)
        let curr = this.list.head

        if(this.list.check_space_before(firstPosition) && this.list.check_space_near_before(firstPosition)){
            console.log('l48 -> id:', id)
            while(curr){
               if(curr.next && curr.next.position > firstPosition){ 
                curr.freeSpace = nextFree - curr.position + 1

                //    if (curr.next) {
                //        console.log("Entrou->")                      
                //        curr.next = curr.next.next
                //    }
               }
               curr = curr.next 
            }
        }
        else if (this.list.check_space_after(firstPosition) && !this.array[lastPosition+1]){
            console.log('l60 -> id:', id)
            while(curr) {
                if (curr.position < firstPosition) {
                    curr.position = firstPosition
                    curr.freeSpace = nextFree - firstPosition
                }
                curr = curr.next 
            }
            
        }
        else if (this.list.check_space_before(firstPosition) && this.array[lastPosition]){
            console.log('l71 -> id:', id)
            while(curr){
                if (curr.next.position > firstPosition){
                    newNode = new Node(firstPosition, nextFree-firstPosition)
                    newNode.next = curr.next 
                    curr.next = newNode
                }
                curr = curr.next 
            }

        }
        else {
            console.log('l83 -> id:', id)
            let newNode = new Node(firstPosition, nextFree-firstPosition+1)
            newNode.next = this.list.head
            this.list.head = newNode
        }
        
        console.log('-----DEBUG-----')
        console.log('TENTANDO DELETAR O ID', id)
        this.list.print()

    }

    BestFit(id, size){
        var smallest = this.list.head.freeSpace
        var position = this.list.head.position
        var curr = this.list.head
        while(curr){
            if(size <= curr.freeSpace && curr.freeSpace <= smallest){
                smallest = curr.freeSpace
                position = curr.position
            }
            curr = curr.next
        }
        curr = this.list.head
        while(curr){
            if(curr.position == position){
                curr.position += size
                curr.freeSpace -= size
                this.fill(id, curr.position, size);
                if (curr.freeSpace == 0){
                    this.list.remove(curr.position)
                }
                
            }
            curr = curr.next
        }
        
        console.log('bestFitfunc')
    }

    WorstFit(id, size){
        var largest = this.list.head.freeSpace
        var position = this.list.head.position
        var curr = this.list.head
        while (curr) {
            if (size <= curr.freeSpace && curr.freeSpace > largest) {
                largest = curr.freeSpace
                position = curr.position
            }
        }
        //
        curr = this.list.head
        while(curr){
            if (curr.position == position) {
                curr.position += size
                curr.freeSpace -= size
                this.fill(id, curr.position, size);
                if (curr.freeSpace === 0) {
                    this.list.remove(curr.position)
                }
            }
        }
    }

    FirstFit(id, size){
        var curr = this.list.head
        while(curr.freeSpace < size){
            curr = curr.next
        }
        this.fill(id, curr.position, size);
        if(!curr.next){
            curr.position = curr.position + size
            curr.freeSpace = curr.freeSpace - size
        }
        // if(this.list.head === curr){
        //     this.list.head = curr.next
        // }

    }

    NextFit(id, size){
        var curr = this.list.head
        while(curr.position < lastIndex){
            curr = curr.next
            if (lastIndex > this.heapSize){
                curr = this.list.head
            }
        }
        this.fill(id, curr.position, size);
        if(!curr.next){
            curr.position = curr.position + size
            curr.freeSpace = curr.freeSpace - size
        }
        console.log(lastIndex);
        console.log('nextFitfunc')
    }

}
