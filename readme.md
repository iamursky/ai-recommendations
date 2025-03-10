# Cori Test Assignment

## Getting Started

1. Install dependencies:

```bash
npm ci
```

2. Create `.env.local` file and add OpenAI API to it:

```plaintext
OPENAI_API_KEY=<Your key here>
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Tech Stack

### Production Stack

- [Next.js](https://nextjs.org/) as the React framework
- [Tailwind CSS](https://tailwindcss.com/) for styling
- [Mantine](https://mantine.dev/) UI component library
- [TanStack Query](https://tanstack.com/query/latest) for data fetching

### Development Stack

- [TypeScript](https://www.typescriptlang.org/) as the programming language
- [Prettier](https://prettier.io/) for formating code according to the rules
- [ESLint](https://eslint.org/) for checking code quality and formatting

## Creating OpenAI API Key

1. Login or create a new [OpenAI](https://auth.openai.com/create-account) account
2. Create a new secret key at [API Keys](https://platform.openai.com/api-keys) page
3. Copy the key and add it to the `.env.local` file in the root of the project as `OPENAI_API_KEY`

## References

- Cities data from [dr5hn/countries-states-cities-database](https://github.com/dr5hn/countries-states-cities-database)
- Cities population data from [lmfmaier/cities-json](https://raw.githubusercontent.com/lmfmaier/cities-json)
