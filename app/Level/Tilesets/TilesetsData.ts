const data = [
    {
        "name": "beach",
        "settings": {
            "floor": "uniform",
            "wall": "uniform",
            "ceiling": "uniform",
            "fill": "ceiling",
            "generatorId": "squareFill",
            "chunkTypes": ["Cornered", "CorneredSquare", "VaryingFourCircles", "Diagonal"]
        },
        "lenghts": {
            "floor": 5,
            "wall": 1,
            "separate": 0
        }
    },
    {
        "name": "forest",
        "settings": {
            "floor": "uniform",
            "wall": "uniform",
            "ceiling": "uniform",
            "fill": "ceiling",
            "generatorId": "squareFill",
            "chunkTypes": ["ConnectedFourCircles", "VaryingFourCircles", "Grove", "Circle"]
        },
        "lenghts": {
            "floor": 1,
            "wall": 1,
            "separate": 0
        }
    },
    {
        "name": "forest",
        "settings": {
            "floor": "uniform",
            "wall": "bordered",
            "ceiling": "roofed",
            "fill": "ceiling",
            "generatorId": "squareFill",
            "chunkTypes": ["VaryingCorneredSquare"]
        },
        "lenghts": {
            "floor": 3,
            "wall": 7,
            "separate": 0
        }
    },
    {
        "name": "cathedral",
        "settings": {
            "floor": "checkered",
            "wall": "uniform",
            "ceiling": "crested",
            "fill": "floor",
            "generatorId": "squareFill",
            "chunkTypes": ["Pillared", "Square"]
        },
        "lenghts": {
            "floor": 8,
            "wall": 8,
            "separate": 0
        }
    },
    {
        "name": "graveyard",
        "settings": {
            "floor": "uniform",
            "wall": "uniform",
            "ceiling": "uniform",
            "fill": "separate",
            "generatorId": "squareFill",
            "chunkTypes": ["Cornered", "CorneredSquare", "VaryingCorneredSquare"]
        },
        "lenghts": {
            "floor": 1,
            "wall": 1,
            "separate": 1
        }
    },
    {
        "name": "castle",
        "settings": {
            "floor": "uniform",
            "wall": "uniform",
            "ceiling": "uniform",
            "fill": "floor",
            "generatorId": "squareFill",
            "chunkTypes": ["Pillared", "Square", "CorneredSquare"]
        },
        "lenghts": {
            "floor": 1,
            "wall": 1,
            "separate": 0
        }
    },
    {
        "name": "dungeon",
        "settings": {
            "floor": "uniform",
            "wall": "uniform",
            "ceiling": "uniform",
            "fill": "floor",
            "generatorId": "squareFill",
            "chunkTypes": ["Pillared", "Square", "CorneredSquare"]
        },
        "lenghts": {
            "floor": 1,
            "wall": 1,
            "separate": 0
        }
    },
    {
        "name": "ruin",
        "settings": {
            "floor": "uniform",
            "wall": "uniform",
            "ceiling": "bordered",
            "fill": "floor",
            "generatorId": "squareFill",
            "chunkTypes": ["Pillared", "Square", "CorneredSquare"]
        },
        "lenghts": {
            "floor": 1,
            "wall": 1,
            "separate": 0
        }
    },
    {
        "name": "tower",
        "settings": {
            "floor": "uniform",
            "wall": "uniform",
            "ceiling": "uniform",
            "fill": "floor",
            "generatorId": "squareFill",
            "chunkTypes": ["Pillared", "Square", "CorneredSquare"]
        },
        "lenghts": {
            "floor": 1,
            "wall": 1,
            "separate": 0
        }
    }
];

export default data;

