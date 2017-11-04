export { GeneratorTypesImporter }

import { GlobalChunkGenerator } from "./../GlobalChunkGenerator";
import { ChunkGenerator } from "./ChunkGenerator";
import { CorneredChunkGenerator } from "./CorneredChunkGenerator";
import { PillaredChunkGenerator } from "./PillaredChunkGenerator";
import { TorusChunkGenerator } from "./TorusChunkGenerator";

class GeneratorTypesImporter
{
    public static Import(GCG:GlobalChunkGenerator)
    {
        GCG.AddChunkGenerator(new ChunkGenerator);
        GCG.AddChunkGenerator(new CorneredChunkGenerator);
        GCG.AddChunkGenerator(new PillaredChunkGenerator);
        GCG.AddChunkGenerator(new TorusChunkGenerator);
    }
}