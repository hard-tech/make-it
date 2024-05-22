# Next.js & NextUI Template

This is a template for creating applications using Next.js 14 (app directory) and NextUI (v2).

[Try it on CodeSandbox](https://githubbox.com/nextui-org/next-app-template)

## Technologies Used

- [Next.js 14](https://nextjs.org/docs/getting-started)
- [NextUI v2](https://nextui.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [Tailwind Variants](https://tailwind-variants.org)
- [TypeScript](https://www.typescriptlang.org/)
- [Framer Motion](https://www.framer.com/motion/)
- [next-themes](https://github.com/pacocoursey/next-themes)

## How to Use

### Use the template with create-next-app

To create a new project based on this template using `create-next-app`, run the following command:

```bash
npx create-next-app -e https://github.com/nextui-org/next-app-template
```

### Install dependencies

You can use one of them `npm`, `yarn`, `pnpm`, `bun`, Example using `npm`:

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Setup pnpm (optional)

If you are using `pnpm`, you need to add the following code to your `.npmrc` file:

```bash
public-hoist-pattern[]=*@nextui-org/*
```

After modifying the `.npmrc` file, you need to run `pnpm install` again to ensure that the dependencies are installed correctly.

### Explications des modifications :

1. **Configuration Axios** :
   - Le fichier `axiosConfig.ts` configure Axios avec un `baseURL` et les en-têtes nécessaires. Vous pouvez définir `NEXT_PUBLIC_API_BASE_URL` dans votre fichier `.env.local` pour ajuster dynamiquement l'URL de base de l'API en fonction de votre environnement.

2. **Service de téléchargement de fichiers** :
   - Le fichier `upload-files.service.ts` gère les téléchargements de fichiers en utilisant Axios. Il inclut une fonction `upload` pour envoyer les fichiers avec la progression et une fonction `getFiles` pour récupérer la liste des fichiers téléchargés.

3. **Composant fonctionnel `UploadFiles`** :
   - Le composant utilise des hooks pour gérer l'état et les effets.
   - Le composant appelle le service de téléchargement pour envoyer les fichiers et mettre à jour l'état en fonction des réponses du serveur.
   - La progression du téléchargement et les messages de statut sont gérés via des hooks `useState`.

En utilisant ce code, votre application Next.js peut gérer les téléchargements de fichiers et afficher la progression et l'état des téléchargements.


## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE).