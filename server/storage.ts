import { type User, type InsertUser, type Herb, type InsertHerb, type ContactMessage, type InsertContactMessage } from "@shared/schema";
import { randomUUID } from "crypto";

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
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private herbs: Map<string, Herb>;
  private contactMessages: Map<string, ContactMessage>;

  constructor() {
    this.users = new Map();
    this.herbs = new Map();
    this.contactMessages = new Map();
    this.initializeHerbs();
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
        imageUrl: "https://pixabay.com/get/gbd2cdc204f19973d3d50e766f68c5c8c7fa5013bb7d91bca71bdfba004fe9ff0ba5532bfb67688a1ec4324de41714edf50ac818c62addae72c266929d63b6599_1280.jpg",
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
        imageUrl: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
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
        imageUrl: "https://pixabay.com/get/gdf5d82fa56fa8b00b998de0926ac4733867fb8ca522bc2c27e20c7cd8552ea2e398ddf6f72385bbc3bc2c030f89130e0d62705fff0cbd86d83d005205a81797b_1280.jpg",
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
        imageUrl: "https://pixabay.com/get/ga5514410a9c72e981f21671c0451a74577dee6b5d056bcc371d72912f3669cbced4e64880a06b5645e90ed103f6b5d2f3102bd5529104c242d5253f6def14c46_1280.jpg",
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
        imageUrl: "https://pixabay.com/get/gd8d6dd52b178a3a7acb48f32ae056a9f7741332acff9a39786c0bbe7298f143390b27e97b0fd9ef6c5b89fd939a0538f380489b3589fce4fae7c25e109a94c08_1280.jpg",
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
        imageUrl: "https://images.unsplash.com/photo-1600080972464-8e5f35f63d08?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
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
        imageUrl: "https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
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
        imageUrl: "https://pixabay.com/get/g616fb01f8eee9683bf3983ced9b30847d79813554c6d7e7aba739e5d0e9b3daa2a21613037e87feb378c5dd181c5e85609b188f3b4b3b37f7d469d39d7188d0a_1280.jpg",
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
        imageUrl: "https://images.unsplash.com/photo-1582793988951-9aed5509eb97?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
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
        imageUrl: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
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
        imageUrl: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
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
        imageUrl: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=400&h=250",
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
}

export const storage = new MemStorage();
