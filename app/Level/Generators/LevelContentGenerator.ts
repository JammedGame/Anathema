export { LevelContentGenerator }

import Engineer from "./../../Engineer";

import { Player } from "./../../Unit/Player";
import { Chunk } from "./Chunk/Chunk";
import { GlobalChunkGenerator } from "./Chunk/GlobalChunkGenerator";
import { GameScene } from "./../../GameScene";
import { Level } from "./../Level";
import { LevelTileset, LevelTilesetCeilingType, LevelTilesetFloorType} from "./../Tilesets/LevelTileset";
import { Layout, LayoutClass, LayoutEntry } from "./../Layout";

class LevelContentGenerator
{
    private static _FieldSize:number = 120;
    public static Generate(L:Level, Scene:GameScene, Player:Player) : any
    {
        for(let i = 0; i < L.Layout.Entries.length; i++) LevelContentGenerator.CalculateLocations(L.Layout.Entries[i]);
        let StarterEntryIndex = LevelContentGenerator.RandomNumber(L.Layout.Entries.length);
        let StarterEntry = L.Layout.Entries[StarterEntryIndex];
        let Start = LevelContentGenerator.RandomNumber(StarterEntry.Locations.length);
        let StartLocation = StarterEntry.Locations[Start];
        Engineer.Log.Info(StartLocation);
        StarterEntry.Locations.splice(Start, 1);
        Scene.Trans.Translation = new Engineer.Vertex(960-StartLocation.X, 540-StartLocation.Y, 0);
        Player.Collider.Trans.Translation = new Engineer.Vertex(StartLocation.X, StartLocation.Y, 3);
        let EntriesStrength = 0;
        for(let i = 0; i < L.Layout.Entries.length; i++) EntriesStrength += L.Layout.Entries[i].Size;
        EntriesStrength -= StarterEntry.Size;
        let EnemyLayoutEntries = [];
        for(let i = 0; i < L.Layout.Entries.length; i++)
        {
            if(L.Layout.Entries[i] != StarterEntry) EnemyLayoutEntries.push(L.Layout.Entries[i]);
        }
        LevelContentGenerator.PlaceEnemies(L, EnemyLayoutEntries, Math.floor(L.Enemies.length / EntriesStrength));
    }
    private static PlaceEnemies(L:Level, LE:LayoutEntry[], Strength:number)
    {
        let EnemiesToAdd = [];
        for(let i = 0; i < L.Enemies.length; i++) EnemiesToAdd.push(L.Enemies[i]);
        for(let i = 0; i < LE.length; i++)
        {
            for(let j = 0; j < Strength * LE[i].Size; j++) LevelContentGenerator.PlaceEnemy(EnemiesToAdd, LE[i]);
        }
        for(let i = 0; i < EnemiesToAdd.length; i++) LevelContentGenerator.PlaceEnemy(EnemiesToAdd, LE[LE.length - 1]);
    }
    private static PlaceEnemy(Enemies:any[], LE:LayoutEntry)
    {
        if(Enemies.length == 0)
        {
            Engineer.Log.Error("Enemy number exceeded!");
            return;
        }
        let EnemyIndex = LevelContentGenerator.RandomNumber(Enemies.length);
        if(!LE)
        {
            Enemies.splice(EnemyIndex, 1);
            return;
        }
        let LocationIndex = LevelContentGenerator.RandomNumber(LE.Locations.length);
        Enemies[EnemyIndex].Trans.Translation = new Engineer.Vertex(LE.Locations[LocationIndex].X, LE.Locations[LocationIndex].Y, 0.5);
        Enemies[EnemyIndex].Collider.Trans.Translation = new Engineer.Vertex(LE.Locations[LocationIndex].X, LE.Locations[LocationIndex].Y, 0.5);
        Enemies.splice(EnemyIndex, 1);
        LE.Locations.splice(LocationIndex, 1);
    }
    private static RandomNumber(Size:number)
    {
        return Math.floor((Math.random() * Size));
    }
    private static CalculateLocations(LE:LayoutEntry)
    {
        LE.Locations = [];
        for(let i = 0; i < LE.Chunk.Dimensions.Y; i++)
        {
            for(let j = 0; j < LE.Chunk.Dimensions.X; j++)
            {
                if(LE.Chunk.Fields[i][j] == 1)
                {
                    LE.Locations.push(new Engineer.Vertex((LE.Location.X * 11 + j) * this._FieldSize, (LE.Location.Y * 11 + i) * this._FieldSize, 0));
                }
            }
        }
    }
}
