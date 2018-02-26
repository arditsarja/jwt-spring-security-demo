$(document).ready(function () {

    $("#create").click();


    attachListeners();

});

function attachListeners() {

    $("#create").change(function () {
        seeFields();
    });
    $("#createStudent").click(function () {
        createStudent();
    });
    $("#updateStudent").click(function () {
        updateStudent();
    });

    // If the checkbox is checked, display the output text


}

function seeFields() {
    if ($("#create").is(':checked')) {
        $("#idStudentShow").show();
        $("#createStudent").show();
        $("#updateStudent").hide();
    } else {
        $("#idStudentShow").hide();
        $("#createStudent").hide();
        $("#updateStudent").show();
    }
}

function createStudent() {
    console.log("po e krijon");
}

function updateStudent() {
    console.log("po e perditson");
}