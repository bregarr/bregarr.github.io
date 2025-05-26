// Global
Tabs = ["Gamedev", "Software", "Hardware", "Art"];
CellContents = [[], []];
var projArray;

// Reference
// // Cells name comp = num+type+'Button' || 'Cell'
// // Ex: 1ImageButton && 1ImageCell

function swapTab(tabType) {
    // Disables every tab that isn't the newly selected one
    DisableTabs = Tabs.filter(item => item !== tabType);
    DisableTabs.forEach(tab => {
        document.getElementById(tab).style.display = 'none';
        document.getElementById(tab+"Button").classList.remove('CurrentTab');
        document.getElementById(tab+"Button").classList.add('InactiveTab');
    });
    
    // Enables the new tab
    document.getElementById(tabType).style.display = 'inline';
    document.getElementById(tabType+"Button").classList.add('CurrentTab');
    document.getElementById(tabType+"Button").classList.remove('InactiveTab');
}

// num = Entry Number, type = Cell Type
function enableCell(num, type){
    elemButton = document.getElementById(num+type+'Button'); // Button of the referenced cell
    elemCell = document.getElementById(num+type+'Cell'); // Div of the referenced cell
    // Closes the cell if it is already selected
    if(elemButton.classList.contains('SelectedCell')) {
        elemButton.classList.remove('SelectedCell'); elemButton.classList.add('InactiveCell');
        elemCell.style.display = 'none';
    }
    // Opens the cell if it is not already open
    else {
        elemButton.classList.add('SelectedCell'); elemButton.classList.remove('InactiveCell');
        elemCell.style.display = 'block';
    }

    // Disables all other cells in the group
    DisableList = CellContents[num];
    DisableList.forEach(dType => {
        if(dType !== type){
            dElemButton = document.getElementById(num+dType+'Button');
            document.getElementById(num+dType+'Cell').style.display = 'none';
            if(dElemButton.classList.contains('SelectedCell')){
                dElemButton.classList.remove('SelectedCell'); dElemButton.classList.add('InactiveCell');
            }
        }
    });    
}

// Populates the projArray with Google Sheets data
async function fetchPrivateSheet() {
    const SheetK = "AIzaSyCE-rKpVbm6l23iLdmD5mIWpvOiAnOh4oo";
    const SheetID = "1fQmtzIvjzD_6DSqiuy9-txca9QZQ4Z_0eLRKi0pWTk0";
    const range = "projSheet!A2:I50";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SheetID}/values/${range}?key=${SheetK}`;

    const response = await fetch(url);
    const data = await response.json();

    projArray = new Array();

    // Take values from data into projArray, clean mistakes
    for(i = 0; i < data.values.length; i++){
        rowArray = [];
        for(c = 0; c < data.values[0].length; c++){
            dataVal = data.values[i][c];
            if(dataVal != undefined) { rowArray.push(dataVal); }
            else { rowArray.push("<"); }
        }
        projArray.push(rowArray);
    }
}

// Creates the elements inside the tabs
(async function() {
    await fetchPrivateSheet();

    for(k = 0; k < projArray.length; k++){ // Loops all rows of the projects
        if(projArray[k][8].includes("<")) { continue; }
        // Manage if project is within two tabs
        if(projArray[k][8].includes(",")){
            projSplit = projArray[k][8].split(",");
            if(projSplit.length > 1) {
                typesArray = projSplit.slice(1);
                projArray[k][8] = projSplit[0];

                newLine = structuredClone(projArray[k]);
                newLine[8] = typesArray;

                projArray.splice(k, 0, newLine);
            }
        }

        const cellDiv = document.createElement("div");
        var titleElem;
        // Links to site if column 7 is set
        if(projArray[k][7].includes("<")) { titleElem = document.createElement("p"); }
        else { titleElem = document.createElement("a"); titleElem.href = projArray[k][7]; }

        // Creates other cell elements
        const descElem = document.createElement("p");
        const thumbnailElem = document.createElement("img");
        const buttonDiv = document.createElement("div");
        const projectDiv = document.createElement("div");

        // Adds elements to divs
        projectDiv.classList.add("ProjCell");
        projectDiv.appendChild(titleElem);
        projectDiv.appendChild(thumbnailElem);
        projectDiv.appendChild(descElem);
        projectDiv.appendChild(buttonDiv);
        cellDiv.appendChild(projectDiv);
    }
})();