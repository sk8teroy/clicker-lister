
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
    // {"general":{"boldHeadings":true,
    //             "numberFormat":"Comma"},
    //  "heroes":{"shortNames":false},
    //  "items":{"showAbilities":true,
    //           "showRelics":false},
    //  "ancients":{"shortNames":false,
    //              "ancientSortOrder":"Descending",
    //              "separateMaxedAncients":true,
    //              "groupAncientsByLevel":false,
    //              "showUnsummonedAncients":true}}
    
    
    //cldto
    // {"misc":{"rubies":125,
    //          "immortalDamage":2732096,
    //          "ascensions":85,
    //          "achievementCount":107,
    //          "herosouls":{"current":901514,
    //                       "rerollSpend":9118},
    //          "zones":{"hze":1694,
    //                   "current":1082}},
    //  "gildedHeroes":[{"id":30,"name":"Phthalo","numGilds":160}],
    //  "ancients":[{"id":3,"name":"Solomon","level":635,"spentHeroSouls":4072518},
    //              {"id":4,"name":"Libertas","level":742,"spentHeroSouls":275656},
    //              {"id":5,"name":"Siyalatas","level":800,"spentHeroSouls":320400},
    //              {"id":8,"name":"Mammon","level":742,"spentHeroSouls":275660},
    //              {"id":9,"name":"Mimzee","level":742,"spentHeroSouls":275722},
    //              {"id":11,"name":"Dogcog","level":25,"spentHeroSouls":1124},
    //              {"id":12,"name":"Fortuna","level":40,"spentHeroSouls":835},
    //              {"id":13,"name":"Atman","level":25,"spentHeroSouls":1562},
    //              {"id":14,"name":"Dora","level":50,"spentHeroSouls":1774},
    //              {"id":16,"name":"Morgulis","level":542539,"spentHeroSouls":544238},
    //              {"id":17,"name":"Chronos","level":71,"spentHeroSouls":19490},
    //              {"id":18,"name":"Bubos","level":25,"spentHeroSouls":359},
    //              {"id":21,"name":"Kumawakamaru","level":5,"spentHeroSouls":142},
    //              {"id":28,"name":"Argaiv","level":800,"spentHeroSouls":321599},
    //              {"id":30,"name":"Iris","level":363,"spentHeroSouls":1011081},
    //              {"id":31,"name":"Revolc","level":15,"spentHeroSouls":17149}],
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
    
    //ancient text
    text += headingStyle("Ancients");
    clDto.ancients.forEach( function (elem) {
        text += elem.name + " (" + elem.level + "); ";
    });
    return text;
}

function headingStyle(headingText)
{
    return outputFormatDto.general.boldHeadings ? "**" + headingText + "**: " : headingText + ": ";
}
