let discountBatchCounter = 0;

// Display none to the original form
$('#form1').css("display", "none");
addMoreForm();
renumberBatches();
// Add more
function addMoreForm() {
    let cloneNode = $('#form1').clone();
    // cloneNode.attr( 'form' + (++discountBatchCounter));
    cloneNode.find('.header-left h3').text("Discount Batch #" + discountBatchCounter++);
    cloneNode.css("display", "block");
    $('#orderForm').append(cloneNode);
    setupEventListeners(cloneNode);
    renumberBatches();
}

// Delete current form
function deleteForm(button) {
    $(button).closest('#form1').remove();
    renumberBatches();
}

// Renumbering batches
function renumberBatches() {
    $('#orderForm > div').each(function (index) {
        let discountBatchElement = $(this).find('.header-left h3');
        discountBatchElement.text("Discount Batch #" + (index + 1));
    });
}

