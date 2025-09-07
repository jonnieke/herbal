-- HerbalCareHub Database Setup
-- Run this script in your PostgreSQL database

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Users table
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    username TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL
);

-- Herbs table
CREATE TABLE IF NOT EXISTS herbs (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    local_name TEXT,
    emoji TEXT,
    description TEXT NOT NULL,
    benefits JSONB NOT NULL,
    categories JSONB NOT NULL,
    preparation_methods JSONB NOT NULL,
    safety_info TEXT,
    image_url TEXT,
    is_indigenous TEXT NOT NULL DEFAULT 'false',
    region TEXT
);

-- Contact messages table
CREATE TABLE IF NOT EXISTS contact_messages (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    subject TEXT,
    message TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Community posts table
CREATE TABLE IF NOT EXISTS community_posts (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    tags JSONB NOT NULL DEFAULT '[]',
    image_url TEXT,
    likes TEXT NOT NULL DEFAULT '0',
    views TEXT NOT NULL DEFAULT '0',
    is_approved TEXT NOT NULL DEFAULT 'false',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Community comments table
CREATE TABLE IF NOT EXISTS community_comments (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id VARCHAR NOT NULL REFERENCES community_posts(id),
    author_name TEXT NOT NULL,
    author_email TEXT NOT NULL,
    content TEXT NOT NULL,
    likes TEXT NOT NULL DEFAULT '0',
    is_approved TEXT NOT NULL DEFAULT 'false',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Community likes table
CREATE TABLE IF NOT EXISTS community_likes (
    id VARCHAR PRIMARY KEY DEFAULT gen_random_uuid(),
    post_id VARCHAR REFERENCES community_posts(id),
    comment_id VARCHAR REFERENCES community_comments(id),
    user_email TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample herbs data
INSERT INTO herbs (name, local_name, emoji, description, benefits, categories, preparation_methods, safety_info, image_url, is_indigenous, region) VALUES
('Peppermint', '', '🌿', 'Refreshing herb for digestion, headaches, and mental clarity. Perfect for teas and aromatherapy.', '["Aids digestion", "Relieves headaches", "Improves mental clarity", "Natural decongestant"]', '["Mental Health", "Energy", "General Wellness"]', '["Tea", "Essential oil", "Fresh leaves", "Capsules"]', 'Generally safe for most people. Avoid if allergic to mint family plants.', '/attached_assets/generated_images/Fresh_peppermint_leaves_0a300d3e.png', 'false', 'Global'),
('Ginger', '', '🫚', 'Powerful anti-inflammatory root for nausea, digestion, and immune support.', '["Reduces nausea", "Anti-inflammatory", "Boosts immunity", "Aids digestion"]', '["Energy", "General Wellness"]', '["Fresh tea", "Powder", "Capsules", "Decoction"]', 'May interact with blood thinners. Consult healthcare provider if pregnant.', '/attached_assets/generated_images/Fresh_ginger_root_pieces_b404e3ce.png', 'false', 'Global'),
('Chamomile', '', '🌼', 'Gentle, calming herb for sleep, anxiety, and digestive comfort.', '["Promotes sleep", "Reduces anxiety", "Soothes digestion", "Anti-inflammatory"]', '["Mental Health", "Sleep", "General Wellness"]', '["Tea", "Tincture", "Capsules", "Poultice"]', 'Generally safe. May cause allergic reactions in people sensitive to ragweed family.', '/attached_assets/generated_images/Chamomile_flowers_blooming_fcc5a2fb.png', 'false', 'Global'),
('Moringa', 'Moringa oleifera', '🌿', 'The miracle tree, boosts energy, immunity, and nutrition with incredible nutrient density.', '["Complete nutrition", "Boosts energy", "Immune support", "Rich in vitamins"]', '["Energy", "General Wellness", "Weight Balance"]', '["Powder", "Fresh leaves", "Tea", "Capsules"]', 'Generally safe. Start with small amounts to assess tolerance.', '/attached_assets/generated_images/Fresh_moringa_plant_leaves_f8771929.png', 'true', 'Africa'),
('Neem', 'Muarubaini (Azadirachta indica)', '🍃', 'Traditionally used for skin health, immunity, and blood sugar balance support.', '["Skin health", "Immune support", "Blood sugar balance", "Natural antimicrobial"]', '["General Wellness", "Weight Balance"]', '["Tea", "Powder", "Paste", "Oil"]', 'Very bitter. Start with small amounts. Avoid during pregnancy.', '/attached_assets/generated_images/Neem_tree_leaves_8f8d6bbc.png', 'true', 'Africa'),
('Aloe Vera', 'Shubiri', '🌱', 'For digestion, skin healing, and cooling the body naturally.', '["Skin healing", "Digestive support", "Cooling properties", "Anti-inflammatory"]', '["General Wellness"]', '["Fresh gel", "Juice", "Topical application", "Powder"]', 'Use inner gel only. Avoid latex layer. May have laxative effects.', '/attached_assets/generated_images/Aloe_vera_plant_gel_c15d2219.png', 'true', 'Africa');

-- Insert sample community posts
INSERT INTO community_posts (author_name, author_email, title, content, category, tags, image_url, is_approved) VALUES
('Sarah Johnson', 'sarah@example.com', 'My Journey with Chamomile for Better Sleep', 'I''ve been struggling with insomnia for months, and chamomile tea has been a game-changer! I started drinking a cup 30 minutes before bed, and within a week, I noticed a significant improvement in my sleep quality. The gentle, calming effect is exactly what I needed. I also love how it helps with my evening anxiety. Highly recommend for anyone dealing with sleep issues!', 'success-story', '["sleep", "chamomile", "anxiety", "insomnia"]', '/attached_assets/generated_images/Chamomile_flowers_blooming_fcc5a2fb.png', 'true'),
('Michael Chen', 'michael@example.com', 'Ginger Tea: My Natural Energy Boost', 'As someone who works long hours, I was always looking for natural ways to boost my energy without caffeine crashes. Ginger tea has been incredible! I make it fresh every morning with lemon and honey. It gives me sustained energy throughout the day and helps with digestion too. The anti-inflammatory benefits are a bonus - my joints feel better than ever!', 'success-story', '["energy", "ginger", "digestion", "anti-inflammatory"]', '/attached_assets/generated_images/Fresh_ginger_root_pieces_b404e3ce.png', 'true'),
('Aisha Patel', 'aisha@example.com', 'Moringa Powder: My Daily Wellness Ritual', 'I''ve been taking moringa powder daily for 3 months now, and the results are amazing! My energy levels are consistent throughout the day, my skin looks healthier, and I feel more balanced overall. I mix it into my morning smoothie or just stir it into water. It''s become an essential part of my wellness routine. The nutrient density is incredible!', 'journey', '["moringa", "energy", "nutrition", "wellness"]', '/attached_assets/generated_images/Fresh_moringa_plant_leaves_f8771929.png', 'true');
