Utils = {
    getVille: function(o, cb) {
        var db = Utils.using('db');
        db.model('bpclight', 'select Id, Code,concat(Ville, " (",Code,")") Ville from postal where Code like "' + o.Code + '%"', cb);
    },
    dumpVisites: function(o, cb) {
        Date.prototype.ymd = function() {
            function minTwoDigits(n) {
                return (n < 10 ? '0' : '') + n;
            };
            var mm = minTwoDigits(this.getMonth() + 1); // getMonth() is zero-based
            var dd = minTwoDigits(this.getDate());

            //return [this.getFullYear(), !mm[1] && '0', mm, !dd[1] && '0', dd].join(''); // padding
            return this.getFullYear() + '-' + mm + '-' + dd;
        };
        var db = Utils.using('db');
        var excelbuilder = App.using('msexcel-builder');
        var Agents = [];
        var AllAgents = [];
        var Agent = {};
        var VM = [];
        db.query("bpclight", 'select Kage,Nom,Prenom,unites.libunic,subdis.libsubc,"" date_visite,"" resultat,"" commentaires,"" nature from agents, unites,subdis where unites.kuni=agents.kuni and subdis.ksub=agents.ksub and actif=1 and kgra<>66 and kgra<>67 and unites.kets=1 order by Nom,Prenom', function(e, r) {
            for (var i = 0; i < r.length; i++) {
                AllAgents.push(r[i].Kage);
                Agent[r[i].Kage] = r[i];
            };
            db.query("bpclight", 'SELECT agents.Kage,Nom,Prenom,libunic,libsubc,StartDate date_visite,NextDate date_prochaine_visite,vm_resultats.resultat,commentaires,vm_natures.nature FROM bpclight.medic_rdv join bpclight.agents on bpclight.agents.kage=bpclight.medic_rdv.kage left join vm_resultats on vm_resultats.kvm_resultats=medic_rdv.resultat left join vm_natures on vm_natures.kvm_natures=medic_rdv.nature join unites on unites.kuni=agents.kuni join subdis on subdis.ksub=agents.ksub where agents.actif=1 order by Nom,Prenom, date_visite desc;', function(err, rows) {
                //console.log(rows);
                for (var i = 0; i < rows.length; i++) {
                    if (Agents.indexOf(rows[i].Kage) == -1) {
                        Agents.push(rows[i].Kage);
                        VM.push(rows[i]);
                    }
                };

                var CSV = [];
                for (var i = 0; i < VM.length; i++) {
                    var item = [];
                    for (var el in VM[i]) {
                        if (el == "date_visite")
                            item.push(VM[i][el].ymd());
                        else {
                            try {
                                if (el == "date_prochaine_visite")
                                    item.push(VM[i][el].ymd());
                                else
                                    item.push(VM[i][el]);
                            } catch (e) {
                                item.push(VM[i][el]);
                            }
                        }
                    };
                    CSV.push(item);
                };

                for (var i = 0; i < AllAgents.length; i++) {
                    var item = [];
                    if (Agents.indexOf(AllAgents[i]) == -1) {
                        for (var el in Agent[AllAgents[i]]) item.push(Agent[AllAgents[i]][el]);
                        CSV.push(item);
                    }
                };

                /*
                var tempfile = App.temp('csv');

                var fields = [
                    "ID",
                    "NOM",
                    "PRENOM",
                    "Dpt",
                    "Service",
                    "Date",
                    "Prochaine visite",
                    "Résultat",
                    "Commentaires",
                    "Type"
                ];

                var data = [];

                for (var i = 0; i < CSV.length; i++) {
                    var item = CSV[i];
                    var obj = {};
                    for (var j = 0; j < item.length; j++) {
                        obj[fields[j]] = item[j];
                    };
                    data.push(obj);
                };
                console.log(data);
                var json2csv = require('json2csv');
                var result = json2csv({ data: data, fields: fields, excelStrings: true, del: ";" });

                require('fs').writeFile(tempfile.dir + '/' + tempfile.filename, result, function(e, o) {
                    console.log(tempfile.url);
                    cb(tempfile.url);
                });

                return;
                */

                var tempfile = App.temp('xlsx');
                var workbook = excelbuilder.createWorkbook(tempfile.dir, tempfile.filename);
                var conf = {};

                //NOM	PRENOM	Dpt	Service	Date	Résultat	Commentaires	Type

                conf.cols = [{
                        caption: '',
                        type: 'string',
                        width: 0
                    },
                    {
                        caption: 'NOM',
                        type: 'string',
                        width: 150
                    },
                    {
                        caption: 'PRENOM',
                        type: 'string',
                        width: 150
                    },
                    {
                        caption: 'Dpt',
                        type: 'string',
                        width: 50
                    },
                    {
                        caption: 'Service',
                        type: 'string',
                        width: 50
                    },
                    {
                        caption: 'Date',
                        type: 'string',
                        width: 50
                    },
                    {
                        caption: 'Prochaine visite',
                        type: 'string',
                        width: 50
                    },
                    {
                        caption: 'Résultat',
                        type: 'string',
                        width: 100
                    },
                    {
                        caption: 'Commentaires',
                        type: 'string',
                        width: 250
                    },
                    {
                        caption: 'Type',
                        type: 'string',
                        width: 100
                    }
                ];

                var tabs = CSV;

                var sheet1 = workbook.createSheet('Visites', conf.cols.length, tabs.length + 200);

                console.log(tabs);

                for (var e = 0; e < conf.cols.length; e++) {
                    sheet1.set(e + 1, 1, conf.cols[e].caption);
                    sheet1.width(e + 1, conf.cols[e].width * 1);
                };

                var position = 2;
                for (var i = 0; i < tabs.length; i++) {
                    var element = tabs[i];
                    for (var e = 0; e < element.length; e++) {
                        if (e > 0) sheet1.set(e + 1, position, element[e]);
                    }
                    position++;
                };
                console.log(tempfile);
                workbook.save(function(ok) {
                    console.log(ok);
                    cb(tempfile.url);
                });
            });
        });

    }
};

module.exports = Utils;