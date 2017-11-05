'use strict';
//
//
function Frame() {
  this._wasStrike = false;
  this._wasSpare = false;
  this._frameAndRoll = [1, 1];
  this._scoreSheet = [];
};
//
Frame.prototype.roll = function(roll) {
  // Game._totalScore += roll;
  this._scoreSheet.push(roll);
  this.rollType(roll);
  this.updateFrameAndRoll(roll);
};

Frame.prototype.updateFrameAndRoll = function(roll) {
  if (this._frameAndRoll[1] === 2 || roll === 10) {
    this._frameAndRoll[0] += 1;
  } else {
    this._frameAndRoll[1] += 1;
  }
};

Frame.prototype.rollType = function(roll) {
  if (roll === 10) {
    this._wasStrike = true;
  }
  if ((this._frameAndRoll[1] === 2) && (this._scoreSheet[this._scoreSheet.length - 2] + roll === 10)) {
    this._wasSpare = true;
  }
};

Frame.prototype.getTotalScore = function() {
  var totalScore = this.sumScoreSheet() + this.calculateBonuses();
  console.log(totalScore);
  return totalScore;
};


Frame.prototype.sumScoreSheet = function() {
  var scoreSheet = this._scoreSheet;
  var scoreSheetSum = scoreSheet.reduce(function(accumulator, currentValue) {
    return accumulator + currentValue;
  });
  return scoreSheetSum;
};


Frame.prototype.calculateBonuses = function() {
  return this.totalStrikesBonuses() + this.totalSpareBonuses()

};


Frame.prototype.totalStrikesBonuses = function() {
  var scoreSheetLength = this._scoreSheet.length;
  var totalStrikesBonuses = 0;
  for (var i = 0; i < scoreSheetLength; i++) {
      console.log(this._scoreSheet[i]);
    if (this._scoreSheet[i] === 10 && this._scoreSheet[i + 1] < 10) {
      totalStrikesBonuses += (this._scoreSheet[i + 1] + this._scoreSheet[i + 2]);
      console.log(totalStrikesBonuses);
    } else if (this._scoreSheet[i] === 10 && this._scoreSheet[i + 1] === 10) {
      totalStrikesBonuses += this._scoreSheet[i + 1];
        console.log(totalStrikesBonuses);
    };
  };
     return totalStrikesBonuses;
};

Frame.prototype.totalSpareBonuses = function() {
  var scoreSheetLength = this._scoreSheet.length;
  var totalSpareBonuses = 0;
  for (var i = 0; i < scoreSheetLength; i++) {
    if (this._frameAndRoll[1] === 2 && (this._scoreSheet[i] + this._scoreSheet[i - 1]) === 10) {
      totalSpareBonuses += this._scoreSheet[i + 1];
    }
  };
    return totalSpareBonuses;
  };









// function FrameTen(roll) {
//
// };
