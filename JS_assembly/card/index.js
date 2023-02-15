// В этой компоненте будет вся логика от всей страницы и другие компоненты
import CardsList from "./cards-list.js";
import Pagination from "./pagination.js";

// products?_page=1&_limit=9
const backendUrl = `https://online-store.bootcamp.place/api/`;

export default class OnlineStorePage {
    constructor() {
        // Колличество страничек на листе
        this.pageSize = 9;

        // указываем, что products = [] по умолчанию пустой массив
        this.products = [];

        // добавляем параметр "products" к адресу "beckendUrl"
        // необходимо поменять this.url на this.productsurl
        // будет еще this.Categoryurl и this.Brandurl
        this.url = new URL("products", backendUrl);
        this.url.searchParams.set("_limit", this.pageSize);
        
        this.components = {};
        
        this.initComponents();
        this.render();
        this.renderComponents();

        this.initEventListeners();

        this.update(1);
    }

    async loadData(pageNumber) {
        // этот метод отвечает за загрузку данных

        this.url.searchParams.set("_page", pageNumber);

        const response = await fetch(this.url);
        const products = await response.json();

        console.log("products=", products);

        // fetch(url)
        // .then(response => response.json())
        // .then(products => {
        //     console.log("products=", products);
        // });

        return products;
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
        // Зададим колличиство элементов в объекте products
        const totalElements = 100;
        const totalPages = Math.ceil(totalElements / this.pageSize);

        // const cardsList = new CardsList(this.products.slice(0, this.pageSize));
        
        const cardsList = new CardsList(this.products);
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

            this.update(pageIndex + 1);
        })
    }

    async update(pageNumber) {
        // этот метод реализует логику отрисовки

        // const start = this.pageSize * pageIndex;
        // const end = start + this.pageSize;
        // const data = this.products.slice(start, end);
        const data = await this.loadData(pageNumber);

        this.components.cardsList.update(data);
    }
}