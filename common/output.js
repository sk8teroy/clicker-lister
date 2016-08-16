
/*
    ==================================================
    writes formatted clicker lister data based on
    cldto and outputFormat
    ==================================================
*/
function getClickerListerText()
{
    var text = "";

    text += outsidersText();

    var sortedAncientNames = [];
    for (var key in clDto.ancientMap) {
        sortedAncientNames.push(key);
    }
    
    //sort ancients 
    if( outputFormatDto.ancients.ancientSortOrder == "Alphabetical" )
    {
        sortedAncientNames.sort(function(a, b){
            return a == b ? 0 : +(a > b) || -1;
        });
    }
    else if( outputFormatDto.ancients.ancientSortOrder == "Ascending" )
    {
        sortedAncientNames.sort(function(a, b){
            return clDto.ancientMap[a].level == clDto.ancientMap[b].level ? 0 : +(clDto.ancientMap[a].level > clDto.ancientMap[b].level) || -1;
        });
    }
    else if( outputFormatDto.ancients.ancientSortOrder == "Descending" )
    {
        sortedAncientNames.sort(function(a, b){
            return clDto.ancientMap[a].level == clDto.ancientMap[b].level ? 0 : +(clDto.ancientMap[a].level < clDto.ancientMap[b].level) || -1;
        });
    }

    text += ancientText(sortedAncientNames);

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

    if(outputFormatDto.vs.hybrid)
    {
        text += vsHybridText();
    }

    if(outputFormatDto.vs.active)
    {
        text += vsActiveText();
    }

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

function outsidersText()
{
    var text = headingStyle("Outsiders");

    if( clDto.ancientSouls.outsiders.length == 0 ) {
        text += "None - Unspent AS (" + clDto.ancientSouls.currentAS +");";
        return text;
    }

    clDto.ancientSouls.outsiders.forEach( function (oneOutsider) {
        if(outputFormatDto.ancients.shortNames)
        {
            text += oneOutsider.name.substring(0,4);
            text += ":" + oneOutsider.level;
            text += ", ";
        }
        else
        {
            text += oneOutsider.name;
            text += " (" + oneOutsider.level + ")";
            text += ", ";
        }
        });

    if( clDto.ancientSouls.currentAS > 0 ) {
        text += "Unspent AS (" + clDto.ancientSouls.currentAS +"), ";
    }
    
    text = text.substring(0,text.length-2);
    text += ";";

    return text;
}

function ancientText(sortedAncientNames)
{
    var text = "\n\n";
    text += headingStyle("Ancients");

    if(sortedAncientNames.length == 0)
    {
        text += "None;";
        return text;
    }

    sortedAncientNames.forEach( function (oneName) {
        oneAncient = clDto.ancientMap[oneName];
        text += oneAncientText(oneAncient, true);
        text += ", ";
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
            text += ":" + formatInteger(oneAncient.level);
        }
        else
        {
            text += " (" + formatInteger(oneAncient.level) + ")";
        }
    }
    
    return text;
}

function unsummonedText()
{
    if(numberOfAncientsSummoned() == 0)
    {
        return "";
    }

    unsummonedNames = [];
    for (var key in ancientsMap) {
        if (ancientsMap.hasOwnProperty(key)
           && ancientsMap[key].showInUnsummoned) {
            unsummonedNames.push(ancientsMap[key].name);
        }
    }
    
    //unsummonedNames contains all ancient names now.

    for (var key in clDto.ancientMap) {
        var index = unsummonedNames.indexOf(key);
        if( index >= 0 )
        {
            unsummonedNames.splice(index,1);
        }
    }
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
            text += ":" + formatInteger(oneHero.numGilds) + ", ";
        }
        else
        {
            text += oneHero.name;
            text += " (" + formatInteger(oneHero.numGilds) + "), ";
        }
        
    });

    text = text.substring(0,text.length-2) + ";";

    return text;
}

function getTP()
{
    //3 is phan = tp boost
    //total ancientsouls
    var phanLevel = 0;
    clDto.ancientSouls.outsiders.forEach( function (oneOutsider) {
        if(oneOutsider.id==3)
        {
            phanLevel = oneOutsider.level;
        }
    });

    return 1 + 49*(1 - Math.pow(Math.E,(-0.0001*clDto.ancientSouls.totalAS))) + 50*(1 - Math.pow(Math.E,(-0.001*phanLevel)))
}

function miscText()
{
    text ="\n\n";
    text += headingStyle("Misc");

    text += "AS (" + clDto.ancientSouls.totalAS;
    if( outputFormatDto.outsiders.show ) {
        text += outputFormatDto.general.redditMarkDown ? " *+" : " +";
        if( clDto.misc.herosouls.sacrificed > 0 ) {
            var allHS = clDto.misc.herosouls.sacrificed + spentOnAncients() + clDto.misc.herosouls.rerollSpend;
            var allAS = Math.floor(5.0 * Math.log10(allHS));
            var deltaAS = allAS - clDto.ancientSouls.totalAS;
            text += deltaAS;
        }
        else {
            text += "0";
        }
        text += outputFormatDto.general.redditMarkDown ? "*" : "";
    }
    text += "); ";
    text += "TP (" + getTP().toFixed(2) + "%); ";

    text += "HS (" + formatInteger(clDto.misc.herosouls.current) + "; ";

    ancientSpend = spentOnAncients();

    if(outputFormatDto.general.minMiscSection)
    {
        text += "Spent on Ancients: ";
        text += formatInteger(ancientSpend) + "; ";
    }
    else
    {
        text += "Spent on Ancients/Rerolls: ";
        text += formatInteger(ancientSpend) + "/" + formatInteger(clDto.misc.herosouls.rerollSpend) + "; ";
    }

    text += "Total: " + formatInteger(ancientSpend + clDto.misc.herosouls.rerollSpend + clDto.misc.herosouls.current) + ") ";
    
    text += "Zone(Now HZE Best): ";
    text += formatInteger(clDto.misc.zones.current) + " ";
    text += formatInteger(clDto.misc.zones.hze) + " ";
    text += formatInteger(clDto.misc.zones.hzeEver) + "; ";
    text += "Ascensions: " + formatInteger(clDto.misc.ascensions) + "; ";

    if(outputFormatDto.general.minMiscSection)
    {
        text += "ID: " 
    }
    else
    {
        text += "Immortal Damage: " 
    }
    text += formatInteger(clDto.misc.immortalDamage) + "; ";

    if(!outputFormatDto.general.minMiscSection)
    {
        text += "Rubies: " + formatInteger(clDto.misc.rubies) + "; ";
        text += "Forge Cores: " + formatInteger(clDto.relics.forgeCores) + "; ";
        text += "Total Relics Found: " + formatInteger(clDto.relics.totalRelicsReceived) + "; ";
        text += "Achievements: " + Math.floor(clDto.misc.achievementCount/numberOfAchievementsPossible*100) +"%; ";
//        text += "Lifetime Achievements: " + Math.floor(clDto.misc.lifetimeAchievementCount/numberOfAchievementsPossible*100) +"%; ";
    }

    return text;
}

function spentOnAncients() {
    
    var ancientSpend = 0;
    for (var key in clDto.ancientMap) {
        if(clDto.ancientMap.hasOwnProperty(key))
            ancientSpend += clDto.ancientMap[key].spentHeroSouls;
    }
    return ancientSpend;
}


function timeText() {
    text = "\n\n";
    text += headingStyle("Time");

    currentTime = new Date().getTime();
    timeSinceCreation = +currentTime - +clDto.misc.time.creation;
    timeSinceTranscension = +currentTime - +clDto.misc.time.transcension;
    timeSinceAscension = +currentTime - +clDto.misc.time.ascension;

    
    text += "Since Start: " + formatElapsedTime(timeSinceCreation, true) + "; ";

    if(clDto.misc.time.transcension > 0)
    {
        text += "Since Transcension: " + formatElapsedTime(timeSinceTranscension, true) + "; ";
    }
    if(clDto.misc.time.ascension > 0)
    {
        text += "Since Ascension: " + formatElapsedTime(timeSinceAscension, false) + "; ";
    }

    return text;
}

function vsIdleText() {
    siyaName = ancientsMap[5].name;
    argName = ancientsMap[28].name;
    morgName = ancientsMap[16].name;
    libName = ancientsMap[4].name;
    mamName = ancientsMap[8].name;
    mimName = ancientsMap[9].name;
    soloName = ancientsMap[3].name;

    if(!clDto.ancientMap.hasOwnProperty(siyaName)) {
        return "";
    }

    text = "\n\n";
    text += headingStyle("Vs. Idle") + "[Calculator](http://alexbonjour.github.io/rules-of-thumb)";


    siyaLevel = clDto.ancientMap[siyaName].level;

    text += "\n\n" + "Ancient | Level | &#8710; % | &#8710; Levels" + "\n";
    text += "---|---|---|---" + "\n";
    
    text += deltaLine(siyaLevel, "**"+siyaName+"**", clDto.ancientMap[siyaName].level);
    text += deltaLine(siyaLevel, argName, clDto.ancientMap.hasOwnProperty(argName) ? clDto.ancientMap[argName].level : 0);
    text += deltaLine(idle_or_hybrid_morg_calc(siyaLevel), morgName, clDto.ancientMap.hasOwnProperty(morgName) ? clDto.ancientMap[morgName].level : 0);
    text += deltaLine(gold_calc(siyaLevel), libName, clDto.ancientMap.hasOwnProperty(libName) ? clDto.ancientMap[libName].level : 0);
    text += deltaLine(gold_calc(siyaLevel), mamName, clDto.ancientMap.hasOwnProperty(mamName) ? clDto.ancientMap[mamName].level : 0);
    text += deltaLine(gold_calc(siyaLevel), mimName, clDto.ancientMap.hasOwnProperty(mimName) ? clDto.ancientMap[mimName].level : 0);
    text += deltaLine(idle_solomon_calc(siyaLevel), soloName, clDto.ancientMap.hasOwnProperty(soloName) ? clDto.ancientMap[soloName].level : 0);

    return text;
}

function vsHybridText() {
    siyaName = ancientsMap[5].name;
    argName = ancientsMap[28].name;
    morgName = ancientsMap[16].name;
    libName = ancientsMap[4].name;
    mamName = ancientsMap[8].name;
    mimName = ancientsMap[9].name;
    soloName = ancientsMap[3].name;
    bhaalName = ancientsMap[15].name;
    fragName = ancientsMap[19].name;
    plutoName = ancientsMap[10].name;
    juggName = ancientsMap[29].name;

    if(!clDto.ancientMap.hasOwnProperty(siyaName)) {
        return "";
    }

    text = "\n\n";
    text += headingStyle("Vs. Hybrid") + "[Calculator](http://alexbonjour.github.io/rules-of-thumb)";


    siyaLevel = clDto.ancientMap[siyaName].level;

    text += "\n\n" + "Ancient | Level | &#8710; % | &#8710; Levels" + "\n";
    text += "---|---|---|---" + "\n";
    
    text += deltaLine(siyaLevel, "**"+siyaName+"**", clDto.ancientMap[siyaName].level);
    text += deltaLine(siyaLevel, argName, clDto.ancientMap.hasOwnProperty(argName) ? clDto.ancientMap[argName].level : 0);
    text += deltaLine(idle_or_hybrid_morg_calc(siyaLevel), morgName, clDto.ancientMap.hasOwnProperty(morgName) ? clDto.ancientMap[morgName].level : 0);
    text += deltaLine(gold_calc(siyaLevel), libName, clDto.ancientMap.hasOwnProperty(libName) ? clDto.ancientMap[libName].level : 0);
    text += deltaLine(gold_calc(siyaLevel), mamName, clDto.ancientMap.hasOwnProperty(mamName) ? clDto.ancientMap[mamName].level : 0);
    text += deltaLine(gold_calc(siyaLevel), mimName, clDto.ancientMap.hasOwnProperty(mimName) ? clDto.ancientMap[mimName].level : 0);
    text += deltaLine(hybrid_solomon_calc(siyaLevel), soloName, clDto.ancientMap.hasOwnProperty(soloName) ? clDto.ancientMap[soloName].level : 0);
    text += deltaLine(hybrid_click_calc(siyaLevel), bhaalName, clDto.ancientMap.hasOwnProperty(bhaalName) ? clDto.ancientMap[bhaalName].level : 0);
    text += deltaLine(hybrid_click_calc(siyaLevel), fragName, clDto.ancientMap.hasOwnProperty(fragName) ? clDto.ancientMap[fragName].level : 0);
    text += deltaLine(hybrid_click_calc(siyaLevel), plutoName, clDto.ancientMap.hasOwnProperty(plutoName) ? clDto.ancientMap[plutoName].level : 0);
    text += deltaLine(hybrid_jugg_calc(siyaLevel), juggName, clDto.ancientMap.hasOwnProperty(juggName) ? clDto.ancientMap[juggName].level : 0);
    
    return text;
}

function vsActiveText() {
    fragName = ancientsMap[19].name;
    argName = ancientsMap[28].name;
    bhaalName = ancientsMap[15].name;
    juggName = ancientsMap[29].name;
    mamName = ancientsMap[8].name;
    mimName = ancientsMap[9].name;
    plutoName = ancientsMap[10].name;
    morgName = ancientsMap[16].name;
    soloName = ancientsMap[3].name;

    if(!clDto.ancientMap.hasOwnProperty(fragName)) {
        return "";
    }

    text = "\n\n";
    text += headingStyle("Vs. Active") + "[Calculator](http://alexbonjour.github.io/rules-of-thumb)";


    fragLevel = clDto.ancientMap[fragName].level;

    text += "\n\n" + "Ancient | Level | &#8710; % | &#8710; Levels" + "\n";
    text += "---|---|---|---" + "\n";
    
    text += deltaLine(fragLevel, "**"+fragName+"**", clDto.ancientMap[fragName].level);
    text += deltaLine(fragLevel, argName, clDto.ancientMap.hasOwnProperty(argName) ? clDto.ancientMap[argName].level : 0);
    text += deltaLine(active_bhaal_calc(fragLevel), bhaalName, clDto.ancientMap.hasOwnProperty(bhaalName) ? clDto.ancientMap[bhaalName].level : 0);
    text += deltaLine(active_jugg_calc(fragLevel), juggName, clDto.ancientMap.hasOwnProperty(juggName) ? clDto.ancientMap[juggName].level : 0);
    text += deltaLine(gold_calc(fragLevel), mamName, clDto.ancientMap.hasOwnProperty(mamName) ? clDto.ancientMap[mamName].level : 0);
    text += deltaLine(gold_calc(fragLevel), mimName, clDto.ancientMap.hasOwnProperty(mimName) ? clDto.ancientMap[mimName].level : 0);
    text += deltaLine(gold_calc(fragLevel), plutoName, clDto.ancientMap.hasOwnProperty(plutoName) ? clDto.ancientMap[plutoName].level : 0);
    text += deltaLine(active_morg_calc(fragLevel), morgName, clDto.ancientMap.hasOwnProperty(morgName) ? clDto.ancientMap[morgName].level : 0);
    text += deltaLine(active_solomon_calc(fragLevel), soloName, clDto.ancientMap.hasOwnProperty(soloName) ? clDto.ancientMap[soloName].level : 0);

    return text;
}

function deltaLine(targetValue, ancientName, ancientLevel) {

    text = "";

    deltaLevels = ancientLevel - targetValue;
    deltaLevelsString = (deltaLevels >=0 ? "+" : "" ) + formatInteger(deltaLevels);
    deltaPercent = deltaLevels/targetValue*100;
    deltaPercentString = (deltaPercent>=0 ? "+" : "") + Math.floor(deltaPercent) + "%";
    text += ancientName + " | " + formatInteger(ancientLevel) + " | " + deltaPercentString + " | " + deltaLevelsString + "\n";

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
        text += "Lvl " + oneRelic.level.toFixed(2) + ", ";

        oneRelic.bonus.forEach(function (oneBonus) {
            text += "+" + oneBonus.levels.toFixed(2) + " ";
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
            text += "+" + oneBonus.level.toFixed(2) + " ";
            text += outputFormatDto.ancients.shortNames ? ability.ancient.substring(0,4) : ability.ancient;
            text += " ";
        }        

        if(outputFormatDto.items.showRelicBonusAbilities)
        {
            var boost = effectPower(ability, oneBonus.level).toFixed(2);
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


    if(!isNaN(ability.upgradePerLevel))
    {
        return upgradeLevels * ability.upgradePerLevel;
    }

    if(ability.upgradePerLevel == "1.0formula")
    {
        var baseLevel = 0;
        if(clDto.ancientMap.hasOwnProperty(ability.ancient))
        {
            baseLevel = clDto.ancientMap[ability.ancient].level;
        }

        console.log(ability.ancient + " base:  " + formula10Bonus(ability.ancient, baseLevel));
        console.log(ability.ancient + " base+: " + formula10Bonus(ability.ancient, baseLevel + upgradeLevels));

        return formula10Bonus(ability.ancient, baseLevel + upgradeLevels) - formula10Bonus(ability.ancient, baseLevel);
    }


    if(ability.ancient == "Solomon")
    {
        var solomonLevel = 0;
        if(clDto.ancientMap.hasOwnProperty("Solomon"))
        {
            solomonLevel = clDto.ancientMap["Solomon"].level;
        }
                      
        return solomonBonus(solomonLevel + upgradeLevels) - solomonBonus(solomonLevel);
    }

    if(ability.ancient == "Siyalatas")
    {
        var siyaLevel = 0;
        if(clDto.ancientMap.hasOwnProperty("Siyalatas"))
        {
            siyaLevel = clDto.ancientMap["Siyalatas"].level;
        }

        return siyLibBonus(siyaLevel + upgradeLevels) - siyLibBonus(siyaLevel);
    }

    if(ability.ancient == "Libertas")
    {
        var libLevel = 0;
        if(clDto.ancientMap.hasOwnProperty("Libertas"))
        {
            libLevel = clDto.ancientMap["Libertas"].level;
        }

        return siyLibBonus(libLevel + upgradeLevels) - siyLibBonus(libLevel);
    }

    return 0;
}

function formula10Bonus(ancientName,level) {

    if(!formula10Parameters.hasOwnProperty(ancientName))
        return 0;

    return formula10Parameters[ancientName].a * (1.0 - Math.exp(-1.0*formula10Parameters[ancientName].c*level));
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

function formatInteger(number)
{
    return formatNumber(Math.round(number));
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


//java map.size();
function numberOfAncientsSummoned () {
    var count = 0;
    for (var key in clDto.ancientMap) {
        if (clDto.ancientMap.hasOwnProperty(key)) {
            count++;
        }
    }
    return count;
}
