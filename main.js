var sod = 0;
var clickSod = 1;
var shovels = 0;
var shovelSod = 1;
var nextShovelCost = 10;
var hasShovels = false;
var moundLevel = 1;
var moundCost = 5;
var hasMound = false;
var critterCost = 100;
var critters = 0;
var critterFarmers = 0;
var critterSod = 0;
var critterMiners = 0;
var critterHarvesters = 0;
var maxCritters = 5;
var hasCritters = false;
var unlockFarming = false;
var tick = 0;

var updateDisplay = 
{
    updateAllDisplay: function()
    {
        this.updateSodDisplay();
        this.updateClickSodDisplay();
      
        this.updateShovelDisplay();
        this.updateShovelCostDisplay();
        this.checkAffordShovel();
        
        this.updateMoundCostDisplay();
        this.updateMoundLevelDisplay();
        this.checkAffordMound();
        
        this.updateCritterDisplay();
        this.updateCritterButtonDisplay();  
    },
  
    updateSodDisplay : function()
    {
        if(hasCritters == true)
        {
          // Take away Miners
          critterSod = critters - critterMiners;
      
          // Take away Farners 
          critterSod = critterSod - critterFarmers;
    
          // Take away Harvesters
          critterSod = critterSod - critterHarvesters;
        }
        
        var displaySod = (shovels*shovelSod) + (critterSod*moundLevel);
        document.getElementById("sodDisplay").innerHTML = (sod + "(+" + displaySod + " /s)");
    },
    updateClickSodDisplay: function()
    {
        document.getElementById("clickSodDisplay").innerHTML = "Gather Sod ("+ clickSod + ")"
    },
    checkAffordShovel: function()
    {  
        if (sod >= nextShovelCost)
        {
            document.getElementById("buyShovelButton").hidden = "";
        }
        else
        {
            document.getElementById("buyShovelButton").hidden = "hidden";
        }
    },
    updateShovelDisplay : function()
    {
        if (hasShovels == true)
        {
            document.getElementById("shovelDisplay").innerHTML = ("Shovels: " + shovels + " (Need: " + nextShovelCost + " Sod)");
        }
    },
    updateShovelCostDisplay : function()
    {
        document.getElementById("shovelCostDisplay").innerHTML = nextShovelCost;
    },
    updateMoundLevelDisplay: function()
    {
        if (hasMound == true)
        {
          document.getElementById("moundLevelDisplay").innerHTML = "Mound Lv." + moundLevel + " (Need: " + moundCost + " Shovels)";
        }
    },
    updateMoundCostDisplay : function()
    {
        if(hasMound == false)
        {
		        document.getElementById("buildMoundButton").textContent = ("Build Mound (" + moundCost + " Shovels)");
	      }
	      else
	      {
		        document.getElementById("buildMoundButton").textContent = ("Upgrade Mound (" + moundCost + " Shovels)");
	      }	
    },
    checkAffordMound : function()
    {
        if (shovels >= moundCost)
        {
            document.getElementById("buildMoundButton").hidden = "";
        }
        else
        {
            document.getElementById("buildMoundButton").hidden = "hidden";
        }
    },
    updateCritterDisplay : function()
    {
        if (hasCritters == true)
        {
            document.getElementById("critterDisplay").innerHTML = "Critters: " + critters + "/" + maxCritters +  " (Need: " + critterCost + " Sod)";
        }
    },
    updateCritterButtonDisplay : function()
    {
        if(hasMound == false)
        {
		        document.getElementById("buyCritterButton").hidden = "hidden";
	      }
	      else if (hasMound == true && sod >= critterCost)
	      {
            document.getElementById("buyCritterButton").hidden = "";
		        document.getElementById("buyCritterButton").textContent = "Buy Critter (" + critterCost + " Sod)";
	      }
        else
        {
            document.getElementById("buyCritterButton").hidden = "hidden";
        }
    }
};

function gatherSod(number)
{
    sod = sod + number;
};

function buyShovelClick()
{
    if (sod >= nextShovelCost)
    {
        if (hasShovels == false)
        {
            hasShovels = true
        }
        
        shovels = shovels + 1;
        sod = sod-nextShovelCost;
		    var newShovelCost = Math.floor(10 * Math.pow(1.1,(shovels)));
		    nextShovelCost = nextShovelCost + newShovelCost;
    }
};

function buildMoundClick()
{
    if (shovels >= moundCost)
    {
        shovels = shovels - moundCost;
        clickSod = clickSod*2;
        shovelSod = shovelSod*2;
      
		    if(hasMound == false)
        {
            hasMound = true;
        }
		    else
		    {
			      moundLevel = moundLevel + 1;
		    }
      
        moundCost = Math.floor(10 * Math.pow(1.1,moundLevel*+clickSod));
        updateDisplay.updateAllDisplay();
    }
};

function buyCritterClick()
{
    if (critters < maxCritters)
    {
        if (hasCritters == false)
        {
            hasCritters = true;
        }

        sod = sod - critterCost;
        critters = critters + 1;
        var newCritterCost = Math.floor(10 * Math.pow(1.1,moundLevel*+critters));
        critterCost = critterCost+newCritterCost;
        updateDisplay.updateAllDisplay();
        if (unlockFarming == false)
        {
            checkUnlockFarming()
        }
    }
};

function checkUnlockFarming()
{
    if (critters == 5)
    {
        unlockFarming = true;
        moundLevel = moundLevel + 1;
    }
};

var autoGather =
{
    autoGatherSod : function()
    {
        // Shovel Sod
        this.autoGatherShovels();
        // Critter Sod
        this.autoGatherCritters();
        // Farmer Sod
    },
    autoGatherShovels : function()
    {
        gatherSod(shovels*shovelSod);
    },
    autoGatherCritters : function()
    {
        // Set Critter Sod Base
        critterSod = critters;
      
        // Take away Miners
        critterSod = critterSod - critterMiners;
      
        // Take away Farmers 
        critterSod = critterSod - critterFarmers;
    
        // Take away Harvesters
        critterSod = critterSod - critterHarvesters;
        
        // Account For Mound Level
        critterSod = (critterSod*moundLevel);
  
        // Gather for Unemployed Critters
        gatherSod(critterSod*3);
    }
}

window.setInterval
(
function()
{
	  tick = tick + 1;
	  if (tick == 10)
	  {
		    autoGather.autoGatherSod();
		    tick = 0;
	  }
    
    updateDisplay.updateAllDisplay();
    
}, 100);