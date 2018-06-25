App.view.define('agent.VVisit', {
	alias: "widget.TVisit",
	extend: "Ext.Panel",
	initComponent: function()
	{
		this.title="Dossier médical";
		this.layout="vbox";
		this.border=false;
		this.items = [
		{
			xtype: "htmleditor",
			itemId: "data_medic_perso",
			width: "100%",
			fieldLabel: "Antécédents personnels",
			labelAlign: "top",
			height: 150,
			padding: 10
		},
		{
			xtype: "htmleditor",
			itemId: "data_medic_family",
			width: "100%",
			fieldLabel: "Antécédents familiaux",
			labelAlign: "top",
			height: 150,
			padding: 10
		},
		{
			layout: "hbox",
			width: "100%",
			padding: 10,
			border: false,
			items: [
				{
					flex: 1,
					border: false
				},
				{
					xtype: "button",
					itemId: "btn_record",
					text: "Mettre à jour",
					width: 100
				}
			]
		},
		{
			padding: 10,
			html: "Visites médicales",
			border: false
		},
		{
			xtype: "grid",
			itemId: "grid_medic",
			width: "100%",
			height: 145,
			padding: 10,
			flex: 1,
			tbar: [
				{
					text: "Nouveau",
					iconCls: "ico_new",
					itemId: "medic_new"
				},
				{
					text: "Imprimer",
					iconCls: "printer",
					handler: function(me) {
						me.setDisabled(true);
						var grid= App.get(me.up('window'),'grid#grid_medic');
						var sel=grid.getSelectionModel().getSelected();
						if (sel.items.length==0) {
							alert('Veuillez sélectionner une fiche.');
							me.setDisabled(false);
							return;	
						};
						App.Medical.printme({kid:sel.items[0].data.id},function(url){
							me.setDisabled(false);
							var win = window.open(url, '_blank');
							win.focus();
						});
					}
				}
			],
			columns: [
				{
					text: "Date",
					dataIndex: "date",
					renderer: Ext.util.Format.dateRenderer('d/m/Y')
				},
				{
					text: "Type",
					dataIndex: "type",
					flex: 1
				},
				{
					text: "Catégorie",
					dataIndex: "cat"
				}
			],
			store: App.store.create("bpclight://medic_dossiers{id,date-,type->medic_type{type},cat->medic_cat{cat}}")
		}
		];
		this.callParent();
	}
});