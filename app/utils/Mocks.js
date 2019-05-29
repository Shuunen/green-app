export const formulas = [
  {
    title: 'Green Rush',
    price: 9.4,
    picks: [
      {
        pick: 1,
        from: 'bases',
      },
      {
        pick: 3,
        from: 'ingredients',
        extraPrice: 1,
      },
      {
        pick: 1,
        from: 'sauces',
      },
    ],
    icon: 'formulas',
  },
  {
    title: 'Green Hot',
    price: 9.9,
    picks: [
      {
        pick: 1,
        from: 'bases',
      },
      {
        pick: 2,
        from: 'ingredients',
        extraPrice: 1,
      },
      {
        pick: 1,
        from: 'sauces',
      },
      {
        pick: 1,
        from: 'wraps',
        or: 'soups',
      },
    ],
    icon: 'formulas',
  },
  {
    title: 'Green Life',
    price: 11.4,
    picks: [
      {
        pick: 1,
        from: 'bases',
      },
      {
        pick: 3,
        from: 'ingredients',
        extraPrice: 1,
      },
      {
        pick: 1,
        from: 'sauces',
      },
      {
        pick: 1,
        from: 'drinks',
        or: 'deserts',
      },
    ],
    icon: 'formulas',
  },
  {
    title: 'Green Winter',
    price: 11.6,
    picks: [
      {
        pick: 1,
        from: 'bases',
      },
      {
        pick: 2,
        from: 'ingredients',
        extraPrice: 1,
      },
      {
        pick: 1,
        from: 'sauces',
      },
      {
        pick: 1,
        from: 'soups',
        or: 'wraps',
      },
      {
        pick: 1,
        from: 'drinks',
        or: 'deserts',
      },
    ],
    icon: 'formulas',
  },
  {
    title: 'Green Love',
    price: 12.9,
    picks: [
      {
        pick: 1,
        from: 'bases',
      },
      {
        pick: 3,
        from: 'ingredients',
        extraPrice: 1,
      },
      {
        pick: 1,
        from: 'sauces',
      },
      {
        pick: 1,
        from: 'drinks',
      },
      {
        pick: 1,
        from: 'deserts',
      },
    ],
    icon: 'formulas',
  },
]

export const items = {
  bases: [
    {
      title: 'Cœur de romaine',
      value: 'base-coeur-romaine',
    },
    {
      title: 'Endives',
      value: 'base-endives',
    },
    {
      title: 'Iceberg',
      value: 'base-iceberg',
    },
    {
      title: 'Perle de blé',
      value: 'base-perle-ble',
    },
    {
      title: 'Pâtes au basilic',
      value: 'base-pates-basilic',
    },
  ],
  ingredients: [
    {
      title: 'Emmental',
      value: 'ingredient-emmental',
    },
    {
      title: 'Bleu d’Auvergne',
      value: 'ingredient-bleu-auvergne',
    },
    {
      title: 'Mozzarella',
      value: 'ingredient-mozzarella',
    },
    {
      title: 'Fromage de chèvre',
      value: 'ingredient-fromage-chevre',
    },
    {
      title: 'Parmesan',
      value: 'ingredient-parmesan',
    },
    {
      title: 'Carottes',
      value: 'ingredient-carottes',
    },
    {
      title: 'Champignons',
      value: 'ingredient-champignons',
    },
    {
      title: 'Maïs',
      value: 'ingredient-mais',
    },
    {
      title: 'Tartare de courgettes',
      value: 'ingredient-tartare-courgettes',
    },
    {
      title: 'Haricots verts',
      value: 'ingredient-haricots-verts',
    },
    {
      title: 'Tomates',
      value: 'ingredient-tomates',
    },
    {
      title: 'Fèves',
      value: 'ingredient-feves',
    },
    {
      title: 'Betteraves',
      value: 'ingredient-betteraves',
    },
    {
      title: '3 poivrons',
      value: 'ingredient-3-poivrons',
    },
    {
      title: 'Cœurs d’artichauts',
      value: 'ingredient-coeurs-artichauts',
    },
    {
      title: 'Duo olives vertes / noires',
      value: 'ingredient-duo-olives',
    },
    {
      title: 'Thon',
      value: 'ingredient-thon',
    },
    {
      title: 'Noix',
      value: 'ingredient-noix',
    },
    {
      title: 'Croutons',
      value: 'ingredient-croutons',
    },
    {
      title: 'Oignons fris',
      value: 'ingredient-oignons-fris',
    },
    {
      title: 'Oeufs durs',
      value: 'ingredient-oeufs-durs',
    },
    {
      title: 'Tomates séchées',
      value: 'ingredient-tomates-sechees',
    },
    {
      title: 'Aubergines grillées',
      value: 'ingredient-aubergines-grillees',
    },
    {
      title: 'Poulet',
      value: 'ingredient-poulet',
    },
    {
      title: 'Jambon blanc',
      value: 'ingredient-jambon-blanc',
    },
    {
      title: 'Chorizo',
      value: 'ingredient-chorizo',
    },
    {
      title: 'Bacon',
      value: 'ingredient-bacon',
    },
    {
      title: 'Pois chiche',
      value: 'ingredient-pois-chiche',
    },
    {
      title: 'Pomme',
      value: 'ingredient-pomme',
    },
    {
      title: 'Poire',
      value: 'ingredient-poire',
    },
    {
      title: 'Kiwi',
      value: 'ingredient-kiwi',
    },
    {
      title: 'Banane',
      value: 'ingredient-banane',
    },
    {
      title: 'Ananas',
      value: 'ingredient-ananas',
    },
  ],
  sauces: [
    {
      title: `Huile d'olive seule`,
      value: 'sauce-huile-olive',
    },
    {
      title: 'Jus de citron seul',
      value: 'sauce-jus-citron',
      icon: 'sauces.jpg',
    },
    {
      title: 'Française',
      content: 'vinaigrette classique',
      value: 'sauce-francaise',
      icon: 'sauces.jpg',
    },
    {
      title: 'Allégée',
      content: 'vinaigrette allégée',
      value: 'sauce-allegee',
      icon: 'sauces.jpg',
    },
    {
      title: 'Caesar',
      content: 'crème, parmesan',
      value: 'sauce-caesar',
      icon: 'sauces.jpg',
    },
    {
      title: 'Bulgare',
      content: 'vinaigrette, fromage blanc, citron',
      value: 'sauce-bulgare',
      icon: 'sauces.jpg',
    },
    {
      title: 'Provencale',
      content: 'vinaigrette, herbes de provence',
      value: 'sauce-provencale',
      icon: 'sauces.jpg',
    },
    {
      title: 'Balsamique',
      content: 'huile d’olive, vinaigre balsamique',
      value: 'sauce-balsamique',
      icon: 'sauces.jpg',
    },
    {
      title: 'Marinade',
      content: 'huile d’olive, citron',
      value: 'sauce-marinade',
      icon: 'sauces.jpg',
    },
    {
      title: 'Andalouse',
      content: 'vinaigrette, tomates, poivrons, épices',
      value: 'sauce-andalouse',
      icon: 'sauces.jpg',
    },
    {
      title: 'Asia',
      content: 'huile de pépin de raisin, sauce soja sucrée, graine de lin, paprika',
      value: 'sauce-asia',
      icon: 'sauces.jpg',
    },
    {
      title: 'Miel moutarde',
      content: 'miel, moutarde',
      value: 'sauce-miel-moutarde',
      icon: 'sauces.jpg',
    },
    {
      title: 'Harissa',
      value: 'sauce-harissa',
      icon: 'sauces.jpg',
    },
    {
      title: 'Curry',
      value: 'sauce-curry',
      icon: 'sauces.jpg',
    },
  ],
  soups: [
    {
      title: 'Velouté De Brocoli',
      value: 'soup-brocoli',
      icon: 'soups.jpg',
    },
    {
      title: 'Soupe De Potiron',
      value: 'soup-potiron',
      icon: 'soups.jpg',
    },
  ],
  wraps: [
    {
      title: 'wrap du jour',
      value: 'wrap-jour',
      icon: 'wraps.jpg',
    },
  ],
  drinks: [
    {
      title: 'Coca Cola',
      value: 'drink-coca',
    },
    {
      title: 'Coca Zéro',
      value: 'drink-coca-zero',
    },
  ],
  deserts: [
    {
      title: 'Tarte Citron Meringuée',
      value: 'desert-tarte-citron',
    },
    {
      title: 'Compote De Pomme',
      value: 'desert-compote-pomme',
    },
  ],
}
