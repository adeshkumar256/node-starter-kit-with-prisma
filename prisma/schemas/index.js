const { join } = require('path');
const { readFileSync, writeFileSync } = require('fs');

const schemasDir = join(__dirname, './');
const outputFilePath = join(__dirname, '../schema.prisma');

const userSchema = readFileSync(join(schemasDir, 'User.prisma'), 'utf-8');
const postSchema = readFileSync(join(schemasDir, 'Post.prisma'), 'utf-8');

const combinedSchema = `
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

generator client {
  provider = "prisma-client-js"
}

${userSchema}
${postSchema}
`;

writeFileSync(outputFilePath, combinedSchema);

console.log('Schema combined successfully!');
