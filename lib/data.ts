// Product Categories and Data - Edit this file to add/modify products

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  weight?: string;
  inStock: boolean;
  featured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  productCount: number;
}

const PLACEHOLDER_IMAGE_HOST = "https://via.placeholder.com/";

const LOCAL_PRODUCT_IMAGE_BY_NAME: Record<string, string> = {
  "chia seeds": "/products/assets/seeds/chia-seeds.png",
  "mix seeds": "/products/assets/seeds/mix-seed.png",
  "pumpkin seeds": "/products/assets/seeds/pumpkin-seeds.png",
  "quinoa seeds": "/products/assets/seeds/quinoa-seeds.png",
  "ragi seeds": "/products/assets/seeds/ragi-seeds.png",
  "red quinoa seeds": "/products/assets/seeds/red-quinoa-seeds.png",
  "mixed herbs": "/products/assets/herbs-and-flakes/mix-herbs.png",
  "oregano flakes": "/products/assets/herbs-and-flakes/oregano.png",
  rosemary: "/products/assets/herbs-and-flakes/rosemary.png",
  basil: "/products/assets/herbs-and-flakes/basil.png",
  parsley: "/products/assets/herbs-and-flakes/parsley.png",
  sage: "/products/assets/herbs-and-flakes/sage.png",
  "premium potato powder": "/products/assets/everyday-ingredients/premium-potato-powder.png",
  "tomato powder": "/products/assets/everyday-ingredients/tomato-powder.png",
  "white onion powder": "/products/assets/everyday-ingredients/white-onion-powder.png",
  "garlic powder": "/products/assets/everyday-ingredients/garlic-powder.png",
  "pink onion powder": "/products/assets/everyday-ingredients/pink-onion-powder.png",
  "red onion powder": "/products/assets/everyday-ingredients/red-onion-powder.png",
  "pizza spice mix": "/products/assets/seasoning-and-spices/pizza-spice-mix.png",
  "peri peri seasoner": "/products/assets/seasoning-and-spices/peri-peri-seasoning.png",
  "oregano herbs & spices": "/products/assets/seasoning-and-spices/oregano-seasoning.png",
  "pizza spice mix premium": "/products/assets/seasoning-and-spices/pizza-spice-mix-premium.png",
  "garam masala": "/products/assets/seasoning-and-spices/chaat-masala.png",
  "cumin powder": "/products/assets/seasoning-and-spices/all-in-one-seasoning.png",
  "coriander powder": "/products/assets/seasoning-and-spices/rajma-masala.png",
  "turmeric powder": "/products/assets/seasoning-and-spices/chai-masala.png",
  "black currant": "/products/assets/seasoning-and-spices/chaat-masala.png",
  "green escort mixture": "/products/assets/seasoning-and-spices/momos-seasoning.png",
  "mix fruit candy": "/products/assets/seasoning-and-spices/pasta-mix.png",
  "ram ladoo": "/products/assets/seasoning-and-spices/raita-masala.png",
  "royal fresh mix 2": "/products/assets/seasoning-and-spices/all-in-one-seasoning.png",
  "royal fresh mix": "/products/assets/seasoning-and-spices/pasta-mix.png",
};

function resolveProductImageFromAssets(name: string): string | null {
  const key = name.trim().toLowerCase();
  return LOCAL_PRODUCT_IMAGE_BY_NAME[key] ?? null;
}

export function getResolvedProductImage(product: Pick<Product, "name" | "image">): string {
  // Replace placeholder image URLs with local asset files mapped by product name.
  if (product.image.startsWith(PLACEHOLDER_IMAGE_HOST)) {
    return resolveProductImageFromAssets(product.name) ?? "/placeholder.jpg";
  }

  return product.image;
}

// Categories - Add or modify categories here
export const categories: Category[] = [
  {
    id: "1",
    name: "Seasoning & Spices",
    slug: "seasoning-spices",
    description: "Premium quality spices and seasonings for authentic flavors",
    image: "https://static.vecteezy.com/system/resources/thumbnails/024/692/064/small_2x/ai-generated-ai-generative-set-of-different-indian-spices-for-meny-food-tasty-graphic-art-photo.jpg",
    productCount: 24,
  },
  {
    id: "2",
    name: "Sachets",
    slug: "sachets",
    description: "Convenient single-use spice sachets for perfect portions",
    image: "https://larmindia.in/wp-content/uploads/2026/02/2.png",
    productCount: 18,
  },
  {
    id: "3",
    name: "Herbs & Flakes",
    slug: "herbs-flakes",
    description: "Fresh dried herbs and flakes for garnishing and cooking",
    image: "https://larmindia.in/wp-content/uploads/2026/02/CF-B60.jpg",
    productCount: 15,
  },
  {
    id: "4",
    name: "Everyday Ingredients",
    slug: "everyday-ingredients",
    description: "Essential kitchen ingredients for daily cooking needs",
    image: "https://imgs.search.brave.com/GOekles5FTh-WNuqUhIE5EcIg9J-oiR0D5g8jg5tICA/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMjMx/MDU1My9wZXhlbHMt/cGhvdG8tMjMxMDU1/My5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA",
    productCount: 30,
  },
  {
    id: "5",
    name: "Mouth Fresheners",
    slug: "mouth-fresheners",
    description: "Traditional and modern mouth fresheners and digestives",
    image: "https://imgs.search.brave.com/jEKL_LFVqY5savY8Lik7JPAALNL4QY6igP90yS7sk3U/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly93d3cu/b3Vyb2lseWhvdXNl/LmNvbS93cC1jb250/ZW50L3VwbG9hZHMv/MjAyMS8wOC9ob21l/bWFkZS1tb3V0aC1m/cmVzaGVuZXItc3By/YXktMi5qcGc",
    productCount: 12,
  },
  {
    id: "6",
    name: "Seeds",
    slug: "seeds",
    description: "High-quality seeds for cooking and health benefits",
    image: "https://imgs.search.brave.com/L9pXKAkNKg6gSctEk3TydvoXO9pccYAeLrMMdGy6lhQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9uYXRp/dmVpbmRpYW5vcmdh/bmljcy5jb20vY2Ru/L3Nob3AvZmlsZXMv/b3JnYW5pY19zZWVk/cy53ZWJwP3Y9MTc2/Nzc2MTk4NyZ3aWR0/aD0yMDAw",
    productCount: 20,
  },
];

// Products - Add or modify products here
export const products: Product[] = [
  // Seeds Category
  {
    id: "p1",
    name: "Chia Seeds",
    description: "Our Chia Seeds, packed with omega-3 fatty acids, fiber, protein, and antioxidants. Perfect for adding a crunchy texture and nutty flavor to smoothies, oatmeal, salads, and baked goods.",
    price: 299,
    image: "https://via.placeholder.com/300x300?text=Chia+Seeds",
    category: "seeds",
    weight: "120gms",
    inStock: true,
    featured: true,
  },
  {
    id: "p2",
    name: "Mix Seeds",
    description: "Our Mix Seed blend, a powerful combination of flaxseeds, sesame seeds, sunflower seeds, and pumpkin seeds. Rich with essential vitamins, minerals, and omega-3 fatty acids, this mix adds a nutritious crunch to salads, cereals, yogurt, and baked goods.",
    price: 349,
    image: "https://via.placeholder.com/300x300?text=Mix+Seeds",
    category: "seeds",
    weight: "150gms",
    inStock: true,
    featured: true,
  },
  {
    id: "p3",
    name: "Pumpkin Seeds",
    description: "Our Pumpkin Seeds, rich in protein, fiber, and essential nutrients like magnesium, zinc, and iron. Whether enjoyed on their own as a crunchy snack or sprinkled over salads, soups, or baked goods, these seeds add a nutritious boost to your diet.",
    price: 329,
    image: "https://via.placeholder.com/300x300?text=Pumpkin+Seeds",
    category: "seeds",
    weight: "130gms",
    inStock: true,
  },
  {
    id: "p4",
    name: "Quinoa Seeds",
    description: "Our Quinoa Seeds, packed with protein, fiber, and essential vitamins and minerals. Perfect for adding a nutty flavor and fluffy texture to salads, soups, stir-fries and pilaf. Quinoa is a versatile and nutrient-rich staple for any kitchen.",
    price: 399,
    image: "https://via.placeholder.com/300x300?text=Quinoa+Seeds",
    category: "seeds",
    weight: "150gms",
    inStock: true,
  },
  {
    id: "p5",
    name: "Ragi Seeds",
    description: "Our Ragi Seeds, a gluten-free whole grain rich in calcium, iron, and dietary fiber. Whether used to make porridge, pancakes, bread, or baked goods, ragi adds a hearty flavor and hearty texture to your favorite recipes.",
    price: 349,
    image: "https://via.placeholder.com/300x300?text=Ragi+Seeds",
    category: "seeds",
    weight: "150gms",
    inStock: true,
  },
  {
    id: "p6",
    name: "Red Quinoa Seeds",
    description: "Our Red Quinoa Seeds, a versatile and nutrient-rich whole grain. Perfect for salads, soups, stir-fries, pilaf, and more. Red quinoa adds a slightly nutty and chewy texture to your favorite dishes.",
    price: 429,
    image: "https://via.placeholder.com/300x300?text=Red+Quinoa",
    category: "seeds",
    weight: "200gms",
    inStock: true,
    featured: true,
  },
  
  // Herbs & Flakes Category
  {
    id: "p7",
    name: "Mixed Herbs",
    description: "Our premium Mixed Herbs blend, carefully curated to elevate your dishes with a harmonious combination of parsley, basil, oregano, rosemary, thyme, sage, marjoram, and a hint of chili flakes.",
    price: 149,
    image: "https://via.placeholder.com/300x300?text=Mixed+Herbs",
    category: "herbs-flakes",
    weight: "50gms",
    inStock: true,
    featured: true,
  },
  {
    id: "p8",
    name: "Oregano Flakes",
    description: "Our fragrant Oregano, boasting a robust flavor profile with earthy undertones and a subtle hint of mint. Perfect for seasoning pizzas, pasta sauces, grilled meats, and roasted vegetables.",
    price: 129,
    image: "https://via.placeholder.com/300x300?text=Oregano+Flakes",
    category: "herbs-flakes",
    weight: "50gms",
    inStock: true,
  },
  {
    id: "p9",
    name: "Rosemary",
    description: "Renowned for its piney aroma and bold, peppery flavor. Whether used to season roasted potatoes, grilled meats, or homemade bread, our rosemary adds an aromatic flourish to any recipe.",
    price: 189,
    image: "https://via.placeholder.com/300x300?text=Rosemary",
    category: "herbs-flakes",
    weight: "500gms",
    inStock: true,
  },
  {
    id: "p10",
    name: "Basil",
    description: "Our Basil, prized for its sweet, peppery flavor profile with hints of clove and anise. Ideal for infusing Italian-inspired dishes, sauces, pesto's, and even fresh summer salads.",
    price: 179,
    image: "https://via.placeholder.com/300x300?text=Basil",
    category: "herbs-flakes",
    weight: "500gms",
    inStock: true,
  },
  {
    id: "p11",
    name: "Parsley",
    description: "Our vibrant Parsley, known for its fresh, slightly peppery flavor. Whether sprinkled over salads, garnishing soups, or enhancing pasta dishes, our parsley adds a burst of color and freshness to any culinary creation.",
    price: 159,
    image: "https://via.placeholder.com/300x300?text=Parsley",
    category: "herbs-flakes",
    weight: "500gms",
    inStock: true,
  },
  {
    id: "p12",
    name: "Sage",
    description: "Our fragrant Sage, prized for its warm, savory flavor profile with hints of eucalyptus and citrus. Whether used to flavor stuffing, roasted meats, or creamy sauces, our sage adds depth and complexity to any recipe.",
    price: 169,
    image: "https://via.placeholder.com/300x300?text=Sage",
    category: "herbs-flakes",
    weight: "500gms",
    inStock: true,
  },
  
  // Everyday Ingredients Category
  {
    id: "p13",
    name: "Premium Potato Powder",
    description: "Made from high-quality potatoes finely ground to perfection. Versatile and easy to use, this powder is perfect for thickening soups, sauces, and gravies, as well as for making fluffy mashed potatoes, potato pancakes, and more.",
    price: 249,
    image: "https://via.placeholder.com/300x300?text=Potato+Powder",
    category: "everyday-ingredients",
    weight: "1kg",
    inStock: true,
    featured: true,
  },
  {
    id: "p14",
    name: "Tomato Powder",
    description: "Made from premium quality tomatoes dried and ground into a fine powder. Ideal for adding depth and richness to soups, stews, sauces, and pasta dishes, this powder is a pantry essential for any culinary enthusiast.",
    price: 269,
    image: "https://via.placeholder.com/300x300?text=Tomato+Powder",
    category: "everyday-ingredients",
    weight: "1kg",
    inStock: true,
  },
  {
    id: "p15",
    name: "White Onion Powder",
    description: "Made from finely ground white onions. Perfect for seasoning meats, vegetables, soups, and dips, this powder adds a burst of oniony goodness to any recipe without the hassle of chopping onions.",
    price: 219,
    image: "https://via.placeholder.com/300x300?text=White+Onion",
    category: "everyday-ingredients",
    weight: "1kg",
    inStock: true,
  },
  {
    id: "p16",
    name: "Garlic Powder",
    description: "Made from pure, dehydrated garlic cloves. Versatile and easy to use, this powder is perfect for seasoning meats, vegetables, soups, marinades, and dressings, adding depth and complexity to every dish.",
    price: 239,
    image: "https://via.placeholder.com/300x300?text=Garlic+Powder",
    category: "everyday-ingredients",
    weight: "1kg",
    inStock: true,
    featured: true,
  },
  {
    id: "p17",
    name: "Pink Onion Powder",
    description: "Crafted from premium quality pink onions dried and ground to perfection. Ideal for adding a mild, sweet onion flavor to sauces, dips, marinades, this powder is a versatile ingredient in any kitchen.",
    price: 229,
    image: "https://via.placeholder.com/300x300?text=Pink+Onion",
    category: "everyday-ingredients",
    weight: "1kg",
    inStock: true,
  },
  {
    id: "p18",
    name: "Red Onion Powder",
    description: "Made from finely ground red onions with a distinctive sweet and tangy taste. Perfect for seasoning meats, salads, soups, and sauces, this powder adds a burst of color and flavor to your favorite recipes.",
    price: 239,
    image: "https://via.placeholder.com/300x300?text=Red+Onion",
    category: "everyday-ingredients",
    weight: "1kg",
    inStock: true,
  },
  
  // Mouth Fresheners Category
  {
    id: "p19",
    name: "Black Currant",
    description: "Our Black Currant, bursting with juicy goodness and natural antioxidants. Whether enjoyed on its own as a nutritious snack or added to cereals, yogurt, or baked goods, these dried black currants are a delicious and versatile treat.",
    price: 199,
    image: "https://via.placeholder.com/300x300?text=Black+Currant",
    category: "mouth-fresheners",
    weight: "175gms",
    inStock: true,
  },
  {
    id: "p20",
    name: "Green Escort Mixture",
    description: "Our Green Escort Mixture, a tantalizing blend of roasted nuts, seeds, and spices. Whether enjoyed as a nutritious snack on its own or sprinkled over salads, soups, or stir-fries, this mixture adds a burst of flavor and crunch to any dish.",
    price: 219,
    image: "https://via.placeholder.com/300x300?text=Green+Escort",
    category: "mouth-fresheners",
    weight: "175gms",
    inStock: true,
    featured: true,
  },
  {
    id: "p21",
    name: "Mix Fruit Candy",
    description: "Our delightful Mix Fruit Candy, featuring an assortment of fruity flavors in every bite. Made from real fruit juices and natural ingredients, these candies are perfect for satisfying your sweet cravings anytime, anywhere.",
    price: 189,
    image: "https://via.placeholder.com/300x300?text=Mix+Fruit+Candy",
    category: "mouth-fresheners",
    weight: "175gms",
    inStock: true,
  },
  {
    id: "p22",
    name: "Ram Ladoo",
    description: "Our Ram Ladoo mix, perfect for preparing crispy and flavorful lentil fritters at home. Simply mix with water and fry to golden perfection, then serve with tangy chutneys for a delicious snack or appetizer.",
    price: 209,
    image: "https://via.placeholder.com/300x300?text=Ram+Ladoo",
    category: "mouth-fresheners",
    weight: "175gms",
    inStock: true,
  },
  {
    id: "p23",
    name: "Royal Fresh Mix 2",
    description: "Our Royal Fresh Mix 2, a delightful blend of toasted nuts, dried fruits, and savory spices. Whether enjoyed as a wholesome snack on its own or to trail mixes, salads, or desserts, this mix is fit for royalty.",
    price: 229,
    image: "https://via.placeholder.com/300x300?text=Royal+Fresh+Mix+2",
    category: "mouth-fresheners",
    weight: "175gms",
    inStock: true,
  },
  {
    id: "p24",
    name: "Royal Fresh Mix",
    description: "Our Royal Fresh Mix, a luxurious combination of premium nuts, dried fruits, and exotic spices. Perfect for entertaining guests or enjoying a moment of indulgence, this mix is delicious and satisfying snack for any occasion.",
    price: 239,
    image: "https://via.placeholder.com/300x300?text=Royal+Fresh+Mix",
    category: "mouth-fresheners",
    weight: "175gms",
    inStock: true,
    featured: true,
  },
  
  // Seasoning & Spices - Premium items
  {
    id: "p25",
    name: "Pizza Spice Mix",
    description: "Our signature Pizza Spice Mix blend, perfect for creating authentic pizza flavors at home. A careful combination of oregano, basil, and Italian herbs that brings restaurant-quality taste to your kitchen.",
    price: 199,
    image: "https://via.placeholder.com/300x300?text=Pizza+Spice+Mix",
    category: "seasoning-spices",
    weight: "1kg",
    inStock: true,
    featured: true,
  },
  {
    id: "p26",
    name: "Peri Peri Seasoner",
    description: "Fiery and flavorful Peri Peri Seasoner, expertly crafted from premium quality chili peppers and aromatic spices. Perfect for adding a spicy kick to grilled meats, marinades, and your favorite dishes.",
    price: 349,
    image: "https://via.placeholder.com/300x300?text=Peri+Peri+Seasoner",
    category: "seasoning-spices",
    weight: "100g",
    inStock: true,
    featured: true,
  },
  {
    id: "p27",
    name: "Oregano Herbs & Spices",
    description: "Premium Oregano Herbs & Spices blend, featuring fragrant oregano combined with complementary spices. Ideal for pizzas, pastas, Mediterranean dishes, and all your Italian-inspired recipes.",
    price: 189,
    image: "https://via.placeholder.com/300x300?text=Oregano+Herbs",
    category: "seasoning-spices",
    weight: "100g",
    inStock: true,
  },
  {
    id: "p28",
    name: "Pizza Spice Mix Premium",
    description: "Our Premium Pizza Spice Mix, a more concentrated blend of carefully selected Italian herbs and spices. Delivers intense flavor with every sprinkle, perfect for authentic Pizzeria-style pizzas.",
    price: 249,
    image: "https://via.placeholder.com/300x300?text=Pizza+Spice+Premium",
    category: "seasoning-spices",
    weight: "500g",
    inStock: true,
    featured: true,
  },
  {
    id: "p29",
    name: "Garam Masala",
    description: "A warming blend of ground spices, perfect for curries and stews",
    price: 149,
    image: "https://via.placeholder.com/300x300?text=Garam+Masala",
    category: "seasoning-spices",
    weight: "100g",
    inStock: true,
  },
  {
    id: "p30",
    name: "Cumin Powder",
    description: "Freshly ground cumin seeds for aromatic dishes",
    price: 129,
    image: "https://via.placeholder.com/300x300?text=Cumin+Powder",
    category: "seasoning-spices",
    weight: "100g",
    inStock: true,
  },
  {
    id: "p31",
    name: "Coriander Powder",
    description: "Premium ground coriander for authentic Indian flavors",
    price: 119,
    image: "https://via.placeholder.com/300x300?text=Coriander+Powder",
    category: "seasoning-spices",
    weight: "100g",
    inStock: true,
  },
  {
    id: "p32",
    name: "Turmeric Powder",
    description: "Pure golden turmeric with high curcumin content",
    price: 139,
    image: "https://via.placeholder.com/300x300?text=Turmeric+Powder",
    category: "seasoning-spices",
    weight: "200g",
    inStock: true,
  },
];

// Helper functions
export function getProductsByCategory(categorySlug: string): Product[] {
  return products.filter((product) => product.category === categorySlug);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured);
}

export function getProductById(id: string): Product | undefined {
  return products.find((product) => product.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}
