enum LevelTilesetFloorType {
    Uniform = 'uniform',
    Checkered = 'checkered',
}

enum LevelTilesetWallType {
    Uniform = 'uniform',
    Bordered = 'bordered',
    Divided = 'divided'
}

enum LevelTilesetCeilingType {
    Uniform = 'uniform',
    Crested = 'crested',
    Bordered = 'bordered',
    Roofed = 'roofed',
    Divided = 'divided'
}

enum LevelTilesetFillType {
    None = 'none',
    Floor = 'floor',
    Ceiling = 'ceiling',
    Separate = 'separate'
}

type LevelTilesetSettings = {
    floor: LevelTilesetFloorType;
    wall: LevelTilesetWallType;
    ceiling: LevelTilesetCeilingType;
    fill: LevelTilesetFillType;
    generatorId: string;
    chunkTypes: string[];
}

type LevelTilesetArrayLengths = {
    floor: number;
    wall: number;
    separate: number;
}

type LevelTilesetBlueprint = {
    name: string;
    settings: LevelTilesetSettings;
    lengths: LevelTilesetArrayLengths;
}

export {
    LevelTilesetFloorType,
    LevelTilesetWallType,
    LevelTilesetCeilingType,
    LevelTilesetFillType,
    LevelTilesetSettings,
    LevelTilesetArrayLengths,
};

export default LevelTilesetBlueprint;
