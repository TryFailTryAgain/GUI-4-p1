// File: script.css

// w3schools.com and developer.mozilla.org were used as learning and reference material
// to structure this assignment.

// Copyright (c) 2023. All rights reserved. May be freely copied or
// excerpted for educational purposes with credit to the author.
// Last updated: Jun 16, 2023

//Resources utilized along side w3School and developer.mozilla.org:
// https://developer.mozilla.org/en-US/docs/Web/API/HTMLTableRowElement/insertCell
// https://www.w3schools.com/jsref/dom_obj_table.asp
// https://developer.mozilla.org/en-US/docs/Web/API/Node/appendChild
//jquery
// https://jqueryvalidation.org/required-method/
// https://jqueryvalidation.org/jQuery.validator.addMethod/
//jquery ui
// https://jqueryui.com/tabs/#manipulation
// https://jqueryui.com/slider/#colorpicker
// https://api.jqueryui.com/slider/#event-change
// https://www.w3schools.com/jquery/sel_gt.asp


const submit = document.getElementById('submit');


//event listener to constantly be ready for the submit button
submit.addEventListener('click', errorCheck);


//adds additional checks if the range between the start and end values are greater than 100
$.validator.addMethod("xRange", function (element) {
    let xStartVal = parseInt(document.getElementById('xStart').value);
    let xEndVal = parseInt(document.getElementById('xEnd').value);
    console.log("xRange: " + Math.abs(xStartVal - xEndVal))
    if (Math.abs(xStartVal - xEndVal) > 100) {
        return false;
    }
    return true;
}, "The range between the start and end values of 'X' must be less than 100");

$.validator.addMethod("yRange", function (element) {
    let yStartVal = parseInt(document.getElementById('yStart').value);
    let yEndVal = parseInt(document.getElementById('yEnd').value);
    console.log("yRange: " + Math.abs(yStartVal - yEndVal))
    if (Math.abs(yStartVal - yEndVal) > 100) {
        return false;
    }
    return true;
}, "The range between the start and end values of 'Y' must be less than 100");


//error checks inputs BEFORE processing them to prevent slowdowns
function errorCheck() {
    //parseInt required to keep values as numbers despire being passed as a number from html
    let xStartVal = parseInt(document.getElementById('xStart').value);
    let xEndVal = parseInt(document.getElementById('xEnd').value);
    let yStartVal = parseInt(document.getElementById('yStart').value);
    let yEndVal = parseInt(document.getElementById('yEnd').value);
    //logs values doe debug
    console.log("xStartVal: " + xStartVal);
    console.log("xEndVal: " + xEndVal);
    console.log("yStartVal: " + yStartVal);
    console.log("yEndVal: " + yEndVal);

    //validates the input form using jquery validation plugin https://jqueryvalidation.org/
    $("#inputForm").validate({
        //validates the input form using jquery validation plugin https://jqueryvalidation.org/
        //states the rules for each input in the form
        rules: {
            xStart: {
                required: true,
                number: true,
                min: -1000000000,
                max: 1000000000,
                xRange: true,
                xSmallFirst: true
            },
            xEnd: {
                required: true,
                number: true,
                min: -1000000000,
                max: 1000000000,
                xRange: true
            },
            yStart: {
                required: true,
                number: true,
                min: -1000000000,
                max: 1000000000,
                yRange: true,
                ySmallFirst: true
            },
            yEnd: {
                required: true,
                number: true,
                min: -1000000000,
                max: 1000000000,
                yRange: true
            }
        },
        //the error messages for each error on the inputs
        messages: {
            //no clue why I cant do xStart, xEnd, yStart, yEnd: {} too play messages to multiple rules
            //so this will have to do
            xStart: {
                required: "Please enter a number",
                number: "Please enter a number",
                min: "Please enter a number greater than -1000000000 ",
                max: "Please enter a number less than 1000000000",
            },
            xEnd: {
                required: "Please enter a number",
                number: "Please enter a number",
                min: "Please enter a number greater than -1000000000 ",
                max: "Please enter a number less than 1000000000"
            },
            yStart: {
                required: "Please enter a number",
                number: "Please enter a number",
                min: "Please enter a number greater than -1000000000 ",
                max: "Please enter a number less than 1000000000"
            },
            yEnd: {
                required: "Please enter a number",
                number: "Please enter a number",
                min: "Please enter a number greater than -1000000000 ",
                max: "Please enter a number less than 1000000000"
            }
        }
    });
    //adds additional checks if the range between the start and end values are greater than 100
    $.validator.addMethod("xRange", function (element) {
        let xStartVal = parseInt(document.getElementById('xStart').value);
        let xEndVal = parseInt(document.getElementById('xEnd').value);
        console.log("xRange: " + Math.abs(xStartVal - xEndVal))
        if (Math.abs(xStartVal - xEndVal) > 100) {
            return false;
        }
        return true;
    }, "The range between the start and end values of X must be less than 100");

    $.validator.addMethod("yRange", function (element) {
        let yStartVal = parseInt(document.getElementById('yStart').value);
        let yEndVal = parseInt(document.getElementById('yEnd').value);
        console.log("yRange: " + Math.abs(yStartVal - yEndVal))
        if (Math.abs(yStartVal - yEndVal) > 100) {
            return false;
        }
        return true;
    }, "The range between the start and end values of Y must be less than 100");

    //adds check to make sure the start value is less than or equal to the end value
    $.validator.addMethod("xSmallFirst", function (element) {
        let xStartVal = parseInt(document.getElementById('xStart').value);
        let xEndVal = parseInt(document.getElementById('xEnd').value);
        console.log("xSmallFirst: " + xStartVal, xEndVal)
        if (xStartVal > xEndVal) {
            return false;
        } else {
            return true;
        }
    }, "Please make sure the start value is less than the end value");

    $.validator.addMethod("ySmallFirst", function (element) {
        let yStartVal = parseInt(document.getElementById('yStart').value);
        let yEndVal = parseInt(document.getElementById('yEnd').value);
        console.log("ySmallFirst: " + yStartVal, yEndVal)
        if (yStartVal > yEndVal) {
            return false;
        } else {
            return true;
        }
    }, "Please make sure the start value is less than the end value");
    //end of additional checks

    //calls the validation on the form
    //This also updates the error messages and highlights the inputs that are invalid
    //when all inputs are valid, then and only then do we call fillTable()
    if ($("#inputForm").valid()) {
        console.log("errorCheck: input form is valid");
        console.log("sending to fillTable: " + xStartVal, xEndVal, yStartVal, yEndVal);
        fillTable(xStartVal, xEndVal, yStartVal, yEndVal);
    } else {
        console.log("errorCheck: input form is invalid");
    }

}

//this function adds column from xStart to xEnd and rows from yStart to yEnd. Each cell is the product of the row and column. The first cell is blank
function fillTable(xStart, xEnd, yStart, yEnd) {
    console.log("values received for the table: " + xStart, xEnd, yStart, yEnd);
    const table = document.getElementById('dynTable');
    console.log("cleaning old table if it exists");
    table.innerHTML = ''; //clear past table

    console.log("creating table now");
    //create first row and a blank cell in top left corner so numbers align correctly
    table.insertRow();//adds a row
    //.insertCell() is not capable of making <th> cells, so this is used
    injectHeader(table, 0, " ");

    //fills top row with values from xStart and xEnd
    for (let i = xStart; i <= xEnd; i++) {
        injectHeader(table, 0, i);
    }

    //populates proceding row values from yStart to yEnd, and finds products along the way
    for (let i = yStart, rowCount = 1; i <= yEnd; i++, rowCount++) {
        table.insertRow(); //creates currnt new row
        injectHeader(table, rowCount, i); //inject the y number as header
        for (let j = xStart; j <= xEnd; j++) {
            table.rows[rowCount].insertCell().innerHTML = i * j;//same application of rowCount
        }
    }
}

//Injects a header into the next possition given the
//table, the row depth, and the value wanted in the cell
function injectHeader(table, rowDepth, value) {
    let Headers = document.createElement("th");
    headerRow = table.rows[rowDepth];
    Headers.innerHTML = value;
    headerRow.appendChild(Headers);
}