// Cours JS : Gérer un apnier e-commerce avec le localstorage
// https://www.youtube.com/watch?v=vMT4NNFYno0&ab_channel=trainingdev 

// objet panier
class Basket {
    constructor() {
        let basket = localStorage.getItem("basket");
        if (basket == null) {
            this.basket = [];
        } else {
            this.basket = JSON.parse(basket);
        }
    }

    // sauvegarder le panier
    save() {
        localStorage.setItem("basket", JSON.stringify(this.basket));
    }

    // ajouter un produit
    add(product) {
        let foundProduct = this.basket.find(p => p.id == product.id && p.color == product.color)
        // .find : fonction qui travaille sur les tableaux et qui permet de chercher un élément dans un tableau par rapport à une condition
        if (foundProduct != undefined) {
            foundProduct.quantity = foundProduct.quantity + parseInt(product.quantity);
        } else {
            /*product.quantity = 1;*/
            this.basket.push(product)
        }
        this.save();
    }

}