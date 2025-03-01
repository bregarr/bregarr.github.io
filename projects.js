function swapTab(s, h, a) {
            document.getElementById(s).style.display = 'inline';
            document.getElementById(h).style.display = 'none';
            document.getElementById(a).style.display = 'none';
            document.getElementById(s+"Button").classList.add('CurrentTab');
            document.getElementById(s+"Button").classList.remove('InactiveTab');
            document.getElementById(h+"Button").classList.remove('CurrentTab');
            document.getElementById(h+"Button").classList.add('InactiveTab');
            document.getElementById(a+"Button").classList.remove('CurrentTab');
            document.getElementById(a+"Button").classList.add('InactiveTab');
        }

        var softwareContents = [[],[]];
        var hardwareContents = [[],[]];
        var artContents = [[],[]];
        function enableCell(mod, n, e){
            var dl = [[], []];
            if(mod == 's') {dl = softwareContents[n];}
            else if(mod == 'h') {dl = hardwareContents[n];}
            else if(mod == 'a') {dl = artContents[n];}
            if (document.getElementById(n+mod+e+'Button').classList.contains('SelectedCell')) {
                document.getElementById(n+mod+e+'Button').classList.remove('SelectedCell');
                document.getElementById(n+mod+e+'Button').classList.add('InactiveCell');
                document.getElementById(n+mod+e+'Cell').style.display = 'none';
            } else {
                document.getElementById(n+mod+e+'Button').classList.add('SelectedCell');
                document.getElementById(n+mod+e+'Button').classList.remove('InactiveCell');
                document.getElementById(n+mod+e+'Cell').style.display = 'block';
            }
            for (let d in dl) {
                if(dl[d] != e){
                document.getElementById(n+mod+dl[d]+'Cell').style.display = 'none';
                if (document.getElementById(n+mod+dl[d]+'Button').classList.contains('SelectedCell')) {
                    document.getElementById(n+mod+dl[d]+'Button').classList.remove('SelectedCell');
                    document.getElementById(n+mod+dl[d]+'Button').classList.add('InactiveCell');
                }
                }
            }

        }

        var softwareProj;
        var hardwareProj;
        async function fetchPrivateSheet() {
            const apiKey = "AIzaSyCE-rKpVbm6l23iLdmD5mIWpvOiAnOh4oo";
            const sheetID = "1fQmtzIvjzD_6DSqiuy9-txca9QZQ4Z_0eLRKi0pWTk0";
            const rangeSoft = "Sheet1!G2:M50";  // Specify your data range
            const rangeHard = "Sheet1!N2:T50";
            const rangeArt = "Sheet1!V2:AB50";
            const urlSoft = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${rangeSoft}?key=${apiKey}`;
            const urlHard = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${rangeHard}?key=${apiKey}`;
            const urlArt = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${rangeArt}?key=${apiKey}`;

            const responseSoft = await fetch(urlSoft);
            const responseHard = await fetch(urlHard);
            const responseArt = await fetch(urlArt);
            const dataSoft = await responseSoft.json();
            const dataHard = await responseHard.json();
            const dataArt = await responseArt.json();

            softwareProj = new Array(dataSoft.values.length);
            hardwareProj = new Array(dataHard.values.length);
            artProj = new Array(dataArt.values.length);

            for (var i = (softwareProj.length-1); i >= 0; i--) {
                let tempArray = [dataSoft.values[i][0],dataSoft.values[i][1]];
                if (dataSoft.values[i][2] != undefined){ tempArray.push(dataSoft.values[i][2]); } else { tempArray.push("<"); }
                if (dataSoft.values[i][3] != undefined){ tempArray.push(dataSoft.values[i][3]); } else { tempArray.push("<"); }
                if (dataSoft.values[i][4] != undefined){ tempArray.push(dataSoft.values[i][4]); } else { tempArray.push("<"); }
                if (dataSoft.values[i][5] != undefined){ tempArray.push(dataSoft.values[i][5]); } else { tempArray.push("<"); }
                if (dataSoft.values[i][6] != undefined){ tempArray.push(dataSoft.values[i][6]); } else { tempArray.push("<"); }
                softwareProj[softwareProj.length - i - 1] = tempArray;
            }
            for (var i = (hardwareProj.length-1); i >= 0; i--) {
                let tempArray = [dataHard.values[i][0],dataHard.values[i][1]];
                if (dataHard.values[i][2] != undefined){ tempArray.push(dataHard.values[i][2]); } else { tempArray.push("<"); }
                if (dataHard.values[i][3] != undefined){ tempArray.push(dataHard.values[i][3]); } else { tempArray.push("<"); }
                if (dataHard.values[i][4] != undefined){ tempArray.push(dataHard.values[i][4]); } else { tempArray.push("<"); }
                if (dataHard.values[i][5] != undefined){ tempArray.push(dataHard.values[i][5]); } else { tempArray.push("<"); }
                if (dataHard.values[i][6] != undefined){ tempArray.push(dataHard.values[i][6]); } else { tempArray.push("<"); }
                hardwareProj[hardwareProj.length - i - 1] = tempArray;
            }
            for (var i = (artProj.length-1); i >= 0; i--) {
                let tempArray = [dataArt.values[i][0],dataArt.values[i][1]];
                if (dataArt.values[i][2] != undefined){ tempArray.push(dataArt.values[i][2]); } else { tempArray.push("<"); }
                if (dataArt.values[i][3] != undefined){ tempArray.push(dataArt.values[i][3]); } else { tempArray.push("<"); }
                if (dataArt.values[i][4] != undefined){ tempArray.push(dataArt.values[i][4]); } else { tempArray.push("<"); }
                if (dataArt.values[i][5] != undefined){ tempArray.push(dataArt.values[i][5]); } else { tempArray.push("<"); }
                if (dataArt.values[i][6] != undefined){ tempArray.push(dataArt.values[i][6]); } else { tempArray.push("<"); }
                artProj[artProj.length - i - 1] = tempArray;
            }
        }

        (async function() {
            await fetchPrivateSheet();
            const endDiv = document.getElementById("EOFsoft");
            const endDivHard = document.getElementById("EOFhard");
            const endDivArt = document.getElementById("EOFart");

            //Hardware
            for (let k in hardwareProj)  { // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

                const newDiv = document.createElement("div");
                const newTitle = document.createElement("p");
                const newDesc = document.createElement("p");
                const thumbImg = document.createElement("img");
                const buttonDiv = document.createElement("div");
                const projDiv = document.createElement("div");
                projDiv.classList.add('ProjCell');

                var contentTypes = new Array(0);

                projDiv.appendChild(newTitle);
                projDiv.appendChild(thumbImg);
                projDiv.appendChild(newDesc);

                newDiv.appendChild(projDiv);

                const imgButton = document.createElement("input"); const codeButton = document.createElement("input");
                const srcButton = document.createElement("input"); const filesButton = document.createElement("input");
                const imgDiv = document.createElement("div"); const codeDiv = document.createElement("div");
                const srcDiv = document.createElement("div"); const fileDiv = document.createElement("div");
                if (!hardwareProj[k][2].includes("<")) { imgButton.value = "Images"; buttonDiv.appendChild(imgButton); imgButton.type = 'Button';
                                                         imgButton.classList.add('InactiveCell'); imgButton.id = k+'hImageButton'; contentTypes.push('Image');
                                                         imgDiv.classList.add('CellContent');
                                                         imgDiv.style = "display: none;"; imgDiv.id = k+'hImageCell';

                                                         var imgFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<hardwareProj[k][2].length; i++){
                                                            currChar = hardwareProj[k][2].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { imgFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         imgFiles.push(tempWord);

                                                         for (let i = 0; i<imgFiles.length; i++){
                                                            var insIndex = imgFiles[i].indexOf('>');
                                                            const newImg = document.createElement('img'); newImg.src = "assets/"+imgFiles[i].substring(0,insIndex);
                                                            newImg.classList.add(imgFiles[i].substring(insIndex+1,imgFiles[i].length));
                                                            imgDiv.appendChild(newImg);
                                                         }

                }
                if (!hardwareProj[k][3].includes("<")) { codeButton.value = "Code"; buttonDiv.appendChild(codeButton); codeButton.type = 'Button';
                                                         codeButton.classList.add('InactiveCell'); codeButton.id = k+'hCodeButton'; contentTypes.push('Code');
                                                         codeDiv.classList.add('CellContent');
                                                         codeDiv.style = "display: none;"; codeDiv.id = k+'hCodeCell';

                                                         var codeFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<hardwareProj[k][3].length; i++){
                                                            currChar = hardwareProj[k][3].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { codeFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         codeFiles.push(tempWord);

                                                         for (let i = 0; i<codeFiles.length; i++){
                                                            const newCode = document.createElement('embed'); newCode.src = "code/"+codeFiles[i];
                                                            newCode.classList.add('CodeEmbed');
                                                            codeDiv.appendChild(newCode);
                                                         }
                }
                if (!hardwareProj[k][4].includes("<")) { srcButton.value = "Sources"; buttonDiv.appendChild(srcButton); srcButton.type = 'Button';
                                                         srcButton.classList.add('InactiveCell'); srcButton.id = k+'hSourceButton'; contentTypes.push('Source');
                                                         srcDiv.classList.add('CellContent');
                                                         srcDiv.style = "display: none;"; srcDiv.id = k+'hSourceCell';

                                                         const newSource = document.createElement('embed'); newSource.src = "code/"+hardwareProj[k][4];
                                                         newSource.classList.add('SourceEmbed');
                                                         srcDiv.appendChild(newSource);
                }
                if (!hardwareProj[k][5].includes("<")) { filesButton.value = "Files"; buttonDiv.appendChild(filesButton); filesButton.type = 'Button';
                                                         filesButton.classList.add('InactiveCell'); filesButton.id = k+'hFilesButton'; contentTypes.push('Files');
                                                         fileDiv.classList.add('CellContent');
                                                         fileDiv.style = "display: none;"; fileDiv.id = k+'hFilesCell';

                                                         var fileFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<hardwareProj[k][5].length; i++){
                                                            currChar = hardwareProj[k][5].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { fileFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         fileFiles.push(tempWord);

                                                         for (let i = 0; i<fileFiles.length; i++){
                                                            const newFile = document.createElement('a'); newFile.href = "code/"+fileFiles[i];
                                                            newFile.download = "code/"+fileFiles[i];
                                                            newFile.classList.add('FileDownload');
                                                            newFile.textContent = "Download " + fileFiles[i] + "\n\n";
                                                            fileDiv.appendChild(newFile);
                                                         }
                }

                hardwareContents[k] = contentTypes;

                var firstTab = true;
                if (hardwareContents[k].includes('Image')) { if (firstTab) { firstTab = false; imgButton.style = "margin-left = 18px;"; } newDiv.appendChild(imgDiv); imgButton.onclick = () => enableCell('h', k, 'Image'); }
                if (hardwareContents[k].includes('Code')) { if (firstTab) { firstTab = false; codeButton.style = "margin-left = 18px;"; } newDiv.appendChild(codeDiv); codeButton.onclick = () => enableCell('h', k, 'Code'); }
                if (hardwareContents[k].includes('Source')) { if (firstTab) { firstTab = false; srcButton.style = "margin-left = 18px;"; } newDiv.appendChild(srcDiv); srcButton.onclick = () => enableCell('h', k, 'Source'); }
                if (hardwareContents[k].includes('Files')) { if (firstTab) { firstTab = false; fileButton.style = "margin-left = 18px;"; } newDiv.appendChild(fileDiv); filesButton.onclick = () => enableCell('h', k, 'Files'); }

                var thumbSrc = hardwareProj[k][6];
                var divIndex = thumbSrc.indexOf('>');
                thumbImg.src = "assets/"+thumbSrc.substring(0,divIndex);

                thumbImg.classList.add(thumbSrc.substring(divIndex+1,thumbSrc.length));

                newTitle.textContent = hardwareProj[k][0];
                newDesc.textContent = hardwareProj[k][1];

                newTitle.textContent = hardwareProj[k][0];
                newDesc.textContent = hardwareProj[k][1];

                if ((k%4==0) || (k%4==3)) { newDiv.classList.add('Content'); }
                else { newDiv.classList.add('ContentOffset'); }

                if ((k%4==0) || (k%4==2)) { newDiv.style = "float: left;"; }
                else { newDiv.style = "right: 0;"; }

                buttonDiv.classList.add('ProjNav');
                newTitle.classList.add('cHeading');
                newDesc.classList.add('ProjText');

                projDiv.appendChild(buttonDiv);

                const hardwareDiv = document.getElementById("Hardware");
                hardwareDiv.insertBefore(newDiv, EOFhard);
            }

            //Software

            for (let k in softwareProj)  { // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

                const newDiv = document.createElement("div");
                const newTitle = document.createElement("p");
                const newDesc = document.createElement("p");
                const thumbImg = document.createElement("img");
                const buttonDiv = document.createElement("div");
                const projDiv = document.createElement("div");
                projDiv.classList.add('ProjCell');

                var contentTypes = new Array(0);

                projDiv.appendChild(newTitle);
                projDiv.appendChild(thumbImg);
                projDiv.appendChild(newDesc);
                projDiv.appendChild(buttonDiv);
                newDiv.appendChild(projDiv);

                const imgButton = document.createElement("input"); const codeButton = document.createElement("input");
                const srcButton = document.createElement("input"); const filesButton = document.createElement("input");
                const imgDiv = document.createElement("div"); const codeDiv = document.createElement("div");
                const srcDiv = document.createElement("div"); const fileDiv = document.createElement("div");
                if (!softwareProj[k][2].includes("<")) { imgButton.value = "Images"; buttonDiv.appendChild(imgButton); imgButton.type = 'Button';
                                                         imgButton.classList.add('InactiveCell'); imgButton.id = k+'sImageButton'; contentTypes.push('Image');
                                                         imgDiv.classList.add('CellContent');
                                                         imgDiv.style = "display: none;"; imgDiv.id = k+'sImageCell';

                                                         var imgFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<softwareProj[k][2].length; i++){
                                                            currChar = softwareProj[k][2].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { imgFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         imgFiles.push(tempWord);

                                                         for (let i = 0; i<imgFiles.length; i++){
                                                            var insIndex = imgFiles[i].indexOf('>');
                                                            const newImg = document.createElement('img'); newImg.src = "assets/"+imgFiles[i].substring(0,insIndex);
                                                            newImg.classList.add(imgFiles[i].substring(insIndex+1,imgFiles[i].length));
                                                            imgDiv.appendChild(newImg);
                                                         }

                }
                if (!softwareProj[k][3].includes("<")) { codeButton.value = "Code"; buttonDiv.appendChild(codeButton); codeButton.type = 'Button';
                                                         codeButton.classList.add('InactiveCell'); codeButton.id = k+'sCodeButton'; contentTypes.push('Code');
                                                         codeDiv.classList.add('CellContent');
                                                         codeDiv.style = "display: none;"; codeDiv.id = k+'sCodeCell';

                                                         var codeFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<softwareProj[k][3].length; i++){
                                                            currChar = softwareProj[k][3].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { codeFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         codeFiles.push(tempWord);

                                                         for (let i = 0; i<codeFiles.length; i++){
                                                            const newCode = document.createElement('embed'); newCode.src = "code/"+codeFiles[i];
                                                            newCode.classList.add('CodeEmbed');
                                                            codeDiv.appendChild(newCode);
                                                         }
                }
                if (!softwareProj[k][4].includes("<")) { srcButton.value = "Sources"; buttonDiv.appendChild(srcButton); srcButton.type = 'Button';
                                                         srcButton.classList.add('InactiveCell'); srcButton.id = k+'sSourceButton'; contentTypes.push('Source');
                                                         srcDiv.classList.add('CellContent');
                                                         srcDiv.style = "display: none;"; srcDiv.id = k+'sSourceCell';

                                                         const newSource = document.createElement('embed'); newSource.src = "code/"+softwareProj[k][4];
                                                         newSource.classList.add('SourceEmbed');
                                                         srcDiv.appendChild(newSource);
                }
                if (!softwareProj[k][5].includes("<")) { filesButton.value = "Files"; buttonDiv.appendChild(filesButton); filesButton.type = 'Button';
                                                         filesButton.classList.add('InactiveCell'); filesButton.id = k+'sFilesButton'; contentTypes.push('Files');
                                                         fileDiv.classList.add('CellContent');
                                                         fileDiv.style = "display: none;"; fileDiv.id = k+'sFilesCell';

                                                         var fileFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<softwareProj[k][5].length; i++){
                                                            currChar = softwareProj[k][5].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { fileFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         fileFiles.push(tempWord);

                                                         for (let i = 0; i<fileFiles.length; i++){
                                                            const newFile = document.createElement('a'); newFile.href = "code/"+fileFiles[i];
                                                            newFile.download = "code/"+fileFiles[i];
                                                            newFile.classList.add('FileDownload');
                                                            newFile.textContent = "Download " + fileFiles[i];
                                                            const lineBreak = document.createElement('br');
                                                            fileDiv.appendChild(newFile);
                                                            fileDiv.appendChild(lineBreak);
                                                         }
                }

                softwareContents[k] = contentTypes;

                var firstTab = true;
                if (softwareContents[k].includes('Image')) { if (firstTab) { firstTab = false; imgButton.style = "margin-left = 18px;"; } newDiv.appendChild(imgDiv); imgButton.onclick = () => enableCell('s', k, 'Image'); }
                if (softwareContents[k].includes('Code')) { if (firstTab) { firstTab = false; codeButton.style = "margin-left = 18px;"; } newDiv.appendChild(codeDiv); codeButton.onclick = () => enableCell('s', k, 'Code'); }
                if (softwareContents[k].includes('Source')) { if (firstTab) { firstTab = false; srcButton.style = "margin-left = 18px;"; } newDiv.appendChild(srcDiv); srcButton.onclick = () => enableCell('s', k, 'Source'); }
                if (softwareContents[k].includes('Files')) { if (firstTab) { firstTab = false; fileButton.style = "margin-left = 18px;"; } newDiv.appendChild(fileDiv); filesButton.onclick = () => enableCell('s', k, 'Files'); }

                var thumbSrc = softwareProj[k][6];
                var divIndex = thumbSrc.indexOf('>');
                thumbImg.src = "assets/"+thumbSrc.substring(0,divIndex);

                thumbImg.classList.add(thumbSrc.substring(divIndex+1,thumbSrc.length));

                newTitle.textContent = softwareProj[k][0];
                newDesc.textContent = softwareProj[k][1];

                if (k%2==0) { newDiv.classList.add('Content'); }
                else { newDiv.classList.add('ContentOffset'); }

                if ((k%4==0) || (k%4==2)) { newDiv.style = "float: left; left: 0;"; }
                else { newDiv.style = "right: 0;"; }

                buttonDiv.classList.add('ProjNav');
                newTitle.classList.add('ProjHeading');
                newDesc.classList.add('ProjText');

                const softwareDiv = document.getElementById("Software");
                softwareDiv.insertBefore(newDiv, EOFsoft);
            }

            //Art
            for (let k in artProj)  { // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

                const newDiv = document.createElement("div");
                const newTitle = document.createElement("p");
                const newDesc = document.createElement("p");
                const thumbImg = document.createElement("img");
                const buttonDiv = document.createElement("div");
                const projDiv = document.createElement("div");
                projDiv.classList.add('ProjCell');

                var contentTypes = new Array(0);

                projDiv.appendChild(newTitle);
                projDiv.appendChild(thumbImg);
                projDiv.appendChild(newDesc);
                projDiv.appendChild(buttonDiv);
                newDiv.appendChild(projDiv);

                const imgButton = document.createElement("input"); const codeButton = document.createElement("input");
                const srcButton = document.createElement("input"); const filesButton = document.createElement("input");
                const imgDiv = document.createElement("div"); const codeDiv = document.createElement("div");
                const srcDiv = document.createElement("div"); const fileDiv = document.createElement("div");
                if (!artProj[k][2].includes("<")) { imgButton.value = "Images"; buttonDiv.appendChild(imgButton); imgButton.type = 'Button';
                                                         imgButton.classList.add('InactiveCell'); imgButton.id = k+'aImageButton'; contentTypes.push('Image');
                                                         imgDiv.classList.add('CellContent');
                                                         imgDiv.style = "display: none;"; imgDiv.id = k+'aImageCell';

                                                         var imgFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<artProj[k][2].length; i++){
                                                            currChar = artProj[k][2].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { imgFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         imgFiles.push(tempWord);

                                                         for (let i = 0; i<imgFiles.length; i++){
                                                            var insIndex = imgFiles[i].indexOf('>');
                                                            const newImg = document.createElement('img'); newImg.src = "assets/"+imgFiles[i].substring(0,insIndex);
                                                            newImg.classList.add(imgFiles[i].substring(insIndex+1,imgFiles[i].length));
                                                            imgDiv.appendChild(newImg);
                                                         }

                }
                if (!artProj[k][3].includes("<")) { codeButton.value = "Code"; buttonDiv.appendChild(codeButton); codeButton.type = 'Button';
                                                         codeButton.classList.add('InactiveCell'); codeButton.id = k+'aCodeButton'; contentTypes.push('Code');
                                                         codeDiv.classList.add('CellContent');
                                                         codeDiv.style = "display: none;"; codeDiv.id = k+'aCodeCell';

                                                         var codeFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<artProj[k][3].length; i++){
                                                            currChar = artProj[k][3].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { codeFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         codeFiles.push(tempWord);

                                                         for (let i = 0; i<codeFiles.length; i++){
                                                            const newCode = document.createElement('embed'); newCode.src = "code/"+codeFiles[i];
                                                            newCode.classList.add('CodeEmbed');
                                                            codeDiv.appendChild(newCode);
                                                         }
                }
                if (!artProj[k][4].includes("<")) { srcButton.value = "Sources"; buttonDiv.appendChild(srcButton); srcButton.type = 'Button';
                                                         srcButton.classList.add('InactiveCell'); srcButton.id = k+'aSourceButton'; contentTypes.push('Source');
                                                         srcDiv.classList.add('CellContent');
                                                         srcDiv.style = "display: none;"; srcDiv.id = k+'aSourceCell';

                                                         const newSource = document.createElement('embed'); newSource.src = "code/"+artProj[k][4];
                                                         newSource.classList.add('SourceEmbed');
                                                         srcDiv.appendChild(newSource);
                }
                if (!artProj[k][5].includes("<")) { filesButton.value = "Files"; buttonDiv.appendChild(filesButton); filesButton.type = 'Button';
                                                         filesButton.classList.add('InactiveCell'); filesButton.id = k+'aFilesButton'; contentTypes.push('Files');
                                                         fileDiv.classList.add('CellContent');
                                                         fileDiv.style = "display: none;"; fileDiv.id = k+'aFilesCell';

                                                         var fileFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<artProj[k][5].length; i++){
                                                            currChar = artProj[k][5].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { fileFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         fileFiles.push(tempWord);

                                                         for (let i = 0; i<fileFiles.length; i++){
                                                            const newFile = document.createElement('a'); newFile.href = "code/"+fileFiles[i];
                                                            newFile.download = "code/"+fileFiles[i];
                                                            newFile.classList.add('FileDownload');
                                                            newFile.textContent = "Download " + fileFiles[i];
                                                            const lineBreak = document.createElement('br');
                                                            fileDiv.appendChild(newFile);
                                                            fileDiv.appendChild(lineBreak);
                                                         }
                }

                artContents[k] = contentTypes;

                var firstTab = true;
                if (artContents[k].includes('Image')) { if (firstTab) { firstTab = false; imgButton.style = "margin-left = 18px;"; } newDiv.appendChild(imgDiv); imgButton.onclick = () => enableCell('a', k, 'Image'); }
                if (artContents[k].includes('Code')) { if (firstTab) { firstTab = false; codeButton.style = "margin-left = 18px;"; } newDiv.appendChild(codeDiv); codeButton.onclick = () => enableCell('a', k, 'Code'); }
                if (artContents[k].includes('Source')) { if (firstTab) { firstTab = false; srcButton.style = "margin-left = 18px;"; } newDiv.appendChild(srcDiv); srcButton.onclick = () => enableCell('a', k, 'Source'); }
                if (artContents[k].includes('Files')) { if (firstTab) { firstTab = false; fileButton.style = "margin-left = 18px;"; } newDiv.appendChild(fileDiv); filesButton.onclick = () => enableCell('a', k, 'Files'); }

                var thumbSrc = artProj[k][6];
                var divIndex = thumbSrc.indexOf('>');
                thumbImg.src = "assets/"+thumbSrc.substring(0,divIndex);

                thumbImg.classList.add(thumbSrc.substring(divIndex+1,thumbSrc.length));

                newTitle.textContent = artProj[k][0];
                newDesc.textContent = artProj[k][1];

                if (k%2==0) { newDiv.classList.add('Content'); }
                else { newDiv.classList.add('ContentOffset'); }

                if ((k%4==0) || (k%4==2)) { newDiv.style = "float: left; left: 0;"; }
                else { newDiv.style = "right: 0;"; }

                buttonDiv.classList.add('ProjNav');
                newTitle.classList.add('ProjHeading');
                newDesc.classList.add('ProjText');

                const artDiv = document.getElementById("Art");
                artDiv.insertBefore(newDiv, EOFart);
            }
        })();