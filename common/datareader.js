
/*
  ==================================================
  Contains reader functions for use in multiple files.
  Allows for compact reading of save files in code files.
  ==================================================
*/

function readData(data)
{
    
    if(abbreviated===false){
        readAncientLevels(data);
        readAncients(data.ancients.ancients);    
        readGilds(data.heroCollection.heroes);
        if(data.hasOwnProperty("items")){
            readItems(data.items);
        }
        readMisc(data);
        readTime(data);
    }
    if(abbreviated===true){
        readAncientsAbr(data.ancients.ancients);    
        readGilds(data.heroCollection.heroes);

        readMisc(data);
        readTime(data);
    }
    if(data.hasOwnProperty("items")){
        if(itemOption === "item"){
            readItems(data.items);
        }else{
            readAbilities(data.items);
        }
    }
}


function readAncients(data){
    ancientHolder = "";
    // Takes in data in the form of a json string. NOTE: The save file (as of 0.17a) saves ancient info
    // under root.ancients.ancients

    // Reset souls spent and ancients listed each time we read the ancients
    soulsSpent = 0; 
   ancientList = "Ancients: ";
    
    
    
    ancientListObjects = [];
    
    // Jquery, for each (object) in (data), do (function). The objects in root.ancients.ancients are the purchased ancients. Unpurchased are not listed.
    $.each(data, function() {
        // For each ancient, add new object to ancientListObjects with level and name
        ancientListObjects.push({level:this.level, name: ancients[this.id-1].name,output:true});
        
        // Adds the variable in the current ancient being checked to the total.
        soulsSpent += this.spentHeroSouls;
    });
    
    if(sortMethod=='desc' || sortMethod=='asc'){
        ancientHolder = sortAncients(ancientListObjects);
    }
    
    if(sortMethod=='id'){
        $.each(data, function() {
            ancientHolder += ancients[this.id-1].name + ' (' + this.level + '); ';
        });
    }
    

    if(ancientCount == 0) ancientHolder = "None;";
    
    ancientList += ancientHolder;
}

function readAncientsAbr(data){

    // Takes in data in the form of a json string. NOTE: The save file (as of 0.17a) saves ancient info
    // under root.ancients.ancients
    // Reset souls spent and ancients listed each time we read the ancients
    soulsSpent = 0;
    ancientList = "Ancients: ";
    ancientHolder = "";
    var maxHolder = "MAX: ";
    var maxCount = 0;
    //Initialize ancient list
    ancientListObjects = []; 
    
    $.each(data, function() {
        // For each ancient, do the following. Unpurchased not listed.

        var ancientID = this.id;
        var objectExists=false;
        
        if(this.level == ancients[this.id-1].maxLevel) this.level = "MAX";
        
        var currentLevel = this.level;
        
        // For each object in ancientListObjects,
        $.each(ancientListObjects, function() {
            
            if(this.level=="MAX") return;
            // If the objects level is the same as the ancients level
            if(this.level==currentLevel){
                // Add ancient name to the list of names, state that the level exists
                this.names += abr_ancients[ancientID-1].name + ', ';
                objectExists=true;
            }
        });
        // If the level isn't found in the objectlist, add a new object with that level and name.
        if (objectExists===false){
            if(this.level=="MAX"){ 
                maxHolder += abr_ancients[ancientID-1].name + ', '; 
                maxCount++;
            }else {
                ancientListObjects.push({level:this.level, names: abr_ancients[ancientID-1].name + ', '});
            }
        }
        
        // Adds the variable in the current ancient being checked to the total.
        soulsSpent += this.spentHeroSouls;
    });
    if(sortMethod=='id'){
        // Add each objects level and names to the ancientList, slice off the trailing commas and spaces, add a closing semicolon and space.
        $.each(ancientListObjects, function(){
            ancientHolder += this.level + ':' + (this.names).slice(0,-2) + "; ";
            
        });
        

        if(maxCount>0)ancientHolder += maxHolder.slice(0,-2) + "; ";
    }
    
    if(sortMethod=='desc' || sortMethod=='asc'){
        ancientHolder = sortAncients(ancientListObjects);
        if(maxCount>=1){
            
            
            ancientHolder += maxHolder.slice(0,-2) + "; ";
            
        }
    }
    ancientList += ancientHolder;// + missHolder;
}

function readGilds(data){

    // Takes in data in the form of a json string. NOTE: The save file (as of 0.17a) saves hero info
    // under root.heroCollection.heroes
    // Reset list at start of each call
    heroList = "Gilded heroes: ";
    var gildCount = 0;
    
    // Jquery, for each (object) in (data), do (function). The objects in .heroes are all the heroes, named after their ID. Unpurchased ARE listed, unlike ancients.
    $.each(data, function() {
        // heroHolder works the same as ancientHolder. Manipulate the entry before we add it to the list, for cleanness.
        if(this.id-1<heroes.length){
            if (abbreviated===false) heroHolder = heroes[this.id-1].name + ' (' + this.epicLevel + '), ';
            if (abbreviated===true) heroHolder = abr_heroes[this.id-1].name + '(' + this.epicLevel + '), ';
            // epicLevel = Gild count. Since it lists all purchased and unpurchased heroes, we only want to read the gilded heroes as of the current version.
            if(this.epicLevel>0){
                heroList += heroHolder;
                gildCount++;
            }
        }
    });
    
    if(gildCount == 0) heroList += "None, ";
    
}

function readTime(data){
    // Reset the list at start of each call
    timeList = "";
    
    // Grabs the various timestamps in the save.
    creationTime = data.creationTimestamp;
    prevLoginTime = data.prevLoginTimestamp;
    startTime = data.startTimestamp;
    // Grabs the current time, for comparisons.
    currentTime = new Date().getTime();
    // Compares times with current time. The positive signs are to specify integer handling. Javascript!
    timeSinceCreation = +currentTime - +creationTime;
    timeSinceAscension = +currentTime - +startTime;
    
    
    //Adding time to array
    
    if (abbreviated===false) timeHolder = 'Time since start: ' + formatTime(timeSinceCreation) + ', Time since ascension: ' + formatTime(timeSinceAscension) + ', ';
    if (abbreviated===true) timeHolder = 'First launch: ' + formatTime(timeSinceCreation) + ', Time since ascension: ' + formatTime(timeSinceAscension) + ', ';
    timeList += timeHolder;
}

function formatTime(time){
    // Time coverted to seconds from milliseconds, doesn't need to be more accurate.
    time /= 1000;
    var days = time/(24*60*60);
    var hours = (time/(60*60))%24;
    var minutes = (time/60)%60; 
    var seconds = time%60;
    // Floor it all, removing remainders
    days = Math.floor(days);
    hours = Math.floor(hours);
    minutes = Math.floor(minutes);
    seconds = Math.floor(seconds);

    // Return string of time.
    if(abbreviated===false) return days + ' days, ' + hours + ' hours, ' + minutes + ' minutes, ' + seconds + ' seconds';
    if(abbreviated===true) return days + ' days, ' + hours + ' hours';
}

function readMisc(data){
    miscList = "";
    var totalSouls = +data.heroSouls + +soulsSpent;
    if (abbreviated===false) miscHolder = 'Hero Souls: ' + data.heroSouls +  ', Souls spent on Ancients: ' + soulsSpent + ', Total Souls: ' + totalSouls + ', Highest Zone: ' + data.highestFinishedZonePersist + ', Current Zone: ' + data.currentZoneHeight + ', Ascensions: ' + data.numWorldResets +  ', ';
    if (abbreviated===true) miscHolder = 'HS: ' + data.heroSouls +  ', HS on Ancients: ' + soulsSpent + ', Total HS: ' + totalSouls + ', High Zone: ' + data.highestFinishedZonePersist + ', Current Zone: ' + data.currentZoneHeight + ', Ascensions: ' + data.numWorldResets +  ', ';
    miscList += miscHolder;
}

function arrayChopper(){
    //Chops up output arrays in blocks up to 249 chars + a comma at the end. Always ends with comma.
    ancientArray = ancientList.match(/.{1,249};/g);
    
    itemArray = itemList; //.match(/.{1,249},/g);
    heroArray = heroList.match(/.{1,249},/g);
    miscArray = miscList.match(/.{1,249},/g);
    timeArray = timeList.match(/.{1,249},/g);
}

function readHeroes(data){

    // Takes in data in the form of a json string. NOTE: The save file (as of 0.17a) saves hero info
    // under root.heroCollection.heroes

    // Jquery, for each (object) in (data), do (function). The objects in .heroes are all the heroes, named after their ID. Unpurchased ARE listed, unlike ancients.
    $.each(heroes, function(index) {
        
        this.level = data.heroCollection.heroes[index+1].level;
        this.epicLevel = data.heroCollection.heroes[index+1].epicLevel;


    });
}

function readAncientLevels(data)
{

    ancientCount = 0;
    soulsSpent = 0;
    // For each ancient,
    $.each(ancients, function(index){
        if(data.ancients.ancients[index+1]!==undefined) {
            this.level = data.ancients.ancients[index+1].level;
            soulsSpent += data.ancients.ancients[index+1].spentHeroSouls;
            if(this.level!=0) ancientCount++;
        }
    });
}

function sortAncients(objectArray){

    /*

      for each (object), put (level) into an array. 
      Then, sort array. 
      Then, for each (object), if level==array[i], output object.  Do that for array.length

    */

    var levelArray = [];
    sortHolder = "";
    var i = 0;
    $.each(objectArray, function() {
        
        levelArray[i] = this.level;
        i++
    });
    
    if(sortMethod=='asc') levelArray.sort(function(a, b){return a-b});
    if(sortMethod=='desc') levelArray.sort(function(a, b){return b-a});
    
    for (var k = 0; k < levelArray.length; k++){
        
        if(abbreviated==true){
            $.each(objectArray, function(){
                if(this.level==levelArray[k]) sortHolder += this.level + ':' + (this.names).slice(0,-2) + "; ";

            });
        }

        if(abbreviated==false){
            $.each(objectArray, function(){
                if(this.level==levelArray[k] && this.output==true){
                    sortHolder += this.name + ' (' + this.level + '); ';
                    this.output=false;
                }

            });
        }
    }

    return sortHolder;
}
