import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function seedCities() {
  const citiesData = [
    { name: 'Paris' },
    { name: 'New York' },
    { name: 'Istanbul' },
    { name: 'London' },
    { name: 'Madrid' },
    { name: 'Tokyo' },
    { name: 'Dubai' },
    { name: 'Blida' },
    { name: 'Wakanda' },
    { name: 'Gotham' },
  ];

  for (const cityData of citiesData) {
    await prisma.city.create({ data: cityData });
  }
}

seedCities()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });