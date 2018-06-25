App.view.define('VMedicRDV',{
	extend: "Ext.window.Window",
	alias: "widget.vmedicwindow",
    width : 630,
    height : 250,
	itemId: "RDV",
    layout : 'vbox',
	title: "Rendez vous",
	bodyStyle:{"background-color":"white"}, 
	initComponent : function() {
		var _p=this;
		this.bbar = [
			'->',
			{
				xtype: "button",
				text: "OK",
				handler: function(me)
				{
					var request={
						kage: me.up('window').dta.kage,
						nature: App.get('combo#EdVMNature').getValue(),
						StartDate: App.get('datetimefield#EdVMDate').getValue(),
						NextDate: App.get('datetimefield#EdVMNextDate').getValue(),
						resultat: App.get('combo#EdVMResultats').getValue(),
						commentaires: App.get('textarea#EdVMCommentaires').getValue()
					};
					if (me.up('window').dta.rdv_id) request.rdv_id=me.up('window').dta.rdv_id;
					console.log(request);
					App.DB.post('bpclight://medic_rdv',request,function(r){
						App.get('TRendezVous grid').getStore().load();
						me.up('window').close();
					})
				}
			},{
				xtype: "button",
				text: "Annuler",
				handler: function(me)
				{
					me.up('window').close();
				}
			}
		];
		this.items = [
		{
				layout: 'hbox',
				border: false,
				width: "100%",
				items: [
					{
						xtype: 'combo',
						itemId:'EdVMNature',
						fieldLabel: 'Nature de la visite',
						flex: 1,
						labelAlign: 'top',
						padding: 5,
						store: App.store.create("bpclight://vm_natures",{autoLoad:true}),
						editable: false,						
						displayField: 'nature',
						valueField: 'kvm_natures'
					},{
						xtype: 'datetimefield',
						itemId:'EdVMDate',
						width: 140,
						fieldLabel: 'Date RDV',
						renderer:Ext.util.Format.dateRenderer('d/m/Y'),
						labelAlign:'top',
						padding:5						
					},{
						xtype: 'combo',
						fieldLabel: 'Résultats',
						itemId:'EdVMResultats',
						flex: 1,
						labelAlign:'top',
						editable: false,
						padding:5,
						flex: 1,
						store: App.store.create("bpclight://vm_resultats",{autoLoad:true}),
						displayField:'resultat',
						valueField:'kvm_resultats'						
					},{
						xtype: 'datetimefield',
						itemId:'EdVMNextDate',
						width: 140,
						fieldLabel: 'Prochain RDV',
						renderer:Ext.util.Format.dateRenderer('d/m/Y'),
						labelAlign:'top',
						padding:5						
					}
				]
		},{
				xtype: 'textarea',
				fieldLabel: 'Commentaires',
				itemId: 'EdVMCommentaires',
				labelAlign:'top',
				padding: 5,
				flex: 1,
				width: "100%"
		}];
		this.callParent();
	}
});