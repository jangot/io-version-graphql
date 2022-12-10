
import type { CodegenConfig } from '@graphql-codegen/cli';
import { loadSchemaSync } from '@graphql-tools/load';
import { GraphQLFileLoader } from '@graphql-tools/graphql-file-loader';

// const schema = loadSchemaSync("./scheme/*.graphql", {
//   loaders: [new GraphQLFileLoader()],
// })

const config: CodegenConfig = {
  overwrite: true,
  schema: './scheme/*.graphql',
  generates: {
    'src/generated/graphql.ts': {
      plugins: ["typescript", "typescript-resolvers"]
    },
    './graphql.schema.json': {
      plugins: ["introspection"]
    }
  }
};

export default config;
