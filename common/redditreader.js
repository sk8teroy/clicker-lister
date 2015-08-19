
/*
	==================================================
	Contains reader functions for use in multiple files.
	Allows for compact reading of save files in code files.
	==================================================
*/

function readRedditData(data)
{
    itemList = "";
    ancientsList = "";
    $.each(ancients,function(){
       this.level = 0; 
    });
    readAncientLevels(data);
    readRedditAncients(data.ancients.ancients);	
    readGilds(data.heroCollection.heroes);
    if(data.hasOwnProperty("items")){
        readItems(data.items.items);
    }
    readMisc(data);
    readTime(data);
}

function readRedditAncients(data)
{
	ancientList = "Ancients: ";
	ancientHolder = "";
	var maxHolder = "Max: ";
	var maxCount = 0;
        var missCount = 0;
	ancientListObjects = []; 
        abbreviated = false;
        missHolder = "Locked: ";
        
      $.each(ancients,function() {
          if(this.name === "None"){
              return;
          }
          if(this.level == this.maxLevel){
              maxHolder += this.name + ", ";
              maxCount++;
          }else if(this.level === 0){
                missHolder += this.name + ", ";
                missCount++;
          }else{
              ancientListObjects.push({name:this.name, level:this.level,output:true})
          }
      });
      if(ancientListObjects !== undefined){
          ancientHolder = sortAncients(ancientListObjects) + " \n\n";
      }
      if(maxCount){
          ancientHolder += maxHolder.slice(0,-2) + ";  \n\n"
      }
      if(missCount){
          ancientHolder += missHolder.slice(0,-2) + ";  \n\n"
      }
      ancientList += ancientHolder; 
}