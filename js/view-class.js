/**
 * ViewClass.
 */
function ViewClass() {

    var listeners = [];

    function init() {
        log("ViewClass.init()");
    }

    function notifyAddItemClicked(newItem) {
        listeners.forEach(function (listener) {
            listener.addItem(newItem);
        });
    }

    function drawRowsNumbers() {
        $(".contacts-table tbody tr > td:first-child").each(function (index) {
            $(this).html(index + 1);
        });
    }

    function setFooterVisibility() {
        if ($(".contacts-table tbody tr").length) {
            $(".contacts-table tfoot").fadeOut(); // hide()
        } else {
           $(".contacts-table tfoot").fadeIn();  // show()
        }
    }

    $("#add-button, #add-link").click(function () {
        log("ViewClass.click()");

        $("#add-dialog").dialog({
            autoOpen: false,
            modal: true,
            draggable: true,
            width: 300,
            title: "Добавить новый контакт",
            buttons: [
                {
                    text: "Добавить",
                    click: function () {
                        var newContact = {
                            firstName: $("#input-first-name").val(),
                            lastName: $("#input-last-name").val(),
                            phoneNumber: $("#input-phone-number").val()
                        };
                        notifyAddItemClicked(newContact);
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
        addListener: function (object) {
            log("ViewClass.addListener " + object);
            listeners.push(object);
        },

        drawNewItem: function (item) {
            log("ViewClass.drawNewItem " + item);
            var tableRow = $("<tr></tr>");
            $("<td></td>").appendTo(tableRow);
            $("<td></td>").text(item.getFirstName()).appendTo(tableRow);
            $("<td></td>").text(item.getLastName()).appendTo(tableRow);
            $("<td></td>").text(item.getPhoneNumber()).appendTo(tableRow);
            $("<td><a href=\"#\" title=\"Удалить\" class=\"ui-icon ui-icon-trash\"></a></td>").appendTo(tableRow);
            tableRow.appendTo(".contacts-table tbody");
            drawRowsNumbers();
            setFooterVisibility();
        }
    };

    init();
    return publicMembers;
}