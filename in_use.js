<div id="paper-html-elements"></div>
<script type="text/javascript">

     var availableTags = [
      "Pseudomonas aeruginosa PAO1 (ID:pae)","Pseudomonas aeruginosa NCGM 1900 (ID:paeb)","Pseudomonas aeruginosa c7447m (ID:paec)","Pseudomonas aeruginosa YL84 (ID:paeg)","Pseudomonas aeruginosa PAO1-VE2 (ID:paei)","Pseudomonas aeruginosa LES431 (ID:pael)","Pseudomonas aeruginosa MTB-1 (ID:paem)","Pseudomonas aeruginosa PAO581 (ID:paeo)","Pseudomonas aeruginosa PA1 (ID:paep)","Pseudomonas aeruginosa PA1R (ID:paer)","Pseudomonas aeruginosa SCV20265 (ID:paes)","Pseudomonas aeruginosa PA38182 (ID:paeu)","Pseudomonas aeruginosa PAO1-VE13 (ID:paev)","Pseudomonas aeruginosa M18 (ID:paf)","Pseudomonas aeruginosa LESB58 (ID:pag)","Pseudomonas alcaligenes (ID:palc)","Pseudomonas alkylphenolia (ID:palk)","Pseudomonas aeruginosa PA7 (ID:pap)","Pseudomonas aeruginosa UCBPP-PA14 (ID:pau)","Pseudomonas brassicacearum subsp. brassicacearum NFM421 (ID:pba)","Pseudomonas brassicacearum DF41 (ID:pbc)","Pseudomonas balearica (ID:pbm)","Pseudomonas chlororaphis PA23 (ID:pch)","Pseudomonas cichorii (ID:pci)","Pseudomonas chlororaphis subsp. aurantiaca (ID:pcp)","Pseudomonas chlororaphis PCL1606 (ID:pcz)","Pseudomonas aeruginosa DK2 (ID:pdk)","Pseudomonas denitrificans (ID:pdr)","Pseudomonas entomophila (ID:pen)","Pseudomonas fluorescens LBUM223 (ID:pfb)","Pseudomonas fluorescens A506 (ID:pfc)","Pseudomonas fluorescens F113 (ID:pfe)","Pseudomonas fluorescens PICF7 (ID:pff)","Pseudomonas protegens Pf-5 (ID:pfl)","Pseudomonas fluorescens UK4 (ID:pfn)","Pseudomonas fluorescens Pf0-1 (ID:pfo)","Pseudomonas fluorescens SBW25 (ID:pfs)","Pseudomonas fulva (ID:pfv)","Pseudomonas fluorescens PCL1751 (ID:pfw)","Pseudomonas fragi (ID:pfz)","Pseudomonas knackmussii (ID:pkc)","Pseudomonas mandelii (ID:pman)","Pseudomonas mendocina NK-01 (ID:pmk)","Pseudomonas monteilii SB3078 (ID:pmon)","Pseudomonas mosselii (ID:pmos)","Pseudomonas monteilii SB3101 (ID:pmot)","Pseudomonas mendocina ymp (ID:pmy)","Pseudomonas aeruginosa NCGM2.S1 (ID:pnc)","Pseudomonas oryzihabitans (ID:por)","Pseudomonas putida BIRD-1 (ID:ppb)","Pseudomonas putida F1 (ID:ppf)","Pseudomonas putida GB-1 (ID:ppg)","Pseudomonas putida ND6 (ID:ppi)","Pseudomonas plecoglossicida (ID:ppj)","Pseudomonas protegens CHA0 (ID:pprc)","Pseudomonas protegens Cab57 (ID:ppro)","Pseudomonas pseudoalcaligenes (ID:ppse)","Pseudomonas psychrophila (ID:ppsy)","Pseudomonas putida S16 (ID:ppt)","Pseudomonas putida KT2440 (ID:ppu)","Pseudomonas putida DLL-E4 (ID:ppud)","Pseudomonas putida HB3267 (ID:ppuh)","Pseudomonas putida NBRC 14164 (ID:ppun)","Pseudomonas putida H8234 (ID:pput)","Pseudomonas sp. UW4 (ID:ppuu)","Pseudomonas parafulva (ID:ppv)","Pseudomonas putida W619 (ID:ppw)","Pseudomonas putida DOT-T1E (ID:ppx)","Pseudomonas poae (ID:ppz)","Pseudomonas resinovorans (ID:pre)","Pseudomonas rhizosphaerae (ID:prh)","Pseudomonas aeruginosa RP73 (ID:prp)","Pseudomonas stutzeri A1501 (ID:psa)","Pseudomonas syringae pv. syringae B728a (ID:psb)","Pseudomonas stutzeri CCUG 29243 (ID:psc)","Pseudomonas sp. CCOS 191 (ID:psec)","Pseudomonas sp. MRSN12121 (ID:psem)","Pseudomonas sp. StFLB209 (ID:pses)","Pseudomonas aeruginosa B136-33 (ID:psg)","Pseudomonas stutzeri RCH2 (ID:psh)","Pseudomonas stutzeri DSM 10701 (ID:psj)","Pseudomonas sp. TKP (ID:psk)","Pseudomonas sp. Os17 (ID:psos)","Pseudomonas savastanoi pv. phaseolicola 1448A (ID:psp)","Pseudomonas stutzeri DSM 4166 (ID:psr)","Pseudomonas syringae pv. tomato DC3000 (ID:pst)","Pseudomonas stutzeri 28a24 (ID:pstt)","Pseudomonas stutzeri 19SMN4 (ID:pstu)","Pseudomonas sp. VLB120 (ID:psv)","Pseudomonas cremoricolorata (ID:psw)","Pseudomonas syringae CC1557 (ID:psyr)","Pseudomonas stutzeri ATCC 17588 (ID:psz)","Pseudomonas trivialis (ID:ptv)"
    ];
  var graph = new joint.dia.Graph;
 var paper = new joint.dia.Paper({
        el: $('#paper-html-elements'),
        width: 1200,
        height: 1200,
        model: graph,
        gridSize: 1,
        background: { color: 'lightgrey' }
    });

    var selectedCellView=null;
    var radCircleParent=80;
    var a=350;

   (function() {


// Create a custom element.
// ------------------------

    joint.shapes.html = {};
    joint.shapes.html.Element = joint.shapes.basic.Rect.extend({
        defaults: joint.util.deepSupplement({
            type: 'html.Element',
            attrs: {
                rect: {fill:'', stroke: '', 'fill-opacity': 1 }
            }
        },
         joint.shapes.basic.Rect.prototype.defaults)
    });

// Create a custom view for that element that displays an HTML div above it.
// -------------------------------------------------------------------------

    joint.shapes.html.ElementView = joint.dia.ElementView.extend({

        template: [
            '<div class="html-element">',
             '<button class="delete">x</button>',
           
            '<input type="text" value="" class="tags" />',
            '</div>'
        ].join(''),

        initialize: function() {
            _.bindAll(this, 'updateBox');
            joint.dia.ElementView.prototype.initialize.apply(this, arguments);

            this.$box = $(_.template(this.template)());
            // Prevent paper from handling pointerdown.
            this.$box.find('input,select').on('mousedown click', function(evt) {
                evt.stopPropagation();
            });
            // This is an example of reacting on the input change and storing the input data in the cell model.
            this.$box.find('input').on('change', _.bind(function(evt) {
                this.model.set('input', $(evt.target).val());
            }, this));
            this.$box.find('select').on('change', _.bind(function(evt) {
                this.model.set('select', $(evt.target).val());
            }, this));
            this.$box.find('select').val(this.model.get('select'));
            this.$box.find('.delete').on('click', _.bind(this.model.remove, this.model));
            
            // Update the box position whenever the underlying model changes.
            this.model.on('change', this.updateBox, this);
            // Remove the box when the model gets removed from the graph.
            this.model.on('remove', this.removeBox, this);
            
            this.$box.find('input').autocomplete({
             source: availableTags
            });
            

            this.updateBox();
        },
        render: function() {
            joint.dia.ElementView.prototype.render.apply(this, arguments);
            this.paper.$el.prepend(this.$box);
            this.updateBox();
            return this;
        },
        updateBox: function() {
            // Set the position and dimension of the box so that it covers the JointJS element.
            var bbox = this.model.getBBox();
            // Example of updating the HTML with a data stored in the cell model.
            this.$box.find('label').text(this.model.get('label'));
            this.$box.find('span').text(this.model.get('select'));
            this.$box.css({
                width: bbox.width,
                height: bbox.height,
                left: bbox.x,
                top: bbox.y,
                transform: 'rotate(' + (this.model.get('angle') || 0) + 'deg)'
            });
        },
        removeBox: function(evt) {
            this.$box.remove();
        }
    });

// Create JointJS elements and add them to the graph as usual.
// -----------------------------------------------------------
// adding a root node
    var root_node_diameter=20;
    var i=1;


    var rootnode = new joint.shapes.basic.Rect({
        position: { x: 20, y: 350 },
       size: { width: root_node_diameter, height: root_node_diameter },
    attrs: { text: { text: '' }, rect: { fill: 'black',hasChildren:false ,level:1, label:false } },
    name: 'parent'   
    
});
 
   // adding cells to gragh
   graph.addCell(rootnode);

  
    // function for adding child node
   function drawChildren(x1,y1,lvl,childName,h,w){
     var cell = new joint.shapes.html.Element({
        position: { x: x1, y: y1 },
       size: { width: w, height: h },
    attrs: { text: { text: childName }, rect: { fill: '#78909C',level:lvl} },
    name: 'child'   
    
});

    graph.addCell(cell);
    return cell;
}


// cell click event

   paper.on('cell:pointerclick', function(cellView) {    
    

  
    // checking condition for it has already child or not

   if($("#"+cellView.id).find("rect").attr('has-children') == "true" || $("#"+cellView.id).find("rect").attr('label') == "true")
    {return false;
        }
    selectedCellView=cellView;

    addNewChildrens();
    

    });

// draw children function
function addNewChildrens(){
  
  if(selectedCellView == null)
    return;
    
   
   

    var level=parseInt($("#"+selectedCellView.id).find("rect").attr('level'))+1;
    
    a=500/level;
    var h=40;
    var w=120;
    
// getting postion of parent node and giving position to it's child node
    var x1=selectedCellView.model.attributes.position.x + 100;
    var y1=selectedCellView.model.attributes.position.y -  a;
    var x2=selectedCellView.model.attributes.position.x + 100;
    var y2=selectedCellView.model.attributes.position.y +  a;   
    
   

 // calling function for adding child node
    var c1= drawChildren(x1,y1,level," ",h,w);
    var c2= drawChildren(x2,y2,level," ",h,w);
    

    
        
    

    // giving link from parent node to child nodes
      if(i==1)
      {
        var link = new joint.dia.Link({
        source: { id: selectedCellView.model.id },
        target: { id: c1.id },
        vertices: [{ x: selectedCellView.model.attributes.position.x+(root_node_diameter/2), y: y1+(h/2)}]

        });
        
        var link1 = new joint.dia.Link({
        source: { id: selectedCellView.model.id },
        target: { id: c2.id },
        vertices: [{ x: selectedCellView.model.attributes.position.x+(root_node_diameter/2), y:y2+(h/2)}]
    
    
        });
      }
      else
      {
      var link = new joint.dia.Link({
        source: { id: selectedCellView.model.id },
        target: { id: c1.id },
        vertices: [{ x: selectedCellView.model.attributes.position.x+(w/2), y: y1+(h/2)}]

        });
        
        var link1 = new joint.dia.Link({
        source: { id: selectedCellView.model.id },
        target: { id: c2.id },
        vertices: [{ x: selectedCellView.model.attributes.position.x+(w/2), y:y2+(h/2)}]
    
    
         });
       }
        

     graph.addCell([c1,c2,link,link1]);
     
    //  set has-children value TRUE
    
     $("#"+selectedCellView.id).find("rect").attr('has-children',true);
     //$("#"+selectedCellView.id).find("circle").attr('label',true);

     i=i+1;

     
}
    

}())
     </script>