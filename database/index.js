const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
var dbName = "fetcher"
mongoose.connect(`mongodb://localhost/${dbName}`, {useMongoClient: true}, function(err, db) {
	if (err) throw err;
	console.log(`database ${dbName} was created`);
});

mongoose.connection.once("open", () => {
console.log("the connection was made")
}).on("error", (error) => {
	console.log("failed to connect to the database")
})

let repoSchema = mongoose.Schema({

		userName:String,
		repoName: String,
		url: String
});

// repoSchema.index({forks_count:-1});

let Repo = mongoose.model('Repos', repoSchema);

let save = (repoe) => {

		return new Promise ((resolve, reject) => {
			var data = new Repo(repoe)
			data.save((err, res) => {
				if (err) {
					reject(err)
				} else {
					resolve(res)
				}
			});
			})
}

let saveAll = (repoes) => {
	return new Promise((resolve, reject) => {
		Repo.collection.insertMany(repoes, function(err, res) {
			if(err) {
				reject(err)
			} else {
				resolve(res)
			}
		})
	})
}

let findRepo = (userName) => {
	return Repo.find({userName: userName})
};

module.exports.save = save;
module.exports.saveAll = saveAll;
module.exports.findRepo = findRepo;