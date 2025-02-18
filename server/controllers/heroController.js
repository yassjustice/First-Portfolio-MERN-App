import Hero from "../models/Hero.js";

/**
 * Get the hero section details
 */
export const getHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: "Hero section not found" });
    }
    res.status(200).json(hero);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Create a new hero section
 */
export const createHero = async (req, res) => {
  try {
    const { heroImage, description, socialLinks, ctaLinks } = req.body;

    const existingHero = await Hero.findOne();
    if (existingHero) {
      return res.status(400).json({ message: "Hero section already exists. Update instead." });
    }

    const newHero = new Hero({ heroImage, description, socialLinks, ctaLinks });
    await newHero.save();

    res.status(201).json({ message: "Hero section created successfully", hero: newHero });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Update the hero section details
 */
export const updateHero = async (req, res) => {
  try {
    const { heroImage, description, socialLinks, ctaLinks } = req.body;

    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: "Hero section not found" });
    }

    hero.heroImage = heroImage || hero.heroImage;
    hero.description = description || hero.description;
    hero.socialLinks = socialLinks || hero.socialLinks;
    hero.ctaLinks = ctaLinks || hero.ctaLinks;

    await hero.save();
    res.status(200).json({ message: "Hero section updated", hero });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * Delete the hero section
 */
export const deleteHero = async (req, res) => {
  try {
    const hero = await Hero.findOne();
    if (!hero) {
      return res.status(404).json({ message: "Hero section not found" });
    }

    await hero.deleteOne();
    res.status(200).json({ message: "Hero section deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
