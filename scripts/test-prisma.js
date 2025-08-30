const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  try {
    console.log("🔍 Test de connexion à la base de données...");

    // Test de connexion
    await prisma.$connect();
    console.log("✅ Connexion à PostgreSQL réussie!");

    // Vérifier les tables
    console.log("\n📊 Vérification des tables...");

    const userCount = await prisma.user.count();
    const companyCount = await prisma.company.count();
    const contactCount = await prisma.contact.count();
    const applicationCount = await prisma.application.count();

    console.log(`👥 Users: ${userCount}`);
    console.log(`🏢 Companies: ${companyCount}`);
    console.log(`📞 Contacts: ${contactCount}`);
    console.log(`📝 Applications: ${applicationCount}`);

    console.log("\n🎉 Configuration Prisma validée avec succès!");
  } catch (error) {
    console.error("❌ Erreur lors du test:", error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
