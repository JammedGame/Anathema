import { ChunkGenerator } from "./ChunkGenerator";
import { GroveChunkGenerator } from "./GroveChunkGenerator";
import { SquareChunkGenerator } from "./SquareChunkGenerator";
import { CircleChunkGenerator } from "./CircleChunkGenerator";
import { GlobalChunkGenerator } from "./../GlobalChunkGenerator";
import { CorneredChunkGenerator } from "./CorneredChunkGenerator";
import { DiagonalChunkGenerator } from "./DiagonalChunkGenerator";
import { PillaredChunkGenerator } from "./PillaredChunkGenerator";
import { FourCirclesChunkGenerator } from "./FourCirclesChunkGenerator";
import { CorneredSquareChunkGenerator } from "./CorneredSquareChunkGenerator";
import { VaryingFourCirclesChunkGenerator } from "./VaryingFourCirclesChunkGenerator";
import { ConnectedFourCirclesChunkGenerator } from "./ConnectedFourCirclesChunkGenerator";
import { VaryingCorneredSquareChunkGenerator } from "./VaryingCorneredSquareChunkGenerator";


class GeneratorTypesImporter {
    public static import(GCG:GlobalChunkGenerator) {
        GCG.addChunkGenerator(new ChunkGenerator);
        GCG.addChunkGenerator(new CorneredChunkGenerator);
        GCG.addChunkGenerator(new DiagonalChunkGenerator);
        GCG.addChunkGenerator(new PillaredChunkGenerator);
        GCG.addChunkGenerator(new SquareChunkGenerator);
        GCG.addChunkGenerator(new CorneredSquareChunkGenerator);
        GCG.addChunkGenerator(new VaryingCorneredSquareChunkGenerator);
        GCG.addChunkGenerator(new CircleChunkGenerator);
        GCG.addChunkGenerator(new FourCirclesChunkGenerator);
        GCG.addChunkGenerator(new VaryingFourCirclesChunkGenerator);
        GCG.addChunkGenerator(new ConnectedFourCirclesChunkGenerator);
        GCG.addChunkGenerator(new GroveChunkGenerator);
    }
}

export default GeneratorTypesImporter;
