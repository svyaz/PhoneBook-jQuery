"use strict";

$(function () {
    var presenter = new PresenterClass(new ContactsListClass(), new ViewClass());
    presenter.addListenerToView();
    presenter.addListenerToModel();
});