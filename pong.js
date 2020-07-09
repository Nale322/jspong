class Color {
    constructor(red, green, blue, alpha) {
        this.r = red;
        this.g = green;
        this.b = blue;
        this.a = alpha;
    }
}

class Frame {
    constructor(imageData) {
        this.imageData = imageData;
        this.pixels = this.imageData.data;
    }


    setPixel(x, y, color) {
        const index = (y * 640 + x) * 4;

        if (index < this.pixels.length && index >= 0) {
            this.pixels[index] = color.r;
            this.pixels[index + 1] = color.g;
            this.pixels[index + 2] = color.b;
            this.pixels[index + 3] = color.a;
        }

    }

}

class Pong {
    constructor(canvas, width, height) {
        this.canvas = canvas;
        this.canvas.width = width;
        this.canvas.height = height;
        this.canvas.style = "border: 2px solid #bababa";
        this.lastRender = 0;

        this.ctx = canvas.getContext('2d');
    }

    start() {

        window.requestAnimationFrame(this.loop);
    }

    loop = (timestamp) => {

        let progress = timestamp - this.lastRender;

        this.draw();

        this.lastRender = timestamp;

        window.requestAnimationFrame(this.loop);
    }

    draw() {
        const rectangle = new Rectangle(50, 50, 50, 25, new Color())
        const circle = new Circle(150, 150, 20, new Color())

        let imageData = this.ctx.createImageData(this.canvas.width, this.canvas.height);
        console.log(imageData)
        const frame = new Frame(imageData);

        for (let w = 0; w < 640; w++) {
            for (let h = 0; h < 480; h++) {
                frame.setPixel(w, h, new Color(255, 255, 255, 255));
            }
        }

        this.ctx.putImageData(frame.imageData, 0, 0);

        rectangle.draw()
        circle.draw()
    }
}

class Rectangle {
    constructor(x, y, width, heigh, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.heigh = heigh;
        this.color = color;
        this.ctx = document.getElementById('pong').getContext('2d');
    }

    draw = () => {
        this.ctx.fillRect(this.x, this.y, this.width, this.heigh);
    }
}

class Circle {
    constructor(x, y, radius, color) {
        this.x = x
        this.y = y
        this.radius = radius
        this.color = color
        this.ctx = document.getElementById('pong').getContext('2d');
    }

    draw = () => {
        this.ctx.lineWidth = 2;
        this.ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, true);
        this.ctx.fillStyle = this.color
        this.ctx.fill();

    }
}

const pong = new Pong(document.getElementById('pong'), 640, 480);
pong.start();
