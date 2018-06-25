
Etablissements = {
	getAll: function(o,cb) {
		var db=Etablissements.using('db');
		db.model('bpclight','select * from etablissements where archive=0',cb);
	},
	getByUnite: function(o,cb) {
		var db=Etablissements.using('db');
		db.model('bpclight','select kets from etablissements where archive=0 and kets in (select kets from unites where kuni="'+o+'")',cb);	
	}
}

module.exports = Etablissements;
