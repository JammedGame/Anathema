export { Pathfinder };

class Pathfinder
{
    protected _LvlMatrix: number[][];
    public constructor(matrix)
    {
        this._LvlMatrix = matrix;
    }

    private equal(p1, p2) 
    {
        return p1[0] === p2[0] && p1[1] === p2[1];
    }
    
    private reconstructPath(currentNode) 
    {
        let curr = currentNode;
        let ret = [];
        while(curr.prev) {
            ret.push(curr);
            curr = curr.prev;
        }
        return ret.reverse();
    } 

    private heuristic(p1, p2) 
    {
        const d1 = Math.abs (p2[0] - p1[0]);
        const d2 = Math.abs (p2[1] - p1[1]);
        return d1 + d2;
    }

    private findNeighbors(graph, source) 
    {
        const x = source.coordinates[0];
        const y = source.coordinates[1];
    	const neighborhood = [
          [x+1, y],
          [x-1, y],
          [x, y+1],
          [x, y-1],
          [x-1, y-1],
          [x+1, y+1],
          [x-1, y+1],
          [x+1, y-1]
        ];
      	let neighbors = [];
        graph.forEach( function (node, index)
        {
          	neighborhood.forEach( function (place) {
                if(this.equal(node.coordinates, place)) neighbors.push(index);
            });
        });
        return neighbors;
    }    

    public findShortestPath(point1, point2) 
    {
        let vertex = [];
        let start;
        
        // convert graph to nodes
        for(let i = 0; i < this._LvlMatrix.length; i++) {
          let row = this._LvlMatrix[i];
          for(var j = 0; j < row.length; j++) {
            if (row[j] == 1) {
              let node = {
                name: i+'_'+j,
                coordinates: [i,j],
                f: Infinity,
                g: Infinity,
                h: Infinity,
                prev: null
              };
              if (this.equal(node.coordinates, point1)) {
                  node.g = 0;
                  start = node;
              } else vertex.push(node);
            }
          }
        }

        let openList = [start];
        let closeList = [];
        let cameFrom = [];
        
        while(openList.length > 0) {
            let lowInd = 0;
            for(let i=0; i<openList.length; i++) {
                if(openList[i].f < openList[lowInd].f) { lowInd = i; }
            }
            let currentNode = openList[lowInd];
            if(this.equal(currentNode.coordinates, point2)) {
                return this.reconstructPath(currentNode);
            }
            openList.splice(lowInd, 1);
            closeList.push(currentNode);
            let neighbors = this.findNeighbors(vertex, currentNode);
            
            for(let i=0; i<neighbors.length; i++) {
                let neighborIndex = neighbors[i];
                const neighbor = vertex[neighborIndex];

                // if neighbor in closed set then already evaluated
                let isValuated = false;
                for(let i=0; i<closeList.length; i++) {
                    if(closeList[i].name === neighbor.name) isValuated = true;
                }
                if (isValuated) continue;

                var gScore = currentNode.g + 1;

                // if not in open set - add
                let inOpenSet = false;
                for(let i=0; i<openList.length; i++) {
                    if(openList[i].name === neighbor.name) inOpenSet = true;
                }
                if(!inOpenSet) {
                    neighbor.h = this.heuristic(neighbor.coordinates, point2);
                    openList.push(neighbor);
                }

                if (gScore >= neighbor.g) continue;
                neighbor.prev = currentNode;
                neighbor.g = gScore;
                neighbor.f = neighbor.g + neighbor.h;
            }
        }
        return [];
    }
}