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
