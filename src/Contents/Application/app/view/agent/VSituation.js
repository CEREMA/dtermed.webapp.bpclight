App.view.define('agent.VSituation', {
	alias: "widget.TSituation",
	extend: "Ext.Panel",
	initComponent: function () {
		this.title = "Situation";
		this.layout = "vbox";
		this.border = false;
		this.items = [{
				layout: "hbox",
				width: "100%",
				border: false,
				padding: 10,
				items: [{
					xtype: "label",
					text: "Position :",
					padding: 5
				}, {
					xtype: "panel",
					margin: {
						left: 10
					},
					itemId: "maposition",
					html: ''
				}]
			},
			{
				xtype: "grid",
				itemId: "gridPositions",
				padding: 10,
				tbar: [
					'->',
					{
						text: "Ajouter",
						itemId: "Add"
					}
				],
				columns: [{
						text: "Position",
						dataIndex: "Position",
						flex: 1
					},
					{
						text: "Date",
						dataIndex: "dateta",
						xtype: 'datecolumn',
						format: 'd/m/Y'
					}
				],
				store: App.store.create("App.Agents.getPositions"),
				width: "100%",
				height: 200
			},
			/*{
				html: "<b>Situation administrative</b>",
				width: "100%",
				padding: 10,
				height: 40,
				border: false,
			},*/
			{
				layout: "hbox",
				width: "100%",
				border: false,
				flex: 1,
				items: [{
						xtype: "grid",
						itemId: "situadm",
						tbar: [{
								xtype: "panel",
								html: "&nbsp;Situation administrative",
								border: false,
								bodyStyle: "background: transparent"
							},
							'->',
							{
								text: "Ajouter",
								handler: function (me) {
									me.up('grid').getStore().add({
										INM: "",
										DAT: "",
										ECH: "",
										kage: me.up('window').agent.Kage
									});
									/*App.DB.post('bpclight://situadm',{INM: "",
										DAT: "",
										ECH: "",
										kage: me.up('window').agent.Kage},function(r){
										me.up('grid').getStore().load();
									});*/
								}
							}
						],
						plugins: [
							Ext.create('Ext.grid.plugin.RowEditing', {
								clicksToEdit: 1
							})
						],
						columns: [{
								header: "Echelon",
								dataIndex: "ECH",
								flex: 1,
								editor: {
									xtype: 'textfield'
								}
							},
							{
								header: "INM",
								dataIndex: "INM",
								editor: {
									xtype: 'textfield'
								}
							},
							{
								header: "Date",
								dataIndex: "DAT",
								editor: {
									xtype: 'datefield',
									format: 'd/m/Y'
								},
								renderer: function (field) {
									var formated = Ext.util.Format.date(field, 'd/m/Y');
									return formated;
								}
							}
						],
						padding: 10,
						store: App.store.create("bpclight://situadm"),
						flex: 2,
						height: 200
					},
					{
						xtype: "grid",
						itemId: "histoQ",
						columns: [{
								header: "Quotité",
								width: 60,
								dataIndex: "quotite"
							},
							{
								header: "Date",
								flex: 1,
								type: 'date',
								dataIndex: "date"
							}
						],
						padding: 10,
						store: App.store.create({
							fields: ["quotite", "date"],
							data: []
						}),
						flex: 1,
						height: 200
					}
				]
			},
			/*
			header
			*/
			{
				layout: "hbox",
				border: false,
				itemId: "situation_header",
				hidden: true,
				padding: 10,
				width: "100%",
				items: [{
						xtype: "combo",
						fieldLabel: "Position",
						labelAlign: "top",
						flex: 1,
						editable: false,
						itemId: "position",
						store: App.store.create('App.Positions.getAll', {
							autoLoad: true
						}),
						displayField: "Position",
						valueField: "Kpst"
					},
					{
						xtype: "datefield",
						fieldLabel: "Date d'effet",
						renderer: Ext.util.Format.dateRenderer('d/m/Y'),
						itemId: "datEta",
						labelAlign: "top",
						width: 100
					},
					{
						xtype: "textfield",
						itemId: "Situation_Kpst",
						hidden: true
					}
				]
			},
			/*
			mutation arrivée & interne
			*/
			{
				layout: "hbox",
				itemId: "mutation_arrivee",
				border: false,
				hidden: true,
				padding: 10,
				width: "100%",
				items: [{
						xtype: "combo",
						hidden: true,
						fieldLabel: "Motif",
						labelAlign: "top",
						editable: false,
						itemId: "MotifCBO",
						store: App.store.create('App.Motif.getAll', {
							autoLoad: true
						}),
						displayField: "motif",
						valueField: "kmof"
					},
					{
						flex: 1,
						itemId: "situation_separator",
						hidden: true,
						border: false
					},
					{
						layout: "vbox",
						border: false,
						xtype: "panel",
						itemId: "TPanelI",
						items: [{
								xtype: "combo",
								editable: false,
								fieldLabel: 'Etablissement',
								store: App.store.create('App.Etablissements.getAll', {
									autoLoad: true
								}),
								displayField: "LibEtsC",
								valueField: "Kets",
								itemId: "TIEtablissement",
								width: 190,
								labelAlign: 'top',
								padding: 5
							},
							{
								xtype: "combo",
								editable: false,
								fieldLabel: 'Département',
								width: 190,
								labelAlign: 'top',
								displayField: "LibUnic",
								valueField: "Kuni",
								itemId: "TIDepartement",
								store: App.store.create('App.Departements.getAll', {
									autoLoad: true
								}),
								padding: 5
							},
							{
								xtype: "combo",
								editable: false,
								fieldLabel: 'Service',
								itemId: "TIService",
								width: 190,
								labelAlign: 'top',
								displayField: "LibSubC",
								valueField: "Ksub",
								store: App.store.create('App.Services.getAll', {
									autoLoad: true
								}),
								padding: 5
							}
						]
					}
				]
			},
			/*
			CPA+CFA+Retraite
			*/
			{
				layout: "hbox",
				padding: 10,
				width: "100%",
				xtype: "panel",
				itemId: "CPACFARetraite",
				hidden: true,
				border: false,
				items: [{
						xtype: "datefield",
						itemId: "TDateCFA",
						labelAlign: "top",
						renderer: Ext.util.Format.dateRenderer('d/m/Y'),
						fieldLabel: "Date CFA"
					},
					{
						xtype: "datefield",
						itemId: "TDateCPA",
						labelAlign: "top",
						margin: {
							left: 10
						},
						renderer: Ext.util.Format.dateRenderer('d/m/Y'),
						fieldLabel: "Date CPA"
					},
					{
						xtype: "datefield",
						itemId: "TDateRetraite",
						labelAlign: "top",
						margin: {
							left: 10
						},
						renderer: Ext.util.Format.dateRenderer('d/m/Y'),
						fieldLabel: "Date Retraite"
					}
				]
			},
			/*
			Absence longue & Mvt Départ
			*/
			{
				xtype: "textarea",
				itemId: "Motif",
				padding: 10,
				width: "100%",
				fieldLabel: "Motif",
				flex: 1,
				hidden: true,
				labelAlign: "top"
			},
			/*
			footer
			*/
			{
				layout: "hbox",
				border: false,
				hidden: true,
				itemId: "situation_cancel_ok",
				padding: 10,
				width: "100%",
				items: [{
						flex: 1,
						border: false
					},
					{
						xtype: "button",
						itemId: "situation_cancel",
						text: "Annuler"
					},
					{
						xtype: "button",
						text: "Enregistrer",
						itemId: "situation_ok",
						margin: {
							left: 10
						}
					}
				]
			}
		];
		this.callParent();
	}
});