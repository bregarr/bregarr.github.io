CellContents = [[], []];
var projArray;

// Populates the projArray with Google Sheets data
async function fetchPrivateSheet() {
    // I know this is public I just don't think its important
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
    
    // SETUP //

    const searchParams = new URLSearchParams(window.location.search);
    var projectIndex = searchParams.get("index");
    var currentData = projArray[projectIndex];
    const HeaderHolder = document.getElementById("MainTitleHolder");

    var HeaderText;
    if(!currentData[7].includes("<")){
        HeaderText = document.createElement('a');
        HeaderText.href = currentData[7];
    } else {
        HeaderText = document.createElement('h1');
    }
    HeaderText.id = "MainTitle";
    HeaderHolder.appendChild(HeaderText);
    HeaderText.textContent = currentData[0];

    var DescDiv = document.createElement("section");
    DescDiv.classList.add("projectdesc");

    var DescText = document.createElement("p");
    DescText.textContent = currentData[1];
    DescDiv.appendChild(DescText);

    var projectHolder = document.getElementById("ProjectHolder");

    // IMAGE SECTION //

    var ImgDiv = document.createElement("section");
    if(currentData[2].length > 1 || currentData[6].length > 1){
        ImgDiv.classList.add("projectdesc");

        var imgFiles = new Array(0);

        var tempWord = "";
        for (let i=0; i<currentData[2].length; i++){
            currChar = currentData[2].substring(i, i+1);
            if(currChar !== '&'){ tempWord += currChar; }
            else { imgFiles.push(tempWord); tempWord = ""; }
        }
        imgFiles.push(tempWord);
        
        // Add the thumbnail to images why not
        const thumbSrc = currentData[6];
        var insIndex = thumbSrc.indexOf('>');
        var thumbImg = document.createElement('img');
        thumbImg.src = "assets/"+thumbSrc.substring(0,insIndex);
        thumbImg.classList.add(thumbSrc.substring(insIndex+1,thumbSrc.length));
        ImgDiv.appendChild(thumbImg);

        
        if(imgFiles[0] != "<"){
            for (let i=0; i<imgFiles.length; i++){
                var insIndex = imgFiles[i].indexOf('>');
                var newImg = document.createElement('img');
                newImg.src = "assets/"+imgFiles[i].substring(0,insIndex);
                newImg.classList.add(imgFiles[i].substring(insIndex+1, imgFiles[i].length));
                ImgDiv.appendChild(newImg);
            }
        }
    }

    // CODE SECTION //

    codeDiv = document.createElement("section");
    if(currentData[3].length > 1) {

        var newCode = document.createElement('p');
        newCode.textContent = currentData[3];
        newCode.classList.add('ProcEmbed');
        newCode.autocapitalize = "off";
        codeDiv.appendChild(newCode);

        codeDiv.classList.add("projectdesc");
    }

    // SOURCE SECTION //

    srcDiv = document.createElement("section");
    if(currentData[4].length > 1){
        var newSource = document.createElement('p');
        newSource.textContent = currentData[4];
        newSource.classList.add('Embed');
        newSource.autocapitalize = "off";
        srcDiv.appendChild(newSource);
        srcDiv.classList.add("projectdesc");
    }

    // FILE SECTION //

    fileDiv = document.createElement("section");
    if(!currentData[5].includes("<")){
        var fileFiles = new Array(0);
        var tempWord = "";
        for(let i=0; i<currentData[5].length; i++){
            currChar = currentData[5].substring(i, i+1);
            if(currChar !== '&'){tempWord += currChar;}
            else {fileFiles.push(tempWord); tempWord = "";}
        }
        fileFiles.push(tempWord);

        for(let i=0; i<fileFiles.length; i++){
            var newFile = document.createElement('a');
            newFile.href = "code/"+fileFiles[i];
            newFile.download = "code/"+fileFiles[i];
            newFile.classList.add('FileDownload');
            newFile.textContent = "Download " + fileFiles[i];
            fileDiv.appendChild(newFile);
        }
        fileDiv.classList.add("projectdesc");
    }


    // Final Append
    
    projectHolder.appendChild(DescDiv);
    if(ImgDiv.classList.contains("projectdesc")) projectHolder.appendChild(ImgDiv);
    if(srcDiv.classList.contains("projectdesc")) projectHolder.appendChild(srcDiv);
    if(fileDiv.classList.contains("projectdesc")) projectHolder.appendChild(fileDiv);
    if(codeDiv.classList.contains("projectdesc")) projectHolder.appendChild(codeDiv);


})();