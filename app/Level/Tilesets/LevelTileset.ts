export { LevelTileset, LevelTilesetCeilingType, LevelTilesetWallType, LevelTilesetFloorType, LevelTilesetFillType }

import Engineer from "./../../Engineer";

enum LevelTilesetCeilingType
{
    Uniform = 0,
    Crested = 1,
    Bordered = 2,
    Roofed = 3,
    Divided = 4
}
enum LevelTilesetFloorType
{
    Uniform = 0,
    Checkered = 1
}
enum LevelTilesetWallType
{
    Uniform = 0,
    Bordered = 1,
    Divided = 2
}
enum LevelTilesetFillType
{
    None = 0,
    Floor = 1,
    Ceiling = 2,
    Separate = 3
}
class LevelTileset
{
    private _Name:string;
    private _WallVoid:boolean;
    private _FloorType:LevelTilesetFloorType;
    private _WallType:LevelTilesetWallType;
    private _CeilingType:LevelTilesetCeilingType;
    private _FillType:LevelTilesetFillType;
    private _Floor:any;
    private _WallUpper:any;
    private _WallLower:any;
    private _Ceiling:any;
    private _Separate:any;
    private _ChunkTypes:string[];
    public get WallVoid() : boolean { return this._WallVoid; }
    public set WallVoid(value:boolean) { this._WallVoid = value; }
    public get FloorType() : LevelTilesetFloorType { return this._FloorType; }
    public set FloorType(value:LevelTilesetFloorType) { this._FloorType = value; }
    public get WallType() : LevelTilesetWallType { return this._WallType; }
    public set WallType(value:LevelTilesetWallType) { this._WallType = value; }
    public get CeilingType() : LevelTilesetCeilingType { return this._CeilingType; }
    public set CeilingType(value:LevelTilesetCeilingType) { this._CeilingType = value; }
    public get FillType() : LevelTilesetFillType { return this._FillType; }
    public set FillType(value:LevelTilesetFillType) { this._FillType = value; }
    public get Floor() : any { return this._Floor; }
    public get WallUpper() : any { return this._WallUpper; }
    public get WallLower() : any { return this._WallLower; }
    public get Ceiling() : any { return this._Ceiling; }
    public get Separate() : any { return this._Separate; }
    public get ChunkTypes() : string[] { return this._ChunkTypes; }
    public set ChunkTypes(value:string[]) { this._ChunkTypes = value; }
    public constructor(Name:string)
    {
        this._Name = Name;
        this._WallVoid = false;
        this._FloorType = LevelTilesetFloorType.Uniform;
        this._WallType = LevelTilesetWallType.Uniform;
        this._CeilingType = LevelTilesetCeilingType.Uniform;
        this._FillType = LevelTilesetFillType.None;
        this._ChunkTypes = ["Basic"];
    }
    private Init(ArrayLengths:number[]) : void
    {
        let FloorImages:string[] = [];
        for(let i = 1; i < ArrayLengths[0] + 1; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            FloorImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/g"+s+".png");
        }
        this._Floor = new Engineer.ImageCollection(null, FloorImages);
        let WallUpperImages:string[] = [];
        let WallLowerImages:string[] = [];
        for(let i = 1; i < ArrayLengths[1] + 1; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            WallUpperImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/wu"+s+".png");
            WallLowerImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/wl"+s+".png");
        }
        this._WallUpper = new Engineer.ImageCollection(null, WallUpperImages);
        this._WallLower = new Engineer.ImageCollection(null, WallLowerImages);
        let CeilingLength = 2;
        if(this._CeilingType == LevelTilesetCeilingType.Roofed) CeilingLength = 6;
        if(this._CeilingType == LevelTilesetCeilingType.Crested) CeilingLength = 13;
        if(this._CeilingType == LevelTilesetCeilingType.Bordered) CeilingLength = 17;
        let CeilingImages:string[] = [];
        for(let i = 1; i < CeilingLength; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            CeilingImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/c"+s+".png");
        }
        this._Ceiling = new Engineer.ImageCollection(null, CeilingImages);
        let SeparateImages:string[] = [];
        for(let i = 1; i < ArrayLengths[2] + 1; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            SeparateImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/s"+s+".png");
        }
        this._Separate = new Engineer.ImageCollection(null, SeparateImages);
    }
}