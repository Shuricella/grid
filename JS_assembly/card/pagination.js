export default class Pagination {
    constructor () {
        this.defaultPagesSize = 12;
        this.render();
    }

    getTemplate() {
        return `
            <div class="osnova">
                <nav class="ramka">
                    <div>
                        <a href="#" class="krug krug-left" data-element="nav-prev">
                        <i class="bi bi-chevron-left"></i>
                        </a>
                    </div>
                                        
                    ${this.getPages()} 
                    
                    <div>
                        <a href="#" class="krug krug-right" data-element="nav-next">
                            <i class="bi bi-chevron-right"></i>
                        </a>
                    </div>
                </nav>
            </div>
        `
    }

    getPages() {
        // Создадим массив Array с кол-ом элеменотов defaultPagesSize и заполним его 1
        // map вернет нам новый массив с элементами pagination через запятую
        return `
            <ul class="page-list non-styles" data-element="pagination">
                ${new Array(this.defaultPagesSize).fill(1).map((item, index) => {
                    return this.getPageTemplate(index);
                }
                ).join("")
                }
            </ul>
        `
    }

    getPageTemplate(pageIndex = 0) {
        return `
            <li>
                <a href="#" data-element="page-link" class="krug non-styles active"  data-page-index="${pageIndex}">
                    ${pageIndex + 1}
                </a>
            </li>
        `
    }

    render() {
        const wrapper = document.createElement("section");

        wrapper.innerHTML = this.getTemplate();

        // помещаем элемент в наш обьект
        this.element = wrapper;
    }
}

// Следующая лекция №10
