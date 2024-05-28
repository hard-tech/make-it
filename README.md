# Make-it (front-end)

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

## Explanation of Modifications

1. **Axios Configuration**:
   - The `axiosConfig.ts` file configures Axios with a `baseURL` and necessary headers. You can set `NEXT_PUBLIC_API_BASE_URL` in your `.env.local` file to dynamically adjust the API base URL based on your environment.

2. **File Upload Service**:
   - The `upload-files.service.ts` file handles file uploads using Axios. It includes an `upload` function to send files with progress tracking and a `getFiles` function to retrieve the list of uploaded files.

3. **Functional Component `UploadFiles`**:
   - The component uses hooks to manage state and effects.
   - The component calls the upload service to send files and updates the state based on server responses.
   - Upload progress and status messages are managed via `useState` hooks.

By using this code, your Next.js application can handle file uploads and display upload progress and status.

## License

Licensed under the [MIT license](https://github.com/nextui-org/next-app-template/blob/main/LICENSE)