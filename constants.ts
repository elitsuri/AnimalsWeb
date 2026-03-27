import { Restaurant } from './types';

export const CATEGORIES = [
  { id: 'all', name: 'הכל', icon: '🍽️' },
  { id: 'pizza', name: 'פיצה', icon: '🍕' },
  { id: 'burger', name: 'המבורגר', icon: '🍔' },
  { id: 'sushi', name: 'סושי', icon: '🍣' },
  { id: 'asian', name: 'אסייתי', icon: '🍜' },
  { id: 'vegan', name: 'טבעוני', icon: '🥗' },
  { id: 'dessert', name: 'קינוחים', icon: '🍰' },
];

export const MOCK_RESTAURANTS: Restaurant[] = [
  {
    id: '1',
    name: 'פיצה דון פרדו',
    rating: 4.8,
    deliveryTime: '30-45 דק\'',
    deliveryFee: 15,
    minOrder: 60,
    tags: ['איטלקי', 'פיצה'],
    image: 'https://picsum.photos/800/600?random=1',
    categories: [
      {
        id: 'c1',
        name: 'פיצות',
        items: [
          { id: 'p1', name: 'מרגריטה קלאסית', description: 'רוטב עגבניות, מוצרלה ובזיליקום', price: 54, image: 'https://picsum.photos/200/200?random=11', isVegetarian: true },
          { id: 'p2', name: 'פפרוני ספיישל', description: 'רוטב עגבניות, מוצרלה ופפרוני פיקנטי', price: 68, image: 'https://picsum.photos/200/200?random=12' },
        ]
      },
      {
        id: 'c2',
        name: 'שתייה',
        items: [
          { id: 'd1', name: 'קוקה קולה', description: 'בקבוק זכוכית 330 מ"ל', price: 12, image: 'https://picsum.photos/200/200?random=13' },
        ]
      }
    ]
  },
  {
    id: '2',
    name: 'בורגר האוס',
    rating: 4.5,
    deliveryTime: '25-40 דק\'',
    deliveryFee: 20,
    minOrder: 80,
    tags: ['בשר', 'המבורגר'],
    image: 'https://picsum.photos/800/600?random=2',
    categories: [
      {
        id: 'c3',
        name: 'עיקריות',
        items: [
          { id: 'b1', name: 'המבורגר קלאסי', description: '220 גרם בקר, חסה, עגבניה ומלפפון חמוץ', price: 62, image: 'https://picsum.photos/200/200?random=21' },
          { id: 'b2', name: 'צ\'יזבורגר כפול', description: 'פעמיים בשר וגבינת צ\'דר מותכת', price: 78, image: 'https://picsum.photos/200/200?random=22' },
        ]
      }
    ]
  },
  {
    id: '3',
    name: 'סושי יוקו',
    rating: 4.9,
    deliveryTime: '40-60 דק\'',
    deliveryFee: 10,
    minOrder: 100,
    tags: ['אסייתי', 'סושי', 'דגים'],
    image: 'https://picsum.photos/800/600?random=3',
    categories: [
      {
        id: 'c4',
        name: 'רולים מיוחדים',
        items: [
          { id: 's1', name: 'סלמון אבוקדו', description: 'אורז, סלמון נא, אבוקדו ושומשום', price: 42, image: 'https://picsum.photos/200/200?random=31' },
          { id: 's2', name: 'ספייסי טונה', description: 'טונה אדומה קצוצה, מיונז חריף ובצל ירוק', price: 46, image: 'https://picsum.photos/200/200?random=32', isSpicy: true },
        ]
      }
    ]
  },
  {
    id: '4',
    name: 'גרין בול',
    rating: 4.7,
    deliveryTime: '15-25 דק\'',
    deliveryFee: 12,
    minOrder: 50,
    tags: ['בריאות', 'סלטים', 'טבעוני'],
    image: 'https://picsum.photos/800/600?random=4',
    categories: [
      {
        id: 'c5',
        name: 'סלטים',
        items: [
          { id: 'g1', name: 'סלט קינואה', description: 'קינואה, חמוציות, אגוזי מלך ורוטב ויניגרט', price: 52, image: 'https://picsum.photos/200/200?random=41', isVegetarian: true },
        ]
      }
    ]
  }
];
