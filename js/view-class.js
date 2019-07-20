/**
 * ViewClass.
 */
function ViewClass() {

    function init() {
        log("ViewClass.init()");
    }

    $("#add-button").click(function () {
        log("ViewClass.click()");

        $("#add-dialog").dialog({
            autoOpen: false,
            modal: true,
            draggable: true,
            width: 500,
            title: "Добавить новый контакт",
            buttons: [
                {
                    text: "Добавить",
                    click: function () {
                        $(this).dialog("close");
                    }
                },
                {
                    text: "Отмена",
                    click: function () {
                        $(this).dialog("close");
                    }
                }
            ]
        }).dialog("open");
    });

    var publicMembers = {

    };

    init();
    return publicMembers;
}