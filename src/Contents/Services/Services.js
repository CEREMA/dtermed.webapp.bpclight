
Services = {
	getAll: function(o,cb) {
		var db=Services.using('db');
		if (o.kuni) 
		db.model('bpclight','select * from subdis where archive=0 and kuni='+o.kuni+' order by LibSubc',cb);
		else
		db.model('bpclight','select * from subdis where archive=0 order by LibSubc',cb);
	}
}

module.exports = Services;
