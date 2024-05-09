import Settings from "./Settings.js";

export default class Planet {

    constructor(orbit) {

        this.orbit = orbit;

        this.x = null;
        this.y = null;
        this.lastX = null;
        this.lastY = null;
        this.paths = [];

        this.isDrawable = true;
    }

    moveTo(nextX, nextY) {

        this.lastX = this.x ? this.x : nextX;
        this.lastY = this.y ? this.y : nextY;

        this.x = nextX;
        this.y = nextY;

        if (this.isDrawable) {

            this.paths.push({
                x1: this.x,
                y1: this.y,
                x2: this.lastX,
                y2: this.lastY,
            });
        }
    }

    update(canvas) {

        for (const path of this.paths) {
            canvas.drawLine(path.x1, path.y1, path.x2, path.y2, { color: Settings.pathColor })
        }

        if (!Settings.showPlanet) {
            return;
        }

        if (this.isDrawable) {
            canvas.drawCircle(this.x, this.y, { radius: 4, color: Settings.drawablePlanetColor });
        } else {
            canvas.drawCircle(this.x, this.y, { radius: 4, color: Settings.noDrawablePlanetColor });
        }
    }
}
