import Orbit from "./Orbit.js";

export default class Spirograph {

    constructor(canvas) {

        this.canvas = canvas;
        this.orbits = [];
        this.isRunning = true;

        this.clear();
    }

    clear() {
        this.orbits = [];
    }

    getLastCircle() {

        if (this.orbits.length === 0) {
            return null;
        }

        return this.orbits[this.orbits.length - 1];
    }

    addOrbit(radius, speed, clockwise, initialAngle = 0) {

        const orbit = new Orbit(radius, speed, clockwise, initialAngle);

        orbit.setParentCircle(this.getLastCircle());

        this.orbits.push(orbit);
    }

    update() {

        this.canvas.clear();

        for (const orbit of this.orbits) {

            // orbit.drawBegin(this.canvas);

            if (this.isRunning) {
                orbit.move(this.canvas);
            }

            orbit.drawEnd(this.canvas);
        }
    }
}
