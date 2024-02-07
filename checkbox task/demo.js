$(document).ready(function () {
    $("#submitBtn").on("click", addCheckbox);

    $(document).on("change", ".first-in-row", function () {
        $(this).closest('.row').find("input[type='checkbox']").prop('checked', $(this).prop('checked'));
    });

    $(document).on("change", ".first-in-column", function () {
        let columnIndex = $(this).index();
        $("#checkbox-container").find('input[type="checkbox"]').each(function () {
            if ($(this).index() % 3 === columnIndex) { // Adjust '3' to the number of columns
                $(this).prop('checked', $(".first-in-column").eq(columnIndex).prop('checked'));
            }
        });
    });

    $(document).on("change", ".first-in-row, .first-in-column", function () {
        if ($(this).hasClass('first-in-row')) {
            let rowIndex = $(this).closest('.row').index();
            $(this).closest('#checkbox-container').find('.row').eq(rowIndex).find('input[type="checkbox"]').prop('checked', $(this).prop('checked'));
        }
        if ($(this).hasClass('first-in-column')) {
            let columnIndex = $(this).index();
            $("#checkbox-container").find('input[type="checkbox"]').each(function () {
                if ($(this).index() % 3 === columnIndex) { // Adjust '3' to the number of columns
                    $(this).prop('checked', $(".first-in-column").eq(columnIndex).prop('checked'));
                }
            });
        }
    });
});

function addCheckbox() {
    let rows = $("#rows").val();
    let columns = $("#columns").val();
    $("#checkbox-container").empty();

    for (let i = 0; i < rows; i++) {
        let rowDiv = $("<div>").addClass("row");
        for (let j = 0; j < columns; j++) {
            let createCheckbox = $("<input>").attr({ type: "checkbox", id: "newCheckbox" }).css("margin", "5px");
            if (j === 0) createCheckbox.addClass("first-in-row");
            if (i === 0) createCheckbox.addClass("first-in-column");
            rowDiv.append(createCheckbox);
        }
        $("#checkbox-container").append(rowDiv);
    }
}
