/**
 * ViewClass.
 */
function ViewClass() {

    var messages = {
        MSG_DELETION_ERROR: "Не получилось удалить!",
        MSG_CONTACT_ALREADY_EXISTS: "Контакт с таким номером телефона уже есть!"
    };

    var listeners = [];

    function init() {
        log("ViewClass.init()");
    }

    function notifyAddItemClicked(newItem) {
        listeners.forEach(function (listener) {
            listener.addItem(newItem);
        });
    }

    function notifyDeleteItemClicked(itemId) {
        listeners.forEach(function (listener) {
            listener.deleteItem(itemId);
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

    $("#add-button, #add-link").click(function (event) {
        event.preventDefault();
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
                        var allFilled = true;
                        var fields = $("#add-form input");
                        var emptyLabel = $("#empty-label");

                        fields.each(function (index) {
                            if ($(this).val().length === 0) {
                                $(this).addClass("empty-field");
                                allFilled = false;
                            } else {
                                $(this).removeClass("empty-field");
                            }
                        });

                        if (!allFilled) { /* Не всё заполнено */
                            emptyLabel.fadeIn();
                            return;
                        }

                        notifyAddItemClicked({
                            firstName: $("#input-first-name").val(),
                            lastName: $("#input-last-name").val(),
                            phoneNumber: $("#input-phone-number").val()
                        });

                        fields.val("");
                        emptyLabel.hide();
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

            var deleteLink = $("<a href='#' title='Удалить' class='ui-icon ui-icon-trash' id='" + item.getId() + "'></a>");
            deleteLink.click(item.getId(), function (event) {
                event.preventDefault();
                log("delete id: " + event.data);

                $("#delete-dialog").dialog({
                    autoOpen: false,
                    modal: true,
                    draggable: true,
                    width: 300,
                    title: "Удалить контакт?",
                    buttons: [
                        {
                            text: "Удалить",
                            click: function () {
                                notifyDeleteItemClicked(event.data);
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

            $("<td></td>").appendTo(tableRow);
            $("<td></td>").text(item.getFirstName()).appendTo(tableRow);
            $("<td></td>").text(item.getLastName()).appendTo(tableRow);
            $("<td></td>").text(item.getPhoneNumber()).appendTo(tableRow);
            $("<td></td>").append(deleteLink).appendTo(tableRow);
            tableRow.appendTo(".contacts-table tbody");
            drawRowsNumbers();
            setFooterVisibility();
        },

        removeDeletedItem: function (itemId) {
            log("ViewClass.removeDeletedItem " + itemId);
            $(".contacts-table tbody tr:has(a#" + itemId + ")").remove();
            drawRowsNumbers();
            setFooterVisibility();
        },

        showErrorMessage: function (messageId) {
            $("#error-dialog span#error-message").text(messages[messageId]);

            $("#error-dialog").dialog({
                autoOpen: false,
                modal: true,
                draggable: true,
                width: 300,
                title: "Ошибка",
                buttons: [
                    {
                        text: "OK",
                        click: function () {
                            $(this).dialog("close");
                        }
                    }
                ]
            }).dialog("open");
        }
    };

    init();
    return publicMembers;
}