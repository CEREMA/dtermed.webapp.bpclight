App.view.define('VPrincipal', {
	extend: "Ext.Panel",
	alias: 'widget.TPrincipal',
	layout: "border",
	border: false,
	items: [{
			region: "west",
			html: "yes",
			width: 450,
			xtype: "treepanel",
			itemId: "TreePanel",
			height: "100%",
			rootVisible: false,
			split: true,
			tbar: [{
					xtype: "button",
					text: "Nouvel agent",
					itemId: "NewAgent",
					scale: 'small',
					iconCls: 'plus',
					iconAlign: 'left'
				},
				{
					xtype: "button",
					text: "Hiérarchie",
					itemId: "Hierarchie",
					scale: 'small',
					iconCls: 'hierarchie',
					iconAlign: 'left'
				}
			],
			store: Ext.create('Ext.data.TreeStore', {
				autoLoad: true,
				proxy: {
					type: 'ajax',
					url: '/root',
					actionMethods: {
						read: 'POST'
					},
					reader: {
						type: 'json'
					}
				}
			})
		},
		{
			xtype: "FilterBox",
			itemId: "FilterPanel",
			fields: [{
					name: "Nom",
					field: "agents.nom",
					type: "text"
				},
				{
					name: "Prénom",
					field: "agents.prenom",
					type: "text"
				},
				{
					name: "Agent actif",
					field: "agents.actif",
					type: "boolean"
				},
				{
					name: "Fonction",
					field: "roles.krol",
					type: "choice",
					model: "mFonctions",
					display: "LibRol",
					value: "Krol"
				},
				{
					name: "Catégorie",
					field: "grades.kcgr",
					type: "choice",
					model: "mCategories",
					display: "LibCgr",
					value: "Kcgr"
				},
				{
					name: "Grades",
					field: "grades.kgra",
					type: "choice",
					model: "mGrades",
					display: "LibGra",
					value: "Kgra"
				},
				{
					name: "Date de naissance",
					field: "agents.datnai",
					type: "date"
				},
				{
					name: "Bâtiment",
					field: "batiments.kbat",
					type: "choice",
					model: "mBatiments",
					display: "LibBatC",
					value: "Kbat"
				},
				{
					name: "Téléphone",
					field: "agents.telephone",
					type: "text"
				},
				{
					name: "Portable",
					field: "agents.portable",
					type: "text"
				},
				{
					name: "Etablissement",
					field: "etablissements.kets",
					type: "choice",
					model: "mEtablissements",
					display: "LibEts",
					value: "Kets"
				},
				{
					name: "Département",
					field: "unites.kuni",
					type: "choice",
					model: "mDepartements",
					display: "LibUni",
					value: "Kuni"
				},
				{
					name: "Service",
					field: "subdis.ksub",
					type: "choice",
					model: "mServices",
					display: "LibSub",
					value: "Ksub"
				}
			]
		},
		{
			region: "center",
			split: true,
			width: 350,
			xtype: "grid",
			border: true,
			itemId: "GridAgents",
			tbar: [{
					xtype: 'textfield',
					enableKeyEvents: true,
					width: 200,
					triggers: {
						search: {
							cls: 'x-form-search-trigger',
							handler: function () {
								alert('add trigger clicked');
							}
						}
					},
					itemId: 'searchbox',
					padding: 4,
					width: 150
				},
				{
					xtype: "button",
					text: "Recherche vocale",
					itemId: "speechget",
					disabled: true
				},
				'->',
				{
					text: "Filtrer",
					iconCls: "ico_filter",
					iconAlign: 'left',
					itemId: "BtnFilter",
					enableToggle: true
				},
				{
					xtype: "splitbutton",
					text: "Exporter",
					iconCls: "ico_export",
					iconAlign: 'left',
					itemId: "BtnExport",
					menu: [{
							text: "Civilité",
							itemId: "MNU_EXPORT_CIV"
						},
						{
							text: "Autorisation de conduite",
							itemId: "MNU_AUTORISATION"
						}
					]
				}
			],
			columns: [{
				text: 'Nom',
				dataIndex: 'Nom',
				flex: 1
			}, {
				text: 'Prénom',
				dataIndex: 'Prenom'
			}, {
				text: 'Téléphone',
				dataIndex: 'Telephone'
			}, {
				text: 'Mobile',
				dataIndex: 'Portable'
			}],
			store: Ext.create('Ext.data.Store', {
				autoLoad: false,
				proxy: {
					type: 'ajax',
					url: '/agents',
					actionMethods: {
						read: 'POST'
					},
					reader: {
						type: 'json'
					}
				}
			})
		},
		{
			region: "east",
			layout: "vbox",
			flex: 1,
			split: true,
			items: [{
					html: '<table width=100%><tr><td><div id="Photo" class="CPhoto"></div></td><td>&nbsp;&nbsp;</td><td valign=top width=100%><div id="NomPrenom" class="CNomPrenom"></div><br><div id="Poste" class="CPoste"></div></td></tr></table><br><table><tr><td>Téléphone</td><td><div id="TPhone" class="CLabel"></div></td></tr><tr><td>Mobile</td><td><div id="TMobile" class="CLabel"></div></td></tr><tr><td>Courriel</td><td><div id="TMail" class="CLabel"></div></td></tr></table>',
					padding: 10,
					split: true,
					height: 350,
					width: "100%",
					border: false
				},
				{
					html: '<div id="LibellePoste" class="CPoste"></div>',
					padding: 10,
					split: true,
					width: "100%",
					border: false,
					flex: 1
				},
				{
					id: "MyGMapPanel",
					html: '<div id="TMapPanel" style="width:100%;height:100%"></div>',
					padding: 10,
					height: 350,
					width: "100%",
					border: false,
					split: true
				}
			]
		}
	]
});