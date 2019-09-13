var resourceGenerator = 
{  
  currentCollected : 0,
  totalCollected : 0,
  hasManualButton: true,
  generatorLevel : 1,
  generatorLevelMax : 10,
  baseMultiplier : 1,
  upgradeCost : 10,
  upgradeCostMultiplier : 1.1,
  upgradeAvailable : false,
  currentGenerators : 0,
  
  increment : function(amount)
  {
    this.currentCollected = this.currentCollected + amount;
    this.totalCollected = this.totalCollected + amount
  },
  
  manualClick : function()
  {
    var manualTotal = (1*this.generatorLevel*this.baseMultiplier);
    this.increment(manualTotal);
  },
  
  spendResource : function(amount)
  {
    if(this.currentCollected >= amount)
      {
        this.currentCollected = this.currentCollected - amount;
        return true;
      }
    else
    {
      return false;
    }
  },
  
  upgradeGenLevel : function()
  {
    if(this.spendResource(this.upgradeCost))
    {
      this.generatorLevel+1;
      var newUpgradeCost = Math.floor(10 * Math.pow(this.upgradeCostMulitplier,this.generatorLevel*+this.currentGenerators));
      this.upgradeCost = this.upgradeCost+newUpgradeCost;
    }
  },
  
  checkAffordUpgrade : function()
  {
    if (this.currentCollected >= this.upgradeCost)
    return true;
  },
  
  checkUpgradeAvailable : function()
  {
    if(this.checkAffordUpgrade())
    {
      if(this.generatorLevel < this.generatorLevelMax)
      {
        this.upgradeAvailable = true;
      }
      else
      {
        this.upgradeAvailable = false;
      }
    }
    else
    {
      this.upgradeAvailable = false;
    }
  }
};