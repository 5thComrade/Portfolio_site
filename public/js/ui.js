class UI {
    constructor() {
        this.p = document.querySelector('.output');
    }

    paint(message) {
        this.p.classList.add('pb-5');
        this.p.innerHTML = message;
        setTimeout(() => {
            this.p.innerHTML = '';
            this.p.classList.remove('pb-5');
        }, 3000);
    }
}