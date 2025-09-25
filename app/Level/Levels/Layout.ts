import * as TBX from 'toybox-engine';

import { Chunk } from '../Generators/Chunk/Chunk';

const FIELD_SIZE = 120;
const FIELD_DISTANCE_FACTOR = 11;

class Layout {
    public dimensions: TBX.Vertex;
    public parts: LayoutEntry[];
    public data: number[][];
    public megaChunk: Chunk;
    public startPart?: LayoutEntry;

    public get volume(): number { return this.dimensions.X * this.dimensions.Y };

    public constructor(dimensions: TBX.Vertex, value: number) {
        this.dimensions = dimensions;
        this.setValue(value);
        this.parts = [];
    }
    
    public print() {
        console.log("- - -");
        for (let i = 0; i < this.dimensions.Y; i++) {
            let Line: string = i.toString();
            if (Line.length < 2) Line = "0" + i;
            Line += ": ";
            for (let j = 0; j < this.dimensions.X; j++) {
                if (this.data[i][j] == -1) Line += "X, ";
                else Line += this.data[i][j] + ", ";
            }
            console.log(Line);
        }
        console.log("- - -");
    }

    private setValue(value: number): void {
        this.data = [];
        for (let i = 0; i < this.dimensions.Y; i++) {
            this.data.push([]);
            for (let j = 0; j < this.dimensions.X; j++) {
                this.data[i].push(value);
            }
        }
    }
}

class LayoutEntry {
    public size: TBX.Vertex;
    public location: TBX.Vertex;
    public spawnLocations: TBX.Vertex[];
    public Connections: LayoutEntry[];
    public ConnectionsSide: number[];
    public Chunk: Chunk;

    public get volume(): number { return this.size.X * this.size.Y };

    public constructor(size: number | TBX.Vertex, location: TBX.Vertex) {
        this.size = typeof size === 'number' ? new TBX.Vertex(size, size) : size;
        this.location = location;
        this.Connections = [];
        this.ConnectionsSide = [];
    }

    public calculateSpawnLocations(accessMatrix: number[][]): void {
        this.spawnLocations = [];
        for (let y = 0; y < this.Chunk.Dimensions.Y; y++) {
            for (let x = 0; x < this.Chunk.Dimensions.X; x++) {
                const globalLocation = new TBX.Vertex(this.location.X * FIELD_DISTANCE_FACTOR + x, this.location.Y * FIELD_DISTANCE_FACTOR + y);
                if (accessMatrix[y][x] === 1) {
                    this.spawnLocations.push(new TBX.Vertex(globalLocation.X * FIELD_SIZE, globalLocation.Y * (FIELD_SIZE * 0.8), 0));
                }
            }
        }
    }

    public useSpawnLocation(index: number): void {
        this.spawnLocations.splice(index, 1);
    }
}

class LayoutClass {
    public Size: number;
    public Number: number;

    public constructor(Size: number, Number: number) {
        this.Size = Size;
        this.Number = Number;
    }
}

export { LayoutEntry, LayoutClass };

export default Layout;
