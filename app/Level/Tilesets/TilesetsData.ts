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
        "lengths": {
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
        "lengths": {
            "floor": 1,
            "wall": 1,
            "separate": 0
        }
    },
    {
        "name": "town",
        "settings": {
            "floor": "uniform",
            "wall": "bordered",
            "ceiling": "roofed",
            "fill": "ceiling",
            "generatorId": "squareFill",
            "chunkTypes": ["VaryingCorneredSquare"]
        },
        "lengths": {
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
        "lengths": {
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
        "lengths": {
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
        "lengths": {
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
        "lengths": {
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
        "lengths": {
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
        "lengths": {
            "floor": 1,
            "wall": 1,
            "separate": 0
        }
    }
];

export default data;

