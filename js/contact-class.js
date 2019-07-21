/**
 * Contact - one phone book item.
 */
function ContactClass(_firstName, _lastName, _phoneNumber) {
    var id;
    var firstName;
    var lastName;
    var phoneNumber;

    function init() {
        id = (new Date()).getTime().toString();
        firstName = _firstName;
        lastName = _lastName;
        phoneNumber = _phoneNumber;
        log("ContactClass.init(): " + id + ", " + firstName + ", " + lastName + ", " + phoneNumber);
    }

    var publicMembers = {
        getId: function () {
            return id;
        },

        getFirstName: function () {
            return firstName;
        },

        getLastName: function () {
            return lastName;
        },

        getPhoneNumber: function () {
            return phoneNumber;
        }
    };

    init();
    return publicMembers;
}
