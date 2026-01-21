
let rows = 15;
let cols = 15;
let playing = false;

let timer;
let reproductionTime = 100;
let minpocetsouseduprozrozeni = 3;
let maxpocetsouseduprozaniknuti = 3;
let minpocetsouseduprozaniknuti = 2;
let minpocpropre = 2;
let maxpocpropre = 3;

let grid = new Array(rows);
let nextGrid = new Array(rows);

function initializeGrids() {
  for (let i = 0; i < rows; i++) {
    grid[i] = new Array(cols);
    nextGrid[i] = new Array(cols);
  }
}

function resetGrids() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      grid[i][j] = 0;
      nextGrid[i][j] = 0;
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
    controls();
    createTable();
    initializeGrids()
    setupControlButtons();
    resetGrids()
    updateLiveCellCount();
});

function createTable() {
    let gridContainer = document.querySelector("#gridContainer");
    if (!gridContainer) {
        // throw error
        console.error("Problem: no div for the grid table!");
    }
    let table = document.createElement("table");

    for (let i = 0; i < rows; i++) {
        let tr = document.createElement("tr");
        for (let j = 0; j < cols; j++) {
            let cell = document.createElement("td");
            cell.setAttribute("id", i + "_" + j);
            cell.setAttribute("class", "dead");
            cell.onclick = cellClickHandler;
            tr.appendChild(cell);
        }
        table.appendChild(tr);
    }

    gridContainer.appendChild(table);
    table.style.margin = "0 auto";
    table.style.border = "3px solid black";
}
function resetTable() {
    let gridContainer = document.querySelector("#gridContainer");
    gridContainer.innerHTML = "";
    createTable();
    initializeGrids()
    setupControlButtons();
    resetGrids()
    updateLiveCellCount();
}

function controls() {

    let textgrid = document.createElement("div");
    document.body.appendChild(textgrid);
    textgrid.setAttribute("id", "textgrid");
    textgrid.style.textAlign = "center";
    textgrid.style.marginTop = "10px";
   

    let textzivebunky = textgrid.appendChild(document.createElement("h1"));
    textzivebunky.innerHTML = " "; 
    textzivebunky.style.fontSize = "2rem";
    textzivebunky.style.color = "white";

    let controlsdiv = document.createElement("div");
    controlsdiv.setAttribute("class", "controlsdiv");
    document.body.appendChild(controlsdiv);
    controlsdiv.style.display = "flex";
    controlsdiv.style.textAlign = "center";
    controlsdiv.style.marginTop = "80px";
    controlsdiv.style.border = "2px solid white";
    controlsdiv.style.borderRadius = "10px";
    controlsdiv.style.padding = "20px";
    controlsdiv.style.margin = "20px auto";
    controlsdiv.style.size = "fit-content";
    
    let rychlostlabel = controlsdiv.appendChild(document.createElement("label"));
    rychlostlabel.setAttribute("for", "rychlostpole");
    rychlostlabel.innerHTML = "Rychlost (ms):";
    rychlostlabel.style.color = "white";
    rychlostlabel.style.fontSize = "1.2rem";
    rychlostlabel.style.fontFamily = "Arial, sans-serif";
    rychlostlabel.style.marginRight = "10px";

    let rychlostpole = controlsdiv.appendChild(document.createElement("input"));
    rychlostpole.setAttribute("type", "number");
    rychlostpole.setAttribute("value", reproductionTime);
    rychlostpole.setAttribute("id", "rychlostpole");
    rychlostpole.setAttribute("class", "inputfield");
    rychlostpole.style.marginTop = "10px";
    rychlostpole.addEventListener("input", () => {
        if (rychlostpole.value < 100)
        reproductionTime = 100;
        
        if (rychlostpole.value == "")
         rychlostpole.value = 100;

        else
        reproductionTime = parseInt(rychlostpole.value);
    });

    let velikostlabel = controlsdiv.appendChild(document.createElement("label"));
    velikostlabel.setAttribute("for", "velikostpole");
    velikostlabel.innerHTML = "Velikost tabulky:";
    velikostlabel.style.color = "white";
    velikostlabel.style.fontSize = "1.2rem";
    velikostlabel.style.fontFamily = "Arial, sans-serif";
    velikostlabel.style.margin = "0 10px 0 20px";

    let size = 15;
    let velikostpole = controlsdiv.appendChild(document.createElement("input"));
    velikostpole.setAttribute("type", "number");
    velikostpole.setAttribute("value", size);
    velikostpole.setAttribute("id", "velikostpole");
    velikostpole.setAttribute("class", "inputfield");
    velikostpole.style.marginTop = "10px";
    velikostpole.style.width = "60px";
    velikostpole.addEventListener("input", () => {
      if (velikostpole.value < 15){
          velikostpole.value = 15;
          size = parseInt(velikostpole.value);
          rows = size;
          cols = size;
          resetTable();
        }
      else{
      size = parseInt(velikostpole.value);
      rows = size;
      cols = size; 
      resetTable();
      }
    });

    let sousedipocetpotrebalabelzrozeni = controlsdiv.appendChild(document.createElement("label"));
    sousedipocetpotrebalabelzrozeni.setAttribute("for", "sousedipocetpotreba");
    sousedipocetpotrebalabelzrozeni.innerHTML = " Počet sousedů pro zrození: ";
    sousedipocetpotrebalabelzrozeni.style.color = "white";
    sousedipocetpotrebalabelzrozeni.style.fontSize = "1.2rem";
    sousedipocetpotrebalabelzrozeni.style.fontFamily = "Arial, sans-serif";
    sousedipocetpotrebalabelzrozeni.style.margin = "0 10px 0 20px";

    
    let sousedipocetpotrebazrozeni = controlsdiv.appendChild(document.createElement("input"));
    sousedipocetpotrebazrozeni.setAttribute("type", "number");
    sousedipocetpotrebazrozeni.setAttribute("value", minpocetsouseduprozrozeni);
    sousedipocetpotrebazrozeni.setAttribute("id", "sousedipocetpotrebazrozeni");
    sousedipocetpotrebazrozeni.setAttribute("class", "inputfield");
    sousedipocetpotrebazrozeni.style.marginTop = "10px";
    sousedipocetpotrebazrozeni.style.width = "60px";
    sousedipocetpotrebazrozeni.addEventListener("input", () => {
       
        minpocetsouseduprozrozeni = parseInt(sousedipocetpotrebazrozeni.value);
        
    });

    let maxsousedipocetpotrebalabelprozaniknuti = controlsdiv.appendChild(document.createElement("label"));
    maxsousedipocetpotrebalabelprozaniknuti.setAttribute("for", "sousedipocetpotreba");
    maxsousedipocetpotrebalabelprozaniknuti.innerHTML = "Maximální počet sousedů pro zánik: ";
    maxsousedipocetpotrebalabelprozaniknuti.style.color = "white";
    maxsousedipocetpotrebalabelprozaniknuti.style.fontSize = "1.2rem";
    maxsousedipocetpotrebalabelprozaniknuti.style.fontFamily = "Arial, sans-serif";
    maxsousedipocetpotrebalabelprozaniknuti.style.margin = "0 10px 0 20px";

    let maxsousedipocetpotrebaprozaniknuti = controlsdiv.appendChild(document.createElement("input"));
    maxsousedipocetpotrebaprozaniknuti.setAttribute("type", "number");
    maxsousedipocetpotrebaprozaniknuti.setAttribute("value", maxpocetsouseduprozaniknuti);
    maxsousedipocetpotrebaprozaniknuti.setAttribute("id", "sousedipocetpotrebaprozaniknuti");
    maxsousedipocetpotrebaprozaniknuti.setAttribute("class", "inputfield");
    maxsousedipocetpotrebaprozaniknuti.style.marginTop = "10px";
    maxsousedipocetpotrebaprozaniknuti.style.width = "60px";

    maxsousedipocetpotrebaprozaniknuti.addEventListener("input", () => {
        maxpocetsouseduprozaniknuti = parseInt(maxsousedipocetpotrebaprozaniknuti.value);
    });
    
    let minsousedipocetpotrebalabelprozaniknuti = controlsdiv.appendChild(document.createElement("label"));
    minsousedipocetpotrebalabelprozaniknuti.setAttribute("for", "sousedipocetpotreba");
    minsousedipocetpotrebalabelprozaniknuti.innerHTML = " Minimální počet sousedů pro zánik: ";
    minsousedipocetpotrebalabelprozaniknuti.style.color = "white";
    minsousedipocetpotrebalabelprozaniknuti.style.fontSize = "1.2rem";
    minsousedipocetpotrebalabelprozaniknuti.style.fontFamily = "Arial, sans-serif";
    minsousedipocetpotrebalabelprozaniknuti.style.margin = "0 10px 0 20px"; 

    let minsousedipocetpotrebaprozaniknuti = controlsdiv.appendChild(document.createElement("input"));
    minsousedipocetpotrebaprozaniknuti.setAttribute("type", "number");
    minsousedipocetpotrebaprozaniknuti.setAttribute("value", minpocetsouseduprozaniknuti);
    minsousedipocetpotrebaprozaniknuti.setAttribute("id", "sousedipocetpotrebaprozaniknuti");
    minsousedipocetpotrebaprozaniknuti.setAttribute("class", "inputfield");
    minsousedipocetpotrebaprozaniknuti.style.marginTop = "10px";
    minsousedipocetpotrebaprozaniknuti.style.width = "60px";

    minsousedipocetpotrebaprozaniknuti.addEventListener("input", () => {
        
        minpocetsouseduprozaniknuti = parseInt(minsousedipocetpotrebaprozaniknuti.value);
        
    });
    
    let minpocetproprelabel = controlsdiv.appendChild(document.createElement("label"));
    minpocetproprelabel.setAttribute("for", "minpocetpropre");
    minpocetproprelabel.innerHTML = " Minimální počet sousedů pro přežití: ";
    minpocetproprelabel.style.color = "white";
    minpocetproprelabel.style.fontSize = "1.2rem";
    minpocetproprelabel.style.fontFamily = "Arial, sans-serif";
    minpocetproprelabel.style.margin = "0 10px 0 20px";

    let minpocetpropre = controlsdiv.appendChild(document.createElement("input"));;
    minpocetpropre.setAttribute("type", "number");
    minpocetpropre.setAttribute("value", minpocpropre);
    minpocetpropre.setAttribute("id", "minpocetpropre");
    minpocetpropre.setAttribute("class", "inputfield");
    minpocetpropre.style.marginTop = "10px";
    minpocetpropre.style.width = "60px";
    minpocetpropre.addEventListener("input", () => {
      
        minpocpropre = parseInt(minpocetpropre.value);
        
    });

    let maxpocetproprelabel = controlsdiv.appendChild(document.createElement("label"));
    maxpocetproprelabel.setAttribute("for", "maxpocetpropre");
    maxpocetproprelabel.innerHTML = " Maximální počet sousedů pro přežití: ";
    maxpocetproprelabel.style.color = "white";
    maxpocetproprelabel.style.fontSize = "1.2rem";
    maxpocetproprelabel.style.fontFamily = "Arial, sans-serif";
    maxpocetproprelabel.style.margin = "0 10px 0 20px";

    let maxpocetpropre = controlsdiv.appendChild(document.createElement("input"));;
    maxpocetpropre.setAttribute("type", "number");
    maxpocetpropre.setAttribute("value", maxpocpropre);
    maxpocetpropre.setAttribute("id", "maxpocetpropre");
    maxpocetpropre.setAttribute("class", "inputfield");
    maxpocetpropre.style.marginTop = "10px";
    maxpocetpropre.style.width = "60px";
    maxpocetpropre.addEventListener("input", () => {
        
        maxpocpropre = parseInt(maxpocetpropre.value);
        
    }); 
    let inputfields = document.querySelectorAll(".inputfield");
    inputfields.forEach(field => {
        field.style.backgroundColor = "grey";
        field.style.color = "white";
        field.style.border = "1px solid white";
        field.style.borderRadius = "5px";
        field.style.padding = "5px";
        field.style.fontSize = "1rem";
    });
  
}

function setupControlButtons() {

    let startButton = document.querySelector('#start');
    let clearButton = document.querySelector('#clear');
    let rButton = document.querySelector('#random');

    startButton.onclick = () => {
        if (playing) {
            console.log('Pause the Game');
            playing = false;
            startButton.innerHTML = 'continue';
        } else {
            console.log('Cont the game');
            playing = true;
            startButton.innerHTML = 'pause';
            play();
        };
    };

    clearButton.onclick = () => {
        console.log("kliknul si na clear");
        playing = false;
        startButton.innerHTML = "start";
        resetGrids();
        updateView();
       updateLiveCellCount();
    };

     rButton.onclick = () => {
        for (let i = 0; i < rows; i++) {
            for (let j = 0; j < cols; j++) {
                grid[i][j] = Math.floor(Math.random() * 2);
                var cell = document.getElementById(i + '_' + j);
                if (grid[i][j] == 1) cell.setAttribute('class', 'live');
                else cell.setAttribute('class', 'dead');
            }
        }
        updateLiveCellCount();
    }
}
function play() {
    console.log("Hra jede.");
    computeNextGen();
    updateLiveCellCount();
     if (playing) {
        timer = setTimeout(play, reproductionTime);
    }
}

function computeNextGen() {
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      applyRules(i, j);
    }
  }
  copyAndResetGrid();
    updateView();
}

function updateLiveCellCount() {
    let liveCellCount = 0;
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            if (grid[i][j] == 1) {
                liveCellCount++;
            }
        }
    }
    let textgrid = document.querySelector("#textgrid h1");
    textgrid.innerHTML = "Živé buňky: " + liveCellCount;
}

function copyAndResetGrid() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            grid[i][j] = nextGrid[i][j];
            nextGrid[i][j] = 0;
        }
    }
}

function updateView() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            let cell = document.getElementById(i + '_' + j);
            if (grid[i][j] == 0) {
                cell.setAttribute('class', 'dead');
            } else {
                cell.setAttribute('class', 'live');
            }
        }
    }
}

function applyRules(row, col) {
  let numNeighbors = countNeighbors(row, col);
  if (grid[row][col] == 1) {
    if (numNeighbors < minpocetsouseduprozaniknuti) {
      nextGrid[row][col] = 0;
    } else if (numNeighbors == minpocpropre || numNeighbors == maxpocpropre) {
      nextGrid[row][col] = 1;
    } else if (numNeighbors > maxpocetsouseduprozaniknuti) {
      nextGrid[row][col] = 0;
    }
  } else if (grid[row][col] == 0) {
    if (numNeighbors == minpocetsouseduprozrozeni) {
      nextGrid[row][col] = 1;
    }
  }
}

function countNeighbors(row, col) {
  let count = 0;
  if (row - 1 >= 0) {
    if (grid[row - 1][col] == 1) count++;
  }
  if (row - 1 >= 0 && col - 1 >= 0) {
    if (grid[row - 1][col - 1] == 1) count++;
  }
  if (row - 1 >= 0 && col + 1 < cols) {
    if (grid[row - 1][col + 1] == 1) count++;
  }
  if (col - 1 >= 0) {
    if (grid[row][col - 1] == 1) count++;
  }
  if (col + 1 < cols) {
    if (grid[row][col + 1] == 1) count++;
  }
  if (row + 1 < rows) {
    if (grid[row + 1][col] == 1) count++;
  }
  if (row + 1 < rows && col - 1 >= 0) {
    if (grid[row + 1][col - 1] == 1) count++;
  }
  if (row + 1 < rows && col + 1 < cols) {
    if (grid[row + 1][col + 1] == 1) count++;
  }
  return count;
}

function cellClickHandler() {
    let rowcol = this.id.split("_");
    let row = rowcol[0];
    let col = rowcol[1];


  let classes = this.getAttribute('class');
  if (classes.indexOf('live') > -1) {
    this.setAttribute('class', 'dead');
    grid[row][col] = 0;
    updateLiveCellCount();
  } else {
    this.setAttribute('class', 'live');
    grid[row][col] = 1;
    updateLiveCellCount();
  }
}