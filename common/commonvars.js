/*
	==================================================
	This file contains variables that multiple tools
	may want to access. Not all of them are in use,
	at some point there'll be some cleanup done.
	==================================================
*/

var numberOfAchievementsPossible=149; //counted 2/28/2016 in Steam.

var outsidersMap = {
    1:{name:"Xyliqil"},
    2:{name:"Chor'gorloth"},
    3:{name:"Phandoryss"},
    4:{name:"Borb"},
    5:{name:"Ponyboy"}};

// map from game id to object describing ancient.   Allows for game to change id scheme.
var ancientsMap = {
    3:{name:"Solomon"       ,maxLevel:"None"},
    4:{name:"Libertas"      ,maxLevel:"None"},
    5:{name:"Siyalatas"     ,maxLevel:"None"},
    6:{name:"Khrysos"       ,maxLevel:10},
    7:{name:"Thusia"        ,maxLevel:"None"},
    8:{name:"Mammon"        ,maxLevel:"None"},
    9:{name:"Mimzee"        ,maxLevel:"None"},
    10:{name:"Pluto"        ,maxLevel:"None"},
    11:{name:"Dogcog"       ,maxLevel:25},
    12:{name:"Fortuna"      ,maxLevel:40},
    13:{name:"Atman"        ,maxLevel:25},
    14:{name:"Dora"         ,maxLevel:50},
    15:{name:"Bhaal"        ,maxLevel:"None"},
    16:{name:"Morgulis"     ,maxLevel:"None"},
    17:{name:"Chronos"      ,maxLevel:"None"},
    18:{name:"Bubos"        ,maxLevel:25},
    19:{name:"Fragsworth"   ,maxLevel:"None"},
    20:{name:"Vaagur"       ,maxLevel:15},
    21:{name:"Kumawakamaru" ,maxLevel:5},
    22:{name:"Chawedo"      ,maxLevel:30},
    23:{name:"Hecatoncheir" ,maxLevel:30},
    24:{name:"Berserker"    ,maxLevel:30},
    25:{name:"Sniperino"    ,maxLevel:30},
    26:{name:"Kleptos"      ,maxLevel:30},
    27:{name:"Energon"      ,maxLevel:30},
    28:{name:"Argaiv"       ,maxLevel:"None"},
    29:{name:"Juggernaut"   ,maxLevel:"None"},
    30:{name:"Iris"         ,maxLevel:"None"},
    31:{name:"Revolc"       ,maxLevel:15}
};

var abilitiesMap = {
    1:{  "id":1  ,"name":"Abandonment"  ,"ancient":"Siyalatas"    ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% Idle DPS"              ,"sortOrder":70},
    2:{  "id":2  ,"name":"Wrath"        ,"ancient":"Fragsworth"   ,"upgradePerLevel":20    ,"effectDescription":"+%1% Click Damage"          ,"sortOrder":71},
    3:{  "id":3  ,"name":"Time"         ,"ancient":"Chronos"      ,"upgradePerLevel":5     ,"effectDescription":"+%1s Boss timers"           ,"sortOrder":72},
    4:{  "id":4  ,"name":"Agitation"    ,"ancient":"Chawedo"      ,"upgradePerLevel":2     ,"effectDescription":"+%1s Clickstorm"            ,"sortOrder":40},
    5:{  "id":5  ,"name":"Luck"         ,"ancient":"Revolc"       ,"upgradePerLevel":1     ,"effectDescription":"+%1% Double Rubies Chance"  ,"sortOrder":6},
    6:{  "id":6  ,"name":"Vision"       ,"ancient":"Iris"         ,"upgradePerLevel":1     ,"effectDescription":"+%1 Starting Zone"          ,"sortOrder":73}, //out in 1.0
    7:{  "id":7  ,"name":"Enhancement"  ,"ancient":"Argaiv"       ,"upgradePerLevel":2     ,"effectDescription":"+%1% Gild Damage"           ,"sortOrder":74},
    8:{  "id":8  ,"name":"Battery Life" ,"ancient":"Energon"      ,"upgradePerLevel":2     ,"effectDescription":"+%1s Metal Detector"        ,"sortOrder":41},
    9:{  "id":9  ,"name":"Thieves"      ,"ancient":"Kleptos"      ,"upgradePerLevel":2     ,"effectDescription":"+%1s Golden Clicks"         ,"sortOrder":42},
    10:{ "id":10 ,"name":"Accuracy"     ,"ancient":"Sniperino"    ,"upgradePerLevel":2     ,"effectDescription":"+%1s Lucky Strikes"         ,"sortOrder":43},
    11:{ "id":11 ,"name":"Rage"         ,"ancient":"Berserker"    ,"upgradePerLevel":2     ,"effectDescription":"+%1s Powersurge"            ,"sortOrder":44},
    12:{ "id":12 ,"name":"Wallops"      ,"ancient":"Hecatoncheir" ,"upgradePerLevel":2     ,"effectDescription":"+%1s Super Clicks"          ,"sortOrder":45},
    13:{ "id":13 ,"name":"Diseases"     ,"ancient":"Bubos"        ,"upgradePerLevel":2     ,"effectDescription":"-%1% Boss Life"             ,"sortOrder":12},
    14:{ "id":14 ,"name":"Death"        ,"ancient":"Morgulis"     ,"upgradePerLevel":11    ,"effectDescription":"+%1% Hero Soul DPS"         ,"sortOrder":75},
    15:{ "id":15 ,"name":"Murder"       ,"ancient":"Bhaal"        ,"upgradePerLevel":15    ,"effectDescription":"+%1% Critical Click Damage" ,"sortOrder":76},
    16:{ "id":16 ,"name":"Discovery"    ,"ancient":"Dora"         ,"upgradePerLevel":20    ,"effectDescription":"+%1% Treasure Chests"       ,"sortOrder":10},
    17:{ "id":17 ,"name":"Souls"        ,"ancient":"Atman"        ,"upgradePerLevel":1     ,"effectDescription":"+%1% Primal Boss Chance"    ,"sortOrder":2},
    18:{ "id":18 ,"name":"Chance"       ,"ancient":"Fortuna"      ,"upgradePerLevel":0.25  ,"effectDescription":"+%1% 10x Gold Chance"       ,"sortOrder":8},
    19:{ "id":19 ,"name":"Thrift"       ,"ancient":"Dogcog"       ,"upgradePerLevel":2     ,"effectDescription":"-%1% Hero Cost"             ,"sortOrder":4},
    20:{ "id":20 ,"name":"Wealth"       ,"ancient":"Pluto"        ,"upgradePerLevel":30    ,"effectDescription":"+%1% Golden Clicks Gold"    ,"sortOrder":77},
    21:{ "id":21 ,"name":"Riches"       ,"ancient":"Mimzee"       ,"upgradePerLevel":50    ,"effectDescription":"+%1% Treasure Chest Gold"   ,"sortOrder":78},
    22:{ "id":22 ,"name":"Greed"        ,"ancient":"Mammon"       ,"upgradePerLevel":5     ,"effectDescription":"+%1% Gold Dropped"          ,"sortOrder":79},
    24:{ "id":24 ,"name":"Freedom"      ,"ancient":"Libertas"     ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% Idle Gold"             ,"sortOrder":80},
    25:{ "id":25 ,"name":"Wisdom"       ,"ancient":"Solomon"      ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% Primal Hero Souls"     ,"sortOrder":81},
    26:{ "id":26 ,"name":"Momentum"     ,"ancient":"Juggernaut"   ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% ????"                  ,"sortOrder":82}, 
    27:{ "id":27 ,"name":"Shadows"      ,"ancient":"Kumawakamaru" ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% ????"                  ,"sortOrder":83},
    28:{ "id":28 ,"name":"Impatience"   ,"ancient":"Vaagur"       ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% ????"                  ,"sortOrder":84},
//following lines allow more relic abilities without breaking the clicker lister.   They are non-functional in 1.0
    29:{ "id":29 ,"name":"???"       ,"ancient":"???"      ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% ????"     ,"sortOrder":85},
    30:{ "id":30 ,"name":"???"       ,"ancient":"???"      ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% ????"     ,"sortOrder":86},
    31:{ "id":31 ,"name":"???"       ,"ancient":"???"      ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% ????"     ,"sortOrder":87},
    32:{ "id":32 ,"name":"???"       ,"ancient":"???"      ,"upgradePerLevel":"n/a" ,"effectDescription":"+%1% ????"     ,"sortOrder":88}
};


var heroesMap = {  //game-id:info about hereos
    1:{name: "Cid", cost: 5, damage: 0, level: 0, upgradeCosts: [100, 250, 1e3, 8e3, 80e3, 400e3, 4e6]/*,upgradeIDs:[,,,,]*/}, 
    2:{name: "Treebeast", cost: 50, damage: 5, level: 0, upgradeCosts: [500, 1.25e3, 5e3, 40e3, 400e3],upgradeIDs:[17,18,19,20,103]},
    // 1:17 2:18 3:19 4:20, 5:103
    3:{name: "Ivan", cost: 250, damage: 22, level: 0, upgradeCosts: [2.5e3, 6.25e3, 25e3, 200e3, 2e6, 10e6], upgradeIDs:[21,22,23,108,100,24]},
    // 1:21 2:22 3:23 4:108 5:100 6:24
    4:{name: "Brittany", cost: 1000, damage: 74, level: 0, upgradeCosts: [10e3, 25e3, 100e3, 800e3], upgradeIDs:[13,14,15,16]},
    // 1:13 2:14 3:15 4:16sss
    5:{name: "Fisherman", cost: 4000, damage: 245, level: 0, upgradeCosts: [40e3, 100e3, 400e3, 3.2e6, 32e6], upgradeIDs:[9,10,11,12,101]},
    // 1:9 2:10 3:11 4:12 5:101
    6:{name: "Betty", cost: 20000, damage: 976, level: 0, upgradeCosts: [200e3, 500e3, 2e6, 16e6, 160e6], upgradeIDs:[25,26,27,28,102]},
    // 1:25 2:26 3:27 4:28 5:102
    7:{name: "Samurai", cost: 100e3, damage: 3725, level: 0, upgradeCosts: [1e6, 2.5e6, 10e6, 80e6], upgradeIDs:[29,30,31,32]},
    // Guesses 1:29 2:30 3:31 4:32:confirmed
    8:{name: "Leon", cost: 400e3, damage: 10859, level: 0, upgradeCosts: [4e6, 10e6, 40e6, 320e6], upgradeIDs:[33,34,35,36]},
    // Guesses 1:33 2:34 (3:35 4:36):confirmed
    9:{name: "Seer", cost: 2500e3, damage: 47143, level: 0, upgradeCosts: [25e6, 62.5e6, 250e6, 2e9], upgradeIDs:[37,38,39,40]},
    // Guesses 1:37 2:38 3:39 4:40
    10:{name: "Alexa", cost: 15000e3, damage: 186e3, level: 0, upgradeCosts: [150e6, 375e6, 1.5e9, 12e9, 120e9], upgradeIDs:[41,42,43,44,109]},
    // Guesses 1:41 2:42 3:43 (4:44 5:109):confirmed
    11:{name: "Natalia", cost: 100e6, damage: 782e3, level: 0, upgradeCosts: [1e9, 2.5e9, 10e9, 80e9], upgradeIDs:[45,46,47,48]},
    // Guesses 1:45 2:46 3:47 4:48
    12:{name: "Mercedes", cost: 800e6, damage: 3721e3, level: 0, upgradeCosts: [8e9, 20e9, 80e9, 640e9, 6.4e12], upgradeIDs:[49,50,51,52,104]},
    // Guesses 1:49 2:50 3:51 4:52 5:104
    13:{name: "Bobby", cost: 6500e6, damage: 17010e3, level: 0, upgradeCosts: [65e9, 162e9, 650e9, 5.2e12, 52e12], upgradeIDs:[53,54,55,56,116]},
    // Guesses 1:53 2:54 3:55 4:56 5:116
    14:{name: "Broyle", cost: 50e9, damage: 69480e3, level: 0, upgradeCosts: [500e9, 1.25e12, 5e12, 40e12, 400e12], upgradeIDs:[57,58,59,60,110]},
    // Guesses 1:57? 2:58 3:59 4:60 5:110
    15:{name: "Sir George", cost: 450e9, damage: 460e6, level: 0, upgradeCosts: [4.5e12, 11.25e12, 45e12, 360e12, 3.6e15], upgradeIDs:[61,62,63,64,105]},
    // Guesses 1:61 2:62 3:63 4:64 5:105
    16:{name: "Midas", cost: 4e12, damage: 3017e6, level: 0, upgradeCosts: [40e12, 100e12, 400e12, 3.2e15, 32e15, 160e15], upgradeIDs:[65,66,67,68,111]},
    // Guesses 1:65 2:66 3:67 4:68 5:111
    17:{name: "Referi", cost: 36e12, damage: 20009e6, level: 0, upgradeCosts: [360e12, 900e12, 3.6e15, 28.8e15, 288e15], upgradeIDs:[69,70,71,72,73]},
    // 5 1:69 2:70 3:71 4:72 5:73
    18:{name: "Abaddon", cost: 320e12, damage: 131e9, level: 0, upgradeCosts: [3.2e15, 8e15, 32e15, 256e15], upgradeIDs:[74,75,76,112]},
    //4 1:74 2:75 3:76 4:112
    19:{name: "Ma Zhu", cost: 2.7e15, damage: 814e9, level: 0, upgradeCosts: [27e15, 67.5e15, 270e15, 2.16e18], upgradeIDs:[77,78,79,80]},
    //4 1:77 2:78 3:79 4:80
    20:{name: "Amenhotep", cost: 24e15, damage: 5335e9, level: 0, upgradeCosts: [240e15, 600e15, 2.4e18 /*, 19.2e18*/], upgradeIDs:[82,83,84]},
    //3 1:81 2:82 3:83 4:106/132?
    21:{name: "Beastlord", cost: 300e15, damage: 49143e9, level: 0, upgradeCosts: [3e18, 7.5e18, 30e18, 240e18, 2.4e21], upgradeIDs:[84,85,86,87,113]},
    //5 1:84 2:85 3:86 4:87 5:113
    22:{name: "Athena", cost: 9e18, damage: 1086e12 , level: 0, upgradeCosts: [90e18, 225e18, 900e18, 0, 7.2e21], upgradeIDs:[88,89,90,91]},
    //4	1:88 2:89 3:90 4:91
    23:{name: "Aphrodite", cost: 350e18, damage: 31124e12, level: 0, upgradeCosts: [3.5e21, 8.75e21, 35e21, 0, 280e21, 2.8e24], upgradeIDs:[92,93,94,114,95]},
    //5 1:92 2:93 3:94 4:114 5:95
    24:{name: "Shinatobe", cost: 14e21, damage: 917e15, level: 0, upgradeCosts: [140e21, 350e21, 1.4e24, 11.2e24, 112e24], upgradeIDs:[96,97,98,99,115]},
    //5 1:96 2:97 3:98 4:99 5:115
    25:{name: "Grant", cost: 4199e21, damage: 202e18, level: 0, upgradeCosts: [41.999e24, 104e24, 419e24, 3.359e27], upgradeIDs:[120,121,122,123]},
    //4 1:120 2:121 3:122 4:123
    26:{name: "Frostleaf", cost: 2100e24, damage: 74698e18, level: 0, upgradeCosts: [21e27, 52.499e27, 209e27, 1.679e30], upgradeIDs:[124,125,126,127]},
    //4 1:124 2:125 3:126 4:127
    27:{name: "Dread Knight", cost: 1e40, damage: 1.46e32, level: 0, upgradeCosts: [1e41, 2.5e41, 1e42, 0, 8e42], upgradeIDs:[133,134,135,136]},
    //4 1:133 2:134 3:135 4:136
    28:{name: "Atlas", cost: 1e55, damage: 1.075e45, level: 0, upgradeCosts: [1e56, 2.5e56, 1e57, 0, 8e57], upgradeIDs:[138,139,140,141]},
    //4 1:138 2:139 3:140 4:141
    29:{name: "Terra", cost: 1e70, damage: 7.926e57, level: 0, upgradeCosts: [1e71, 2.5e71, 1e72, 0, 8e72], upgradeIDs:[143,144,145,146]},
    //4 1:143 2:144 3:145 4:146
    30:{name: "Phthalo", cost: 1e85, damage: 5.839e70, level: 0, upgradeCosts: [1e86, 2.5e86, 1e87, 0, 8e87], upgradeIDs:[148,149,150,151]},
    //4 1:148 2:149 3:150 4:151
    31:{name: "Orntchya", cost: 1e100, damage: 3.302e83, level: 0, upgradeCosts: [1e101, 2.5e101, 1e102, 0, 8e102], upgradeIDs:[153,154,155,156]},
    //4 1:153 2:154 3:155 4:156
    32:{name: "Lilin", cost: 1e115, damage: 3.17e96, level: 0, upgradeCosts: [1e116, 2.5e116, 1e117, 0, 8e117], upgradeIDs:[158,159,160,161]},
    //4 1:158 2:159 3:160 4:161
    33:{name: "Cadmia", cost: 1e130, damage: 2.335e109, level: 0, upgradeCosts: [1e131, 2.5e131, 1e132, 0, 8e132], upgradeIDs:[163,164,165,166]},
    //4 1:163 2:164 3:165 4:166
    34:{name: "Alabaster", cost: 1e145, damage: 1.721e122, level: 0, upgradeCosts: [1e146, 2.5e146, 1e147, 0, 8e147], upgradeIDs:[168,169,170,171]},
    //4 1:168 2:169 3:170 4:171
    35:{name: "Astraea", cost: 1e160, damage: 1.268e135, level: 0, upgradeCosts: [1e161, 2.5e161, 1e162, 0, 8e162], upgradeIDs:[173,174,175,176]},
    //4 1:173 2:174 3:175 4:176
    36:{name: "Chiron", cost: 1e160, damage: 1.268e135, level: 0, upgradeCosts: [1e161, 2.5e161, 1e162, 0, 8e162], upgradeIDs:[173,174,175,176]},
    37:{name: "Moloch", cost: 1e160, damage: 1.268e135, level: 0, upgradeCosts: [1e161, 2.5e161, 1e162, 0, 8e162], upgradeIDs:[173,174,175,176]},
    38:{name: "Bomber Max", cost: 1e160, damage: 1.268e135, level: 0, upgradeCosts: [1e161, 2.5e161, 1e162, 0, 8e162], upgradeIDs:[173,174,175,176]},
    39:{name: "Gog", cost: 1e160, damage: 1.268e135, level: 0, upgradeCosts: [1e161, 2.5e161, 1e162, 0, 8e162], upgradeIDs:[173,174,175,176]},
    40:{name: "Wepwawet", cost: 1e160, damage: 1.268e135, level: 0, upgradeCosts: [1e161, 2.5e161, 1e162, 0, 8e162], upgradeIDs:[173,174,175,176]}
};

var rarityMap = {1:"Common",2:"Uncommon",3:"Rare",4:"Epic",5:"Fabled",6:"Mythical",7:"Legendary",8:"Transcendent"};

var outputFormatDto = {};
var clDto = {};

//Elements
var input = document.getElementById('input');
var output = document.getElementById('output');
var calcButton = document.getElementById('calcButton');

