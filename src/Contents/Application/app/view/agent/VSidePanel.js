App.view.define('agent.VSidePanel',{
	extend: "Ext.Panel",
	alias: 'widget.TSidePanel',
	initComponent: function()
	{
		this.layout = "vbox";
		this.height= "100%";
		this.items = [
			{
				xtype: "panel",
				html: "",
				itemId: "PanelPhoto",
				height: 180,
                width: "90%",
				border: false,
                plugins: [{
					ptype: "filedrop",
					readType: "DataURL"
                }]				
			},
			{
				xtype: "panel",
				flex: 1,
				layout: "vbox",
				border: false,
				items: [
					{
						height: 10,
						border: false
					},
					{
						xtype: "label",
						text: "Nom :",
						flex: 1,
						border: false,
						padding: 5
					},
					{
						xtype: "textfield",
						itemId: "LAgentNom",
						width: 190,
						padding: 5
					},
					{
						xtype: "label",
						text: "Prénom :",
						border: false,
						padding: 5
					},
					{
						xtype: "textfield",
						itemId: "LAgentPrenom",
						width: 190,
						padding: 5
					},
					{
						xtype: "label",
						text: "Matricule :",
						border: false,
						hidden: true,
						padding: 5
					},
					{
						xtype: "textfield",
						itemId: "LAgentMatri",
						width: 190,
						padding: 5
					},
					{
						layout: "hbox",
						padding: 5,
						border: false,
						items: [
							{
								xtype: "textfield",
								fieldLabel: 'N° INSEE',
								itemId: "TInsee",
								flex: 1,
								labelAlign: 'top'
							},
							{
								xtype: "textfield",
								fieldLabel: 'Clé',
								itemId: "TInseeKey",
								width: 40,
								labelAlign: 'top'								
							}
						]
					},
					{
						xtype: "textfield",
						width: 190,
						labelPad: 10,
						padding: 5,
						itemId: "TRehucit",
						fieldLabel: 'REHUCIT',
						labelAlign: 'top'
					},
					{
						xtype: "combo",
						editable: false,
						fieldLabel: 'Etablissement',
						store: App.store.create('App.Etablissements.getAll',{
							autoLoad: true
						}),
						displayField: "LibEtsC",
						valueField: "Kets",
						itemId: "TEtablissement",
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
						itemId: "TDepartement",						
						store: App.store.create('App.Departements.getAll',{
							autoLoad: true
						}),
						padding: 5
					},
					{
						xtype: "combo",
						editable: false,
						fieldLabel: 'Service',
						itemId: "TService",
						width: 190,
						labelAlign: 'top',
						displayField: "LibSubC",
						valueField: "Ksub",						
						store: App.store.create('App.Services.getAll',{
							autoLoad: true
						}),
						padding: 5
					}
				]
			}
		];
		this.callParent();
	}
});