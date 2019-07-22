/**
 * ContactsList - list of contacts.
 */
function ContactsListClass() {
    var list;
    var listeners = [];

    function init() {
        list = [];
        log("ContactsListClass.init()");
    }

    function notifyItemAdded(contact) {
        log("ContactsListClass.notifyItemAdded, contact = " + contact);
        listeners.forEach(function (listener) {
            listener.itemAdded(contact);
        });
    }

    function notifyItemDeletedState(itemId, isDeleted) {
        listeners.forEach(function (listener) {
            listener.itemDeletedState(itemId, isDeleted);
        })
    }

    var publicMembers = {
        size: function () {
            return list.length;
        },

        addItem: function (newItem) {
            var contact = new ContactClass(newItem.firstName, newItem.lastName, newItem.phoneNumber);
            list.push(contact);
            log("ContactsListClass.addItem(), new list size = " + list.length);
            notifyItemAdded(list[list.length - 1]);
        },

        deleteItem: function (itemId) {
            var isDeleted = list.some(function (item, index) {
                if (item.getId() === itemId) {
                    var ret = list.splice(index, 1);
                    console.log("list.splice return = " + ret);
                    return true;
                }
                return false;
            });

            notifyItemDeletedState(itemId, isDeleted);
        },

        addListener: function (object) {
            log("ContactsListClass.addListener " + object);
            listeners.push(object);
        }
    };

    init();
    return publicMembers;
}
