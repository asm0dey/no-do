require("requirejs").define("models/mongooseHelper", [], function () {
		var Q = require("q");
		var mongoose = require('mongoose');
		var connected = Q.defer();
		var connection = mongoose.connection;

		connection.once('error', function (err) {
			console.log("Mongoose connection failed:", err);
		});
		connection.once('open', function () {
			connected.resolve();
		});

		mongoose.connect(process.env.MONGO_DB_URL || "mongodb://127.0.0.1");

		return {
			mongoose: mongoose,
			connection: connection,
			connected: connected.promise,
			close: function () {
				mongoose.disconnect();
			},
			isConnected: function () {
				return connection.readyState==1;
			}
		}
	}
);
