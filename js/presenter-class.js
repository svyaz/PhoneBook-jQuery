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

        itemAdded: function (item) {
            view.drawNewItem(item);
        }
    };

    init();
    return publicMembers;
}