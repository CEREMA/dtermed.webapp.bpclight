App.view.define('agent.VRendezVous', {
	alias: "widget.TRendezVous",
	extend: "Ext.Panel",
	initComponent: function()
	{
		this.title="Visites médicales";
		this.layout="vbox";
        this.height="100%";
		this.border=false;

		this.items = [
        {
            html: "<div class=redtext>L’identification d’un poste à risque doit être validée par le conseiller prévention <br>et le médecin de prévention</div>",
            padding: 10,
            border: false
        },
        {
            xtype: "checkboxfield",
            itemId: "posteRisque",
            width: "100%",
            padding: 10,
			listeners: {
            change: function(field, newValue, oldValue, eOpts){
                console.log('change:' + field.fieldLabel + ' ' + newValue.rb);
            }
        	},
            boxLabel: 'Agent occupant un poste à risque'
        },
				{
					xtype: "radiofield",
					width: "100%",
					itemId: "dossierdemande",
					padding: 10,
					boxLabel: 'Dossier demandé'
				},
				{
					xtype: "radiofield",
					width: "100%",
					itemId: "dossierrecu",
					padding: 10,
					boxLabel: 'Dossier reçu'
				},
        {
            xtype: "grid",
            width: "100%",
            height: 420,
            tbar: [
            {
                text: "Ajouter",
                itemId: "add_rdv"
            }				
            ],
            plugins: [/*Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit : 1
            })*/],
            columns:[
                {
                    header: "Nature visite",
					dataIndex: "nature",
                    /*editor: {
                        xtype: 'combo',
                        allowBlank: false,
                        store: App.store.create('bpclight://vm_natures'),
                        displayField: "nature",
                        valueField: "kvm_natures"
                    },*/
                    flex: 1,
                    renderer : function (value, meta, record, rowIndex, columnIndex, view) {
                        for (var i=0;i<App.vm_natures.length;i++) {
                            if (App.vm_natures[i].kvm_natures==value) return App.vm_natures[i].nature;
                        };
                    }
                },
                {
                    header: "Date visite",
					dataIndex: "StartDate",
                    width: 100,
                    renderer:Ext.util.Format.dateRenderer('d/m/Y')
					/*editor: {
                        xtype: 'datetimefield',
                        allowBlank: false					
					}*/
                },
                {
                    header: "Résultat",
					dataIndex: "resultat",
                    /*editor: {
                        xtype: 'combo',
                        allowBlank: false,
                        store: App.store.create('bpclight://vm_resultats'),
                        displayField: "resultat",
                        valueField: "kvm_resultats"
                    },*/
                    renderer : function (value, meta, record, rowIndex, columnIndex, view) {
                        for (var i=0;i<App.vm_resultats.length;i++) {
                            if (App.vm_resultats[i].kvm_resultats==value) return App.vm_resultats[i].resultat;
                        };
                    },                    
                    flex: 1
                },                
				{
                    header: "Prochaine visite",
					dataIndex: "NextDate",
                    width: 100,
                    renderer:Ext.util.Format.dateRenderer('d/m/Y')
					/*editor: {
                        xtype: 'datetimefield',
                        allowBlank: false					
					}*/
                },
            ],
            store: App.store.create({fields:[],data:[]})
        }
		];
		this.callParent();
	}
});