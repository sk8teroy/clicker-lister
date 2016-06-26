// some gui glue code.

function loadOutputFormatFromGui()
{
    outputFormatDto = {};
    outputFormatDto.general = {};
    outputFormatDto.general.redditMarkDown =  $("#redditMarkDown").is(':checked');
    outputFormatDto.general.maxLineLength250 = $("#maxLineLength250").is(':checked');
    outputFormatDto.general.minMiscSection = $("#minMiscSection").is(':checked');
    outputFormatDto.general.numberFormat = $("#numberFormat option:selected").val();

    outputFormatDto.vs = {};
    outputFormatDto.vs.idle =  $("#vsIdleRot").is(':checked');
    outputFormatDto.vs.hybrid =  $("#vsHybridRot").is(':checked');
    outputFormatDto.vs.active =  $("#vsActiveRot").is(':checked');

    outputFormatDto.heroes = {};
    outputFormatDto.heroes.shortNames =  $("#heroShortNames").is(':checked');

    outputFormatDto.items = {};
    outputFormatDto.items.showRelicBonusAncients = $("#showRelicBonusAncients").is(':checked'); 
    outputFormatDto.items.showRelicBonusAbilities = $("#showRelicBonusAbilities").is(':checked'); 
    outputFormatDto.items.showRelics = $("#showRelics").is(':checked'); 

    outputFormatDto.ancients= {};
    outputFormatDto.ancients.shortNames = $("#ancientShortNames").is(':checked'); 
    outputFormatDto.ancients.ancientSortOrder = $("#ancientSortOrder option:selected").val();  
    outputFormatDto.ancients.showUnsummonedAncients = $("#showUnsummonedAncients").is(':checked'); 
}

function calc(){

    var myData = decryptSave(input.value);

    // console.log("**********************************************************************");
    // console.log(myData);
    // console.log("**********************************************************************");
//    console.log("**********************************************************************");
//    console.log(JSON.stringify(myData));
//    console.log("**********************************************************************");
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
        $("#maxLineLength250").prop('checked', false);
        $("#minMiscSection").prop('checked', false);
        $('#numberFormat option[value="Comma"]').prop('selected', true);
        $("#heroShortNames").prop('checked', false);
        $("#showRelicBonusAncients").prop('checked', true);
        $("#showRelicBonusAbilities").prop('checked', false); //turn off for beta because calcs are off
        $("#showRelics").prop('checked', false);
        $("#ancientShortNames").prop('checked', false);
        $('#ancientSortOrder option[value="Descending"]').prop('selected', true);
        $("#showUnsummonedAncients").prop('checked', true);
    }
    else if(fCurrentStyle=="kong")
    {
        $("#customOutputOptions").hide();

        $("#redditMarkDown").prop('checked', false);
        $("#maxLineLength250").prop('checked', true);
        $("#minMiscSection").prop('checked', true);
        $('#numberFormat option[value="JustNumbers"]').prop('selected', true);
        $("#heroShortNames").prop('checked', true);
        $("#showRelicBonusAncients").prop('checked', true);
        $("#showRelicBonusAbilities").prop('checked', false);
        $("#showRelics").prop('checked', false);
        $("#ancientShortNames").prop('checked', true);
        $('#ancientSortOrder option[value="Descending"]').prop('selected', true);
        $("#showUnsummonedAncients").prop('checked', false);

        // vs options now top level, not part of reddit vs. kong styles
        // $("#vsIdleRot").prop('checked', false);
        // $("#vsHybridRot").prop('checked', false);
        // $("#vsActiveRot").prop('checked', false);
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

