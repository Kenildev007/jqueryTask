let discountBatchCounter = 0;
let dataArray = [];
// hiding the orignal element
$("#form1").css("display", "none");
addMore();
function addMore() {
    let cloneNode = $("#form1").clone();
    $("#orderForm").append(cloneNode);
    $(cloneNode).find(".header-left h3").text("Discount Batch #" + discountBatchCounter++);
    $(cloneNode).css("display", "block");

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

    forms.each(function (x) {
        let batch = $(this);

        let formData = {
            disountBatch: x + 1,
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
    addMore();
    renumberBatches();
}

function displayData() {
    let tableBody = $("#savedDataTable tbody").empty();

    $.each(dataArray, function (index, x) {
        let newRow = tableBody[0].insertRow(tableBody[0].rows.length);

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);
        let cell6 = newRow.insertCell(5);
        let cell7 = newRow.insertCell(6);
        let cell8 = newRow.insertCell(7);

        cell1.innerHTML = x.disountBatch;
        cell2.innerHTML = x.setPopular ? 'Yes' : 'No';
        cell3.innerHTML = x.quantity;
        cell4.innerHTML = x.discountType;
        cell5.innerHTML = x.note;
        cell6.innerHTML = x.agreeTandC ? 'Yes' : 'No';
        cell7.innerHTML = x.date;

        // buttons to append

        let editButton = $("<button>", {
            text: "Edit",
            click: function () {
                editRow(index);
                // Make sure saveButton is defined in the scope or globally
                saveButton.disabled = false;
            }
        });

        let deleteButton = $("<button>", {
            text: "Delete",
            click: function () {
                deleteRow(index);
            },
            style: "margin: 5px;"
        });
        $(cell8).append(editButton, deleteButton)
    });
}

// delete Saved row
function deleteRow(index) {
    dataArray.splice(index, 1);
    displayData(dataArray);
}

// the note and the action in display in not working correctly ,for action its shows object object instead of button
