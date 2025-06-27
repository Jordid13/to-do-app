interface Form {
  id?: number;
  name?: string;
  dueDate?: string;
  status?: string;
}

export class TodoAdapter {
  async getTodos() {
    const response = await fetch("/api/todos");
    const res = await response.json();
    return res;
  }

  async createTodo(data: Form) {
    const response = await fetch("/api/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  }

  // Note: this endpoint handles partial updates to the status or full updates to the name of todo or due date
  async updateTodo(data: Form) {
    const response = await fetch("/api/todos", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    return res;
  }

  async deleteTodo(id: number) {
    const response = await fetch(`/api/todos/${id}`, {
      method: "DELETE",
    });
    const res = await response.json();
    return res;
  }
}
