

function reset() {

  bootbox.confirm({
    message: "Do you really want to Reset?",
    buttons: {
      confirm: {
        label: 'Yes',
        className: 'btn-success'
      },
      cancel: {
        label: 'No',
        className: 'btn-danger'
      },
    },
    size: 'small',
    callback: function (result) {
      if (result) {
        graph.resetCells();
        $(".html-element").remove();
        intialNodes();

      } //result if end
      else {
        return;
      } //else bracket ends
    }
  }); //bootbox end     
}//resetfunction ends
var newickNodes;

function generateGraphFromNewick() {


  //get input newick value
  var n = $("#newick").val();
  // validate that given string is meeting our minimum string given by user --validation
  if (n.length < 9) {
    $("#newick").notify("invalid phylogeny!", {
      position: "top center"
    }, "error");
    graph.resetCells();
    $(".html-element").remove();
    return;
  }
  console.log(n, "node array");
  //************validate the left and right braces********* */

  //count left braces
  var leftBraces = n.split("(").length - 1;
  console.log("count of ( :", leftBraces);

  //count right braces
  var rightBraces = n.split(")").length - 1;
  console.log("count of ) :", rightBraces);
  // var letterNumber = /^[0-9a-zA-Z]+$/; 

  if (leftBraces == rightBraces) {
    try {
      //reset current graph
      graph.resetCells();
      $(".html-element").remove();

      //convert string to JSON
      var newickParsed = Newick.parse(n);

      newickNodes = [];
      console.log(newickParsed, "new");
      //add nodes to newickNodes list
      buildNewickNodes(newickParsed);
      newickNodes = newickNodes.reverse();
      console.log(newickNodes, "built nodes");


     


      //for the validation of commas in newick input
      var HalfNodes = parseInt(newickNodes.length / 2);
      console.log(HalfNodes);
      var CountCommas = n.split(",").length - 1;
      console.log("count are , :", CountCommas);
      if (CountCommas != HalfNodes) {
        $("#newick").notify("invalid phylogeny! (Comma)", {
          position: "top center"
        }, "error");
        graph.resetCells();
        $(".html-element").remove();
        return; 
      } 

      addNewGraphFromNewick();
      var s=graph.getSources();
      console.log("sources are:",s.length);
      var sources=s.length;
       if (sources>1) {
        $("#newick").notify("invalid phylogeny! Sources is greater then 1", {
          position: "top center"
        }, "error");
        graph.resetCells();
        $(".html-element").remove();
        return;
      } 
      
    } //try braces end
    catch (err) {
      $("#newick").notify("invalid phylogeny!", {
        position: "top center"
      }, "error");
      graph.resetCells();
      $(".html-element").remove();
      return;
    } //catch function end

  } // if statement(for small bracket validation in newick input) bracket end  
  else {
    $("#newick").notify("invalid phylogeny (braces misssing) !", {
      position: "top center"
    }, "error");
    graph.resetCells();
    $(".html-element").remove();
    return;
  }
  //to clear the text box after all validation
  $("#newick").val("");
} //generateGraphFromNewick function end

/************************************End of generate graph from newick******************************************************** */

function buildNewickNodes(node, callback) {


  newickNodes.push(node);

  if (node.branchset) {
    for (var i = 0; i < node.branchset.length; i++) {
      buildNewickNodes(node.branchset[i]);

    }
  }

}

/*
 * It creates a JOINT JS node
 */
function drawNode(x1, y1, childName, h, w) {
  console.log(x1, y1);
  var cell = new joint.shapes.html.Element({
    id: childName,
    position: {
      x: x1,
      y: y1
    },
    size: {
      width: w,
      height: h
    },
    attrs: {
      text: {
        // text: childName
      },
      circle: {
        fill: '#78909C',
        hasLabel: false
      }
    },
    name: childName

  });

  return cell;
}

/**************************end of draw_node function***************************** */

// draw children function
function addNewChildrens(selectedCellView) {
  console.log(selectedCellView);
  if (selectedCellView == null)
    return;

  //height and width of child node
  var h = 20;
  var w = 20;

  // calling function for adding child node
  var c1 = drawNode(0, 0, '', h, w);
  var c2 = drawNode(0, 0, '', h, w);
  graph.addCell(c1).addCell(c2);


  // giving link from parent node to child-1 nodes

  var link = new joint.dia.Link({
    source: {
      id: selectedCellView.model.id
    },
    target: {
      id: c1.id
    }, //target bracket end 
  }); //link barces  end

  // giving link from parent node to child-2 nodes
  var link1 = new joint.dia.Link({
    source: {
      id: selectedCellView.model.id
    },
    target: {
      id: c2.id
    }, //target bracket end

  }); //link1 braces end

  graph.addCells([link, link1]);
  console.log(c1);
  $("div[model-id=" + c1.id + "]").addClass("leaf");
  $("div[model-id=" + c2.id + "]").addClass("leaf");

  //  set has-children value TRUE

  $("#" + selectedCellView.id).find("circle").attr('has-children', true);

  //set layout
  joint.layout.DirectedGraph.layout(graph, {
    setLinkVertices: true,
    
    rankDir: 'LR',
    marginX: '20',
    marginY: '313'
  });
}

/*******************************end of addNewchildren************************ */

// draw children function
function addNewGraphFromNewick() {

  var list = [];
  var customNodeName = false;
  //NODES

  newickNodes.forEach(function (node) {

    //to handle internal node names
    if (node.name.length == 0) {
      console.log(node.branchset.length, "hello node");
      console.log(node.name, "hi node");
      //node.name=makeid(node.branchset.length);
      node.name = node.branchset[0].name + "_" + node.branchset[1].name;
      customNodeName = true;
    } else {
      customNodeName = false;
    }


    var c = drawNode(0, 0, node.name, 20, 20);
    graph.addCell(c);
    // if user does not give the name to parent node then we give name to that node as id and is not shown over it
    if (customNodeName == false) {
      $("input[model-id=" + node.name + "]").show();
      $("input[model-id=" + node.name + "]").val(node.name);


      $("input[model-id=" + node.name + "]").mouseover(function () {
        $(this).siblings(".del_textbox").show();
      });
      $("input[model-id=" + node.name + "]").siblings("input , .del_textbox").mouseout(function () {
        $(this).siblings(".del_textbox").hide();
      });
      $("input[model-id=" + node.name + "]").siblings(".addLabel").hide();
    }

    //set hasChildren propoerty to nodes who has children 
    if (node.branchset != undefined) {
      $("#" + (paper.findViewByModel(c.id)).id).find("circle").attr('has-children', true);
    }
    else{
      $("#" + (paper.findViewByModel(c.id)).id).find("circle").attr('has-children', false);

    }

  });

  newickNodes.forEach(function (node) {
    //LINKS
    if (node.branchset != undefined) {
      var branchset = node.branchset;
      //console.log(branchset);
      var link1 = new joint.dia.Link({
        source: {
          id: node.name
        },
        target: {
          id: branchset[0].name
        }
      });
      var link2 = new joint.dia.Link({
        source: {
          id: node.name
        },
        target: {
          id: branchset[1].name
        }
      });

      graph.addCells([link1, link2]);

      //if branchset is not undefined then means present node has children so add minus and remove plus
      $("i[model-id=" + node.name + "]").removeClass("fa-plus").addClass("fa-minus");

    } else {
      $("div[model-id=" + node.name + "]").addClass("leaf");
    }
  });

  //set layout
  joint.layout.DirectedGraph.layout(graph, {
    setLinkVertices: true,
    rankDir: 'LR',
    marginX: '20',
    marginY: '219'
  });
  

} //addNewGraphFromNewick function end

/*****************************end of addNewGraphFromNewick function*********************** */

//generate random string 
function makeid(n) {
  var text = "";
  var possible = "abcdefghijklmnopqrstuvwxyz123456789";

  for (var i = 0; i < n; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}

//remove children function 
function removeChildren(currentcell) {
  console.log(currentcell, "adsss");
  var successors = graph.getSuccessors(currentcell);
  console.log(successors);
  var iterator = 0; // for-loop iterator 
  var iterations = successors.length; //variable for for-loop iterations which is equal to the length of successor array;
  console.log(iterations);

  bootbox.confirm({
    message: "Do you really want to delete all children?",
    buttons: {
      confirm: {
        label: 'Yes',
        className: 'btn-success'
      },
      cancel: {
        label: 'No',
        className: 'btn-danger'
      },
    },
    size: 'small',
    callback: function (result) {
      if (result) {
        // loop for removing all successor of current cell
        for (iterator = 0; iterator < iterations; iterator++) {

          successors[iterator].remove();

        }


        //to set has-children false after removing its child nodes
        $("#" + paper.findViewByModel(currentcell).id).find("circle").attr("has-children", "false");
        //to set has-label false after removing its child nodes 
        $("#" + paper.findViewByModel(currentcell).id).find("circle").attr("has-label", "false");
        $('i[model-id=' + currentcell.id + ']').removeClass("fa-minus").addClass("fa-plus"); //add plus remove mius
        $("div[model-id=" + currentcell.id + "]").addClass("leaf"); //circle to square

      } //result if end
      else {
        return;
      } //else bracket ends
    }
  }); //bootbox end
} //remove function end

function intialNodes() {
  var root_node_diameter = 20;
  var rootnode = new joint.shapes.basic.Circle({
    position: {
      x: 20,
      y: 313
    },
    size: {
      width: root_node_diameter,
      height: root_node_diameter
    },
    attrs: {
      text: {
        text: ''
      },
      circle: {
        fill: 'lightgray',
        hasChildren: true,
        root: true,
        hasLabel: false

      }
    },
    name: 'parent'

  });
  // adding cells to gragh
  graph.addCell(rootnode);

  var FirstChild = new joint.shapes.html.Element({
    //id: childName,
    // position: {
    // x: x1,
    // y: y1
    // },
    size: {
      width: 20,
      height: 20
    },
    attrs: {
      text: {
        // text: childName
      },
      circle: {
        fill: '#78909C',
        hasLabel: false,
        hasChildren: false
        //root: true
      }
    },
    //name: childName

  });
  var SecondChild = FirstChild.clone();

  // giving link from parent node to child-1 nodes

  var link = new joint.dia.Link({
    source: {
      id: rootnode.id
    },
    target: {
      id: FirstChild.id
    }, //target bracket end 
  }); //link barces  end

  // giving link from parent node to child-2 nodes
  var link1 = new joint.dia.Link({
    source: {
      id: rootnode.id
    },
    target: {
      id: SecondChild.id
    }, //target bracket end

  }); //link1 braces end
  graph.addCells([FirstChild, SecondChild, link, link1]);

  $("div[model-id=" + FirstChild.id + "]").addClass("leaf");
  $("div[model-id=" + SecondChild.id + "]").addClass("leaf");

  //set layout
  joint.layout.DirectedGraph.layout(graph, {
    setLinkVertices: true,
    rankDir: 'LR',
    marginX: '20',
    marginY: '313'
  });

}




function getOrganismFromDatabase() {
  var api_url = "http://mapps.lums.edu.pk/api/api/organism/species";
  $.ajax({
    url: api_url,
    async: false,
    error: function () {
      alert("error");
    },
    dataType: 'json',
    success: function (result) {
      availableTags = result;
      for (i = 0; i < availableTags.length; ++i) {
        n=availableTags[i];
        var start = n.search(":");
        orgCodes.push(n.slice(start+1,-1));
      }
    },
    type: 'GET'
  });

}

function saveTreeAsNewick() {
  if(validateLeafNodeLabels()!=true)
  {
    $("#savebtn").notify("Enter the labels from KEGG Organism !", {
      position: "top center"
    }, "error");
  }
   if(validateDuplication()!=true){
    $("#savebtn").notify("Do not duplicate the labels !", {
      position: "top center"
    }, "error");
  }
  else{



  var rootNode = graph.getSources()[0];
  console.log("root",rootNode);
  var graphLibStructure = graph.toGraphLib();
 
  
  var l = graph.getSuccessors(rootNode);
  var c = graphlib.alg.postorder(graphLibStructure, rootNode.id);
  
 

  var opening="(";
  var n = c.length;
  console.log("total nodes are : ",n);
  var newick="";
  for (var i = 0; i < n; i++) {
    if (i < n - 1) {
      var nodeName = $("input[model-id=" + c[i] + "]").val();
      

      //if the current and it's next (right child) node has not children
      if ($("#" + (paper.findViewByModel(c[i]).id)).find("circle").attr("has-children") != "true" &&
        $("#" + (paper.findViewByModel(c[i + 1]).id)).find("circle").attr("has-children") != "true") {
        
        newick = newick + "(" + nodeName + ",";
        
      } 
      //when current node has no children but it's next node has children
      else if ($("#" + (paper.findViewByModel(c[i]).id)).find("circle").attr("has-children") != "true" &&
        $("#" + (paper.findViewByModel(c[i + 1]).id)).find("circle").attr("has-children") == "true") {
           
        newick = newick + nodeName;
        
      }
      //when the current node has children but it's next and previous has not children
      else if ($("#" + (paper.findViewByModel(c[i]).id)).find("circle").attr("has-children") == "true" &&
        $("#" + (paper.findViewByModel(c[i + 1]).id)).find("circle").attr("has-children") != "true" )
        
        {
         //place a closing at the end of current newick string 
        newick = newick + ")" + nodeName + ",";
        
        var PreOrder = graphlib.alg.preorder(graphLibStructure,c[i]);
       
        
        
          if ($("#" + (paper.findViewByModel(PreOrder[1]).id)).find("circle").attr("has-children") == "true")
          {
            var d = graphlib.alg.postorder(graphLibStructure,c[i]);
            var nodeNameD = $("input[model-id=" + d[0] + "]").val();
            console.log("first left child is : " ,nodeNameD);
            //split newick string into two parts by nodenameD
            var Split_newick=newick.split(nodeNameD);
              console.log(Split_newick[0]);
              console.log(Split_newick[1]); 
              
             //put an opening after the first part of split string
              newick=Split_newick[0] + "(" + nodeNameD.concat(Split_newick[1]);
          }
          
      }


    
     // when the current node is parent and it,s next selected node is also parent
      else if($("#" + (paper.findViewByModel(c[i]).id)).find("circle").attr("has-children") == "true" 
      && $("#" + (paper.findViewByModel(c[i+1]).id)).find("circle").attr("has-children") == "true")
      {
        
       newick=newick+")"+nodeName;

       var PreOrder = graphlib.alg.preorder(graphLibStructure,c[i]);
       
        

          if ($("#" + (paper.findViewByModel(PreOrder[1]).id)).find("circle").attr("has-children") == "true")
          {
            //posterorder traversal for the sake of spliting 
            var d = graphlib.alg.postorder(graphLibStructure,c[i]);
            //d[0]is the last left node of that parent
            var nodeNamee = $("input[model-id=" + d[0] + "]").val();
            //console.log("first left child is : " ,nodeNamee);
            
             var Split_Newick=newick.split(nodeNamee);
              console.log(Split_Newick[0]);
              console.log(Split_Newick[1]);
              
               
              newick=Split_Newick[0] + "(" + nodeNamee.concat(Split_Newick[1]);
          }
      }


    }// first if for i-1 validation ends

    //when root is found
    if($("#" + (paper.findViewByModel(c[i]).id)).find("circle").attr("root") == "true")
    { 
      
      console.log("5 I am root"); 
      //newick=opening.concat(newick);
      //newick=newick + ")";
    } 

    } //for loop end

   
   
   newick=opening.concat(newick);
    newick=newick + ")";
    console.log("newick:", newick);

  }//validate for leaf label 
  } //savetree function ends

  /*
 * Check if labels are assigned to all leaf nodes
 */ 
  var leafNodes=[];
function validateLeafNodeLabels(){

  _valid=true;
  var i=0;
  $("div.leaf > input").each(function(e){ 
    lab=$(this).val();
   leafNodes[i]=lab;
   i++;
   
    var a= orgCodes.indexOf(lab);
    if(a<=0)
    {
      _valid= false;
    }
   
  });
  return _valid;
}
  


function validateDuplication()
{
  
  for (var i = 0; i < leafNodes.length; i++) {
     for (var j = i + 1 ; j < leafNodes.length; j++) {
        if (leafNodes[i]==(leafNodes[j])) { 
          // got the duplicate element
          return false;
         } } }

         return true;
    

} 