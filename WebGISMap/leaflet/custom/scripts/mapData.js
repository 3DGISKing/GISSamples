		var mapExtent = [0.00000000, -4000.00000000, 4000.00000000, 0.00000000];
		var mapMinZoom = 2;
		var mapMaxZoom = 6;
		var mapMaxResolution = 0.25000000;
		var mapMinResolution = Math.pow(2, mapMaxZoom) * mapMaxResolution;
		var tileExtent = [0.00000000, -4000.00000000, 4000.00000000, 0.00000000];
		var maxBounds = [[0,0], [-4000,4000]];
		var crs = L.CRS.Simple;
			crs.transformation = new L.Transformation(1, -tileExtent[0], -1, tileExtent[3]);
			crs.scale = function(zoom) {
				return Math.pow(2, zoom) / mapMinResolution;
			};
			crs.zoom = function(scale) {
				return Math.log(scale * mapMinResolution) / Math.LN2;
			};

		var map = new L.Map('map', {
			renderer: L.canvas,
			maxZoom: mapMaxZoom,
			minZoom: mapMinZoom,
			layers: overlays,
			crs: crs,
			maxBounds: maxBounds,
			maxBoundsViscosity: 1,
			attributionControl:false,
			zoomControl:false
		});
			
			layer = L.tileLayer('https://www.conanexilesmap.com/data/images/map/{z}/{x}/{y}.png', {
			minZoom: mapMinZoom, maxZoom: mapMaxZoom,
			bounds: [[0,0], [-4000,4000]],
			tms: false
			
		}).addTo(map);

		map.fitBounds([
        crs.unproject(L.point(mapExtent[2], mapExtent[3])),
        crs.unproject(L.point(mapExtent[0], mapExtent[1]))
		]);

		//Coordinates Display (Bottom Left) - old
		L.control.mousePosition().addTo(map);
		  
		//Create Pet Groups
		var petMerchantGroup = L.layerGroup();
		var petHyenaGroup = L.layerGroup();
		var petOstrichGroup = L.layerGroup();
		var petSabretoothGroup = L.layerGroup();
		var petElephantGroup = L.layerGroup();
		var petTigerGroup = L.layerGroup();
		var petRhinoGroup = L.layerGroup();
		var petFawnGroup = L.layerGroup();
		var petCrocGroup = L.layerGroup();
		var petBoarGroup = L.layerGroup();
		var petWolfGroup = L.layerGroup();

		//Create Mineral Groups
		var ironGroup = L.layerGroup();
		var coalGroup = L.layerGroup();
		var brimstoneGroup = L.layerGroup();
		var crystalGroup = L.layerGroup();
		var silverGroup = L.layerGroup();
		var starmetalGroup = L.layerGroup();
		var blackiceGroup = L.layerGroup();
		var obsidianGroup = L.layerGroup();
		
		//Create Thrall Groups
		var alchemistGroup = L.layerGroup();
		var armorerGroup = L.layerGroup();
		var blacksmithGroup = L.layerGroup();
		var carpenterGroup = L.layerGroup();
		var cookGroup = L.layerGroup();
		var entertainerGroup = L.layerGroup();
		var priestGroup = L.layerGroup();
		var sherpaGroup = L.layerGroup();
		var smelterGroup = L.layerGroup();
		var tannerGroup = L.layerGroup();
		var taskmasterGroup = L.layerGroup();
		var randomThrallGroup = L.layerGroup();
		
		//Create Named Thrall Groups
		var namedArcherGroup = L.layerGroup();
		var namedAlchemistGroup = L.layerGroup();
		var namedArmorerGroup = L.layerGroup();
		var namedBlacksmithGroup = L.layerGroup();
		var namedCarpenterGroup = L.layerGroup();
		var namedCookGroup = L.layerGroup();
		var namedEntertainerGroup = L.layerGroup();
		var namedPriestGroup = L.layerGroup();
		var namedSherpaGroup = L.layerGroup();
		var namedSmelterGroup = L.layerGroup();
		var namedTannerGroup = L.layerGroup();
		var namedTaskmasterGroup = L.layerGroup();
		var namedFighterGroup = L.layerGroup();
		var namedRandomThrallGroup = L.layerGroup();

		
		//Create Location Groups
		var caveGroup = L.layerGroup();
		var dungeonGroup = L.layerGroup();
		var obeliskGroup = L.layerGroup();
		var ReligionGroup = L.layerGroup();
		var campGroup = L.layerGroup();
		var capitalGroup = L.layerGroup();
		var vistaGroup = L.layerGroup();
		var ruinsGroup = L.layerGroup();
		var bossGroup = L.layerGroup();
		var loreGroup = L.layerGroup();
		var treasureGroup = L.layerGroup();
		var recipeGroup = L.layerGroup();
		var emoteGroup = L.layerGroup();
		
		
		//Set the groups
		var overlays = {
			"Pets - Pet Merchant": petMerchantGroup,
			"Pets - Hyena": petHyenaGroup,
			"Pets - Ostrich": petOstrichGroup,
			"Pets - Sabretooth": petSabretoothGroup,
			"Pets - Elephant": petElephantGroup,
			"Pets - Tiger": petTigerGroup,
			"Pets - Rhino": petRhinoGroup,
			"Pets - Fawn": petFawnGroup,
			"Pets - Croc": petCrocGroup,
			"Pets - Boar": petBoarGroup,
			"Pets - Wolf": petWolfGroup,
			"Iron": ironGroup,
			"Coal": coalGroup,
			"Brimstone": brimstoneGroup,
			"Crystal": crystalGroup,
			"Silver": silverGroup,
			"Star Metal": starmetalGroup,
			"Black Ice": blackiceGroup,
			"Obsidian": obsidianGroup,
			"NPC - Religion Trainer": ReligionGroup,
			"Thrall - Alchemist": alchemistGroup,
			"Thrall - Armorer": armorerGroup,
			"Thrall - Bearer": sherpaGroup,
			"Thrall - Blacksmith": blacksmithGroup,
			"Thrall - Carpenter": carpenterGroup,
			"Thrall - Cook": cookGroup,
			"Thrall - Entertainer": entertainerGroup,
			"Thrall - Priest": priestGroup,
			"Thrall - Tanner": tannerGroup,
			"Thrall - Taskmaster": taskmasterGroup,
			"Thrall - Smelter": smelterGroup,
			"Named Thrall - Archer": namedArcherGroup,
			"Named Thrall - Alchemist": namedAlchemistGroup,
			"Named Thrall - Armorer": namedArmorerGroup,
			"Named Thrall - Bearer": namedSherpaGroup,
			"Named Thrall - Blacksmith": namedBlacksmithGroup,
			"Named Thrall - Carpenter": namedCarpenterGroup,
			"Named Thrall - Cook": namedCookGroup,
			"Named Thrall - Entertainer": namedEntertainerGroup,
			"Named Thrall - Fighter": namedFighterGroup,
			"Named Thrall - Priest": namedPriestGroup,
			"Named Thrall - Smelter": namedSmelterGroup,
			"Named Thrall - Tanner": namedTannerGroup,
			"Named Thrall - Taskmaster": namedTaskmasterGroup,			
			"Locations - Caves": caveGroup,
			"Locations - Obelisks": obeliskGroup,
			"Locations - Dungeons": dungeonGroup,
			"Locations - Camps": campGroup,
			"Locations - Capitals": capitalGroup,
			"Locations - Vistas": vistaGroup,
			"Locations - Ruins": ruinsGroup,
			"Locations - Bosses": bossGroup,
			"Locations - Lore": loreGroup,
			"Locations - Treasure": treasureGroup,
			"Locations - Recipes": recipeGroup,
			"Locations - Emotes": emoteGroup,
		};

		//Locations - Pet Merchants
		L.marker([-2515.5,3215.5], {icon: petMerchantIcon}).bindPopup("Ignatius the Greedy<br><br>Sells:<li><a href='https://conanexiles.gamepedia.com/Sand_Reaper_Egg_(Pet)' target='_blank'>Sand Reaper Egg</a><br><li>Cost: 10 x <a href='https://conanexiles.gamepedia.com/Gold_Coin' target='_blank'>Gold Coin</a>").addTo(petMerchantGroup),
		L.marker([-2514.75,3211.25], {icon: petMerchantIcon}).bindPopup("Koros the Brave<br><br>Sells:<li><a href='https://conanexiles.gamepedia.com/Shoebill_Egg_(Pet)' target='_blank'>Shoebill Egg</a><br><li>Cost: 10 x <a href='https://conanexiles.gamepedia.com/Gold_Coin' target='_blank'>Gold Coin</a>").addTo(petMerchantGroup),
		L.marker([-2517,3219.5], {icon: petMerchantIcon}).bindPopup("Owen the Beautiful<br><br>Sells:<li><a href='https://conanexiles.gamepedia.com/Spider_Egg-sac_(Pet)' target='_blank'>Spider Egg-sac</a><br><li>Cost: 10 x <a href='https://conanexiles.gamepedia.com/Gold_Coin' target='_blank'>Gold Coin</a>").addTo(petMerchantGroup),
		L.marker([-2286,1205], {icon: petMerchantIcon}).bindPopup("Shawna the Strange<br><br>Sells:<li><a href='https://conanexiles.gamepedia.com/Rocknose_Egg_(Pet)' target='_blank'>Rocknose Egg</a><br><li>Cost: 10 x <a href='https://conanexiles.gamepedia.com/Gold_Coin' target='_blank'>Gold Coin</a>").addTo(petMerchantGroup),
		L.marker([-2360.75,1210.5], {icon: petMerchantIcon}).bindPopup("Urik, Master Tamer<br><br>Sells:<li><a href='https://conanexiles.gamepedia.com/Camel_Calf_(Pet)' target='_blank'>Camel Calf</a><br><li>Cost: 10 x <a href='https://conanexiles.gamepedia.com/Gold_Coin' target='_blank'>Gold Coin</a>").addTo(petMerchantGroup),
		

		//Pet Icons - Hyena
		L.marker([-3212,1712], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),
		L.marker([-3162,1287], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),
		L.marker([-3140,1272], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),
		L.marker([-3166,1257], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),
		L.marker([-3212,1180], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),
		L.marker([-3036,1706], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),
		L.marker([-2957,1529], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),
		L.marker([-2836,2322], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),
		L.marker([-2819,2348], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),
		L.marker([-2680,1843], {icon: petHyenaIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_SpottedHyena.png' width='64'><br><p align='center'>Hyena Whelp</p>").addTo(petHyenaGroup),

		//Pet Icons - Ostrich
		L.marker([-3199,1249], {icon: petOstrichIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_Ostrich.png' width='64'><br><p align='center'>Ostrich Chick</p>").addTo(petOstrichGroup),
		L.marker([-3202,1296], {icon: petOstrichIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_Ostrich.png' width='64'><br><p align='center'>Ostrich Chick</p>").addTo(petOstrichGroup),
		L.marker([-3180,1288], {icon: petOstrichIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_Ostrich.png' width='64'><br><p align='center'>Ostrich Chick</p>").addTo(petOstrichGroup),
		
		//Pet Icons - Sabretooth
		L.marker([-1214,860.5], {icon: petSabretoothIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_Sabertooth.png' width='64'><br><p align='center'>Sabretooth Cub</p>").addTo(petSabretoothGroup),
		L.marker([-1196,873.5], {icon: petSabretoothIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_Sabertooth.png' width='64'><br><p align='center'>Sabretooth Cub</p>").addTo(petSabretoothGroup),
		L.marker([-1596.5,1446.5], {icon: petSabretoothIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_Sabertooth.png' width='64'><br><p align='center'>Sabretooth Cub</p>").addTo(petSabretoothGroup),

		//Pet Icons - Elephant
		L.marker([-2441.75,1719.75], {icon: petElephantIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_elephant.png' width='64'><br><p align='center'>Elephant Calf</p>").addTo(petElephantGroup),
		L.marker([-2419.25,1685.25], {icon: petElephantIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_elephant.png' width='64'><br><p align='center'>Elephant Calf</p>").addTo(petElephantGroup),
		L.marker([-2519.25,1772.5], {icon: petElephantIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_elephant.png' width='64'><br><p align='center'>Elephant Calf</p>").addTo(petElephantGroup),

		//Pet Icons - Tiger
		L.marker([-2513,1748.5], {icon: petTigerIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_Tiger.png' width='64'><br><p align='center'>Tiger Cub</p>").addTo(petTigerGroup),
		L.marker([-2504.75,1740.75], {icon: petTigerIcon}).bindPopup("<img class='border-fix' src='https://conanexilesmap.com/data/images/gameicon/icon_baby_Tiger.png' width='64'><br><p align='center'>Tiger Cub</p>").addTo(petTigerGroup),

		//Pet Icons - Rhino
		//https://conanexilesmap.com/data/images/gameicon/icon_baby_Rhino.png

		//Pet Icons - Fawn
		//https://conanexilesmap.com/data/images/gameicon/icon_baby_Fawn.png

		//Pet Icons - Croc
		//https://conanexilesmap.com/data/images/gameicon/icon_baby_Crocodile.png

		//Pet Icons - Boar
		//https://conanexilesmap.com/data/images/gameicon/icon_baby_Boar.png

		//Pet Icons - Wolf
		//https://conanexilesmap.com/data/images/gameicon/icon_baby_Wolf.png

		//Star Metal Icons
		L.marker([-1199,1014], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1256,1016], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1282,1006], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1177,971], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1167,849], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1298,832], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1229,770], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1365,924], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1226,979], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1205,955], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1247,943], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1157,1039], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1186,1091], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1088,935], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1476,865], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1474,790], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1572,819], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1411,930], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1497,760], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1487,702], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1562,816], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1511,871], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		L.marker([-1472,873], {icon: starmetalIcon}).bindPopup("Possible Star Metal Location").addTo(starmetalGroup),
		

		//Obsidian Icons
		L.marker([-1266.25,1465], {icon: obsidianIcon}).bindPopup("3 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1274.25,1475.5], {icon: obsidianIcon}).bindPopup("3 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1249.5,1444.75], {icon: obsidianIcon}).bindPopup("3 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1230.5,1452.75], {icon: obsidianIcon}).bindPopup("3 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1200.25,1410], {icon: obsidianIcon}).bindPopup("11 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1129,1732.25], {icon: obsidianIcon}).bindPopup("2 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-970,1590.75], {icon: obsidianIcon}).bindPopup("1 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1192.5,1655.75], {icon: obsidianIcon}).bindPopup("2 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1267.75,1703.5], {icon: obsidianIcon}).bindPopup("2 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1191.25,1538.5], {icon: obsidianIcon}).bindPopup("2 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1235.25,1756.25], {icon: obsidianIcon}).bindPopup("3 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1266.5,1716.75], {icon: obsidianIcon}).bindPopup("3 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1335,1570], {icon: obsidianIcon}).bindPopup("3 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1211.75,1584.5], {icon: obsidianIcon}).bindPopup("3 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1317.5,1614.25], {icon: obsidianIcon}).bindPopup("3 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1237.25,1737], {icon: obsidianIcon}).bindPopup("5 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1261,1615], {icon: obsidianIcon}).bindPopup("4 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1198.5,1556.75], {icon: obsidianIcon}).bindPopup("6 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1012.75,1587.25], {icon: obsidianIcon}).bindPopup("6 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-1312.5,1569.5], {icon: obsidianIcon}).bindPopup("7 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-966.75,1616], {icon: obsidianIcon}).bindPopup("7 Obsidian Nodes").addTo(obsidianGroup),
		L.marker([-998.5,1600.5], {icon: obsidianIcon}).bindPopup("10 Obsidian Nodes").addTo(obsidianGroup),

		//Black Ice Icons
		L.marker([-1090.75,1081.5], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1023.5,1105], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-988,1078], {icon: blackiceIcon}).bindPopup("40+ Black Ice Nodes - Inside Temple of Frost").addTo(blackiceGroup),
		L.marker([-1130.5,828.5], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1074.5,754], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1152.5,497.5], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1347.25,918.25], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1280.5,992], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1463,1420.5], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1495.25,1314.25], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1560.75,1809.75], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1507.5,869], {icon: blackiceIcon}).bindPopup("3 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1689,1763], {icon: blackiceIcon}).bindPopup("2 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1323,345.5], {icon: blackiceIcon}).bindPopup("4 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1360,1257.25], {icon: blackiceIcon}).bindPopup("4 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1344.25,1081], {icon: blackiceIcon}).bindPopup("5 Black Ice Nodes").addTo(blackiceGroup),
		L.marker([-1462,699.75], {icon: blackiceIcon}).bindPopup("6 Black Ice Nodes").addTo(blackiceGroup),
		
		//Crystal Icons
		L.marker([-3266,1310], {icon: crystalIcon}).bindPopup("Crystals in Cavern of Fiends").addTo(crystalGroup),
		L.marker([-3503.25,1904.75], {icon: crystalIcon}).bindPopup("Crystals in Hanuman's Grotto").addTo(crystalGroup),
		L.marker([-2482.75,1492], {icon: crystalIcon}).bindPopup("Crystals in Scuttler's Shortcut").addTo(crystalGroup),
		
		//Iron Icons
		L.marker([-2236,1397], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-3021,1337.5], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-3316.5,1264.5], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2644.5,352], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-3016.5,1340.75], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-1288,377.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2310.75,1584], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2310.75,1584], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1655,429.5], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1644,429.5], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1926.25,1659.5], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2906.75,1936.5], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2310.5,1588.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2292.25,1597.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2274.5,1555], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-1122.25,1158.75], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2918.5,1919.75], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2795.75,2017.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2874.5,1968.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-1656.25,332], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-1686.25,427], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-1706,410.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-1948.5,1699], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-1598,349], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2153.5,1812.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-1935.75,1672], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-3015.75,1330], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-1115.25,1173.25], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-1596,341.75], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1500,460.75], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1795.75,314.25], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-1713.5,411], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-2374,1820], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-1965.25,1767.25], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-1270.75,1093], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1496.75,450], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1596.75,407], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-2224,1940.25], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-2215.25,1925.5], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1946.75,1706.75], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1286.75,1079.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-1599.75,395.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-1993,1530.5], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-1573.25,321.25], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2007,1539.25], {icon: ironIcon}).bindPopup("12 Iron Nodes").addTo(ironGroup),
		L.marker([-1683.5,418.25], {icon: ironIcon}).bindPopup("12 Iron Nodes").addTo(ironGroup),
		L.marker([-1582.75,323.75], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-1662.5,333.75], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-1510.75,351.75], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-1588.25,328.5], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-1584.5,403], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-1590,410], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-1583,403.75], {icon: ironIcon}).bindPopup("12 Iron Nodes").addTo(ironGroup),
		L.marker([-2020,1537.25], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-2264.75,1964], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-2240.75,1599.5], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-1562,316], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-1896.5,586.5], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-1527.25,361], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-1536.25,313.5], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-1147,1152], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-1500.5,320], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2106.5,1270], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2107,1329], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-1314.25,764.5], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1528.5,317.5], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2106,1309], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1496.5,711], {icon: ironIcon}).bindPopup("12 Iron Nodes").addTo(ironGroup),
		L.marker([-1670.75,337.75], {icon: ironIcon}).bindPopup("12 Iron Nodes").addTo(ironGroup),
		L.marker([-2175,1384.75], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-1909.5,603.5], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-1507.75,320], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-2156.75,1384], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-2082,1252], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-1953,1507.5], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-2202.25,1644.5], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-1934.5,1665.5], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-1679.75,340.5], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-2100,1318], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-2083,1255], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-2274.25,1535.75], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-1971.25,1747.25], {icon: ironIcon}).bindPopup("12 Iron Nodes").addTo(ironGroup),
		L.marker([-1343.5,765.25], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-2114,1302], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-2287.5,1577], {icon: ironIcon}).bindPopup("14 Iron Nodes").addTo(ironGroup),
		L.marker([-2020.5,1776.25], {icon: ironIcon}).bindPopup("14 Iron Nodes").addTo(ironGroup),
		L.marker([-1944.25,1715.5], {icon: ironIcon}).bindPopup("16 Iron Nodes").addTo(ironGroup),
		L.marker([-1502.25,351.75], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2414.75,2002], {icon: ironIcon}).bindPopup("16 Iron Nodes").addTo(ironGroup),
		L.marker([-2313.5,1965.25], {icon: ironIcon}).bindPopup("16 Iron Nodes").addTo(ironGroup),
		L.marker([-2262,1593.75], {icon: ironIcon}).bindPopup("16 Iron Nodes").addTo(ironGroup),
		L.marker([-1444.75,723.5], {icon: ironIcon}).bindPopup("17 Iron Nodes").addTo(ironGroup),
		L.marker([-1433,706.5], {icon: ironIcon}).bindPopup("17 Iron Nodes").addTo(ironGroup),
		L.marker([-1329,939.5], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1494.5,357.25], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1348,950.5], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-2097.5,1265.5], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1409,977], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1322.25,929.25], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-1534.25,359.75], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-2105,1339], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-1559,348.25], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-1514.75,1581.25], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-1564,365], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-3021,1351.5], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-1071,583], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1551.75,352.25], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1052.5,563.25], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1750.25,1834.25], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1078.75,702], {icon: ironIcon}).bindPopup("20 Iron Nodes").addTo(ironGroup),
		L.marker([-1040.5,615.25], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-1387,984.25], {icon: ironIcon}).bindPopup("15 Iron Nodes").addTo(ironGroup),
		L.marker([-1277.5,389.25], {icon: ironIcon}).bindPopup("12 Iron Nodes").addTo(ironGroup),
		L.marker([-1041,550.75], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-2844.5,2680], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-1566.25,376], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-1563.5,355.25], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-1547.75,360.5], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2834.25,2671.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3037,1354.25], {icon: ironIcon}).bindPopup("19 Iron Nodes").addTo(ironGroup),
		L.marker([-3031.75,1382.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-3037,1354.25], {icon: ironIcon}).bindPopup("19 Iron Nodes").addTo(ironGroup),
		L.marker([-3037.25,1388.75], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-3314.5,1714.75], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2678.75,409.25], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-3073,713.75], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2877,642.5], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2561,673.25], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2878.5,688], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2205.5,335], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2516.75,609], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2551.5,555], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2245,555.5], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2431,1434], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2652.5,510], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2626.25,353.5], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2658.25,384.25], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2857.25,711.5], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2575.25,342.75], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2598.75,580.75], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-2670.25,515.5], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-3265,1786.25], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-3254,1803.25], {icon: ironIcon}).bindPopup("1 Iron Node").addTo(ironGroup),
		L.marker([-3041,1395.75], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-3285,1761], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2490.5,353.5], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2540.5,552.5], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-3022.5,1367], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2098.75,471.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2560,558.5], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3022,1387.75], {icon: ironIcon}).bindPopup("14 Iron Nodes").addTo(ironGroup),
		L.marker([-3005.5,1368.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2795.5,2683], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2818,2663.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2786,2692.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2997.25,1354.75], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2595.5,575.75], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2473.25,359.25], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2768.75,1434.5], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-3003.75,3076], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2587.25,596.25], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2617.5,591.25], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2699,398], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2574.75,603], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2519.25,888.75], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2746.5,447.25], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2789.75,467.25], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2262.25,527], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-3016.5,1315.5], {icon: ironIcon}).bindPopup("21 Iron Nodes - On Cliff").addTo(ironGroup),
		L.marker([-3011.5,1302.5], {icon: ironIcon}).bindPopup("12 Iron Nodes - On Cliff").addTo(ironGroup),
		L.marker([-3008.25,1286.75], {icon: ironIcon}).bindPopup("20 Iron Nodes - On Plateau").addTo(ironGroup),
		L.marker([-2125.75,779], {icon: ironIcon}).bindPopup("2 Iron Nodes - On Plateau").addTo(ironGroup),
		L.marker([-2996.75,1282.75], {icon: ironIcon}).bindPopup("9 Iron Nodes - On Plateau").addTo(ironGroup),
		L.marker([-3048.25,1317.5], {icon: ironIcon}).bindPopup("15 Iron Nodes - On Plateau").addTo(ironGroup),
		L.marker([-2981.25,1286.25], {icon: ironIcon}).bindPopup("5 Iron Nodes - On Cliff").addTo(ironGroup),
		L.marker([-2163,772.5], {icon: ironIcon}).bindPopup("5 Iron Nodes - On Cliff").addTo(ironGroup),
		L.marker([-2985.75,1293], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-3032.5,1634.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2567.25,881.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2561.75,892.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2957.75,672.75], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2946,1608.75], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2971.5,1651], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2169,711.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2165,699], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-3054.25,1607], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2622.25,598], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2423,901], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2376.5,852.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2994.25,680.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2620.25,836], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2558.75,627], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2564.25,635.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2174.25,775], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-2926,612.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2928.5,571], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2572.25,599], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2928.5,562], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2794.25,488], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2806.5,477.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2617,619.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2791.75,493], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2614.75,861.75], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2775,476.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2591.5,336.75], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2683.5,791], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2467,874.25], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2549.25,3110.75], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2524,3111.75], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2802.75,2095.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2143,502.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2962,1598.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2566,334.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2466,359.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2988.5,1649.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2660.5,514.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2405.5,905.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2564.5,618], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-3014.75,1670.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2631,631], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3020,1654.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2157.5,732.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2926,651], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2502.5,895.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2657,643], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2660.75,798.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2978,2326.75], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2604.25,621.5], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-3027,1822.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-3006.5,1863.5], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2621.25,608.75], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2978,670.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2923,541], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2857.25,560.5], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2936,1756], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2144,567], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2180.75,583.75], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2898,517.25], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2917.75,628.75], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-2158.5,560], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-2147,587.75], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-2514,340.5], {icon: ironIcon}).bindPopup("12 Iron Nodes").addTo(ironGroup),
		L.marker([-2678.5,648.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2557.75,684.75], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2363.75,3442.5], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2525.5,638], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2556.5,3420], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2517.25,622.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2583.5,1574.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2509.25,616.25], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-2501.5,573.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2487,487.25], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-2429,503.25], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2368.5,3450], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2375.5,575.25], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2805.5,1606.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2766.75,1544.75], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2753.75,2129.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2441.5,481.25], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2470.75,456], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2380.5,566], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2386,544.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2769.25,1574], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2766.5,1514], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2567,3420], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2890.75,1540.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2782.5,1778.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2379.25,3445.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2720.5,2934], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2715.75,2920], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2796.75,1689.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2767.75,1498.75], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-3179.5,3265.5], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2811.5,1698.5], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2800,2879.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2802,2890.25], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3224.75,2990], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2809.75,2898.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-3217.25,2967.5], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3239.25,3047], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3165.25,3149.5], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3154,3143.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3058.75,3348.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3002.25,3090.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3016,3092.25], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3049.75,3340.5], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2696,3328.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2720,3319.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2809.75,2925], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-3017.5,3454.5], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2806.75,3047], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2796.5,1726.5], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-3010.75,3073.25], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2996.75,3452.5], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-3241.75,3060.25], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2993.25,3084.75], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2725,2951], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2790,3093.75], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2919.5,2721.75], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2689.5,1863], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2756.5,1922.25], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2799.75,2782.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2936,2736], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2861.5,2744], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-3088,2954.5], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-3104,2952], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-3136.5,3282], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-2467.25,3150.50], {icon: ironIcon}).bindPopup("21 Iron Nodes").addTo(ironGroup),
		L.marker([-2470.5,3150], {icon: ironIcon}).bindPopup("19 Iron Nodes").addTo(ironGroup),
		L.marker([-2493,3153], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2599.5,3275.5], {icon: ironIcon}).bindPopup("18 Iron Nodes").addTo(ironGroup),
		L.marker([-2599,3257], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2595.25,3396], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2749.25,1915], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2694.25,1991.25], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2569.25,3394], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2761.75,2004.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2747,2115], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2542.75,1401.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2251,1161.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2259.75,1130.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2432.5,1449.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2707.75,2029.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2680.25,1816], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2658,1881.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2691.5,1906.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2674.25,1547.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2559,1718], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2574,1458], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2290,1010], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2537,1277], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2341,1584.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2525.25,1196.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2303.5,1392.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2520,1713], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2464.25,1266.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2371.25,1267], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2261,1173], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2361.5,1162.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2319.75,1251.75], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2169,606.5], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2405,1464], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-2736.5,1826.25], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2138.5,644], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2138.5,644], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2251,1180], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2726,2052], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2699,1870.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2819.5,1330.75], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2529,1734], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2279.75,1314], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2272.25,1220.25], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-2755.5,1866.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2760.5,1318], {icon: ironIcon}).bindPopup("2 Iron Nodes").addTo(ironGroup),
		L.marker([-2161,710.75], {icon: ironIcon}).bindPopup("2 Iron Nodes - Cliff").addTo(ironGroup),
		L.marker([-2749,1658.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2622,1363], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2116.5,637], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2581.75,1399.25], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2567,1309.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2368,1179], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2569,1652], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2339.5,1355], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2312.5,1220.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2381.5,1248], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2241,914], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2348.75,1289.25], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2308,941.25], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2410,1230.5], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2299,1019], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2306,1000], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2289,1026], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2614,1307], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2354.5,1387], {icon: ironIcon}).bindPopup("3 Iron Nodes").addTo(ironGroup),
		L.marker([-2578.5,1486.25], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-1798.25,1837.75], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1811.75,1289.5], {icon: ironIcon}).bindPopup("22 Iron Nodes").addTo(ironGroup),
		L.marker([-1814,1349], {icon: ironIcon}).bindPopup("12 Iron Nodes").addTo(ironGroup),
		L.marker([-1803,1400], {icon: ironIcon}).bindPopup("16 Iron Nodes").addTo(ironGroup),
		L.marker([-2237.25,1322.75], {icon: ironIcon}).bindPopup("20 Iron Nodes").addTo(ironGroup),
		L.marker([-2248.5,1317.25], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-2252.75,1303.5], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-2232.5,1235.5], {icon: ironIcon}).bindPopup("11 Iron Nodes").addTo(ironGroup),
		L.marker([-2263.75,1313], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2273.5,1327.75], {icon: ironIcon}).bindPopup("5 Iron Nodes").addTo(ironGroup),
		L.marker([-2246.5,1299.25], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2178.25,1121.5], {icon: ironIcon}).bindPopup("6 Iron Nodes").addTo(ironGroup),
		L.marker([-2228.75,1223.25], {icon: ironIcon}).bindPopup("8 Iron Nodes").addTo(ironGroup),
		L.marker([-2186.5,1150.5], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-1864.75,1242.25], {icon: ironIcon}).bindPopup("7 Iron Nodes").addTo(ironGroup),
		L.marker([-2168,1118.75], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-2048.75,1142.25], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-2025.5,1122.5], {icon: ironIcon}).bindPopup("10 Iron Nodes").addTo(ironGroup),
		L.marker([-2039.5,1153], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1968,1125], {icon: ironIcon}).bindPopup("9 Iron Nodes").addTo(ironGroup),
		L.marker([-1968,1109.25], {icon: ironIcon}).bindPopup("4 Iron Nodes").addTo(ironGroup),
		L.marker([-1961.75,1108.25], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-2041,1448.5], {icon: ironIcon}).bindPopup("15 Iron Nodes").addTo(ironGroup),
		L.marker([-2032.5,1438.75], {icon: ironIcon}).bindPopup("13 Iron Nodes").addTo(ironGroup),
		L.marker([-1878.5,1450.5], {icon: ironIcon}).bindPopup("15 Iron Nodes").addTo(ironGroup),
		L.marker([-1862.75,1255.5], {icon: ironIcon}).bindPopup("16 Iron Nodes").addTo(ironGroup),
		
		//Coal Icons
		L.marker([-2821.25,2106.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2571,1644.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2575,1186], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2472.5,988.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2405,977], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2565,1037], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2581,1129], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2511,1056.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2438,1230.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2485,1089], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2552,1050], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-1922,628], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-1873.75,594.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-1538.5,310], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-1700.25,352.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2071.5,1241.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-1884.5,1405.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-1998,1460.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-1719.25,353.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-1974.25,1111.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2539,1005], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2381,964], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2429,992], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2527.25,1070.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2158.5,1241.5], {icon: coalIcon}).bindPopup("4 Coal Nodes").addTo(coalGroup),
		L.marker([-2548.5,1605.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2480,1591], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2606,1373], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2576.5,1661], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2591,1462], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2589,1669.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2603,1485.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2590.5,1487.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2751.5,1651.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2582.5,1578.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2652.75,1311.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2707.5,1643.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2563.25,1770.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2567.25,1756.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2722.75,1656.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2821.5,1600.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2709.25,1842.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2712,1732], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2705,1810.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2682.25,1908.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2794,1663], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2766.5,1544.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2772,1578.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2729,2056.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2723.25,2044.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2765.75,1558.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2446.25,476.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2340,1388], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2786.25,1802.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2087.5,776.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2068,797.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2037,1539.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2094,815.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2112.5,857.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2318,1855.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2734.25,1820.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2408.75,1961.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2243.25,1712.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2437,489.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2808,1635.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2721,1797], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2753.5,1805], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2481.25,457.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2621.5,617], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2487,521], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2429.5,510], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2542,1478], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2486.5,595.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2358.5,1517.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2556.5,1466], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2830.25,1531], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2371.25,1486], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2565.75,603.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2793,1582.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2653,627.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2483.5,555.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2640,1875], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2615,1797.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2665.5,632.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2636.5,631.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2508,916], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2432.25,1724.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2466,1745.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2464,1811.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2477,1814.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2703.25,637], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2827.25,1505.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-5482,502], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2552,873], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2945.25,669.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2590.75,586.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2461.5,360.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2624.5,845.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2566.25,648.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2517,613.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2842,2082.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2409.25,930.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2461.25,926], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2926.25,546.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2423.5,911.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2494.5,362.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2916.25,537.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2903.75,518.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-3102,1833.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2482.75,354], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2841.25,496.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-3081.75,1900.75], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2809.5,498.25], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2834.5,586], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-3062,1928.5], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-3091.5,1887], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2646.75,513], {icon: coalIcon}).bindPopup("1 Coal Node").addTo(coalGroup),
		L.marker([-2836,2098.5], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-3140.75,1784.25], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-1496.75,425.5], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-1496.75,440], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-1496.5,324.25], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-1639.25,325], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-1647.25,334.5], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-1612.75,450], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2837,1704.5], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2488.5,576], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2363,1279.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2325.75,1336], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2977.75,1892.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2327.25,1578.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2520,1612], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-3134,1824], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-3118.75,1818.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2560,1835.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2443,1411.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2626,1784], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2481,1647.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2568.25,1855.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2627.75,1867.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2434,1475.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2424.75,1670.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2707.75,1748], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2488,513.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2858,2058.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2658.75,647.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2545.75,684], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2621.75,593.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2671.25,1899.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2396.5,1243.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2570.75,1402.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2742.25, 688.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2603,862], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2790.5,1743], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2581.75,1370.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2609.5,625.75], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2568,867], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2450,1262.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2645,836], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2716.25,2034.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2934.25,664.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-1475.75,731.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2470,934.25], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2427,943.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2440,1332.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2258,345], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-2967,671.5], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-3047.75,1744], {icon: coalIcon}).bindPopup("2 Coal Nodes").addTo(coalGroup),
		L.marker([-3162.75,3127], {icon: coalIcon}).bindPopup("6 Coal Nodes").addTo(coalGroup),
		L.marker([-3021.5,1718.25], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2256.25,1694.5], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2424.5,342], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2694.5,642.75], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2947,1726], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2728,2033.75], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2522,1208.5], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2522.75,648.5], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-1969.25,1757.25], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-3192,3141.75], {icon: coalIcon}).bindPopup("4 Coal Nodes").addTo(coalGroup),
		L.marker([-2676.25,1884.25], {icon: coalIcon}).bindPopup("4 Coal Nodes").addTo(coalGroup),
		L.marker([-2503,611], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2519.5,629], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2962,1737.5], {icon: coalIcon}).bindPopup("3 Coal Nodes").addTo(coalGroup),
		L.marker([-2601,3369.75], {icon: coalIcon}).bindPopup("4 Coal Nodes").addTo(coalGroup),
		L.marker([-1355.5,1285], {icon: coalIcon}).bindPopup("4 Coal Nodes").addTo(coalGroup),
		L.marker([-2588.25,3381.75], {icon: coalIcon}).bindPopup("8 Coal Nodes").addTo(coalGroup),
		
		//Silver Icons
		L.marker([-2760.75,2914.75], {icon: silverIcon}).bindPopup("7 Silver Nodes").addTo(silverGroup),
		L.marker([-2815.25,621.25], {icon: silverIcon}).bindPopup("4 Silver Nodes").addTo(silverGroup),
		L.marker([-2799,634.5], {icon: silverIcon}).bindPopup("4 Silver Nodes").addTo(silverGroup),
		L.marker([-2778,601.75], {icon: silverIcon}).bindPopup("2 Silver Nodes").addTo(silverGroup),
		L.marker([-2779,619], {icon: silverIcon}).bindPopup("1 Silver Node").addTo(silverGroup),
		L.marker([-2789.5,653], {icon: silverIcon}).bindPopup("1 Silver Node - On Plateau").addTo(silverGroup),
		
		//Brimstone Icons
		L.marker([-3149,1705], {icon: brimstoneIcon}).bindPopup("Brimstone in Sinner's Refuge").addTo(brimstoneGroup),
		L.marker([-3175,1901], {icon: brimstoneIcon}).bindPopup("Brimstone in Gallaman's Tomb").addTo(brimstoneGroup),
		L.marker([-2863.5,2186.75], {icon: brimstoneIcon}).bindPopup("Brimstone in Executioner's Cave").addTo(brimstoneGroup),
		L.marker([-2305,672], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2330.5,671.75], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2330.5,671.75], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2319.5,715.75], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2339.75,719.25], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2332,749.25], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2292.75,718], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2297.5,739.75], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2303.75,755.75], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2290.25,763.5], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2258,718.5], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2245.75,731.5], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2260.25,745.5], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2226.25,698], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2217.25,720], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2242.75,688.5], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2228.5,764], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2277.5,786.75], {icon: brimstoneIcon}).bindPopup("Brimstone Node (Stalagmite)").addTo(brimstoneGroup),
		L.marker([-2427,3464.75], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2476.5,3487.25], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2489,3472.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2512.75,3504.75], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2486.75,3559.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2526.25,3599], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2597.25,3595.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2640.75,3572.25], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2664.25,3508.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2663,3434], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2787.75,3479.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2822,3519.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2901.5,3496.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2956.5,3541.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-3013.5,3554.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-3088.25,3530], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2115.25,3448], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-3091,3384.25], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-3044,3272], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-3071.25,3328], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-3116.5,3449.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2839.75,3582.25], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2901.75,3586.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2785.25,3605], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2376,3607.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2342.5,3580.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2313,3538], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2273.5,3498], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2375,3527], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2432,3587.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		L.marker([-2457.25,3368.5], {icon: brimstoneIcon}).bindPopup("5 Brimstone Nodes (Stalagmites)").addTo(brimstoneGroup),
		
		//Religion Icons
		L.marker([-3244,1328], {icon: yogIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Nunu_the_Cannibal' target='_blank'>Yog Trainer - Nunu the Cannibal</a>").addTo(ReligionGroup),
		L.marker([-2614.5,1630], {icon: setIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Mek-kamoses' target='_blank'>Set Trainer - Mek-Kamoses</a>").addTo(ReligionGroup),
		L.marker([-2516,1171], {icon: mitraIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Muriela_the_Artisan' target='_blank'>Mitra Trainer - Muriela the Artisan</a>").addTo(ReligionGroup),
		L.marker([-1453.5,693.5], {icon: ymirIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/The_Outcast' target='_blank'>Ymir Trainer - The Outcast</a>").addTo(ReligionGroup),
		L.marker([-1495,678], {icon: ymirIcon}).bindPopup("Ramp to Ymir Religion Trainer").addTo(ReligionGroup),
		L.marker([-3056.25,3352], {icon: derketoIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Yakira,_Priestess_of_Derketo' target='_blank'>Derketo Trainer - Yakira, Priestess of Derketo</a>").addTo(ReligionGroup),
		L.marker([-2368.5,1061], {icon: jhebbalIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Child_of_Jhebbal_Sag' target='_blank'>Child of Jhebbal Sag</a>").addTo(ReligionGroup),


		//------------------T-H-R-A-L-L-S------------------------------------------------------------------------------------------------//
		// in \Steam\steamapps\common\Conan Exiles\ConanSandbox\Saved\Config\WindowsNoEditor\ServerSettings.ini
		// change NPCRespawnMultiplier=1.000000 to NPCRespawnMultiplier=0.000001
		// in-game don't open server settings or it resets, instead use console command MakeMeAdmin
		// use shift+del to kill thralls instantly, if the NPCRespawnMultiplier stayed, you should have instant respawns

		//Thralls - Alchemist
		L.marker([-3259.5,1037], {icon: cookIcon}).bindPopup("Alchemist T1-3 (Darfari)").addTo(alchemistGroup),
		L.marker([-3003.25,1753.5], {icon: cookIcon}).bindPopup("Alchemist T1-3 (Darfari)").addTo(alchemistGroup),
		L.marker([-2718.75,423.75], {icon: cookIcon}).bindPopup("Alchemist T1-3 (Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian, Zingaran)").addTo(alchemistGroup),
		L.marker([-2542,3263.5], {icon: cookIcon}).bindPopup("Alchemist T1-3 (Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran)").addTo(alchemistGroup),
		L.marker([-2661.5,2112.25], {icon: cookIcon}).bindPopup("Alchemist T1-3 (Cimmerian, Darfari, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran) - middle level").addTo(alchemistGroup),
		L.marker([-1172.25,1650.5], {icon: cookIcon}).bindPopup("Alchemist T1 (Cimmerian), Alchemist T3 (Hyborian)").addTo(alchemistGroup),
		L.marker([-1949,945.75], {icon: cookIcon}).bindPopup("Alchemist T3-4 (Nordheimer), Rokur the Alchemist T4").addTo(alchemistGroup),
		L.marker([-1976.75,1312.25], {icon: cookIcon}).bindPopup("Alchemist T1-4 (Nordheimer), Rokur the Alchemist T4").addTo(alchemistGroup),
		L.marker([-1938,1282], {icon: cookIcon}).bindPopup("Alchemist T1-4 (Nordheimer), Rokur the Alchemist T4 - double spawn").addTo(alchemistGroup),
		L.marker([-1635.75,605.75], {icon: cookIcon}).bindPopup("Alchemist T1-4 (Cimmerian), Darmok the Experimenter T4").addTo(alchemistGroup),
		L.marker([-2686.5,2561], {icon: cookIcon}).bindPopup("Alchemist T1-3 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran)").addTo(alchemistGroup),

		//Thralls - Armorer
		L.marker([-2582.75,553], {icon: armorerIcon}).bindPopup("Armorer T1-3 (Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian)").addTo(armorerGroup),
		L.marker([-2648,2100], {icon: armorerIcon}).bindPopup("Armorer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Irniz of the Furnace T4, Ogrus Iron-Eater T4, Shendelzare T4, Joka Ironfist T4, Jehungir Horseshoe T4 - double spawn (middle and upper level)").addTo(armorerGroup),
		L.marker([-3054.25,3352], {icon: armorerIcon}).bindPopup("Armorer T1-4 (Lemurian), Fia T4").addTo(armorerGroup),
		L.marker([-2280.25,1274.25], {icon: armorerIcon}).bindPopup("Armorer T3-4 (Darfari, Kushite, Shemite, Stygian, Zamorian), Legendary Armorer T4, Llarn Steeltoe T4").addTo(armorerGroup),
		L.marker([-3032.5,3346.75], {icon: armorerIcon}).bindPopup("Armorer T1-4 (Lemurian), Fia T4").addTo(armorerGroup),
		L.marker([-1948,1314], {icon: armorerIcon}).bindPopup("Armorer T1-4 (Nordheimer), Njoror Battleborn T4").addTo(armorerGroup),
		L.marker([-1588.25,604.75], {icon: armorerIcon}).bindPopup("Armorer T1-4 (Cimmerian), Werk of the lost tribe T4").addTo(armorerGroup),
		L.marker([-3322.75,1274.5], {icon: armorerIcon}).bindPopup("Armorer T1 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran)").addTo(armorerGroup),
		L.marker([-3005,1236], {icon: armorerIcon}).bindPopup("Armorer T1, T3-4 (Darfari), B'naru Heavyhands T4").addTo(armorerGroup),
		L.marker([-3008,1759], {icon: armorerIcon}).bindPopup("Armorer T1, T3-4 (Darfari), B'naru Heavyhands T4 - spawns upstairs, walks around").addTo(armorerGroup),
		L.marker([-2731,438.5], {icon: armorerIcon}).bindPopup("Armorer T3-4 (Aquilonian, Hyborian, Hyrkanian, Shemite, Stygian, Zamorian, Zingaran), Arcen Brokenfingers T4, Diana Steelshaper T4, Ghamm the worn T4, Hanar of Bossonia T4, Than Hammerblow T4, Zoara of the Marshes T4").addTo(armorerGroup), // https://i.imgur.com/IdaSTay.jpg // https://i.imgur.com/USGhJvl.jpg // https://i.imgur.com/U8jQW5y.jpg // https://i.imgur.com/mAUsZvH.jpg
		L.marker([-2724.25,451.25], {icon: armorerIcon}).bindPopup("Armorer T3-4 (Aquilonian, Hyborian, Hyrkanian, Shemite, Stygian, Zamorian, Zingaran), Arcen, Brokenfingers T4, Diana Steelshaper T4, Ghamm the worn T4, Hanar of Bossonia T4, Than Hammerblow T4, Zoara of the Marshes T4").addTo(armorerGroup), // https://i.imgur.com/DitnMpl.jpg // https://i.imgur.com/Jzyjuxp.jpg // https://i.imgur.com/L9JqZN6.jpg // https://i.imgur.com/4jTJTXu.jpg // bhttps://i.imgur.com/wixj9pj.jpg

		//Thralls - Bearer
		L.marker([-3344,2012.25], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-2993.5,1841.75], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-2618,2127], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-3010.75,1768.5], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-2604.25,477.25], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Kushite, Nordheimer, Stygian, Zingaran)").addTo(sherpaGroup),
		L.marker([-1954.25,951], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-2097,1418.75], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-1887.5,1485.75], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-1803.75,608.75], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-1629,533.25], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-1664.75,575.25], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-1577.5,709.5], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-3219.75,1316.75], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian, Zingaran), random T4 - walks around").addTo(sherpaGroup),
		L.marker([-2764.25,2951.25], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4 - in the cave, walks around").addTo(sherpaGroup),
		L.marker([-3084.5,2121.75], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-3011,1240], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-2634.5,2148.75], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),
		L.marker([-2597,1772.75], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), random T4").addTo(sherpaGroup),

		//Thralls - Blacksmith
		L.marker([-2885,2115.5], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-4, (Cimmerian, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Arvad of Akbitan T4").addTo(blacksmithGroup),
		L.marker([-2654.25,2102.25], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-3 (Cimmerian, Hyborian, Hyrkanian, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Arvad of Akbitan T4 - middle level").addTo(blacksmithGroup),
		L.marker([-2588,554.75], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-4 (Hyborian, Shemite, Stygian, Zingaran), Hyam Hammerhand T4").addTo(blacksmithGroup),
		L.marker([-2663,2209.75], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-3, (Cimmerian, Hyborian, Hyrkanian, Nordheimer, Kushite, Shemite, Stygian, Zamorian, Zingaran), Arvad of Akbitan T4").addTo(blacksmithGroup),
		L.marker([-2289.5,1213.75], {icon: blacksmithIcon}).bindPopup("Blacksmith T3-4 (Shemite, Stygian), Talitha Goldfingers T4").addTo(blacksmithGroup),
		L.marker([-2090,1716.25], {icon: blacksmithIcon}).bindPopup("Blacksmith T3-4 (Nordheimer), Beri T4").addTo(blacksmithGroup),
		L.marker([-1988.25,1318.5], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-4 (Nordheimer), Beri T4").addTo(blacksmithGroup),
		L.marker([-1956,1311.25], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-4 (Nordheimer), Beri T4").addTo(blacksmithGroup),
		L.marker([-1864.75,1317.75], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-4 (Nordheimer), Beri T4").addTo(blacksmithGroup),
		L.marker([-1878.5,1480.5], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-4 (Nordheimer), Beri T4").addTo(blacksmithGroup),
		L.marker([-1617.5,558.75], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-4 (Cimmerian), Vulfeles the Hammer T4").addTo(blacksmithGroup),
		L.marker([-1619.75,537], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-4 (Cimmerian), Vulfeles the Hammer T4").addTo(blacksmithGroup),
		L.marker([-2588,1785.25], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-4 (Kushite, Shemite, Stygian, Zamorian), Talitha Goldfingers T4 - walks around").addTo(blacksmithGroup),		
		L.marker([-2722.75,445.5], {icon: blacksmithIcon}).bindPopup("Blacksmith T1-3 (Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian, Zingaran)").addTo(blacksmithGroup),
		L.marker([-3049.75,3374.75], {icon: blacksmithIcon}).bindPopup("Random T1-4 Armorer, Blacksmith, Cook, Priest, Tanner, Taskmaster (Lemurian, Derketo) - double spawn at bonfire").addTo(blacksmithGroup), // west bonfire

		//Thralls - Carpenter
		L.marker([-3286.5,1236.25], {icon: carpenterIcon}).bindPopup("Carpenter T1 (Darfari)").addTo(carpenterGroup),
		L.marker([-3461.75,1671], {icon: carpenterIcon}).bindPopup("Carpenter T1 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran)").addTo(carpenterGroup),
		L.marker([-2332.25,1227.25], {icon: carpenterIcon}).bindPopup("Carpenter T1-2 (Kushite, Shemite, Stygian, Zamorian T4)").addTo(carpenterGroup),
		L.marker([-2999.5,1773.75], {icon: carpenterIcon}).bindPopup("Carpenter T1 (Darfari)").addTo(carpenterGroup),
		L.marker([-3145,1532.5], {icon: carpenterIcon}).bindPopup("Carpenter T1 (Darfari)").addTo(carpenterGroup),
		L.marker([-2663,2084.5], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Sigyn the Woodworker T4 - lower level").addTo(carpenterGroup),
		L.marker([-2627,382], {icon: carpenterIcon}).bindPopup("Carpenter T1-3 (Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian, Zingaran)").addTo(carpenterGroup),
		L.marker([-2609,559.5], {icon: carpenterIcon}).bindPopup("Carpenter T1-3 (Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian, Zingaran)").addTo(carpenterGroup),
		L.marker([-2353.5,1171], {icon: carpenterIcon}).bindPopup("Carpenter T1-2 (Kushite, Shemite, Stygian, Zamorian)").addTo(carpenterGroup),
		L.marker([-3054,3354.5], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Lemurian), Poscore Nimblefingers T4").addTo(carpenterGroup),
		L.marker([-2458.75,3303.5], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Sigyn the Woodworker T4").addTo(carpenterGroup),
		L.marker([-2702.25, 2540.5], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Rayne O' the Rosewood T4").addTo(carpenterGroup),
		L.marker([-2339.75,1216], {icon: carpenterIcon}).bindPopup("Carpenter T1-2 (Kushite, Shemite, Stygian, Zamorian)").addTo(carpenterGroup),
		L.marker([-2293.25,1184.75], {icon: carpenterIcon}).bindPopup("Carpenter T1-3 (Kushite, Shemite, Stygian, Zamorian)").addTo(carpenterGroup),
		L.marker([-2291.25,1103.25], {icon: carpenterIcon}).bindPopup("Carpenter T1-2 (Kushite, Shemite, Stygian, Zamorian)").addTo(carpenterGroup),
		L.marker([-2501.75,1171.75], {icon: carpenterIcon}).bindPopup("Carpenter T1 (Cimmerian)").addTo(carpenterGroup),
		L.marker([-1938.25,1317.25], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Nordheimer), Airk Strong-in-the-arm T4").addTo(carpenterGroup),
		L.marker([-1952.5,1321.75], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Nordheimer), Airk Strong-in-the-arm T4").addTo(carpenterGroup),
		L.marker([-1857.5,1312.5], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Nordheimer), Airk Strong-in-the-arm T4").addTo(carpenterGroup),
		L.marker([-1650.5,540.25], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Cimmerian), Acastel Ninefingers T4").addTo(carpenterGroup),
		L.marker([-2415.75,3369.5], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Sigyn the Woodworker T4").addTo(carpenterGroup),
		L.marker([-3116,2144.25], {icon: carpenterIcon}).bindPopup("Carpenter T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Sigyn the Woodworker T4").addTo(carpenterGroup),

		//Thralls - Cook
		L.marker([-2667,2100.25], {icon: cookIcon}).bindPopup("Cook T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Vatessa the Potent - lower level").addTo(cookGroup),
		L.marker([-2980,1849], {icon: cookIcon}).bindPopup("Cook T1 (Darfari)").addTo(cookGroup),
		L.marker([-3007.8,1778.5], {icon: cookIcon}).bindPopup("Cook T1 (Darfari)").addTo(cookGroup),
		L.marker([-2999.75,1524.75], {icon: cookIcon}).bindPopup("Cook T1 (Darfari)").addTo(cookGroup),
		L.marker([-3057.75,3349.25], {icon: cookIcon}).bindPopup("Cook T1-3 (Lemurian)").addTo(cookGroup),
		L.marker([-2760.25,2925.25], {icon: cookIcon}).bindPopup("Cook T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Vatessa the Potent T4").addTo(cookGroup),
		L.marker([-3026.75,3342], {icon: cookIcon}).bindPopup("Cook T1-3 (Lemurian)").addTo(cookGroup),
		L.marker([-2264.75,2956], {icon: cookIcon}).bindPopup("Cook T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Vatessa the Potent T4").addTo(cookGroup),
		L.marker([-2721.75,424.75], {icon: cookIcon}).bindPopup("Cook T1-3 (Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian, Zingaran)").addTo(cookGroup),
		L.marker([-2720,2219.5], {icon: cookIcon}).bindPopup("Cook T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Vatessa the Potent T4").addTo(cookGroup),
		L.marker([-2938.5,2775], {icon: cookIcon}).bindPopup("Cook T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Galacus the Gourmand T4").addTo(cookGroup),	
		L.marker([-2507.25,3220], {icon: cookIcon}).bindPopup("Cook T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Vatessa the Potent T4").addTo(cookGroup),
		L.marker([-2640,445], {icon: cookIcon}).bindPopup("Cook T3-4 (Hyborian, Kushite, Shemite, Stygian, Zamorian, Zingaran), Bragoras the Baker T4").addTo(cookGroup),
		L.marker([-1980.25,1291.5], {icon: cookIcon}).bindPopup("Cook T1-4 (Nordheimer), Rikkart the Baker T4").addTo(cookGroup),
		L.marker([-1953.25,1297.5], {icon: cookIcon}).bindPopup("Cook T1-4 (Nordheimer), Rikkart the Baker T4").addTo(cookGroup),
		L.marker([-2171.25,1545.5], {icon: cookIcon}).bindPopup("Cook T1-4 (Nordheimer), Rikkart the Baker T4").addTo(cookGroup),
		L.marker([-2465,3285.25], {icon: cookIcon}).bindPopup("Cook T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Vatessa the Potent T4").addTo(cookGroup),
		L.marker([-2971.5,3612.25], {icon: cookIcon}).bindPopup("Cook T3 (Hyborian, Shemite, Stygian, Zamorian, Zingaran)").addTo(cookGroup),
		L.marker([-3337.5,1918], {icon: cookIcon}).bindPopup("Cook T1 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran)").addTo(cookGroup),
		L.marker([-3096.25,2112.5], {icon: cookIcon}).bindPopup("Cook T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Vatessa the Potent T4").addTo(cookGroup),
		L.marker([-2904.75,2137.5], {icon: cookIcon}).bindPopup("Cook T1-3 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran)").addTo(cookGroup),

		//Thralls - Entertainer
		L.marker([-3262.75,1049.75], {icon: entertainerIcon}).bindPopup("Entertainer T1 (Darfari)").addTo(entertainerGroup),
		L.marker([-3342,2017.25], {icon: entertainerIcon}).bindPopup("Entertainer T1 (Darfari)").addTo(entertainerGroup),
		L.marker([-2267.25,2952.25], {icon: entertainerIcon}).bindPopup("Entertainer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Danyo the Seductive T4, Imiu of Derkheto T4").addTo(entertainerGroup),
		L.marker([-2666.5,2125], {icon: entertainerIcon}).bindPopup("Entertainer T3-4 (Hyborian, Hyrkanian, Shemite, Stygian, Zamorian, Zingaran), Danyo the Seductive T4, Imiu of Derkheto T4").addTo(entertainerGroup),
		L.marker([-2354.25,1189.25], {icon: entertainerIcon}).bindPopup("Entertainer T1-3 (Kushite, Shemite, Stygian, Zamorian)").addTo(entertainerGroup),
		L.marker([-3354.25,2025], {icon: entertainerIcon}).bindPopup("Entertainer T1 (Darfari)").addTo(entertainerGroup),
		L.marker([-2293.75,1155.25], {icon: entertainerIcon}).bindPopup("Entertainer T1-3 (Kushite, Shemite, Stygian, Zamorian)").addTo(entertainerGroup),
		L.marker([-1789,1417], {icon: entertainerIcon}).bindPopup("Entertainer T1-4 (Nordheimer), Oyvind Tall-tree T4").addTo(entertainerGroup),
		L.marker([-2967,2306.5], {icon: entertainerIcon}).bindPopup("Entertainer T1-3 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran)").addTo(entertainerGroup),
		L.marker([-2998.5,1845.75], {icon: entertainerIcon}).bindPopup("Entertainer T1 (Darfari)").addTo(entertainerGroup),
		L.marker([-2984.5,1755.25], {icon: entertainerIcon}).bindPopup("Entertainer T1 (Darfari)").addTo(entertainerGroup),
		L.marker([-3077,1696], {icon: entertainerIcon}).bindPopup("Entertainer T1-3 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran) - inside Sinner's Refuge, entry at south, double spawn").addTo(entertainerGroup),
		L.marker([-2772.5,1558.5], {icon: entertainerIcon}).bindPopup("Entertainer T1-3 (Kushite, Shemite, Stygian, Zamorian)").addTo(entertainerGroup),
		L.marker([-3051.75,3348.75], {icon: entertainerIcon}).bindPopup("Entertainer T2 (Lemurian)").addTo(entertainerGroup),
		L.marker([-2602.5,479.5], {icon: entertainerIcon}).bindPopup("Entertainer T1-4 (Hyborian, Hyrkanian, Shemite, Stygian, Zingaran)").addTo(entertainerGroup),
		L.marker([-2617.5,513.25], {icon: entertainerIcon}).bindPopup("Entertainer T3 (Hyborian, Hyrkanian, Shemite, Stygian, Zamorian, Zingaran) - triple spawn").addTo(entertainerGroup),
		L.marker([-2345.25,1213.25], {icon: entertainerIcon}).bindPopup("Entertainer T3-4 (Shemite, Stygian, Zamorian), Ionna the Seductress T4, Sadeh the Lithe T4").addTo(entertainerGroup),
		L.marker([-2340.5,1208], {icon: entertainerIcon}).bindPopup("Entertainer T1-3 (Kushite, Shemite, Stygian, Zamorian)").addTo(entertainerGroup),
		L.marker([-1940.5,1328.5], {icon: entertainerIcon}).bindPopup("Entertainer T1-4 (Nordheimer), Oyvind Tall-tree T4").addTo(entertainerGroup),
		L.marker([-1874.75,1312.5], {icon: entertainerIcon}).bindPopup("Entertainer T1-4 (Nordheimer), Oyvind Tall-tree T4").addTo(entertainerGroup),
		L.marker([-2545,3224.25], {icon: entertainerIcon}).bindPopup("Entertainer T3-4 (Hyborian, Hyrkanian, Shemite, Stygian, Zamorian, Zingaran), Danyo the Seductive T4, Imiu of Derkheto T4").addTo(entertainerGroup),
		L.marker([-2446.25,3350.75], {icon: entertainerIcon}).bindPopup("Entertainer T3-4 (Hyborian, Hyrkanian, Shemite, Stygian, Zamorian, Zingaran), Danyo the Seductive T4, Imiu of Derkheto T4").addTo(entertainerGroup),
		L.marker([-2964.5,3610.5], {icon: entertainerIcon}).bindPopup("Entertainer T1-3 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran) - triple spawn").addTo(entertainerGroup),
		L.marker([-3058.75,3350.25], {icon: entertainerIcon}).bindPopup("Entertainer T1-4 (Lemurian), Varkin Fleetfoot T4").addTo(entertainerGroup),
		L.marker([-3169.5,1057.5], {icon: entertainerIcon}).bindPopup("Entertainer T1 (Darfari)").addTo(entertainerGroup),
		L.marker([-3200.5,1072], {icon: entertainerIcon}).bindPopup("Entertainer T1 (Darfari)").addTo(entertainerGroup),
		L.marker([-3202,1084.25], {icon: sherpaIcon}).bindPopup("Bearer T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Kushite, Shemite, Stygian, Zamorian, Zingaran), Eina the Light T4, Dono'Thelpup T4 - walks around").addTo(sherpaGroup),
		
		//Thralls - Priest
		L.marker([-2910.5,1987], {icon: priestIcon}).bindPopup("Mitra Priest T1, Mitra High Priest T2, Mitra Archpriest T3").addTo(priestGroup),
		L.marker([-2995.25,1769], {icon: priestIcon}).bindPopup("Yog Priest T1, Yog High Priest T2, Yog Archpriest T3").addTo(priestGroup),
		L.marker([-2662.75,2093.5], {icon: priestIcon}).bindPopup("Mitra/Set/Yog Priest T1, Mitra/Set/Yog High Priest T2, Mitra/Set/Yog Archpriest T3").addTo(priestGroup),
		L.marker([-2627,553], {icon: priestIcon}).bindPopup("Set Priest T1, Set High Priest T2, Set Archpriest T3").addTo(priestGroup), // https://i.imgur.com/hA1Mmd6.jpg
		L.marker([-3064.5,1701.75], {icon: priestIcon}).bindPopup("Mitra Priest T1, Mitra High Priest T2, Mitra Archpriest T3 - inside Sinner's Refuge, entry to south").addTo(priestGroup), // https://i.imgur.com/2sT5KZE.jpg
		L.marker([-1933.5,906.75], {icon: priestIcon}).bindPopup("Nordheimer Priest T1-3").addTo(priestGroup),
		L.marker([-1986.25,1301.5], {icon: priestIcon}).bindPopup("Nordheimer Priest T1-3").addTo(priestGroup),
		L.marker([-1995.5,1291], {icon: priestIcon}).bindPopup("Nordheimer Priest T1-3").addTo(priestGroup),
		L.marker([-2663.5, 2424.5], {icon: priestIcon}).bindPopup("Yog Priest T1, Yog High Priest T2, Yog Archpriest T3").addTo(priestGroup),
		L.marker([-2991,1459], {icon: priestIcon}).bindPopup("Yog Priest T1, Yog High Priest T2, Yog Archpriest T3").addTo(priestGroup),
		L.marker([-2284.75,1150], {icon: priestIcon}).bindPopup("Jhebbal Sag Archpriest T3").addTo(priestGroup),

		//Thralls - Smelter
		L.marker([-3412.75,2075.75], {icon: smelterIcon}).bindPopup("Smelter T1 (Cimmerian, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran)").addTo(smelterGroup),
		L.marker([-2879.75,2118.5], {icon: smelterIcon}).bindPopup("Smelter T1-4 (Cimmerian, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran), Fingal Firetender T4").addTo(smelterGroup),
		L.marker([-2284,1209.25], {icon: smelterIcon}).bindPopup("Smelter T3-4 (Shemite, Stygian), Yael of Shem T4").addTo(smelterGroup),
		L.marker([-2653.5,2096.5], {icon: smelterIcon}).bindPopup("Smelter T3-4 (Cimmerian, Hyborian, Nordheimer, Shemite, Stygian, Zingaran), Fingal Firetender, Idra Sparkeyes - middle level").addTo(smelterGroup),
		L.marker([-2584.25,550.75], {icon: smelterIcon}).bindPopup("Smelter T1-3 (Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian)").addTo(smelterGroup),
		L.marker([-2701.25, 417.75], {icon: smelterIcon}).bindPopup("Smelter T3-4 (Hyborian, Shemite, Stygian, Zingaran), Daya Leaddrinker T4").addTo(smelterGroup),
		L.marker([-1982.25,1320.5], {icon: smelterIcon}).bindPopup("Smelter T1-4 (Nordheimer), Jon the tinkerer T4").addTo(smelterGroup),
		L.marker([-1593.5,606.5], {icon: smelterIcon}).bindPopup("Smelter T1-4 (Cimmerian), Matias Snowmelt T4").addTo(smelterGroup),
		L.marker([-1948.75,1304.5], {icon: smelterIcon}).bindPopup("Smelter T1-4 (Nordheimer), Jon the tinkerer T4 - patrols the area").addTo(smelterGroup),

		//Thralls - Tanner
		L.marker([-3229.75,1301.25], {icon: tannerIcon}).bindPopup("Tanner T1-2 (Darfari)").addTo(tannerGroup),
		L.marker([-3000.5,1785.75], {icon: tannerIcon}).bindPopup("Tanner T1-2 (Darfari)").addTo(tannerGroup),
		L.marker([-2899.50,1428.0], {icon: tannerIcon}).bindPopup("Tanner T1-2 (Darfari)").addTo(tannerGroup),
		L.marker([-2699,484], {icon: tannerIcon}).bindPopup("Tanner T3-4 (Hyrkanian, Kushite, Shemite, Zamorian, Zingaran), Inigo the Vengeful T4").addTo(tannerGroup),
		L.marker([-2667,476.75], {icon: tannerIcon}).bindPopup("Tanner T1-3 (Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian, Zingaran)").addTo(tannerGroup),
		L.marker([-2660.25,2071], {icon: tannerIcon}).bindPopup("Tanner T1-4 (Cimmerian, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Zamorian, Zingaran), Valenso Da Reyn T4 - upper level").addTo(tannerGroup),
		L.marker([-2295.75,1258.25], {icon: tannerIcon}).bindPopup("Tanner T1-3 (Kushite, Shemite, Stygian, Zamorian)").addTo(tannerGroup),
		L.marker([-2606,481.5], {icon: tannerIcon}).bindPopup("Tanner T1-3 (Hyborian, Hyrkanian, Kushite, Shemite, Stygian, Zamorian, Zingaran)").addTo(tannerGroup),
		L.marker([-1957,1293.5], {icon: tannerIcon}).bindPopup("Tanner T1-4 (Nordheimer), Oskar Thunderhead T4").addTo(tannerGroup),
		L.marker([-1595.25,599.25], {icon: tannerIcon}).bindPopup("Tanner T1-4 (Cimmerian), Gratt Stinkfinker T4 - double spawn").addTo(tannerGroup),
		L.marker([-3284,2227.5], {icon: tannerIcon}).bindPopup("Tanner T1 (Cimmerian Darfari, Hyborian, Hyrkanian, Nordheimer, Kushite, Shemite, Stygian, Zamorian, Zingaran)").addTo(tannerGroup),

		//Thralls - Taskmaster
		L.marker([-3179.25,2317.5], {icon: taskmasterIcon}).bindPopup("Taskmaster T1 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian) - walk around the Exile camps").addTo(taskmasterGroup),
		L.marker([-3009,1763.5], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-3 (Darfari)").addTo(taskmasterGroup),
		L.marker([-2975.5,1845.75], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-3 (Darfari)").addTo(taskmasterGroup),
		L.marker([-2543.75,3256.75], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-3 (Darfari, Hyborian, Kushite, Nordheimer, Shemite, Stygian, Zamorian)").addTo(taskmasterGroup),
		L.marker([-2334.5,1223.5], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-3 (Kushite, Shemite, Stygian, Zamorian)").addTo(taskmasterGroup),
		L.marker([-2668,2221], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-4 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian), Vanko the Fearsome T4").addTo(taskmasterGroup),
		L.marker([-1966.75,1307.25], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-4 (Nordheimer), Manos, the handful T4").addTo(taskmasterGroup),
		L.marker([-1953,1270.5], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-4 (Nordheimer), Manos, the handful T4").addTo(taskmasterGroup),
		L.marker([-1890.75,1476.25], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-4 (Nordheimer), Manos, the handful T4").addTo(taskmasterGroup),
		L.marker([-1669.25,577.75], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-3 (Cimmerian)").addTo(taskmasterGroup),
		L.marker([-2473.25,3309.75], {icon: taskmasterIcon}).bindPopup("Taskmaster T1-3 (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian)").addTo(taskmasterGroup),
		L.marker([-2672.5,2120.25], {icon: taskmasterIcon}).bindPopup("Taskmaster T3-4 (Darfari, Shemite, Stygian, Zamorian), Vanko the Fearsome T4, Saddur the Slaver T4").addTo(taskmasterGroup),
		L.marker([-2632.5,385.5], {icon: taskmasterIcon}).bindPopup("Taskmaster T3-4 (Kushite, Shemite, Stygian, Zamorian), Beli the Breaker T4, Olena the Oathmaker T4").addTo(taskmasterGroup),

		//Thralls - Random
		L.marker([-2500.75,3246.5], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Zamorian, Zingaran").addTo(randomThrallGroup),
		L.marker([-3103.5,2621.75], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran) - walks around, spawns on top of the mountain").addTo(randomThrallGroup),
		L.marker([-2696.75,2538.5], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Smelter, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran").addTo(randomThrallGroup),
		L.marker([-2439.5,3354], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Zamorian, Zingaran").addTo(randomThrallGroup),
		L.marker([-2765.5,2936.75], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Kambujan, Kushite, Nordheimer, Shemite, Stygian, Zamorian, Zingaran) - double spawn").addTo(randomThrallGroup), // https://i.imgur.com/pYvX6pr.jpg
		L.marker([-2600.5,2131], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Smelter, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Zamorian, Zingaran").addTo(randomThrallGroup),
		L.marker([-2624.5,2133.5], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Smelter, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Zamorian, Zingaran").addTo(randomThrallGroup),
		L.marker([-2631.25,2142.5], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Smelter, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Zamorian, Zingaran").addTo(randomThrallGroup),
		L.marker([-2615.5,2115.25], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Smelter, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Zamorian, Zingaran").addTo(randomThrallGroup),
		L.marker([-2502.75,3253.25], {icon: randomThrallIcon}).bindPopup("Random T1-3 thrall between Armorer, Blacksmith, Carpenter, Cook, Dancer, Tanner (Cimmerian, Darfari, Hyborian, Hyrkanian, Nordheimer, Zamorian, Zingaran").addTo(randomThrallGroup),
		L.marker([-3049.75,3374.75], {icon: randomThrallIcon}).bindPopup("Random T1-4 Armorer, Blacksmith, Cook, Priest, Tanner, Taskmaster (Lemurian, Derketo) - double spawn at bonfire").addTo(randomThrallGroup), // west bonfire
		L.marker([-3043.75,3409.5], {icon: randomThrallIcon}).bindPopup("Random T1-4 Armorer, Blacksmith, Cook, Priest, Tanner, Taskmaster (Lemurian, Derketo) - double spawn at bonfire").addTo(randomThrallGroup), // east bonfire

		//Named Thralls - Alchemist
		L.marker([-1181,1668.5], {icon: cookIcon}).bindPopup("Sayd Secretkeeper T4 (Alchemist)").addTo(namedAlchemistGroup),
		L.marker([-1949,945.75], {icon: cookIcon}).bindPopup("Rokur the Alchemist T4 (Alchemist)").addTo(namedAlchemistGroup), // https://i.imgur.com/uB7WoXF.jpg
		L.marker([-1635.75,605.75], {icon: cookIcon}).bindPopup("Alchemist T1-4 (Cimmerian), Darmok the Experimenter T4").addTo(namedAlchemistGroup), // https://i.imgur.com/hssJ2GS.jpg
		L.marker([-1976.75,1312.25], {icon: cookIcon}).bindPopup("Rokur the Alchemist T4 (Nordheimer Alchemist)").addTo(namedAlchemistGroup), // https://i.imgur.com/mHEXUqk.jpg
		L.marker([-1938,1282], {icon: cookIcon}).bindPopup("Rokur the Alchemist T4 (Nordheimer Alchemist) - double spawn").addTo(namedAlchemistGroup), // https://i.imgur.com/hsR1TTW.jpg


		//Named Thralls - Archer
		L.marker([-2558.75,3262.75], {icon: archerIcon}).bindPopup("Sarnai the Thorn T4 (Black Hand Archer)<br>Cristian the Blade T4 (Black Hand Archer)<br>Iekika the Visionary T4 (Black Hand Archer)<br><li>Health : 825").addTo(namedArcherGroup),
		L.marker([-2102,1711], {icon: archerIcon}).bindPopup("Freya T4 (Nordheimer Archer)<br><li>Health : 1350").addTo(namedArcherGroup),
		L.marker([-2335.75,1109.25], {icon: archerIcon}).bindPopup("Du'neman the Dragoon T4 (Dogs of the Desert Archer)<br><li>Health : 975<br><br>Spawns on top, patrols the area").addTo(namedArcherGroup), // https://i.imgur.com/eIg5rtV.jpg
		L.marker([-1184.25,1636.75], {icon: archerIcon}).bindPopup("Vais the Wayfaerer T4 (Votaries Archer)<br>Anos Preyfinder T4 (Votaries Archer)<br><li>Health : 3075<br><br>Shared spawn with Cimmerian Archer T1-2 & Hyborian Archer T3").addTo(namedArcherGroup), // https://i.imgur.com/VqyZfUv.jpg // https://i.imgur.com/eaHbHG7.jpg
		L.marker([-2663.5,2065.75], {icon: archerIcon}).bindPopup("Galter of Bossonia T4 (Black Hand Archer)<br>Conchaka of Hyrkania T4 (Black Hand Archer)<br><li>Health : 750<br><br>Middle level, shared spawn with T3 Archer").addTo(namedArcherGroup), // https://i.imgur.com/3466YrO.jpg
		L.marker([-3039.75,3355], {icon: archerIcon}).bindPopup("Alren Storm T4 (Lemurian Archer)<br>Lissira T4 (Lemurian Archer)<br><li>Health : 750<br><br>Shared spawn with Lemurian Archer T3").addTo(namedArcherGroup), // https://i.imgur.com/BAZ2jeX.jpg

		//Named Thralls - Armorer
		L.marker([-2280.25,1274.25], {icon: armorerIcon}).bindPopup("Legendary Armorer T4 (Kushite Armorer), Llarn Steeltoe T4 (Kambujan Armorer)").addTo(namedArmorerGroup), // https://i.imgur.com/zGbunYX.jpg // https://i.imgur.com/Bv2bDq3.jpg
		L.marker([-3054.25,3352], {icon: armorerIcon}).bindPopup("Fia T4 (Lemurian Armorer)").addTo(namedArmorerGroup), // https://i.imgur.com/rCJ9UEG.jpg
		L.marker([-3032.5,3346.75], {icon: armorerIcon}).bindPopup("Fia T4 (Lemurian Armorer)").addTo(namedArmorerGroup), // https://i.imgur.com/89pSez0.jpg
		L.marker([-3005,1236], {icon: armorerIcon}).bindPopup("B'naru Heavyhands T4 (Darfari Armorer)").addTo(namedArmorerGroup), // https://i.imgur.com/cGWcUTf.jpg
		L.marker([-3008,1759], {icon: armorerIcon}).bindPopup("B'naru Heavyhands T4 (Darfari Armorer) - spawns upstairs, walks around").addTo(namedArmorerGroup), // https://i.imgur.com/NAM7y47.jpg
		L.marker([-2648,2100], {icon: armorerIcon}).bindPopup("Irniz of the Furnace T4 (Zamorian Armorer), Ogrus Iron-Eater T4 (Darfari Armorer), Shendelzare T4 (Kambujan Armorer), Joka Ironfist T4 (Hyborian Armorer), Jehungir Horseshoe T4 (Hyrkanian Armorer) - double spawn (middle and upper level)").addTo(namedArmorerGroup), // https://i.imgur.com/J93tMPn.jpg // https://i.imgur.com/Iw2QGy7.jpg // https://i.imgur.com/85u3MM5.jpg // https://i.imgur.com/EF88mw4.jpg // https://i.imgur.com/w4Qy5n8.jpg
		L.marker([-2731,438.5], {icon: armorerIcon}).bindPopup("Arcen Brokenfingers T4 (Shemite Armorer), Diana Steelshaper T4 (Hyborian Armorer), Ghamm the worn T4 (Zamorian Armorer), Hanar of Bossonia T4 (Aquilonian Armorer), Than Hammerblow T4 (Hyrkanian Armorer), Zoara of the Marshes T4 (Stygian Armorer)").addTo(namedArmorerGroup), // https://i.imgur.com/IdaSTay.jpg // https://i.imgur.com/USGhJvl.jpg // https://i.imgur.com/U8jQW5y.jpg // https://i.imgur.com/mAUsZvH.jpg
		L.marker([-2724.25,451.25], {icon: armorerIcon}).bindPopup("Arcen Brokenfingers T4 (Shemite Armorer), Diana Steelshaper T4 (Hyborian Armorer), Ghamm the worn T4 (Zamorian Armorer), Hanar of Bossonia T4 (Aquilonian Armorer), Than Hammerblow T4 (Hyrkanian Armorer), Zoara of the Marshes T4 (Stygian Armorer)").addTo(namedArmorerGroup), // https://i.imgur.com/DitnMpl.jpg // https://i.imgur.com/Jzyjuxp.jpg // https://i.imgur.com/L9JqZN6.jpg // https://i.imgur.com/4jTJTXu.jpg // bhttps://i.imgur.com/wixj9pj.jpg
		L.marker([-3049.75,3374.75], {icon: armorerIcon}).bindPopup("Fia T4 (Lemurian Armorer) - part of random thrall spawns at bonfire").addTo(namedArmorerGroup), // https://i.imgur.com/MVrzAD5.jpg
		L.marker([-3043.75,3409.5], {icon: armorerIcon}).bindPopup("Fia T4 (Lemurian Armorer) - part of random thrall spawns at bonfire").addTo(namedArmorerGroup), // https://i.imgur.com/MVrzAD5.jpg
		L.marker([-1588.25,604.75], {icon: armorerIcon}).bindPopup("Werk of the lost tribe T4 (Cimmerian Armorer)").addTo(namedArmorerGroup), // https://i.imgur.com/5Bq8BXJ.jpg
		L.marker([-1948,1314], {icon: armorerIcon}).bindPopup("Njoror Battleborn T4 (Nordheimer Armorer)").addTo(namedArmorerGroup), // https://i.imgur.com/6Z3nA4o.jpg

		//Named Thralls - Bearer
		L.marker([-2608,475], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/pa3RnIi.jpg // https://i.imgur.com/fz8hopn.jpg // https://i.imgur.com/XF2Uhos.jpg // https://i.imgur.com/xsl2nmY.jpg // https://i.imgur.com/oNcNhw3.jpg
		L.marker([-1954.25,951], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/ry6gffX.jpg // https://i.imgur.com/LS5RyDg.jpg
		L.marker([-2097,1418.75], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/otrSIae.jpg
		L.marker([-1887.5,1485.75], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/Ryijlpr.jpg
		L.marker([-1803.75,608.75], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup),
		L.marker([-1629,533.25], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup),
		L.marker([-1664.75,575.25], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/WYZtsGQ.jpg
		L.marker([-1577.5,709.5], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/bAAHcI4.jpg
		L.marker([-3344,2012.25], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/1WyniF7.jpg
		L.marker([-3202,1084.25], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer) - walks around").addTo(namedSherpaGroup), // https://i.imgur.com/IMcO5TL.jpg // https://i.imgur.com/zUrLmqh.jpg
		L.marker([-3219.75,1316.75], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/zwh5YhK.jpg
		L.marker([-2764.25,2951.25], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer) - in the cave, walks around").addTo(namedSherpaGroup), // https://i.imgur.com/hghK86f.jpg
		L.marker([-3084.5,2121.75], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/PIORAOJ.jpg
		L.marker([-3011,1240], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/Pp7RyJV.jpg
		L.marker([-3010.75,1768.5], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/nSlgVRl.jpg
		L.marker([-2993.5,1841.75], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/6Nu9dnC.jpg
		L.marker([-2618,2127], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/UmMSIuR.jpg
		L.marker([-2634.5,2148.75], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/5ywgWNH.jpg
		L.marker([-2597,1772.75], {icon: sherpaIcon}).bindPopup("Random T4 (Bearer)").addTo(namedSherpaGroup), // https://i.imgur.com/G1B3hcq.jpg

		//Named Thralls - Blacksmith
		L.marker([-1255,1724], {icon: blacksmithIcon}).bindPopup("Secas the Smith T4 (Blacksmith)").addTo(namedBlacksmithGroup),
		L.marker([-2588,554.75], {icon: blacksmithIcon}).bindPopup("Hyam Hammerhand T4 (Shemite Blacksmith)").addTo(namedBlacksmithGroup), // https://i.imgur.com/u9FRF0f.jpg
		L.marker([-2289.5,1213.75], {icon: blacksmithIcon}).bindPopup("Talitha Goldfingers T4 (Shemite Blacksmith)").addTo(namedBlacksmithGroup), // https://i.imgur.com/NFCZOUJ.jpg
		L.marker([-2090,1716.25], {icon: blacksmithIcon}).bindPopup("Beri T4 (Nordheimer Blacksmith)").addTo(namedBlacksmithGroup), // https://i.imgur.com/Db21vs2.jpg
		L.marker([-2654.25,2102.25], {icon: blacksmithIcon}).bindPopup("Arvad of Akbitan T4 (Shemite Blacksmith) - middle level").addTo(namedBlacksmithGroup), // https://i.imgur.com/zfpVt0Z.jpg
		L.marker([-3049.75,3374.75], {icon: blacksmithIcon}).bindPopup("Aisss T4 (Lemurian Blacksmith) - part of random thrall spawns at bonfire").addTo(namedBlacksmithGroup), // https://i.imgur.com/CTGTY7d.jpg
		L.marker([-3043.75,3409.5], {icon: blacksmithIcon}).bindPopup("Aisss T4 (Lemurian Blacksmith) - part of random thrall spawns at bonfire").addTo(namedBlacksmithGroup), // https://i.imgur.com/CTGTY7d.jpg
		L.marker([-1617.5,558.75], {icon: blacksmithIcon}).bindPopup("Vulfeles the Hammer T4 (Cimmerian Blacksmith)").addTo(namedBlacksmithGroup), // https://i.imgur.com/XcxPJHz.jpg
		L.marker([-1619.75,537], {icon: blacksmithIcon}).bindPopup("Vulfeles the Hammer T4 (Cimmerian Blacksmith)").addTo(namedBlacksmithGroup),
		L.marker([-1988.25,1318.5], {icon: blacksmithIcon}).bindPopup("Beri T4 (Nordheimer Blacksmith)").addTo(namedBlacksmithGroup), // https://i.imgur.com/E0QFjmi.jpg
		L.marker([-1956,1311.25], {icon: blacksmithIcon}).bindPopup("Beri T4 (Nordheimer Blacksmith)").addTo(namedBlacksmithGroup), // https://i.imgur.com/70h02fu.jpg
		L.marker([-1878.5,1480.5], {icon: blacksmithIcon}).bindPopup("Beri T4 (Nordheimer Blacksmith)").addTo(namedBlacksmithGroup), // https://i.imgur.com/tnTqMue.jpg
		L.marker([-1864.75,1317.75], {icon: blacksmithIcon}).bindPopup("Beri T4 (Nordheimer Blacksmith)").addTo(namedBlacksmithGroup), // https://i.imgur.com/wNMdypG.jpg
		L.marker([-2885,2115.5], {icon: blacksmithIcon}).bindPopup("Arvad of Akbitan T4 (Shemite Blacksmith)").addTo(namedBlacksmithGroup), // https://i.imgur.com/yb1dF7P.jpg
		L.marker([-2663,2209.75], {icon: blacksmithIcon}).bindPopup("Arvad of Akbitan T4 (Shemite Blacksmith)").addTo(namedBlacksmithGroup),
		L.marker([-2588,1785.25], {icon: blacksmithIcon}).bindPopup("Talitha Goldfingers T4 (Shemite Blacksmith) - walks around").addTo(namedBlacksmithGroup),		

		//Named Thralls - Carpenter
		L.marker([-2458.75,3303.5], {icon: carpenterIcon}).bindPopup("Sigyn the Woodworker T4 (Carpenter)").addTo(namedCarpenterGroup), // https://i.imgur.com/QuEKZtu.jpg
		L.marker([-2415.75,3369.5], {icon: carpenterIcon}).bindPopup("Sigyn the Woodworker T4 (Carpenter)").addTo(namedCarpenterGroup),
		L.marker([-3054,3354.5], {icon: carpenterIcon}).bindPopup("Poscore Nimblefingers T4 (Carpenter)").addTo(namedCarpenterGroup), // https://i.imgur.com/t6eGF9P.jpg
		L.marker([-2663,2084.5], {icon: carpenterIcon}).bindPopup("Sigyn the Woodworker T4 (Carpenter), Rayne O' the Rosewood T4 (Carpenter) - lower level").addTo(namedCarpenterGroup), // https://i.imgur.com/jDRELhI.jpg // https://i.imgur.com/QTYFi6z.jpg
		L.marker([-1650.5,540.25], {icon: carpenterIcon}).bindPopup("Acastel Ninefingers T4 (Cimmerian Carpenter)").addTo(namedCarpenterGroup), // https://i.imgur.com/NeDwGiG.jpg
		L.marker([-1952.5,1321.75], {icon: carpenterIcon}).bindPopup("Airk Strong-in-the-arm T4 (Nordheimer Carpenter)").addTo(namedCarpenterGroup), // https://i.imgur.com/hWdSbqK.jpg
		L.marker([-1938.25,1317.25], {icon: carpenterIcon}).bindPopup("Airk Strong-in-the-arm T4 (Nordheimer Carpenter)").addTo(namedCarpenterGroup), // https://i.imgur.com/dRc7nG1.jpg
		L.marker([-1857.5,1312.5], {icon: carpenterIcon}).bindPopup("Airk Strong-in-the-arm T4 (Nordheimer Carpenter)").addTo(namedCarpenterGroup),
		L.marker([-3116,2144.25], {icon: carpenterIcon}).bindPopup("Sigyn the Woodworker T4 (Carpenter)").addTo(namedCarpenterGroup), // https://i.imgur.com/qkcdFY9.jpg
		L.marker([-2702.25, 2540.5], {icon: carpenterIcon}).bindPopup("Rayne O' the Rosewood T4 (Carpenter)").addTo(namedCarpenterGroup), // https://i.imgur.com/jmgdypV.jpg

		//Named Thralls - Cook
		L.marker([-1187.5,1671.5], {icon: cookIcon}).bindPopup("Ennis the Gobbler T4 (Cook)").addTo(namedCookGroup),
		L.marker([-2640,445], {icon: cookIcon}).bindPopup("Bragoras the Baker T4 (Cook)").addTo(namedCookGroup), // https://i.imgur.com/ykMiZqx.jpg
		L.marker([-2507.25,3220], {icon: cookIcon}).bindPopup("Vatessa the Potent T4 (Cook)").addTo(namedCookGroup), // https://i.imgur.com/jlfZaKa.jpg
		L.marker([-2465,3285.25], {icon: cookIcon}).bindPopup("Vatessa the Potent T4 (Cook)").addTo(namedCookGroup), // https://i.imgur.com/6R4TILS.jpg
		L.marker([-3057.75,3349.25], {icon: cookIcon}).bindPopup("Gnash the Hungry T4 (Lemurian Cook)").addTo(namedCookGroup), // https://i.imgur.com/Rb72P6X.jpg
		L.marker([-2667,2100.25], {icon: cookIcon}).bindPopup("Vatessa the Potent T4 (Cook) - lower level").addTo(namedCookGroup), // https://i.imgur.com/gwr1lON.jpg
		L.marker([-3049.75,3374.75], {icon: cookIcon}).bindPopup("Gnash the hungry T4 (Lemurian Cook)<br><br>Part of random thrall spawns at bonfire").addTo(namedCookGroup), // https://i.imgur.com/O0zU8Kr.jpg
		L.marker([-3043.75,3409.5], {icon: cookIcon}).bindPopup("Gnash the hungry T4 (Lemurian Cook)<br><br>Part of random thrall spawns at bonfire").addTo(namedCookGroup), // https://i.imgur.com/O0zU8Kr.jpg
		L.marker([-1953.25,1297.5], {icon: cookIcon}).bindPopup("Rikkart the Baker T4 (Nordheimer Cook)").addTo(namedCookGroup), // https://i.imgur.com/54T6BW8.jpg
		L.marker([-2171.25,1545.5], {icon: cookIcon}).bindPopup("Rikkart the Baker T4 (Nordheimer Cook)").addTo(namedCookGroup),
		L.marker([-1980.25,1291.5], {icon: cookIcon}).bindPopup("Rikkart the Baker T4 (Nordheimer Cook)").addTo(namedCookGroup),
		L.marker([-2264.75,2956], {icon: cookIcon}).bindPopup("Vatessa the Potent T4 (Cook)").addTo(namedCookGroup),
		L.marker([-2760.25,2925.25], {icon: cookIcon}).bindPopup("Vatessa the Potent T4 (Cook)").addTo(namedCookGroup),
		L.marker([-2938.5,2775], {icon: cookIcon}).bindPopup("Galacus the Gourmand T4 (Hyborian Cook)").addTo(namedCookGroup), // https://i.imgur.com/etZuWrZ.jpg
		L.marker([-3096.25,2112.5], {icon: cookIcon}).bindPopup("Vatessa the Potent T4 (Cook)").addTo(namedCookGroup), // https://i.imgur.com/gdttkOA.jpg
		L.marker([-2720,2219.5], {icon: cookIcon}).bindPopup("Vatessa the Potent T4 (Cook)").addTo(namedCookGroup), // https://i.imgur.com/5qy8rf0.jpg

		//Named Thralls - Entertainer
		L.marker([-2602.5,479.5], {icon: entertainerIcon}).bindPopup("Luba the Luscious T4 (Entertainer)<br>Thutmekri the Dramatist T4 (Entertainer)").addTo(namedEntertainerGroup), // https://i.imgur.com/AIbIRt0.jpg // https://i.imgur.com/VVt7ylY.jpg
		L.marker([-2345.25,1213.25], {icon: entertainerIcon}).bindPopup("Ionna the Seductress T4 (Entertainer)<br>Sadeh the Lithe T4 (Entertainer)").addTo(namedEntertainerGroup), // https://i.imgur.com/Cj0vWEO.jpg // https://i.imgur.com/fA7R1my.jpg
		L.marker([-2545,3224.25], {icon: entertainerIcon}).bindPopup("Danyo the Seductive T4 (Entertainer)<br>Imiu of Derkheto T4 (Entertainer)").addTo(namedEntertainerGroup), // https://i.imgur.com/ZtVxRw4.jpg // https://i.imgur.com/erea2XN.jpg
		L.marker([-2446.25,3350.75], {icon: entertainerIcon}).bindPopup("Danyo the Seductive T4 (Entertainer)<br>Imiu of Derkheto T4 (Entertainer)").addTo(namedEntertainerGroup), // https://i.imgur.com/IOUeSJA.jpg // https://i.imgur.com/erea2XN.jpg
		L.marker([-3058.75,3350.25], {icon: entertainerIcon}).bindPopup("Varkin Fleetfoot T4 (Entertainer)").addTo(namedEntertainerGroup), // https://i.imgur.com/YVYNxjp.jpg
		L.marker([-2666.5,2125], {icon: entertainerIcon}).bindPopup("Danyo the Seductive T4 (Entertainer)<br>Imiu of Derkheto T4 (Entertainer)").addTo(namedEntertainerGroup), // https://i.imgur.com/vySAFB2.jpg // https://i.imgur.com/KZwAe6e.jpg
		L.marker([-1789,1417], {icon: entertainerIcon}).bindPopup("Oyvind Tall-tree T4 (Nordheimer Entertainer)").addTo(namedEntertainerGroup), // https://i.imgur.com/oD4X1uo.jpg
		L.marker([-1874.75,1312.5], {icon: entertainerIcon}).bindPopup("Oyvind Tall-tree T4 (Nordheimer Entertainer)").addTo(namedEntertainerGroup),
		L.marker([-1940.5,1328.5], {icon: entertainerIcon}).bindPopup("Oyvind Tall-tree T4 (Nordheimer Entertainer)").addTo(namedEntertainerGroup), // https://i.imgur.com/gHDGVKm.jpg
		L.marker([-2267.25,2952.25], {icon: entertainerIcon}).bindPopup("Danyo the Seductive T4 (Entertainer)<br>Imiu of Derkheto T4 (Entertainer)").addTo(namedEntertainerGroup),
		//Named Thralls - Fighter
		L.marker([-2903.25,2258.75], {icon: warriorIcon}).bindPopup("Tarman T4 (Black Hand Fighter)<br><li>Health : 750").addTo(namedFighterGroup),
		L.marker([-2777,1775.25], {icon: warriorIcon}).bindPopup("Thugra T4 (Darfari Fighter)<br><li>Health : 600").addTo(namedFighterGroup),
		L.marker([-3042.25,3360.5], {icon: warriorIcon}).bindPopup("Mei the Blade T4 (Lemurian Fighter)<br>Waros the Breaker T4 (Lemurian Fighter)<br><li>Health : 750").addTo(namedFighterGroup),
		L.marker([-2409,3368.25], {icon: warriorIcon}).bindPopup("Gall O' the Spear-Din T4 (Black Hand Fighter)<br>Hekkr Waverunner T4 (Black HandFighter)<br><li>Health : 825").addTo(namedFighterGroup),
		L.marker([-2671.25,2141], {icon: warriorIcon}).bindPopup("Black Hand Captain T4 (Black Hand Fighter)<br>Captain Ioushuwa T4 (Black Hand Fighter)<br><li>Health : 750").addTo(namedFighterGroup), // https://i.imgur.com/QdZFNTN.jpg
		L.marker([-2695.5,1824.25], {icon: warriorIcon}).bindPopup("N'batu T4 (Dogs of the Desert Fighter)<br><li>Health : 975").addTo(namedFighterGroup),
		L.marker([-1941,1538.5], {icon: warriorIcon}).bindPopup("Lian T4 (Nordheimer Fighter)<br><li>Health : 1350").addTo(namedFighterGroup),
		L.marker([-2640.5,536.25], {icon: warriorIcon}).bindPopup("Captain T4 (Relic Hunter Fighter)<br><li>Health : 1275<br><br>Patrols the area").addTo(namedFighterGroup), // https://i.imgur.com/oAPbmAL.jpg
		L.marker([-1171.25,1618.25], {icon: warriorIcon}).bindPopup("Spinas the Marauder T4 (Votaries Fighter)<br>Daicas the Sharp T4 (Votaries Fighter)<br><li>Health : 3075<br><br>Shared spawn with Zamorian Fighter T1, Zingaran Fighter T2 & Hyborian Fighter T3").addTo(namedFighterGroup), // https://i.imgur.com/h33umvU.jpg // https://i.imgur.com/2icyJLS.jpg
		L.marker([-980.5,1542.25], {icon: warriorIcon}).bindPopup("Spinas the Marauder T4 (Votaries Fighter)<br>Daicas the Sharp T4 (Votaries Fighter)<br><li>Health : 3075<br><br>Shared spawn with Zamorian Fighter T1, Zingaran Fighter T2 & Hyborian Fighter T3<br><br>Spawns on the 2nd floor and walks around").addTo(namedFighterGroup), // https://i.imgur.com/9m7Fe2I.jpg
		L.marker([-1255.25,1598.25], {icon: warriorIcon}).bindPopup("Spinas the Marauder T4 (Votaries Fighter)<br>Daicas the Sharp T4 (Votaries Fighter)<br><li>Health : 3075<br><br>Shared spawn with Zamorian Fighter T1, Zingaran Fighter T2 & Hyborian Fighter T3").addTo(namedFighterGroup), // https://i.imgur.com/if7L6ZA.jpg
		L.marker([-1273.75, 1626.5], {icon: warriorIcon}).bindPopup("Spinas the Marauder T4 (Votaries Fighter)<br>Daicas the Sharp T4 (Votaries Fighter)<br><li>Health : 3075<br><br>Shared spawn with Zamorian Fighter T1, Zingaran Fighter T2 & Hyborian Fighter T3<br><br>Walks around the bridge").addTo(namedFighterGroup), // https://i.imgur.com/QzJwnvv.jpg
		L.marker([-1311.75,1625], {icon: warriorIcon}).bindPopup("Spinas the Marauder T4 (Votaries Fighter)<br>Daicas the Sharp T4 Votaries (Fighter)<br><li>Health : 3075<br><br>Shared spawn with Zamorian Fighter T1, Zingaran Fighter T2 & Hyborian Fighter T3<br><br>Walks the road").addTo(namedFighterGroup), // https://i.imgur.com/uckco5r.jpg
		L.marker([-1669,582.25], {icon: warriorIcon}).bindPopup("Dalinsia Snowhunter T4 (Cimmerian Fighter)<br><li>Health : 2025<br><br>Shared spawn with Cimmerian Fighter T1-3").addTo(namedFighterGroup), // https://i.imgur.com/8a1v9yx.jpg
		L.marker([-3222.75,1137.5], {icon: warriorIcon}).bindPopup("Ritualist T4 (Darfari Fighter)<br><li>Health : 600").addTo(namedFighterGroup), // https://i.imgur.com/hgXgRmj.jpg
		L.marker([-2910.5,2136], {icon: warriorIcon}).bindPopup("Sully T4 (Black Hand Fighter)<br><li>Health : 750").addTo(namedFighterGroup), // https://i.imgur.com/wEaW03b.jpg
		L.marker([-2687,2564], {icon: warriorIcon}).bindPopup("Gall O' the Spear-Din T4 (Black Hand Fighter)<br>Hekkr Waverunner T4 (Black HandFighter)<br><li>Health : 825<br><br>Shared spawn with T3 fighter").addTo(namedFighterGroup), // https://i.imgur.com/YAifyZ7.jpg
		L.marker([-1644.75,629.25], {icon: warriorIcon}).bindPopup("Cimmerian Berserker T4 (Cimmerian Fighter)<br><li>Health : 2025<br><br>Walks around the area").addTo(namedFighterGroup), // https://i.imgur.com/UezK0s6.jpg
		L.marker([-1195,1768], {icon: warriorIcon}).bindPopup("Vathis the Hierophant T4 (Votaries Fighter)<br><li>Health : 3075").addTo(namedFighterGroup), // https://i.imgur.com/2APeZC5.jpg

		//Named Thralls - Priest
		L.marker([-3049.75,3374.75], {icon: priestIcon}).bindPopup("Espel the Glorious T4 (Derketo Priest), Ketmet the Whisperer T4 (Derketo Priest), Jaden Rousch the Epiphaneous T4 (Derketo Priest), Menhas, Walker of the Path T4 (Derketo Priest) - part of random thrall spawns at bonfire").addTo(namedPriestGroup), // https://i.imgur.com/WDnfDxl.jpg // https://i.imgur.com/mOP0iQx.jpg // https://i.imgur.com/oRHNrUM.jpg
		L.marker([-3043.75,3409.5], {icon: priestIcon}).bindPopup("Espel the Glorious T4 (Derketo Priest), Ketmet the Whisperer T4 (Derketo Priest), Jaden Rousch the Epiphaneous T4 (Derketo Priest), Menhas, Walker of the Path T4 (Derketo Priest) - part of random thrall spawns at bonfire").addTo(namedPriestGroup), // https://i.imgur.com/WDnfDxl.jpg // https://i.imgur.com/mOP0iQx.jpg // https://i.imgur.com/oRHNrUM.jpg

		//Named Thralls - Smelter
		L.marker([-2701.25, 417.75], {icon: smelterIcon}).bindPopup("Daya Leaddrinker T4 (Smelter)").addTo(namedSmelterGroup), // https://i.imgur.com/oQNnjcF.jpg
		L.marker([-2284,1209.25], {icon: smelterIcon}).bindPopup("Yael of Shem T4 (Smelter)").addTo(namedSmelterGroup), // https://i.imgur.com/71wLHxX.jpg
		L.marker([-2653.5,2096.5], {icon: smelterIcon}).bindPopup("Fingal Firetender T4 (Smelter), Idra Sparkeyes T4 (Smelter) - middle level").addTo(namedSmelterGroup), // https://i.imgur.com/LogdxDG.jpg // https://i.imgur.com/d3N7vgJ.jpg
		L.marker([-3049.75,3374.75], {icon: smelterIcon}).bindPopup("Alakar Burning-Hands T4 (Smelter) - part of random thrall spawns at bonfire").addTo(namedSmelterGroup),
		L.marker([-3043.75,3409.5], {icon: smelterIcon}).bindPopup("Alakar Burning-Hands T4 (Smelter) - part of random thrall spawns at bonfire").addTo(namedSmelterGroup),
		L.marker([-1593.5,606.5], {icon: smelterIcon}).bindPopup("Matias Snowmelt T4 (Cimmerian Smelter)").addTo(namedSmelterGroup), // https://i.imgur.com/5s4NUtf.jpg
		L.marker([-1982.25,1320.5], {icon: smelterIcon}).bindPopup("Jon the tinkerer T4 (Nordheimer Smelter)").addTo(namedSmelterGroup), // https://i.imgur.com/tjAltqE.jpg
		L.marker([-1948.75,1304.5], {icon: smelterIcon}).bindPopup("Jon the tinkerer T4 (Nordheimer Smelter) - patrols the area").addTo(namedSmelterGroup), // https://i.imgur.com/8jJsR2a.jpg
		L.marker([-2879.75,2118.5], {icon: smelterIcon}).bindPopup("Fingal Firetender T4 (Smelter)").addTo(namedSmelterGroup),

		//Named Thralls - Tanner
		L.marker([-2699,484], {icon: tannerIcon}).bindPopup("Inigo the Vengeful T4 (Tanner)").addTo(namedTannerGroup), // https://i.imgur.com/qEhq07f.jpg
		L.marker([-964,1530.25], {icon: tannerIcon}).bindPopup("Firis Flickertongue T4 (Tanner)").addTo(namedTannerGroup), // https://i.imgur.com/OkXIcQV.jpg
		L.marker([-2660.25,2071], {icon: tannerIcon}).bindPopup("Valenso Da Reyn T4 (Tanner) - upper level").addTo(namedTannerGroup), // https://i.imgur.com/Fc6dNRP.jpg
		L.marker([-3049.75,3374.75], {icon: tannerIcon}).bindPopup("Hell Breath T4 (Tanner) - part of random thrall spawns at bonfire").addTo(namedTannerGroup), // https://i.imgur.com/lKl2nKq.jpg
		L.marker([-3043.75,3409.5], {icon: tannerIcon}).bindPopup("Hell Breath T4 (Tanner) - part of random thrall spawns at bonfire").addTo(namedTannerGroup), // https://i.imgur.com/lKl2nKq.jpg
		L.marker([-1595.25,599.25], {icon: tannerIcon}).bindPopup("Gratt Stinkfinker T4 (Cimmerian Tanner) - double spawn").addTo(namedTannerGroup), // https://i.imgur.com/sbVPAEx.jpg
		L.marker([-1957,1293.5], {icon: tannerIcon}).bindPopup("Oskar Thunderhead T4 (Nordheimer Tanner)").addTo(namedTannerGroup), // https://i.imgur.com/wMij9eB.jpg

		//Named Thralls - Taskmaster
		L.marker([-2632.5,385.5], {icon: taskmasterIcon}).bindPopup("Beli the Breaker T4 (Shemite Taskmaster), Olena the Oathmaker T4 (Zamorian Taskmaster)").addTo(namedTaskmasterGroup), // https://i.imgur.com/wUZbppK.jpg // https://i.imgur.com/1Q3d7sN.jpg
		L.marker([-967.5,1549.75], {icon: taskmasterIcon}).bindPopup("Risa the Brutal T4 (Taskmaster), walks around or dies to lava").addTo(namedTaskmasterGroup),
		L.marker([-2672.5,2120.25], {icon: taskmasterIcon}).bindPopup("Vanko the Fearsome T4 (Zamorian Taskmaster), Saddur the Slaver T4 (Shemite Taskmaster)").addTo(namedTaskmasterGroup), // https://i.imgur.com/39tsrGQ.jpg // https://i.imgur.com/R1iVEzI.jpg
		L.marker([-3049.75,3374.75], {icon: taskmasterIcon}).bindPopup("Roknori the Unmerciful T4 (Lemurian Taskmaster) - part of random thrall spawns at bonfire").addTo(namedTaskmasterGroup), // https://i.imgur.com/rO9O756.jpg
		L.marker([-3043.75,3409.5], {icon: taskmasterIcon}).bindPopup("Roknori the Unmerciful T4 (Lemurian Taskmaster) - part of random thrall spawns at bonfire").addTo(namedTaskmasterGroup), // https://i.imgur.com/rO9O756.jpg
		L.marker([-1953,1270.5], {icon: taskmasterIcon}).bindPopup("Manos, the handful T4 (Nordheimer Taskmaster)").addTo(namedTaskmasterGroup),
		L.marker([-1966.75,1307.25], {icon: taskmasterIcon}).bindPopup("Manos, the handful T4 (Nordheimer Taskmaster)").addTo(namedTaskmasterGroup), // https://i.imgur.com/pNzFsLL.jpg
		L.marker([-1890.75,1476.25], {icon: taskmasterIcon}).bindPopup("Manos, the handful T4 (Nordheimer Taskmaster)").addTo(namedTaskmasterGroup),
		L.marker([-2668,2221], {icon: taskmasterIcon}).bindPopup("Vanko the Fearsome T4 (Taskmaster)").addTo(namedTaskmasterGroup),

		//Named Thralls - Random
		L.marker([-3049.75,3374.75], {icon: randomThrallIcon}).bindPopup("Random T4 Armorer, Blacksmith, Cook, Priest (Derketo), Tanner, Taskmaster (Lemurian) - part of random thrall spawns at bonfire").addTo(namedRandomThrallGroup),
		L.marker([-3043.75,3409.5], {icon: randomThrallIcon}).bindPopup("Random T4 Armorer, Blacksmith, Cook, Priest (Derketo), Tanner, Taskmaster (Lemurian) - part of random thrall spawns at bonfire").addTo(namedRandomThrallGroup),

		//Location - Dungeons
		L.marker([-3249.5,996.5], {icon: dungeonIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/The_Dregs' target='_blank'>The Dregs</a>").addTo(dungeonGroup),
		L.marker([-2901.25,3366.75], {icon: dungeonIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Palace_of_the_Witch_Queen' target='_blank'>Palace of the Witch Queen</a>").addTo(dungeonGroup),
		L.marker([-2179.75,2499.25], {icon: dungeonIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/The_Passage' target='_blank'>The Passage</a>").addTo(dungeonGroup),
		L.marker([-1526.5,1377], {icon: dungeonIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Black_Keep' target='_blank'>The Black Keep</a>").addTo(dungeonGroup),
		L.marker([-1550.5,1283], {icon: dungeonIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Undergate' target='_blank'>Undergate</a> - Entrance requires swimming under ice.").addTo(dungeonGroup),
		L.marker([-969,1537], {icon: dungeonIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/The_Well_of_Skelos' target='_blank'>The Well of Skelos</a>").addTo(dungeonGroup),
		L.marker([-2881,3409], {icon: dungeonIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/The_Sunken_City' target='_blank'>The Sunken City</a>").addTo(dungeonGroup),
		
		//Location - Caves
		L.marker([-3271,1318.5], {icon: caveIcon}).bindPopup("Cavern of Fiends - Demon Blood, Crystals").addTo(caveGroup),
		L.marker([-3160,1705.25], {icon: caveIcon}).bindPopup("Sinner's Refuge - Brimstone").addTo(caveGroup),
		L.marker([-3496,1905], {icon: caveIcon}).bindPopup("Hanuman's Grotto - Demon Blood, Crystals").addTo(caveGroup),
		L.marker([-3181.5,1901], {icon: caveIcon}).bindPopup("Gallaman's Tomb - Brimstone").addTo(caveGroup),
		L.marker([-2513.25,2304], {icon: caveIcon}).bindPopup("Xalthar's Refuge").addTo(caveGroup),
		L.marker([-2596,1393], {icon: caveIcon}).bindPopup("Weaver's Hollow").addTo(caveGroup),
		L.marker([-2482.75,1492], {icon: caveIcon}).bindPopup("Scuttler's Shortcut - Crystals").addTo(caveGroup),
		L.marker([-2006,1823.25], {icon: caveIcon}).bindPopup("Lockstone Cave").addTo(caveGroup),
		L.marker([-2879.75,1315], {icon: caveIcon}).bindPopup("Warren of Degenerates - Demon Blood, Crystals").addTo(caveGroup),
		L.marker([-1087,1201], {icon: caveIcon}).bindPopup("The Floe - Goes to Volcano").addTo(caveGroup),
		L.marker([-1391,1266.5], {icon: caveIcon}).bindPopup("Dragonmouth - Goes to Volcano").addTo(caveGroup),
		L.marker([-3052.75,1298.25], {icon: caveIcon}).bindPopup("Skittering Cavern - Gossamer").addTo(caveGroup),
		L.marker([-3017,1193], {icon: caveIcon}).bindPopup("Shaleback Hollow").addTo(caveGroup),
		L.marker([-1957,1822], {icon: caveIcon}).bindPopup("Jhil's Roost").addTo(caveGroup),
		L.marker([-1799.25,1772.75], {icon: caveIcon}).bindPopup("Bin-Yakin`s Seal").addTo(caveGroup),
		L.marker([-1913,1845.75], {icon: caveIcon}).bindPopup("The Scraps").addTo(caveGroup),
		L.marker([-1648.75,339.25], {icon: caveIcon}).bindPopup("The Barrow King").addTo(caveGroup),
		L.marker([-1493.25,1886.5], {icon: caveIcon}).bindPopup("The High Way - Goes to Volcano").addTo(caveGroup),
		L.marker([-1702.5,971.25], {icon: caveIcon}).bindPopup("The Crevice").addTo(caveGroup),
		L.marker([-2863.5,2186.75], {icon: caveIcon}).bindPopup("Executioners Entrance - Brimstone, Iron").addTo(caveGroup),
		
		//Location - Obelisks
		L.marker([-2253.75,2589], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk1.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		L.marker([-2771.75,3226.25], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk2.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		L.marker([-1110,1643], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk3.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		L.marker([-1117.25,1086.25], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk4.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		L.marker([-1698.5,520.5], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk5.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		L.marker([-2743.75,1074.25], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk6.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		L.marker([-2444.25,679.75], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk7.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		L.marker([-3247.75,985.75], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk8.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		L.marker([-2846.5,1794.5], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk9.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		L.marker([-1620.75,1337], {icon: obeliskIcon}).bindPopup("<img class='border-fix' src='data/images/markers/obelisks/obelisk10.png' width='300'></img><p align='center'>Obelisk</p>").addTo(obeliskGroup),
		
		//Locations - Camps (Blackhand)
		L.marker([-2739,2005], {icon: campBlackhandIcon}).bindPopup("Scoundrel's Gateway").addTo(campGroup),
		L.marker([-2616.5,2034.5], {icon: campBlackhandIcon}).bindPopup("Marauder's Muster").addTo(campGroup),
		L.marker([-2613,2083.5], {icon: campBlackhandIcon}).bindPopup("Bilgewater Break").addTo(campGroup),
		L.marker([-2586.5,2128.5], {icon: campBlackhandIcon}).bindPopup("Voyager's Vigil").addTo(campGroup),
		L.marker([-2442.5,1996], {icon: campBlackhandIcon}).bindPopup("The Pocket").addTo(campGroup),
		L.marker([-2942.5,2161.5], {icon: campBlackhandIcon}).bindPopup("Watchers Waystation").addTo(campGroup),
		L.marker([-2916,2143.5], {icon: campBlackhandIcon}).bindPopup("Sully's Ambush").addTo(campGroup),
		L.marker([-2886,2124], {icon: campBlackhandIcon}).bindPopup("Deathwhisper Camp").addTo(campGroup),
		L.marker([-3099.5,2135.5], {icon: campBlackhandIcon}).bindPopup("Scavenger's Berth").addTo(campGroup),
		L.marker([-2965,2304.5], {icon: campBlackhandIcon}).bindPopup("Lookout Point").addTo(campGroup),
		L.marker([-2906,2252.5], {icon: campBlackhandIcon}).bindPopup("Tarman's Berth").addTo(campGroup),
		L.marker([-2700.5,2170.5], {icon: campBlackhandIcon}).bindPopup("Anchor Point").addTo(campGroup),
		L.marker([-2794,2276.5], {icon: campBlackhandIcon}).bindPopup("Spotter's Squat").addTo(campGroup),
		L.marker([-2735.5,2227], {icon: campBlackhandIcon}).bindPopup("Sailstich Camp").addTo(campGroup),
		L.marker([-2668,2218], {icon: campBlackhandIcon}).bindPopup("The Sandpit").addTo(campGroup),
		L.marker([-2693.5,2543.5], {icon: campBlackhandIcon}).bindPopup("Deckswab's Retreat").addTo(campGroup),
		L.marker([-2416.5,3369.5], {icon: campBlackhandIcon}).bindPopup("Captain's Quarters").addTo(campGroup),
		L.marker([-2474.5,3320.5], {icon: campBlackhandIcon}).bindPopup("Jamilla's Liberty").addTo(campGroup),
		L.marker([-2537.5,3233], {icon: campBlackhandIcon}).bindPopup("Floatsam").addTo(campGroup),
		L.marker([-2274,2956], {icon: campBlackhandIcon}).bindPopup("Tailer's Berth").addTo(campGroup),
		L.marker([-2494.5,2721], {icon: campBlackhandIcon}).bindPopup("Scupper's Shelter").addTo(campGroup),

		//Locations - Camps (Cimmeria)
		L.marker([-1574.25,707.25], {icon: campCimmerianIcon}).bindPopup("Stargazer's Crest").addTo(campGroup),

		//Locations - Camps (Darfari)
		L.marker([-3332.5,2019], {icon: campDarfariIcon}).bindPopup("Narrowneck Span").addTo(campGroup),
		L.marker([-3284,1248], {icon: campDarfariIcon}).bindPopup("Marrowman's Height").addTo(campGroup),
		L.marker([-3227.5,1301.5], {icon: campDarfariIcon}).bindPopup("Howling Plateau").addTo(campGroup),
		L.marker([-3254.5,1052.75], {icon: campDarfariIcon}).bindPopup("Skulker's End").addTo(campGroup),
		L.marker([-3192.5,1059.75], {icon: campDarfariIcon}).bindPopup("Riverwatch Camp").addTo(campGroup),
		L.marker([-3107,1259], {icon: campDarfariIcon}).bindPopup("Death's Shadow Camp").addTo(campGroup),
		L.marker([-3137,1529], {icon: campDarfariIcon}).bindPopup("Corner of Bones").addTo(campGroup),
		L.marker([-3007,1248.25], {icon: campDarfariIcon}).bindPopup("Fleshtearer Falls").addTo(campGroup),
		L.marker([-2905.5,1427], {icon: campDarfariIcon}).bindPopup("Witness Camp").addTo(campGroup),
		L.marker([-2988.25,1462.75], {icon: campDarfariIcon}).bindPopup("The Cursed Way").addTo(campGroup),
		L.marker([-2999,1512.25], {icon: campDarfariIcon}).bindPopup("Ravager's Cleft").addTo(campGroup),
		L.marker([-3041.25,1657.25], {icon: campDarfariIcon}).bindPopup("Dustdevil Ridge").addTo(campGroup),
		L.marker([-3144.5,1851.75], {icon: campDarfariIcon}).bindPopup("Gallaman's Overlook").addTo(campGroup),
		L.marker([-3200,1879], {icon: campDarfariIcon}).bindPopup("Carver's Crest").addTo(campGroup),
		L.marker([-2987,1849], {icon: campDarfariIcon}).bindPopup("Spinebreaker's Flank").addTo(campGroup),
		L.marker([-3038,2076.5], {icon: campDarfariIcon}).bindPopup("Bonebreaker's Bend").addTo(campGroup),
		L.marker([-2965.25,1626.5], {icon: campDarfariIcon}).bindPopup("Heartsblood Rise").addTo(campGroup),
		L.marker([-2855,1714], {icon: campDarfariIcon}).bindPopup("Raider's Ridge").addTo(campGroup),
		L.marker([-2788,1759], {icon: campDarfariIcon}).bindPopup("Thugra's Stand").addTo(campGroup),
		L.marker([-3189,2026.5], {icon: campDarfariIcon}).bindPopup("Cannibal's Rest").addTo(campGroup),
		L.marker([-2655,2422], {icon: campDarfariIcon}).bindPopup("The Dryfalls").addTo(campGroup),

		//Locations - Camps (Dogs of the Desert)
		L.marker([-2791,1557], {icon: campDogsOfTheDesertIcon}).bindPopup("Hunter's View").addTo(campGroup),
		L.marker([-2766,1907.5], {icon: campDogsOfTheDesertIcon}).bindPopup("Claw Outcrop").addTo(campGroup),
		L.marker([-2692.5,1894], {icon: campDogsOfTheDesertIcon}).bindPopup("Waterhole Outlook").addTo(campGroup),
		L.marker([-2699.5,1828.5], {icon: campDogsOfTheDesertIcon}).bindPopup("N'batu's Outlook").addTo(campGroup),
		L.marker([-2595.5,1771.5], {icon: campDogsOfTheDesertIcon}).bindPopup("Ruins of al-Merayah").addTo(campGroup),
		L.marker([-2660,1663.5], {icon: campDogsOfTheDesertIcon}).bindPopup("Sharptooth Passage").addTo(campGroup),
		L.marker([-2465.5,1609.5], {icon: campDogsOfTheDesertIcon}).bindPopup("Bonepicker Camp").addTo(campGroup),
		L.marker([-2573,1478.5], {icon: campDogsOfTheDesertIcon}).bindPopup("Howler's Lode").addTo(campGroup),

		//Locations - Camps (Frost Giant)
		L.marker([-1240,1176], {icon: campFrostGiantIcon}).bindPopup("Flamemist Camp").addTo(campGroup),
		L.marker([-1291,954.5], {icon: campFrostGiantIcon}).bindPopup("Icekeeper Hollow").addTo(campGroup),
		L.marker([-1165.5,696.5], {icon: campFrostGiantIcon}).bindPopup("Crystalline Chasm").addTo(campGroup),
		L.marker([-1245.5,464], {icon: campFrostGiantIcon}).bindPopup("Blizzard's Overwatch").addTo(campGroup),
		L.marker([-1539,1145.5], {icon: campFrostGiantIcon}).bindPopup("Ymir's Delusion").addTo(campGroup),

		//Locations - Camps (Lemurian)


		//Locations - Camps (Relic Hunters)
		L.marker([-2699.5,456], {icon: campRelicHuntersIcon}).bindPopup("Southlake").addTo(campGroup),
		L.marker([-2632.5,379.5], {icon: campRelicHuntersIcon}).bindPopup("Westwall Prison").addTo(campGroup),
		L.marker([-2618.25,401], {icon: campRelicHuntersIcon}).bindPopup("Westwall").addTo(campGroup),
		L.marker([-2633,548], {icon: campRelicHuntersIcon}).bindPopup("Temple Quarter").addTo(campGroup),
		L.marker([-2604,533], {icon: campRelicHuntersIcon}).bindPopup("Waterside").addTo(campGroup),


		//Locations - Camps (Serpentmen)


		//Locations - Camps (Unnamed City)


		//Locations - Camps (Vanir)
		L.marker([-2092.5,1714], {icon: campVanirIcon}).bindPopup("Freya's Hovel").addTo(campGroup),
		L.marker([-2169.5,1550.5], {icon: campVanirIcon}).bindPopup("Trapper's Cabin").addTo(campGroup),
		L.marker([-2102,1420], {icon: campVanirIcon}).bindPopup("Desertwatch").addTo(campGroup),
		L.marker([-1937.5,1538.5], {icon: campVanirIcon}).bindPopup("Lian's Watch").addTo(campGroup),
		L.marker([-1870,1435], {icon: campVanirIcon}).bindPopup("Meadowatch").addTo(campGroup),
		L.marker([-1838,1574.5], {icon: campVanirIcon}).bindPopup("Coldfish Camp").addTo(campGroup),
		L.marker([-1782,1416.5], {icon: campVanirIcon}).bindPopup("Meltwater Crag").addTo(campGroup),
		L.marker([-1963,1425], {icon: campVanirIcon}).bindPopup("Mammoth Rider's Shanty").addTo(campGroup),
		L.marker([-1874.5,1313], {icon: campVanirIcon}).bindPopup("Nordhof").addTo(campGroup),
		L.marker([-1798,1296.5], {icon: campVanirIcon}).bindPopup("Rimefisher's Hut").addTo(campGroup),
		L.marker([-2039,1191.5], {icon: campVanirIcon}).bindPopup("Stormwatch").addTo(campGroup),
		L.marker([-1942,909.5], {icon: campVanirIcon}).bindPopup("The Wardtowers").addTo(campGroup),
		L.marker([-1902,909], {icon: campVanirIcon}).bindPopup("Godsward Tower").addTo(campGroup),
		L.marker([-1974,952], {icon: campVanirIcon}).bindPopup("Sandward Tower").addTo(campGroup),
		L.marker([-1959.5,868.5], {icon: campVanirIcon}).bindPopup("Ghostward Tower").addTo(campGroup),

		//Locations - Capitals
		L.marker([-2297.75,1197], {icon: capitalDogsOfTheDesertIcon}).bindPopup("The Den").addTo(capitalGroup),
		L.marker([-1014.5,1081], {icon: capitalFrostGiantIcon}).bindPopup("The Temple of Frost").addTo(capitalGroup),
		L.marker([-1664.75,558.5], {icon: capitalCimmerianIcon}).bindPopup("Mounds of the Dead").addTo(capitalGroup),
		L.marker([-1961,1303], {icon: capitalVanirIcon}).bindPopup("New Asagarth").addTo(capitalGroup),
		L.marker([-2660.5,2099.25], {icon: capitalBlackhandIcon}).bindPopup("The Black Galleon").addTo(capitalGroup),
		L.marker([-2909,3270], {icon: capitalLemurianIcon}).bindPopup("Forgotten City of Xel-ha").addTo(capitalGroup),
		L.marker([-2997.5,1764.5], {icon: capitalDarfariIcon}).bindPopup("The Summoning Place").addTo(capitalGroup),
		L.marker([-2662,480.25], {icon: capitalRelicHuntersIcon}).bindPopup("Sepermeru, City of the Relic Hunters").addTo(capitalGroup),
		L.marker([-2817.75,992.5], {icon: capitalUnnamedCityIcon}).bindPopup("The Unnamed City").addTo(capitalGroup),
		
		


		//Locations - Vistas
		L.marker([-2514.75,1725.5], {icon: vistaIcon}).bindPopup("Swagger Rock").addTo(vistaGroup),
		L.marker([-2710.25,2129.25], {icon: vistaIcon}).bindPopup("Pariah's Overwatch").addTo(vistaGroup),
		L.marker([-921,1131], {icon: vistaIcon}).bindPopup("The Disjunction").addTo(vistaGroup),
		L.marker([-889,1045.5], {icon: vistaIcon}).bindPopup("The Forge of Ymir").addTo(vistaGroup),
		L.marker([-2410,1761.5], {icon: vistaIcon}).bindPopup("Boundry Spillway").addTo(vistaGroup),
		L.marker([-2326.5,1540], {icon: vistaIcon}).bindPopup("Priestking's Retreat").addTo(vistaGroup),
		L.marker([-2557,1018], {icon: vistaIcon}).bindPopup("Godsight Spire").addTo(vistaGroup),
		L.marker([-2433.5,955], {icon: vistaIcon}).bindPopup("Sandscour Pass").addTo(vistaGroup),
		L.marker([-2465.5,922], {icon: vistaIcon}).bindPopup("Fingerfang Rock").addTo(vistaGroup),
		L.marker([-2823,655.5], {icon: vistaIcon}).bindPopup("The Jawbone").addTo(vistaGroup),
		L.marker([-2761.5,596], {icon: vistaIcon}).bindPopup("Rhinohorn Ridge").addTo(vistaGroup),
		L.marker([-2530,603], {icon: vistaIcon}).bindPopup("Ironbreaker Ridge").addTo(vistaGroup),
		L.marker([-2462,492.5], {icon: vistaIcon}).bindPopup("Relicwatcher Rise").addTo(vistaGroup),
		L.marker([-2295,734.5], {icon: vistaIcon}).bindPopup("Shattered Springs").addTo(vistaGroup),
		L.marker([-2394,415.5], {icon: vistaIcon}).bindPopup("Oasis of Nekhet").addTo(vistaGroup),
		L.marker([-2270.5,438.5], {icon: vistaIcon}).bindPopup("Oasis Overlook").addTo(vistaGroup),
		L.marker([-2146,418.5], {icon: vistaIcon}).bindPopup("The Crowngrove").addTo(vistaGroup),
		L.marker([-2031.5,724.5], {icon: vistaIcon}).bindPopup("Riversend").addTo(vistaGroup),
		L.marker([-2536,2541], {icon: vistaIcon}).bindPopup("Messenger's Respite").addTo(vistaGroup),
		L.marker([-2614.5,2570.5], {icon: vistaIcon}).bindPopup("The Crossway").addTo(vistaGroup),
		L.marker([-2913.5,2551.5], {icon: vistaIcon}).bindPopup("Pitfall Pass").addTo(vistaGroup),
		L.marker([-1060.25,1680.25], {icon: vistaIcon}).bindPopup("Path of the Penitent").addTo(vistaGroup),
		L.marker([-1167.75,1564.25], {icon: vistaIcon}).bindPopup("Bridge of Voormithadreth").addTo(vistaGroup),
		L.marker([-1174,1499.25], {icon: vistaIcon}).bindPopup("The Pens").addTo(vistaGroup),
		L.marker([-1170,1658], {icon: vistaIcon}).bindPopup("Terrace of the Tenders").addTo(vistaGroup),
		L.marker([-1341,1449.5], {icon: vistaIcon}).bindPopup("The Hidden Way").addTo(vistaGroup),
		L.marker([-1415.25,1559.5], {icon: vistaIcon}).bindPopup("Road of the Pilgrim").addTo(vistaGroup),
		L.marker([-1428,1814.5], {icon: vistaIcon}).bindPopup("Rockfall Canyon").addTo(vistaGroup),
		L.marker([-1211,1068.5], {icon: vistaIcon}).bindPopup("The Frozen Slopes").addTo(vistaGroup),
		L.marker([-1493,810.5], {icon: vistaIcon}).bindPopup("Skyfall Ridge").addTo(vistaGroup),
		L.marker([-1352,801], {icon: vistaIcon}).bindPopup("Eyelet Lake").addTo(vistaGroup),
		L.marker([-1277.5,861], {icon: vistaIcon}).bindPopup("Eyelet Lake").addTo(vistaGroup),
		L.marker([-1277.5,861], {icon: vistaIcon}).bindPopup("Frostneedle Forest").addTo(vistaGroup),
		L.marker([-1607.5,1574], {icon: vistaIcon}).bindPopup("Icespire Chasm").addTo(vistaGroup),
		L.marker([-2141,1887], {icon: vistaIcon}).bindPopup("Scartalon Ridgeline").addTo(vistaGroup),
		L.marker([-2290,1829.5], {icon: vistaIcon}).bindPopup("Imi's Cradle").addTo(vistaGroup),
		L.marker([-2308.5,1848], {icon: vistaIcon}).bindPopup("Telith's Island").addTo(vistaGroup),
		L.marker([-1867.5,1146], {icon: vistaIcon}).bindPopup("Godsclaw Passage").addTo(vistaGroup),
		L.marker([-2134.5,1242], {icon: vistaIcon}).bindPopup("Devil's Squat").addTo(vistaGroup),
		L.marker([-1569,448.5], {icon: vistaIcon}).bindPopup("The Dirgewood").addTo(vistaGroup),
		L.marker([-1808,606], {icon: vistaIcon}).bindPopup("Wightwatch Lookout").addTo(vistaGroup),
		L.marker([-3050.5,2933.5], {icon: vistaIcon}).bindPopup("Warrior's Walk").addTo(vistaGroup),
		L.marker([-3212,3065], {icon: vistaIcon}).bindPopup("The Silkwood").addTo(vistaGroup),
		L.marker([-3134,3268.5], {icon: vistaIcon}).bindPopup("Dagon's Claw").addTo(vistaGroup),
		L.marker([-3063,3087], {icon: vistaIcon}).bindPopup("Hullshatter Cove").addTo(vistaGroup),
		L.marker([-2908.5,2887], {icon: vistaIcon}).bindPopup("Xalthar's Crossing").addTo(vistaGroup),
		L.marker([-2742.5,2990.5], {icon: vistaIcon}).bindPopup("The Crevice").addTo(vistaGroup),
		L.marker([-2971,3618.5], {icon: vistaIcon}).bindPopup("Island of Unsightly Sirens").addTo(vistaGroup),
		L.marker([-2753.5,3564.5], {icon: vistaIcon}).bindPopup("Wreck of the Martyr").addTo(vistaGroup),
		L.marker([-2317.5,3479.5], {icon: vistaIcon}).bindPopup("Heliograph Heights").addTo(vistaGroup),
		L.marker([-2428.5,3313], {icon: vistaIcon}).bindPopup("Buccaneer Bay").addTo(vistaGroup),
		L.marker([-2610,2915], {icon: vistaIcon}).bindPopup("Bay of Hulks").addTo(vistaGroup),
		L.marker([-2483.5,3004.5], {icon: vistaIcon}).bindPopup("Inlet of the Hook").addTo(vistaGroup),
		L.marker([-2405.5,2766], {icon: vistaIcon}).bindPopup("Canopy Outlook").addTo(vistaGroup),
		L.marker([-2382.5,2503.5], {icon: vistaIcon}).bindPopup("Mire of Eternal Dreams").addTo(vistaGroup),
		L.marker([-2655.5,3184.5], {icon: vistaIcon}).bindPopup("Wreck of the Wagtail").addTo(vistaGroup),
		L.marker([-2949.5,2776.5], {icon: vistaIcon}).bindPopup("Drifter's Rest").addTo(vistaGroup),
		
		//Locations - Ruins
		L.marker([-3669,2293], {icon: ruinsIcon}).bindPopup("The Broken Highway").addTo(ruinsGroup),
		L.marker([-3706.5,2165.5], {icon: ruinsIcon}).bindPopup("The Broken Highway").addTo(ruinsGroup),
		L.marker([-3662,1964.5], {icon: ruinsIcon}).bindPopup("The Broken Highway").addTo(ruinsGroup),
		L.marker([-3740,1598], {icon: ruinsIcon}).bindPopup("The Broken Highway").addTo(ruinsGroup),
		L.marker([-3728,1421], {icon: ruinsIcon}).bindPopup("The Broken Highway").addTo(ruinsGroup),
		L.marker([-3717,1820.5], {icon: ruinsIcon}).bindPopup("The Broken Highway").addTo(ruinsGroup),
		L.marker([-3373.75,1353.75], {icon: ruinsIcon}).bindPopup("Shattered Bridge").addTo(ruinsGroup),
		L.marker([-3183.5,1010], {icon: ruinsIcon}).bindPopup("Algar's Overlook").addTo(ruinsGroup),
		L.marker([-3361.5,1754.5], {icon: ruinsIcon}).bindPopup("The Sentinels").addTo(ruinsGroup),
		L.marker([-2844.75,1817.5], {icon: ruinsIcon}).bindPopup("The Sinkhole").addTo(ruinsGroup),
		L.marker([-2848.75,1963.75], {icon: ruinsIcon}).bindPopup("The Arena").addTo(ruinsGroup),
		L.marker([-2968.25,1379], {icon: ruinsIcon}).bindPopup("The Tower of Bats").addTo(ruinsGroup),
		L.marker([-2796.25,1614], {icon: ruinsIcon}).bindPopup("Hand of the Maker").addTo(ruinsGroup),
		L.marker([-3247.75,2616], {icon: ruinsIcon}).bindPopup("Sandswept Ruins").addTo(ruinsGroup),
		L.marker([-2929.75,1065.5], {icon: ruinsIcon}).bindPopup("The Aviary").addTo(ruinsGroup),
		L.marker([-2900.5,980.5], {icon: ruinsIcon}).bindPopup("Citadel of the Triumvirate").addTo(ruinsGroup),
		L.marker([-2841.25,867.25], {icon: ruinsIcon}).bindPopup("The Spawning Pools").addTo(ruinsGroup),
		L.marker([-2762.5,996.25], {icon: ruinsIcon}).bindPopup("The Slave Pits").addTo(ruinsGroup),
		L.marker([-2711.75,1075], {icon: ruinsIcon}).bindPopup("The Archives").addTo(ruinsGroup),
		L.marker([-2741.5,1372], {icon: ruinsIcon}).bindPopup("The Slave Road").addTo(ruinsGroup),
		L.marker([-2697,1310.5], {icon: ruinsIcon}).bindPopup("The Imperial Highway").addTo(ruinsGroup),
		L.marker([-2757,1215], {icon: ruinsIcon}).bindPopup("The Dawn Gate").addTo(ruinsGroup),
		L.marker([-2622.5,1700.5], {icon: ruinsIcon}).bindPopup("Weeping Ruin").addTo(ruinsGroup),
		L.marker([-2610,1638.5], {icon: ruinsIcon}).bindPopup("Mek-kamoses's Spire").addTo(ruinsGroup),
		L.marker([-2353,1646.5], {icon: ruinsIcon}).bindPopup("The Shattered Basin").addTo(ruinsGroup),
		L.marker([-2509,1419], {icon: ruinsIcon}).bindPopup("The Southern Aqueduct").addTo(ruinsGroup),
		L.marker([-2261.5,1381], {icon: ruinsIcon}).bindPopup("Chaosmouth").addTo(ruinsGroup),
		L.marker([-2250,1083.5], {icon: ruinsIcon}).bindPopup("Ruins of Old Nebthu").addTo(ruinsGroup),
		L.marker([-2185.5,1031], {icon: ruinsIcon}).bindPopup("Tyro's Passage").addTo(ruinsGroup),
		L.marker([-2142.5,947.5], {icon: ruinsIcon}).bindPopup("The Tradeway").addTo(ruinsGroup),
		L.marker([-2214.5,933.5], {icon: ruinsIcon}).bindPopup("Deserter's Gutter").addTo(ruinsGroup),
		L.marker([-2337.5,903], {icon: ruinsIcon}).bindPopup("The Slaveway").addTo(ruinsGroup),
		L.marker([-2444.5,578.5], {icon: ruinsIcon}).bindPopup("Klael's Stronghold").addTo(ruinsGroup),
		L.marker([-2145,603.5], {icon: ruinsIcon}).bindPopup("Westwatch Keep").addTo(ruinsGroup),
		L.marker([-2063.5,681.5], {icon: ruinsIcon}).bindPopup("Lakewatch").addTo(ruinsGroup),
		L.marker([-1960.5,604], {icon: ruinsIcon}).bindPopup("King's Niche").addTo(ruinsGroup),
		L.marker([-2903,2088.5], {icon: ruinsIcon}).bindPopup("Deathwhisper Ruins").addTo(ruinsGroup),
		L.marker([-2518.5,2436.5], {icon: ruinsIcon}).bindPopup("The Eye that Never Closes").addTo(ruinsGroup),
		L.marker([-2440,2377], {icon: ruinsIcon}).bindPopup("Boulevard of the North Star").addTo(ruinsGroup),
		L.marker([-1347.25,1592], {icon: ruinsIcon}).bindPopup("Road of the Righteous").addTo(ruinsGroup),
		L.marker([-1195.25,1779.25], {icon: ruinsIcon}).bindPopup("Shrine of the Oracle").addTo(ruinsGroup),
		L.marker([-1042.25,1394.25], {icon: ruinsIcon}).bindPopup("The Shattered Stairs").addTo(ruinsGroup),
		L.marker([-955.5,1659.75], {icon: ruinsIcon}).bindPopup("Walkway of the Devout").addTo(ruinsGroup),
		L.marker([-1269,866.5], {icon: ruinsIcon}).bindPopup("Bleakwood Ruins").addTo(ruinsGroup),
		L.marker([-1303.5,599], {icon: ruinsIcon}).bindPopup("Carrowmore").addTo(ruinsGroup),
		L.marker([-1724.5,1265.5], {icon: ruinsIcon}).bindPopup("Bridge of the Betrayer").addTo(ruinsGroup),
		L.marker([-1571,1376.5], {icon: ruinsIcon}).bindPopup("Ruins of Xullan").addTo(ruinsGroup),
		L.marker([-1641.5,1140.5], {icon: ruinsIcon}).bindPopup("Ring of Silence").addTo(ruinsGroup),
		L.marker([-2331,1869.5], {icon: ruinsIcon}).bindPopup("Sanctuary Ruins").addTo(ruinsGroup),
		L.marker([-2214.5,1607], {icon: ruinsIcon}).bindPopup("The Breach").addTo(ruinsGroup),
		L.marker([-2066,1608.5], {icon: ruinsIcon}).bindPopup("The Northern Aqueduct").addTo(ruinsGroup),
		L.marker([-1907,1608], {icon: ruinsIcon}).bindPopup("The Great Dam").addTo(ruinsGroup),
		L.marker([-1955.5,1078.5], {icon: ruinsIcon}).bindPopup("Skyholme Ruins").addTo(ruinsGroup),
		L.marker([-1864,768.5], {icon: ruinsIcon}).bindPopup("Circle of Swords").addTo(ruinsGroup),
		L.marker([-1662.5,930.5], {icon: ruinsIcon}).bindPopup("Bjornar's Stand").addTo(ruinsGroup),
		L.marker([-1786,1058.5], {icon: ruinsIcon}).bindPopup("Ruins of Velstad").addTo(ruinsGroup),
		L.marker([-1691,632], {icon: ruinsIcon}).bindPopup("The Ravaged Barrows").addTo(ruinsGroup),
		L.marker([-1731.5,520.5], {icon: ruinsIcon}).bindPopup("The Cursed Mound").addTo(ruinsGroup),
		L.marker([-2243,2603.5], {icon: ruinsIcon}).bindPopup("Upper Staging Area").addTo(ruinsGroup),
		L.marker([-2316,2660.5], {icon: ruinsIcon}).bindPopup("Ruined Outpost").addTo(ruinsGroup),
		L.marker([-2488,2841], {icon: ruinsIcon}).bindPopup("Lower Staging Area").addTo(ruinsGroup),
		L.marker([-2634,2695.5], {icon: ruinsIcon}).bindPopup("Eastern Barracks").addTo(ruinsGroup),
		L.marker([-2762,2916], {icon: ruinsIcon}).bindPopup("Descent of Dagon").addTo(ruinsGroup),
		L.marker([-2788.5,2816], {icon: ruinsIcon}).bindPopup("Penitent's Crossing").addTo(ruinsGroup),
		L.marker([-2923,3036.5], {icon: ruinsIcon}).bindPopup("Gate of the Moon").addTo(ruinsGroup),
		L.marker([-2916,3133], {icon: ruinsIcon}).bindPopup("Avenue of the Sun").addTo(ruinsGroup),
		L.marker([-3034,3244], {icon: ruinsIcon}).bindPopup("Xel-ha Docks").addTo(ruinsGroup),
		L.marker([-2899,3223], {icon: ruinsIcon}).bindPopup("The Black Garden").addTo(ruinsGroup),
		L.marker([-2794.5,3222], {icon: ruinsIcon}).bindPopup("Dagon's Eye").addTo(ruinsGroup),
		L.marker([-2906,3318.5], {icon: ruinsIcon}).bindPopup("The Celestial Plaza").addTo(ruinsGroup),
		L.marker([-2779,3416], {icon: ruinsIcon}).bindPopup("A Light to Guide them Home").addTo(ruinsGroup),
		L.marker([-2714.5,3358], {icon: ruinsIcon}).bindPopup("Watchers of the Passage").addTo(ruinsGroup),
		L.marker([-2899,3466.5], {icon: ruinsIcon}).bindPopup("Dagon's Embrace").addTo(ruinsGroup),
		

		//Locations - Bosses
		L.marker([-3270,1629.25], {icon: bossIcon}).bindPopup("Giant Crocodile<br><li>Health : 76230<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2849.25,1818], {icon: bossIcon}).bindPopup("Undead Dragon<br><li>Health : 40998<li>Armor : 84<li>XP Reward : 25200<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Dragonhorn' target='_blank'>Dragon Horn</a><li><a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'>Dragon Bone</a>").addTo(bossGroup),
		L.marker([-2644,1198], {icon: bossIcon}).bindPopup("Red Dragon<br><li>Health : 40998<li>Armor : 84<li>XP Reward : 25200<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Red_Dragon_Head' target='_blank'>Red Dragon Head</a><li><a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'>Dragon Bone</a>").addTo(bossGroup),
		L.marker([-2834.5,851], {icon: bossIcon}).bindPopup("Red Dragon<br><li>Health : 40998<li>Armor : 84<li>XP Reward : 25200<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Red_Dragon_Head' target='_blank'>Red Dragon Head</a><li><a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'>Dragon Bone</a>").addTo(bossGroup),
		L.marker([-2717,1867.5], {icon: bossIcon}).bindPopup("Giant Crocodile<br><li>Health : 76230<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2021,478], {icon: bossIcon}).bindPopup("White Tiger<br><li>Health : 60320<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2702.5,2476.75], {icon: bossIcon}).bindPopup("White Tiger<br><li>Health : 60320<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-1087,591.5], {icon: bossIcon}).bindPopup("Rocknose King (Ice)<br><li>Health : 2840<li>Armor : 65<li>XP Reward : 12600<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Black_Ice' target='_blank'>Black Ice</a>").addTo(bossGroup),
		L.marker([-1097,538], {icon: bossIcon}).bindPopup("Rocknose King (Ice)<br><li>Health : 2840<li>Armor : 65<li>XP Reward : 12600<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Black_Ice' target='_blank'>Black Ice</a>").addTo(bossGroup),
		L.marker([-3042,1489.75], {icon: bossIcon}).bindPopup("Skorpion King<br><li>Health : 66959<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2966,1383.25], {icon: bossIcon}).bindPopup("Albino Bat<br><li>Health : 1117<li>Armor : 73<li>XP Reward : 10710<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Albino_Bat_Demon_Blood' target='_blank'>Albino Bat Demon Blood</a>").addTo(bossGroup),
		L.marker([-2743.75,3547.75], {icon: bossIcon}).bindPopup("Demon Spider<br><li>Health : 60320<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-3201.25,3105.25], {icon: bossIcon}).bindPopup("Giant Spider<br><li>Health : 59360<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-3039.25,1872], {icon: bossIcon}).bindPopup("Giant Spider<br><li>Health : 59360<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-3179.5,3050.5], {icon: bossIcon}).bindPopup("Giant Spider<br><li>Health : 59360<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2310.25,3401.5], {icon: bossIcon}).bindPopup("Giant Crocodile<br><li>Health : 76230<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2601,1570.75], {icon: bossIcon}).bindPopup("Giant Crocodile<br><li>Health : 76230<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2311.5,1505.5], {icon: bossIcon}).bindPopup("Giant Crocodile<br><li>Health : 76230<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2478,1214.5], {icon: bossIcon}).bindPopup("Rhino King<br><li>Health : 77500<li>Armor : 74<li>XP Reward : 36400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2763,553], {icon: bossIcon}).bindPopup("Rhino King<br><li>Health : 77500<li>Armor : 74<li>XP Reward : 36400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2911.75,2417.5], {icon: bossIcon}).bindPopup("Rotbranch<br><li>Health : 89500<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2267,740.5], {icon: bossIcon}).bindPopup("Rotbranch<br><li>Health : 89500<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-1992.5,1728.25], {icon: bossIcon}).bindPopup("Rotbranch<br><li>Health : 89500<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-1854,773.25], {icon: bossIcon}).bindPopup("Rotbranch<br><li>Health : 89500<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-1505.25,364], {icon: bossIcon}).bindPopup("Rotbranch<br><li>Health : 89500<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-3095.75,3322.25], {icon: bossIcon}).bindPopup("Giant Reptilian Monstrosity<br><li>Health : 72585<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2845.75,1910], {icon: bossIcon}).bindPopup("Giant Snake<br><li>Health : 53063<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2949.75,980.75], {icon: bossIcon}).bindPopup("Giant Snake<br>Inside: Citadel of the Triumvirate<br><li>Health : 53063<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-3098,1867], {icon: bossIcon}).bindPopup("Giant Crocodile<br>Inside: Gallaman's Tomb<br><li>Health : 76230<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2414,353.75], {icon: bossIcon}).bindPopup("Sand Reaper Hive Queen<br><li>Health : 57440<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2589.75,739.5], {icon: bossIcon}).bindPopup("King Scorpion<br><li>Health : 66959<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2481,2172.5], {icon: bossIcon}).bindPopup("Sand Reaper Hive Queen<br><li>Health : 57440<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2226,2531.25], {icon: bossIcon}).bindPopup("Sand Reaper Hive Queen<br><li>Health : 57440<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2500.75,1328.75], {icon: bossIcon}).bindPopup("The Spider Queen (Giant Spider)<br>Inside: Weaver's Hollow/Scuttler's Shortcut<br><li>Health : 59360<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-3075.25,901.5], {icon: bossIcon}).bindPopup("King Scorpion<br><li>Health : 66959<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-3019.5,1086.75], {icon: bossIcon}).bindPopup("King Scorpion<br><li>Health : 66959<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2895,908], {icon: bossIcon}).bindPopup("Green Dragon<br><li>Health : 40998<li>Armor : 84<li>XP Reward : 25200<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Green_Dragon_Head' target='_blank'>Green Dragon Head</a><li><a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'>Dragon Bone</a>").addTo(bossGroup),
		L.marker([-2999.5,919], {icon: bossIcon}).bindPopup("Green Dragon<br><li>Health : 40998<li>Armor : 84<li>XP Reward : 25200<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Green_Dragon_Head' target='_blank'>Green Dragon Head</a><li><a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'>Dragon Bone</a>").addTo(bossGroup),
		L.marker([-1547.5,1862.5], {icon: bossIcon}).bindPopup("White Dragon<br><li>Health : 40998<li>Armor : 84<li>XP Reward : 25200<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'>Dragon Bone</a>").addTo(bossGroup),
		L.marker([-2567.25,1068.25], {icon: bossIcon}).bindPopup("King Scorpion<br><li>Health : 66959<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2768.25,1064.5], {icon: bossIcon}).bindPopup("Green Dragon<br><li>Health : 40998<li>Armor : 84<li>XP Reward : 25200<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Green_Dragon_Head' target='_blank'>Green Dragon Head</a><li><a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'>Dragon Bone</a>").addTo(bossGroup),
		L.marker([-2834,1018.25], {icon: bossIcon}).bindPopup("Green Dragon<br><li>Health : 40998<li>Armor : 84<li>XP Reward : 25200<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Green_Dragon_Head' target='_blank'>Green Dragon Head</a><li><a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'>Dragon Bone</a>").addTo(bossGroup),
		L.marker([-2466.5,954], {icon: bossIcon}).bindPopup("Rockslide<br><li>Health : 56500<li>Armor : 57<li>XP Reward : 26600<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2480.25,1772.25], {icon: bossIcon}).bindPopup("Thunderfoot (Elephant)<br><li>Health : 72585<li>Armor : 84<li>XP Reward : 42000<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2448,1800.25], {icon: bossIcon}).bindPopup("White Tiger<br><li>Health : 60320<li>Armor : 88<li>XP Reward : 44100<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-2676,2313.25], {icon: bossIcon}).bindPopup("Giant Spider<br><li>Health : 59360<li>Armor : 87<li>XP Reward : 43400<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(bossGroup),
		L.marker([-880.25,1059.25], {icon: bossIcon}).bindPopup("White Dragon<br>Inside: The Temple of Frost,<br>under the Forge of Ymir<br><li>Health : 40998<li>Armor : 84<li>XP Reward : 25200<br><br>Notable Harvests :<li><a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'>Dragon Bone</a>").addTo(bossGroup),
		L.marker([-2751.75,1024], {icon: bossIcon}).bindPopup("Flame Guardian").addTo(bossGroup),


		//Locations - Lore
		
		
		//Locations - Treasures
		L.marker([-2011.5,481.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-2698,1871.25], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-3299,1646.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-3031.25,1497.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-2749,3563.25], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-3216.25,3073.75], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-3028.75,1880.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-2698.5,2472.25], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-2315,3406.65], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-2582.25,1576.75], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-2307.25,1496.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-2459.25,1218.25], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-2761,528], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),
		L.marker([-2896,2423], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2258.5,731.75], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-1994,1742.75], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-1858,769.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-1509.75,356.75], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-3112.75,3326], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2958.75,981.25], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Inside: Citadel of the Triumvirate<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2419.5,348.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2590.25,747], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2488.5,2177], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2221.5,2536.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2572.75,1074.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2478.75,950.5], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2422,1771], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				
		L.marker([-2676.5,2320.25], {icon: treasureIcon}).bindPopup("Legendary Chest<br>Requirements : <li>Level 60 <li><a href='https://conanexiles.gamepedia.com/Skeleton_Key' target='_blank'>Skeleton Key</a>").addTo(treasureGroup),				


		//Locations - Recipes
		L.marker([-3267,1078.25], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Darfari_Banners' target='_blank'><img class='border-fix' src='data/images/recipes/darfaribanners.png' width='300'></img><p align='center'>Darfari Banners</p></a>").addTo(recipeGroup),
		L.marker([-2627,1069.75], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Cartographer' target='_blank'><img class='border-fix' src='data/images/recipes/cartographer.png' width='300'></img><p align='center'>Cartographer</p></a><p align='center'>(Entrance to Archives to the south)</p>").addTo(recipeGroup),
		L.marker([-3257,1070.75], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Darfari_Weapons' target='_blank'><img class='border-fix' src='data/images/recipes/darfariweapons_new.png' width='300'></img><p align='center'>Darfari Weapons</p></a>").addTo(recipeGroup),
		L.marker([-2734.25,439.25], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Relic_Hunter_Armor' target='_blank'><img class='border-fix' src='data/images/recipes/relichunters.png' width='300'></img><p align='center'>Relic Hunter Armor</p></a>").addTo(recipeGroup),
		L.marker([-2590.75,532.5], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Relic_Hunter_Banners' target='_blank'><img class='border-fix' src='data/images/recipes/relichunterbanners.png' width='300'></img><p align='center'>Relic Hunter Banners</p></a>").addTo(recipeGroup),
		L.marker([-2973,1395.75], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Cooking_VIII' target='_blank'><img class='border-fix' src='data/images/recipes/cooking8.png' width='300'></img><p align='center'>Specialist Cooking VIII</p></a>").addTo(recipeGroup),
		L.marker([-2984,1746.5], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Skulltaker' target='_blank'><img class='border-fix' src='data/images/recipes/skulltaker.png' width='300'></img><p align='center'>Skulltaker</p></a>").addTo(recipeGroup),
		L.marker([-2985.25,1754.5], {icon: recipeIcon}).bindPopup("<img class='border-fix' src='data/images/recipes/cooking1&6.png' width='300'></img><p align='center'><a href='https://conanexiles.gamepedia.com/Specialist_Cooking_I' target='_blank'>Specialist Cooking I</a><br><a href='https://conanexiles.gamepedia.com/Specialist_Cooking_VI' target='_blank'>Specialist Cooking VI</a></p>").addTo(recipeGroup),
		L.marker([-2726,1994.5], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Hyena-Fur_Armor' target='_blank'><img class='border-fix' src='data/images/recipes/hyenafurarmor.png' width='300'></img><p align='center'>Hyena-Fur Armor</p></a>").addTo(recipeGroup),
		L.marker([-2505.25,1166.25], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Cooking_VII' target='_blank'><img class='border-fix' src='data/images/recipes/cooking7.png' width='300'></img><p align='center'>Specialist Cooking VII</p></a>").addTo(recipeGroup),
		L.marker([-2339.5,1211.5], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Brewing_I' target='_blank'><img class='border-fix' src='data/images/recipes/brewing1.png' width='300'></img><p align='center'>Specialist Brewing I</p></a>").addTo(recipeGroup),
		L.marker([-2304,1212.25], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Dogs_of_the_Desert_Banners' target='_blank'><img class='border-fix' src='data/images/recipes/dogsofthedesertbanners.png' width='300'></img><p align='center'>Dogs of the Desert Banners</p></a>").addTo(recipeGroup),
		L.marker([-2938,2778.25], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Cooking_X' target='_blank'><img class='border-fix' src='data/images/recipes/cooking10.png' width='300'></img><p align='center'>Specialist Cooking X</p></a>").addTo(recipeGroup),
		L.marker([-2436.75,3337.5], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Buccaneer' target='_blank'><img class='border-fix' src='data/images/recipes/buccaneer.png' width='300'></img><p align='center'>Buccaneer</p></a>").addTo(recipeGroup),
		L.marker([-2647.75,2106.25], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Black_Hand_Banners' target='_blank'><img class='border-fix' src='data/images/recipes/blackhandbanners.png' width='300'></img><p align='center'>Black Hand Banners</p></a>").addTo(recipeGroup),
		L.marker([-2168.75,1553.75], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Cooking_V' target='_blank'><img class='border-fix' src='data/images/recipes/cooking5.png' width='300'></img><p align='center'>Specialist Cooking V</p></a>").addTo(recipeGroup),
		L.marker([-1933,1536], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Cooking_IX' target='_blank'><img class='border-fix' src='data/images/recipes/cooking9.png' width='300'></img><p align='center'>Specialist Cooking IX</p></a>").addTo(recipeGroup),
		L.marker([-2057.5,1087.25], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Cooking_II' target='_blank'><img class='border-fix' src='data/images/recipes/cooking2.png' width='300'></img><p align='center'>Specialist Cooking II</p></a>").addTo(recipeGroup),
		L.marker([-1697.25,522], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Brewing_II' target='_blank'><img class='border-fix' src='data/images/recipes/brewing2.png' width='300'></img><p align='center'>Specialist Brewing II</p></a>").addTo(recipeGroup),
		L.marker([-1625,538], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Cooking_IV' target='_blank'><img class='border-fix' src='data/images/recipes/cooking4.png' width='300'></img><p align='center'>Specialist Cooking IV</p></a>").addTo(recipeGroup),
		L.marker([-1617.25,633], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Specialist_Cooking_III' target='_blank'><img class='border-fix' src='data/images/recipes/cooking3.png' width='300'></img><p align='center'>Specialist Cooking III</p></a>").addTo(recipeGroup),
		L.marker([-955,1533], {icon: recipeIcon}).bindPopup("<img class='border-fix' src='data/images/recipes/serpentineweapons.png' width='300'></img><p align='center'>Serpentine Weapons</p>").addTo(recipeGroup),
		L.marker([-2850.25,1807.5], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Dragonbone' target='_blank'><img class='border-fix' src='data/images/recipes/dragonbone.png' width='300'></img><p align='center'>Dragonbone Weapons</p></a>Required Feats:<li><a href='https://conanexiles.gamepedia.com/Star_Metal_Tools' target='_blank'>Star Metal Tools</a>").addTo(recipeGroup),
		L.marker([-1652.75,304.5], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Vanquisher_of_the_King_Beneath' target='_blank'><img class='border-fix' src='data/images/recipes/vanquisherofthekingbeneath.png' width='300'></img><p align='center'>Vanquisher of the King Beneath</p></a>Required Feats:<li><a href='https://conanexiles.gamepedia.com/Star_Metal_Tools' target='_blank'>Star Metal Tools</a>").addTo(recipeGroup),
		L.marker([-1029.5,1108.25], {icon: recipeIcon}).bindPopup("<a href='https://conanexiles.gamepedia.com/Totems' target='_blank'><img class='border-fix' src='data/images/recipes/totems.png' width='300'></img><p align='center'>Totems</p></a>").addTo(recipeGroup);


		//Locations Emotes
		L.marker([-2335.5,618], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Polite_Laugh' target='_blank'>Polite Laugh</a><br><li><a href='https://conanexiles.gamepedia.com/Laugh' target='_blank'>Laugh</a>").addTo(emoteGroup);
		L.marker([-1010.5,1097], {icon: emoteIcon}).bindPopup("Runestone<br><li><a href='https://conanexiles.gamepedia.com/By_Crom' target='_blank'>By Crom</a><br><li><a href='https://conanexiles.gamepedia.com/Kneel' target='_blank'>Kneel</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Sitting' target='_blank'>Pray Sitting</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Standing' target='_blank'>Pray Standing</a><br>").addTo(emoteGroup),
		L.marker([-2863,998.5], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/By_Set' target='_blank'>By Set</a><br><li><a href='https://conanexiles.gamepedia.com/Kneel' target='_blank'>Kneel</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Sitting' target='_blank'>Pray Sitting</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Standing' target='_blank'>Pray Standing</a><br>").addTo(emoteGroup),
		L.marker([-2997.75,1754], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/By_Yog' target='_blank'>By Yog</a><br><li><a href='https://conanexiles.gamepedia.com/Kneel' target='_blank'>Kneel</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Sitting' target='_blank'>Pray Sitting</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Standing' target='_blank'>Pray Standing</a><br>").addTo(emoteGroup),
		L.marker([-2528.25,1165.75], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/By_Mitra' target='_blank'>By Mitra</a><br><li><a href='https://conanexiles.gamepedia.com/Kneel' target='_blank'>Kneel</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Sitting' target='_blank'>Pray Sitting</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Standing' target='_blank'>Pray Standing</a><br>").addTo(emoteGroup),
		L.marker([-2711.5,466.5], {icon: emoteIcon}).bindPopup("Ghost Spawn<br><li><a href='https://conanexiles.gamepedia.com/Snake_Dance' target='_blank'>Snake Dance</a><br>").addTo(emoteGroup),
		L.marker([-2711.5,466.5], {icon: emoteIcon}).bindPopup("Ghost Spawn<br><li><a href='https://conanexiles.gamepedia.com/Snake_Dance' target='_blank'>Snake Dance</a><br>").addTo(emoteGroup),
		L.marker([-2268.25,1197.75], {icon: emoteIcon}).bindPopup("Ghost Spawn<br><li><a href='https://conanexiles.gamepedia.com/Belly_Dance' target='_blank'>Belly Dance</a><br>").addTo(emoteGroup);
		L.marker([-2677.25,1659.5], {icon: emoteIcon}).bindPopup("Ghost Spawn<br><li><a href='https://conanexiles.gamepedia.com/Cimmerian_Dance' target='_blank'>Cimmerian Dance</a><br>").addTo(emoteGroup);
		L.marker([-3172.75,1031.75], {icon: emoteIcon}).bindPopup("Ghost Spawn<br><li><a href='https://conanexiles.gamepedia.com/Khitan_Dance' target='_blank'>Khitan Dance</a><br>").addTo(emoteGroup);
		L.marker([-3028.75,1473.25], {icon: emoteIcon}).bindPopup("Ghost Spawn<br><li><a href='https://conanexiles.gamepedia.com/War_Dance' target='_blank'>War Dance</a><br>").addTo(emoteGroup);
		L.marker([-1606.75,550.75], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Chicken' target='_blank'>Chicken</a><br>").addTo(emoteGroup);
		L.marker([-1708.5,595.5], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Spit' target='_blank'>Spit</a><br>").addTo(emoteGroup);
		L.marker([-1891.75,768.75], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Shake_Fist' target='_blank'>Shake Fist</a><br>").addTo(emoteGroup);
		L.marker([-1952.75,916.25], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Push-ups' target='_blank'>Push-Ups</a><br>").addTo(emoteGroup);
		L.marker([-1801,1296], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Slit_Throat' target='_blank'>Slit Throat</a><br>").addTo(emoteGroup);
		L.marker([-2116.75,1084.75], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Cheer' target='_blank'>Cheer</a><br>").addTo(emoteGroup);
		L.marker([-2635.5,554.75], {icon: emoteIcon}).bindPopup("Torn Page on Ground<br><li><a href='https://conanexiles.gamepedia.com/Shrug' target='_blank'>Shrug</a><br>").addTo(emoteGroup);
		L.marker([-2638,544.75], {icon: emoteIcon}).bindPopup("Torn Page on Ground<br><li><a href='https://conanexiles.gamepedia.com/Polite_Clap' target='_blank'>Polite Clap</a><br>").addTo(emoteGroup);
		L.marker([-2629.25,534.75], {icon: emoteIcon}).bindPopup("Torn Page on Ground<br><li><a href='https://conanexiles.gamepedia.com/Clap' target='_blank'>Clap</a><br>").addTo(emoteGroup);
		L.marker([-2630.75,542], {icon: emoteIcon}).bindPopup("Torn Page on Ground<br><li><a href='https://conanexiles.gamepedia.com/Point' target='_blank'>Point</a><br>").addTo(emoteGroup);
		L.marker([-2627.5,549.75], {icon: emoteIcon}).bindPopup("Torn Page on Ground<br><li><a href='https://conanexiles.gamepedia.com/Grovel' target='_blank'>Grovel</a><br>").addTo(emoteGroup);
		L.marker([-2628.5,544.5], {icon: emoteIcon}).bindPopup("Torn Page on Ground<br><li><a href='https://conanexiles.gamepedia.com/Surrender' target='_blank'>Surrender</a><br>").addTo(emoteGroup);
		L.marker([-2632.75,547], {icon: emoteIcon}).bindPopup("Torn Page on Ground<br><li><a href='https://conanexiles.gamepedia.com/Bear_Hug' target='_blank'>Bear Hug</a><br>").addTo(emoteGroup);
		L.marker([-2633.25,557], {icon: emoteIcon}).bindPopup("Torn Page on Ground<br><li><a href='https://conanexiles.gamepedia.com/Ponder' target='_blank'>Ponder</a><br>").addTo(emoteGroup);
		L.marker([-2796.25,1620.75], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Come_Here' target='_blank'>Come Here</a><br>").addTo(emoteGroup);
		L.marker([-2988.5,1751.5], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Spank' target='_blank'>Spank</a><br>").addTo(emoteGroup);
		L.marker([-2848.75,1797.5], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Squirm' target='_blank'>Squirm</a><br>").addTo(emoteGroup);
		L.marker([-2659.75,2092], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Seduce' target='_blank'>Seduce</a><br>").addTo(emoteGroup);
		L.marker([-2924.25,2089], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Blow_Kiss' target='_blank'>Blow Kiss</a><br>").addTo(emoteGroup);
		L.marker([-3107.25,2079.75], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Show_Off' target='_blank'>Show Off</a><br>").addTo(emoteGroup);
		L.marker([-3243.75,1054.5], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Comb_Hair' target='_blank'>Comb Hair</a><br>").addTo(emoteGroup);
		L.marker([-2634.5,385.75], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Flirt' target='_blank'>Flirt</a><br>").addTo(emoteGroup);
		L.marker([-2339.5,882.25], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Yawn' target='_blank'>Yawn</a><br>").addTo(emoteGroup);
		L.marker([-2495.25,1183.75], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Score' target='_blank'>Score</a><br>").addTo(emoteGroup);
		L.marker([-2604.25,1396.75], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/By_Crom' target='_blank'>By Crom</a><br><li><a href='https://conanexiles.gamepedia.com/Kneel' target='_blank'>Kneel</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Sitting' target='_blank'>Pray Sitting</a><br><li><a href='https://conanexiles.gamepedia.com/Pray_Standing' target='_blank'>Pray Standing</a><br><li><a href='https://conanexiles.gamepedia.com/Grovel' target='_blank'>Grovel</a>").addTo(emoteGroup);
		L.marker([-2855.75,1276.25], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Sigh' target='_blank'>Sigh</a><br>").addTo(emoteGroup);
		L.marker([-3266.5,1392], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Submissive' target='_blank'>Submissive</a><br>").addTo(emoteGroup);
		L.marker([-3487.25,1307.25], {icon: emoteIcon}).bindPopup("Journal on Ground<br><li><a href='https://conanexiles.gamepedia.com/Cross Arms' target='_blank'>Cross Arms</a><br>").addTo(emoteGroup);


		var hash = new L.Hash(map);
		//Group Overlay Combiner
		var groupedResources = {
			"Resources": {
				"<img src='data/images/icons/icon_ironstone.png' width='16' height='16'></img> Iron": ironGroup,
				"<img src='data/images/icons/icon_coal.png' width='16' height='16'></img> Coal": coalGroup,
				"<img src='data/images/icons/icon_brimstone.png' width='16' height='16'></img> Brimstone": brimstoneGroup,
				"<img src='data/images/icons/icon_crystal.png' width='16' height='16'></img> Crystal": crystalGroup,
				"<img src='data/images/icons/icon_silver.png' width='16' height='16'></img> Silver": silverGroup,
				"<img src='data/images/icons/icon_starmetal.png' width='16' height='16'></img> Star Metal": starmetalGroup,
				"<img src='data/images/icons/icon_black_ice.png' width='16' height='16'></img> Black Ice": blackiceGroup,
				"<img src='data/images/icons/icon_obsidian.png' width='16' height='16'></img> Obsidian": obsidianGroup
			},
		}

		var groupedThralls = {
			"Thralls": {
				"<img src='data/images/icons/icon_cook.png' width='16' height='16'></img> Alchemist": alchemistGroup,
				"<img src='data/images/icons/icon_armorer.png' width='16' height='16'></img> Armorer": armorerGroup,
				"<img src='data/images/icons/icon_sherpa.png' width='16' height='16'></img> Bearer": sherpaGroup,
				"<img src='data/images/icons/icon_blacksmith.png' width='16' height='16'></img> Blacksmith": blacksmithGroup,
				"<img src='data/images/icons/icon_carpenter.png' width='16' height='16'></img> Carpenter": carpenterGroup,
				"<img src='data/images/icons/icon_cook.png' width='16' height='16'></img> Cook": cookGroup,
				"<img src='data/images/icons/icon_entertainer.png' width='16' height='16'></img> Entertainer": entertainerGroup,
				"<img src='data/images/icons/icon_priest.png' width='16' height='16'></img> Priest": priestGroup,
				"<img src='data/images/icons/icon_tanner.png' width='16' height='16'></img> Tanner": tannerGroup,
				"<img src='data/images/icons/icon_taskmaster.png' width='16' height='16'></img> Taskmaster": taskmasterGroup,
				"<img src='data/images/icons/icon_smelter.png' width='16' height='16'></img> Smelter": smelterGroup,
				"<img src='data/images/icons/icon_random.png' width='16' height='16'></img> Random": randomThrallGroup
			},
		}
		var namedThralls = {
			"Named Thralls": {
				"<img src='data/images/icons/icon_archer.png' width='16' height='16'></img> Archer": namedArcherGroup,
				"<img src='data/images/icons/icon_cook.png' width='16' height='16'></img> Alchemist": namedAlchemistGroup,
				"<img src='data/images/icons/icon_armorer.png' width='16' height='16'></img> Armorer": namedArmorerGroup,
				"<img src='data/images/icons/icon_sherpa.png' width='16' height='16'></img> Bearer": namedSherpaGroup,
				"<img src='data/images/icons/icon_blacksmith.png' width='16' height='16'></img> Blacksmith": namedBlacksmithGroup,
				"<img src='data/images/icons/icon_carpenter.png' width='16' height='16'></img> Carpenter": namedCarpenterGroup,
				"<img src='data/images/icons/icon_cook.png' width='16' height='16'></img> Cook": namedCookGroup,
				"<img src='data/images/icons/icon_entertainer.png' width='16' height='16'></img> Entertainer": namedEntertainerGroup,
				"<img src='data/images/icons/icon_warrior.png' width='16' height='16'></img> Fighter": namedFighterGroup,
				"<img src='data/images/icons/icon_priest.png' width='16' height='16'></img> Priest": namedPriestGroup,
				"<img src='data/images/icons/icon_smelter.png' width='16' height='16'></img> Smelter": namedSmelterGroup,
				"<img src='data/images/icons/icon_tanner.png' width='16' height='16'></img> Tanner": namedTannerGroup,
				"<img src='data/images/icons/icon_taskmaster.png' width='16' height='16'></img> Taskmaster": namedTaskmasterGroup,
				"<img src='data/images/icons/icon_random.png' width='16' height='16'></img> Random": namedRandomThrallGroup
			}
		}

		var groupedLocations = {
			"Locations": {
				"<img src='data/images/icons/icon_mitra.png' width='16' height='16'></img> Religion Trainer": ReligionGroup,
				"<img src='data/images/icons/icon_cave.png' width='16' height='16'></img> Caves": caveGroup,
				"<img src='data/images/icons/icon_dungeon.png' width='16' height='16'></img> Dungeons": dungeonGroup,
				"<img src='data/images/icons/icon_obelisk.png' width='16' height='16'></img> Obelisks": obeliskGroup,
				"<img src='data/images/icons/camp_vanir.png' width='16' height='16'></img> Camps": campGroup,
				"<img src='data/images/icons/capital_vanir.png' width='16' height='16'></img> Capitals": capitalGroup,
				"<img src='data/images/icons/icon_vista.png' width='16' height='16'></img> Vistas": vistaGroup,
				"<img src='data/images/icons/icon_ruins.png' width='16' height='16'></img> Ruins": ruinsGroup,
				"<img src='data/images/icons/icon_boss.png' width='16' height='16'></img> Bosses": bossGroup,
				//"<img src='data/images/icons/icon_lore.png' width='16' height='16'></img> Lore": loreGroup,
				"<img src='data/images/icons/icon_treasure.png' width='16' height='16'></img> Treasures": treasureGroup,
				"<img src='data/images/icons/icon_recipes.png' width='16' height='16'></img> Recipes": recipeGroup,
				"<img src='data/images/icons/icon_emote.png' width='16' height='16'></img> Emotes": emoteGroup,
			}
		}

		var groupedPets = {
			"Pets": {
				"<img src='data/images/icons/icon_petmerchant.png' width='16' height='16'></img> Pet Merchant": petMerchantGroup,
				"<img src='data/images/icons/icon_pethyena.png' width='16' height='16'></img> Hyena": petHyenaGroup,
				"<img src='data/images/icons/icon_petostrich.png' width='16' height='16'></img> Ostrich": petOstrichGroup,
				"<img src='data/images/icons/icon_petsabretooth.png' width='16' height='16'></img> Sabretooth": petSabretoothGroup,
				"<img src='data/images/icons/icon_petelephant.png' width='16' height='16'></img> Elephant": petElephantGroup,
				"<img src='data/images/icons/icon_pettiger.png' width='16' height='16'></img> Tiger": petTigerGroup,
				"<img src='data/images/icons/icon_petrhino.png' width='16' height='16'></img> Rhino": petRhinoGroup,
				"<img src='data/images/icons/icon_petfawn.png' width='16' height='16'></img> Fawn": petFawnGroup,
				"<img src='data/images/icons/icon_petcroc.png' width='16' height='16'></img> Crocodile": petCrocGroup,
				"<img src='data/images/icons/icon_petboar.png' width='16' height='16'></img> Boar": petBoarGroup,
				"<img src='data/images/icons/icon_petwolf.png' width='16' height='16'></img> Wolf": petWolfGroup,
			}
		}

		//Enable Group Options
		var options = {
			autoZIndex: true,
			groupCheckboxes: true,
			collapsed: true
		};

		var layerControlResources = L.control.groupedLayers(null, groupedResources, options);
		var layerControlThralls = L.control.groupedLayers(null, groupedThralls, options);
		var layerControlNamedThralls = L.control.groupedLayers(null, namedThralls, options);
		var layerControlLocations = L.control.groupedLayers(null, groupedLocations, options);
		var layerControlPets = L.control.groupedLayers(null, groupedPets, options);

		//OLD FILTERING
		layerControlResources.addTo(map);
		layerControlThralls.addTo(map);
		layerControlNamedThralls.addTo(map);
		layerControlLocations.addTo(map);
		layerControlPets.addTo(map);
		L.DomEvent.disableClickPropagation(layerControlLocations._container);
		L.DomEvent.disableClickPropagation(layerControlThralls._container);
		L.DomEvent.disableClickPropagation(layerControlResources._container);
		L.DomEvent.disableClickPropagation(layerControlNamedThralls._container);
		L.DomEvent.disableClickPropagation(layerControlPets._container);
		

		//Add Default Filters
		obeliskGroup.addTo(map);
		campGroup.addTo(map);
		capitalGroup.addTo(map);
		ruinsGroup.addTo(map);
		recipeGroup.addTo(map);
		emoteGroup.addTo(map);
		petMerchantGroup.addTo(map);