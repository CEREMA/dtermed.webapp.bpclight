SELECT 	agents.kage,
		agents.Nom,
		agents.Prenom,
		agepiece.DatPie,
		agepiece.DatVal,
		agepiece.SignPie,
		agepiece.TypPie,
		catperm.CatPerm,
		agepiece.NumPie,
		unites.LibUnic,
		subdis.LibSubC
  FROM    (   (   (   bpclight.agents agents
                   INNER JOIN
                      bpclight.unites unites
                   ON (agents.Kuni = unites.Kuni))
               INNER JOIN
                  bpclight.agepiece agepiece
               ON (agepiece.Kage = agents.Kage))
           INNER JOIN
              bpclight.catperm catperm
           ON (agepiece.Kcpe = catperm.Kcpe))
       INNER JOIN
          bpclight.subdis subdis
       ON (agents.Ksub = subdis.Ksub)
WHERE
	agents.kage in ({agents})