const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Début du seeding de la base de données...");

  // Créer un utilisateur de test
  const user = await prisma.user.upsert({
    where: { email: "test@jobtracker.com" },
    update: {},
    create: {
      email: "test@jobtracker.com",
      name: "Utilisateur Test",
      image: null,
    },
  });

  console.log("👤 Utilisateur créé:", user.name);

  // Créer quelques entreprises
  const companies = await Promise.all([
    prisma.company.upsert({
      where: { id: "company-1" },
      update: {},
      create: {
        id: "company-1",
        name: "TechCorp",
        description: "Une entreprise technologique innovante",
        website: "https://techcorp.com",
        industry: "Technologie",
        size: "100-500",
        location: "Paris, France",
        userId: user.id,
      },
    }),
    prisma.company.upsert({
      where: { id: "company-2" },
      update: {},
      create: {
        id: "company-2",
        name: "StartupXYZ",
        description: "Une startup prometteuse",
        website: "https://startupxyz.com",
        industry: "FinTech",
        size: "10-50",
        location: "Lyon, France",
        userId: user.id,
      },
    }),
  ]);

  console.log("🏢 Entreprises créées:", companies.length);

  // Créer des contacts
  const contacts = await Promise.all([
    prisma.contact.create({
      data: {
        firstName: "Marie",
        lastName: "Dupont",
        email: "marie.dupont@techcorp.com",
        position: "Responsable RH",
        linkedin: "https://linkedin.com/in/marie-dupont",
        userId: user.id,
        companyId: companies[0].id,
      },
    }),
    prisma.contact.create({
      data: {
        firstName: "Pierre",
        lastName: "Martin",
        email: "pierre.martin@startupxyz.com",
        position: "CTO",
        phone: "+33 1 23 45 67 89",
        userId: user.id,
        companyId: companies[1].id,
      },
    }),
  ]);

  console.log("📞 Contacts créés:", contacts.length);

  // Créer des candidatures
  const applications = await Promise.all([
    prisma.application.create({
      data: {
        title: "Développeur Full Stack",
        description: "Poste de développeur full stack avec React et Node.js",
        status: "APPLIED",
        priority: "HIGH",
        salary: 45000,
        location: "Paris",
        jobType: "FULL_TIME",
        source: "LinkedIn",
        jobUrl: "https://techcorp.com/jobs/fullstack",
        appliedAt: new Date(),
        userId: user.id,
        companyId: companies[0].id,
        contactId: contacts[0].id,
      },
    }),
    prisma.application.create({
      data: {
        title: "Lead Developer",
        description: "Poste de lead developer dans une startup",
        status: "INTERVIEW",
        priority: "MEDIUM",
        salary: 55000,
        location: "Lyon",
        jobType: "FULL_TIME",
        source: "Site web",
        jobUrl: "https://startupxyz.com/careers",
        appliedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Il y a 7 jours
        responseAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // Il y a 3 jours
        interviewAt: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000), // Dans 2 jours
        userId: user.id,
        companyId: companies[1].id,
        contactId: contacts[1].id,
      },
    }),
  ]);

  console.log("📝 Candidatures créées:", applications.length);

  console.log("✅ Seeding terminé avec succès!");
}

main()
  .catch((e) => {
    console.error("❌ Erreur lors du seeding:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
