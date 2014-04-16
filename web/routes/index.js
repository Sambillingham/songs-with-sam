var applicationController = require("../controllers/applicationController");

module.exports.init = function (app) {

        app.get('/', applicationController.index);
}