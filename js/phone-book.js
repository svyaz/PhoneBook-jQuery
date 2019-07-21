"use strict";

function log(text) {
    console.log(text);
}

$(function () {
    var presenter = new PresenterClass(new ContactsListClass(), new ViewClass());
    presenter.addListenerToView();
    presenter.addListenerToModel();
});