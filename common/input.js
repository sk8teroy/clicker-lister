
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
    clDto.misc.rubies = rubies ? +rubies[0] : 0;
    
    var titanDamage = jsonPath(data, '$..titanDamage');
    clDto.misc.immortalDamage = titanDamage ? +titanDamage[0] : 0;
    
    var numWorldResets = jsonPath(data, '$..numWorldResets');
    clDto.misc.ascensions = numWorldResets ? +numWorldResets[0] : 0;

    var achievements = jsonPath(data, '$..achievements[*]');
    clDto.misc.achievementCount = achievements ? achievements.length : 0;

    var lifetimeAchievements = jsonPath(data, '$..lifetimeAchievements[*]');
    clDto.misc.lifetimeAchievementCount = lifetimeAchievements ? lifetimeAchievements.length : clDto.misc.achievementCount;

    clDto.misc.time = {};
    var creationTime = jsonPath(data, '$..creationTimestamp');
    clDto.misc.time.creation = creationTime ? creationTime[0] : 0;
    
    var ascensionTime = jsonPath(data, '$..startTimestamp');
    clDto.misc.time.ascension = ascensionTime ? ascensionTime[0] : 0;

    var transcensionTime = jsonPath(data, '$..transcensionTimestamp');
    clDto.misc.time.transcension = transcensionTime ? transcensionTime[0] : 0;

    //Ancient Souls - outsiders, etc.
    clDto.ancientSouls = {};
    var currentAncientSouls = jsonPath(data, '$..ancientSouls');
    clDto.ancientSouls.currentAS = currentAncientSouls ? currentAncientSouls[0] : 0;

    var totalAncientSouls = jsonPath(data, '$..ancientSoulsTotal');
    clDto.ancientSouls.totalAS = totalAncientSouls ? totalAncientSouls[0] : 0;

    clDto.ancientSouls.outsiders = [];

    var outsidersInSaveFile = jsonPath(data, '$..outsiders.outsiders');
    if(outsidersInSaveFile) {
        
        $.each(data.outsiders.outsiders, function() {
            if(this.level > 0)
            {
                var oneOutsider = {};
                oneOutsider.id = this.id;
                oneOutsider.name = outsidersMap[this.id].name;
                oneOutsider.level = this.level;
                clDto.ancientSouls.outsiders.push(oneOutsider);
            }
        });
    }
    

    //misc.herosouls
    clDto.misc.herosouls = {};

    var current = jsonPath(data, '$..heroSouls');
    clDto.misc.herosouls.current = current ? +current[0] : 0;
    
    var rerollSpend = jsonPath(data, '$..ancients.rerollSoulsSpent');
    clDto.misc.herosouls.rerollSpend = rerollSpend ? +rerollSpend[0] : 0;

    //misc.zones
    clDto.misc.zones = {};
    
    var highestFinishedZonePersist  = jsonPath(data, '$..highestFinishedZonePersist');
    clDto.misc.zones.hze = highestFinishedZonePersist ? highestFinishedZonePersist[0] : 0;

    var currentZoneHeight  = jsonPath(data, '$..currentZoneHeight');
    clDto.misc.zones.current = currentZoneHeight ? currentZoneHeight[0] : 1;
    

    // //heroes - name, #gilds (only added if gilded)
    clDto.gildedHeroes = [];
    $.each(data.heroCollection.heroes, function() {
        if( this.epicLevel > 0 )
        {
            var hero = {};
            hero.id = this.id;
            hero.name = heroesMap[hero.id].name;
            hero.numGilds = +this.epicLevel;
            clDto.gildedHeroes.push(hero);
        }
    });

    //ancients + Level
    //ancientMap, key = name
    clDto.ancientMap = {};
    $.each(data.ancients.ancients, function() {
        var ancient = {};
        ancient.id = this.id;
        ancient.name = ancientsMap[this.id] ? ancientsMap[this.id].name : "ERROR";
        ancient.level = +this.level;
        ancient.spentHeroSouls = +this.spentHeroSouls;

        clDto.ancientMap[ancient.name] = ancient;
    });

    //relics
    clDto.relics = {};

    var salvagePoints = jsonPath(data, '$..salvagePoints');
    clDto.relics.forgeCores = salvagePoints ? salvagePoints[0] : 0;

    var totalRelicsReceived = jsonPath(data, '$..totalRelicsReceived');
    clDto.relics.totalRelicsReceived = totalRelicsReceived ? totalRelicsReceived[0] : 0;


    clDto.relics.equipped = [];
    var slots = jsonPath(data, '$..items.slots');
    var items = jsonPath(data, '$..items.items');
    if(slots&&items)
    {
        relicsInSlots1to4 = [];
        for(i=1; i<=4; i++)
        {
            if(slots[0].hasOwnProperty(i))
            {
                relicsInSlots1to4.push(items[0][slots[0][i]]);
            }
        }

        relicsInSlots1to4.forEach( function(v) {
            var oneRelic = {};
            oneRelic.name = v.name;
            oneRelic.rarity = rarityMap[v.rarity];
            oneRelic.level = v.level;
            
            oneRelic.bonus = [];
            
            if(v.bonusType1 > 0)
            {
                var bonusOne = {};
                bonusOne.abilityId = v.bonusType1;
                bonusOne.levels = +v.bonus1Level;
                oneRelic.bonus.push(bonusOne);
            }
            if(v.bonusType2 > 0)
            {
                var bonusTwo = {};
                bonusTwo.abilityId = v.bonusType2;
                bonusTwo.levels = +v.bonus2Level;
                oneRelic.bonus.push(bonusTwo);
            }
            if(v.bonusType3 > 0)
            {
                var bonusThree = {};
                bonusThree.abilityId = v.bonusType3;
                bonusThree.levels = +v.bonus3Level;
                oneRelic.bonus.push(bonusThree);
            }
            if(v.bonusType4 > 0)
            {
                var bonusFour = {};
                bonusFour.abilityId = v.bonusType4;
                bonusFour.levels = +v.bonus4Level;
                oneRelic.bonus.push(bonusFour);
            }
 
            clDto.relics.equipped.push(oneRelic);
        });
    }
}
