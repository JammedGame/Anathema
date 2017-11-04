export { Chunk }

class Chunk
{
    public Dimensions:any;
    public Fields:number[][];
    public constructor(Dimensions:any, Value:number)
    {
        this.Dimensions = Dimensions;
        this.Fields = [];
        for(let i = 0; i < Dimensions.Y; i++)
        {
            this.Fields.push([]);
            for(let j = 0; j < Dimensions.X; j++)
            {
                this.Fields[i].push(Value);
            }
        }
    }
    public AccessMatrix() : number[][]
    {
        let AccessMatrix:number[][];
        AccessMatrix = [];
        for(let i = 0; i < this.Dimensions.Y; i++)
        {
            AccessMatrix.push([]);
            for(let j = 0; j < this.Dimensions.X; j++)
            {
                if(this.Fields[i][j] == 1 || this.Fields[i][j] == 2) AccessMatrix[i].push(1);
                else AccessMatrix[i].push(0);
            }
        }
        return AccessMatrix;
    }
}