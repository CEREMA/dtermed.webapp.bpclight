function parseJsonDate(jsonDate) {
	var offset = new Date().getTimezoneOffset() * 60000;
	var parts = /\/Date\((-?\d+)([+-]\d{2})?(\d{2})?.*/.exec(jsonDate);

	if (parts[2] == undefined)
		parts[2] = 0;

	if (parts[3] == undefined)
		parts[3] = 0;

	return new Date(+parts[1] + offset + parts[2] * 3600000 + parts[3] * 60000);
};

App.controller.define('CAgent', {

	views: [
		"VAgentPanel",
		"VShowFormation",
		"agent.VSidePanel",
		"agent.VAgent",
		"agent.VSituation",
		"agent.VAutorisation",
		"agent.VFormation",
		"agent.VVisit",
		"agent.VVisit.formulaire",
		"agent.VRendezVous",
		"agent.VAutorisation",
		"agent.VInformatique"
	],

	models: [

	],

	init: function () {
		this.control({
			"menu>menuitem": {
				click: "Menu_onclick"
			},
			/*
			TAgentPanel
			*/
			"TAgentPanel": {
				show: "TAgentPanel_onshow"
			},
			"TAgentPanel button#Record": {
				click: "record_onclick"
			},
			"TAgentPanel combo#TCat": {
				select: "TCat_onchange"
			},
			"TAgentPanel button#Exit": {
				click: "close_agent"
			},
			"TAgentPanel textfield#TMelA": {
				render: "TMelA_onclick"
			},
			"TAgentPanel textfield#CodePostal": {
				render: "TCodePostal_onclick",
				keyup: "TCodePostal_onchange"
			},
			"TAgentPanel combo#VilleCBO": {
				select: "VilleCBO_onclick"
			},
			"TAgentPanel button#RoleAdd": {
				click: "RoleAdd_click"
			},
			"TAgentPanel grid#roles": {
				itemcontextmenu: "Roles_onContextMenu"
			},
			/*
			TSidePanel
			*/
			"TSidePanel combo#TEtablissement": {
				select: "TEtablissement_onchange"
			},
			"TSidePanel panel#PanelPhoto": {
				load: "photo_onload"
			},
			"TSidePanel combo#TDepartement": {
				select: "TDepartement_onchange"
			},
			/*
			TSituation
			*/
			"TSituation": {
				show: "TSituation_onshow"
			},
			"TSituation grid#situadm": {
				edit: function (ed, o) {
					var post = {
						INM: o.record.data.INM,
						DAT: o.record.data.DAT,
						ECH: o.record.data.ECH,
						kage: o.grid.up('window').agent.Kage
					};
					if (o.record.data.idsituadm) post.idsituadm = o.record.data.idsituadm;
					App.DB.post('bpclight://situadm', post, function (r) {
						o.store.load();
					});
				}
			},
			"TSituation combo#position": {
				select: "position_onchange"
			},
			"TSituation button#situation_cancel": {
				click: "situation_cancel_onclick"
			},
			"TSituation button#Add": {
				click: "situation_add"
			},
			"TSituation button#situation_ok": {
				click: "situation_record"
			},
			"TSituation combo#TIEtablissement": {
				select: "TIEtablissement_onchange"
			},
			"TSituation combo#TIDepartement": {
				select: "TIDepartement_onchange"
			},
			"TSituation grid#gridPositions": {
				itemcontextmenu: "Positions_onContextMenu",
				itemclick: "Positions_click"
			},
			/*
			TInformatique
			*/
			"TInformatique": {
				show: function (p) {
					var store = App.store.create('bpclight://agequip?kage=' + p.up('window').agent.Kage);
					App.get(p, 'grid').bindStore(store);
					store.load();
				}
			},
			"TInformatique grid": {
				edit: function (me, store) {
					var data = {
						kage: store.grid.up('window').agent.Kage,
						equip: store.record.data.equip,
						comments: store.record.data.comments
					};
					if (store.record.data.eid) data.eid = store.record.data.eid;
					App.DB.post("bpclight://agequip", data, function () {
						store.grid.getStore().load();
					});
					console.log(record);
				}
			},
			/*
			TAutorisation
			*/
			"TAutorisation": {
				show: function (p) {
					// Autorisations
					var store = App.store.create('bpclight://agepiece?TypPie=1&kage=' + p.up('window').agent.Kage);
					App.get(p, 'grid').bindStore(store);
					store.load();
				}
			},
			"TAutorisation grid": {
				edit: function (me, store) {
					var record = store.record;
					record.data.Kage = store.grid.up('window').agent.Kage;
					record.data.TypPie = 1;
					App.DB.post("bpclight://agepiece", record.data, function () {
						store.grid.getStore().load();
					});
				}
			},
			/*
			TFormation
			*/
			"TFormation": {
				show: "TFormation_onShow"
			},
			"TFormation panel#organisme": {
				load: "formation_upload"
			},
			"TFormation grid#gridFormation": {
				itemcontextmenu: "Formation_onContextMenu",
				itemdblclick: "formation_download"
			},
			"TFormation button#ajouter": {
				click: "ajouter_onclick"
			},
			/*
			TShowFormation
			*/
			"TShowFormation button#Exit": {
				click: "formation_exit"
			},
			/*
			TVisit
			*/
			"TVisit": {
				show: "Visit_onShow"
			},
			"TVisit button#medic_new": {
				click: "VisitDataOpen"
			},
			"TVisit button#btn_record": {
				click: "Visit_recordgen"
			},
			"TVisit grid#grid_medic": {
				itemdblclick: "grid_medic_click"
			},
			/*
			TVisitData
			*/
			"TVisitData": {
				show: "visitdata_onshow"
			},
			"TVisitData toolbar#Exit": {
				click: "Visit_onExit"
			},
			"TVisitData toolbar#RecordMe": {
				click: "Visit_onRecord"
			},
			"TVisitData button#prev": {
				click: "visit_prev"
			},
			"TVisitData button#next": {
				click: "visit_next"
			},
			/*
			TRendezVous
			*/
			"TRendezVous": {
				show: "TRendezVous_onshow"
			},
			"TRendezVous button#add_rdv": {
				"click": "add_rdv"
			},
			"TRendezVous grid": {
				itemdblclick: "grid_click",
				itemcontextmenu: "grid_onContextMenu",
			},
			"TRendezVous checkboxfield": {
				change: "rdv_check_change"
			},
			"TRendezVous radiofield": {
				change: "rdv_radio_change"
			},
			"vmedicwindow": {
				show: function (me) {
					if (me.dta) {
						App.get(me, 'combo#EdVMNature').setValue(me.dta.nature);
						App.get(me, 'datetimefield#EdVMDate').setValue(me.dta.StartDate);
						App.get(me, 'datetimefield#EdVMNextDate').setValue(me.dta.NextDate);
						App.get(me, 'combo#EdVMResultats').setValue(me.dta.resultat);
						App.get(me, 'textarea#EdVMCommentaires').setValue(me.dta.commentaires);
					} else {
						me.dta = {
							kage: App.get('TAgentPanel').agent.Kage
						};
						console.log(me.dta);
					}
				}
			}

		});
	},
	rdv_radio_change: function (radio, val) {
		var obj = {
			kage: radio.up('window').agent.Kage,
			gen_dossierdemande: 0,
			gen_dossierrecu: 0
		};
		if (radio.itemId == "dossierdemande") {
			obj.gen_dossierdemande = val;
			App.get("radiofield#dossierrecu").setValue(false);
		};
		if (radio.itemId == "dossierrecu") {
			obj.gen_dossierrecu = val;
			App.get("radiofield#dossierdemande").setValue(false);
		};
		App.DB.post('bpclight://medic_gen', obj, function (e) {
			console.log(e);
		})
	},
	rdv_check_change: function (checkbox, val) {
		var obj = {
			kage: checkbox.up('window').agent.Kage
		};
		if (checkbox.itemId == "posteRisque") obj.gen_posterisque = val;
		App.DB.post('bpclight://medic_gen', obj, function (e) {
			console.log(e);
		})
	},
	grid_onContextMenu: function (view, rec, node, index, e) {
		e.stopEvent();
		var x = Ext.create('Ext.menu.Menu', {
			items: [{
				text: "Supprimer",
				handler: function (me) {
					App.DB.del('bpclight://medic_rdv?rdv_id=' + rec.data.rdv_id, function (r) {
						view.up('grid').getStore().load();
					})
				}
			}]
		});
		x.showAt(e.getXY());
		return false;
	},
	grid_click: function (me, record) {
		console.log(record.data);
		App.view.create('VMedicRDV', {
			modal: true,
			dta: record.data
		}).show().center();
	},
	TRendezVous_onshow: function (me) {
		var store = App.store.create('bpclight://medic_rdv?kage=' + me.up('window').agent.Kage);
		App.get(me, 'grid').bindStore(store);
		store.load();
		App.DB.get('bpclight://medic_gen?kage=' + me.up('window').agent.Kage, function (r) {
			if (r.data.length > 0) {
				console.log(r.data);
				if (r.data[0].gen_posterisque == 1) App.get(me.up('window'), 'checkboxfield#posteRisque').setValue(true);
				if (r.data[0].gen_dossierrecu == 1) App.get("radiofield#dossierrecu").setValue(true);
				if (r.data[0].gen_dossierdemande == 1) App.get("radiofield#dossierdemande").setValue(true);
			}
		});
	},
	rdv_record: function (me) {
		var scheduler = App.get(me.up('window'), 'schedulergrid');
		var store = scheduler.getEventStore();
		var grid = App.get('TRendezVous grid');

		var data = [];
		for (var i = 0; i < store.data.items.length; i++) {
			var item = store.data.items[i];
			console.log(item);
			if (item.dirty) {
				var obj = {
					ResourceId: 1,
					kage: me.up('window').agent.Kage,
					StartDate: item.data.StartDate,
					EndDate: item.data.EndDate
				};
				if (me.up('window').agent != '-1') obj.Name = me.up('window').agent.Prenom + ' ' + me.up('window').agent.Nom

				if (item.data.internalId) obj.rdv_id = item.data.internalId;

				/* App.DB.post('bpclight://medic_rdv',obj,function(obj){
                      if (grid) grid.getStore().load();
		              me.up('window').close();                    
                });*/
			}
		};
	},
	rdv_month: function (me) {
		var scheduler = App.get(me.up('window'), 'schedulergrid');
		var newdate = scheduler.startDate.set({
			day: 1,
			month: App.get(me.up('window'), 'combo#selectMonth').getValue(),
			year: App.get(me.up('window'), 'combo#selectAnnee').getValue()
		});
		scheduler.setStart(newdate);
	},
	rdv_year: function (me) {
		var scheduler = App.get(me.up('window'), 'schedulergrid');
		var newdate = scheduler.startDate.set({
			day: 1,
			month: App.get(me.up('window'), 'combo#selectMonth').getValue(),
			year: App.get(me.up('window'), 'combo#selectAnnee').getValue()
		});
		scheduler.setStart(newdate);
	},
	rdv_previous: function (me) {
		var scheduler = App.get(me.up('window'), 'schedulergrid');
		var newdate = scheduler.startDate.addWeeks(-1);
		App.get(me.up('window'), 'combo#selectMonth').setValue(newdate.getMonth());
		App.get(me.up('window'), 'combo#selectAnnee').setValue(newdate.getFullYear());
		scheduler.setStart(newdate);
		scheduler.setEnd(newdate);
	},
	rdv_next: function (me) {
		var scheduler = App.get(me.up('window'), 'schedulergrid');
		var newdate = scheduler.startDate.addWeeks(1);
		App.get(me.up('window'), 'combo#selectMonth').setValue(newdate.getMonth());
		App.get(me.up('window'), 'combo#selectAnnee').setValue(newdate.getFullYear());
		scheduler.setStart(newdate);
		scheduler.setEnd(newdate);
	},
	VRDVScheduler_onshow: function (me) {
		// Update years
		var now = new Date();
		var year = now.getFullYear();
		var tab = [];
		for (var i = -3; i <= 3; i++) tab.push({
			year: year + i
		});

		var store_year = App.store.create({
			fields: [
				"year"
			],
			data: tab
		});

		App.get(me, 'combo#selectMonth').setValue(now.getMonth());

		App.get(me, 'combo#selectAnnee').bindStore(store_year);
		App.get(me, 'combo#selectAnnee').setValue(now.getFullYear());

	},
	add_rdv: function (me) {
		App.view.create('VMedicRDV', {
			agent: me.up('window').agent,
			modal: true
		}).show().center();
	},
	visit_prev: function (p) {
		var me = this;
		App.DB.get('bpclight://medic_dossiers{kage,date}?id=' + p.up('window')._id, function (o) {
			// get Kage
			App.DB.get('bpclight://medic_dossiers{id,date+}?kage=' + o.data[0].kage, function (m) {
				for (var i = 0; i < m.data.length; i++) {
					if (m.data[i].date.split('T')[0] == o.data[0].date.split('T')[0]) {
						var z = m.data[i - 1];
					};
				};
				if (z) {
					console.log(z);
					p.up('window')._id = z.id;
					me.visitdata_onshow(p.up('window'));
				} else {
					alert("Il n'y a pas d'autre fiche");
				}
			});
		});
	},
	visit_next: function (p) {
		var me = this;
		App.DB.get('bpclight://medic_dossiers{kage,date}?id=' + p.up('window')._id, function (o) {
			// get Kage
			App.DB.get('bpclight://medic_dossiers{id,date+}?kage=' + o.data[0].kage, function (m) {
				for (var i = 0; i < m.data.length; i++) {
					if (m.data[i].date.split('T')[0] == o.data[0].date.split('T')[0]) {
						var z = m.data[i + 1];
					};
				};
				if (z) {
					p.up('window')._id = z.id;
					me.visitdata_onshow(p.up('window'));
				} else {
					alert("Il n'y a pas d'autre fiche");
				}
			});
		});
	},
	Visit_onRecord: function (p) {
		var RG = App.get('TVisitData propertygrid#RG').getSource();
		var EFR = App.get('TVisitData propertygrid#EFR').getSource();
		var TU = App.get('TVisitData propertygrid#TU').getSource();
		var TV = App.get('TVisitData propertygrid#TV').getSource();
		var TA = App.get('TVisitData propertygrid#TA').getSource();
		var DATA = {
			type: App.get('TVisitData combo#TMedicTypeVisite').getValue(),
			cat: App.get('TVisitData combo#TMedicCategorie').getValue(),
			date: App.get('TVisitData datefield#TMedicDate').getValue(),
			kage: p.up('window')._dossier,
			Taille: RG.Taille,
			Pouls: RG.Pouls,
			TA: RG.TA,
			Poids: RG.Poids,
			CVF: EFR.CVF,
			VEMS: EFR.VEMS,
			VEMS_CVF: EFR['VEMS/CVF'],
			DEMM: EFR.DEMM,
			TU: TU['Rq'],
			TU_RESULT: TU['Resultat'],
			TV_OD: TV['OD/OG'],
			TV_CORRECTION: TV['Correction'],
			TV_RQ: TV['Rq'],
			TV_ANOMALIE: TV['Anomalie'],
			TV_STIGM: TV['Astigmatie'],
			TA_ORD: TA['ORD'],
			TA_ORG: TA['ORG'],
			TA_CORRECTION: TA['Correction'],
			TA_RQ: TA['Rq'],
			tabac: App.get('TVisitData combo#TTabac').getValue(),
			alcool: App.get('TVisitData combo#TAlcool').getValue(),
			sport: App.get('TVisitData combo#TSport').getValue(),
			commentaires: App.get('TVisitData htmleditor#comments').getValue(),
			_clinique: App.get('TVisitData htmleditor#clinique').getValue(),
			poste_actuel: App.get('TVisitData htmleditor#TPosteActuel').getValue(),
			traitements: App.get('TVisitData htmleditor#TTraitements').getValue(),
			orientations: App.get('TVisitData tagfield#orientations').getValue(),
			clinique: App.get('TVisitData tagfield#clinique').getValue(),
			vaccinations: App.get('TVisitData htmleditor#vaccinations').getValue(),
			conclusions: App.get('TVisitData combo#TConclusions').getValue()
		};
		if (p.up('window')._id) DATA.id = p.up('window')._id;
		App.DB.post('bpclight://medic_dossiers', DATA, function (o) {
			console.log(o);
			App.get('TVisit grid#grid_medic').getStore().load();
			p.up('window').close();
			App.notify("Le dossier a bien été enregistré.");
		});
	},
	visitdata_onshow: function (p) {

		if (p._id) {
			App.DB.get('bpclight://medic_dossiers?id=' + p._id, function (o) {
				o = o.data[0];
				App.get('TVisitData combo#TMedicTypeVisite').setValue(o.type);
				App.get('TVisitData combo#TMedicCategorie').setValue(o.cat);
				App.get('TVisitData datefield#TMedicDate').setValue(o.date.toDate());
				var grid = App.get('TVisitData propertygrid#RG');
				grid.setProperty('Taille', o.Taille);
				grid.setProperty('Poids', o.Poids);
				grid.setProperty('Pouls', o.Pouls);
				grid.setProperty('TA', o.TA);
				var grid = App.get('TVisitData propertygrid#EFR');
				grid.setProperty('CVF', o.CVF);
				grid.setProperty('DEMM', o.DEMM);
				grid.setProperty('VEMS', o.VEMS);
				grid.setProperty('VEMS/CVF', o.VEMS_CVF);
				var grid = App.get('TVisitData propertygrid#TU');
				grid.setProperty('Resultat', o.TU_RESULT);
				grid.setProperty('Rq', o.TU);
				var grid = App.get('TVisitData propertygrid#TV');
				grid.setProperty('OD/OG', o.TV_OD);
				grid.setProperty('Correction', o.TV_CORRECTION);
				grid.setProperty('Rq', o.TV_RQ);
				grid.setProperty('Anomalie', o.TV_ANOMALIE);
				grid.setProperty('Astigmatie', o.TV_STIGM);
				var grid = App.get('TVisitData propertygrid#TA');
				grid.setProperty('ORD', o.TA_ORD);
				grid.setProperty('ORG', o.TA_ORG);
				grid.setProperty('Correction', o.TA_CORRECTION);
				grid.setProperty('Rq', o.TA_RQ);
				App.get('TVisitData htmleditor#comments').setValue(o.commentaires);
				App.get('TVisitData htmleditor#clinique').setValue(o._clinique);
				App.get('TVisitData htmleditor#TPosteActuel').setValue(o.poste_actuel);
				App.get('TVisitData htmleditor#TTraitements').setValue(o.traitements);
				App.get('TVisitData tagfield#orientations').setValue(JSON.parse(o.orientations));
				App.get('TVisitData tagfield#clinique').setValue(JSON.parse(o.clinique));
				App.get('TVisitData combo#TConclusions').setValue(o.conclusions);
				App.get('TVisitData combo#TTabac').setValue(o.tabac);
				App.get('TVisitData combo#TAlcool').setValue(o.alcool);
				App.get('TVisitData combo#TSport').setValue(o.sport);
				App.get('TVisitData htmleditor#vaccinations').setValue(o.vaccinations);
				if (App.get('TVisitData htmleditor#TPosteActuel').getValue() == "") App.get('TVisitData htmleditor#TPosteActuel').setValue("<b>Risques</b><hr><div><br></div><div><b>Ancienneté</b><hr></div><div><b><br></b></div><div><b>A.T.</b><hr></div>");
			});
		} else App.get('TVisitData htmleditor#TPosteActuel').setValue("<b>Risques</b><hr><div><br></div><div><b>Ancienneté</b><hr></div><div><b><br></b></div><div><b>A.T.</b><hr></div>");
	},
	grid_medic_click: function (me, s) {
		App.view.create('agent.VVisit.formulaire', {
			_id: s.data.id
		}).show();
	},
	Visit_onExit: function (p) {
		p.up('TVisitData').close();
	},
	Visit_recordgen: function (p) {
		var gen_perso = "-";
		var gen_family = "-";
		if (App.get('TVisit htmleditor#data_medic_perso').getValue() != "") gen_perso = App.get('TVisit htmleditor#data_medic_perso').getValue();
		if (App.get('TVisit htmleditor#data_medic_family').getValue() != "") gen_family = App.get('TVisit htmleditor#data_medic_family').getValue();
		var o = {
			kage: App.get('TAgentPanel').agent.Kage,
			gen_perso: gen_perso,
			gen_family: gen_family
		};
		App.DB.post('bpclight://medic_gen', o, function (response) {
			App.notify('Changement enregistré');
		});
	},
	Visit_onShow: function (p) {
		App.DB.get('bpclight://medic_gen?kage=' + p.up('TAgentPanel').agent.Kage, function (response) {
			if (response.data.length > 0) App.get('TVisit htmleditor#data_medic_perso').setValue(response.data[0].gen_perso);
			else App.get('TVisit htmleditor#data_medic_perso').setValue('');
			if (response.data.length > 0) App.get('TVisit htmleditor#data_medic_family').setValue(response.data[0].gen_family);
			else App.get('TVisit htmleditor#data_medic_family').setValue('');
			if (App.get('TVisit htmleditor#data_medic_family').getValue() == "") App.get('TVisit htmleditor#data_medic_family').setValue("<b>Père</b><hr><div><br></div><div><b>Mère</b><hr></div><div><b><br></b></div><div><b>Fratrie</b><hr></div>");
		});
		App.get('TVisit grid#grid_medic').getStore().getProxy().extraParams.kage = p.up('TAgentPanel').agent.Kage;
		App.get('TVisit grid#grid_medic').getStore().load();
	},
	VisitDataOpen: function (p) {
		App.view.create('agent.VVisit.formulaire', {
			_dossier: p.up('window').agent.Kage
		}).show();
	},
	Positions_click: function (p, record, item, index, e, eOpts) {
		App.Agents.getMyPosition(record.data.Keta, function (err, response) {
			// on reset les panels
			App.get(p.up('TAgentPanel'), 'panel#situation_header').hide();
			App.get(p.up('TAgentPanel'), 'panel#situation_cancel_ok').hide();
			App.get(p.up('TAgentPanel'), 'grid#gridPositions').show();
			App.get(p.up('TAgentPanel'), 'panel#mutation_arrivee').hide();
			App.get(p.up('TSituation'), 'panel#CPACFARetraite').hide();
			App.get(p.up('TAgentPanel'), 'textarea#Motif').hide();
			App.get(p.up('TAgentPanel'), 'panel#TPanelI').hide();
			App.get(p.up('TSituation'), 'textfield#Motif').setValue('');

			App.get(p.up('TAgentPanel'), 'combo#position').setValue('');
			App.get(p.up('TAgentPanel'), 'datefield#datEta').setValue('');
			App.get(p.up('TAgentPanel'), 'textarea#Motif').setValue('');
			App.get(p.up('TAgentPanel'), 'combo#MotifCBO').setValue('');
			App.get(p.up('TAgentPanel'), 'combo#TIEtablissement').setValue('');
			App.get(p.up('TAgentPanel'), 'combo#TIDepartement').setValue('');
			App.get(p.up('TAgentPanel'), 'combo#TIService').setValue('');
			App.get(p.up('TAgentPanel'), 'panel#TPanelI').hide();
			App.get(p.up('TAgentPanel'), 'datefield#TDateCFA').setValue('');
			App.get(p.up('TAgentPanel'), 'datefield#TDateCPA').setValue('');
			App.get(p.up('TAgentPanel'), 'datefield#TDateRetraite').setValue('');

			App.get(p.up('TAgentPanel'), 'combo#position').setReadOnly(true);
			App.get(p.up('TAgentPanel'), 'datefield#datEta').setReadOnly(true);
			App.get(p.up('TAgentPanel'), 'textarea#Motif').setReadOnly(true);
			App.get(p.up('TAgentPanel'), 'combo#MotifCBO').setReadOnly(true);
			App.get(p.up('TAgentPanel'), 'combo#TIEtablissement').setReadOnly(true);
			App.get(p.up('TAgentPanel'), 'combo#TIDepartement').setReadOnly(true);
			App.get(p.up('TAgentPanel'), 'combo#TIService').setReadOnly(true);
			App.get(p.up('TAgentPanel'), 'datefield#TDateCFA').setReadOnly(true);
			App.get(p.up('TAgentPanel'), 'datefield#TDateCPA').setReadOnly(true);
			App.get(p.up('TAgentPanel'), 'datefield#TDateRetraite').setReadOnly(true);


			console.log(response);
			var record = response.result.data;
			// Mutation arrivée		
			if ((record[0].Kpst == 1) || (record[0].Kpst == 3)) {
				App.get(p.up('TSituation'), 'panel#mutation_arrivee').show();
				App.get(p.up('TAgentPanel'), 'panel#TPanelI').show();
				if (record[0].Kpst == 1) {
					App.get(p.up('TSituation'), 'combo#MotifCBO').show();
					App.get(p.up('TSituation'), 'combo#MotifCBO').setValue(response.result.data[0].Arrivee * 1);
					App.get(p.up('TSituation'), 'combo#TIEtablissement').setValue(response.result.data[0].Ketsnew);
					App.get(p.up('TSituation'), 'combo#TIDepartement').setValue(response.result.data[0].Kuninew);
					App.get(p.up('TSituation'), 'combo#TIService').setValue(response.result.data[0].Ksubnew);
					App.get(p.up('TSituation'), 'textfield#Motif').hide();
					App.get(p.up('TSituation'), 'panel#situation_separator').show();
				} else {
					App.get(p.up('TSituation'), 'combo#MotifCBO').hide();
					App.get(p.up('TSituation'), 'combo#TIEtablissement').setValue(response.result.data[0].Ketsnew);
					App.get(p.up('TSituation'), 'combo#TIDepartement').setValue(response.result.data[0].Kuninew);
					App.get(p.up('TSituation'), 'combo#TIService').setValue(response.result.data[0].Ksubnew);
					App.get(p.up('TSituation'), 'textfield#Motif').show();
					App.get(p.up('TSituation'), 'textfield#Motif').setValue(response.result.data[0].Arrivee);
					App.get(p.up('TSituation'), 'panel#situation_separator').hide();
				}
			};
			// Mutation départ & absence longue
			if ((record[0].Kpst == 4) || (record[0].Kpst == 5)) {
				App.get(p.up('TSituation'), 'textarea#Motif').show();
				App.get(p.up('TSituation'), 'textarea#Motif').setValue(response.result.data[0].Motif);
			};
			// CPA + CFA + Retraite
			if ((record[0].Kpst == 8) || (record[0].Kpst == 7) || (record[0].Kpst == 14)) {
				App.get(p.up('TSituation'), 'panel#CPACFARetraite').show();
				App.get(p.up('TSituation'), 'datefield#TDateCFA').hide();
				App.get(p.up('TSituation'), 'datefield#TDateCPA').hide();
				App.get(p.up('TSituation'), 'datefield#TDateCFA').setValue(record[0].DatCFA.toDate());
				App.get(p.up('TSituation'), 'datefield#TDateCPA').setValue(record[0].DatCPA.toDate());
				App.get(p.up('TSituation'), 'datefield#TDateRetraite').setValue(record[0].DatRet.toDate());

				if (record[0].Kpst == 8 || record[0].Kpst == 14) App.get(p.up('TSituation'), 'datefield#TDateCFA').show();
				if (record[0].Kpst == 7 || record[0].Kpst == 14) App.get(p.up('TSituation'), 'datefield#TDateCPA').show();
			}

		});
	},
	formation_exit: function (p) {
		p.up('window').close();
	},
	formation_download: function (p, record, item, index, e, eOpts) {
		App.view.create('VShowFormation', {
			title: record.data.Libelle + ' (' + record.data.Session + ')',
			pid: record.data.id_recapitulatif
		}).show();
	},
	formation_upload: function (cmp, e, file) {
		App.get(cmp.up('TFormation'), 'button#ajouter').setDisabled(true);
		App.readFile(file, function (result) {
			App.get(cmp.up('TFormation'), 'textarea#Formation_document').setValue(result);
			App.get(cmp.up('TFormation'), 'button#ajouter').setDisabled(false);
		});
	},
	photo_onload: function (cmp, e, file) {
		App.readFile(file, function (result) {
			App.get(cmp.up('TSidePanel'), 'panel#PanelPhoto').update('<div class=IPhoto><img src="' + result + '" width=100 height=120></img></div>');
			var o = {
				kage: cmp.up('TAgentPanel').agent.Kage,
				trombi: result
			};
			App.Agents.setPhoto(o, function () {
				App.notify('Mise à jour effectuée.');
			});
		});
	},
	ajouter_onclick: function (p) {
		var o = {
			Kage: p.up('TAgentPanel').agent.Kage,
			type_formation: App.get(p.up('TAgentPanel'), 'TFormation combo#cbo1').getValue(),
			Date: App.get(p.up('TAgentPanel'), 'TFormation datefield#date').getValue(),
			upload: App.get(p.up('TAgentPanel'), 'TFormation textarea#Formation_document').getValue()
		};
		console.log(o);
		if (App.get(p.up('TAgentPanel'), 'TFormation radiofield#radiofield1').getValue() === true) o.Session = 'Initiale';
		else o.Session = 'Recyclage';
		App.DB.post('bpclight://recapitulatif', o, function (e, r) {
			console.log(e);
			console.log(r);
			App.get(p.up('TAgentPanel'), 'grid#gridFormation').getStore().load();
		});
	},
	Formation_onContextMenu: function (view, rec, node, index, e) {
		e.stopEvent();
		var x = Ext.create('Ext.menu.Menu', {
			items: [{
				itemId: 'ctx-gridForm-delete',
				text: "Supprimer"
			}]
		});
		x.on('click', function (p) {
			if (p.itemId = "ctx-gridForm-delete") {
				App.Agents.delFormation(rec.data.id_recapitulatif, function (err, response) {
					view.getStore().load();
				});
			}
		});
		x.showAt(e.getXY());
		return false;
	},
	TFormation_onShow: function (p) {
		App.get(p.up('TAgentPanel'), 'grid#gridFormation').getStore().getProxy().extraParams.Kage = p.up('TAgentPanel').agent.Kage;
		App.get(p.up('TAgentPanel'), 'grid#gridFormation').getStore().load();
	},
	situation_record: function (p) {

		var o = {
			Kpst: App.get(p.up('TAgentPanel'), 'textfield#Situation_Kpst').getValue(),
			DatEta: App.get(p.up('TAgentPanel'), 'datefield#datEta').getValue(),
			Kage: p.up('TAgentPanel').agent.Kage
		};

		if ((o.Kpst == 1) || (o.Kpst == 3)) {
			if (o.Kpst == 1)
				o.Arrivee = App.get(p.up('TAgentPanel'), 'combo#MotifCBO').getValue();
			else
				o.Arrivee = App.get(p.up('TAgentPanel'), 'textarea#Motif').getValue();

			o.Ketsnew = App.get(p.up('TAgentPanel'), 'combo#TIEtablissement').getValue();
			o.Kuninew = App.get(p.up('TAgentPanel'), 'combo#TIDepartement').getValue();
			o.Ksubnew = App.get(p.up('TAgentPanel'), 'combo#TIService').getValue();

			o.Ketsex = App.get(p.up('TAgentPanel'), 'combo#TEtablissement').getValue();
			o.Kuniex = App.get(p.up('TAgentPanel'), 'combo#TDepartement').getValue();
			o.Ksubex = App.get(p.up('TAgentPanel'), 'combo#TDepartement').getValue();
		};

		if (o.Kpst == 14) {
			o.DatCPA = App.get(p.up('TAgentPanel'), 'datefield#TDateCPA').getValue();
			o.DatCFA = App.get(p.up('TAgentPanel'), 'datefield#TDateCFA').getValue();
			o.DatRet = App.get(p.up('TAgentPanel'), 'datefield#TDateRetraite').getValue();
		};
		if (o.Kpst == 8) {
			o.DatCFA = App.get(p.up('TAgentPanel'), 'datefield#TDateCFA').getValue();
			o.DatRet = App.get(p.up('TAgentPanel'), 'datefield#TDateRetraite').getValue();
		};
		if (o.Kpst == 7) {
			o.DatCPA = App.get(p.up('TAgentPanel'), 'datefield#TDateCPA').getValue();
			o.DatRet = App.get(p.up('TAgentPanel'), 'datefield#TDateRetraite').getValue();
		};
		o.Motif = App.get(p.up('TAgentPanel'), 'textarea#Motif').getValue();

		App.Agents.saveSituation(o, function (err, response) {
			App.get(p.up('TAgentPanel'), 'panel#situation_header').hide();
			App.get(p.up('TAgentPanel'), 'panel#situation_cancel_ok').hide();
			App.get(p.up('TAgentPanel'), 'grid#gridPositions').show();
			App.get(p.up('TAgentPanel'), 'panel#mutation_arrivee').hide();
			App.get(p.up('TSituation'), 'panel#CPACFARetraite').hide();
			App.get(p.up('TAgentPanel'), 'textarea#Motif').hide();
			App.get(p.up('TAgentPanel'), 'grid#gridPositions').getStore().load();
		});

	},
	situation_add: function (p) {
		App.get(p.up('TAgentPanel'), 'combo#position').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'datefield#datEta').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'textarea#Motif').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'combo#MotifCBO').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'combo#TIEtablissement').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'combo#TIDepartement').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'combo#TIService').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'datefield#TDateCFA').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'datefield#TDateCPA').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'datefield#TDateRetraite').setReadOnly(false);
		App.get(p.up('TAgentPanel'), 'panel#mutation_arrivee').hide();
		App.get(p.up('TAgentPanel'), 'combo#position').setValue('');
		App.get(p.up('TAgentPanel'), 'datefield#datEta').setValue('');
		App.get(p.up('TAgentPanel'), 'panel#situation_header').show();
		App.get(p.up('TAgentPanel'), 'textarea#Motif').setValue('');
		App.get(p.up('TAgentPanel'), 'combo#MotifCBO').setValue('');
		App.get(p.up('TAgentPanel'), 'combo#TIEtablissement').setValue('');
		App.get(p.up('TAgentPanel'), 'combo#TIDepartement').setValue('');
		App.get(p.up('TAgentPanel'), 'combo#TIService').setValue('');
		App.get(p.up('TAgentPanel'), 'panel#TPanelI').hide();
		App.get(p.up('TAgentPanel'), 'datefield#TDateCFA').setValue('');
		App.get(p.up('TAgentPanel'), 'datefield#TDateCPA').setValue('');
		App.get(p.up('TAgentPanel'), 'datefield#TDateRetraite').setValue('');
		App.get(p.up('TAgentPanel'), 'grid#gridPositions').hide();
		App.get(p.up('TAgentPanel'), 'textarea#Motif').hide();
	},
	situation_cancel_onclick: function (p) {
		App.get(p.up('TSituation'), 'panel#situation_header').hide();
		App.get(p.up('TSituation'), 'panel#situation_cancel_ok').hide();
		App.get(p.up('TSituation'), 'grid#gridPositions').show();
		App.get(p.up('TSituation'), 'panel#mutation_arrivee').hide();
		App.get(p.up('TSituation'), 'panel#TPanelI').hide();
		App.get(p.up('TSituation'), 'panel#CPACFARetraite').hide();
	},
	position_onchange: function (p, record) {
		record = [record];
		this.situation_cancel_onclick(p);
		App.get(p.up('TSituation'), 'grid#gridPositions').hide();
		App.get(p.up('TSituation'), 'panel#situation_header').show();
		App.get(p.up('TSituation'), 'panel#situation_cancel_ok').show();
		App.get(p.up('TSituation'), 'textarea#Motif').hide();
		App.get(p.up('TSituation'), 'panel#CPACFARetraite').hide();
		App.get(p.up('TSituation'), 'textfield#Situation_Kpst').setValue(record[0].data.Kpst);
		// Mutation arrivée		
		if ((record[0].data.Kpst == 1) || (record[0].data.Kpst == 3)) {
			App.get(p.up('TSituation'), 'panel#mutation_arrivee').show();
			App.get(p.up('TSituation'), 'panel#TPanelI').show();
			if (record[0].data.Kpst == 1) {
				App.get(p.up('TSituation'), 'combo#MotifCBO').show();
				App.get(p.up('TSituation'), 'textfield#Motif').hide();
				App.get(p.up('TSituation'), 'panel#situation_separator').show();
			} else {
				App.get(p.up('TSituation'), 'combo#MotifCBO').hide();
				App.get(p.up('TSituation'), 'textfield#Motif').show();
				App.get(p.up('TSituation'), 'panel#situation_separator').hide();
			}
		};
		// Mutation départ & absence longue
		if ((record[0].data.Kpst == 4) || (record[0].data.Kpst == 5)) {
			App.get(p.up('TSituation'), 'textarea#Motif').show();
		};
		// CPA + CFA + Retraite
		if ((record[0].data.Kpst == 8) || (record[0].data.Kpst == 7) || (record[0].data.Kpst == 14)) {
			App.get(p.up('TSituation'), 'panel#CPACFARetraite').show();
			App.get(p.up('TSituation'), 'datefield#TDateCFA').hide();
			App.get(p.up('TSituation'), 'datefield#TDateCPA').hide();
			if (record[0].data.Kpst == 8 || record[0].data.Kpst == 14) App.get(p.up('TSituation'), 'datefield#TDateCFA').show();
			if (record[0].data.Kpst == 7 || record[0].data.Kpst == 14) App.get(p.up('TSituation'), 'datefield#TDateCPA').show();
		}
	},
	VilleCBO_onclick: function (p, record) {
		record = [record];
		p.hide();
		App.get(p.up('TAgentPanel'), 'textfield#CodePostal').setValue(p.getValue());
		App.get(p.up('TAgentPanel'), 'textfield#Ville').show();
		App.get(p.up('TAgentPanel'), 'textfield#Ville').setValue(p.getRawValue().split(' (')[0]);
		App.get(p.up('TAgentPanel'), 'textfield#AdrCode').setValue(record[0].data.Id);
	},
	TCodePostal_onchange: function (p) {
		App.get(p.up('TAgentPanel'), 'combo#VilleCBO').getStore().getProxy().extraParams.Code = p.getValue();
		App.get(p.up('TAgentPanel'), 'combo#VilleCBO').getStore().load();
		App.get(p.up('TAgentPanel'), 'combo#VilleCBO').getStore().on('load', function (s) {
			if (s.data.items.length == 1) {
				App.get(p.up('TAgentPanel'), 'combo#VilleCBO').hide();
				App.get(p.up('TAgentPanel'), 'textfield#AdrCode').setValue(s.data.items[0].data.Id);
				App.get(p.up('TAgentPanel'), 'textfield#Ville').setValue(s.data.items[0].data.Ville.split(' (')[0]);
				App.get(p.up('TAgentPanel'), 'textfield#CodePostal').setValue(s.data.items[0].data.Ville.split(' (')[1].split(')')[0]);
				App.get(p.up('TAgentPanel'), 'textfield#Ville').show();
			} else {
				App.get(p.up('TAgentPanel'), 'combo#VilleCBO').show();
				App.get(p.up('TAgentPanel'), 'textfield#Ville').hide();
			};
		});
	},
	TMelA_onclick: function (cmp) {
		cmp.getEl().on('click', function () {
			if (cmp.getValue() == "") {
				var suffix = "@cerema.fr";
				var nom = cmp.up('TAgentPanel').agent.Nom.latinize().toLowerCase();
				var prenom = cmp.up('TAgentPanel').agent.Prenom.latinize().toLowerCase();
				cmp.setValue(prenom + '.' + nom + suffix);
			}
		});
	},
	TCodePostal_onclick: function (cmp) {
		cmp.getEl().on('click', function () {
			cmp.setValue('');
			App.get(cmp.up('TAgentPanel'), 'textfield#Ville').hide(true);
			App.get(cmp.up('TAgentPanel'), 'combo#VilleCBO').show();
		});
	},
	record_onclick: function (p) {
		var o = {
			Kage: p.up('TAgentPanel').agent.Kage,
			INSEE: App.get(p.up('TAgentPanel'), 'textfield#TInsee').getValue() + ' ' + App.get(p.up('TAgentPanel'), 'textfield#TInseeKey').getValue(),
			REHUCIT: App.get(p.up('TAgentPanel'), 'textfield#TRehucit').getValue(),
			Nom: App.get(p.up('TAgentPanel'), 'textfield#LAgentNom').getValue(),
			Prenom: App.get(p.up('TAgentPanel'), 'textfield#LAgentPrenom').getValue(),
			Matri: App.get(p.up('TAgentPanel'), 'textfield#LAgentMatri').getValue(),
			Kuni: App.get(p.up('TAgentPanel'), 'combo#TDepartement').getValue(),
			Ksub: App.get(p.up('TAgentPanel'), 'combo#TService').getValue(),
			libelle_poste: App.get(p.up('TAgentPanel'), 'htmleditor#metier').getValue(),
			Telephone: App.get(p.up('TAgentPanel'), 'textfield#Phone').getValue(),
			Portable: App.get(p.up('TAgentPanel'), 'textfield#Cell').getValue(),
			DatNai: App.get(p.up('TAgentPanel'), 'datefield#DatNai').getValue(),
			DepNai: App.get(p.up('TAgentPanel'), 'textfield#DeptNai').getValue(),
			VilNai: App.get(p.up('TAgentPanel'), 'textfield#VilleNai').getValue(),
			PaysNai: App.get(p.up('TAgentPanel'), 'textfield#PaysNai').getValue(),
			Kgra: App.get(p.up('TAgentPanel'), 'combo#TGrade').getValue(),
			Kbat: App.get(p.up('TAgentPanel'), 'combo#batiment').getValue(),
			Ksec: App.get(p.up('TAgentPanel'), 'combo#Sec1').getValue(),
			Ksec2: App.get(p.up('TAgentPanel'), 'combo#Sec2').getValue(),
			_BLOB: App.get(p.up('TAgentPanel'), 'uploadpanel#up').getFiles()
		};
		App.Agents.updateMe(o, function (err, response) {
			var o = {
				Kage: p.up('TAgentPanel').agent.Kage,
				Kadr: App.get(p.up('TAgentPanel'), 'textfield#AdrK').getValue(),
				Kpos: App.get(p.up('TAgentPanel'), 'textfield#AdrCode').getValue(),
				Adresse: App.get(p.up('TAgentPanel'), 'textarea#Adresse').getValue()
			};
			App.Agents.setAdresse(o, function (err, response) {
				App.get('TPrincipal grid#GridAgents').getStore().load();
				App.DB.get('bpclight://mela{kmela}?kage=' + p.up('TAgentPanel').agent.Kage, function (r) {
					if (r.length > 0) {
						var obj = [{
							Kmela: r.data[0].kmela,
							LibMelA: App.get(p.up('TAgentPanel'), 'textfield#TMelA').getValue()
						}];
					} else {
						var obj = [{
							Kage: p.up('TAgentPanel').agent.Kage,
							LibMelA: App.get(p.up('TAgentPanel'), 'textfield#TMelA').getValue()
						}];
					};
					App.DB.post('bpclight://mela', obj, function (err, response) {
						p.up('window').close();
					});

				});
			});
		});
	},
	Menu_onclick: function (p) {
		if (p.itemId) {

		};
	},
	Positions_onContextMenu: function (view, rec, node, index, e) {
		e.stopEvent();
		var x = Ext.create('Ext.menu.Menu', {
			items: [{
				itemId: 'ctx-gridpos-delete',
				text: "Supprimer"
			}]
		});
		x.on('click', function (p) {
			if (p.itemId = "ctx-gridpos-delete") {
				App.Agents.delPosition(rec.data.Keta, function (err, response) {
					view.getStore().load();
				});
			}
		});
		x.showAt(e.getXY());
		return false;
	},
	Roles_onContextMenu: function (view, rec, node, index, e) {
		e.stopEvent();
		console.log(view);
		var x = Ext.create('Ext.menu.Menu', {
			items: [{
				itemId: 'ctx-grid-delete',
				text: "Supprimer"
			}]
		});
		x.on('click', function (p) {
			if (p.itemId = "ctx-grid-delete") {
				var notpossible = [86, 22, 9];
				if (notpossible.indexOf(rec.data.CodRol) > -1) return alert('Vous ne pouvez pas supprimer ce rôle. Utiliser la fonction Hiérarchie.');
				App.Agents.delRole(rec.data.CodRol, rec.data.Kage, function (err, response) {
					view.getStore().load();
				});
			}
		});
		x.showAt(e.getXY());
		return false;
	},
	RoleAdd_click: function (p) {
		p.setDisabled(true);
		var o = {
			Kage: p.up('TAgentPanel').agent.Kage,
			Krol: App.get(p.up('TAgentPanel'), 'combo#cboRoles').getValue()
		};
		// exists already ?
		var tb = [];
		for (var i = 0; i < App.get(p.up('TAgentPanel'), 'grid#roles').getStore().data.items.length; i++) {
			tb.push(App.get(p.up('TAgentPanel'), 'grid#roles').getStore().data.items[i].data.CodRol);
		};
		if (tb.indexOf(o.krol) > -1) {
			Ext.MessageBox.alert('BPCLight', 'Ce rôle est déjà renseigné.');
			p.setDisabled(false);
		} else {
			App.Agents.addRole(o, function (response) {
				App.get(p.up('TAgentPanel'), 'grid#roles').getStore().load();
				p.setDisabled(false);
			});
		}
	},
	TSituation_onshow: function (p) {
		App.get(p.up('TAgentPanel'), 'grid#gridPositions').getStore().getProxy().extraParams.kage = p.up('TAgentPanel').agent.Kage;
		App.get(p.up('TAgentPanel'), 'grid#gridPositions').getStore().load();
		App.Agents.getPosition(p.up('TAgentPanel').agent.Kage, function (response) {
			if (response.length == 0)
				App.get(p.up('TAgentPanel'), 'panel#maposition').update('<div style="padding:4px"><b>---</b></div>');
			else
				App.get(p.up('TAgentPanel'), 'panel#maposition').update('<div style="padding:4px"><b>' + response[0].Position + '</b></div>');
		});
		App.get(p.up('TAgentPanel'), "grid#situadm").getStore().getProxy().extraParams.kage = p.up('TAgentPanel').agent.Kage;
		App.get(p.up('TAgentPanel'), "grid#situadm").getStore().load();
		// On interroge la base temptation

		var store = App.store.create("App.Temptation.quotite");
		store.getProxy().extraParams.matri = p.up('TAgentPanel').agent.Matri;
		App.get(p.up('window'), 'panel#histoQ').bindStore(store);
		store.load();
	},
	close_agent: function (p) {
		p.up('window').close();
	},
	TAgentPanel_onshow: function (p) {

		if (Auth.User.profiles.indexOf('MEDECIN') > -1) App.get('TAgentPanel tabpanel#tabs').getTabBar().items.get(3).show();
		else App.get('TAgentPanel tabpanel#tabs').getTabBar().items.get(3).hide();
		if (Auth.User.profiles.indexOf('SRH') > -1) App.get('TAgentPanel tabpanel#tabs').getTabBar().items.get(4).show();
		else App.get('TAgentPanel tabpanel#tabs').getTabBar().items.get(4).hide();

		if (Auth.User.profiles.indexOf('SII') > -1) App.get('TAgentPanel tabpanel#tabs').getTabBar().items.get(6).show();
		else App.get('TAgentPanel tabpanel#tabs').getTabBar().items.get(6).hide();

		var _p = this;
		if (p.agent == -1) {
			p.INSERT = true;
			return;
		};
		p.setTitle(p.agent.Prenom + " " + p.agent.Nom);
		App.Agents.getPhoto(p.agent.Kage, function (o) {
			if (o.length > 0) App.get(p, 'TSidePanel panel#PanelPhoto').update('<div class=IPhoto><img src="' + o[0].trombi + '" width=120 height=160></img></div>');
		});
		App.get(p, 'TSidePanel textfield#LAgentNom').setValue(p.agent.Nom);
		App.get(p, 'TSidePanel textfield#LAgentPrenom').setValue(p.agent.Prenom);
		App.get(p, 'TSidePanel textfield#LAgentMatri').setValue(p.agent.Matri);
		try {
			App.get(p, 'TSidePanel textfield#TInsee').setValue(p.agent.INSEE.split(' ')[0]);
			App.get(p, 'TSidePanel textfield#TInseeKey').setValue(p.agent.INSEE.split(' ')[1]);
		} catch (ex) {
			App.get(p, 'TSidePanel textfield#TInsee').setValue('');
			App.get(p, 'TSidePanel textfield#TInseeKey').setValue('');
		};
		App.get(p, 'TSidePanel textfield#TRehucit').setValue(p.agent.REHUCIT);
		App.get(p, 'TSidePanel combo#TDepartement').setValue(p.agent.Kuni);
		App.Etablissements.getByUnite(p.agent.Kuni, function (err, r) {
			App.get(p, 'TSidePanel combo#TEtablissement').setValue(r.result.data[0].kets);
		});
		App.get(p, 'TSidePanel combo#TService').setValue(p.agent.Ksub);
		App.get(p, 'htmleditor#metier').setValue(p.agent.libelle_poste);
		App.get(p, 'grid#roles').getStore().getProxy().extraParams.kage = p.agent.Kage;
		App.get(p, 'grid#roles').getStore().load();
		App.get(p, 'TAgent datefield#DatNai').setValue(new Date(p.agent.DatNai));
		App.get(p, 'TAgent textfield#DeptNai').setValue(p.agent.DepNai);
		App.get(p, 'TAgent textfield#VilleNai').setValue(p.agent.VilNai);
		App.get(p, 'TAgent textfield#PaysNai').setValue(p.agent.PaysNai);
		App.get(p, 'TAgent textfield#Phone').setValue(p.agent.Telephone);
		App.get(p, 'TAgent textfield#Cell').setValue(p.agent.Portable);

		//console.log(p.agent);

		if (p.agent._BLOB == "") p.agent._BLOB = "[]";
		if (!p.agent._BLOB) p.agent._BLOB = "[]";
		App.get('TAgentPanel uploadpanel#up').setFiles(JSON.parse(p.agent._BLOB));

		// App.Agents.getAdresse
		App.Agents.getAdresse(p.agent.Kage, function (response, x) {
			if (response) {
				App.get(p, 'TAgent textfield#AdrK').setValue(response.kadr);
				App.get(p, 'TAgent textfield#AdrCode').setValue(response.id);
				App.get(p, 'TAgent textarea#Adresse').setValue(response.adresse);
				App.get(p, 'TAgent textfield#CodePostal').setValue(response.cpostal);
				App.get(p, 'TAgent textfield#Ville').setValue(response.ville);
			};
		});
		App.get(p, 'TAgent combo#batiment').setValue(p.agent.Kbat);
		// App.Agents.getCategory
		App.Agents.getCategory(p.agent.Kgra, function (response, x) {
			App.get(p, 'TAgent combo#TCat').setValue(response.data[0].Kcgr);
			var TGrade = App.get(p, 'TAgent combo#TGrade').getStore();
			TGrade.getProxy().extraParams.catgrad = response.data[0].Kcgr;
			TGrade.load();
			TGrade.on('load', function () {
				App.get(p, 'TAgent combo#TGrade').setValue(p.agent.Kgra);
			});
		});
		App.Agents.getMail(p.agent.Kage, function (response, x) {
			if (response.data.length > 0) App.get(p, 'TAgent textfield#TMelA').setValue(response.data[0].LibMelA);
		});
		App.Agents.getHierarchie(p.agent.Kage, function (err, response) {
			if (!response.result.chef) response.result.chef = "";
			if (!response.result.adjoint) response.result.adjoint = "";
			App.get(p, 'TAgent panel#Hierarchie').update("<br>Chef de service<br><b>" + response.result.chef + "</b><br><br>Adjoint<br><b>" + response.result.adjoint + "</b>");
		});
		App.get(p, 'combo#Sec1').getStore().on('load', function () {
			App.get(p, 'TAgent combo#Sec1').setValue(p.agent.Ksec);
			App.get(p, 'TAgent combo#Sec2').setValue(p.agent.Ksec2);
		});
	},
	TCat_onchange: function (p, record) {
		record = [record];
		App.get(p.up('window'), 'combo#TGrade').setValue('');
		var cbo = App.get(p.up('window'), 'combo#TGrade');
		cbo.getStore().getProxy().extraParams.catgrad = record[0].data.Kcgr;
		cbo.getStore().load();
	},
	TEtablissement_onchange: function (p, record) {
		App.get(p.up('window'), 'combo#TDepartement').setValue('');
		App.get(p.up('window'), 'combo#TService').setValue('');
		var cbo = App.get(p.up('window'), 'combo#TDepartement');
		cbo.getStore().getProxy().extraParams.kets = record[0].data.Kets;
		cbo.getStore().load();
	},
	TDepartement_onchange: function (p, record) {
		App.get(p.up('window'), 'combo#TService').setValue('');
		var cbo = App.get(p.up('window'), 'combo#TService');
		cbo.getStore().getProxy().extraParams.kuni = record[0].data.Kuni;
		cbo.getStore().load();
	},
	TIEtablissement_onchange: function (p, record) {
		record = [record];
		App.get(p.up('window'), 'combo#TIDepartement').setValue('');
		App.get(p.up('window'), 'combo#TIService').setValue('');
		var cbo = App.get(p.up('window'), 'combo#TIDepartement');
		cbo.getStore().getProxy().extraParams.kets = record[0].data.Kets;
		cbo.getStore().load();
	},
	TIDepartement_onchange: function (p, record) {
		record = [record];
		App.get(p.up('window'), 'combo#TIService').setValue('');
		var cbo = App.get(p.up('window'), 'combo#TIService');
		cbo.getStore().getProxy().extraParams.kuni = record[0].data.Kuni;
		cbo.getStore().load();
	},
	TCACat_onchange: function (p, record) {
		App.get(p.up('panel'), 'combo#TCAGrade').setValue('');
		var cbo = App.get(p.up('panel'), 'combo#TCAGrade');
		cbo.getStore().getProxy().extraParams.catgrad = record;
		cbo.getStore().load();
	},
	TCAEtablissement_onchange: function (p, record) {
		App.get(p.up('window'), 'combo#TCADepartement').setValue('');
		App.get(p.up('window'), 'combo#TCAService').setValue('');
		var cbo = App.get(p.up('window'), 'combo#TCADepartement');
		cbo.getStore().getProxy().extraParams.kets = record[0].data.Kets;
		cbo.getStore().load();
	},
	TCADepartement_onchange: function (p, record) {
		App.get(p.up('window'), 'combo#TCAService').setValue('');
		var cbo = App.get(p.up('window'), 'combo#TCAService');
		cbo.getStore().getProxy().extraParams.kuni = record[0].data.Kuni;
		cbo.getStore().load();
	}

});