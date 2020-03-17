import java.util.*;

class Trie {
    int alphabetSize = 26;
    Node root;

    void insert(String key, int i) {

        Node pCrawl = root;

        for (int level = 0; level < key.length(); level++) {

            // Starting from 0 therefore subtracting with 'a'
            int index = key.charAt(level) - 'a';
            if (pCrawl.children[index] == null) {
                pCrawl.children[index] = new Node(26);
            }

            pCrawl = pCrawl.children[index];

        }
        // mark last node as leaf
        pCrawl.isEndOfWord = true;
        pCrawl.index = i;

    }

    boolean search(String key) {
        Node pCrawl = root;

        for (int level = 0; level < key.length(); level++) {
            int index = key.charAt(level) - 'a';

            if (pCrawl.children[index] == null) {
                return false;
            }

            pCrawl = pCrawl.children[index];
        }

        return (pCrawl != null && pCrawl.isEndOfWord);
    }

    boolean isLastNode(Node r) {
        for (int i = 0; i < alphabetSize; i++) {
            if (r.children[i] != null) {
                return false;
            }
        }
        return true;
    }

    Node delete(Node r, String key, int level) {
        if (r == null) {
            System.out.println("Tree is empty");
            return null;
        }

        // the last character of key is to be processed
        if (level == key.length()) {
            if (r.isEndOfWord) {
                r.isEndOfWord = false;
            }

            // if given key is not prefix of any keys present
            if (isLastNode(r)) {
                r = null;
            }
            return r;
        }

        // traversing for last character of given key
        int index = key.charAt(level) - 'a';
        r.children[index] = delete(r.children[index], key, level + 1);

        // node does'nt have any child, and it is not end of word.
        if (isLastNode(r) && !r.isEndOfWord) {
            r = null;
        }
        return r;
    }

    void suggestions(Node r, String prefix) {

        if (!root.isEndOfWord) {
            System.out.println(prefix);
        }

        if (isLastNode(r)) {
            return;
        }

        for (int i = 0; i < alphabetSize; i++) {
            if (r.children[i] != null) {
                // append current char
                prefix = prefix + (char) ('a' + i);

                suggestions(r.children[i], prefix);

                // remove the last char
                prefix = prefix.substring(0, prefix.length() - 1);
            }
        }

    }

    int displaySuggestions(Node r, final String text) {
        Node pCrawl = r;

        for (int level = 0; level < text.length(); level++) {
            int index = text.charAt(level) - 'a';

            if (pCrawl.children[index] == null) {
                return 0;
            }
            // System.out.println(pCrawl.isEndOfWord+" "+text.charAt(level));
            pCrawl = pCrawl.children[index];
        }

        // if prefix is present as a word, but there is no subtree below the last
        // matching node.
        if (pCrawl.isEndOfWord && isLastNode(pCrawl)) {
            // System.out.println(text);
            return -1;
        }

        // if there are nodes below last matching character
        if (!isLastNode(pCrawl)) {
            String prefix = text;
            System.out.println("\nSuggestions are: ");
            suggestions(pCrawl, prefix);
            return 1;
        }
        return -1;
    }

    int m = 0;
    ArrayList<String> sorted = new ArrayList<>();

    // preorder traversal for sorting
    ArrayList<String> preorder(Node r, String[] arr) {
        if (r == null) {
            return sorted;
        }

        for (int i = 0; i < alphabetSize; i++) {
            if (r.children[i] != null) {
                if (r.children[i].isEndOfWord) {

                    sorted.add(arr[r.children[i].index]);
                    // System.out.println(arr[r.children[i].index]);
                }
                preorder(r.children[i], arr);
            }
        }
        return sorted;
    }

    // level order traversal
    void traverse(Node r, String s, int level) {
        if (r.isEndOfWord) {
            System.out.println(s);
        }

        for (int i = 0; i < alphabetSize; i++) {
            if (r.children[i] != null) {
                char[] chAr = s.toCharArray();
                chAr[level] = (char) (i + 'a');
                s = new String(chAr);
                traverse(r.children[i], s, level + 1);
            }
        }
    }

}