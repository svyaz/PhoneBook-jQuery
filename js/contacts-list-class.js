/**
 * ContactsList - list of contacts.
 */
function ContactsListClass() {
    var list;

    function init() {
        list = [];
        log("ContactsListClass.init()");
    }

    var publicMembers = {
        size: function () {
            return list.length;
        },

        addItem: function (contact) {
            list.push(contact);
        },

        removeItem: function (id) {
            return list.some(function (item, index) {
                if (item.getId() === id) {
                    var ret = list.splice(index, 1);
                    console.log("list.splice return = " + ret);
                    return true;
                }
                return false;
            });
        }
    };

    init();
    return publicMembers;
}
