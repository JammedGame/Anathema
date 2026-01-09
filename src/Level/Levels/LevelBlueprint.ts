type LevelBlueprintEnemy = {
    enemyId: string;
    number: number;
}

type LevelBlueprint = {
    name: string;
    tilesetId: string;
    dimensions: number[];
    enemies: LevelBlueprintEnemy[];
}

export { LevelBlueprintEnemy };

export default LevelBlueprint;
