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
 * Max: Ancients that are maxed
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

/* **draft - clicker hero data json**
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

/* **draft - output format json**
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

//Misc
var soulsSpent = 0;

//Lists
var ancientList = "Ancients: ";
var heroList = "Gilded heroes: ";
var itemList = "";
var miscList = "Misc Info: ";
var timeList = "";

function loadOutputFormatFromGui()
{
    outputFormatDto = {};
    outputFormatDto.general = {};
    outputFormatDto.general.redditMarkDown =  $("#redditMarkDown").is(':checked');
    // outputFormatDto.general.maxLineLength = 0;
    outputFormatDto.general.numberFormat = $("#numberFormat option:selected").val();
    outputFormatDto.heroes = {};
    outputFormatDto.heroes.shortNames =  $("#heroShortNames").is(':checked');
    outputFormatDto.items = {};
    outputFormatDto.items.showRelicBonusAncients = $("#showRelicBonusAncients").is(':checked'); 
    outputFormatDto.items.showRelicBonusAbilities = $("#showRelicBonusAbilities").is(':checked'); 
    outputFormatDto.items.showRelics = $("#showRelics").is(':checked'); 
    outputFormatDto.ancients= {};
    outputFormatDto.ancients.shortNames = $("#ancientShortNames").is(':checked'); 
    outputFormatDto.ancients.ancientSortOrder = $("#ancientSortOrder option:selected").val();  
    outputFormatDto.ancients.separateMaxedAncients = $("#separateMaxedAncients").is(':checked'); 
    outputFormatDto.ancients.showUnsummonedAncients = $("#showUnsummonedAncients").is(':checked'); 
}

function calc(){

    var myData = decryptSave(input.value);

    // console.log("**********************************************************************");
    // console.log(myData);
    // console.log("**********************************************************************");
    readSaveData(myData);
    loadOutputFormatFromGui();
    // console.log(JSON.stringify(outputFormatDto));
    // console.log(JSON.stringify(clDto));
    // console.log(outputFormatDto);
    // console.log(clDto);
    // console.log("**********************************************************************");

    
    output.value = getClickerListerText();
}

function updateOutputStyle(fCurrentStyle) {
    if(fCurrentStyle=="reddit")
    {
        $("#customOutputOptions").hide();

        $("#redditMarkDown").prop('checked', true);
        $('#numberFormat option[value="Comma"]').prop('selected', true);
        $("#heroShortNames").prop('checked', false);
        $("#showRelicBonusAncients").prop('checked', true);
        $("#showRelicBonusAbilities").prop('checked', true);
        $("#showRelics").prop('checked', false);
        $("#ancientShortNames").prop('checked', false);
        $('#ancientSortOrder option[value="Descending"]').prop('selected', true);
        $("#separateMaxedAncients").prop('checked', true);
        $("#showUnsummonedAncients").prop('checked', true);
    }
    else if(fCurrentStyle=="kong")
    {
        $("#customOutputOptions").hide();

        $("#redditMarkDown").prop('checked', false);
        $('#numberFormat option[value="Comma"]').prop('selected', true);
        $("#heroShortNames").prop('checked', true);
        $("#showRelicBonusAncients").prop('checked', true);
        $("#showRelicBonusAbilities").prop('checked', false);
        $("#showRelics").prop('checked', false);
        $("#ancientShortNames").prop('checked', true);
        $('#ancientSortOrder option[value="Descending"]').prop('selected', true);
        $("#separateMaxedAncients").prop('checked', false);
        $("#showUnsummonedAncients").prop('checked', false);
    }
    else //custom
    {
        $("#customOutputOptions").show();
    }
}


$(function(){
    //initialize output style options appropriately.
    $("#customOutputOptions").hide();
    updateOutputStyle( $("input:radio[name=outputStyle]").val());
    $("input:radio[name=outputStyle]").click(function() {
        updateOutputStyle($(this).val());
    });

    $("#calcButton").click(calc);
});

