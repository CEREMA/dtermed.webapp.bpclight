Medical={
	getAll: function(o,cb)
	{
		Medical.using('db').model('bpclight','select medic_dossiers.id,date,medic_type.type,medic_cat.cat from medic_dossiers join medic_type on medic_type.id=medic_dossiers.type join medic_cat on medic_cat.id=medic_dossiers.cat where kage='+o.kage+' order by medic_dossiers.date desc',cb);
	},
	printme: function(o,cb)
	{
		Medical.using('db').query('bpclight','select medic_dossiers.*,medic_type.*,medic_cat.*,agents.*,medic_gen.* from medic_dossiers left join medic_type on medic_type.id=medic_dossiers.type left join medic_cat on medic_cat.id=medic_dossiers.cat left join medic_gen on medic_gen.kage=medic_dossiers.kage left join agents on agents.kage=medic_dossiers.kage where medic_dossiers.id='+o.kid+' order by medic_dossiers.date desc',function(e,r){
			console.log(e);
			console.log(r);
			if (r.length==0) {
			cb('NOT_FOUND',null);
			} else {
				r=r[0];
				var html=[
				"<html>",
				"<head>",
				"<meta charset=\"UTF-8\">",
				"<style>",
				//"html{-webkit-print-color-adjust:exact;zoom:255%;}",
				"h1{font-family:tahoma;font-size:20px;border-bottom:2px solid black;background-color:#EEEEEE}",
				"h2{font-family:tahoma;font-size:16px;border-bottom:1px dashed black;background-color:white}",
				".commentaire{font-family:tahoma;font-size:12px}",
				".mesure{font-family:tahoma;font-size:14px;border-bottom:1px solid #DDDDDD}",
				".page{font-family:tahoma;font-size:10px;text-align:right;width:100%}",
				"</style>",
				"<title>Dossier médical : "+r.Nom+" "+r.Prenom+"</title>",
				"</head>",
				"<body><br><br>"
				];
				var tabac=["Non fumeur","< 10 cigarettes/jour","> 10 cigarettes/jour","> 1 paquet/jour","Fumeur repenti"];
				var alcool=["Pas d'alcool","Occasionnel","1 à 2 verres/jour","> 2 verres/jour"];
				var sport=["Pas de sport","Occasionnel","Régulier","Compétition"];
				var conclusion=["-","Compatible","Compatible avec aménagement","Compatible avec restriction","Incompatibilité temporaire","Incompatibilité au poste","Incompatibilité à tous les postes","Pas d'avis ce jour"];
				var orientations=["-","Médecin traitant","Cardiologue","Pneumologue","Dermatologue","ORL","Ophtalmologue","Gynécologue","Autres médecins","Assistance sociale","MDPH"];
				var clinique=["Cardio","Locomoteur","Neurologique","Digestif","Psychisme","Autres"];
				function getOrientations(tab) {
					tab=JSON.parse(tab);
					var str=[];
					for (var i=0;i<tab.length;i++) {
						str.push(orientations[tab[i]]);
					};
					return str.join(', ');
				};
				function getClinique(tab) {
					try {
					tab=JSON.parse(tab);
					var str=[];
					for (var i=0;i<tab.length;i++) {
						str.push(clinique[tab[i]]);
					};
					return str.join(', ');
					} catch(e) {
						return "";
					}
				};				
				html.push('<h1>'+r.Nom+" "+r.Prenom+'</h1>');
				html.push('<div class=page>Page 1/2</div>');
				html.push('<div class="commentaire">Type de visite : '+r.type+'</div>');
				html.push('<div class="commentaire">Catégorie : '+r.cat+'</div>');
				html.push('<div class="commentaire">Date : '+r.date+'</div>');
				html.push('<h2>Poste actuel</h2>');
				html.push('<div class="commentaire">'+r.poste_actuel+'</div>');
				html.push('<h2>Antécédents personnels</h2>');
				html.push('<div class="commentaire">'+r.gen_perso+'</div>');
				html.push('<h2>Antécédents familiaux</h2>');
				html.push('<div class="commentaire">'+r.gen_family+'</div>');
				html.push('<h2>Commentaires</h2>');
				html.push('<div class="commentaire">'+r.commentaires+'</div>');
				html.push('<h2>Traitements actuels</h2>');
				html.push('<div class="commentaire">'+r.traitements+'</div>');
				html.push('<h2>Divers</h2>');
				html.push('<div class="commentaire">Tabac : '+tabac[r.tabac]+'</div>');
				html.push('<div class="commentaire">Alcool : '+alcool[r.alcool]+'</div>');
				html.push('<div class="commentaire">Sport : '+sport[r.sport]+'</div>');				
				html.push('<h2>Antécédents cliniques</h2>');
				html.push('<div class="commentaire">'+getClinique(r.clinique)+'</div>');
				html.push('<h2>Orientations</h2>');
				html.push('<div class="commentaire">'+getOrientations(r.orientations)+'</div>');
				html.push('<h2>Vaccinations</h2>');
				html.push('<div class="commentaire">'+r.vaccinations+'</div>');
				html.push('<h2>Clinique</h2>');
				html.push('<div class="commentaire">'+r._clinique+'</div>');
				html.push('<h2>Conclusion</h2>');
				html.push('<div class="commentaire">'+conclusion[r.conclusions]+'</div>');	
				
				html.push('<div style="page-break-after: always;"></div>');
				
				html.push('<h1>'+r.Nom+" "+r.Prenom+'</h1>');
				html.push('<div class=page>Page 2/2</div>');
				html.push('<h2>Renseignements généraux</h2>');
				html.push('<table width=100%>');
				html.push('<tr><td><div class="mesure">Poids</div></td><td><div class="mesure">'+r.Poids+'</div></td></tr>');
				html.push('<tr><td><div class="mesure">Pouls</div></td><td><div class="mesure">'+r.Pouls+'</div></td></tr>');
				html.push('<tr><td><div class="mesure">TA</div></td><td><div class="mesure">'+r.TA+'</div></td></tr>');
				html.push('<tr><td><div class="mesure">Taille</div></td><td><div class="mesure">'+r.Taille+'</div></td></tr>');				
				html.push('</table>');
				html.push('<h2>Test EFR</h2>');
				html.push('<table width=100%>');
				html.push('<tr><td><div class="mesure">CVF</div></td><td><div class="mesure">'+r.CVF+'</div></td></tr>');
				html.push('<tr><td><div class="mesure">DEMM</div></td><td><div class="mesure">'+r.DEMM+'</div></td></tr>');
				html.push('<tr><td><div class="mesure">VEFS</div></td><td><div class="mesure">'+r.VEFS+'</div></td></tr>');
				html.push('<tr><td><div class="mesure">VEMS/CVF</div></td><td><div class="mesure">'+r.VEMS_CVF+'</div></td></tr>');				
				html.push('</table>');
				html.push('<h2>Test urinaire</h2>');
				html.push('<table width=100%>');
				html.push('<tr><td><div class="mesure">Résultat</div></td><td><div class="mesure">'+r.TU_RESULT	+'</div></td></tr>');		
				html.push('<tr><td><div class="mesure">Rq</div></td><td><div class="mesure">&nbsp;'+r.TU+'</div></td></tr>');
				html.push('</table>');
				
				html.push('<h2>Test visuel</h2>');
				html.push('<table width=100%>');
				html.push('<tr><td><div class="mesure">Anomalie</div></td><td><div class="mesure">'+r.TV_ANOMALIE	+'</div></td></tr>');		
				html.push('<tr><td><div class="mesure">Astigmatie</div></td><td><div class="mesure">'+r.TV_STIGM+'</div></td></tr>');	
				html.push('<tr><td><div class="mesure">Correction</div></td><td><div class="mesure">'+r.TV_CORRECTION+'</div></td></tr>');		
				html.push('<tr><td><div class="mesure">OD/OG</div></td><td><div class="mesure">'+r.TV_OD+'/'+r.TV_OG+'</div></td></tr>');	
				html.push('<tr><td><div class="mesure">Rq</div></td><td><div class="mesure">&nbsp;'+r.TV_RQ+'</div></td></tr>');				
				html.push('</table>');
				
				html.push('<h2>Test auditif</h2>');
				html.push('<table width=100%>');
				html.push('<tr><td><div class="mesure">Correction</div></td><td><div class="mesure">'+r.TA_CORRECTION	+'</div></td></tr>');				
				html.push('<tr><td><div class="mesure">OD/OG</div></td><td><div class="mesure">'+r.TA_ORD+'/'+r.TA_ORG+'</div></td></tr>');	
				html.push('<tr><td><div class="mesure">Rq</div></td><td><div class="mesure">&nbsp;'+r.TA_RQ+'</div></td></tr>');				
				html.push('</table>');				
				

				
				html.push('</body></html>');
				html=html.join('');
				var tmp=App.temp('html');
				require('fs').writeFileSync(tmp.path,html); 
				
				var wkhtmltopdf = Medical.using('wkhtmltopdf');
				var out=App.temp('pdf');
				var stream=require('fs').createWriteStream(out.path);
				wkhtmltopdf('http://bpclight.applications.cete-mediterranee.i2' + tmp.url,{ pageSize: 'A4',zoom: 1.33  }).pipe(stream).on('finish',function() {
					cb(out.url);
				});	
				
			}
		});
	}
};

module.exports=Medical;