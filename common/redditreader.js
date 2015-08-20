
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
        if(itemOption === "item"){
            readItems(data.items);
        }else{
            readAbilities(data.items);
        }
    }
    readMisc(data);
    readTime(data);
}

function readAbilities(data)
{
    itemList = "Items: \n";
    var items = "";
    var ability = [];
    var ability_index;
    var item;
    
    for(var i=1;i<5;i++){
        item = data.items[data.slots[i]];
        for (var j=1; j<5; j++) {
            ability_index = -1;
            var bonus_type = "bonusType" + j.toString();
            var bonus_level = "bonus" + j.toString() + "Level";
            if(item[bonus_type] > 0) {
                for(var k=0;k<ability.length;k++){
                    if(ability[k].type === item[bonus_type]){
                        ability_index = k;
                        break;
                    }
                }
                if(ability_index != -1){
                    ability[k].level += applyLevelFormula(item[bonus_type],item[bonus_level]);
                }else{
                    ability.push({type:item[bonus_type],level:applyLevelFormula(item[bonus_type],item[bonus_level])});
                }
            }
        }
    }
    for(var m=0;m<ability.length;m++){
        items += "{" + applyExpression(ability[m].type,ability[m].level) + "}\n";
    }
    if(items !== ""){
        itemList += items;
    }else{
        itemList += "None;";
    }
}
function readItems(data)
{
	// Takes in data in the form of a json string. data = data.items.items
	itemList = "Items: \n";
        var rarity_arr = ["Common","Uncommon","Rare","Epic","Fabled","Mythical","Legendary","Transcendent"];
        var items = "";
	var ability;
        var item_counter = 0;
	
    $.each(data.items, function() {
        ability = [];
        item_counter++;
        //Check each items' four abilities
        for (var j=1; j<5; j++) {
            var str = "bonusType" + j.toString();
            if(this[str] > 0) {
                ability.push(applyExpression(this[str],applyLevelFormula(this[str],this["bonus" + j + "Level"])));
            }
        }
        //Add generic item information
        if(item_counter === 5){
            items += "Junk Pile:  \n";
        }
        items += this.name + ": ";
        items += "Rarity: " + rarity_arr[this.rarity-1] + ", ";
        items += "Level: " + this.level + ", Abilities: ";
        //Add abilities between curlies
        for(var i=0; i<ability.length;i++){
            items += "{" + ability[i] + "}";
        }
        items += "  \n\n";
    }); 
        if(items !== ""){
            itemList += items;
        }else{
            itemList += "None;";
        }
        
}
function applyExpression(ability_index,lvl)
{
    return abilities[ability_index].effectDescription.replace("%1",lvl);
}
function applyLevelFormula(ability_index,lvl)
{
    var siyLib = [0, 25, 50, 75, 100, 125, 150, 175, 200, 225, 249, 273, 297, 321, 345, 369, 393, 417, 441, 465, 488, 511, 534, 557, 580, 603, 626, 649, 672, 695, 717, 739, 761, 783, 805, 827, 849, 871, 893, 915, 936, 957, 978, 999, 1020, 1041, 1062, 1083, 1104, 1125, 1145, 1165, 1185, 1205, 1225, 1245, 1265, 1285, 1305, 1325, 1344, 1363, 1382, 1401, 1420, 1439, 1458, 1477, 1496, 1515, 1533, 1551, 1569, 1587, 1605, 1623, 1641, 1659, 1677, 1695, 1712, 1729, 1746, 1763, 1780, 1797, 1814, 1831, 1848, 1865, 1881, 1897, 1913, 1929, 1945, 1961, 1977, 1993, 2009, 2025];
    var level = 0;
    var formula = abilities[ability_index].levelAmountFormula;
    
    formula == "linear1" ? level = lvl :
    formula == "linear5" ? level =  lvl*5 :
    formula == "linear0_25" ? level = lvl*.25 :
    formula == "linear10" ? level = lvl*10 :
    formula == "linear15" ? level = lvl*15 :
    formula == "linear25" ? level = lvl*25 :
    formula == "solomonRewards" ? level = lvl*5 :
    formula == "linear10" ? level = lvl*10 :
    level = siyLib[lvl];
    
    return level;
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