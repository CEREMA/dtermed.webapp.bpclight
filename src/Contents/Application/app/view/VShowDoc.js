App.view.define('VShowDoc', {
    extend: "Ext.window.Window",
    alias: 'widget.VShowDoc',
    initComponent: function() {
        this.width = 1024;
        this.height = 660;

        this.layout = {
            type: 'fit'
        };

        this.bbar = [
            '->', {
                text: 'Quitter',
				itemId: "Exit",
				handler: function(me) {
					me.up('window').close();
				}
            }
        ];
		
        this.defaults = {
            split: true
        };

        this.items = [
			{
				html: '<iframe width=100% height=100% src="/docs/'+this.pid+'"></iframe>',
				border: false,
				flex: 1
			}
		];

        this.callParent();
    }
});