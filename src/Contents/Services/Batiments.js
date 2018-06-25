
Batiments = {
	getAll: function(o,cb) {
		var db=Batiments.using('db');
		db.model('bpclight','select * from batiments order by LibBatC',cb);
	}
}

module.exports = Batiments;
