export { GeneratorTypesImporter }

import { GlobalChunkGenerator } from "./../GlobalChunkGenerator";
import { ChunkGenerator } from "./ChunkGenerator";
import { CorneredChunkGenerator } from "./CorneredChunkGenerator";
import { DiagonalChunkGenerator } from "./DiagonalChunkGenerator";
import { PillaredChunkGenerator } from "./PillaredChunkGenerator";
import { SquareChunkGenerator } from "./SquareChunkGenerator";
import { CorneredSquareChunkGenerator } from "./CorneredSquareChunkGenerator";
import { CircleChunkGenerator } from "./CircleChunkGenerator";
import { FourCirclesChunkGenerator } from "./FourCirclesChunkGenerator";
import { VaryingFourCirclesChunkGenerator } from "./VaryingFourCirclesChunkGenerator";
import { ConnectedFourCirclesChunkGenerator } from "./ConnectedFourCirclesChunkGenerator";

class GeneratorTypesImporter
{
    public static Import(GCG:GlobalChunkGenerator)
    {
        GCG.AddChunkGenerator(new ChunkGenerator);
        GCG.AddChunkGenerator(new CorneredChunkGenerator);
        GCG.AddChunkGenerator(new DiagonalChunkGenerator);
        GCG.AddChunkGenerator(new PillaredChunkGenerator);
        GCG.AddChunkGenerator(new SquareChunkGenerator);
        GCG.AddChunkGenerator(new CorneredSquareChunkGenerator);
        GCG.AddChunkGenerator(new CircleChunkGenerator);
        GCG.AddChunkGenerator(new FourCirclesChunkGenerator);
        GCG.AddChunkGenerator(new VaryingFourCirclesChunkGenerator);
        GCG.AddChunkGenerator(new ConnectedFourCirclesChunkGenerator);
    }
}