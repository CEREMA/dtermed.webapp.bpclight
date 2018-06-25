App.view.define('agent.VAgent', {
	extend: "Ext.Panel",
	alias: 'widget.TAgent',
	initComponent: function () {
		this.title = "Agent";
		this.border = false;
		this.layout = "hbox";
		this.items = [{
			flex: 1,
			margin: 10,
			border: false,
			layout: "vbox",
			items: [{
					layout: "hbox",
					border: false,
					width: "100%",
					items: [{
							xtype: "datefield",
							itemId: "DatNai",
							labelAlign: "top",
							width: 100,
							format: 'd/m/Y',
							fieldLabel: 'Date naissance',
							padding: {
								right: 5
							}
						},
						{
							xtype: "textfield",
							itemId: "DeptNai",
							labelAlign: "top",
							fieldLabel: 'Dept',
							width: 30,
							padding: {
								right: 5
							}
						},
						{
							xtype: "textfield",
							itemId: "VilleNai",
							labelAlign: "top",
							fieldLabel: 'Ville',
							flex: 1
						}
					]
				}, {
					layout: "hbox",
					border: false,
					width: "100%",
					items: [{
							width: 100,
							border: false,
							padding: {
								right: 5
							}
						},
						{
							width: 40,
							border: false,
							padding: {
								right: 5
							}
						},
						{
							xtype: "textfield",
							itemId: "PaysNai",
							labelAlign: "top",
							flex: 1,
							fieldLabel: 'Pays'
						}
					]
				},
				{
					xtype: "textarea",
					height: 80,
					width: "100%",
					labelAlign: "top",
					itemId: "Adresse",
					fieldLabel: 'Adresse :',
					padding: {
						top: 10
					}
				},
				{
					xtype: "textfield",
					width: "100%",
					itemId: "AdrCode",
					padding: {
						top: 10
					},
					hidden: true
				},
				{
					xtype: "textfield",
					width: "100%",
					itemId: "AdrK",
					padding: {
						top: 10
					},
					hidden: true
				},
				{
					layout: "hbox",
					border: false,
					width: "100%",
					items: [{
							xtype: "textfield",
							labelAlign: "top",
							itemId: "CodePostal",
							enableKeyEvents: true,
							fieldLabel: 'Code postal :',
							padding: {
								right: 10
							},
							width: 150
						},
						{
							xtype: "textfield",
							itemId: "Ville",
							labelAlign: "top",
							fieldLabel: 'Ville :',
							flex: 1,
							readOnly: true
						},
						{
							xtype: "combo",
							editable: false,
							itemId: "VilleCBO",
							labelAlign: "top",
							fieldLabel: 'Ville :',
							hidden: true,
							flex: 1,
							store: App.store.create('App.Utils.getVille'),
							displayField: "Ville",
							valueField: "Code"
						}
					]
				},
				{
					layout: "hbox",
					border: false,
					width: "100%",
					items: [{
							xtype: "combo",
							editable: false,
							labelAlign: "top",
							fieldLabel: 'Catégorie',
							itemId: "TCat",
							store: App.store.create('App.Categories.getAll', {
								autoLoad: true
							}),
							displayField: "LibCgr",
							valueField: "Kcgr",
							padding: {
								top: 20,
								right: 10
							},
							width: 150
						},
						{
							xtype: "combo",
							editable: false,
							labelAlign: "top",
							fieldLabel: 'Grade',
							itemId: "TGrade",
							displayField: "LibGra",
							valueField: "Kgra",
							store: App.store.create('App.Categories.getGrades'),
							padding: {
								top: 20
							},
							flex: 1
						}
					]
				},
				{
					layout: "hbox",
					border: false,
					width: "100%",
					items: [{
							xtype: "combo",
							editable: false,
							labelAlign: "top",
							fieldLabel: "Bâtiment :",
							itemId: "batiment",
							padding: {
								top: 20,
								right: 10
							},
							store: App.store.create('App.Batiments.getAll', {
								autoLoad: true
							}),
							displayField: "LibBatC",
							valueField: "Kbat",
							width: 150
						},
						{
							xtype: "textfield",
							labelAlign: "top",
							itemId: "Phone",
							fieldLabel: "Téléphone :",
							padding: {
								top: 20,
								right: 10
							},
							width: 102
						},
						{
							xtype: "textfield",
							labelAlign: "top",
							itemId: "Cell",
							fieldLabel: "Portable  :",
							padding: {
								top: 20,
								right: 10
							},
							flex: 1
						}
					]
				},
				{
					layout: "hbox",
					border: false,
					height: 120,
					width: "100%",
					items: [{
							xtype: "panel",
							border: false,
							itemId: "Hierarchie",
							html: "<br>Chef de service<br><b>...</b><br><br>Adjoint<br><b>...</b>",
							padding: {
								left: -4,
								top: 25,
								right: 10
							},
							width: 150,
							height: 200
						},
						{
							layout: "vbox",
							height: 200,
							flex: 1,
							border: false,
							padding: 10,
							items: [{
									xtype: "textfield",
									width: "100%",
									itemId: "TMelA",
									labelAlign: "top",
									fieldLabel: "Mél CEREMA"
								},
								{
									xtype: "combo",
									editable: false,
									width: "100%",
									labelAlign: "top",
									fieldLabel: "Secrétaire",
									itemId: "Sec1",
									store: App.store.create('App.Agents.getSecretaires', {
										autoLoad: true
									}),
									displayField: "nomprenom",
									valueField: "kage"
								},
								{
									xtype: "combo",
									editable: false,
									width: "100%",
									labelAlign: "top",
									fieldLabel: "Secrétaire (2)",
									hidden: true,
									itemId: "Sec2",
									store: App.store.create('App.Agents.getSecretaires', {
										autoLoad: true
									}),
									displayField: "nomprenom",
									valueField: "kage"
								}
							]
						}
					]
				}
			]
		}];
		this.callParent();
	}
});