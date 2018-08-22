var ca;

function setup() {
  var myCanvas = createCanvas(windowWidth, windowHeight);
  myCanvas.parent('bg-container');
  background(0);
  ca = new CA(3);
}

function draw() {
  ca.display();
  if (ca.generation < height/ca.w) {
    ca.generate();
    if (ca.generation % 50 == 0) {
      ca.randomise();
    }
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  ca.generation = 0;
  ca.fillFirst();
}

function CA (w) {
  this.ruleset = [1, 1, 1, 0, 0, 1, 0, 1]; //cool {1, 1, 1, 0, 0, 1, 0, 1}
  this.cells = [];

  this.generation = 0;
  this.w = w;
  
  this.fillFirst = function() {
    for (var i = 0; i < width/this.w; i++) {
      this.cells[i] = int (random(2));
    }
  }
  
  this.fillFirst();

  this.rules = function (a, b, c) {
    var s = "" + a + b + c;
    var index = parseInt(s, 2);
    return this.ruleset[index];
  }

  this.generate = function() {
    var nextgen = [];
    for (var i = 1; i < (width/this.w)-1; i++) {
      var left = this.cells[i-1];
      var me = this.cells[i];
      var right = this.cells[i+1];
      nextgen[i] = this.rules(left, me, right);
    }
    this.cells = nextgen;
    this.generation ++;
  }

  this.randomise = function() {
    for (var i = 0; i < this.ruleset.length; i++) {
      this.ruleset[i] = int(random(2));
    }
  }

  this.display = function() {
    for (var i = 0; i < width/this.w; i++) {
      if (this.cells[i] == 1) fill(0);
      else             fill(255);
      noStroke();
      rect(i * this.w, this.generation * this.w, this.w, this.w);
    }
  }
}
