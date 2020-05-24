class UI {
    constructor() {
        this.p = document.querySelector('.output');
    }

    paint(message) {
        this.p.innerHTML = message;
        setTimeout(() => {
            this.p.innerHTML = '';
        }, 3000);
    }
}