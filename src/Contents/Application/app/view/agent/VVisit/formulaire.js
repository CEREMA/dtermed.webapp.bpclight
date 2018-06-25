
App.view.define('agent.VVisit.formulaire', {
    extend: "Ext.window.Window",
	alias: "widget.TVisitData",
    initComponent: function() {
		this.title="Dossier médical";
        this.width = 800;
        this.height = 780;

        this.layout = {
            type: 'fit'
        };

        this.bbar = [
			{
				text: "<",
				itemId: "prev"
			},
			{
				text: ">",
				itemId: "next"
			},
            '->', 
			{
                text: 'Quitter',
				itemId: "Exit"
            },
			{
                text: 'Enregistrer',
				itemId: "RecordMe"
            }			
        ];
		
		this.defaults={
			border: false
		};
		
        this.items = [
			{
				xtype: "tabpanel",
				width: "100%",
				items: [
				{
					title: "Général",
					layout: "hbox",
					items: [
						{
							layout: "vbox",
							border: false,
							defaults: {
								padding: 15
							},
							items: [
							{
								layout: "hbox",
								border: false,
								width: "100%",
								bodyStyle: "background-color: transparent",
								items: [
									{
										xtype: "combo",
										fieldLabel: "Type de visite",
										labelAlign: "top",
										width: 200,
										displayField: "type",
										valueField: "id",
										itemId: "TMedicTypeVisite",
										store: App.store.create("bpclight://medic_type",{autoLoad: true})
									},
									{
										xtype: "combo",
										fieldLabel: "Catégorie",
										labelAlign: "top",
										width: 100,
										displayField: "cat",
										valueField: "id",
										itemId: "TMedicCategorie",
										margin: {
											left: 10
										},
										store: App.store.create("bpclight://medic_cat",{autoLoad: true})
									},
									{
										xtype: "datefield",
										itemId: "TMedicDate",
										fieldLabel: "Date",
										margin: {
											left: 10
										},						
										labelAlign: "top",
										width: 100
									}					
								]
							},
							{
								xtype: "htmleditor",
								itemId: "TPosteActuel",
								fieldLabel: "Poste actuel",
								width: "100%"
							},
							{
								xtype: "htmleditor",
								itemId: "TTraitements",
								fieldLabel: "Traitements actuels",
								height: 100,
								width: "100%"
							},
							{
								xtype: "panel",
								layout: "hbox",
								width: "100%",
								border: false,
								items: [
									{
										xtype: "combo",
										fieldLabel: "Tabac",
										labelAlign: "top",
										flex: 1,
										itemId: "TTabac",
										valueField: "item",
										displayField: "value",
										store: App.store.create({
											fields: [
												"item",
												"value"
											],
											data: [
												{
													item: "0",
													value: "Non fumeur"
												},
												{
													item: "1",
													value: "< 10 cigarettes/jour"
												},
												{
													item: "2",
													value: "> 10 cigarettes/jour"
												},
												{
													item: "3",
													value: "> 1 paquet/jour"
												},
												{
													item: "4",
													value: "Fumeur repenti"
												}
											]
										})
									},
									{
										xtype: "combo",
										fieldLabel: "Alcool",
										margin: {
											left: 10
										},
										labelAlign: "top",
										flex: 1,
										itemId: "TAlcool",
										valueField: "item",
										displayField: "value",
										store: App.store.create({
											fields: [
												"item",
												"value"
											],
											data: [
												{
													item: "0",
													value: "Pas d'alcool"
												},
												{
													item: "1",
													value: "Occasionnel"
												},
												{
													item: "2",
													value: "1 à 2 verres/jour"
												},
												{
													item: "3",
													value: "> 2 verres/jour"
												}
											]
										})
									},
									{
										xtype: "combo",
										fieldLabel: "Sport",
										margin: {
											left: 10
										},
										labelAlign: "top",
										flex: 1,
										itemId: "TSport",
										valueField: "item",
										displayField: "value",
										store: App.store.create({
											fields: [
												"item",
												"value"
											],
											data: [
												{
													item: "0",
													value: "Pas de sport"
												},
												{
													item: "1",
													value: "Occasionnel"
												},
												{
													item: "2",
													value: "Régulier"
												},
												{
													item: "3",
													value: "Compétition"
												}
											]
										})
									}
								]
							},
							{
								xtype: "tagfield",
								width: "100%",
								fieldLabel: "Antécédents clinique",
								itemId: "clinique",
								valueField: "item",
								displayField: "value",
								store: App.store.create({
									fields: [
										"item",
										"value"
									],
									data: [
										{
											item: 1,
											value: "Cardio"
										},
										{
											item: 2,
											value: "Locomoteur"
										},
										{
											item: 3,
											value: "Neurologique"
										},
										{
											item: 4,
											value: "Digestif"
										},
										{
											item: 5,
											value: "Psychisme"
										},
										{
											item: 6,
											value: "Autres"
										}
									]
								})

							},
							{
								xtype: "tagfield",
								width: "100%",
								fieldLabel: "Orientations",
								itemId: "orientations",
								valueField: "item",
								displayField: "value",
								store: App.store.create({
									fields: [
										"item",
										"value"
									],
									data: [
										{
											item: 1,
											value: "Médecin traitant"
										},
										{
											item: 2,
											value: "Cardiologue"
										},
										{
											item: 3,
											value: "Pneumologue"
										},
										{
											item: 4,
											value: "Dermatologue"
										},
										{
											item: 5,
											value: "ORL"
										},
										{
											item: 6,
											value: "Ophtalmologue"
										},
										{
											item: 7,
											value: "Gynécologue"
										},
										{
											item: 8,
											value: "Autres médecins"
										},
										{
											item: 9,
											value: "Assistance sociale"
										},
										{
											item: 10,
											value: "MDPH"
										}
									]
								})

							},
							{
								xtype: "combo",
								fieldLabel: "Conclusion",
								itemId: "TConclusions",
								width: "100%",	
								store: App.store.create({
									fields: [
										"value",
										"display"
									],
									data: [
									{
										value: "1",
										display: "Compatible"
									},
									{
										value: "2",
										display: "Compatible avec aménagement"
									},
									{
										value: "3",
										display: "Compatible avec restriction"
									},
									{
										value: "4",
										display: "Incompatibilité temporaire"
									},
									{
										value: "5",
										display: "Incompatibilité au poste"
									},
									{
										value: "6",
										display: "Incompatibilité à tous les postes"
									},
									{
										value: "7",
										display: "Pas d'avis ce jour"
									}
									]
								}),
								displayField: "display",
								editable: false,
								valueField: "value",
								width: "100%"
							}						
							],
							flex: 1
						},
						{
							layout: "vbox",
							width: 205,
							border: false,
							height: "100%",
							items: [
								{
									html: "Renseignement généraux",
									border: false,
									padding: 5							
								},
								{
									xtype: "propertygrid",
									itemId: "RG",
									border: false,
									height: 120,
									width: "100%",
									source: {
										"Taille": 0,
										"Poids": 0,
										"TA": "",
										"Pouls": 0
									}						
								},
								{
									html: "Test EFR",
									border: false,
									padding: 5
								},
								{
									xtype: "propertygrid",
									itemId: "EFR",
									border: false,
									height: 120,
									width: "100%",
									source: {
										"CVF": 0,
										"VEMS": 0,
										"VEMS/CVF": 0,
										"DEMM": 0
									}						
								},
								{
									html: "Test urinaire",
									border: false,
									padding: 5
								},
								{
									xtype: "propertygrid",
									itemId: "TU",
									border: false,
									sourceConfig: {
										Resultat: {
											xtype: 'combo',
											store: {
												fields: ['display', 'value'],
												data: [
													{ 'display': 'négatif', 'value': 'négatif' },
													{ 'display': 'positif', 'value': 'positif' }
												]
											},
											queryMode: 'local',
											displayField: 'display',
											valueField: 'value',
											editable: false
										}
									},
									height: 70,
									width: "100%",
									source: {
										"Resultat": 'négatif',
										"Rq": ""
									}						
								},
								{
									html: "Test visuel",
									border: false,
									padding: 5
								},
								{
									xtype: "propertygrid",
									itemId: "TV",
									border: false,
									height: 150,
									width: "100%",
									sourceConfig: {
										Anomalie: {
											xtype: 'combo',
											store: {
												fields: ['display', 'value'],
												data: [
													{ 'display': '-', 'value': '-' },
													{ 'display': 'hypermétropie', 'value': 'hypermétropie' },
													{ 'display': 'myopie', 'value': 'myopie' },
													{ 'display': 'presbytie', 'value': 'presbytie' }
												]
											},
											queryMode: 'local',
											displayField: 'display',
											valueField: 'value',
											editable: false
										},
										Astigmatie: {
											xtype: 'combo',
											store: {
												fields: ['display', 'value'],
												data: [
													{ 'display': '-', 'value': '-' },
													{ 'display': '+', 'value': '+' }
												]
											},
											queryMode: 'local',
											displayField: 'display',
											valueField: 'value',
											editable: false										
										},
										Correction: {
											xtype: 'combo',
											store: {
												fields: ['display', 'value'],
												data: [
													{ 'display': 'oui', 'value': 'oui' },
													{ 'display': 'non', 'value': 'non' }
												]
											},
											queryMode: 'local',
											displayField: 'display',
											valueField: 'value',
											editable: false										
										},
										"OD/OG": {
											xtype: 'combo',
											store: {
												fields: ['display', 'value'],
												data: [
													{ 'display': '-', 'value': '-' },
													{ 'display': '+', 'value': '+' }
												]
											},
											queryMode: 'local',
											displayField: 'display',
											valueField: 'value',
											editable: false										
										}
									},									
									source: {
										"OD/OG": "",
										"Correction": "-",
										"Rq": "",
										"Anomalie": '-',
										"Astigmatie": "-"
									}						
								},
								{
									html: "Test auditif",
									border: false,
									padding: 5
								},	
								{
									xtype: "propertygrid",
									itemId: "TA",
									border: false,
									height: 140,
									width: "100%",
									sourceConfig: {
										"Correction": {
											xtype: 'combo',
											store: {
												fields: ['display', 'value'],
												data: [
													{ 'display': '-', 'value': '-' },
													{ 'display': '+', 'value': '+' }
												]
											},
											queryMode: 'local',
											displayField: 'display',
											valueField: 'value',
											editable: false										
										}									
									},
									source: {
										"ORD": '',
										"ORG": '',
										"Correction": "-",
										"Rq": ""
									}						
								}								
							]
						}
					]
				},
				{
					title: "Vaccinations",
					layout: "fit",
					defaults: {
						padding: 0
					},
					items: [
						{
							xtype: "htmleditor",
							itemId: "vaccinations",
							border: false,
							width: "100%"
						}					
					]
				},
				{
					title: "Clinique",
					layout: "fit",
					defaults: {
						padding: 0
					},
					items: [
						{
							xtype: "htmleditor",
							itemId: "clinique",
							border: false,
							width: "100%"
						}					
					]
				},
				{
					title: "Commentaires",
					layout: "fit",
					defaults: {
						padding: 0
					},
					items: [
						{
							xtype: "htmleditor",
							itemId: "comments",
							border: false,
							width: "100%"
						}					
					]
				}
				]
			}
		];

        this.callParent();
    }
});