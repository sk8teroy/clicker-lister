
/*
    ==================================================
    writes formatted clicker lister data based on
    cldto and outputFormat
    ==================================================
*/
function getClickerListerText()
{
    var text = "";

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
    
    if(outputFormatDto.items.showRelicBonusAncients || outputFormatDto.items.showRelicBonusAbilities)
    {
        text += relicAbilitiesText();
    }
  
    if(outputFormatDto.vs.idle)
    {
        text += vsIdleText();
    }

    //todo hybrid
    //todo active

//    text += "\n\n" + headingStyle("Made with") + " [clicker-lister](http://alexbonjour.github.io/clicker-lister)";

    return wrapText(text);
}

function wrapText(text)
{
    if(!outputFormatDto.general.maxLineLength250)
    {
        return text;
    }
    wrappedText = "";

    text.split("\n").forEach( function (oneLine) {
        if(oneLine.length <= 250)
        {
            wrappedText += oneLine + "\n";
        }
        else
        {
            splitLineHere = oneLine.substring(0,250).lastIndexOf(" ");
            wrappedText += oneLine.substring(0,splitLineHere) + "\n";
            wrappedText += oneLine.substring(splitLineHere) + "\n";
        }
    });
    
    return wrappedText;;
}

function headingStyle(headingText)
{
    return outputFormatDto.general.redditMarkDown ? "**" + headingText + "**: " : headingText + ": ";
}

function ancientText()
{
    var text = headingStyle("Ancients");

    if(clDto.ancients.length == 0)
    {
        text += "None;";
        return text;
    }

    clDto.ancients.forEach( function (oneAncient) {
        if(!outputFormatDto.ancients.separateMaxedAncients
           || 
           !oneAncient.isMax)
        {
            text += oneAncientText(oneAncient, true);
            text += ", ";
        }    
    });

    text = text.substring(0,text.length-2);
    text += ";";

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
        if(outputFormatDto.ancients.shortNames)
        {
            if(oneAncient.isMax)
            {
                text += ":MAX";
            }
            else
            {
                text += ":" + formatNumber(oneAncient.level);
            }
        }
        else
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
    }
    
    return text;
}

function maxText()
{
    if(clDto.ancients.length == 0)
    {
        return "";
    }

    maxedAncients = [];
    clDto.ancients.forEach( function (oneAncient) {
        if(outputFormatDto.ancients.separateMaxedAncients
           && 
           oneAncient.isMax)
        {
            maxedAncients.push(oneAncient);
        }   
    });
    
    if(maxedAncients.length == 0)
    {
        return "";
    }

    text = "\n\n";
    text += headingStyle("Max");

    maxedAncients.sort(function(a, b){
        return a.name == b.name ? 0 : +(a.name > b.name) || -1;
    });
    
    maxedAncients.forEach( function (oneAncient) {
        text += oneAncientText(oneAncient, false) + ", ";            
    });

    text = text.substring(0,text.length-2) + ";";
    return text;
}

function unsummonedText()
{
    if(clDto.ancients.length == 0)
    {
        return "";
    }

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
    
    text = "";
    if(unsummonedNames.length > 0)
    {
        text += "\n\n";
        text += headingStyle("Not Summoned");
        
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
            text += ", ";
        });

        text = text.substring(0,text.length-2) + ";";
    }

    return text;
}

function heroText()
{
    text ="\n\n";
    text += headingStyle("Gilded Heroes");


    if(clDto.gildedHeroes.length == 0)
    {
        text += "None;";
        return text;
    }

    clDto.gildedHeroes.forEach( function (oneHero) {
        if(outputFormatDto.heroes.shortNames)
        {
            text += oneHero.name.substring(0,4);
            text += ":" + formatNumber(oneHero.numGilds) + ", ";
        }
        else
        {
            text += oneHero.name;
            text += " (" + formatNumber(oneHero.numGilds) + "), ";
        }
        
    });

    text = text.substring(0,text.length-2) + ";";

    return text;
}

function miscText()
{
    text ="\n\n";
    text += headingStyle("Misc");

    text += "HS (" + formatNumber(clDto.misc.herosouls.current) + "; ";

    ancientSpend = 0;
    clDto.ancients.forEach( function (oneAncient) {
        ancientSpend += oneAncient.spentHeroSouls;
    });

    if(outputFormatDto.general.minMiscSection)
    {
        text += "Spent on Ancients: ";
        text += formatNumber(ancientSpend) + "; ";
    }
    else
    {
        text += "Spent on Ancients/Rerolls: ";
        text += formatNumber(ancientSpend) + "/" + formatNumber(clDto.misc.herosouls.rerollSpend) + "; ";
    }

    text += "Total: " + formatNumber(ancientSpend + clDto.misc.herosouls.rerollSpend + clDto.misc.herosouls.current) + ") ";
    
    text += "HZE: " + formatNumber(clDto.misc.zones.hze) + "; ";
    text += "Current Zone: " + formatNumber(clDto.misc.zones.current) + "; ";
    text += "Ascensions: " + formatNumber(clDto.misc.ascensions) + "; ";

    if(outputFormatDto.general.minMiscSection)
    {
        text += "ID: " 
    }
    else
    {
        text += "Immortal Damage: " 
    }
    text += formatNumber(clDto.misc.immortalDamage) + "; ";

    if(!outputFormatDto.general.minMiscSection)
    {
        text += "Rubies: " + formatNumber(clDto.misc.rubies) + "; ";
        text += "Forge Cores: " + formatNumber(clDto.relics.forgeCores) + "; ";
        text += "Total Relics Found: " + formatNumber(clDto.relics.totalRelicsReceived) + "; ";
        text += "Achievements: " + Math.floor(clDto.misc.achievementCount/numberOfAchievementsPossible*100) +"%; ";
    }

    return text;
}

function timeText() {
    text = "\n\n";
    text += headingStyle("Time");

    currentTime = new Date().getTime();
    timeSinceCreation = +currentTime - +clDto.misc.time.creation;
    timeSinceAscension = +currentTime - +clDto.misc.time.ascension;

    
    text += "Since Start: " + formatElapsedTime(timeSinceCreation, true) + "; ";
    text += "Since Ascension: " + formatElapsedTime(timeSinceAscension, false) + "; ";
    
    return text;
}

function vsIdleText() {
    text = "\n\n";
    text += headingStyle("Vs. Idle") + "[Calculator](http://alexbonjour.github.io/rules-of-thumb)";
    
    var siyaAncient = 0;
    var argAncient = 0;
    var morgAncient = 0;
    var libAncient = 0;
    var mamAncient = 0;
    var mimAncient = 0;
    var soloAncient = 0;

    clDto.ancients.forEach( function (oneAncient) {
        if(oneAncient.name == ancientsMap[5].name) //Siya
            siyaAncient = oneAncient;
        
        if(oneAncient.name == ancientsMap[28].name) //Argaiv
            argAncient = oneAncient;

        if(oneAncient.name == ancientsMap[16].name) //Morg
            morgAncient = oneAncient;

        if(oneAncient.name == ancientsMap[4].name) //Lib
            libAncient = oneAncient;

        if(oneAncient.name == ancientsMap[8].name) //Mam
            mamAncient = oneAncient;

        if(oneAncient.name == ancientsMap[9].name) //Mimm
            mimAncient = oneAncient;

        if(oneAncient.name == ancientsMap[3].name) //Solo
            soloAncient = oneAncient;
    });

    if(!siyaAncient) {
        text += "Summon Siyalatas to see this information.\n";
        return text;
    }
        
    text += "\n\n" + "Ancient | Level | Delta % | Delta Levels" + "\n";
    text += "---|---|---|---" + "\n";
    
    text += deltaLine(siyaAncient.level, "Siyalatas", siyaAncient.level);
    text += deltaLine(siyaAncient.level, "Argaiv", argAncient ? argAncient.level : 0);
    text += deltaLine(idle_or_hybrid_morg_calc(siyaAncient.level), "Morgulis", morgAncient ? morgAncient.level : 0);
    text += deltaLine(gold_calc(siyaAncient.level), "Libertas", libAncient ? libAncient.level : 0);
    text += deltaLine(gold_calc(siyaAncient.level), "Mammon", mamAncient ? mamAncient.level : 0);
    text += deltaLine(gold_calc(siyaAncient.level), "Mimzee", mimAncient ? mimAncient.level : 0);
    text += deltaLine(idle_solomon_calc(siyaAncient.level), "Solomon", soloAncient ? soloAncient.level : 0);

    return text;
}

function deltaLine(targetValue, ancientName, ancientLevel) {

    text = "";

    deltaLevels = ancientLevel - targetValue;
    deltaLevelsString = (deltaLevels >=0 ? "+" : "" ) + formatNumber(deltaLevels);
    deltaPercent = deltaLevels/targetValue*100;
    deltaPercentString = (deltaPercent>=0 ? "+" : "") + Math.floor(deltaPercent) + "%";
    text += ancientName + " | " + formatNumber(ancientLevel) + " | " + deltaPercentString + " | " + deltaLevelsString + "\n";

    return text;
}

function relicText() {
    text = "\n\n";
    text += headingStyle("Relics");

    if(clDto.relics.equipped.length==0)
    {
        text += "None;";
        return text;
    }

    text += "\n\n";
    clDto.relics.equipped.forEach(function (oneRelic) {

        text += outputFormatDto.general.redditMarkDown ? "* " : "";
        text += oneRelic.name.split(" of")[0] + ": ";
        text += oneRelic.rarity + " ";
        text += "Lvl " + oneRelic.level + ", ";

        oneRelic.bonus.forEach(function (oneBonus) {
            text += "+" + oneBonus.levels + " ";
            ancientName = abilitiesMap[oneBonus.abilityId].ancient;
            text += outputFormatDto.ancients.shortNames ? ancientName.substring(0,4) : ancientName;
            text += ", ";
        });

        text = text.substring(0,text.length-2) + ";";
        text += "\n";
    });

    return text;
}

function relicAbilitiesText() {
    text = "\n\n";
    text += headingStyle("Total Relic Bonuses");

    if(clDto.relics.equipped.length==0)
    {
        text += "None;";
        return text;
    }

    text += "\n\n";

    bonusToPrint = {};
    
    //combine bonuses (+5 Atman instead of +3 Atman; +2 Atman)
    clDto.relics.equipped.forEach(function (oneRelic) {
        oneRelic.bonus.forEach(function (oneBonus) {
            if(bonusToPrint.hasOwnProperty(oneBonus.abilityId)) 
            {
                bonusToPrint[oneBonus.abilityId] += oneBonus.levels;
            }
            else
            {
                bonusToPrint[oneBonus.abilityId] = oneBonus.levels;
            }

        });
    });


    //ugly... pushing to array of objects to be able to sort them...
    bonusInArray = [];
    for (var id in bonusToPrint) {
        onething = {};
        onething.id = id;
        onething.level = bonusToPrint[id];
        bonusInArray.push(onething);
    }
    
    bonusInArray.sort(function(a, b){
        return abilitiesMap[a.id].sortOrder == abilitiesMap[b.id].sortOrder ? 0 : +(abilitiesMap[a.id].sortOrder > abilitiesMap[b.id].sortOrder) || -1;
    });



    bonusInArray.forEach( function (oneBonus) {
        ability = abilitiesMap[oneBonus.id];

        text += outputFormatDto.general.redditMarkDown ? "* " : "";
        if(outputFormatDto.items.showRelicBonusAncients)
        {
            text += "+" + oneBonus.level + " ";
            text += outputFormatDto.ancients.shortNames ? ability.ancient.substring(0,4) : ability.ancient;
            text += " ";
        }        

        if(outputFormatDto.items.showRelicBonusAbilities)
        {
            var boost = effectPower(ability, oneBonus.level);
            effectText = ability.effectDescription.replace("%1", boost);
            
            if(outputFormatDto.general.redditMarkDown)
            {
                superscript = outputFormatDto.items.showRelicBonusAncients ? "\\(" + effectText + "\\)" : effectText;
                superscript.split(" ").forEach( function (littleString) {
                    text += "^^" + littleString + " ";
                });
            }
            else
            {
                text += outputFormatDto.items.showRelicBonusAncients ? "(" + effectText + ")" : effectText;
            }
        }

        text += "\n";
    });

    return text;
}

function effectPower(ability, upgradeLevels) {
    if(ability.upgradePerLevel != "n/a")
    {
        return upgradeLevels * ability.upgradePerLevel;
    }

   
    if(ability.ancient == "Solomon")
    {
        var solomonLevel = 0;
        clDto.ancients.forEach( function (oneAncient) {
            if(oneAncient.name=="Solomon")
            {
                solomonLevel = oneAncient.level;
            }
        });
                      
        return solomonBonus(solomonLevel + upgradeLevels) - solomonBonus(solomonLevel);
    }

    if(ability.ancient == "Siyalatas")
    {
        var siyaLevel = 0;
        clDto.ancients.forEach( function (oneAncient) {
            if(oneAncient.name=="Siyalatas")
            {
                siyaLevel = oneAncient.level;
            }
        });

        return siyLibBonus(siyaLevel + upgradeLevels) - siyLibBonus(siyaLevel);
    }

    if(ability.ancient == "Libertas")
    {
        var libLevel = 0;
        clDto.ancients.forEach( function (oneAncient) {
            if(oneAncient.name=="Libertas")
            {
                libLevel = oneAncient.level;
            }
        });

        return siyLibBonus(libLevel + upgradeLevels) - siyLibBonus(libLevel);
    }

    return 0;
}

function siyLibBonus(level) {
    //+25% to 15% idle DPS (Down 1% every 10 levels).

    if      (level >  9 && level <= 19) return (level- 9)*24 + siyLibBonus( 9);
    else if (level > 19 && level <= 29) return (level-19)*23 + siyLibBonus(19);
    else if (level > 29 && level <= 39) return (level-29)*22 + siyLibBonus(29);
    else if (level > 39 && level <= 49) return (level-39)*21 + siyLibBonus(39);
    else if (level > 49 && level <= 59) return (level-49)*20 + siyLibBonus(49);
    else if (level > 59 && level <= 69) return (level-59)*19 + siyLibBonus(59);
    else if (level > 69 && level <= 79) return (level-69)*18 + siyLibBonus(69);
    else if (level > 79 && level <= 89) return (level-79)*17 + siyLibBonus(79);
    else if (level > 89 && level <= 99) return (level-89)*16 + siyLibBonus(89);
    else if (level > 99)                return (level-99)*15 + siyLibBonus(99);

    return level*25; //level 0-9
}

function solomonBonus(level) {
    if      (level >= 21 && level <= 40) return (level-20)*4 + solomonBonus(20);
    else if (level >= 41 && level <= 60) return (level-40)*3 + solomonBonus(40);
    else if (level >= 61 && level <= 80) return (level-60)*2 + solomonBonus(60);
    else if (level >= 81)                return (level-80)*1 + solomonBonus(80);
    
    return level*5; //level 0-20
}

function formatNumber(number)
{
    if(outputFormatDto.general.numberFormat == "JustNumbers")
    {
        return number;
    }

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

function formatElapsedTime(time, daysOnly) {
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
    
    days = days < 0 ? 0 : days;
    hours = hours < 0 ? 0 : hours;
    minutes = minutes < 0 ? 0 : minutes;
    seconds = seconds < 0 ? 0 : seconds;

    if(days > 0 || daysOnly) //if days only, you always want day to be output.
    {
        text += days;
        text += (days==1 ? " day" : " days");
    }
 
    if(!daysOnly)
    {
        text += days==0 ? "" : " ";
        text += hours + "h " + minutes + "m";
//        text += hours.toString().paddingLeft("00") 
//            + ":" + minutes.toString().paddingLeft("00") 
//            + ":" + seconds.toString().paddingLeft("00");
    }
    
    return text;
}

// String.prototype.paddingLeft = function (paddingValue) {
//    return String(paddingValue + this).slice(-paddingValue.length);
// };


