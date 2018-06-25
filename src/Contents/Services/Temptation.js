Temptation = {
	search: function (str, cb) {
		var db = Temptation.using('db');
		db.query('temptation', "SELECT MATRI matri, NOMPRE nompre, datouv FROM HopeMpl Hm where YEAR(datouv)>=YEAR(GetDate()) and datclo='1900-01-01' order by datouv desc", cb);
	},
	quotite: function (o, cb) {
		var quotite = "0";
		var histo = [];
		/*Temptation.using('db').query('temptation',"SELECT MATRI, INETP,DAT FROM dbo.hophjoup WHERE MATRI LIKE '"+o.matri+"' ORDER BY DAT",function(e,r){
			
			for (var i=0;i<r.length;i++) {
				var item=r[i];
				var date=JSON.stringify(item.DAT);
				if (item.INETP!=quotite) {
					quotite=item.INETP;
					histo.push({
						quotite: quotite,
						date: date.split('T')[0].split('"')[1]
					});
				}
			}
			cb(histo);
		})*/
		Temptation.using('db').query('bpclight', 'select IneTP from agents where matri like "' + o.matri + '"', function (e, r) {
			histo.push({
				quotite: r[0].IneTP,
				date: "2012-01-01"
			});
			cb(histo);
		});
	}
};

module.exports = Temptation;