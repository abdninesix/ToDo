import React, { useContext, useEffect, useRef, useState } from 'react'
import { ImBin, ImBook, ImCheckboxChecked, ImCheckboxUnchecked, ImCross, ImPencil, ImPlus, ImSearch } from 'react-icons/im'
import { Bounce, toast, ToastContainer } from 'react-toastify'
import { format } from 'timeago.js'
import { createTask, deleteTasks, fetchAllTasks, updateTask, taskIsDone } from '../utilities/api.js'
import ThemeButton from './ThemeButton.jsx'
import { ThemeContext } from './ThemeContext.jsx'

const Tasks = () => {

    const [input, setInput] = useState('');
    const [tasks, setTasks] = useState([]);
    const [copyTasks, setCopyTasks] = useState([]);
    const [updateTasks, setUpdateTasks] = useState(null);
    const [loading, setLoading] = useState(true)
    const [searchTerm, setSearchTerm] = useState('');
    const { theme } = useContext(ThemeContext);
    const inputRef = useRef(null);

    const getTasks = async () => {
        setLoading(true)
        try {
            const { data } = await fetchAllTasks()
            setTasks(data)
            setCopyTasks(data)
        } catch (error) {
            console.log(error)
        } finally { setLoading(false) }
    }
    useEffect(() => {
        getTasks()
    }, [])

    const handleAddUpdate = async () => {
        if (updateTasks && input) {
            const obj = { _id: updateTasks._id, taskName: input, isDone: updateTasks.isDone }
            handleUpdate(obj)
        }
        else if (updateTasks === null && input) { handleSubmit() }
        setInput('')
        setUpdateTasks(null)
    }
    useEffect(() => {
        if (updateTasks) {
            setInput(updateTasks.taskName)
            inputRef.current?.focus();
        }
    }, [updateTasks])

    const handleSubmit = async () => {
        const obj = { taskName: input, isDone: true }
        try {
            const { success } = await createTask(obj)
            if (success) { toast.success('Sucessfully created') }
            else { toast.error('Failed to create') }
            setInput('')
            getTasks()
        } catch (error) {
            console.log(error)
            toast.warning('Handle error')
        }
    }

    const handleDelete = async (id) => {
        try {
            const { success } = await deleteTasks(id)
            if (success) { toast.success('Task deleted') }
            else { toast.error('Failed to delete') }
            getTasks()
        } catch (error) {
            console.log(error)
            toast.warning('Handle error')
        }
    }

    const handleUpdate = async (item) => {
        const { _id, isDone, taskName } = item
        const obj = { taskName, isDone: isDone }
        try {
            const { success } = await updateTask(_id, obj)
            if (success) { toast.success('Task updated') }
            else { toast.error('Failed to update') }
            getTasks()
        } catch (error) {
            console.log(error)
            toast.warning('Handle error')
        }
    }

    const handleIsDone = async (item) => {
        const { _id, isDone } = item
        const obj = { isDone: !isDone }
        try {
            const { success } = await taskIsDone(_id, obj)
            if (success, isDone === true) { toast.success('Marked finished') }
            else if (success, isDone === false) { toast.success('Marked unfinished') }
            else { toast.error('Failed to mark') }
            await getTasks()
        } catch (error) {
            console.log(error)
            toast.warning('Handle error')
        }
    }

    const filteredTasks = tasks.filter(task =>
        task.taskName.toLowerCase().includes(searchTerm.toLowerCase())
      );      

    return (
        <div className='min-h-screen overflow-hidden w-screen dark:bg-stone-900 px-4 sm:px-8 md:px-16 lg:px-32 flex flex-col gap-6 items-center duration-300'>

            {/*Logo and Search bar*/}
            <div className='w-full mt-10 flex flex-wrap gap-8 items-center justify-between'>
                <a href='/' className='flex select-none drop-shadow-lg font-bold text-3xl text-green-500'><ImBook />ToDo</a>
                <div className='relative drop-shadow-xl'><div className='dark:hidden absolute -z-10 size-full scale-150 blur-md rounded-full bg-yellow-300' /><ThemeButton /></div>
                <div className='flex gap-4 shadow-md items-start bg-white rounded-md p-2'>
                    <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type='text' placeholder='Search a task' className='outline-none' />
                    <span className='size-6 text-2xl text-blue-500'><ImSearch /></span>
                </div>
            </div>

            {/*Task input and button*/}
            <div className='w-full mt-2 flex gap-4 shadow-md text-xl items-center bg-white rounded-md p-2'>
                <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddUpdate(); } }}
                    type='text'
                    placeholder='Write a new task here...'
                    className='w-full outline-none' />
                <button onClick={handleAddUpdate} className='size-6 text-2xl text-green-500'><ImPlus /></button>
                {updateTasks && (<button onClick={() => { setUpdateTasks(null); setInput('') }} className='size-6 text-2xl text-red-500'><ImCross /></button>)}
            </div>

            {/*Task list*/}
            <div className='w-full flex flex-col gap-5 mt-6'>
                {loading ?
                    (<span className='dark:text-gray-200 animate-fade'>Loading tasks...</span>) : tasks.length === 0 ?
                        (<span className='dark:text-gray-200 animate-fade'>No tasks posted yet</span>) :
                        (filteredTasks.map((item, index) => (
                            <div key={item._id} className='flex flex-col w-full animate-fade' style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'both' }}>
                                <div className='flex justify-between gap-4 p-2 rounded-md bg-gray-100 dark:bg-stone-800 duration-200 hover:scale-[101%]'>
                                    {/*Task info*/}
                                    <div className='flex items-center text-gray-500 text-xl font-bold'>{index + 1}.</div>
                                    <div className='flex flex-col gap-2 flex-1 min-w-0'>
                                        <span className='text-sm text-gray-500'>{item.createdAt === item.updatedAt ? `Posted ${format(item.createdAt)}` : `Updated ${format(item.updatedAt)}`}</span>
                                        <span className={`dark:text-gray-200 text-lg break-words ${item.isDone ? '' : 'line-through'}`}>{item.taskName}</span>
                                    </div>
                                    {/*Buttons*/}
                                    <div className='flex flex-col-reverse md:flex-row gap-2 text-xl'>
                                        <button onClick={() => handleDelete(item._id)} type='button' className='size-6 text-red-500'><ImBin /></button>
                                        <button onClick={() => setUpdateTasks(item)} type='button' className='size-6 text-blue-500'><ImPencil /></button>
                                        {item.isDone ?
                                            (<button onClick={() => handleIsDone(item)} type='button' className='size-6 text-green-500'><ImCheckboxUnchecked /></button>) :
                                            (<button onClick={() => handleIsDone(item)} type='button' className='size-6 text-green-500'><ImCheckboxChecked /></button>)}
                                    </div>
                                </div>
                            </div>)
                        ))}
            </div>

            <ToastContainer
                position="bottom-right"
                autoClose={2000}
                hideProgressBar={true}
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                //pauseOnFocusLoss
                draggable
                pauseOnHover
                theme={theme}
                transition={Bounce}
            />

        </div>
    )
}

export default Tasks