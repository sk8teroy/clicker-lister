
/*
    ==================================================
    writes formatted clicker lister data based on
    cldto and outputFormat
    ==================================================
*/
function getClickerListerText()
{
    var text = "";

    //outputformatDto
    //x  {"general":{"boldHeadings":true,
    //x              "numberFormat":"Comma"},
    //x   "heroes":{"shortNames":false},
    //  "items":{"showAbilities":true,
    //           "showRelics":false},
    //x  "ancients":{"shortNames":false,
    //x               "ancientSortOrder":"Descending",
    //x               "separateMaxedAncients":true,
    //x               "showUnsummonedAncients":true}}
    
    
    //cldto
    //  "relics":{"forgeCores":25894,
    //            "totalRelicsReceived":177,
    //            "equipped":[{"name":"Garnet Ring of Souls",
    //                         "rarity":"Common",
    //                         "level":30,
    //                         "bonus":[{"abilityId":17,"levels":4}]},
    //                        {"name":"Copper Band of Souls",
    //                         "rarity":"Common",
    //                         "level":31,
    //                         "bonus":[{"abilityId":17,"levels":4}]},
    //                        {"name":"Silver Azurite of Souls",
    //                         "rarity":"Common",
    //                         "level":42,
    //                         "bonus":[{"abilityId":17,"levels":4}]},
    //                        {"name":"Handwraps of Wallops",
    //                         "rarity":"Common",
    //                         "level":50,
    //                         "bonus":[{"abilityId":12,"levels":28},
    //                                  {"abilityId":17,"levels":3},
    //                                  {"abilityId":6,"levels":2},
    //                                  {"abilityId":14,"levels":4}]}]}}
    


    //sort ancients in DTO
    if( outputFormatDto.ancients.ancientSortOrder == "Alphabetical" )
    {
        //sort ancients alphabetically
        clDto.ancients.sort(function(a, b){
            return a.name == b.name ? 0 : +(a.name > b.name) || -1;
        });
    }
    else if( outputFormatDto.ancients.ancientSortOrder == "Ascending" )
    {
        clDto.ancients.sort(function(a, b){
            return a.level == b.level ? 0 : +(a.level > b.level) || -1;
        });
    }
    else if( outputFormatDto.ancients.ancientSortOrder == "Descending" )
    {
        clDto.ancients.sort(function(a, b){
            return a.level == b.level ? 0 : +(a.level < b.level) || -1;
        });
    }
    
    text += ancientText();

    if(outputFormatDto.ancients.separateMaxedAncients)
    {
        text += maxText();
    }

    if(outputFormatDto.ancients.showUnsummonedAncients)
    {
        text += unsummonedText();
    }

    text += heroText();
    
    text += miscText();

    text += timeText();

    if(outputFormatDto.items.showRelics)
    {
        text += relicText();
    }
    
    if(outputFormatDto.items.showAbilities)
    {
//        text += relicAbilitiesText();
    }
    
    

    return text;
}

function oneAncientText(oneAncient, showLevel)
{
    text = "";

    if(outputFormatDto.ancients.shortNames)
    {
        text += oneAncient.name.substring(0,4);
    }
    else
    {
        text += oneAncient.name;
    }

    if(showLevel)
    {
        if(oneAncient.isMax)
        {
            text += " (MAX)";
        }
        else
        {
            text += " (" + formatNumber(oneAncient.level) + ")";
        }
    }
    
    text += "; ";
    
    return text;
}

function headingStyle(headingText)
{
    return outputFormatDto.general.boldHeadings ? "**" + headingText + "**: " : headingText + ": ";
}

function ancientText()
{
    var text = headingStyle("Ancients");
    clDto.ancients.forEach( function (oneAncient) {
        if(!outputFormatDto.ancients.separateMaxedAncients
           || 
           !oneAncient.isMax)
        {
            text += oneAncientText(oneAncient, true);
        }    
    });
    
    return text;
}

function maxText()
{
    text = "\n\n";
    text += headingStyle("Max");
    maxedAncients = [];
    clDto.ancients.forEach( function (oneAncient) {
        if(outputFormatDto.ancients.separateMaxedAncients
           && 
           oneAncient.isMax)
        {
            maxedAncients.push(oneAncient);
        }   
    });
    
    maxedAncients.sort(function(a, b){
        return a.name == b.name ? 0 : +(a.name > b.name) || -1;
    });
    
    maxedAncients.forEach( function (oneAncient) {
        text += oneAncientText(oneAncient, false);            
    });
    return text;
}

function unsummonedText()
{
    text = "\n\n";
    text += headingStyle("Not Summoned");
    
    unsummonedNames = [];
    for (var key in ancientsMap) {
        if (ancientsMap.hasOwnProperty(key)) {
            unsummonedNames.push(ancientsMap[key].name);
        }
    }
    
    //unsummonedNames contains all ancient names now.
    clDto.ancients.forEach( function (oneAncient) {
        var index = unsummonedNames.indexOf(oneAncient.name);
        if( index >= 0 )
        {
            unsummonedNames.splice(index,1);
        }
    });
    //unsummonedNames contains only unsummonedNames ancients now.
    
    unsummonedNames.sort(function(a, b){
        return a == b ? 0 : +(a > b) || -1;
    });
    
    unsummonedNames.forEach( function (oneName) {
        if(outputFormatDto.ancients.shortNames)
        {
            text += oneName.substring(0,4);
        }
        else
        {
            text += oneName;
        }
        text += "; ";
    });
    
    return text;
}

function heroText()
{
    text ="\n\n";
    text += headingStyle("Gilded Heroes");
    
    clDto.gildedHeroes.forEach( function (oneHero) {
        if(outputFormatDto.heroes.shortNames)
        {
            text += oneHero.name.substring(0,4);
        }
        else
        {
            text += oneHero.name;
        }
        
        text += "(" + formatNumber(oneHero.numGilds) + "); ";
    });

    return text;
}

function miscText()
{
    text ="\n\n";
    text += headingStyle("Misc");

    text += "HS (" + formatNumber(clDto.misc.herosouls.current) + "; ";
    text += "Spent on Ancients/Rerolls: ";

    ancientSpend = 0;
    clDto.ancients.forEach( function (oneAncient) {
        ancientSpend += oneAncient.spentHeroSouls;
    });

    text += formatNumber(ancientSpend) + "/" + formatNumber(clDto.misc.herosouls.rerollSpend) + "; ";
    text += "Total: " + formatNumber(ancientSpend + clDto.misc.herosouls.rerollSpend + clDto.misc.herosouls.current) + ") ";
    
    text += "HZE: " + formatNumber(clDto.misc.zones.hze) + "; ";
    text += "Current Zone: " + formatNumber(clDto.misc.zones.current) + "; ";
    text += "Ascensions: " + formatNumber(clDto.misc.ascensions) + "; ";
    text += "Rubies: " + formatNumber(clDto.misc.rubies) + "; ";
    text += "Immortal Damage: " + formatNumber(clDto.misc.immortalDamage) + "; ";
    text += "Forge Cores: " + formatNumber(clDto.relics.forgeCores) + "; ";
    text += "Total Relics Found: " + formatNumber(clDto.relics.totalRelicsReceived) + "; ";
    text += "Achievements: " + Math.floor(clDto.misc.achievementCount/numberOfAchievementsPossible*100) +"%; ";
    
    return text;
}

function timeText() {
    text = "\n\n";
    text += headingStyle("Time");

    currentTime = new Date().getTime();
    timeSinceCreation = +currentTime - +clDto.misc.time.creation;
    timeSinceAscension = +currentTime - +clDto.misc.time.ascension;

    
    text += "Total Elapsed: " + formatElapsedTime(timeSinceCreation) + "; ";
    text += "This Ascension: " + formatElapsedTime(timeSinceAscension) + "; ";
    
    return text;
}

function relicText() {
    text = "\n\n";

    count = 1;

    clDto.relics.equipped.forEach(function (oneRelic) {
        text += headingStyle("Relic " + count); 
        text += oneRelic.name.split(" of")[0] + ": ";
        text += oneRelic.rarity + " ";
        text += "Level " + oneRelic.level + ", Bonus: ";

        oneRelic.bonus.forEach(function (oneBonus) {
            text += "+" + oneBonus.levels + " " + abilitiesMap[oneBonus.abilityId].ancient + "; ";
        });

        text += "\n\n";

        count++;
    });

    return text;
}



function formatNumber(number)
{
    var formatter = "";
    var digits = number.toString().length;
    var ACCURACY = 4; //Constant
    

    if(outputFormatDto.general.numberFormat == "Comma" || digits < 6){
        formatter = number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }else{
        var num = Math.round(number/(Math.pow(10,digits-ACCURACY))).toString();
        while(num.length < ACCURACY || num.length < 3){
            num += "0";
        }
        
        //Scientific defaults
        var period = 1;
        var delimiter = 'e';
        //Scientific
        if(outputFormatDto.general.numberFormat == "Scientific") {
            digits -= 1;
        }else{ //Engineering
            var mod = digits % 3;
            delimiter = 'E';
            if(mod == 0){
                period = 3;
                digits -= 3;
            }else{
                period = mod;
                digits -= mod;
            }
        }
        formatter = num.substring(0,period);
        if(period < ACCURACY){
            formatter += '.' + num.substring(period,num.length);
        }
        formatter += delimiter + digits;
    }
    return formatter;
}

function formatElapsedTime(time) {
    text = "";


    time /= 1000; //seconds

    var days = time/(24*60*60);
    var hours = (time/(60*60))%24;
    var minutes = (time/60)%60; 
    var seconds = time%60;
    // Floor it all, removing remainders
    days = Math.floor(days);
    hours = Math.floor(hours);
    minutes = Math.floor(minutes);
    seconds = Math.floor(seconds);

    if(days > 0) {
        text += days + "d ";
    }
    
    text += hours.toString().paddingLeft("00") 
        + ":" + minutes.toString().paddingLeft("00") 
        + ":" + seconds.toString().paddingLeft("00");

    return text;
}

String.prototype.paddingLeft = function (paddingValue) {
   return String(paddingValue + this).slice(-paddingValue.length);
};


