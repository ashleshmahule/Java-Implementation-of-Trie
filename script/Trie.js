var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

function drawCircle(x, y, w, text) {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.arc(x, y, w / 2, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.stroke();

    ctx = canvas.getContext("2d");
    ctx.font = '10pt Calibri';
    ctx.fillStyle = 'black';
    ctx.textAlign = 'center';
    ctx.fillText(text, x, y + 3);
}

class Trie {

    constructor(root, alphabetSize) {
        this.root = root;
        this.m = 0;
        this.sorted = [];
        this.alphabetSize = alphabetSize;
    }


    insert(key, i) {

        let pCrawl = this.root;

        for (var level = 0; level < key.length; level++) {

            // Starting from 0 therefore subtracting with 'a'
            let index = key.charCodeAt(level) - ascii('a');
            if (pCrawl.children[index] == null) {
                // console.log('if ' + index);
                pCrawl.children[index] = new Node(26);
            }

            pCrawl = pCrawl.children[index];

        }
        // mark last node as leaf
        pCrawl.isEndOfWord = true;
        pCrawl.index = i;
        // console.log(pCrawl);
    }

    search(key) {
        let pCrawl = root;

        for (var level = 0; level < key.length; level++) {
            var index = key.charAt(level) - 'a';

            if (pCrawl.children[index] == null) {
                return false;
            }

            pCrawl = pCrawl.children[index];
        }

        return (pCrawl != null && pCrawl.isEndOfWord);
    }

    isLastNode(r) {
        for (var i = 0; i < this.alphabetSize; i++) {
            if (r.children[i] != null) {
                return false;
            }
        }
        return true;
    }

    delete(r, key, level) {
        if (r == null) {
            console.log("Tree is empty");
            return null;
        }

        // the last character of key is to be processed
        if (level == key.length) {
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
        var index = key.charAt(level) - ascii('a');
        r.children[index] = delete(r.children[index], key, level + 1);

        // node does'nt have any child, and it is not end of word.
        if (isLastNode(r) && !r.isEndOfWord) {
            r = null;
        }
        return r;
    }

    suggestions(r, prefix) {

        if (r.isEndOfWord) {
            console.log(prefix);
        }

        if (isLastNode(r)) {
            return;
        }

        for (var i = 0; i < this.alphabetSize; i++) {
            if (r.children[i] != null) {
                // append current char
                prefix = prefix + String.fromCharCode('a' + i);

                suggestions(r.children[i], prefix);

                // remove the last char
                prefix = prefix.substring(0, prefix.length() - 1);
            }
        }

    }

    displaySuggestions(r, text) {
        let pCrawl = r;

        for (var level = 0; level < text.length; level++) {
            var index = text.charCodeAt(level) - ascii('a');

            if (pCrawl.children[index] == null) {
                return 0;
            }
            // console.log(pCrawl.isEndOfWord+" "+text.charAt(level));
            pCrawl = pCrawl.children[index];
        }

        // if prefix is present as a word, but there is no subtree below the last
        // matching node.
        if (pCrawl.isEndOfWord && isLastNode(pCrawl)) {
            // console.log(text);
            return -1;
        }

        // if there are nodes below last matching character
        if (!isLastNode(pCrawl)) {
            var prefix = text;
            console.log("\nSuggestions are: ");
            suggestions(pCrawl, prefix);
            return 1;
        }
        return -1;
    }

    // preorder traversal for sorting
    preorder(r, arr) {
        if (r == null) {
            return this.sorted;
        }

        for (var i = 0; i < this.alphabetSize; i++) {
            if (r.children[i] != null) {
                if (r.children[i].isEndOfWord) {

                    this.sorted.add(arr[r.children[i].index]);
                    // console.log(arr[r.children[i].index]);
                }
                preorder(r.children[i], arr);
            }
        }
        return this.sorted;
    }

    // level order traversal
    traverse(r, s, level, x, y) {

        if (r.isEndOfWord) {
            s = s.slice(0, level);
            console.log(s.join(""));
            var str = s.join("");
            // ctx.moveTo(this.x + 160, this.y + 70);
            // ctx.lineTo(this.x + 190, this.y + 100);
            // ctx.stroke();

            drawCircle(x, y + 35, str.length * 8, str);
            x+=50;

        }

        var search = null;

        var count = r.children.reduce(function (n, val) {
            return n + (val === search);
        }, 0);

        count = 26 - count;
        console.log(count);
        

        for (var i = 0; i < this.alphabetSize; i++) {
            if (r.children[i] != null) {

                console.log(String.fromCharCode(i + ascii('a')));

                // this.ctx=this.c.getContext("2d");
                // ctx.beginPath();
                // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
                // ctx.stroke();

                s[level] = String.fromCharCode(i + ascii('a'));
                // this.x+=5;
                // this.y+=10;
                // ctx.moveTo(this.x, this.y);

                // ctx.moveTo(this.x, this.y);
                // ctx.stroke();

                var str = s[level];
                drawCircle(x, y + 35, 20, str);

                this.traverse(r.children[i], s, level + 1, x, y + 35);
                x += 50;
            }
            
        }
        
    }


}


function ascii(a) {
    return a.charCodeAt(0);
}


String.prototype.replaceAt = function (index, replacement) {
    return this.substr(0, index) + replacement + this.substr(index + replacement.length);
}

function replaceChar(origString, replaceChar, index) {
    let firstPart = origString.substr(0, index);

    let lastPart = origString.substr(index + 1);

    let newString = firstPart + replaceChar + lastPart;

    return newString;
}






let root = new Node(26);
let trie = new Trie(root, 26);

var keys = ["hello", "dog", "hell", "cat", "a", "hel", "help", "help", "helping", "call", "do", "dont",
    "dolittle", "jump", "jug"
];


// for (var i = 0; i < keys.length; i++) {
//     trie.insert(keys[i], i);
// }



var i = 0;

function addNewNode() {
    ctx.clearRect(0, 0, canvas.clientWidth, canvas.height);
    trie.x = 50;
    trie.y = 50;
    var key = $('#key').val();
    $('#key').val('');

    trie.insert(key, i++);
    var s = [];
    trie.traverse(root, s, 0, 50, 50);
    console.log(trie);
    console.log();

    $('#parent')
}