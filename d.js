let discountBatchCounter = 0;
let dataArray = [];

// hiding the original element
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
    // tableBody.empty();

    $.each(dataArray , function(index , x) {
        let newRow = tableBody[0].insertRow(tableBody[0].rows.length);

        let cell1 = newRow.insertCell(0);
        let cell2 = newRow.insertCell(1);
        let cell3 = newRow.insertCell(2);
        let cell4 = newRow.insertCell(3);
        let cell5 = newRow.insertCell(4);
        let cell6 = newRow.insertCell(5);
        let cell7 = newRow.insertCell(6);
        let cell8 = newRow.insertCell(7);

        cell1.html(x.disountBatch);
        cell2.html(x.setPopular ? 'Yes' : 'No');
        cell3.html(x.quantity);
        cell4.html(x.discountType);
        cell5.html(x.note);
        cell6.html(x.agreeTandC ? 'Yes' : 'No');
        cell7.html(x.date);

        // buttons to append

        let editButton = $("<button>", {
            text : "Edit",
            click : function () {
                editRow(index);
                saveButton.disabled = false;
            }
        });

        let deleteButton = $("<button>", {
            text: "delete",
            click : function () {
                deleteRow(index);
            },
            style: "margin: 5px;"
        });

        cell8.append(editButton , deleteButton);
    });
}