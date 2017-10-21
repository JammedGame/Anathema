export { LevelTileset, LevelTilesetLayoutType, LevelTilesetCeilingType, LevelTilesetFloorType }

import Engineer from "./../Engineer";

enum LevelTilesetLayoutType
{
    Bordered = 0,
    Story = 1
}
enum LevelTilesetCeilingType
{
    Uniform = 0,
    Crested = 1,
    Bordered = 2
}
enum LevelTilesetFloorType
{
    Uniform = 0,
    Checkered = 1
}
class LevelTileset
{
    private _Name:string;
    private _LayoutType:LevelTilesetLayoutType;
    private _FloorType:LevelTilesetFloorType;
    private _CeilingType:LevelTilesetCeilingType;
    private _Floor:any;
    private _FloorSet2:any;
    private _WallUpper:any;
    private _WallLower:any;
    private _Ceiling:any;
    public get LayoutType() : LevelTilesetLayoutType { return this._LayoutType; }
    public get FloorType() : LevelTilesetFloorType { return this._FloorType; }
    public get CeilingType() : LevelTilesetCeilingType { return this._CeilingType; }
    public get Floor() : any { return this._Floor; }
    public get FloorSet1() : any { return this._Floor; }
    public get FloorSet2() : any { return this._FloorSet2; }
    public get WallUpper() : any { return this._WallUpper; }
    public get WallLower() : any { return this._WallLower; }
    public get Ceiling() : any { return this._Ceiling; }
    public constructor(Name:string, LayoutType:LevelTilesetLayoutType, FloorType:LevelTilesetFloorType, CeilingType:LevelTilesetCeilingType, ArrayLengths:number[])
    {
        this._Name = Name;
        this._LayoutType = LayoutType;
        this._FloorType = FloorType;
        this._CeilingType = CeilingType;
        this.Init(ArrayLengths);
        console.log(this);
    }
    private Init(ArrayLengths:number[]) : void
    {
        let FloorImages:string[] = [];
        let FloorSet2Images:string[] = [];
        for(let i = 1; i < ArrayLengths[0] + 1; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            FloorImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/g"+s+".png");
            if(this._FloorType == LevelTilesetFloorType.Checkered)
            {
                FloorSet2Images.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/g"+s+"t02.png");
            }
        }
        this._Floor = new Engineer.Engine.TileCollection(null, FloorImages);
        if(this._FloorType == LevelTilesetFloorType.Checkered)
        {
            this._FloorSet2 = new Engineer.Engine.TileCollection(null, FloorSet2Images);
        }
        let WallUpperImages:string[] = [];
        let WallLowerImages:string[] = [];
        for(let i = 1; i < ArrayLengths[1] + 1; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            WallUpperImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/wu"+s+".png");
            WallLowerImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/wl"+s+".png");
        }
        this._WallUpper = new Engineer.Engine.TileCollection(null, WallUpperImages);
        this._WallLower = new Engineer.Engine.TileCollection(null, WallLowerImages);
        let CeilingLength = 1;
        if(this._CeilingType == LevelTilesetCeilingType.Crested) CeilingLength = 12;
        if(this._CeilingType == LevelTilesetCeilingType.Bordered) CeilingLength = 17;
        let CeilingImages:string[] = [];
        for(let i = 1; i < CeilingLength; i++)
        {
            let s = i.toString();
            if(i < 10) s = "0" + i;
            CeilingImages.push("/build/resources/tilesets/"+this._Name.toLowerCase()+"/c"+s+".png");
        }
        this._Ceiling = new Engineer.Engine.TileCollection(null, CeilingImages);
    }
}