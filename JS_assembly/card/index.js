// В этой компоненте будет вся логика от всей страницы и другие компоненты
import Card from "./card.js";
import Pagination from "./pagination.js";

const product = {
    "id": "76w0hz7015kkr9kjkav",
    "images": "https://content2.rozetka.com.ua/goods/images/big_tile/163399632.jpg",
    "title": "Ноутбук Acer Aspire 3 A315-57G-336G (NX.HZREU.01S) Charcoal Black",
    "rating": 2.89,
    "price": 15999,
    "category": "laptops",
    "brand": "Acer"
};

// const monitor = {
//     "id": "ci0q634ou8kr9kjkav",
//     "images":"https://content.rozetka.com.ua/goods/images/big_tile/168721089.jpg",
//     "title": "Монитор 24.5\ Asus TUF Gaming VG259QR (90LM0530-B03370)",
//     "rating": 0.69,
//     "price": 14200,
//     "category": "monitors",
//     "brand": "asus"
// };

export default class OnlineStorePage {
    constructor() {
        this.components = {};
        
        this.initComponents();
        this.render();
        this.renderComponents();
    }

    getTemplate() {
        return `
        <div class="wrapper">
            <div data-element="card">
                <!--Card component-->
            </div>

            <div data-element="pagination">
                <!--Pagination component-->
            </div>
        </div>
        `
    }

    initComponents() {
        const card = new Card(product);
        const pagination = new Pagination({activePageIndex: 5});

        this.components.card = card;
        this.components.pagination = pagination;
    }

    renderComponents() {
        const cardConteiner = this.element.querySelector('[data-element="card"]');
        const paginationConteiner = this.element.querySelector('[data-element="pagination"]');

        cardConteiner.append(this.components.card.element);
        paginationConteiner.append(this.components.pagination.element);
    }

    render() {
        const wrapper = document.createElement("section");

        wrapper.innerHTML = this.getTemplate();

        // помещаем элемент в наш обьект
        this.element = wrapper;
    }
}