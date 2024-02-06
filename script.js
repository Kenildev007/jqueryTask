let discountBatchCounter = 0;
let dataArray = [];

$("#form1").css("display", "none");
addMore();
function addMore() {
    let cloneNode = $("#form1").clone();
    $("#orderForm").append(cloneNode);
    $(cloneNode).find(".header-left h3").text("Discount Batch #" + discountBatchCounter++);
    $(cloneNode).css("display", "block");

    setupEventListeners(cloneNode);
    renumberBatches();
}

function deleteForm(x) {
    $(x).closest('#form1').remove();
    renumberBatches();
}

function renumberBatches() {
    $("#orderForm > div").each(function (index) {
        let discountBatchElement = $(this).find('.header-left h3').text("Discount batch #" + (index + 1));
    });
}

function saveData() {
    let forms = $("#orderForm > #form1:visible");
    let allBatchData = [];

    forms.each(function (index) {
        let batch = $(this);

        let formData = {
            disountBatch: index + 1,
            setPopular: batch.find('input[type="radio"]').prop('checked'),
            quantity: batch.find('input[type="number"]').val(),
            discountType: batch.find('select[name="Discount-type"]').val(),
            note: batch.find('textarea[name="note"]').val(),
            agreeTandC: batch.find('input[type="checkbox"]').prop('checked'),
            date: batch.find('input[type="date"]').val()
        }
        allBatchData.push(formData);
    });
    // display the saved data 
    dataArray = allBatchData;
    displayData(allBatchData);
    // after save the forms should be removed and only one left with clear inputs
    $("#orderForm").empty();

    let originalNode = $("#form1").clone(true).css("display", "block");
    $("#orderForm").append(originalNode);
    // addMore();
    setupEventListeners(originalNode);
    renumberBatches();
}

function displayData() {
    $("#savedDataTable tbody").empty();

    $.each(dataArray, function (index , x) {
        let newRow = $("<tr>");
        
        let cell1 = $("<td>").html(x.disountBatch);
        let cell2 = $("<td>").html(x.setPopular ? 'Yes' : 'No');
        let cell3 = $("<td>").html(x.quantity);
        let cell4 = $("<td>").html(x.discountType);
        let cell5 = $("<td>").html(x.note);
        let cell6 = $("<td>").html(x.agreeTandC ? 'Yes' : 'No');
        let cell7 = $("<td>").html(x.date);
        let cell8 = $("<td>");

        let editButton = $("<button>" , {
            text: "Edit",
            click : function () {
                editRow(index);
            }
        });
        let deleteButton = $("<button>" , {
            text: "Delete",
            click : function () {
                deleteRow(index);
            },
            style : "margin: 5px;"
        });
        $(cell8).append(editButton,deleteButton);
        newRow.append(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8);
        $("#savedDataTable tbody").append(newRow);
    });
}

// delete Saved row
function deleteRow(index) {
    dataArray.splice(index, 1);
    displayData(dataArray);
}
function editRow(index) {
    let formNode = $("#form1").clone(true).css('display', 'block');

    formNode.find("h3").text("Discount batch #" + dataArray[index].disountBatch);
    formNode.find('input[type="radio"]').prop('checked', dataArray[index].setPopular);
    formNode.find('input[type="number"]').val(dataArray[index].quantity);
    formNode.find('select[name="Discount-type"]').val(dataArray[index].discountType);
    formNode.find('textarea[name="note"]').val(dataArray[index].note);
    formNode.find('input[type="checkbox"]').prop('checked', dataArray[index].agreeTandC);
    formNode.find('input[type="date"]').val(dataArray[index].date);

    $("#orderForm").empty().append(formNode);
    $("#save-edit").prop("disabled", false).off("click");
    $("#save-edit").on("click", function () {
        saveEditedData(index);
        $("#save-edit").prop("disabled", true);
    });

    $(formNode).find("#up-arrow").css('visibility', 'hidden');
    $(formNode).find("#down-arrow").css('visibility', 'hidden');
    
}

function saveEditBtn(index) {
    saveEditedData(index);
};

function saveEditedData(index) {
    let editedForm = $("#orderForm > #form1:visible");

    if (dataArray[index]) {
        let editedData = {
            disountBatch: dataArray[index].disountBatch,
            setPopular: editedForm.find('input[type="radio"]').prop('checked'),
            quantity: editedForm.find('input[type="number"]').val(),
            discountType: editedForm.find('select[name="Discount-type"]').val(),
            note: editedForm.find('textarea[name="note"]').val(),
            agreeTandC: editedForm.find('input[type="checkbox"]').prop('checked'),
            date: editedForm.find('input[type="date"]').val(),
        };
        dataArray[index] = editedData;

        // clear input
        $("#orderForm").empty();
        // append new form
        let originalNode = $("#form1").clone(true).css("display", "block");
        $("#orderForm").append(originalNode);
        // addMore();
        setupEventListeners(originalNode);
        renumberBatches();
        displayData(dataArray);
    }
}
$("#save-edit").prop("disabled", true);

// moving code of batches   
function moveNode(node, positions) {
    let currentForm = $(node).closest("#orderForm");
    let currentIndex = currentForm.children().index(node);
    let newIndex = currentIndex + positions;

    if (newIndex >= 0 && newIndex < currentForm.children().length) {
        let targetNode = currentForm.children().eq(newIndex);
        let clonedNode = $(node).clone(true);
        let selectedDiscountType = $(node).find('select[name="Discount-type"]').val();
        $(node).remove();

        if (positions < 0) {
            clonedNode.insertBefore(targetNode);
        } else {
            clonedNode.insertAfter(targetNode);
        }
        clonedNode.find('select[name="Discount-type"]').val(selectedDiscountType);
        setupEventListeners(clonedNode);
        renumberBatches();
    }
}

function setupEventListeners(node) {
    let upArrowButton = $(node).find("#up-arrow");
    let downArrowButton = $(node).find("#down-arrow");

    upArrowButton.on("click", function () {
        moveNode(node, -1);
    });
    downArrowButton.on("click", function () {
        moveNode(node, 1);
    });

    $(node).on('DOMNodeInserted', function () {
        upArrowButton.css('visibility', $(node).prev().length ? 'visible' : 'hidden');
        downArrowButton.css('visibility', $(node).next().length ? 'visible' : 'hidden');
    });
}