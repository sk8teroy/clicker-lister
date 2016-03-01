
/*
    ==================================================
    Reads save data (passed in json format)
    and stores in clDto (Clicker Lister Data Transfer Object)
    ==================================================
*/
function readSaveData(data)
{
    clDto = {}; //reset

    //misc
    clDto.misc = {};
    var rubies = jsonPath(data, '$..rubies');
    clDto.misc.rubies = rubies ? rubies[0] : 0;
    
    var titanDamage = jsonPath(data, '$..titanDamage');
    clDto.misc.immortalDamage = titanDamage ? titanDamage[0] : 0;
    
    var numWorldResets = jsonPath(data, '$..numWorldResets');
    clDto.misc.ascensions = numWorldResets ? numWorldResets[0] : 0;

    var achievements = jsonPath(data, '$..achievements[*]');
    clDto.misc.achievementCount = achievements ? achievements.length : 0;

    //misc.herosouls
    clDto.misc.herosouls = {};

    var current = jsonPath(data, '$..heroSouls');
    clDto.misc.herosouls.current = current ? current[0] : 0;
    
    var rerollSpend = jsonPath(data, '$..ancients.rerollSoulsSpent');
    clDto.misc.herosouls.rerollSpend = rerollSpend ? rerollSpend[0] : 0;

    //misc.zones
    clDto.misc.zones = {};
    
    var highestFinishedZonePersist  = jsonPath(data, '$..highestFinishedZonePersist');
    clDto.misc.zones.hze = highestFinishedZonePersist ? highestFinishedZonePersist[0] : 0;

    var highestFinishedZone  = jsonPath(data, '$..highestFinishedZone');
    clDto.misc.zones.current = highestFinishedZone ? highestFinishedZone[0] +1 : 1;
    

    // //heroes - name, #gilds (only added if gilded)
    clDto.gildedHeroes = [];
    $.each(data.heroCollection.heroes, function() {
        if( this.epicLevel > 0 )
        {
            var hero = {};
            hero.id = this.id;
            hero.name = heroes[hero.id-1].name;
            hero.numGilds = this.epicLevel;
            clDto.gildedHeroes.push(hero);
        }
    });

    //ancients + Level
    clDto.ancients = [];
    $.each(data.ancients.ancients, function() {
        var ancient = {};
        ancient.id = this.id;
        ancient.name = ancientsMap[this.id] ? ancientsMap[this.id].name : "ERROR";
        ancient.level = this.level;
        ancient.spentHeroSouls = this.spentHeroSouls;
        
        clDto.ancients.push(ancient);
    });
   
    //relics
    clDto.relics = {};

    var salvagePoints = jsonPath(data, '$..salvagePoints');
    clDto.relics.forgeCores = salvagePoints ? salvagePoints[0] : 0;

    var totalRelicsReceived = jsonPath(data, '$..totalRelicsReceived');
    clDto.relics.totalRelicsReceived = totalRelicsReceived ? totalRelicsReceived[0] : 0;


/* TODO
 * relics -relic[1-4],
 * - name, rarity, level, relic-bonus[1-4]
 * - relic-bonus - ancient name, +levels, effect
 */


    
}
