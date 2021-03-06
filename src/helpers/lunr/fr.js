//@flow

/* remove apostrophe contraction (t'aime => aime; l'elastique => elastique) */
export const 
removeApostrophe = (str: string): string => str.replace(/^.('|’)/, '');

export const
stopWords = [
	'',
	':',
	',',
	'.',
  'alors',
  'au',
  'aucuns',
  'aussi',
  'autre',
  'avant',
  'avec',
  'avoir',
  'bon',
  'car',
  'ce',
  'cela',
  'ces',
  'ceux',
  'chaque',
  'ci',
  'comme',
  'comment',
  'dans',
  'de',
  'dedans',
  'dehors',
  'depuis',
  'des',
  'deux',
  'devrait',
  'doit',
  'donc',
  'dos',
  'droite',
  'du',
  'début',
  'elle',
  'elles',
  'en',
  'encore',
  'et',
  'eu',
  'fait',
  'faites',
  'fois',
  'font',
  'hors',
  'ici',
  'il',
  'ils',
  'je',
  'la',
  'le',
  'les',
  'leur',
  'là',
  'ma',
  'maintenant',
  'mais',
  'mes',
  'mien',
  'moins',
  'mon',
  'mot',
  'même',
  'ni',
  'notre',
  'nous',
  'ou',
  'où',
  'par',
  'parce',
  'pas',
  'personnes',
  'peu',
  'peut',
  'plupart',
  'pour',
  'pourquoi',
  'quand',
  'que',
  'quel',
  'quelle',
  'quelles',
  'quels',
  'qui',
  'sa',
  'sans',
  'ses',
  'seulement',
  'si',
  'sien',
  'son',
  'sont',
  'sous',
  'soyez',
  'sujet',
  'sur',
  'ta',
  'tandis',
  'tellement',
  'tels',
  'tes',
  'ton',
  'tous',
  'tout',
  'trop',
  'très',
  'tu',
  'voie',
  'voient',
  'vont',
  'votre',
  'vous',
  'vu',
  'ça',
  'étaient',
  'état',
  'étions',
  'été',
  'être'
];
