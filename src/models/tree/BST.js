import Node from "./Node.js";

class BST {
    #root

    constructor() {
        this.#root = null;
    }

    add(value) {
        if (this.#root === null) {
            this.#root = new Node(value);
            return this.#root !== null;
        } else {
            return this.insertNode(this.#root, value);
        }
    }

    insertNode(node, value) {
        if (value.nombreMascota < node.value.nombreMascota) { 
            if (node.left === null) { 
                node.left = new Node(value); 
                return node.left !== null;
            } else {
                return this.insertNode(node.left, value); 
            }
        } else if (value.nombreMascota > node.value.nombreMascota) { 
            if (node.right === null) { 
                node.right = new Node(value);
                return node.right !== null;
            } else {
                return this.insertNode(node.right, value);
            }
        } else {
            return false;
        }
    }
    
    search(nombreMascota) {
        return this.searchNode(this.#root, nombreMascota);
    }

    searchNode(node, nombreMascota) {
        if (node === null) {
            return null; 
        } else if (nombreMascota < node.value.nombreMascota) { 
            return this.searchNode(node.left, nombreMascota);
        } else if (nombreMascota > node.value.nombreMascota) {
            return this.searchNode(node.right, nombreMascota);
        } else {
            return node;
        }
    }

    min() {
        if (this.#root === null) {
            return null;
        }
        return this.findMinWeight(this.#root, this.#root);
    }
    
    findMinWeight(node, minNode) {
        if (node === null) {
            return minNode;
        }
        if (parseFloat(node.value.pesoMascota) < parseFloat(minNode.value.pesoMascota)) {
            minNode = node;
        }
        minNode = this.findMinWeight(node.left, minNode);
        return this.findMinWeight(node.right, minNode);
    }

    max() {
        if (this.#root === null) {
            return null;
        }
        return this.findMaxWeight(this.#root, this.#root);
    }

    findMaxWeight(node, maxNode) {
        if (node === null) {
            return maxNode;
        }
        if (parseFloat(node.value.pesoMascota) > parseFloat(maxNode.value.pesoMascota)) {
            maxNode = node;
        }
        maxNode = this.findMaxWeight(node.left, maxNode);
        return this.findMaxWeight(node.right, maxNode);
    }

    inOrderTraverse(callback) {
        this.inOrderTraverseNode(this.#root, callback);
    }

    inOrderTraverseNode(node, callback) {
        if (node != null) {
            this.inOrderTraverseNode(node.left, callback);
            callback(node.value);
            this.inOrderTraverseNode(node.right, callback);
        }
    }
}

export default BST;
