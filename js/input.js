class Mouse {
    constructor(element) {
        element.addEventListener('mousemove', (e) => {
           for (var property in e) this[property] = e[property];
        });
        element.addEventListener('mousedown', (e) => {
          for (var property in e) this[property] = e[property];
        });
        element.addEventListener('mousedown', (e) => {
         for (var property in e) this[property] = e[property];
        });
        element.addEventListener('wheel', (e) => {
            for (var property in e) this[property] = e[property];
        });
    }
};

class Keyboard {
    constructor(element) {
        document.addEventListener('keydown', (e) => document.dispatchEvent(new Event(e.code)));
    }
};

Input = new class InputHandler {
    constructor() {
        this.Mouse = new Mouse(canvas);
        this.Keyboard = new Keyboard();
    }
}