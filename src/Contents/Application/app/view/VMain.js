App.view.define('VMain', {

    extend: 'Ext.Panel',
	alias : 'widget.mainform',
	border: false,
	
	layout: "border",
	
	items: [
		{
			region: 'north',
			height: 25,
			minHeight: 25,
			border:false,
			baseCls: 'cls-header',
			xtype: "Menu",
			itemId: "MenuPanel",
			menu: [
				{
					text: "Agent",
					menu: [
						{
							text: "Nouveau",
							itemId: "MNU_AGENT_NEW"
						}
					]
				},
				{
					text: "Visites médicales",
					hidden: false,
					id: "MNU_VM",
					menu: [
						{
							text: "Export Rendez-vous",
							itemId: "MNU_RDV"
						}
					]
				}				
			]		
		},
		{
			region: "center",
			xtype: "TPrincipal"
		}
	]
	
});
