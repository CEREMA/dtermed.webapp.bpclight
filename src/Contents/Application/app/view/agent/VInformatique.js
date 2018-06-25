App.view.define('agent.VInformatique', {
    alias: "widget.TInformatique",
    extend: "Ext.Panel",
    initComponent: function() {
        this.title = "Informatique";
        this.layout = "vbox";
        this.border = false;
        this.height=700;
		this.items=[
		{
			xtype: "grid",
			flex: 1,
			width: "100%",
			fieldLabel: "Permis",
			labelAlign: "top",
            plugins: [
				Ext.create('Ext.grid.plugin.CellEditing', {
                	clicksToEdit : 1
            	})
			],
			tbar: [
			'->',
			{
				text: "Ajouter",
				iconCls: "add",
				handler: function(me) {
					me.up('grid').getStore().insert(0, {}); 
				}
			},
			{
				text: "Supprimer",
				iconCls: "del",
				handler: function(me) {
					var selection = me.up('grid').getSelectionModel().getSelection()[0];
					App.DB.del('bpclight://agequip?eid='+selection.data.eid,function(r){
						me.up('grid').getStore().load();	
					});
				}
			}				
			],
			columns: [
			{	
				header: "Equipement",
				dataIndex: "equip",
				editor: {
                	xtype: 'combo',
					store: App.store.create('bpclight://equipements',{autoLoad:true}),
					editable: false,
					displayField: "equip",
					valueField: "equip",
                	allowBlank: false					
				}
			},				
			{
				header: "Commentaires",
				dataIndex: "comments",
				flex: 1,
				editor: {
					xtype: 'textfield',
                	allowBlank: false			
				}
			}
			],
			store: App.store.create({fields:[],data:[]})
		},
		{
			flex: 1,
			width: "100%",
			bodyCls: "cinema"
		}
		];
		this.callParent();
	}
});