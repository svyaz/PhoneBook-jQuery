/**
 * Presenter class.
 */
function PresenterClass(_model, _view) {
    var model;
    var view;

    function init() {
        model = _model;
        view = _view;
        log("PresenterClass.init()");
    }

    var publicMembers = {
        addListenerToView: function () {
            view.addListener(this);
        },

        addListenerToModel: function () {
            model.addListener(this);
        },

        addItem: function (newItem) {
            model.addItem(newItem);
        },

        deleteItem: function (itemId) {
            model.deleteItem(itemId);
        },

        itemAdded: function (item) {
            if(item === null) {
                view.showErrorMessage("MSG_CONTACT_ALREADY_EXISTS");
            } else {
                view.drawNewItem(item);
            }
        },

        itemDeletedState: function (itemId, isDeleted) {
            if(isDeleted) {
                view.removeDeletedItem(itemId)
            } else {
                view.showErrorMessage("MSG_DELETION_ERROR");
            }
        }
    };

    init();
    return publicMembers;
}