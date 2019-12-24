const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/fetcher');

let repoSchema = mongoose.Schema({
  	id:Number,
    name:String,
    owner: {
      login:{type: String, index:true},
      id:Number,
      html_url:String,
      followers_url:String,
      repos_url:String
    },

});
repoSchema.index({forks_count:-1});
let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  repos = JSON.parse(repos);
	return Promise.all( repos.map(repo => {
		return new Promise ((resolve, reject) => {
			Repo.update({id: repo.id}, repo, {
				upsert: true,
				setDefaultsOnInsert:true
			}, (err, data) => {
				if (err) {reject(err)}
				resolve(JSON.stringify(data));
			})
		})
	}))

}

let getRepos = () => {
	return Repo.find().sort({forks_count: -1}).limit(25).exec();
}

module.exports.save = save;
module.exports.getRepos = getRepos;