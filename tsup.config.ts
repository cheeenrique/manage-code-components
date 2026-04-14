import { defineConfig } from 'tsup';

export default defineConfig({
  entry: {
    index: 'src/index.ts',
    'theme/index': 'src/theme/index.ts',
  },
  format: ['esm', 'cjs'],
  dts: {
    tsconfig: 'tsconfig.build.json',
  },
  splitting: true,
  treeshake: true,
  clean: true,
  sourcemap: true,
  external: [
    'react',
    'react-dom',
    'react-hook-form',
    'zod',
    '@hookform/resolvers',
    'tailwindcss',
    '@tiptap/core',
    '@tiptap/extension-placeholder',
    '@tiptap/pm',
    '@tiptap/react',
    '@tiptap/starter-kit',
  ],
  outDir: 'dist',
  minify: false,
});
