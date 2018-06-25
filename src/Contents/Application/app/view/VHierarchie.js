App.view.define('VHierarchie', {
    extend: "Ext.window.Window",
    alias: 'widget.VHierarchie',
    initComponent: function () {
        this.width = 800;
        this.height = 660;

        this.layout = {
            type: 'fit'
        };

        this.bbar = [
            '->', {
                text: 'Quitter',
                itemId: "Exit",
                handler: function (me) {
                    me.up('window').close();
                }
            }
        ];

        this.defaults = {
            split: true
        };

        this.title = "Hiérarchie";

        this.listeners = {
            show: function () {
                App.get('VHierarchie treepanel#TreePanel').expandAll();
            }
        };

        this.items = [{
            xtype: "treepanel",
            itemId: "TreePanel",
            height: "100%",
            rootVisible: false,
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
            }),
            listeners: {
                edit: function (a, b, c) {
                    var d = b.record.data;
                    if (d.id.indexOf('Kets') > -1) {
                        var id = d.id.split('Kets')[1];
                        App.DB.post('bpclight://etablissements', {
                            Kets: id,
                            responsable: d.responsable_nomprenom
                        }, function () {
                            App.Roles.delDir(1, function () {
                                App.DB.post('bpclight://agerol', {
                                    Krol: 86,
                                    Kage: d.responsable_nomprenom
                                }, function (o) {
                                    console.log(o);
                                    a.context.store.load();
                                    a.context.store.on('load', function () {
                                        App.get('VHierarchie treepanel#TreePanel').expandAll();
                                    })
                                });
                            });
                        })
                    }
                    if (d.id.indexOf('Kuni') > -1) {
                        var id = d.id.split('Kuni')[1];
                        App.DB.post('bpclight://unites', {
                            Kuni: id,
                            responsable: d.responsable_nomprenom
                        }, function () {
                            App.Roles.delUni(id, function () {
                                App.DB.post('bpclight://agerol', {
                                    Krol: 22,
                                    Kage: d.responsable_nomprenom
                                }, function () {
                                    a.context.store.load();
                                    a.context.store.on('load', function () {
                                        App.get('VHierarchie treepanel#TreePanel').expandAll();
                                    })
                                });
                            });
                        })
                    }
                    if (d.id.indexOf('Ksub') > -1) {
                        var id = d.id.split('Ksub')[1];
                        App.DB.post('bpclight://subdis', {
                            Ksub: id,
                            responsable: d.responsable_nomprenom
                        }, function () {
                            App.Roles.delSub(id, function () {
                                App.DB.post('bpclight://agerol', {
                                    Krol: 9,
                                    Kage: d.responsable_nomprenom
                                }, function () {
                                    a.context.store.load();
                                    a.context.store.on('load', function () {
                                        App.get('VHierarchie treepanel#TreePanel').expandAll();
                                    })
                                });
                            });
                        })
                    }
                }
            },
            plugins: [Ext.create('Ext.grid.plugin.CellEditing', {
                clicksToEdit: 1
            })],
            columns: [{
                    header: "Service",
                    xtype: "treecolumn",
                    dataIndex: "text",
                    flex: 1
                },
                {
                    header: "Responsable",
                    dataIndex: "responsable_nomprenom",
                    width: 300,
                    editor: {
                        xtype: "combo",
                        editable: false,
                        displayField: "NomPrenom",
                        valueField: "kage",
                        store: App.store.create("bpclight://agents{kage,nom+' '+prenom=NomPrenom+}?actif=1")
                    }
                }
            ],
            flex: 1
        }];

        this.callParent();
    }
});