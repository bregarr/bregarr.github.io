var projArray;

async function fetchPrivateSheet() {
    const SheetK = "AIzaSyCE-rKpVbm6l23iLdmD5mIWpvOiAnOh4oo";
    const SheetID = "1fQmtzIvjzD_6DSqiuy9-txca9QZQ4Z_0eLRKi0pWTk0";
    const range = "DevlogSheet!A2:Z50";
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SheetID}/values/${range}?key=${SheetK}`;

    try{
      const response = await fetch(url);
      if(!response.ok) {
         throw new Error("HTTP error: ${response.status}");
      }
      const data = await response.json();
      if(!data.values) {
         throw new Error("No data from sheet.");
      }

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
   } catch (err) {
      console.error("Failed to fetch sheet: ", err);
   }
}

function PrintArray(){
   console.log(projArray);
}

(async function() {
   await fetchPrivateSheet();

   // For Each Post
   for(k = 0; k < projArray.length; k++){
      
      const articleWrapper = document.createElement("article");
      titleElem = document.createElement("h3");
      dateElem = document.createElement("time");

      // Sets up header elems
      titleElem.textContent = projArray[k][0];
      titleElem.classList.add("ProjHeading");
      dateElem.dateTime = projArray[k][1];
      dateElem.textContent = projArray[k][1] + " EST";
      articleWrapper.appendChild(titleElem);
      articleWrapper.appendChild(dateElem);
      articleContent = document.createElement("div");
      articleContent.classList.add("DevlogArticle");


      // Handle Document's Types
      for(j = 3; j < projArray[k].length; j++){
         var CurrentLine = projArray[k][j];
         if(CurrentLine == "<") { j = projArray[k].length; continue; }
         var Identifier = CurrentLine.substring(0,1);
         if(Identifier == 'p'){
            newElement = document.createElement("p");
            newElement.textContent = CurrentLine.substring(1);
            articleContent.appendChild(newElement);
         }
         else if(Identifier == 'a'){
            newElement = document.createElement("a");
            aElem = CurrentLine.substring(1).split("&");
            newElement.textContent = aElem[0];
            newElement.href = aElem[1];
            articleContent.appendChild(newElement);
         }
         else if(Identifier == 'i'){
            newElement = document.createElement("img");
            iElem = CurrentLine.substring(1).split("&");
            newElement.src = iElem[0];
            newElement.alt = iElem[1];
            articleContent.appendChild(newElement);
         }
         // else if(Identifier == 'b'){
         //    newElement = document.createElement("br");
         //    articleContent.appendChild(newElement);
         // }
      }

      articleWrapper.appendChild(articleContent);
      // Append Wrapper to Document
      if(document.getElementById("DevlogHolder") !== null){
         document.getElementById("DevlogHolder").appendChild(articleWrapper);
      }

   }
})();