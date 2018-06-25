App.view.define('VCreateAgent', {

    extend: 'Ext.window.Window',
	alias: "widget.createAgent",

initComponent: function()
	{
		this.title="Situation";
		this.layout="vbox";
		this.border=false;
		this.width = 430;
        this.height = 630;
        this.title = "Nouvel agent";
		this.bodyStyle="background-color: white";
        this.bbar = [
            '->', {
                text: 'Enregistrer',
				itemId: "Record"
            }, {
                text: 'Quitter',
				itemId: "Exit"
            }
        ];	
		this.items = [
			{
				html: '<div style="font-weight: bold;padding:5px">1. Typologie du nouvel agent</div>',
				border: false,
				height: 40,
				width: "100%",
				padding: 5
			},
			{
				xtype: "radiogroup",
				itemId: "rdiona",
				vertical: true,
				columns: 1,
				height: 80,
				padding: 0,
				margin: {
					left: 40
				},
				width: "100%",
				items: [
					{boxLabel: 'Stagiaire', name: 'rb', inputValue: '1', checked: true},
					{boxLabel: 'Vacataire', name: 'rb', inputValue: '2'},
					{boxLabel: 'Titulaire', name: 'rb', inputValue: '3'}
				]
			},
			{
				html: '<div style="font-weight: bold;margin-top:10px;padding:5px">2. Renseignements</div>',
				border: false,
				height: 40,
				width: "100%",
				padding: 5
			},
			{
				layout: "hbox",
				border: false,
				width: 360,
				padding: 5,
				margin: {
					left: 35
				},				
				items: [
				{
					xtype: "textfield",
					fieldLabel: "Nom",
					itemId: "TCANom",
					labelAlign: "top",						
					flex: 1
				},
				{
					xtype: "textfield",
					fieldLabel: "Prénom",
					itemId: "TCAPrenom",
					labelAlign: "top",
					margin: {
						left: 5
					},
					flex: 1
				}				
				]
			},
			{
				layout: "hbox",
				border: false,
				width: 360,
				padding: 4,
				margin: {
					left: 32
				},				
				items: [
				{
					xtype: "combo",
					fieldLabel: "Etablissement",
					labelAlign: "top",
					itemId: "TCAEtablissement",
					editable: false,
					padding: 5,
					store: App.store.create('App.Etablissements.getAll'),
					displayField: "LibEtsC",
					valueField: "Kets",				
					width: 100
				},
				{
					layout: "vbox",
					border: false,
					flex: 1,
					margin: {
						top: 5
					},
					items: [
						{
							xtype: "combo",
							fieldLabel: "Département",
							itemId: "TCADepartement",
							labelAlign: "top",
							editable: false,
							padding: 5,
							store: App.store.create('App.Departements.getAll'),	
							displayField: "LibUnic",
							valueField: "Kuni",				
							margin: {
								left: 10
							},
							width: 230
						},
						{
							xtype: "combo",
							fieldLabel: "Service",
							labelAlign: "top",
							itemId: "TCAService",
							store: App.store.create('App.Services.getAll'),
							displayField: "LibSubC",
							valueField: "Ksub",				
							editable: false,				
							padding: 5,
							margin: {
								left: 10
							},
							width: 230
						}					
					]
				}				
				]
			},
			{
				layout: "vbox",
				border: false,
				itemId: "TCaGRA",
				hidden: true,
				items: [
					{
						xtype: "combo",
						fieldLabel: "Catégorie",
						labelAlign: "top",
						itemId: "TCACadGrad",
						store: App.store.create('App.Categories.getAllButOther'),
						editable: false,
						displayField: "LibCgr",
						valueField: "Kcgr",
						margin: {
							top: 10,
							left: 40
						},
						width: 120
					},
					{
						xtype: "combo",
						fieldLabel: "Grades",
						labelAlign: "top",
						itemId: "TCAGrade",
						displayField: "LibGra",
						valueField: "Kgra",
						editable: false,
						store: App.store.create('App.Categories.getGrades'),
						margin: {
							top: 10,
							left: 40
						},
						width: 350
					}				
				]
			}
		];
		this.callParent();
	}	
	
});