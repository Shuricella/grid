// В этой компоненте будет вся логика от всей страницы и другие компоненты
import CardsList from "./cards-list.js";
import Pagination from "./pagination.js";

export default class OnlineStorePage {
    constructor(products = []) {
        // Колличество страничек на листе
        this.pageSize = 4;

        this.products = products;

        this.components = {};
        
        this.initComponents();
        this.render();
        this.renderComponents();

        this.initEventListeners();
    }

    getTemplate() {
        return `
        <div class="wrapper">
            <div class="cardsList" data-element="cardsList">
                <!-- Card List component -->
            </div>

            <div data-element="pagination">
                <!--Pagination component-->
            </div>
        </div>
        `;
    }

    initComponents() {
        const totalPages = Math.ceil(this.products.length / this.pageSize);

        const cardsList = new CardsList(this.products.slice(0, this.pageSize));
        const pagination = new Pagination({
            activePageIndex: 0,
            totalPages: totalPages
        });

        this.components.cardsList = cardsList;
        this.components.pagination = pagination;
    }

    renderComponents() {
        const cardsConteiner = this.element.querySelector('[data-element="cardsList"]');
        const paginationConteiner = this.element.querySelector('[data-element="pagination"]');

        cardsConteiner.append(this.components.cardsList.element);
        paginationConteiner.append(this.components.pagination.element);
    }

    render() {
        const wrapper = document.createElement("div");

        wrapper.innerHTML = this.getTemplate();

        // помещаем элемент в наш обьект
        this.element = wrapper.firstElementChild;
    }

    initEventListeners() {
        this.components.pagination.element.addEventListener("page-changed", event => {
            const pageIndex = event.detail;

            const start = this.pageSize * pageIndex;
            const end = start + this.pageSize;
            const data = this.products.slice(start, end);

            this.components.cardsList.update(data);
        })
    }
}