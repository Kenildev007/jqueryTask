let discountBatchCounter = 0;

// hiding the orignal element
$("#form1").css("display" , "none");
addMore();
function addMore() {
    let cloneNode = $("#form1").clone();
    $("#orderForm").append(cloneNode);
    $(cloneNode).find(".header-left h3").text("Discount Batch #" + discountBatchCounter++);
    $(cloneNode).css("display" , "block");

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

