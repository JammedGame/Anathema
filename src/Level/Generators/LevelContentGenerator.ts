import * as TBX from 'toybox-engine';

import Level from '../Levels/Level';
import Enemy from '../../Unit/Enemies/Enemy';
import { GameScene } from "../../GameScene";
import { LayoutEntry } from '../Levels/Layout';
import { LevelBlueprintEnemy } from '../Levels/LevelBlueprint';
import { EnemyCollection } from '../../Unit/Enemies/EnemyCollection';

class LevelContentGenerator {
    private static _FieldSize: number = 120;

    public static generate(level: Level, scene: GameScene): any {
        this.calculateSpawnLocations(level);
        this.spawnPlayer(level, scene);
        this.spawnEnemies(level, scene);
    }

    private static calculateSpawnLocations(level: Level): void {
        level.layout.parts.forEach((entry: LayoutEntry) => entry.calculateSpawnLocations(level.accessMatrix));
    }

    private static spawnPlayer(level: Level, scene: GameScene): void {
        const log = TBX.Inject<TBX.LogService>(TBX.LogService);
        const chunkIndex = LevelContentGenerator.random(level.layout.parts.length);
        const layoutEntry = level.layout.parts[chunkIndex];
        level.layout.startPart = layoutEntry;
        const spawnlocationIndex = LevelContentGenerator.random(layoutEntry.spawnLocations.length);
        const spawnLocation = layoutEntry.spawnLocations[spawnlocationIndex];
        log.Info('Player Spawny Location', spawnLocation);
        layoutEntry.useSpawnLocation(spawnlocationIndex);
        scene.Trans.Translation = new TBX.Vertex(960 - spawnLocation.X, 540 - spawnLocation.Y, 0);
        scene.Player.Collider.Trans.Translation = new TBX.Vertex(spawnLocation.X, spawnLocation.Y, 3);
    }

    private static spawnEnemies(level: Level, scene: GameScene): void {
        const enemyCollection = new EnemyCollection();
        const enemyLayoutEntries = level.layout.parts;//.filter((entry: LayoutEntry) => entry !== level.layout.startPart);
        const enemyBlueprints = level.blueprint.enemies.map((entry: LevelBlueprintEnemy) => ({ ...entry }));
        let totalEnemies = 0;
        enemyBlueprints.forEach((enemy: LevelBlueprintEnemy) => totalEnemies += enemy.number);
        let layoutEntriesVolume = level.layout.volume - level.layout.startPart.volume;
        if (layoutEntriesVolume === 0) layoutEntriesVolume = 1;
        const layoutEntryEnemyRatio = Math.floor(totalEnemies / layoutEntriesVolume);
        for(let layoutPart of enemyLayoutEntries) {
            if (enemyBlueprints.length === 0) break;
            for (let i = 0; i < layoutEntryEnemyRatio; i++) {
                if (enemyBlueprints.length === 0) break;
                if (layoutPart.spawnLocations.length === 0) break;
                const enemyIndex = this.random(enemyBlueprints.length);
                this.spawnEnemy(level, scene, layoutPart, enemyCollection, enemyBlueprints[enemyIndex]);
                if (enemyBlueprints[enemyIndex].number === 0) {
                    enemyBlueprints.splice(enemyIndex, 1);
                }
            }
        }
    }

    private static spawnEnemy(level: Level, scene: GameScene, part: LayoutEntry, collection: EnemyCollection, enemy: LevelBlueprintEnemy): void {
        const newEnemy: Enemy = collection.Items[enemy.enemyId].duplicate();
        const spawnIndex = this.random(part.spawnLocations.length);
        const spawnLocation = part.spawnLocations[spawnIndex];
        part.useSpawnLocation(spawnIndex);
        level.enemies.push(newEnemy);
        scene.Attach(newEnemy);
        newEnemy.init(scene);
        newEnemy.updatePosition(spawnLocation.Copy());
        enemy.number--;
    }

    private static random(max: number) {
        return Math.floor((Math.random() * max));
    }    
}

export default LevelContentGenerator;
