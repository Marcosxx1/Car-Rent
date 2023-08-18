import { execSync } from "child_process";

const migrationDirectory = "./src/shared/infra/typeorm/migrations";

const [, , migrationName] = process.argv;

if (!migrationName) {
  console.error("Uso: ts-node create-migration.ts <nome_migration>");
  process.exit(1);
}

const command = `yarn typeorm migration:create ${migrationDirectory}/${migrationName}`;

try {
  execSync(command);
  console.log(`Migration "${migrationName}" criada com sucesso!`);
} catch (error) {
  console.error("Ocorreu um erro ao criar a migration:", error.message);
}
