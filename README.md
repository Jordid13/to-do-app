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
> Note that the above set up assumes your postgres post is at `5432`

Then generate a prisma client (used for querying and connecting to the database) and push the schema to the database (`tododb`)

```bash
# Generate Prisma client
npx prisma generate

# Push schema to database
npx prisma db push
```

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

## Project Structure

```
to-do-app/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   └── todos/
│   │   │       ├── route.ts              # GET /api/todos, POST /api/todos, PATCH /api/todos
│   │   │       └── [id]/
│   │   │           └── route.ts          # DELETE /api/todos/[id]
│   │   ├── page.tsx                      # Main application page
│   │   └── page.module.css               # CSS modules for styling
│   ├── components/
│   │   ├── Form.tsx                      # Task creation form
│   │   ├── ToDoList.tsx                  # Displays pending tasks
│   │   ├── DoneList.tsx                  # Displays completed tasks
│   │   ├── Modal.tsx                     # Modal component for editing task details 
│   │   └── AlertBox.tsx                  # Displays alerts/notifications
│   └── adapters/
│       └── api/
│           └── todo-adapter.ts           # API client for todo operations
├── prisma/
│   └── schema.prisma                     # Database schema definition
├── public/                               # Static assets
└── package.json                          # Dependencies and scripts
```

## Database Schema

```prisma
model Todo {
  id      Int    @id @default(autoincrement())
  name    String @db.VarChar(255)
  dueDate String @map("due_date") @db.VarChar(50)
  status  String @db.VarChar(255)

  @@map("todos")
}
```

## API Endpoints

### Base URL: `/api/todos`

| Method | Endpoint | Description | Request Body | Response |
|--------|----------|-------------|--------------|----------|
| GET | `/api/todos` | Fetch all todos | - | `Todo[]` |
| POST | `/api/todos` | Create new todo | `{ name, dueDate, status }` | `Todo` |
| PATCH | `/api/todos/[id]` | Update todo | `{ name?, dueDate?, status? }` | `Todo` |
| DELETE | `/api/todos/[id]` | Delete todo | - | `Todo` |

### Request/Response Examples

#### Create Todo (POST)
```json
// Request
{
  "name": "Buy groceries",
  "dueDate": "2024-01-20",
  "status": "todo"
}

// Response
{
  "id": 1,
  "name": "Buy groceries",
  "dueDate": "2024-01-20",
  "status": "todo"
}
```

#### Update Todo (PATCH)
```json
// Request
{
  "status": "done"
}

// Response
{
  "id": 1,
  "name": "Buy groceries",
  "dueDate": "2024-01-20",
  "status": "done"
}
```

## Context Providers

The app uses React Context for state management:

- **FormContext**: Manages form data and submission
- **ToDoContext**: Manages todo list state and refresh triggers
- **ModalContext**: Manages modal visibility and content

## Key Features

- ✅ Create, read, update, delete todos
- ✅ Mark todos as complete/incomplete
- ✅ Modal for viewing/editing todo details
- ✅ Form validation with alerts
- ✅ TypeScript for type safety
- ✅ PostgreSQL database with Prisma ORM

## Technologies Used

- **Frontend**: Next.js 14, React, TypeScript, CSS Modules
- **Backend**: Next.js API Routes
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Styling**: CSS Modules
