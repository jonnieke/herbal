import { type User, type InsertUser, type Herb, type InsertHerb, type ContactMessage, type InsertContactMessage, type CommunityPost, type InsertCommunityPost, type CommunityComment, type InsertCommunityComment, type CommunityLike, type InsertCommunityLike } from "../shared/schema.js";
import { randomUUID } from "crypto";
import { GoogleGenerativeAI } from "@google/generative-ai";

// Initialize Gemini AI
console.log('GEMINI_API_KEY in storage:', process.env.GEMINI_API_KEY ? 'Present' : 'Missing');
let genAI: GoogleGenerativeAI | null = null;
if (process.env.GEMINI_API_KEY) {
  genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
} else {
  console.warn('GEMINI_API_KEY not found. AI features will be disabled.');
}

export interface IStorage {
  getUser(id: string): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllHerbs(): Promise<Herb[]>;
  getHerb(id: string): Promise<Herb | undefined>;
  searchHerbs(query: string): Promise<Herb[]>;
  getHerbsByCategory(category: string): Promise<Herb[]>;
  createHerb(herb: InsertHerb): Promise<Herb>;
  
  createContactMessage(message: InsertContactMessage): Promise<ContactMessage>;
  getAllContactMessages(): Promise<ContactMessage[]>;
  
  // Community functions
  getAllCommunityPosts(): Promise<CommunityPost[]>;
  getCommunityPost(id: string): Promise<CommunityPost | undefined>;
  createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost>;
  updateCommunityPost(id: string, updates: Partial<CommunityPost>): Promise<CommunityPost | undefined>;
  deleteCommunityPost(id: string): Promise<boolean>;
  
  getCommentsByPostId(postId: string): Promise<CommunityComment[]>;
  createCommunityComment(comment: InsertCommunityComment): Promise<CommunityComment>;
  updateCommunityComment(id: string, updates: Partial<CommunityComment>): Promise<CommunityComment | undefined>;
  deleteCommunityComment(id: string): Promise<boolean>;
  
  likePost(postId: string, userEmail: string): Promise<boolean>;
  unlikePost(postId: string, userEmail: string): Promise<boolean>;
  likeComment(commentId: string, userEmail: string): Promise<boolean>;
  unlikeComment(commentId: string, userEmail: string): Promise<boolean>;
  hasUserLikedPost(postId: string, userEmail: string): Promise<boolean>;
  hasUserLikedComment(commentId: string, userEmail: string): Promise<boolean>;
  getAIHerbInfo(query: string): Promise<any>;
  getAIWellnessResponse(message: string): Promise<any>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private herbs: Map<string, Herb>;
  private contactMessages: Map<string, ContactMessage>;
  private communityPosts: Map<string, CommunityPost>;
  private communityComments: Map<string, CommunityComment>;
  private communityLikes: Map<string, CommunityLike>;

  constructor() {
    this.users = new Map();
    this.herbs = new Map();
    this.contactMessages = new Map();
    this.communityPosts = new Map();
    this.communityComments = new Map();
    this.communityLikes = new Map();
    this.initializeHerbs();
    this.initializeSamplePosts();
  }

  private initializeHerbs() {
    const initialHerbs: InsertHerb[] = [
      // Global Herbs
      {
        name: "Peppermint",
        localName: "",
        emoji: "🌿",
        description: "Refreshing herb for digestion, headaches, and mental clarity. Perfect for teas and aromatherapy.",
        benefits: ["Aids digestion", "Relieves headaches", "Improves mental clarity", "Natural decongestant"],
        categories: ["Mental Health", "Energy", "General Wellness"],
        preparationMethods: ["Tea", "Essential oil", "Fresh leaves", "Capsules"],
        safetyInfo: "Generally safe for most people. Avoid if allergic to mint family plants.",
        imageUrl: "/attached_assets/generated_images/Fresh_peppermint_leaves_0a300d3e.png",
        isIndigenous: "false",
        region: "Global"
      },
      {
        name: "Ginger",
        localName: "",
        emoji: "🫚",
        description: "Powerful anti-inflammatory root for nausea, digestion, and immune support.",
        benefits: ["Reduces nausea", "Anti-inflammatory", "Boosts immunity", "Aids digestion"],
        categories: ["Energy", "General Wellness"],
        preparationMethods: ["Fresh tea", "Powder", "Capsules", "Decoction"],
        safetyInfo: "May interact with blood thinners. Consult healthcare provider if pregnant.",
        imageUrl: "/attached_assets/generated_images/Fresh_ginger_root_pieces_b404e3ce.png",
        isIndigenous: "false",
        region: "Global"
      },
      {
        name: "Chamomile",
        localName: "",
        emoji: "🌼",
        description: "Gentle, calming herb for sleep, anxiety, and digestive comfort.",
        benefits: ["Promotes sleep", "Reduces anxiety", "Soothes digestion", "Anti-inflammatory"],
        categories: ["Mental Health", "Sleep", "General Wellness"],
        preparationMethods: ["Tea", "Tincture", "Capsules", "Poultice"],
        safetyInfo: "Generally safe. May cause allergic reactions in people sensitive to ragweed family.",
        imageUrl: "/attached_assets/generated_images/Chamomile_flowers_blooming_fcc5a2fb.png",
        isIndigenous: "false",
        region: "Global"
      },
      {
        name: "Hibiscus",
        localName: "",
        emoji: "🌺",
        description: "Tart, vitamin C-rich flower for blood pressure support and heart health.",
        benefits: ["Supports heart health", "Rich in vitamin C", "May help blood pressure", "Antioxidant properties"],
        categories: ["General Wellness", "Weight Balance"],
        preparationMethods: ["Tea", "Cold brew", "Powder", "Extract"],
        safetyInfo: "May lower blood pressure. Monitor if taking blood pressure medications.",
        imageUrl: "/attached_assets/generated_images/Red_hibiscus_flowers_47e0eec6.png",
        isIndigenous: "false",
        region: "Global"
      },
      {
        name: "Turmeric",
        localName: "",
        emoji: "🟡",
        description: "Golden spice with powerful anti-inflammatory and antioxidant properties.",
        benefits: ["Anti-inflammatory", "Antioxidant", "Supports joint health", "Immune support"],
        categories: ["General Wellness", "Energy"],
        preparationMethods: ["Powder", "Fresh root", "Golden milk", "Capsules"],
        safetyInfo: "May interact with blood thinners. Use with black pepper for better absorption.",
        imageUrl: "/attached_assets/generated_images/Fresh_turmeric_root_2357d6c4.png",
        isIndigenous: "false",
        region: "Global"
      },
      // Indigenous African Herbs
      {
        name: "Moringa",
        localName: "Moringa oleifera",
        emoji: "🌿",
        description: "The miracle tree, boosts energy, immunity, and nutrition with incredible nutrient density.",
        benefits: ["Complete nutrition", "Boosts energy", "Immune support", "Rich in vitamins"],
        categories: ["Energy", "General Wellness", "Weight Balance"],
        preparationMethods: ["Powder", "Fresh leaves", "Tea", "Capsules"],
        safetyInfo: "Generally safe. Start with small amounts to assess tolerance.",
        imageUrl: "/attached_assets/generated_images/Fresh_moringa_plant_leaves_f8771929.png",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Neem",
        localName: "Muarubaini (Azadirachta indica)",
        emoji: "🍃",
        description: "Traditionally used for skin health, immunity, and blood sugar balance support.",
        benefits: ["Skin health", "Immune support", "Blood sugar balance", "Natural antimicrobial"],
        categories: ["General Wellness", "Weight Balance"],
        preparationMethods: ["Tea", "Powder", "Paste", "Oil"],
        safetyInfo: "Very bitter. Start with small amounts. Avoid during pregnancy.",
        imageUrl: "/attached_assets/generated_images/Neem_tree_leaves_8f8d6bbc.png",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Aloe Vera",
        localName: "Shubiri",
        emoji: "🌱",
        description: "For digestion, skin healing, and cooling the body naturally.",
        benefits: ["Skin healing", "Digestive support", "Cooling properties", "Anti-inflammatory"],
        categories: ["General Wellness"],
        preparationMethods: ["Fresh gel", "Juice", "Topical application", "Powder"],
        safetyInfo: "Use inner gel only. Avoid latex layer. May have laxative effects.",
        imageUrl: "/attached_assets/generated_images/Aloe_vera_plant_gel_c15d2219.png",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Soursop",
        localName: "Graviola / Mtopeto",
        emoji: "🍈",
        description: "For vitality, immunity, and digestive support with rich antioxidants.",
        benefits: ["Rich in antioxidants", "Immune support", "Digestive health", "Vitality boost"],
        categories: ["Energy", "General Wellness"],
        preparationMethods: ["Tea", "Fresh fruit", "Powder", "Extract"],
        safetyInfo: "Consume in moderation. May interact with certain medications.",
        imageUrl: "/attached_assets/generated_images/Soursop_fruit_cut_open_e750000a.png",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "African Basil",
        localName: "Ocimum gratissimum (Mutaa, Danduu)",
        emoji: "🌿",
        description: "For colds, flu, and mental clarity with aromatic healing properties.",
        benefits: ["Cold and flu relief", "Mental clarity", "Respiratory support", "Antimicrobial"],
        categories: ["Mental Health", "General Wellness"],
        preparationMethods: ["Tea", "Steam inhalation", "Fresh leaves", "Essential oil"],
        safetyInfo: "Generally safe. Use in moderation during pregnancy.",
        imageUrl: "/attached_assets/generated_images/African_basil_leaves_21f0cb2b.png",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Baobab",
        localName: "Adansonia digitata (Mbuyu)",
        emoji: "🌳",
        description: "Rich in vitamin C, supports immunity and energy with superfruit benefits.",
        benefits: ["High vitamin C", "Immune support", "Energy boost", "Rich in fiber"],
        categories: ["Energy", "General Wellness"],
        preparationMethods: ["Powder", "Fresh fruit", "Smoothies", "Tea"],
        safetyInfo: "Generally safe. High fiber content may cause digestive upset if consumed in large amounts.",
        imageUrl: "/attached_assets/generated_images/Baobab_fruit_pods_1e748c22.png",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "African Sage",
        localName: "Lippia javanica (Mshongi)",
        emoji: "🍃",
        description: "Used in steam therapy for coughs, colds, and relaxation.",
        benefits: ["Respiratory support", "Relaxation", "Steam therapy", "Cold relief"],
        categories: ["Mental Health", "Sleep", "General Wellness"],
        preparationMethods: ["Steam inhalation", "Tea", "Dried leaves", "Aromatherapy"],
        safetyInfo: "Generally safe for external use. Use caution with internal consumption.",
        imageUrl: "/attached_assets/generated_images/African_sage_plant_11f1d049.png",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Chia Seeds",
        localName: "Salvia hispanica",
        emoji: "🌱",
        description: "Nutrient-dense superfood seeds rich in omega-3 fatty acids, fiber, and protein.",
        benefits: ["Rich in omega-3", "High fiber content", "Protein source", "Energy boost", "Heart health"],
        categories: ["Energy", "Weight Balance", "General Wellness"],
        preparationMethods: ["Raw consumption", "Soaked in water", "Smoothies", "Baking", "Pudding"],
        safetyInfo: "Generally safe. Drink plenty of water when consuming. May cause digestive upset if not properly hydrated.",
        imageUrl: "/attached_assets/generated_images/chia seeds.jpg",
        isIndigenous: "false",
        region: "Global"
      },
      {
        name: "Rotheca myricoides",
        localName: "Blue Butterfly Bush / Mubarika",
        emoji: "🦋",
        description: "Traditional African herb used for respiratory health and fever management.",
        benefits: ["Respiratory support", "Fever reduction", "Anti-inflammatory", "Antimicrobial"],
        categories: ["General Wellness"],
        preparationMethods: ["Tea", "Decoction", "Fresh leaves", "Poultice"],
        safetyInfo: "Traditional use suggests safety, but consult healthcare provider before use.",
        imageUrl: "/attached_assets/generated_images/blue butterfly bush.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Bidens pilosa",
        localName: "Black Jack / Mchunga",
        emoji: "🌼",
        description: "Widespread herb used for wound healing, diabetes management, and immune support.",
        benefits: ["Wound healing", "Blood sugar support", "Immune boost", "Anti-inflammatory"],
        categories: ["General Wellness", "Weight Balance"],
        preparationMethods: ["Tea", "Fresh leaves", "Poultice", "Extract"],
        safetyInfo: "Generally safe in traditional use. Monitor blood sugar if diabetic.",
        imageUrl: "/attached_assets/generated_images/black jack.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Acacia nilotica",
        localName: "Gum Arabic Tree / Mgunga",
        emoji: "🌳",
        description: "Traditional tree used for gum production, wound healing, and digestive health.",
        benefits: ["Wound healing", "Digestive support", "Gum health", "Anti-inflammatory"],
        categories: ["General Wellness"],
        preparationMethods: ["Gum extract", "Bark decoction", "Poultice", "Powder"],
        safetyInfo: "Gum arabic is generally safe. Avoid bark in large quantities.",
        imageUrl: "/attached_assets/generated_images/acacia nilotica.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Dovyalis abyssinica",
        localName: "Abyssinian Gooseberry / Mkomamanga",
        emoji: "🫐",
        description: "Fruit-bearing tree with medicinal properties for digestive and immune health.",
        benefits: ["Digestive health", "Immune support", "Vitamin C source", "Antioxidant"],
        categories: ["Energy", "General Wellness"],
        preparationMethods: ["Fresh fruit", "Juice", "Tea", "Extract"],
        safetyInfo: "Fruit is generally safe. Use in moderation.",
        imageUrl: "/attached_assets/generated_images/abyssinian gooseberry.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Prunus africana",
        localName: "African Cherry / Mueri",
        emoji: "🍒",
        description: "Traditional tree used for prostate health and anti-inflammatory properties.",
        benefits: ["Prostate health", "Anti-inflammatory", "Urinary support", "Traditional medicine"],
        categories: ["General Wellness"],
        preparationMethods: ["Bark decoction", "Extract", "Capsules", "Tincture"],
        safetyInfo: "Traditional use for prostate health. Consult healthcare provider before use.",
        imageUrl: "/attached_assets/generated_images/African cherry.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Urtica massaica",
        localName: "African Nettle / Mwiba",
        emoji: "🌿",
        description: "Stinging nettle variety used for joint health, allergies, and nutritional support.",
        benefits: ["Joint health", "Allergy relief", "Rich in minerals", "Anti-inflammatory"],
        categories: ["General Wellness", "Mental Health"],
        preparationMethods: ["Cooked leaves", "Tea", "Soup", "Extract"],
        safetyInfo: "Must be cooked to remove stinging properties. Rich in nutrients.",
        imageUrl: "/attached_assets/generated_images/african nettle.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Warburgia ugandensis",
        localName: "Uganda Greenheart / Muthiga",
        emoji: "🌲",
        description: "Aromatic tree used for respiratory health, fever, and traditional medicine.",
        benefits: ["Respiratory support", "Fever reduction", "Antimicrobial", "Traditional medicine"],
        categories: ["General Wellness"],
        preparationMethods: ["Bark decoction", "Leaves tea", "Essential oil", "Powder"],
        safetyInfo: "Traditional use suggests safety. Use in moderation.",
        imageUrl: "/attached_assets/generated_images/Uganda greenheart 1.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Euphorbia hirta",
        localName: "Asthma Plant / Mwiba wa pumu",
        emoji: "🌱",
        description: "Small herb traditionally used for respiratory conditions and skin ailments.",
        benefits: ["Respiratory support", "Skin health", "Traditional medicine", "Anti-inflammatory"],
        categories: ["General Wellness"],
        preparationMethods: ["Tea", "Fresh plant", "Poultice", "Extract"],
        safetyInfo: "Traditional use for respiratory conditions. Use with caution.",
        imageUrl: "/attached_assets/generated_images/asthma plant.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Faurea saligna",
        localName: "African Beech / Msewe",
        emoji: "🌳",
        description: "Tree species used in traditional medicine for various health conditions.",
        benefits: ["Traditional medicine", "Anti-inflammatory", "Local healing", "Cultural significance"],
        categories: ["General Wellness"],
        preparationMethods: ["Bark decoction", "Traditional preparation", "Local methods"],
        safetyInfo: "Traditional use varies by region. Consult local practitioners.",
        imageUrl: "/attached_assets/generated_images/African beech.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Myrsine africana",
        localName: "African Boxwood / Muthiga",
        emoji: "🌿",
        description: "Evergreen shrub used for traditional medicine and cultural practices.",
        benefits: ["Traditional medicine", "Cultural significance", "Local healing", "Antimicrobial"],
        categories: ["General Wellness"],
        preparationMethods: ["Traditional methods", "Local preparation", "Cultural practices"],
        safetyInfo: "Traditional use varies. Consult local practitioners for proper use.",
        imageUrl: "/attached_assets/generated_images/African boxwood.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Persea americana",
        localName: "Avocado / Mparachichi",
        emoji: "🥑",
        description: "Nutrient-rich fruit tree with leaves and fruit used for health benefits.",
        benefits: ["Heart health", "Rich in healthy fats", "Skin health", "Nutrient dense"],
        categories: ["General Wellness", "Weight Balance"],
        preparationMethods: ["Fresh fruit", "Leaf tea", "Oil extraction", "Culinary use"],
        safetyInfo: "Fruit is generally safe. Leaf tea should be used in moderation.",
        imageUrl: "/attached_assets/generated_images/avocado.jpg",
        isIndigenous: "false",
        region: "Global"
      },
      {
        name: "Rhamnus species",
        localName: "Buckthorn / Muthiga",
        emoji: "🌿",
        description: "Various species used for digestive health and traditional medicine.",
        benefits: ["Digestive support", "Traditional medicine", "Local healing", "Cultural use"],
        categories: ["General Wellness"],
        preparationMethods: ["Traditional methods", "Local preparation", "Cultural practices"],
        safetyInfo: "Use varies by species and region. Consult local practitioners.",
        imageUrl: "/attached_assets/generated_images/buckthorn.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Trimeria grandifolia",
        localName: "Wild Hemp / Mwiba",
        emoji: "🌿",
        description: "Traditional plant used for various medicinal purposes in local communities.",
        benefits: ["Traditional medicine", "Local healing", "Cultural significance", "Community health"],
        categories: ["General Wellness"],
        preparationMethods: ["Traditional methods", "Local preparation", "Cultural practices"],
        safetyInfo: "Traditional use varies. Consult local practitioners for proper use.",
        imageUrl: "/attached_assets/generated_images/wild hemp.jpg",
        isIndigenous: "true",
        region: "Africa"
      },
      {
        name: "Zanthoxylum usambarense",
        localName: "African Pepper / Mpilipili",
        emoji: "🌶️",
        description: "Aromatic tree used for digestive health, pain relief, and traditional medicine.",
        benefits: ["Digestive support", "Pain relief", "Antimicrobial", "Traditional medicine"],
        categories: ["General Wellness", "Mental Health"],
        preparationMethods: ["Bark decoction", "Fruit spice", "Traditional preparation", "Local methods"],
        safetyInfo: "Traditional use suggests safety. Use in moderation.",
        imageUrl: "/attached_assets/generated_images/african pepper.jpg",
        isIndigenous: "true",
        region: "Africa"
      }
    ];

    initialHerbs.forEach(herb => {
      const id = randomUUID();
      const herbWithId: Herb = { 
        ...herb, 
        id,
        localName: herb.localName || null,
        emoji: herb.emoji || null,
        safetyInfo: herb.safetyInfo || null,
        imageUrl: herb.imageUrl || null,
        region: herb.region || null,
        isIndigenous: herb.isIndigenous || "false"
      };
      this.herbs.set(id, herbWithId);
    });
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllHerbs(): Promise<Herb[]> {
    return Array.from(this.herbs.values());
  }

  async getHerb(id: string): Promise<Herb | undefined> {
    return this.herbs.get(id);
  }

  async searchHerbs(query: string): Promise<Herb[]> {
    const lowerQuery = query.toLowerCase();
    return Array.from(this.herbs.values()).filter(herb =>
      herb.name.toLowerCase().includes(lowerQuery) ||
      herb.description.toLowerCase().includes(lowerQuery) ||
      herb.localName?.toLowerCase().includes(lowerQuery) ||
      herb.benefits.some(benefit => benefit.toLowerCase().includes(lowerQuery)) ||
      herb.categories.some(category => category.toLowerCase().includes(lowerQuery))
    );
  }

  async getHerbsByCategory(category: string): Promise<Herb[]> {
    return Array.from(this.herbs.values()).filter(herb =>
      herb.categories.includes(category)
    );
  }

  async createHerb(insertHerb: InsertHerb): Promise<Herb> {
    const id = randomUUID();
    const herb: Herb = { 
      ...insertHerb, 
      id,
      localName: insertHerb.localName || null,
      emoji: insertHerb.emoji || null,
      safetyInfo: insertHerb.safetyInfo || null,
      imageUrl: insertHerb.imageUrl || null,
      region: insertHerb.region || null,
      isIndigenous: insertHerb.isIndigenous || "false"
    };
    this.herbs.set(id, herb);
    return herb;
  }

  async createContactMessage(insertMessage: InsertContactMessage): Promise<ContactMessage> {
    const id = randomUUID();
    const message: ContactMessage = { 
      ...insertMessage, 
      id, 
      subject: insertMessage.subject || null,
      createdAt: new Date().toISOString() 
    };
    this.contactMessages.set(id, message);
    return message;
  }

  async getAllContactMessages(): Promise<ContactMessage[]> {
    return Array.from(this.contactMessages.values());
  }

  private initializeSamplePosts() {
    const samplePosts: InsertCommunityPost[] = [
      {
        authorName: "Sarah Johnson",
        authorEmail: "sarah@example.com",
        title: "My Journey with Chamomile for Better Sleep",
        content: "I've been struggling with insomnia for months, and chamomile tea has been a game-changer! I started drinking a cup 30 minutes before bed, and within a week, I noticed a significant improvement in my sleep quality. The gentle, calming effect is exactly what I needed. I also love how it helps with my evening anxiety. Highly recommend for anyone dealing with sleep issues!",
        category: "success-story",
        tags: ["sleep", "chamomile", "anxiety", "insomnia"],
        imageUrl: "/attached_assets/generated_images/Chamomile_flowers_blooming_fcc5a2fb.png",
      },
      {
        authorName: "Michael Chen",
        authorEmail: "michael@example.com",
        title: "Ginger Tea: My Natural Energy Boost",
        content: "As someone who works long hours, I was always looking for natural ways to boost my energy without caffeine crashes. Ginger tea has been incredible! I make it fresh every morning with lemon and honey. It gives me sustained energy throughout the day and helps with digestion too. The anti-inflammatory benefits are a bonus - my joints feel better than ever!",
        category: "success-story",
        tags: ["energy", "ginger", "digestion", "anti-inflammatory"],
        imageUrl: "/attached_assets/generated_images/Fresh_ginger_root_pieces_b404e3ce.png",
      },
      {
        authorName: "Aisha Patel",
        authorEmail: "aisha@example.com",
        title: "Moringa Powder: My Daily Wellness Ritual",
        content: "I've been taking moringa powder daily for 3 months now, and the results are amazing! My energy levels are consistent throughout the day, my skin looks healthier, and I feel more balanced overall. I mix it into my morning smoothie or just stir it into water. It's become an essential part of my wellness routine. The nutrient density is incredible!",
        category: "journey",
        tags: ["moringa", "energy", "nutrition", "wellness"],
        imageUrl: "/attached_assets/generated_images/Fresh_moringa_plant_leaves_f8771929.png",
      },
      {
        authorName: "David Thompson",
        authorEmail: "david@example.com",
        title: "Question: Best Herbs for Stress Management?",
        content: "I'm going through a particularly stressful time at work and looking for natural ways to manage stress. I've heard good things about adaptogenic herbs. What would you recommend for someone new to herbal remedies? I'm interested in something I can easily incorporate into my daily routine.",
        category: "question",
        tags: ["stress", "adaptogens", "mental-health", "beginner"],
        imageUrl: undefined,
      },
      {
        authorName: "Lisa Rodriguez",
        authorEmail: "lisa@example.com",
        title: "Tip: Making the Perfect Herbal Tea",
        content: "Here's my method for making the perfect cup of herbal tea: Use filtered water, bring to a gentle boil, then let it cool for 30 seconds before pouring over herbs. Steep for 5-7 minutes covered to preserve essential oils. Add honey after steeping to preserve its benefits. This method has made my herbal teas so much more effective!",
        category: "tip",
        tags: ["tea", "preparation", "tips", "honey"],
        imageUrl: "/attached_assets/generated_images/Whisk_9cd0867522-min.jpg",
      }
    ];

    samplePosts.forEach(post => {
      const id = randomUUID();
      const postWithId: CommunityPost = {
        ...post,
        id,
        likes: "0",
        views: "0",
        isApproved: "true",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        tags: post.tags || [],
        imageUrl: post.imageUrl || null,
      };
      this.communityPosts.set(id, postWithId);
    });

    // Add sample comments
    const sampleComments: InsertCommunityComment[] = [
      {
        postId: Array.from(this.communityPosts.keys())[0], // First post
        authorName: "Emma Wilson",
        authorEmail: "emma@example.com",
        content: "This is so encouraging! I've been having trouble sleeping too. How long did it take before you noticed the full effects?",
      },
      {
        postId: Array.from(this.communityPosts.keys())[0],
        authorName: "Sarah Johnson",
        authorEmail: "sarah@example.com",
        content: "Thanks Emma! It took about 2 weeks for the full effects. I also found that creating a bedtime routine really helped - chamomile tea, reading, and no screens for the last hour before bed.",
      },
      {
        postId: Array.from(this.communityPosts.keys())[1], // Second post
        authorName: "James Brown",
        authorEmail: "james@example.com",
        content: "I love ginger tea too! Have you tried adding turmeric? The combination is amazing for inflammation.",
      }
    ];

    sampleComments.forEach(comment => {
      const id = randomUUID();
      const commentWithId: CommunityComment = {
        ...comment,
        id,
        likes: "0",
        isApproved: "true",
        createdAt: new Date().toISOString(),
      };
      this.communityComments.set(id, commentWithId);
    });
  }

  // Community Post functions
  async getAllCommunityPosts(): Promise<CommunityPost[]> {
    return Array.from(this.communityPosts.values())
      .filter(post => post.isApproved === "true")
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }

  async getCommunityPost(id: string): Promise<CommunityPost | undefined> {
    return this.communityPosts.get(id);
  }

  async createCommunityPost(post: InsertCommunityPost): Promise<CommunityPost> {
    const id = randomUUID();
    const newPost: CommunityPost = {
      ...post,
      id,
      likes: "0",
      views: "0",
      isApproved: "false", // Requires approval
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      tags: post.tags || [],
      imageUrl: post.imageUrl || null,
    };
    this.communityPosts.set(id, newPost);
    return newPost;
  }

  async updateCommunityPost(id: string, updates: Partial<CommunityPost>): Promise<CommunityPost | undefined> {
    const post = this.communityPosts.get(id);
    if (!post) return undefined;
    
    const updatedPost = { ...post, ...updates, updatedAt: new Date().toISOString() };
    this.communityPosts.set(id, updatedPost);
    return updatedPost;
  }

  async deleteCommunityPost(id: string): Promise<boolean> {
    return this.communityPosts.delete(id);
  }

  // Community Comment functions
  async getCommentsByPostId(postId: string): Promise<CommunityComment[]> {
    return Array.from(this.communityComments.values())
      .filter(comment => comment.postId === postId && comment.isApproved === "true")
      .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
  }

  async createCommunityComment(comment: InsertCommunityComment): Promise<CommunityComment> {
    const id = randomUUID();
    const newComment: CommunityComment = {
      ...comment,
      id,
      likes: "0",
      isApproved: "false", // Requires approval
      createdAt: new Date().toISOString(),
    };
    this.communityComments.set(id, newComment);
    return newComment;
  }

  async updateCommunityComment(id: string, updates: Partial<CommunityComment>): Promise<CommunityComment | undefined> {
    const comment = this.communityComments.get(id);
    if (!comment) return undefined;
    
    const updatedComment = { ...comment, ...updates };
    this.communityComments.set(id, updatedComment);
    return updatedComment;
  }

  async deleteCommunityComment(id: string): Promise<boolean> {
    return this.communityComments.delete(id);
  }

  // Like/Unlike functions
  async likePost(postId: string, userEmail: string): Promise<boolean> {
    const likeId = `${postId}-${userEmail}`;
    const existingLike = Array.from(this.communityLikes.values()).find(
      like => like.postId === postId && like.userEmail === userEmail
    );
    
    if (existingLike) return false; // Already liked
    
    const like: CommunityLike = {
      id: randomUUID(),
      postId,
      commentId: null,
      userEmail,
      createdAt: new Date().toISOString(),
    };
    this.communityLikes.set(like.id, like);
    
    // Update post like count
    const post = this.communityPosts.get(postId);
    if (post) {
      const currentLikes = parseInt(post.likes) || 0;
      post.likes = (currentLikes + 1).toString();
      this.communityPosts.set(postId, post);
    }
    
    return true;
  }

  async unlikePost(postId: string, userEmail: string): Promise<boolean> {
    const like = Array.from(this.communityLikes.values()).find(
      like => like.postId === postId && like.userEmail === userEmail
    );
    
    if (!like) return false;
    
    this.communityLikes.delete(like.id);
    
    // Update post like count
    const post = this.communityPosts.get(postId);
    if (post) {
      const currentLikes = parseInt(post.likes) || 0;
      post.likes = Math.max(0, currentLikes - 1).toString();
      this.communityPosts.set(postId, post);
    }
    
    return true;
  }

  async likeComment(commentId: string, userEmail: string): Promise<boolean> {
    const existingLike = Array.from(this.communityLikes.values()).find(
      like => like.commentId === commentId && like.userEmail === userEmail
    );
    
    if (existingLike) return false; // Already liked
    
    const like: CommunityLike = {
      id: randomUUID(),
      postId: null,
      commentId,
      userEmail,
      createdAt: new Date().toISOString(),
    };
    this.communityLikes.set(like.id, like);
    
    // Update comment like count
    const comment = this.communityComments.get(commentId);
    if (comment) {
      const currentLikes = parseInt(comment.likes) || 0;
      comment.likes = (currentLikes + 1).toString();
      this.communityComments.set(commentId, comment);
    }
    
    return true;
  }

  async unlikeComment(commentId: string, userEmail: string): Promise<boolean> {
    const like = Array.from(this.communityLikes.values()).find(
      like => like.commentId === commentId && like.userEmail === userEmail
    );
    
    if (!like) return false;
    
    this.communityLikes.delete(like.id);
    
    // Update comment like count
    const comment = this.communityComments.get(commentId);
    if (comment) {
      const currentLikes = parseInt(comment.likes) || 0;
      comment.likes = Math.max(0, currentLikes - 1).toString();
      this.communityComments.set(commentId, comment);
    }
    
    return true;
  }

  async hasUserLikedPost(postId: string, userEmail: string): Promise<boolean> {
    return Array.from(this.communityLikes.values()).some(
      like => like.postId === postId && like.userEmail === userEmail
    );
  }

  async hasUserLikedComment(commentId: string, userEmail: string): Promise<boolean> {
    return Array.from(this.communityLikes.values()).some(
      like => like.commentId === commentId && like.userEmail === userEmail
    );
  }

  async getAIHerbInfo(query: string): Promise<any> {
    if (!genAI) {
      return {
        name: query,
        description: "AI features are currently disabled. Please set GEMINI_API_KEY environment variable to enable AI assistance.",
        benefits: ["Traditional wellness support"],
        usage: "Consult with a healthcare provider",
        dosage: "Follow recommended guidelines",
        preparation: "Various methods available",
        interactions: ["May interact with medications"],
        warnings: ["Consult healthcare provider before use"],
        category: "Wellness"
      };
    }
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `Provide comprehensive information about the herb "${query}" in the following JSON format:
      {
        "name": "Herb Name",
        "description": "Brief description of the herb",
        "benefits": ["Benefit 1", "Benefit 2", "Benefit 3"],
        "usage": "How to use this herb",
        "dosage": "Recommended dosage information",
        "preparation": "How to prepare this herb (tea, tincture, etc.)",
        "interactions": ["Drug interaction 1", "Drug interaction 2"],
        "warnings": ["Warning 1", "Warning 2"],
        "category": "Wellness category (e.g., Digestive, Immune, Sleep)"
      }
      
      Focus on traditional uses, scientific evidence, safety, and practical applications. Be accurate and include important warnings.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback response if JSON parsing fails
      return {
        name: query,
        description: "Information about this herb",
        benefits: ["Traditional wellness support"],
        usage: "Consult with a healthcare provider",
        dosage: "Follow recommended guidelines",
        preparation: "Various methods available",
        interactions: ["May interact with medications"],
        warnings: ["Consult healthcare provider before use"],
        category: "Wellness"
      };
    } catch (error) {
      console.error("Gemini API error:", error);
      // Return fallback response
      return {
        name: query,
        description: "Unable to fetch information at this time. Please try again later.",
        benefits: ["Traditional wellness support"],
        usage: "Consult with a healthcare provider",
        dosage: "Follow recommended guidelines",
        preparation: "Various methods available",
        interactions: ["May interact with medications"],
        warnings: ["Consult healthcare provider before use"],
        category: "Wellness"
      };
    }
  }

  async getAIWellnessResponse(message: string): Promise<any> {
    if (!genAI) {
      return {
        response: "AI features are currently disabled. Please set GEMINI_API_KEY environment variable to enable AI assistance.",
        suggestions: [
          "What specific symptoms are you experiencing?",
          "Are you currently taking any medications?",
          "What's your primary wellness goal?"
        ]
      };
    }
    
    try {
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      
      const prompt = `You are a herbal wellness assistant. Answer in BULLET POINTS ONLY.

User question: "${message}"

STRICT FORMAT REQUIRED:
• Recommend 1-2 specific herbs
• How to use (tea, capsules, etc.)
• Main benefit
• Safety warning if any

Keep each bullet point to ONE sentence maximum. No paragraphs or long explanations.

Example response:
• Try chamomile tea for sleep
• Drink 1 cup before bedtime
• Helps calm nerves naturally
• Avoid if allergic to daisies

Format as JSON:
{
  "response": "• Bullet point 1\n• Bullet point 2\n• Bullet point 3\n• Bullet point 4",
  "suggestions": ["Quick question 1?", "Quick question 2?", "Quick question 3?"]
}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from the response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0]);
      }
      
      // Fallback response if JSON parsing fails
      return {
        response: "I'm here to help with your wellness questions. Please consult with a healthcare provider for personalized advice.",
        suggestions: [
          "What specific symptoms are you experiencing?",
          "Are you currently taking any medications?",
          "What's your primary wellness goal?"
        ]
      };
    } catch (error) {
      console.error("Gemini API error:", error);
      // Return fallback response
      return {
        response: "I'm experiencing technical difficulties right now. Please try again later or consult with a healthcare provider for immediate concerns.",
        suggestions: [
          "What specific symptoms are you experiencing?",
          "Are you currently taking any medications?",
          "What's your primary wellness goal?"
        ]
      };
    }
  }
}

export const storage = new MemStorage();
