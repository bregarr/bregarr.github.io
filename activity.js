var activityFeed;

        async function fetchPrivateSheet() {
            const apiKey = "AIzaSyCE-rKpVbm6l23iLdmD5mIWpvOiAnOh4oo";
            const sheetID = "1fQmtzIvjzD_6DSqiuy9-txca9QZQ4Z_0eLRKi0pWTk0";
            const range = "Sheet1!A2:D50";  // Specify your data range
            const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetID}/values/${range}?key=${apiKey}`;

            const response = await fetch(url);
            const data = await response.json();

            activityFeed = new Array(data.values.length);

            for (var i = (activityFeed.length-1); i >= 0; i--) {
                let tempArray = [data.values[i][0],data.values[i][1],data.values[i][2]];
                if (data.values[i][3] != undefined){
                    tempArray.push(data.values[i][3]);
                }
                activityFeed[activityFeed.length - i - 1] = tempArray;
            }
        }

        (async function() {
            await fetchPrivateSheet();
            const endDiv = document.getElementById("EOF");
            const contentDiv = document.getElementById("Content");
            for (let k in activityFeed)  { // https://developer.mozilla.org/en-US/docs/Web/API/Document/createElement

                const newDiv = document.createElement("div");
                const newTitle = document.createElement("p");
                const newDate = document.createElement("p");
                const newDesc = document.createElement("p");

                newTitle.textContent = activityFeed[k][0];
                newDate.textContent = activityFeed[k][1];
                newDesc.textContent = activityFeed[k][2];

                newDiv.appendChild(newTitle);
                newDiv.appendChild(newDate);
                newDiv.appendChild(newDesc);

                newDiv.classList.add('Feed');
                newTitle.classList.add('FeedTitle');
                newDate.classList.add('FeedPost');
                newDesc.classList.add('FeedText');

                if (activityFeed[k].length > 3) {
                    const newImage = document.createElement("img");
                    newImage.src = activityFeed[k][3];
                    newDiv.appendChild(newImage);
                    newImage.classList.add('FeedImage');
                }


                contentDiv.insertBefore(newDiv, EOF);
            }
        })();