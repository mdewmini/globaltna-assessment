const mongoose = require("mongoose");
const JobRequest = require("./models/JobRequest");
require("dotenv").config();

const sampleJobs = [
  {
    title: "Leaking kitchen tap needs fixing",
    description: "The kitchen tap has been dripping for a week. Need a plumber ASAP.",
    category: "Plumbing",
    location: "Glasgow",
    contactName: "Alice Brown",
    contactEmail: "alice@example.com",
    status: "Open",
  },
  {
    title: "Garden fence painting",
    description: "Need the back garden fence painted. About 20 metres of wooden panels.",
    category: "Painting",
    location: "Edinburgh",
    contactName: "Bob Smith",
    contactEmail: "bob@example.com",
    status: "Open",
  },
  {
    title: "Faulty bathroom electrics",
    description: "Bathroom light switch sparks occasionally. Urgent safety concern.",
    category: "Electrical",
    location: "Manchester",
    contactName: "Carol White",
    contactEmail: "carol@example.com",
    status: "In Progress",
  },
  {
    title: "Built-in wardrobe installation",
    description: "Looking for a joiner to build a fitted wardrobe in the master bedroom.",
    category: "Joinery",
    location: "London",
    contactName: "David Jones",
    contactEmail: "david@example.com",
    status: "Open",
  },
  {
    title: "Boiler pressure keeps dropping",
    description: "Boiler loses pressure every few days. Need someone to check for leaks.",
    category: "Plumbing",
    location: "Leeds",
    contactName: "Emma Clark",
    contactEmail: "emma@example.com",
    status: "Closed",
  },
  {
    title: "Living room ceiling repaint",
    description: "Water stain on living room ceiling from old leak (now fixed). Needs repainting.",
    category: "Painting",
    location: "Bristol",
    contactName: "Frank Hall",
    contactEmail: "frank@example.com",
    status: "Open",
  },
  {
    title: "New outdoor power socket",
    description: "Want a weatherproof socket installed outside for garden tools.",
    category: "Electrical",
    location: "Glasgow",
    contactName: "Grace Lee",
    contactEmail: "grace@example.com",
    status: "Open",
  },
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ Connected to MongoDB");

    await JobRequest.deleteMany({});
    console.log("🗑️  Cleared existing jobs");

    await JobRequest.insertMany(sampleJobs);
    console.log(`🌱 Seeded ${sampleJobs.length} jobs`);

    process.exit(0);
  } catch (err) {
    console.error("❌ Seed failed:", err.message);
    process.exit(1);
  }
}

seed();
