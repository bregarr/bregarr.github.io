// Global
Tabs = ["Gamedev", "Software", "Art"];
CellContents = [[], []];
var projArray;

// Reference
// // Cells name comp = num+type+'Button' || 'Cell'
// // Ex: 1ImageButton && 1ImageCell

function swapTab(tabType) {
    // Disables every tab that isn't the newly selected one
    DisableTabs = Tabs.filter(item => item !== tabType);
    console.log(DisableTabs);
    DisableTabs.forEach(tab => {
        document.getElementById(tab).style.display = 'none';
        document.getElementById(tab+"Button").classList.remove('active-tab');
    });
    
    // Enables the new tab
    document.getElementById(tabType).style.display = 'inline';
    document.getElementById(tabType+"Button").classList.add('active-tab');
}

function getNextUppercase(word, startInd){
    for(let i=startInd; i<word.length; i++){
        if(/[A-Z]/.test(word.substring(i,i+1))) { return i; }
    }
    return -1;
}

// num = Entry Number, type = Cell Type
function enableCell(internalID){
    // Decomp internalID
    num = internalID.substring(0,getNextUppercase(internalID,0));
    const ElementInd = getNextUppercase(internalID, getNextUppercase(internalID, 0)+1);
    type = internalID.substring(getNextUppercase(internalID, 0), ElementInd);

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

        CellContents.push(new Array());

        const cellDiv = document.createElement("article");
        var titleElem;
        // Links to site if column 7 is set
        if(projArray[k][7].includes("<")) { titleElem = document.createElement("h3"); }
        else { titleElem = document.createElement("a"); titleElem.href = projArray[k][7]; }

        // Creates other cell elements
        const descElem = document.createElement("p");
        const thumbnailElem = document.createElement("img");
        const buttonDiv = document.createElement("nav");
        const projectDiv = document.createElement("div");

        // Adds elements to divs
        projectDiv.classList.add("ProjCell");
        projectDiv.appendChild(titleElem);
        projectDiv.appendChild(thumbnailElem);
        projectDiv.appendChild(descElem);
        cellDiv.appendChild(projectDiv);

        // Image Section
        if(!projArray[k][2].includes("<")) {
            // Setup
            const imgButton = document.createElement("input");
            const imgDiv = document.createElement("div");
            imgButton.value = "Images";
            buttonDiv.appendChild(imgButton);
            imgButton.type = 'Button';
            cellDiv.appendChild(imgDiv);

            // Ease of Disabling Cells
            imgDiv.style = "display: none";

            imgButton.classList.add('InactiveCell');
            imgButton.id = k + 'ImageButton';
            CellContents[k].push('Image');
            imgDiv.classList.add('CellContent');
            imgDiv.id = k+"ImageCell";
            imgButton.onclick = () => enableCell(imgButton.id);

            // Loads images from data cell
            var imgFiles = new Array(0);
            var tempWord = "";
            for (let i=0; i<projArray[k][2].length; i++){
                currChar = projArray[k][2].substring(i, i+1);
                if(currChar !== '&'){ tempWord += currChar; }
                else { imgFiles.push(tempWord); tempWord = ""; }
            }
            imgFiles.push(tempWord);

            for (let i=0; i<imgFiles.length; i++){
                var insIndex = imgFiles[i].indexOf('>');
                var newImg = document.createElement('img');
                newImg.src = "assets/"+imgFiles[i].substring(0,insIndex);
                newImg.classList.add(imgFiles[i].substring(insIndex+1, imgFiles[i].length));
                imgDiv.appendChild(newImg);
            }
        }

        // Code Section
        if(!projArray[k][3].includes("<")) {
            const codeButton = document.createElement("input");
            const codeDiv = document.createElement("div");
            codeButton.value = "Code";
            buttonDiv.appendChild(codeButton);
            codeButton.type = 'Button';
            cellDiv.appendChild(codeDiv);

            // Ease of Disabling Cells
            codeDiv.style = "display: none";

            codeButton.classList.add('InactiveCell');
            codeButton.id = k+'CodeButton';
            CellContents[k].push('Code');
            codeDiv.classList.add('CellContent');
            codeDiv.id = k+'CodeCell';
            codeButton.onclick = () => enableCell(codeButton.id);

            var codeFiles = new Array(0);
            var tempWord = "";
            for(let i=0; i<projArray[k][3].length; i++){
                currChar = projArray[k][3].substring(i, i+1);
                if(currChar !== '&') { tempWord += currChar; }
                else { codeFiles.push(tempWord); tempWord = ""; }
            }
            codeFiles.push(tempWord);

            for(let i=0; i<codeFiles.length; i++){
                var newCode = document.createElement('embed');
                newCode.src = "code/"+codeFiles[i];
                newCode.classList.add('CodeEmbed');
                codeDiv.appendChild(newCode);
            }
        }

        // Source Section
        if(!projArray[k][4].includes("<")) {
            const srcButton = document.createElement("input");
            const srcDiv = document.createElement("div");
            srcButton.value = "Source";
            buttonDiv.appendChild(srcButton);
            srcButton.type = 'Button';
            cellDiv.appendChild(srcDiv);

            // Ease of Disabling Cells
            srcDiv.style = "display: none";

            srcButton.classList.add('InactiveCell');
            srcButton.id = k+'SourceButton';
            CellContents[k].push('Source');
            srcDiv.classList.add('CellContent');
            srcDiv.id = k+'SourceCell';
            srcButton.onclick = () => enableCell(srcButton.id);

            var newSource = document.createElement('embed');
            newSource.src = "code/"+projArray[k][4];
            newSource.classList.add('SourceEmbed');
            srcDiv.appendChild(newSource);
        }

        // File Section
        if(!projArray[k][5].includes("<")) { 
            const fileButton = document.createElement("input");
            const fileDiv = document.createElement("div");
            fileButton.value = "Files";
            fileDiv.appendChild(fileButton);
            buttonDiv.appendChild(fileButton);
            fileButton.type = 'Button';
            cellDiv.appendChild(fileDiv);
            
            // Ease of Disabling Cells
            fileDiv.style = "display: none";

            fileButton.classList.add('InactiveCell');
            fileButton.id = k+'FilesButton';
            CellContents[k].push('Files');
            fileDiv.classList.add('CellContent');
            fileDiv.id = k+'FilesCell';
            fileButton.onclick = () => enableCell(fileButton.id);

            var fileFiles = new Array(0);
            var tempWord = "";
            for(let i=0; i<projArray[k][5].length; i++){
                currChar = projArray[k][5].substring(i, i+1);
                if(currChar !== '&'){ tempWord += currChar; }
                else { fileFiles.push(tempWord); tempWord = ""; }
            }
            fileFiles.push(tempWord);

            for(let i=0; i<fileFiles.length; i++){
                const newFile = document.createElement('a');
                newFile.href = "code/"+fileFiles[i];
                newFile.download = "code/"+fileFiles[i];
                newFile.classList.add('FileDownload');
                newFile.textContent = "Download " + fileFiles[i];
                const lineBreak = document.createElement('br');
                fileDiv.appendChild(newFile);
                fileDiv.appendChild(lineBreak);
            }
        }

        // CellDiv Cleanup
        var thumbSrc = projArray[k][6];
        var insIndex = thumbSrc.indexOf('>');
        thumbnailElem.src = "assets/"+thumbSrc.substring(0,insIndex);
        thumbnailElem.classList.add(thumbSrc.substring(insIndex+1,thumbSrc.length));

        titleElem.textContent = projArray[k][0];
        descElem.textContent = projArray[k][1];

        cellDiv.classList.add('Content');
        cellDiv.appendChild(buttonDiv);

        buttonDiv.classList.add('ProjNav');
        titleElem.classList.add('ProjHeading');
        descElem.classList.add('ProjText');

        if(document.getElementById(projArray[k][8]) !== null){
            document.getElementById(projArray[k][8]).appendChild(cellDiv);
        }
    }
})();