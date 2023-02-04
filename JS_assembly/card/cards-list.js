import Card from "./card.js";

export default class CardsList {
    constructor(data = []) {
        this.data = data;

        this.render();
        this.renderCards();
    }

    getTemplate() {
        return `
                <div class="os-products-list" data-element="body">
                <--Cards list-->
                </div>
        `;
    }

    render() {
        const wrapper = document.createElement("section");

        wrapper.innerHTML = this.getTemplate();

        // помещаем элемент в наш обьект
        this.element = wrapper;
    }

    renderCards() {
        const cards = this.data.map(item => {
            const card = new Card(item);

            return card.element;
        });

        const body = this.element.querySelector('[data-element="body"]');

        // очистим контент контейнера под Cards list чистой строчкой
        body.innerHTML = "";

        body.append(...cards);
    }

    update(data = []) {
        // обновим список карточек data
        this.data = data;

        this.renderCards();
    }
}