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

    };

    init();
    return publicMembers;
}