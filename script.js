var sod = 0;
var clickSod = 1;
var shovels = 0;
var shovelSod = 1;
var nextShovelCost = 5;
var moundBase = 1;
var moundCost = 5;
var hasMound = false;
var tick = 0;

var updateDisplay = 
{
    updateAllDisplay: function()
    {
        this.updateSodDisplay();
        this.updateClickSodDisplay();
        this.updateShovelDisplay();
        this.updateShovelCostDisplay();
        this.updateMoundCostDisplay();
    },
  
    updateSodDisplay : function()
    {
        document.getElementById("sodDisplay").innerHTML = (sod + "(" + (shovels*shovelSod) + " /s)");
    },
    updateClickSodDisplay: function()
    {
        document.getElementById("clickSodDisplay").innerHTML = "Gather Sod ("+ clickSod + ")"
    },
    updateShovelDisplay : function()
    {
        document.getElementById("shovelDisplay").innerHTML = shovels;
    },
    updateShovelCostDisplay : function()
    {
        document.getElementById("shovelCostDisplay").innerHTML = nextShovelCost;
    },
    updateMoundCostDisplay : function()
    {
        document.getElementById("moundCostDisplay").innerHTML = moundCost;
    }
};

function gatherSod(number)
{
    sod = sod + number;
	  updateDisplay.updateAllDisplay();
};

function buyShovelClick()
{
    if (sod >= nextShovelCost)
    {
        shovels = shovels + 1;
        sod = sod-nextShovelCost;
		    var newShovelCost = Math.floor(10 * Math.pow(1.1,(shovels)));
		    nextShovelCost = nextShovelCost + newShovelCost;
		    
        updateDisplay.updateAllDisplay();
    }
};

function checkAffordShovel()
{
    if (sod >= nextShovelCost)
    {
        document.getElementById("buyShovelButton").hidden = "";
    }
    else
    {
        document.getElementById("buyShovelButton").hidden = "hidden";
    }
};

function checkAffordMound()
{
    if (shovels >= moundCost)
    {
        document.getElementById("buildMoundButton").hidden = "";
    }
    else
    {
        document.getElementById("buildMoundButton").hidden = "hidden";
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
			      moundBase = moundBase + 1;
		    }
      
        moundCost = Math.floor(10 * Math.pow(1.1,moundBase*+clickSod));
        updateDisplay.updateAllDisplay();
    }
};

window.setInterval
(
function()
{
	  tick = tick + 1;
	  if (tick == 10)
	  {
		    gatherSod(shovels*shovelSod);
		    tick = 0;
	  }
    
    checkAffordShovel();
    checkAffordMound();
    updateDisplay.updateAllDisplay();
    if(hasMound == false)
    {
		    document.getElementById("buildMoundButton").textContent = ("Build Mound (" + moundCost + " Shovels)");
	  }
	  else
	  {
		  document.getElementById("buildMoundButton").textContent = ("Upgrade Mound (" + moundCost + " Shovels)");
	  }	
}, 100);