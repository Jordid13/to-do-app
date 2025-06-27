This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

### DB Set Up
Make sure you have postgres installed and create a new database named `tododb`

```
CREATE DATABASE tododb
```

Proceed to create a `.env ` file inside of the root directory (.../to-do-app/.env) with the following content (replace content where neccesary)

```
DATABASE_URL="postgresql://<YOUR_USERNAME>:<YOUR PASSWORD (IF ANY)>@localhost:5432/tododb"
```
> Be mindful the above set up assumes your postgres post is at `5432`

## Project Set Up
Make sure you have node installed then install the required dependencies by running:

```bash
npm install
```
Now start the development server by running the command below

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
