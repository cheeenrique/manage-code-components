# AdaptUI

Biblioteca de componentes React para produtividade, com Tailwind CSS, tema e integração com React Hook Form.

## Instalação

```bash
npm install adaptui react react-dom tailwindcss
```

### Rich text (`InputRichText`)

Quem usar o editor rich text precisa instalar também os peers do Tiptap:

```bash
npm install @tiptap/core @tiptap/react @tiptap/starter-kit @tiptap/extension-placeholder @tiptap/pm
```

## Uso rápido

```tsx
import { Form, FormField, InputText, Button } from 'adaptui';
import { useForm } from 'react-hook-form';

export function Example() {
  const form = useForm({ defaultValues: { name: '' } });

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

Configure o tema do Tailwind no seu app (classes como `border-input`, `bg-background`, etc.) como no shadcn/ui.

## Scripts do pacote

| Comando      | Descrição        |
| ------------ | ---------------- |
| `npm run build` | Build com tsup |
| `npm test`      | Vitest           |
| `npm run lint`  | `tsc --noEmit`   |
| `npm run storybook` | Storybook em http://localhost:6006 |
| `npm run build-storybook` | Site estático em `storybook-static/` |

### Publicar o Storybook no GitHub Pages

No repositório: **Settings → Pages → Build and deployment → Source: GitHub Actions**. O workflow [`.github/workflows/deploy-storybook.yml`](.github/workflows/deploy-storybook.yml) gera o build em cada push para `main` ou `master`, com `base` correto (`STORYBOOK_BASE_PATH=/nome-do-repo/`). A URL fica no formato `https://<usuário>.github.io/<repositório>/`.

## Licença

MIT
