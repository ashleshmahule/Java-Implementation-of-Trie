class Node {

    constructor (alphabetSize) {
        this.children = [];
        this.isEndOfWord = false;

        for (var i = 0; i < alphabetSize; i++) {
            this.children[i] = null;
        }
        this.index = -1;
    }
}