Formation = {
	getAll: function(o,cb) {
		var db=Formation.using('db');
		db.model('bpclight','select id_formation, Libelle from type_formation',cb);
	}
}

module.exports = Formation;
