export { Pathfinder };

class Pathfinder
{
    protected _LvlMatrix: number[][];
    protected _Graph: any[];
    public constructor(matrix)
    {
        this._LvlMatrix = matrix;
        this._Graph = [];
        for(let i = 0; i < matrix.length; i++) {
          let row = matrix[i];
          for(let j = 0; j < row.length; j++) {
            if (row[j] == 1) {
              let node = {
                name: i+'_'+j,
                coordinates: [i,j],
                f: Infinity,
                g: Infinity,
                h: Infinity,
                prev: null
              };
              this._Graph.push(node);
            }
          }
        }
        // console.log(this._Graph);
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
        for(let i=0; i<graph.length; i++) {
            for(let j=0; j<neighborhood.length; j++){
                if(this.equal(graph[i].coordinates, neighborhood[j])) neighbors.push(i);
            }
        }
        // graph.forEach( function (node, index)
        // {
        //   	neighborhood.forEach( function (place) {
        //         if(this.equal(node.coordinates, place)) neighbors.push(index);
        //     });
        // });
        return neighbors;
    }    

    public findShortestPath(point1, point2) 
    {
        // console.log(point1);
        let start;
        
        for(let i = 0; i < this._Graph.length; i++) {
            let node = this._Graph[i];
            if (this.equal(node.coordinates, point1)) {
                start = node;
                break;
            }
        }
        // console.log(start);
        if(!start) return [];
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
            let neighbors = this.findNeighbors(this._Graph, currentNode);
            
            for(let i=0; i<neighbors.length; i++) {
                let neighborIndex = neighbors[i];
                const neighbor = this._Graph[neighborIndex];

                // if neighbor in closed set then already evaluated
                let isValuated = false;
                for(let i=0; i<closeList.length; i++) {
                    if(closeList[i].name === neighbor.name) isValuated = true;
                }
                if (isValuated) continue;

                let gScore = currentNode.g + 1;

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