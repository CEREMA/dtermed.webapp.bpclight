
Departements = {
	getAll: function(o,cb) {
		var db=Departements.using('db');
		if (o.kets) 
			db.model('bpclight','select * from unites where archive=0 and kets='+o.kets+'  order by LibUniC',cb);
		else
			db.model('bpclight','select * from unites where archive=0 order by LibUniC',cb);
	}
}

module.exports = Departements;
