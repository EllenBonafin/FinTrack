import { PrismaClient, TransactionType } from "@prisma/client";

const prisma = new PrismaClient();

const categories = [
  { name: "Salário", type: TransactionType.INCOME, icon: "💰" },
  { name: "Freelance", type: TransactionType.INCOME, icon: "💼" },
  { name: "Alimentação", type: TransactionType.EXPENSE, icon: "🍔" },
  { name: "Transporte", type: TransactionType.EXPENSE, icon: "🚗" },
  { name: "Saúde", type: TransactionType.EXPENSE, icon: "🏥" },
  { name: "Lazer", type: TransactionType.EXPENSE, icon: "🎮" },
  { name: "Outros", type: undefined, icon: "📦" },
];

async function main() {
  console.log("Seeding categories...");

  for (const category of categories) {
    await prisma.category.upsert({
      where: { name: category.name },
      update: {},
      create: category,
    });
  }

  console.log("Seed completed.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
