/*
  ==================================================
  Original intent was to produce a list of ancients
  and their levels. Since then it's evolved to list
  most(if not all) relevant info that one might want
  to share.
  ==================================================
*/



/***********************************************************************
 * Ancients: Ancient name (ancient level) 
 * Max: Anceints that are maxed
 * Not summoned: Ancients taht are not summoned 
 * 
 * Gilded Heroes: Hero name (# of gilds)
 * 
 * Misc: 
 * HS (326,188; Spent on Ancients/Rerolls: 6,752,529/9,118; Total: 7,087,835) 
 * HZE: 1,694
 * Current Zone: 1,263
 * Ascensions: 83
 * Rubies: 121
 * Immortal Damage: 2,421,135
 * Forge Cores: 25,307
 * Total Relics Found: 174
 * Achievements: 71%;  
 *
 * Time Since Start: 94d, 23h, 45m
 * Time since ascension: 11h, 16s;  
 * 
 * Relic stuff
 * Total Item Bonuses:
 * +15% Primal Boss Chance
 * +28 Sec Super Clicks
 * +2 Starting Zone
 * +40% Hero Soul DPS
 * OR
 * Items:
 * Relic Name: relic-rarity Lvl relic-lvl, bonus1; bonus; ...
 * Garnet Ring: Common Lvl 30, +4% Primal Boss Chance;  
 * Copper Band: Common Lvl 31, +4% Primal Boss Chance;  
 * Silver Azurite: Common Lvl 42, +4% Primal Boss Chance;  
 * Handwraps: Common Lvl 50, +28 Sec Super Clicks, +3% Primal Boss Chance, +2 Starting Zone, +40% Hero Soul DPS;  
 * 
 * Miscellaneous Switches:
 * Reddit style - bold or unbold option for section titles
 * Ancient sort order controlled by ascending/descending order radio button
 * Abilities or Itesm switch for Relic data
 * number formatting: comma, scientific, engineering
 * Kong style - abbreviated mode off = no max section, no unsummoned section. all ancients summoned listed with level
 * Kong style - abbreviated mode on = no max section, no unsummoned section. all ancients summed up by value.  675:Mamm,Mimz MAX: Bubo, Kuma, etc. etc.
 ***********************************************************************/

/* **clicker hero data json**
 * ancients - name, level, 
 * heroes - name, #gilds
 * relics -relic[1-4], forge cores, total relics found
 * - name, rarity, level, relic-bonus[1-4]
 * - relic-bonus - ancient name, +levels, effect
 * misc
 * - herosouls - current, spent on ancients, spent on rerolls, total
 * - zones - hze, current
 * - ascensions
 * - rubies
 * - immortal damage
 * - achievements
 */

/* **output format json**
 * outputformat
 * -bold t/f
 * -short names t/f
 * -max output length (250 for kong, undefined for no limit
 * -show abilities t/f
 * -show relics t/f
 * -sort ancients ascending/descending
 * -numberformat
 * -group maxed ancients t/f
 * -group ancients by level t/f
 * -show unsummoned ancients t/f
 */

/**
 var obj = new Object();
   obj.name = "Raj";
   obj.age  = 32;
   obj.married = false;
   var jsonString= JSON.stringify(obj);
*/

//Misc
var soulsSpent = 0;

//Lists
var ancientList = "Ancients: ";
var heroList = "Gilded heroes: ";
var itemList = "";
var miscList = "Misc Info: ";
var timeList = "";

//Elements
mainListener('click',calc,calcButton);

function calc(){
    abbreviated = abbreviatedMode.checked;

    outputFormat = $('input[name="outputFormat"]:checked').val();
    if(outputFormat === "reddit"){
        $("#abbreviatedMode").next("label").html("Bold Titles");
    }else{
        $("#abbreviatedMode").next("label").html("Abbreviated Mode");
    }

    var string = input.value;
    var myData = decryptSave(string);

    sortMethod = $('input[name="sortMode"]:checked').val();
    itemOption = $('input[name="itemOption"]:checked').val();
    formatOption = $('input[name="formatOption"]:checked').val();

    if(outputFormat == "kong"){
        readData(myData);
        arrayChopper();
        //Adds together the arrays. More arrays can be added after heroArray with commas separating them.
        var outputArray = ancientArray.concat(heroArray,miscArray,timeArray);

        var len = outputArray.length;

        for(i=0;i<outputArray.length;i++){

            // Chops off starting commas and spaces.
            while(outputArray[i][0]==","||outputArray[i][0]==" "){

                outputArray[i] = outputArray[i].substring(1);

            }

            // Chops off trailing commas. Leaves spaces.
            while(outputArray[i][outputArray[i].length-1] == ','){

                outputArray[i] = outputArray[i].slice(0,-1);

            }

        }
        // Adds newlines between all blocks. Reconsider this for abbreviated version.
        for (i=0;i<=len+1;i++){
            outputArray.splice(i+1,0,'\n\n');
            i++;
        }

        output.value = outputArray.join("") + "\n\n" + itemList;// + itemList;
    }else{
        readRedditData(myData);

        if(abbreviatedMode.checked){
            //Add reddit formatting for bolding
            ancientList = ancientList.replace("Ancients:","**Ancients**:");
            ancientList = ancientList.replace("Max:","**Max**:");
            ancientList = ancientList.replace("Not Summoned:","**Not Summoned**:");
            timeList = timeList.replace("Time Since Start:","**Time Since Start**:");
            miscList = miscList.replace("Misc:","**Misc**:");
            ancientList = ancientList.replace("Time since start:","**Time since start**:");
            heroList = heroList.replace("Gilded heroes:","**Gilded Heroes**:");
            itemList = itemList.replace("Items:","**Items**:");
            itemList = itemList.replace("Total Item Bonuses:","**Total Item Bonuses**:");
            itemList = itemList.replace("Junk Pile:","**Junk Pile**:");
        }
        //Get rid of commas in place of ;
        output.value = ancientList + heroList.slice(0,-2) + ";  " +
            "\n\n" + miscList.slice(0,-2) + ";  " +
            "\n\n" + timeList.slice(0,-2)+ ";  " +
            "\n\n" + itemList + "  ";
    }
}
