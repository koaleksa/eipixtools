﻿// addElement.jsx
// 
// Name: addElement
// Version: 1.3
// Author: Aleksandar Kocic
// 
// Description:     
// This script creates a new solid and adds Element3D to it.
//  


(function addElement(thisObj) {
    var activeItem = app.project.activeItem;
    var selectedLayer = activeItem.selectedLayers[0];
    var layerNumber = 0;
    var layerName;
    var testNumber;

    var check = false;
    var effectNameCollection = app.effects;
    for (var i = 0; i < effectNameCollection.length; i++) {
        var name = effectNameCollection[i].displayName;
        if (name == "Element") {
            check = true;
        }
    }

    if (check == true) {
        for (var i = 1; i <= app.project.numItems; i++) {
            if ((app.project != null) && (app.project.item(i).mainSource instanceof SolidSource)) {
                layerName = app.project.item(i).name;
                if (layerName.indexOf("element ") != -1) {
                    testNumber = parseInt(layerName.substring(layerName.lastIndexOf(" "), layerName.length));
                    if (!isNaN(testNumber)) {
                        layerNumber = Math.max(layerNumber, testNumber);
                    }
                }
            }
        }
    
        app.beginUndoGroup("addElement");
    
        var solidName = "element " + (layerNumber + 1);
        var solidW = activeItem.width;
        var solidH = activeItem.height;
        var solidPixelAspectRatio = activeItem.pixelAspect;
        var solidDuration = activeItem.duration;
        var newSolid = activeItem.layers.addSolid([0, 0, 0], solidName, solidW, solidH, solidPixelAspectRatio, solidDuration);
        if (selectedLayer != null) {
            newSolid.moveBefore(selectedLayer);
        }
        var addElement = newSolid.property("Effects").addProperty("Element");
    
        app.endUndoGroup();
    } else {
        alert("You dont have trapcode VideoCopilot Element3D installed.");
    }
})(this);