/**
 * ViewClass.
 */
function ViewClass() {

    var messages = {
        MSG_DELETION_ERROR: "Не получилось удалить!",
        MSG_CONTACT_ALREADY_EXISTS: "Контакт с таким номером телефона уже есть!",
        MSG_SELECT_BEFORE_DELETION: "Сначала надо выбрать некоторые записи!"
    };

    var listeners;

    var selectAllCheckbox = $("#check-head");

    function init() {
        listeners = [];
    }

    function notifyAddItem(newItem) {
        listeners.forEach(function (listener) {
            listener.addItem(newItem);
        });
    }

    function notifyDeleteItem(itemId) {
        listeners.forEach(function (listener) {
            listener.deleteItem(itemId);
        });
    }

    function drawRowsNumbers() {
        $(".contacts-table tbody tr > td:nth-child(2)").each(function (index) {
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

    function rowCheckboxChanged() {
        if (!this.checked) {
            selectAllCheckbox.prop("checked", false);
        }
    }

    selectAllCheckbox.change(function (event) {
        var checkboxes = $(".contacts-table tbody input:checkbox");
        if (checkboxes.length > 0) {
            checkboxes.prop("checked", event.target.checked);
        }
    });

    $("#add-button, #add-link").click(function (event) {
        event.preventDefault();
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

                        notifyAddItem({
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

    $("#delete-button").click(function (event) {
        event.preventDefault();
        var selectedItems = $(".contacts-table tbody input:checked");

        if (selectedItems.length > 0) {
            $("#delete-dialog").dialog({
                autoOpen: false,
                modal: true,
                draggable: true,
                width: 300,
                title: "Удалить выбранные контакты?",
                buttons: [
                    {
                        text: "Удалить",
                        click: function () {
                            $(this).dialog("close");
                            selectedItems.each(function () {
                                var id = this.id.replace("check-", "");
                                notifyDeleteItem(id);
                            });
                            selectAllCheckbox.prop("checked", false);
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
        } else {
            publicMembers.showErrorMessage("MSG_SELECT_BEFORE_DELETION");
        }

    });

    var publicMembers = {
        addListener: function (object) {
            listeners.push(object);
        },

        drawNewItem: function (item) {
            var tableRow = $("<tr></tr>");

            var deleteLink = $("<a href='#' title='Удалить' class='ui-icon ui-icon-trash' id='del-" + item.getId() + "'></a>");
            deleteLink.click(item.getId(), function (event) {
                event.preventDefault();

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
                                notifyDeleteItem(event.data);
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

            $("<td><label><input type='checkbox' id='check-" + item.getId() + "'></label></td>").appendTo(tableRow);
            $("<td></td>").appendTo(tableRow);
            $("<td></td>").text(item.getFirstName()).appendTo(tableRow);
            $("<td></td>").text(item.getLastName()).appendTo(tableRow);
            $("<td></td>").text(item.getPhoneNumber()).appendTo(tableRow);
            $("<td></td>").append(deleteLink).appendTo(tableRow);
            tableRow.appendTo(".contacts-table tbody");

            $("#check-" + item.getId()).change(rowCheckboxChanged);

            drawRowsNumbers();
            setFooterVisibility();
        },

        removeDeletedItem: function (itemId) {
            $(".contacts-table tbody tr:has(a#del-" + itemId + ")").remove();
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