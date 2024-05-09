// A position in 2D space.
export class Vector2 {
    private x: number;
    private y: number;

    constructor(x: number, y: number) {
        this.x = x;
        this.y = y;
    }

    toString(): String {
        return this.x.toString() + " " + this.y.toString();
    }

    getX(): number {
        return this.x;
    }

    getY(): number {
        return this.y;
    }
}