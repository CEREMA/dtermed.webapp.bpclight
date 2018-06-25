Motif = {
	getAll: function(o,cb)
	{
		var db=Motif.using('db');
		db.model('bpclight','select * from motif order by kmof',cb);
	}
};

module.exports=Motif;