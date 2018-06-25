Roles = {
	getAll: function(o,cb)
	{
		var db=Roles.using('db');
		db.model('bpclight','select * from roles order by LibRol',cb);
	}
};

module.exports = Roles;