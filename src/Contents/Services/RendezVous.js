RendezVous = {
    getAll: function(o,cb) {
        RendezVous.using('db').model('bpclight','select *,rdv_id internalId from medic_rdv',cb);
    }
};

module.exports=RendezVous;