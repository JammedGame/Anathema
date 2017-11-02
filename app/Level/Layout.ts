export { Layout, LayoutEntry, LayoutClass }

class Layout
{
    public Dimensions:any;
    public Data:number[][];
    public Entries:LayoutEntry[];
    public Chunk:any;
    public constructor(Dimensions:any, Value:number)
    {
        this.Dimensions = Dimensions;
        this.Data= [];
        for(let i = 0; i < Dimensions.Y; i++)
        {
            this.Data.push([]);
            for(let j = 0; j < Dimensions.X; j++)
            {
                this.Data[i].push(Value);
            }
        }
        this.Entries = [];
    }
    public Print()
    {
        console.log("- - -");
        for(let i = 0; i < this.Dimensions.Y; i++)
        {
            let Line:string = i.toString();
            if(Line.length < 2) Line = "0" + i;
            Line += ": ";
            for(let j = 0; j < this.Dimensions.X; j++)
            {
                if(this.Data[i][j] == -1) Line += "X, ";
                else Line += this.Data[i][j] + ", ";
            }
            console.log(Line);
        }
        console.log("- - -");
    }
}
class LayoutEntry
{
    public Size:number;
    public Location:any;
    public Connections:LayoutEntry[];
    public ConnectionsSide:number[];
    public Chunk:any;
    public Locations:any[];
    public constructor(Size:number, Location:any)
    {
        this.Size = Size;
        this.Location = Location;
        this.Connections = [];
        this.ConnectionsSide = [];
    }
}
class LayoutClass
{
    public Size:number;
    public Number:number;
    public constructor(Size:number, Number:number)
    {
        this.Size = Size;
        this.Number = Number;
    }
}