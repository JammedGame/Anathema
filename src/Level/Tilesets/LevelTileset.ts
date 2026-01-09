import * as TBX from 'toybox-engine';

import LevelTilesetBlueprint, { LevelTilesetCeilingType, LevelTilesetSettings } from './LevelTilesetBlueprint';

type LevelTilesetCollections = {
    floor: TBX.ImageCollection;
    wallUpper: TBX.ImageCollection;
    wallLower: TBX.ImageCollection;
    ceiling: TBX.ImageCollection;
    separate?: TBX.ImageCollection;
}

class LevelTileset {
    public name: string;
    public wallVoid: boolean;
    public settings: LevelTilesetSettings;
    public blueprint: LevelTilesetBlueprint;
    public collections?: LevelTilesetCollections;
    public get initialized() { return !!this.collections; }

    public constructor(blueprint: LevelTilesetBlueprint) {
        this.name = blueprint.name;
        this.wallVoid = false;
        this.settings = blueprint.settings;
        this.blueprint = blueprint;
    }

    public init(): void {
        let ceilingLength = 2;
        switch(this.settings.ceiling) {
            case LevelTilesetCeilingType.Roofed: ceilingLength = 6; break;
            case LevelTilesetCeilingType.Crested: ceilingLength = 14; break;
            case LevelTilesetCeilingType.Bordered: ceilingLength = 17; break;
            default: ceilingLength = 2;
        };
        const floorImages: string[] = this.formImagePathArray(this.name, 'g', this.blueprint.lengths.floor);
        const wallUpperImages: string[] = this.formImagePathArray(this.name, 'wu', this.blueprint.lengths.wall);
        const wallLowerImages: string[] = this.formImagePathArray(this.name, 'wl', this.blueprint.lengths.wall);
        const ceilingImages: string[] = this.formImagePathArray(this.name, 'c', ceilingLength);
        const separateImages: string[] = this.blueprint.lengths.separate > 0 ? this.formImagePathArray(this.name, 'c', this.blueprint.lengths.separate) : [];
        this.collections = {
            floor: new TBX.ImageCollection(null, floorImages),
            wallUpper: new TBX.ImageCollection(null, wallUpperImages),
            wallLower: new TBX.ImageCollection(null, wallLowerImages),
            ceiling: new TBX.ImageCollection(null, ceilingImages),
            separate: this.blueprint.lengths.separate > 0 ? new TBX.ImageCollection(null, separateImages) : undefined,
        };
    }

    private formImagePathArray(name: string, type: string, length: number): string [] {
        return Array(length)
        .fill(0).map((_value: number, index: number) => {
            let s = (index + 1).toString();
            if (index < 9) s = '0' + s;
            return "/tilesets/" + name + "/" + type + s + ".png";
        });
    }
}

export default LevelTileset;
