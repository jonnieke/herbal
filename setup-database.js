// Database setup script for Railway
// This script will create tables and insert sample data

import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { herbs, communityPosts, communityComments, communityLikes, contactMessages, users } from './shared/schema.js';

// Get database URL from environment
const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  console.error('DATABASE_URL environment variable is required');
  process.exit(1);
}

const sql = postgres(connectionString);
const db = drizzle(sql);

async function setupDatabase() {
  try {
    console.log('Setting up database...');
    
    // Create tables (this will be handled by the SQL script)
    console.log('Tables should be created via SQL script');
    
    // Insert sample herbs data
    const sampleHerbs = [
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
      }
    ];

    console.log('Inserting sample herbs...');
    for (const herb of sampleHerbs) {
      await db.insert(herbs).values(herb);
    }

    console.log('Database setup completed successfully!');
    
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    await sql.end();
  }
}

setupDatabase();
