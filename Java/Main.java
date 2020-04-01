import java.util.*;

class Main {
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);

        int choice = 999;

        // All the keys to be added in trie
        String keys[] = { "hello", "dog", "hell", "cat", "a", "hel", "help", "help", "helping", "call", "do", "dont",
                "dolittle", "jump", "jug" };

        Trie trie = new Trie();
        Node root = new Node(26);
        trie.root = root;

        for (int i = 0; i < keys.length; i++) {
            trie.insert(keys[i], i);
        }

        System.out.println("Traversal of trie");

        String s = new String(new char[20]);
        trie.traverse(root, s, 0);

        // s = new String(new char[20]);
        // trie.delete(root, "dog", 0);
        // trie.traverse(root, s, 0);

        while (choice != 0) {
            System.out.println(
                    "\nEnter 1 to see auto complete application. \nEnter 2 to see string array sorting. \nEnter 0 to exit.");
            choice = sc.nextInt();

            switch (choice) {
                case 1:
                    System.out.println("\nEnter the text to see its autocomplete suggestions");
                    String input = sc.next();

                    int res = trie.displaySuggestions(root, input);

                    if (res == -1) {
                        System.out.println("\nNo other strings found containing the given prefix");
                    }

                    else if (res == 0) {
                        System.out.println("\nNo string found containing the given prefix");
                    }
                    break;

                case 2:
                    // sorting worst case complexity is sum of length of every string in the trie    

                    System.out.println();
                    ArrayList<String> sorted = trie.preorder(root, keys);

                    for (String k : sorted) {
                        System.out.println(k);
                    }
                    break;

                case 0:
                    break;

            }

        }

        sc.close();
    }
}
