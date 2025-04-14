//const API_URL = 'http://localhost:8080'
const API_URL = 'https://todo-server-liart.vercel.app/'

export const createTask = async (taskObj) => {
    const url = `${API_URL}/tasks`
    const options = {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(taskObj)
    }
    try {
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error
    }
}

export const fetchAllTasks = async () => {
    const url = `${API_URL}/tasks`
    const options = {
        method: 'GET',
        headers: {'Content-Type':'application/json'}
    }
    try {
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error
    }
}

export const deleteTasks = async (id) => {
    const url = `${API_URL}/tasks/${id}`
    const options = {
        method: 'DELETE',
        headers: {'Content-Type':'application/json'}
    }
    try {
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error
    }
}

export const updateTask = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`
    const options = {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reqBody)

    }
    try {
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error
    }
}

export const taskIsDone = async (id, reqBody) => {
    const url = `${API_URL}/tasks/${id}`
    const options = {
        method: 'PUT',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(reqBody)
    }
    try {
        const result = await fetch(url, options)
        const data = await result.json()
        return data
    } catch (error) {
        return error
    }
}