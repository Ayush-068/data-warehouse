import { Customer, Product, Order, ClusterCentroid, SegmentName } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  { productId: 5001, productName: 'Noise-Cancelling Headphones Pro', category: 'Electronics', unitPrice: 299.99 },
  { productId: 5002, productName: 'Ultra-Slim 4K OLED Monitor 27"', category: 'Electronics', unitPrice: 449.50 },
  { productId: 5003, productName: 'Mechanical Wireless Keyboard', category: 'Electronics', unitPrice: 129.99 },
  { productId: 5004, productName: 'Precision Ergonomic Mouse', category: 'Electronics', unitPrice: 79.95 },
  { productId: 5005, productName: 'Smart Home Central Hub', category: 'Electronics', unitPrice: 189.00 },
  { productId: 5006, productName: 'Thunderbolt 4 Docking Station', category: 'Electronics', unitPrice: 219.99 },
  { productId: 5007, productName: 'All-Weather Commuter Trench Coat', category: 'Apparel', unitPrice: 220.00 },
  { productId: 5008, productName: 'Merino Wool Knit Crewneck', category: 'Apparel', unitPrice: 115.00 },
  { productId: 5009, productName: 'Performance Stretch Chino', category: 'Apparel', unitPrice: 88.00 },
  { productId: 5010, productName: 'Italian Leather Chelsea Boot', category: 'Apparel', unitPrice: 245.00 },
  { productId: 5011, productName: 'Organic Pima Cotton Tee (3-Pack)', category: 'Apparel', unitPrice: 65.00 },
  { productId: 5012, productName: 'Artisan Espresso Machine Dual-Boiler', category: 'Home & Kitchen', unitPrice: 599.00 },
  { productId: 5013, productName: 'Cast Iron Dutch Oven 6-Quart', category: 'Home & Kitchen', unitPrice: 135.00 },
  { productId: 5014, productName: 'Conical Burr Coffee Grinder', category: 'Home & Kitchen', unitPrice: 120.00 },
  { productId: 5015, productName: 'Smart Air Purifier HEPA H13', category: 'Home & Kitchen', unitPrice: 169.99 },
  { productId: 5016, productName: 'Sonic Toothbrush Smart Series', category: 'Beauty & Health', unitPrice: 119.00 },
  { productId: 5017, productName: 'Deep Tissue Percussion Massager', category: 'Beauty & Health', unitPrice: 159.00 },
  { productId: 5018, productName: 'Clinical Vitamin C Serum 30ml', category: 'Beauty & Health', unitPrice: 72.00 },
  { productId: 5019, productName: 'GPS Smart Multisport Fitness Watch', category: 'Sports & Outdoors', unitPrice: 349.99 },
  { productId: 5020, productName: 'Waterproof Camping Backpack 45L', category: 'Sports & Outdoors', unitPrice: 145.00 }
];

export const CLUSTER_CENTROIDS: Record<SegmentName, ClusterCentroid> = {
  'High-Value Champions': {
    clusterId: 0,
    segment: 'High-Value Champions',
    color: '#0D9488', // Teal
    recencyMean: 18,
    frequencyMean: 14.8,
    monetaryMean: 4850,
    customerCount: 380,
    revenueSharePct: 44.5,
    businessAction: 'VIP concierge loyalty perks, early product launch drops, high-touch account management.'
  },
  'Loyal Customers': {
    clusterId: 1,
    segment: 'Loyal Customers',
    color: '#2563EB', // Royal Blue
    recencyMean: 42,
    frequencyMean: 7.2,
    monetaryMean: 2150,
    customerCount: 750,
    revenueSharePct: 34.2,
    businessAction: 'Cross-category upsells, personalized bundles, and referral incentive rewards.'
  },
  'At-Risk / Churn Risk': {
    clusterId: 2,
    segment: 'At-Risk / Churn Risk',
    color: '#E11D48', // Vibrant Rose
    recencyMean: 210,
    frequencyMean: 4.8,
    monetaryMean: 1280,
    customerCount: 620,
    revenueSharePct: 14.1,
    businessAction: 'Win-back reactivation campaigns, limited-time 20% milestone discounts, NPS feedback pulse.'
  },
  'Occasional Buyers': {
    clusterId: 3,
    segment: 'Occasional Buyers',
    color: '#F59E0B', // Amber
    recencyMean: 115,
    frequencyMean: 1.6,
    monetaryMean: 390,
    customerCount: 750,
    revenueSharePct: 7.2,
    businessAction: 'Onboarding nurturing series, seasonal flash sales, and low-friction reorder prompts.'
  }
};

export const CLUSTER_CENTROIDS_LIST: ClusterCentroid[] = Object.values(CLUSTER_CENTROIDS);


// Seed detailed representative customers for snappy client-side rendering & analysis
const CUST_NAMES = [
  "Aarav Sharma", "Priya Patel", "Rohan Mehta", "Ananya Iyer", "Vikram Singh",
  "Neha Verma", "Arjun Reddy", "Diya Gupta", "Aditya Nair", "Pooja Joshi",
  "Kabir Kapoor", "Ishaan Malhotra", "Tanvi Deshmukh", "Siddharth Rao", "Kavya Menon",
  "Emma Smith", "Liam Johnson", "Olivia Williams", "Noah Brown", "Ava Jones",
  "Sophia Garcia", "Elijah Miller", "Isabella Davis", "James Rodriguez", "Charlotte Martinez",
  "Benjamin Hernandez", "Amelia Lopez", "Lucas Gonzalez", "Henry Wilson", "Alexander Anderson",
  "Abigail Thomas", "Mason Taylor", "Emily Moore", "Michael Jackson", "Elizabeth Martin",
  "Ethan Lee", "Sofia Perez", "Daniel Thompson", "Avery White", "Jacob Harris",
  "Chloe Sanchez", "Logan Clark", "Ella Ramirez", "Jackson Lewis", "Grace Robinson",
  "Levi Walker", "Victoria Young", "Sebastian Allen", "Aubrey King", "Mateo Wright"
];

const CITIES = [
  { city: "Mumbai", country: "India" },
  { city: "Bengaluru", country: "India" },
  { city: "Delhi", country: "India" },
  { city: "Hyderabad", country: "India" },
  { city: "Pune", country: "India" },
  { city: "Chennai", country: "India" },
  { city: "New York", country: "United States" },
  { city: "Los Angeles", country: "United States" },
  { city: "Chicago", country: "United States" },
  { city: "Toronto", country: "Canada" },
  { city: "London", country: "United Kingdom" },
  { city: "Berlin", country: "Germany" },
  { city: "Sydney", country: "Australia" },
  { city: "Tokyo", country: "Japan" }
];

export function generateInitialCustomerCohort(): { customers: Customer[]; orders: Order[] } {
  const customers: Customer[] = [];
  const orders: Order[] = [];
  let orderIdSeq = 10001;

  for (let i = 0; i < 120; i++) {
    const cid = 1001 + i;
    const name = CUST_NAMES[i % CUST_NAMES.length] + (i >= CUST_NAMES.length ? ` ${Math.floor(i / CUST_NAMES.length) + 1}` : "");
    const email = `${name.toLowerCase().replace(/\s+/g, '.')}${i}@enterprise.com`;
    const loc = CITIES[i % CITIES.length];
    
    // Assign segment archetypes
    let segment: SegmentName;
    let clusterId: number;
    let recency: number;
    let freq: number;
    let baseMonetary: number;

    if (i < 20) {
      segment = 'High-Value Champions';
      clusterId = 0;
      recency = Math.floor(5 + Math.random() * 25); // 5 to 30 days
      freq = Math.floor(10 + Math.random() * 12); // 10 to 22 orders
      baseMonetary = Math.floor(3500 + Math.random() * 3200);
    } else if (i < 55) {
      segment = 'Loyal Customers';
      clusterId = 1;
      recency = Math.floor(20 + Math.random() * 60); // 20 to 80 days
      freq = Math.floor(5 + Math.random() * 6); // 5 to 10 orders
      baseMonetary = Math.floor(1500 + Math.random() * 1400);
    } else if (i < 80) {
      segment = 'At-Risk / Churn Risk';
      clusterId = 2;
      recency = Math.floor(130 + Math.random() * 220); // 130 to 350 days
      freq = Math.floor(3 + Math.random() * 5); // 3 to 7 orders
      baseMonetary = Math.floor(800 + Math.random() * 900);
    } else {
      segment = 'Occasional Buyers';
      clusterId = 3;
      recency = Math.floor(30 + Math.random() * 250);
      freq = Math.floor(1 + Math.random() * 2); // 1 to 2 orders
      baseMonetary = Math.floor(150 + Math.random() * 450);
    }

    const signupYear = 2022 + Math.floor(Math.random() * 2);
    const signupMonth = String(1 + Math.floor(Math.random() * 12)).padStart(2, '0');
    const signupDay = String(1 + Math.floor(Math.random() * 28)).padStart(2, '0');
    const signupDate = `${signupYear}-${signupMonth}-${signupDay}`;

    customers.push({
      customerId: cid,
      name,
      email,
      city: loc.city,
      country: loc.country,
      signupDate,
      recencyDays: recency,
      frequencyOrders: freq,
      monetaryValue: baseMonetary,
      clusterId,
      segment
    });

    // Create realistic transaction records for this customer
    for (let o = 0; o < freq; o++) {
      const prod = INITIAL_PRODUCTS[Math.floor(Math.random() * INITIAL_PRODUCTS.length)];
      const qty = segment === 'High-Value Champions' ? Math.floor(1 + Math.random() * 3) : 1;
      const discount = Math.random() > 0.6 ? 0.10 : 0.0;
      const gross = +(qty * prod.unitPrice).toFixed(2);
      const net = +(gross * (1 - discount)).toFixed(2);

      // Distribute dates: last order placed 'recency' days ago, prior orders spread out
      const daysAgo = recency + o * Math.floor(25 + Math.random() * 35);
      const targetDate = new Date(2024, 11, 31);
      targetDate.setDate(targetDate.getDate() - daysAgo);
      const dateStr = targetDate.toISOString().split('T')[0];

      orders.push({
        orderId: orderIdSeq++,
        customerId: cid,
        productId: prod.productId,
        orderDate: dateStr,
        quantity: qty,
        discount,
        unitPrice: prod.unitPrice,
        grossRevenue: gross,
        netRevenue: net
      });
    }
  }

  return { customers, orders };
}
