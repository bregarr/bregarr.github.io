function swapTab(s, h, a, g) {
            document.getElementById(s).style.display = 'inline';
            document.getElementById(h).style.display = 'none';
            document.getElementById(a).style.display = 'none';
            document.getElementById(g).style.display = 'none';
            document.getElementById(s+"Button").classList.add('CurrentTab');
            document.getElementById(s+"Button").classList.remove('InactiveTab');
            document.getElementById(h+"Button").classList.remove('CurrentTab');
            document.getElementById(h+"Button").classList.add('InactiveTab');
            document.getElementById(a+"Button").classList.remove('CurrentTab');
            document.getElementById(a+"Button").classList.add('InactiveTab');
            document.getElementById(g+"Button").classList.remove('CurrentTab');
            document.getElementById(g+"Button").classList.add('InactiveTab');
        }

        var softwareContents = [[],[]];
        function enableCell(mod, n, e){
            var dl = [[], []];
            dl = softwareContents[n];
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

        var projArray;
        async function fetchPrivateSheet() {
            const apiKey = "AIzaSyCE-rKpVbm6l23iLdmD5mIWpvOiAnOh4oo";
            const sheetID = "1fQmtzIvjzD_6DSqiuy9-txca9QZQ4Z_0eLRKi0pWTk0";
            const range = "projSheet!A2:I50";  // Specify your data range
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            projArray = new Array(data.values.length);

            for (var i = (projArray.length-1); i >= 0; i--) {
                let tempArray = [data.values[i][0],data.values[i][1]];
                if (data.values[i][2] != undefined){ tempArray.push(data.values[i][2]); } else { tempArray.push("<"); }
                if (data.values[i][3] != undefined){ tempArray.push(data.values[i][3]); } else { tempArray.push("<"); }
                if (data.values[i][4] != undefined){ tempArray.push(data.values[i][4]); } else { tempArray.push("<"); }
                if (data.values[i][5] != undefined){ tempArray.push(data.values[i][5]); } else { tempArray.push("<"); }
                if (data.values[i][6] != undefined){ tempArray.push(data.values[i][6]); } else { tempArray.push("<"); }
                if (data.values[i][7] != undefined){ tempArray.push(data.values[i][7]); } else { tempArray.push("<"); }
                if (data.values[i][8] != undefined){ tempArray.push(data.values[i][8]); } else { tempArray.push("<"); }
                projArray[projArray.length - i - 1] = tempArray;
            }

        }

        (async function() {
            await fetchPrivateSheet();



            //Software

            for (let k=0;k<projArray.length;k++)  { // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement
            if(!projArray[k][8].includes("<")){
                if(projArray[k][8].includes(",")){
                if(projArray[k][8].split(",").length > 1){
                    var typesArray = projArray[k][8].split(",").slice(1);
                    var newArray = []; newArray.push(projArray[k][8].split(",")[0]);
                    projArray[k][8] = newArray;

                    var newLine = structuredClone(projArray[k]);
                    newLine[8] = typesArray;

                    projArray.splice(k, 0, newLine);
                }}
                console.log(projArray);

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
                if (!projArray[k][2].includes("<")) { imgButton.value = "Images"; buttonDiv.appendChild(imgButton); imgButton.type = 'Button';
                                                         imgButton.classList.add('InactiveCell'); imgButton.id = k+'sImageButton'; contentTypes.push('Image');
                                                         imgDiv.classList.add('CellContent');
                                                         imgDiv.style = "display: none;"; imgDiv.id = k+'sImageCell';

                                                         var imgFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<projArray[k][2].length; i++){
                                                            currChar = projArray[k][2].substring(i,i+1)
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
                if (!projArray[k][3].includes("<")) { codeButton.value = "Code"; buttonDiv.appendChild(codeButton); codeButton.type = 'Button';
                                                         codeButton.classList.add('InactiveCell'); codeButton.id = k+'sCodeButton'; contentTypes.push('Code');
                                                         codeDiv.classList.add('CellContent');
                                                         codeDiv.style = "display: none;"; codeDiv.id = k+'sCodeCell';

                                                         var codeFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<projArray[k][3].length; i++){
                                                            currChar = projArray[k][3].substring(i,i+1)
                                                            if(currChar !== '&'){ tempWord += currChar; } else { codeFiles.push(tempWord); tempWord = ""; }
                                                         }
                                                         codeFiles.push(tempWord);

                                                         for (let i = 0; i<codeFiles.length; i++){
                                                            const newCode = document.createElement('embed'); newCode.src = "code/"+codeFiles[i];
                                                            newCode.classList.add('CodeEmbed');
                                                            codeDiv.appendChild(newCode);
                                                         }
                }
                if (!projArray[k][4].includes("<")) { srcButton.value = "Sources"; buttonDiv.appendChild(srcButton); srcButton.type = 'Button';
                                                         srcButton.classList.add('InactiveCell'); srcButton.id = k+'sSourceButton'; contentTypes.push('Source');
                                                         srcDiv.classList.add('CellContent');
                                                         srcDiv.style = "display: none;"; srcDiv.id = k+'sSourceCell';

                                                         const newSource = document.createElement('embed'); newSource.src = "code/"+projArray[k][4];
                                                         newSource.classList.add('SourceEmbed');
                                                         srcDiv.appendChild(newSource);
                }
                if (!projArray[k][5].includes("<")) { filesButton.value = "Files"; buttonDiv.appendChild(filesButton); filesButton.type = 'Button';
                                                         filesButton.classList.add('InactiveCell'); filesButton.id = k+'sFilesButton'; contentTypes.push('Files');
                                                         fileDiv.classList.add('CellContent');
                                                         fileDiv.style = "display: none;"; fileDiv.id = k+'sFilesCell';

                                                         var fileFiles = new Array(0); var tempWord = "";
                                                         for (let i = 0; i<projArray[k][5].length; i++){
                                                            currChar = projArray[k][5].substring(i,i+1)
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

                var thumbSrc = projArray[k][6];
                var divIndex = thumbSrc.indexOf('>');
                thumbImg.src = "assets/"+thumbSrc.substring(0,divIndex);

                thumbImg.classList.add(thumbSrc.substring(divIndex+1,thumbSrc.length));

                newTitle.textContent = projArray[k][0];
                newDesc.textContent = projArray[k][1];

                if (k%2==0) { newDiv.classList.add('Content'); }
                else { newDiv.classList.add('ContentOffset'); }

                if ((k%4==0) || (k%4==2)) { newDiv.style = "float: left; left: 0;"; }
                else { newDiv.style = "right: 0;"; }

                buttonDiv.classList.add('ProjNav');
                newTitle.classList.add('ProjHeading');
                newDesc.classList.add('ProjText');




                const softwareDiv = document.getElementById(projArray[k][8]);
                softwareDiv.appendChild(newDiv);
            }
            console.log(k);
            }

        })();