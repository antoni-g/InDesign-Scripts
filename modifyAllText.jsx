// simple script to decriment all text sizes in an indesign document
// prompts the user for a point size and direction and adjusts all text accordingly
// author: antoni-g 

function main() {
    var doc = app.activeDocument;
    
    // handle ui
    try {
        var direction = dialogWRadio ("Increase", true, "Decrease");
        var adjustment = parseInt(prompt("Enter the amount you want to adjust all text sizes by:")); 
        var out;
        if (direction === 0) {
            out = "Increase";
        }
        else {
            out = "Decrease";
        }
        alert("All text will be adjusted with a "+ adjustment + " pt. " + out);
        if (direction == 1) {
            adjustment *= -1;
        }
    } catch (e) {
        alert (e);
    }
    // if input is valid, adjust all text
    if (isInt(adjustment)) {
        for (var i = doc.allPageItems.length - 1; i >= 0; i--) {
            var pi = doc.allPageItems[i];
            if(pi instanceof TextFrame) {
                pi.texts[0].pointSize = pi.texts[0].pointSize + adjustment;
            };
            else if(pi instanceof TextPath) {
                pi.pointSize = pi.texts[0].pointSize + adjustment;
            }
        }
    }
    else {
        alert("Your input is not a valid point size.");
    }
    return "done";    
}

function isInt(value) {
    var er = /^-?[0-9]+$/;
    return er.test(value);
}

function dialogWRadio (dlgName, cancelIt, dlgLabel) {
    var userCancelled = true; //is set to false if user clicks OK button 
    var oldPrefs = app.scriptPreferences.userInteractionLevel;
    app.scriptPreferences.userInteractionLevel=UserInteractionLevels.INTERACT_WITH_ALL;
    //create dialog
    var dlgRef = app.dialogs.add({name:dlgName, canCancel:cancelIt, label:dlgLabel});
    //add a column
    var dlgColumn = dlgRef.dialogColumns.add();
    //add a row
    var dlgRow = dlgColumn.dialogRows.add();
    //add radio elements to row
    var rGroup = dlgRow.radiobuttonGroups.add();
    rGroup.radiobuttonControls.add({staticLabel:"Increase all font sizes", checkedState:true});
    rGroup.radiobuttonControls.add({staticLabel:"Decrease all font sizes"});
    if (dlgRef.show() == true) {
        userCancelled = false;
        var radioValue = rGroup.selectedButton;
    }
    dlgRef.destroy();
    app.scriptPreferences.userInteractionLevel=oldPrefs;
    if (userCancelled) {
        throw ("User Cancelled");
    }
    return radioValue;
}  

main();
