$(document).ready(function () {

    let discountBatchCounter = 0;
    let dataArray = [];

    // Move the form hiding logic inside the addMore function
    function addMore() {
        let cloneNode = $("#form1").clone();
        $("#orderForm").append(cloneNode);
        $(cloneNode).find(".header-left h3").text("Discount Batch #" + discountBatchCounter++);
        $(cloneNode).css("display", "block");

        setupEventListeners(cloneNode);
        renumberBatches();
        
        // Hide the original form after cloning
        $("#form1").css("display", "none");
    }

    // Function to delete a form
    function deleteForm(x) {
        $(x).closest('.form-container').remove(); // Changed selector to target the closest form container
        renumberBatches();
    }

    // Function to renumber the batches
    function renumberBatches() {
        $(".form-container").each(function (index) { // Changed selector to target all form containers
            $(this).find('.header-left h3').text("Discount Batch #" + (index + 1));
        });
    }

    // Function to save data
    function saveData() {
        let forms = $(".form-container"); // Changed selector to target all form containers
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

        dataArray = allBatchData;
        displayData(allBatchData);
        $("#orderForm").empty(); // Clear all form containers after saving data

        // Add a new empty form container
        addMore();
    }

    // Function to display data
    function displayData() {
        $("#savedDataTable tbody").empty();

        $.each(dataArray, function (index, x) {
            let newRow = $("<tr>");

            let cell1 = $("<td>").html(x.disountBatch);
            let cell2 = $("<td>").html(x.setPopular ? 'Yes' : 'No');
            let cell3 = $("<td>").html(x.quantity);
            let cell4 = $("<td>").html(x.discountType);
            let cell5 = $("<td>").html(x.note);
            let cell6 = $("<td>").html(x.agreeTandC ? 'Yes' : 'No');
            let cell7 = $("<td>").html(x.date);
            let cell8 = $("<td>");

            let editButton = $("<button>", {
                text: "Edit",
                click: function () {
                    editRow(index);
                }
            });
            let deleteButton = $("<button>", {
                text: "Delete",
                click: function () {
                    deleteRow(index);
                },
                style: "margin: 5px;"
            });
            $(cell8).append(editButton, deleteButton);
            newRow.append(cell1, cell2, cell3, cell4, cell5, cell6, cell7, cell8);
            $("#savedDataTable tbody").append(newRow);
        });
    }

    // Function to delete a saved row
    function deleteRow(index) {
        dataArray.splice(index, 1);
        displayData(dataArray);
    }

    // Function to edit a row
    function editRow(index) {
        let formNode = $(".form-container").eq(index).clone(true); // Clone the form container at the given index

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

        // Hide the arrow buttons in the cloned form
        formNode.find("#up-arrow").css('visibility', 'hidden');
        formNode.find("#down-arrow").css('visibility', 'hidden');
    }

    // Function to save edited data
    function saveEditedData(index) {
        let editedForm = $(".form-container").eq(index); // Target the form container at the given index

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

            // Clear input
            $("#orderForm").empty();
            displayData(dataArray);
            // Add a new empty form container
            addMore();
        }
    }

    // Function to move a node
    function moveNode(node, positions) {
        let currentForm = $(node).closest(".form-container"); // Changed selector to target the closest form container
        let currentIndex = $(".form-container").index(currentForm); // Changed selector to target all form containers
        let newIndex = currentIndex + positions;

        if (newIndex >= 0 && newIndex < $(".form-container").length) { // Changed selector to target all form containers
            let targetNode = $(".form-container").eq(newIndex); // Changed selector to target the form container at the given index
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

    // Function to set up event listeners
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

    // Add event listener to the "Add More" button
    $("#add-more").on("click", addMore);

    // Add event listener to the "Save" button
    $("#save").on("click", saveData);

    // Initialize by adding the first form
    addMore();
});
