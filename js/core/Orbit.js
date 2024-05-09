import Converter from "../utils/Converter.js";
import Planet from "./Planet.js";
import Settings from "./Settings.js";

export default class Orbit {

    constructor(radius, speed, clockwise, initialAngle = 0) {

        this.clockwise = clockwise;
        this.speed = speed;
        this.radius = radius;
        this.initialAngle = initialAngle;

        this.degrees = initialAngle;

        this.planet = new Planet(this);

        this.center = {
            x: 0,
            y: 0
        }
    }

    setParentCircle(parent = null) {

        this.parent = parent;

        if (this.parent) {
            this.parent.planet.isDrawable = false;
        }

        this.planet.isDrawable = true;

        // this.center = {
        //     x: this.parent === null ? canvas.getWidth() / 2 : this.parent.planet.x,
        //     y: this.parent === null ? canvas.getHeight() / 2 : this.parent.planet.y
        // }

        // let angle = Converter.toRadians(this.degrees);

        // if (!this.clockwise) {
        //     angle *= -1.0;
        // }

        // let nextX = this.center.x + (this.radius * Math.cos(angle));
        // let nextY = this.center.y + (this.radius * Math.sin(angle));

        // this.planet.x = nextX;
        // this.planet.y = nextY;
    }

    drawBegin(canvas) {

        // this.center = {
        //     x: this.parent === null ? canvas.getWidth() / 2 : this.parent.planet.x,
        //     y: this.parent === null ? canvas.getHeight() / 2 : this.parent.planet.y
        // }

        // let angle = Converter.toRadians(this.degrees);

        // if (!this.clockwise) {
        //     angle *= -1.0;
        // }

        // let nextX = this.center.x + (this.radius * Math.cos(angle));
        // let nextY = this.center.y + (this.radius * Math.sin(angle));

        // this.planet.x = nextX;
        // this.planet.y = nextY;
    }

    move(canvas) {

        this.center = {
            x: this.parent === null ? canvas.getWidth() / 2 : this.parent.planet.x,
            y: this.parent === null ? canvas.getHeight() / 2 : this.parent.planet.y
        }

        this.degrees += this.speed;


        let angle = Converter.toRadians(this.degrees);

        if (!this.clockwise) {
            angle *= -1.0;
        }

        let nextX = this.center.x + (this.radius * Math.cos(angle));
        let nextY = this.center.y + (this.radius * Math.sin(angle));

        this.planet.moveTo(nextX, nextY);
    }

    drawEnd(canvas) {

        this.drawCentroid(canvas);

        this.drawOrbit(canvas);

        this.planet.update(canvas);
    }

    drawCentroid(canvas) {

        if (!Settings.showCentroid) {
            return;
        }

        if (this.parent === null) {
            canvas.drawCircle(this.center.x, this.center.y, { radius: 2, color: Settings.centroidColor });
        }
    }

    drawOrbit(canvas) {

        if (!Settings.showOrbit) {
            return;
        }

        canvas.drawArc(this.center.x, this.center.y, { radius: this.radius, color: Settings.orbitColor });
    }
}
