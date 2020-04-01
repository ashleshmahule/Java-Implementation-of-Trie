class Node {
    Node[] children;
    boolean isEndOfWord;
    int index;

    Node(int alphabetSize) {
        children = new Node[alphabetSize];
        isEndOfWord = false;

        for (int i = 0; i < alphabetSize; i++) {
            children[i] = null;
        }
        index = -1;
    }
}