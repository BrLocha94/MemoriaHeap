
module.exports = class Node {
	constructor(position, freeSpace){
        this.position = position;
        this.freeSpace = freeSpace;
		this.next = null;
	}
}
