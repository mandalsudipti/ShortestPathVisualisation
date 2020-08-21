var count_node = -1 ;
var store_node =[];
var adj_list = [];

function drawCircle(x,y,count_node)
{
  var c = document.getElementById("mycanvas");
  var ctx = c.getContext("2d");
  ctx.font = "30px Arial";
  ctx.textAlign = 'center';
  ctx.fillText(count_node,x,y+7);
  ctx.beginPath();
  ctx.arc(x,y,30,0, 2 * Math.PI);
  ctx.stroke();
}

// DRAW NODE ON MOUSE CLICK ON CANVAS
function drawNode(event)
{
  var rect = mycanvas.getBoundingClientRect();
  var x = event.clientX - rect.left;
  var y = event.clientY - rect.top;
  (adj_list.length)++;
  adj_list[adj_list.length - 1]=[];
  count_node++;
  store_node.push([x,y]);
  
  drawCircle(x,y,count_node);
}

// CREATE EDGE BETWEEN NODES ON CANVAS
function createEdge(source , target , edgeType , color)
{
  var source_x = store_node[source][0] , source_y = store_node[source][1] ;
  var target_x = store_node[target][0] , target_y = store_node[target][1] ;
  
 var c = document.getElementById("mycanvas");
 var ctx = c.getContext("2d");
 ctx.moveTo(source_x, source_y);
 ctx.lineTo(target_x, target_y);
  if(color=='powder-blue')
    {
      ctx.strokeStyle = "#3498DB";
    }
 ctx.stroke();
  if(edgeType=='Directed')
    {
      ctx.beginPath();
      ctx.arc(target_x,target_y,3,0, 2 * Math.PI);
      ctx.stroke();
      ctx.fillStyle = "red";
      ctx.fill();
    }
  
}

// SELECT WHETHER GRAPH HAS UNDIRECTED OR DIRECTED EDGE
function getEdgeType()
{
  var edgeType = prompt("Enter edge type -> Undirected / Directed","Undirected");
  if(edgeType!='Directed' && edgeType!='Undirected')
   {
     window.alert('INVALID ENTRY !! DO AGAIN');
     return;
   }
  var source = prompt("Enter source:",0);
  var target = prompt("Enter Target",0);
  
  if(source<0 || source>=store_node.length || target<0 || target>=store_node.length)
    {
      window.alert('Invalid Node !!');
      return;
    }

  adj_list[source].push(target);
  if(edgeType=='Undirected')
    adj_list[target].push(source);
  
  createEdge(source,target,edgeType);
}

// SHOW OR HIDE OPTION UNDER CHOOSE ALGO BUTTON
function show()
{
   var ele = document.getElementById("option")  ;
   if(ele.style.display == "none")
     ele.style.display='block';
  else
    ele.style.display = 'none';
}


// FUNCTION TO FIND SHORTEST PATH 
function shortestPath() // works for undirected graph only
{
  var source = prompt("Enter Source:",0);
  var target = prompt("Enter target:",0);
  
  var visited = [];
  var pre = [];
  for(i=0;i<adj_list.length;i++)
   {
     visited[i] = 0 ;
     pre[i] = -1 ;
   }
  visited[source] = 1 ;
  var Q = [];
  Q.push(source);
  while(Q.length>0)
    {
      //console.log("here");
      var carry_on = 1;
      var cur_node = Q.shift();  // return front
      for(i=0;i<adj_list[cur_node].length;i++)
        {
          var x = adj_list[cur_node][i] ;
          if(visited[x]==0)
            {
              visited[x] = 1 ;
              Q.push(x);
              pre[x] = cur_node ;
              if(x==target)
                {
                  carry_on = 0 ;
                  break;
                }
            }
        }
      if(carry_on == 0)
        break;
    } //end of while
  if(visited[target]==0)
    {
      alert("PATH NOT FOUND!!");
      return;
    }
  var path = [] ;
  var cur_node = target ;
  path.push(target);
  
  while(pre[cur_node]!=-1)
    {
      path.push(pre[cur_node]);
      cur_node = pre[cur_node];
    }
  mycanvas.width = mycanvas.width ;
  for(i=0;i<store_node.length;i++)
    drawCircle(store_node[i][0],store_node[i][1],i);
  
  for(i=path.length-1;i>0;i--)
  {
    var color = "powder-blue" ;
    createEdge(path[i],path[i-1],'Undirected',color);
  }
}


//  RESET THE WHOLE CANVAS

function reset()
{
  mycanvas.width = mycanvas.width ;
  count_node = -1 ;
  adj_list.length = 0 ;
  store_node.length = 0 ;
}