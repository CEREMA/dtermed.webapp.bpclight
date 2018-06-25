Agents = {
	save: function (o, cb) {
		Agents.using('db').post('bpclight', 'agents', o, cb);
	},
	upload_blob: function (list, ndx, cb) {
		if (!list[ndx]) {
			cb();
			return;
		}
		Agents.using('db').query('bpclight', 'select docId from docs where docId="' + list[ndx].docId + '"', function (err, result) {
			if (result.length > 0) {
				// déjà uploadé
				Agents.upload_blob(list, ndx + 1, cb);
			} else {
				Agents.using('db').query('bpclight', 'insert into docs VALUES ("' + list[ndx].docId + '","-1","-1","-1","-1")', function () {
					App.upload.toBase64(list[ndx].docId, function (err, blob) {
						Agents.using('db').post('bpclight', 'docs', {
							docId: list[ndx].docId,
							_blob: blob,
							filename: list[ndx].filename,
							type: list[ndx].filetype,
							size: list[ndx].filesize
						}, function () {
							Agents.upload_blob(list, ndx + 1, cb);
						});
					});
				});
			}
		});
	},
	updateMe: function (o, cb) {
		Agents.using('db').post('bpclight', 'agents', o, function (r) {
			if (o._BLOB) {
				Agents.upload_blob(o._BLOB, 0, function () {
					cb(r);
				});
			} else cb(r);
		});
	},
	insert: function (o, cb) {
		if (!o.matri) {
			Agents.using('db').query('bpclight', "select max(matri)+1 matricule from agents where matri like '2%'", function (e, r) {
				o.matri = r[0].matricule;
				Agents.using('db').post('bpclight', 'agents', o, cb);
			});
		} else Agents.using('db').post('bpclight', 'agents', o, cb);
	},
	getMyPosition: function (o, cb) {
		Agents.using('db').model('bpclight', 'SELECT * FROM bpclight.ageetat ageetat INNER JOIN bpclight.position position ON (ageetat.Kpst = position.Kpst) WHERE ageetat.Keta = ' + o + ' ORDER BY ageetat.DatEta desc', cb);
	},
	saveFormation: function (o, cb) {
		Agents.using('db').post('bpclight', 'recapitulatif', o, cb);
	},
	getPhoto: function (o, cb) {
		Agents.using('db').query('bpclight', 'select trombi from trombi where kage=' + o, cb);
	},
	setPhoto: function (o, cb) {
		Agents.using('db').post('bpclight', 'trombi', o, cb);
	},
	getRole: function (o, cb) {
		Agents.using('db').model('bpclight', 'select * from agerol, roles where agerol.krol=roles.krol and agerol.kage=' + o.kage + ' order by LibRol', cb);
	},
	saveSituation: function (o, cb) {
		var db = Agents.using('db');
		db.post('bpclight', 'ageetat', o, cb);
	},
	addRole: function (o, cb) {
		Agents.using('db').post('bpclight', 'agerol', o, cb);
	},
	delRole: function (krol, kage, cb) {
		var db = Agents.using('db');
		db.query('bpclight', 'delete from agerol where kage=' + kage + ' and krol=' + krol, cb);
	},
	getPosition: function (o, cb) {
		var db = Agents.using('db');
		db.query('bpclight', 'SELECT position.Position FROM bpclight.ageetat ageetat INNER JOIN bpclight.position position ON (ageetat.Kpst = position.Kpst) WHERE (ageetat.Kage = ' + o + ' and ageetat.DatEta<=NOW()) ORDER BY ageetat.DatEta desc', cb);
	},
	getFormations: function (o, cb) {
		Agents.using('db').model('bpclight', 'SELECT id_recapitulatif,Kage,Date,Session,Nom_organisme,type_formation,Libelle,frequence FROM recapitulatif, type_formation WHERE recapitulatif.type_formation=type_formation.id_formation AND recapitulatif.Kage ="' + o.Kage + '" ORDER BY 3', cb);
	},
	delPosition: function (o, cb) {
		Agents.using('db').del('bpclight', 'ageetat', o, cb);
	},
	delFormation: function (o, cb) {
		Agents.using('db').del('bpclight', 'recapitulatif', o, cb);
	},
	getPositions: function (o, cb) {
		Agents.using('db').model('bpclight', 'SELECT ageetat.Keta, position.Position,ageetat.dateta FROM bpclight.ageetat ageetat INNER JOIN bpclight.position position ON (ageetat.Kpst = position.Kpst) WHERE (ageetat.Kage = ' + o.kage + ') ORDER BY ageetat.DatEta desc', cb);
	},
	setAdresse: function (o, cb) {
		var kage = o.Kage;
		delete o.Kage;
		Agents.using('db').post('bpclight', 'adresses', o, function (e, o) {
			console.log(o);
			if (o.insertId != 0) Agents.using('db').query('bpclight', 'update agents set kres=' + o.insertId + ' where kage=' + kage, function (err, r) {
				cb();
			});
			else cb();
		});
	},
	getAdresse: function (x, cb) {
		var db = Agents.using('db');
		var o = {
			adresse: "",
			cpostal: "",
			ville: ""
		};
		var sql = "SELECT kadr,adresse,kpos FROM agents,adresses where agents.kres = adresses.kadr and agents.kage=$kage order by date_derniere_modif";
		db.query('bpclight', sql.replace('$kage', x), function (err, r) {
			if (r.length > 0) {
				var kpos = r[0].kpos;
				o.adresse = r[0].adresse;
				o.kadr = r[0].kadr;
				db.query('bpclight', 'SELECT id, code,ville FROM postal where id=' + kpos, function (err, r) {
					if (r.length > 0) {
						o.id = r[0].id;
						o.cpostal = r[0].code;
						o.ville = r[0].ville;
						cb(null, o);
					} else cb(null, o);
				});
			} else cb(null, o);
		});
	},
	getCategory: function (o, cb) {
		Agents.using('db').model('bpclight', 'select Kcgr from grades where Kgra=' + o, cb);
	},
	getMail: function (o, cb) {
		Agents.using('db').model('bpclight', 'select LibMelA from mela where LibMelA like "%@cerema.fr" and Kage=' + o + ' order by kmela desc', cb);
	},
	getHierarchie: function (o, cb) {
		Agents.using('db').query('bpclight', "SELECT agerol.kage,agerol.krol,agents.nom,agents.prenom from agents,agerol where agerol.krol in (5,9) and agents.kage=agerol.kage and agents.actif=1 and agents.ksub=(select ksub from agents where kage=" + o + ")", function (err, response) {
			var r = {};
			for (var i = 0; i < response.length; i++) {
				if (response[i].krol == 9) r.chef = response[i].prenom + ' ' + response[i].nom;
				if (response[i].krol == 5) r.adjoint = response[i].prenom + ' ' + response[i].nom;
			};
			cb(null, r);
		});
	},
	getSecretaires: function (o, cb) {
		Agents.using('db').model('bpclight', "select kage, concat_ws(' ',nom,prenom) nomprenom from agents where actif=1 and kage in (select kage from agerol where krol=1) order by nomprenom", cb);
	},
	exportCiv: function (o, cb) {
		var db = Agents.using('db');
		if (o.length == 0) {
			cb(true, null);
			return;
		};
		db.query('bpclight', db.sql("export_civ", {
			kage: o
		}), cb);
	},
	getOne: function (id, cb) {
		Agents.using('db').query('bpclight', 'SELECT batiments.LibBatC, batiments.GPS, agents.* FROM bpclight.agents agents LEFT OUTER JOIN bpclight.batiments batiments ON (agents.Kbat = batiments.Kbat) WHERE kage=' + id + ' order by nom,prenom', cb);
	},
};

module.exports = Agents;