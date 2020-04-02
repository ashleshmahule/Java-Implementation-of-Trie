var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");
var suggestions = [];
var prvlevel;
var flag = false;

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

function colorCircle() {
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.stroke();
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
        if (this.isLastNode(r) && !r.isEndOfWord) {
            r = null;
        }
        return r;
    }

    suggestions(r, prefix) {

        if (r.isEndOfWord) {
            suggestions.push(prefix);
            console.log(prefix);
        }

        if (this.isLastNode(r)) {
            return;
        }

        for (var i = 0; i < this.alphabetSize; i++) {
            if (r.children[i] != null) {
                // append current char
                prefix = prefix + String.fromCharCode(ascii('a') + i);
                this.suggestions(r.children[i], prefix);

                // remove the last char
                prefix = prefix.substring(0, prefix.length - 1);
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
        if (pCrawl.isEndOfWord && this.isLastNode(pCrawl)) {
            // console.log(text);
            return -1;
        }

        // if there are nodes below last matching character
        if (!this.isLastNode(pCrawl)) {
            var prefix = text;
            console.log("\nSuggestions are: ");
            this.suggestions(pCrawl, prefix);
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

            var ctx = canvas.getContext("2d");

            drawCircle(x, y + 60, str.length * 9.5, str);
            x += 55;

        }



        var search = null;
        var c = 0;

        var count = r.children.reduce(function (n, val) {
            return n + (val === search);
        }, 0);

        count = 26 - count;
        // console.log(count);


        for (var i = 0; i < this.alphabetSize; i++) {
            if (r.children[i] != null) {

                // console.log(String.fromCharCode(i + ascii('a')));


                // ctx.arc(95, 50, 40, 0, 2 * Math.PI);
                // ctx.stroke();

                if (level === 0) {
                    ctx.beginPath();
                    ctx.moveTo(300, 45);
                    ctx.lineTo(x, y + 60);
                    ctx.stroke();
                    var rstring = "Root (Empty)";
                    drawCircle(300, 45, rstring.length * 7, rstring);
                }

                s[level] = String.fromCharCode(i + ascii('a'));

                var ctx = canvas.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(x, y + 60);
                ctx.lineTo(x, y + 60 * 2);
                ctx.stroke();

                var str = s[level];
                drawCircle(x, y + 60, 30, str);

                prvlevel = level;

                this.traverse(r.children[i], s, level + 1, x, y + 60);

                // if (count > 1 && c === 0) {
                //     c++;
                //     ctx.beginPath();
                //     ctx.moveTo(x, y);
                //     ctx.lineTo(x + 55, y + 60);
                //     ctx.stroke();
                // }

                console.log(prvlevel + " " + level);

                // if(prvlevel===level+1) {
                //     x += 60;
                //     if(level===0) {
                //         x+=60;
                //     }
                //     flag=true;
                // }
                // else {
                //     flag=false;
                // }

                x += 60;

                if (level === 0) {
                    x += 60;
                }

            }

        }

    }

}


//helper functions

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
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    var r = "Root (Empty)";
    drawCircle(300, 45, r.length * 7, r);

    var key1 = $('#key1').val();
    var key2 = $('#key2').val();
    var key3 = $('#key3').val();
    var key4 = $('#key4').val();

    trie.insert(key1, 0);
    trie.insert(key2, 1);
    trie.insert(key3, 2);
    trie.insert(key4, 3);
    var s = [];
    trie.traverse(root, s, 0, 80, 80);
    console.log(trie);
    console.log();
}

function autoSuggestion() {
    var keyword = $('#keyword').val();
    trie.displaySuggestions(root, keyword);
    console.log(suggestions);
    var x = document.createElement('h5');
    x.id = "tsa";
    x.textContent = "The Sugestions Are: "
    document.getElementById('start').appendChild(x);
    document.getElementById('start').appendChild(makeUL(suggestions));
}

function makeUL(array) {
    list = document.getElementById("suggestions");
    for (var i = 0; i < array.length; i++) {
        var item = document.createElement('li');
        item.className = "list-group-item";

        item.appendChild(document.createTextNode(array[i]));

        list.appendChild(item);
    }

    return list;
}

function clearAll() {
    $('#key1').val('');
    $('#key2').val('');
    $('#key3').val('');
    $('#key4').val('');

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    $('#keyword').val('');
    $('#tsa').text('');

    $('#suggestions').empty();

    root = new Node(26);
    trie = new Trie(root, 26);
}