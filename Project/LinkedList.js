class LinkedList {
    constructor(){
        this.head = null;
        this.size = 0;
    }

    Add(nodeSize){
        if(nodeSize <= 0){
            return console.log("Please enter a valid node size.");
        }

        var current;
        
        if (this.head == null){
            this.head = new Node(0, nodeSize);;
        }
        else {
            current = this.head;
      
            while (current.next) {
                current = current.next;
            }
      
            current.next = new Node(current.position + current.size, nodeSize);
        }
        this.size++;
    }

    InsertAt(index, nodeSize){
        if (index < 0 || index > this.size){
            return console.log("Please enter a valid index.");
        }
        
        var node = new Node(nodeSize);

        if (index == 0) {
            node.next = this.head;
            this.head = node;
        } 
        else {
            var current = this.head;
            var previous;
            var counter = 0;

            while (counter < index) {
                counter++;
                previous = current;
                current = current.next;
            }

            node.next = current;
            previous.next = node;
        }

        this.size++;
    }

    RemoveFrom(index){
        if (index < 0 || index >= this.size){
            return console.log("Please Enter a valid index");
        }

        var current = this.head;
        var previous = current;
        var counter = 0;

        if (index === 0) {
            this.head = current.next;
        } 
        else {
            while (counter < index) {
                counter++;
                previous = current;
                current = current.next;
            }

            previous.next = current.next;
        }

        this.size--;

        return current;
    }

    PrintList(){
        if (this.size == 0){
            return console.log("List is empty");
        }

        var current = this.head;

        while (current != null){
            console.log("Element:");

            console.log("   Position: ", current.position);
            console.log("   Size: ", current.size);
            console.log("   Free Space: ", current.freeSpace);

            current = current.next;
        }
    }
}