import { userTodoStore } from "../stores/store.svelte.js";
import { userAccessStore } from "../stores/store.svelte.js";

const addTodo = async (todo) => {
    const userStore = userAccessStore();
    const todoStore = userTodoStore();

    const email = userStore.active_user;

    const body = {
        email: email,
        todo: todo,
    };
    console.log("this is the body in addTodo:")
    console.log(body);

    const res = await fetch("http://localhost:8000/todos", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)

    });
    const data = await res.json();

    if (data.message === "todo created") {
        todoStore.addTodo(todo);
    };
    return data;
};

const deleteTodo = async (todo) => {
    const userStore = userAccessStore();
    const todoStore = userTodoStore();

    const email = userStore.active_user;
    console.log("this is the email in delete todos:")
    console.log(email)

    const body = {
        email: email,
        todo: todo,
    };

    console.log("this is the body in deleteTodo:")
    console.log(body);

    const res = await fetch("http://localhost:8000/todos/delete", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(body)

    });
    const data = await res.json();
    console.log(data.message);
    if (data.message === "todo deleted") {
        todoStore.deleteTodo(todo);
    };
    return data;
};

const fetchTodos = async () => {
    const userStore = userAccessStore();
    const email = userStore.active_user;
    console.log("fetching email:");
    console.log(email);
    const res = await fetch("http://localhost:8000/todos/get", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(email)

    });
    const data = await res.json();
    console.log("recieved todos");
    console.log(data);
    return data;
}

export { addTodo, fetchTodos, deleteTodo };