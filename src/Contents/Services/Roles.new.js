Roles = {
	getAll: function (o, cb) {
		var db = Roles.using('db');
		db.model('bpclight', 'select * from roles where krol not in (86,9,22) order by LibRol', cb);
	},
	delSub: function (o, cb) {
		var db = Roles.using('db');
		db.query('bpclight', 'select Kage from agents where agents.ksub=' + o, function (e, r) {
			if (r.length > 0) {
				List = [];
				for (var i = 0; i < r.length; i++) List.push(r[i].Kage);
				db.query('bpclight', 'DELETE FROM agerol where agerol.krol=9 and agerol.kage in (' + List.join(',') + ')', cb);
			} else cb(e, r);
		});
	},
	delUni: function (o, cb) {
		var db = Roles.using('db');
		db.query('bpclight', 'select Kage from agents where agents.kuni=' + o, function (e, r) {
			if (r.length > 0) {
				List = [];
				for (var i = 0; i < r.length; i++) List.push(r[i].Kage);
				db.query('bpclight', 'DELETE FROM agerol where agerol.krol=22 and agerol.kage in (' + List.join(',') + ')', cb);
			} else cb(e, r);
		});
	},
	delDir: function (o, cb) {
		var db = Roles.using('db');
		db.query('bpclight', 'DELETE FROM agerol where agerol.krol=86 and agerol.kage in (select kage from agents where agents.actif=1)', cb);
	}
};

module.exports = Roles;