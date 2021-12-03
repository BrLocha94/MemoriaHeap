const Node = require('./Node')

// constructor(position, freeSpace){
//     this.position = position;
//     this.freeSpace = freeSpace;
//     this.next = null;
// }

module.exports = class LinkedList {

    constructor(heapSize){
        this.head = new Node(0, heapSize);
        this.size = 0;
        this.getLast = this.getLast.bind(this)
        this.print = this.print.bind(this)
        this.check_space_after = this.check_space_after.bind(this)
        this.check_space_before = this.check_space_before.bind(this)
        this.check_space_near_before = this.check_space_near_before.bind(this)

        
    }

    // print Node

    print(){
        let curr = this.head;      
        console.log(curr.position, curr.freeSpace);
        while(curr.next){
            curr = curr.next;
            console.log(curr.position, curr.freeSpace);
        }
    }

    // helper Methods

    add(newNode){
        const lastNode = this.getLast();
        lastNode.next = newNode
        // var curr;
        // if(this.head == null || this.head.position >= newNode.position){
        //     newNode.next = this.head
        //     this.head = newNode
        // } else{
        //     curr = this.head;
        //     while(curr.next !== null && curr.next.position < new.)
        // }
    }



    getFirst() {
        return this.head;
    }

    remove(pos){
        if(this.size() === 0){
            console.log('list is empty')
        }
        if(this.head.position === pos){
            this.head = this.head.next
        }
        var prev = this.head;
        var curr = this.head;
        while(curr){
            if(curr.position === pos){
                prev.next  = curr.next
                return
            }
            prev = curr

        }

    }

    size() {
        let count = 0; 
        let node = this.head;
        while (node) {
            count++;
            node = node.next
        }
        return count;
    }

    getLast() {
        let lastNode = this.head;
        if (lastNode) {
            while (lastNode.next) {
                lastNode = lastNode.next
            }
        }
        return lastNode
    }

    check_space_after(pos){
        let curr = this.head;
        while(curr.next){
            if(curr.position > pos){
                return true
            }
            curr = curr.next
        }
        return false
    }


    check_space_before(pos){
        let curr = this.head;
        while(curr.next){
            if(curr.position < pos){
                return true
            }
            curr = curr.next
        }
        return false
    }

    check_space_near_before(pos){
        let curr = this.head;
        while(curr.next){
            if(curr.position + curr.freeSpace == pos){
                return true
            }
            curr = curr.next
        }
        return false
    }



}