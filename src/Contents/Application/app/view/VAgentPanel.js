App.view.define('VAgentPanel', {
    extend: "Ext.window.Window",
    alias: 'widget.TAgentPanel',
    initComponent: function () {
        this.width = 1024;
        this.height = 730;
        this.title = "...";

        this.layout = {
            type: 'border'
        };

        this.bbar = [
            '->', {
                text: 'Enregistrer',
                itemId: "Record"
            }, {
                text: 'Quitter',
                itemId: "Exit"
            }
        ];

        this.defaults = {
            split: true
        };

        this.items = [{
                region: 'west',
                xtype: "panel",
                width: 200,
                minWidth: 200,
                height: "100%",
                border: false,
                itemId: "MenuPanel",
                items: [{
                    xtype: "TSidePanel",
                    border: false
                }]
            }, {
                region: 'center',
                items: [{
                    border: false,
                    xtype: "tabpanel",
                    itemId: "tabs",
                    items: [{
                            xtype: "TAgent"
                        },
                        {
                            xtype: "TSituation"
                        },
                        {
                            xtype: "TFormation"
                        },
                        {
                            xtype: "TVisit",
                            itemId: "tab_medic"
                        },
                        {
                            xtype: "TRendezVous",
                            itemId: "tab_rdv"
                        },
                        {
                            xtype: "TAutorisation",
                            itemId: "tab_autorisation"
                        },
                        {
                            xtype: "TInformatique",
                            itemId: "tab_info"
                        }
                    ]
                }]
            },
            {
                region: 'east',
                width: 250,
                layout: "vbox",
                title: "Métier",
                border: false,
                items: [{
                        xtype: "htmleditor",
                        itemId: "metier",
                        width: "100%",
                        border: false,
                        flex: 1
                    },
                    {
                        height: 200,
                        width: "100%",
                        xtype: "uploadpanel",
                        itemId: "up"
                    },
                    {
                        xtype: "grid",
                        itemId: "roles",
                        hidden: false,
                        flex: 1,
                        tbar: [{
                                xtype: "combo",
                                itemId: "cboRoles",
                                editable: false,
                                fieldLabel: "Rôles",
                                labelAlign: "left",
                                labelWidth: 40,
                                width: 200,
                                store: App.store.create("App.Roles.getAll"),
                                displayField: "LibRol",
                                valueField: "Krol",
                                matchFieldWidth: false
                            },
                            '->', {
                                iconCls: "plus",
                                itemId: "RoleAdd"
                            }
                        ],
                        columns: [{
                            text: "Rôle",
                            dataIndex: "LibRol",
                            flex: 1
                        }],
                        store: App.store.create('App.Agents.getRole'),
                        selType: 'cellmodel',
                        width: "100%",
                        flex: 1
                    }
                ]
            }
        ];

        this.callParent();
    }
});