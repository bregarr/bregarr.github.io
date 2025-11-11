CellContents = [[], []];
var projArray;

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
    for(i = data.values.length-1; i >= 0 ; i--){
        rowArray = [];
        for(c = 0; c < data.values[0].length; c++){
            dataVal = data.values[i][c];
            if(dataVal != undefined) { rowArray.push(dataVal); }
            else { rowArray.push("<"); }
        }
        projArray.push(rowArray);
    }
}

(async function() {
    await fetchPrivateSheet();
    
    const searchParams = new URLSearchParams(window.location.search);
    var projectIndex = searchParams.get("index");

    document.getElementById("MainTitle").textContent = projArray[projectIndex][0];

    var DescDiv = document.createElement("section");
    DescDiv.classList.add("projectdesc");

    var DescText = document.createElement("p");
    DescText.textContent = projArray[projectIndex][1];
    DescDiv.appendChild(DescText);

    var ImgDiv = document.createElement("section");
    ImgDiv.classList.add("projectdesc");

    // Loads images from data cell
    var imgFiles = new Array(0);
    var tempWord = "";
    for (let i=0; i<projArray[projectIndex][2].length; i++){
        currChar = projArray[projectIndex][2].substring(i, i+1);
        if(currChar !== '&'){ tempWord += currChar; }
        else { imgFiles.push(tempWord); tempWord = ""; }
    }
    imgFiles.push(tempWord);

    for (let i=0; i<imgFiles.length; i++){
        var insIndex = imgFiles[i].indexOf('>');
        var newImg = document.createElement('img');
        newImg.src = "assets/"+imgFiles[i].substring(0,insIndex);
        newImg.classList.add(imgFiles[i].substring(insIndex+1, imgFiles[i].length));
        ImgDiv.appendChild(newImg);
    }

    // Final Append
    var projectHolder = document.getElementById("ProjectHolder");
    projectHolder.appendChild(DescDiv);
    projectHolder.appendChild(ImgDiv);

})();