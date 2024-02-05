function editRow(index) {
    let formNode = $('#form1').clone(true);
    formNode.css('display', 'block');

    let editDiscountBatch = formNode.find('.header-left h3');
    editDiscountBatch.text("Discount Batch #" + dataArray[index].discountBatch);

    let editPopularCheckbox = formNode.find('input[type="radio"]');
    editPopularCheckbox.prop('checked', dataArray[index].setPopular);

    let editQuantityInput = formNode.find('input[type="number"]');
    editQuantityInput.val(dataArray[index].quantity);

    let editDiscountTypeSelect = formNode.find('select[name="Discount-type"]');
    editDiscountTypeSelect.val(dataArray[index].discountType);

    let editNoteTextarea = formNode.find('textarea[name="note"]');
    editNoteTextarea.val(dataArray[index].note);

    let editAgreeTandCCheckbox = formNode.find('input[type="checkbox"]');
    editAgreeTandCCheckbox.prop('checked', dataArray[index].agreeTandC);

    let editDateInput = formNode.find('input[type="date"]');
    editDateInput.val(dataArray[index].date);

    let orderForm = $('#orderForm');
    orderForm.empty().append(formNode);

    saveButton.on('click', function () {
        saveEditedData(index);
        saveButton.prop('disabled', true);
    });

    let hideUpArrow = orderForm.find('#up-arrow');
    hideUpArrow.css('visibility', 'hidden');
    let hideDownArrow = orderForm.find('#down-arrow');
    hideDownArrow.css('visibility', 'hidden');
}
