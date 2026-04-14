# manage-code-components

Biblioteca de componentes React para interfaces produtivas: formulários, navegação, feedback e peças de dashboard. Está alinhada ao ecossistema **Tailwind CSS** e padrões no estilo **shadcn/ui** (Radix, tokens em CSS variables), com **integração nativa ao React Hook Form** e tema que pode ser lido do seu projeto ou sobrescrito por props.

Use quando quiser montar telas rápido sem reinventar inputs, layout de formulário e consistência visual entre apps.

## O que a lib oferece

- **Formulários**: `Form`, `FormField`, `FormItem`, labels, mensagens de erro e inputs especializados (texto, máscara, moeda, data, OTP, rich text com Tiptap, etc.).
- **Tema**: `AdaptUIProvider` resolve tokens a partir das **CSS variables** do seu app (por exemplo `--primary`, `--background`) ou aplica um fallback; você pode ainda passar `theme` parcialmente via props.
- **Utilitários**: `cn()` (clsx + tailwind-merge), hook `useTheme`, export dedicado do pacote de tema.
- **Tree-shaking**: ESM + CJS com `sideEffects: false` para importar só o que usar.

## Requisitos

- **React** 18+
- **Tailwind CSS** 3.4+ (a lib usa classes semânticas como `border-input`, `bg-background`, etc.; configure o tema no seu app como faria com shadcn/ui).
- **react-hook-form** (obrigatório para `Form`, `FormField` e o fluxo de formulário documentado abaixo).

## Instalação

```bash
npm install manage-code-components react react-dom tailwindcss react-hook-form
```

Com **pnpm** ou **yarn**, use o equivalente ao comando acima.

### Rich text (`InputRichText`)

O editor rich text depende dos pacotes **Tiptap** (peer opcionais). Instale-os no app que for usar esse componente:

```bash
npm install @tiptap/core @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm
```

## Configuração rápida no app

1. Garanta que o **Tailwind** do seu projeto define as variáveis de tema (ex.: `--primary`, `--background`, `--border`, `--input`, `--ring`) no `:root` ou no escopo do layout, no mesmo espírito do [shadcn/ui](https://ui.shadcn.com).
2. Envolva a árvore da aplicação (ou só as rotas que usam os componentes) com o provider de tema:

```tsx
import { AdaptUIProvider } from 'manage-code-components';

export function App({ children }: { children: React.ReactNode }) {
  return <AdaptUIProvider>{children}</AdaptUIProvider>;
}
```

Opcionalmente, sobrescreva tokens:

```tsx
<AdaptUIProvider
  theme={{
    colors: { primary: '#2563eb', primaryForeground: '#ffffff' },
  }}
>
  {children}
</AdaptUIProvider>
```

3. Importe os componentes a partir do pacote principal.

## Uso com React Hook Form

Exemplo mínimo com `Form`, `FormField`, `InputText` e `Button`:

```tsx
import { Form, FormField, InputText, Button } from 'manage-code-components';
import { useForm } from 'react-hook-form';

type Values = { name: string };

export function Example() {
  const form = useForm<Values>({ defaultValues: { name: '' } });

  return (
    <Form form={form} onSubmit={(data) => console.log(data)}>
      <FormField
        control={form.control}
        name="name"
        render={({ field }) => <InputText label="Nome" {...field} />}
      />
      <Button type="submit">Salvar</Button>
    </Form>
  );
}
```

Dentro de `<Form>` o `FormProvider` do React Hook Form já está disponível; os inputs podem integrar-se ao contexto quando usados com `FormField` / estrutura de formulário da lib.

### Subpath `theme`

Para importar apenas utilitários de tema (por exemplo em código que não precisa do barrel principal):

```ts
import { resolveTheme, defaultTheme } from 'manage-code-components/theme';
```

## Explorar os componentes

O repositório inclui **Storybook** para navegar pelos componentes, variantes e acessibilidade.

| Comando                    | Descrição                                      |
| -------------------------- | ---------------------------------------------- |
| `npm run build`            | Build da lib com tsup (`dist/`)               |
| `npm test`                 | Vitest                                         |
| `npm run lint`             | `tsc --noEmit`                                 |
| `npm run storybook`        | Storybook em http://localhost:6006             |
| `npm run build-storybook`  | Site estático em `storybook-static/`          |

### Publicar o Storybook no GitHub Pages

O repositório já inclui o workflow [`.github/workflows/deploy-storybook.yml`](.github/workflows/deploy-storybook.yml) (build do Storybook + `deploy-pages`).

**Na página Settings → Pages** o GitHub pode mostrar cartões como *“GitHub Pages Jekyll”* ou *“Static HTML”*. **Não precisas de os escolher** para este projeto: são *starters* que criam outros workflows. O deploy do Storybook usa o nosso ficheiro em `.github/workflows/`.

1. Garante que o código (com esse workflow) está em `main` ou `master`.
2. Abre **Actions** → workflow **Deploy Storybook** → **Run workflow** (ou faz push; também corre em cada push).
3. Se aparecer pedido de aprovação do ambiente **github-pages**, aprova em **Settings → Environments**.
4. Depois do primeiro deploy com sucesso, em **Settings → Pages** passa a aparecer o URL do site (ex.: `https://cheeenrique.github.io/manage-code-components/`). O `STORYBOOK_BASE_PATH` no workflow aponta para `/<nome-do-repo>/` para os assets carregarem bem em *project sites*.

## Licença

MIT
