$(document).ready(function (){
    $("#submitBtn").on("click", addCheckbox);

    // row selector
    $("#checkbox-container").on("change", ".first-in-row", function() {
        $(this).closest(".row").find("input[type='checkbox']").prop("checked" , $(this).prop("checked"));
    });

    // column selector
    $("#checkbox-container").on("change", ".first-in-column" , function() {
        let columnIndex = $(this).index();
        $(".row").find("input[type='checkbox']:nth-child(" +(columnIndex+1) + ")").prop("checked" , $(this).prop("checked"));
    });

    // all selector
    $("#checkbox-container").on("change" , ".first-in-row.first-in-column" , function () {
        $("#checkbox-container input[type='checkbox']").prop("checked" ,$(this).prop("checked"));
    });
});


function addCheckbox() {
    let rows = $("#rows").val();
    let columns = $("#columns").val();
    $("#checkbox-container").empty();
    for (let i =0; i < rows; i++ ){
        let rowDiv = $("<div>").addClass("row");
        for (let j=0; j < columns; j++) {
            let createCheckbox = $("<input>").attr({ type: "checkbox", id: "newCheckbox" }).css("margin", "5px");
            $("#checkbox-container").append(createCheckbox);
            if (j === 0) createCheckbox.addClass("first-in-row");
            if (i === 0) createCheckbox.addClass("first-in-column");
            rowDiv.append(createCheckbox);
        }
        $("#checkbox-container").append(rowDiv);
    }
}