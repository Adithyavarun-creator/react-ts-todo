import { Fragment, useEffect, useState } from 'react'
import './App.css'
import toast, { Toaster } from 'react-hot-toast';
import { v4 as uuidv4 } from 'uuid';
import Navbar from './components/Navbar/Navbar';
import { FiEdit } from 'react-icons/fi'
import moment from 'moment'
import Footer from './components/Footer/Footer';
import { motion } from 'framer-motion'
import { RiDeleteBin6Line, RiShareForwardLine } from 'react-icons/ri'
import { BsFillCalendar2CheckFill } from 'react-icons/bs'
import { BiSolidCategoryAlt, BiCopyAlt } from 'react-icons/bi'
import { MdShare } from 'react-icons/md'


//type interface for Todo created
export interface Todo {
  id: string
  text: string
  category: string
  createdAt: number
}






const App = () => {


  //add todotext and todocategory
  const [text, setText] = useState<any | null>("");
  const [category, setCategory] = useState<any | null>("");

  //toggle the form for add and edit
  const [toggle, setToggle] = useState(false)
  //fetching todods from localestorage
  const [allTodos, setAllTodos] = useState<Todo[]>([])
  //for editing a todo
  const [isEditing, setIsEditing] = useState(false)

  //disable the button
  const [disable, setDisable] = useState(false)


  //for editing specific id in todolist
  const [editId, setEditId] = useState<any | null>(null)

  //for auto-search todo from localestorage
  const [search, setSearch] = useState("");

  const [getCategory, setGetCategory] = useState<any>()


  //fetching todos
  useEffect(() => {
    if (localStorage.getItem("todos")) {
      const storedList = JSON.parse(localStorage.getItem("todos") || '{}');
      setAllTodos(storedList.sort((a: any, b: any) => a - b).reverse());
    }
  }, [])

  //console.log(cat);




  //getting all categories from todos and making a set to classify and clicking it
  const getAllCategories = [...new Set(allTodos.map((c: any) => c.category))]
  //console.log(getAllCategories);

  const filterTodos = (cat: string) => {
    const updatedcategories = allTodos.filter((c: any) => c.category === cat)
    setGetCategory(updatedcategories)
    window.scrollTo(0, 400)
  }






  //adding and updating a todo
  const addAndUpdateTodo = (e: any) => {
    e.preventDefault()
    window.scrollTo(0, 1000)


    if (!text) {
      toast.error("Please enter your Title of Todo")
      setDisable(false)
    } if (!category) {
      toast.error("Please enter your Category of Todo")
      setDisable(false)
    } else if (text && category && isEditing) {
      //updating a todo
      setDisable(true)
      setAllTodos(
        allTodos.map((item: any) => {
          if (item.id === editId) {
            return { ...item, text: text, category: category }
          }
          return item;
        }
        )
      )
      setToggle(false)
      toast('Updated the Todo !', {
        icon: '👏',
      });
      setText('')
      setCategory('')
      setIsEditing(false)
      setDisable(false)

    } else {
      setDisable(true)
      const newTodo: Todo = {
        id: uuidv4(), text: text,
        category: category,
        createdAt: Date.now()
      }
      setAllTodos([...allTodos, newTodo])
      localStorage.setItem("todos", JSON.stringify([...allTodos, newTodo]));
      toast('Good Job! Todo Added', {
        icon: '👏',
      });
      window.scrollTo({
        top: document.body.scrollHeight,
        left: 0,
        behavior: 'smooth'
      });
      setCategory('')
      setText('')
      setToggle(false)
      setDisable(false)
    }
  }




  //deleting a todo
  const deleteTodo = (id: string) => {
    const deleted = allTodos.filter((t: any) => t.id !== id);
    setAllTodos(deleted);
    localStorage.setItem("todos", JSON.stringify(deleted))

  }


  //editing a todo
  const editTodo = (id: string) => {
    const edited = allTodos.find((t: any) => t.id === id);
    setToggle(true)
    setIsEditing(true)
    window.scrollTo(0, 0)
    setEditId(id)
    setCategory(edited?.category)
    setText(edited?.text)

  }

  //sharing a todo
  const shareFunction = async (text: string) => {
    try {
      await navigator.share({
        text: text,
      });
    } catch (error) {
      console.log(error);
    }
  };

  //copying the todo to clipboard
  const copyFunction = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast.success('Text content of your Todo is copied !')
    } catch (err) {
      console.error('Failed to copy: ', err);
    }
  }


  //console.log(allTodos);




  return (
    <>
      <Navbar />
      <div className='header-content'>
        <div>
          <h1 className='header-title' data-testid='form-element'>Add Your Todos and ease your brainzzz</h1>
        </div>
        <div>
          <button className='addtodo-button' title='Add Todo' onClick={() => setToggle(!toggle)}>📝 Create a New Todo</button>
        </div>
      </div>


      {toggle &&
        <motion.form className='addtodo-container'
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
        >
          <div className='addtodo-fields'>
            <label className='addtodo-label' htmlFor="category">Category</label>
            <input className='addtodo-input'
              placeholder="Enter the category of Todo"
              name='category' type="text" id='category' value={category} onChange={(e) => setCategory(e.target.value)} required />
          </div>
          <div className='addtodo-fields'>
            <label className='addtodo-label' htmlFor="text">Todo Title</label>
            <input className='addtodo-input'
              placeholder='Enter Todo information'
              name='text' type="text" id='text' value={text} onChange={(e) => setText(e.target.value)} required />
          </div>
          <div className='addtodo-btn-field'>
            <button className='addtodo-button' onClick={() => setToggle(false)}>
              Cancel
            </button>
            <button className='addtodo-button' onClick={addAndUpdateTodo} disabled={disable}>
              {isEditing ? 'Save Changes' : 'Save'}
            </button>
          </div>
        </motion.form >
      }


      <div>
        <h1 className='todo-length'>⚡⚡There are totally {allTodos.length === 1 ? `${allTodos.length} todo` : `${allTodos.length} todos`}  you have created⚡⚡</h1>
      </div>

      <div className='search-box'>
        <input type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className='search-box-input' placeholder='Search specific Todo by typing category/name' />
      </div>


      <div className="category-btn-box">
        <div className='btn-center'>
          {
            getAllCategories && getAllCategories.map((c, index: number) => (
              <Fragment key={index} >
                <button className='category-filter' onClick={() => filterTodos(c)}>{c}</button>
              </Fragment>
            ))
          }
        </div>


        <div>
          {
            getCategory && <div className='all-todo-textbox'>
              <h1 className='header-title'>{getCategory?.length} results for your filter</h1>
            </div>
          }
          {
            getCategory && getCategory.map((c: any, index: number) => (
              <Fragment key={c.id}>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.7 }}
                  className='todo-boxesize'>
                  <div className="todo-box">
                    <div className='todo-datebox'>
                      <BiSolidCategoryAlt className='icon' />
                      <span className='todo-category'>{c.category}</span>
                    </div>
                    <div className='todo-datebox'>
                      {/* <BsPencilSquare className='icon' /> */}
                      <span className='todo-text'>👉 {c.text}</span>
                    </div>
                    <div className='todo-datebox'>
                      <BsFillCalendar2CheckFill className='icon' />
                      <span className='todo-date'>{moment(new Date(c.createdAt)).format("MMMM Do YYYY, h:mm:ss a")}</span>
                    </div>
                  </div>


                  <div className="alter-icons">
                    <div>
                      <span className='edit-btn' onClick={() => copyFunction(c.text)}><BiCopyAlt color='#fff' className='icon' title='Copy' /></span>
                    </div>
                    <div>
                      <span className='edit-btn' onClick={() => shareFunction(c.text)}><MdShare color='#8dc6ff' className='icon' title='Share' /></span>
                    </div>
                    <div>
                      <span className='edit-btn' onClick={() => editTodo(c.id)}><FiEdit color="#60e550" className='icon' title='Edit' /></span>
                    </div>
                    <div>
                      <span className='delete-btn' onClick={() => deleteTodo(c.id)}><RiDeleteBin6Line color="red" fill="red" className='icon' title='Delete' /></span>
                    </div>
                  </div>
                </motion.div>
              </Fragment>
            ))
          }
        </div>
      </div>



      <div className='all-todo-textbox'>
        <h1 className='todo-length'>Your complete Todo List</h1>
      </div>


      <div
        className='todo-box-container'>
        {!allTodos.length
          ? <h1 className='todo-length'>😥😥No Todos added here😥😥</h1> :
          <>
            {
              allTodos && allTodos.filter((result: Todo) => {
                if (search === "") {
                  return result;
                } else if (
                  result.text.toLowerCase().includes(search.toLowerCase()) ||
                  result.category.toLowerCase().includes(search.toLowerCase())
                ) {
                  return result;
                }
              })
                .map((todo: Todo) => (
                  <Fragment key={todo.id}>
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 1.7 }}
                      className='todo-boxes'>
                      <div className="todo-box">
                        <div className='todo-datebox'>
                          <BiSolidCategoryAlt className='icon' />
                          <span className='todo-category'>{todo.category}</span>
                        </div>
                        <div className='todo-datebox'>
                          {/* <BsPencilSquare className='icon' /> */}
                          <span className='todo-text'>👉 {todo.text}</span>
                        </div>
                        <div className='todo-datebox'>
                          <BsFillCalendar2CheckFill className='icon' />
                          <span className='todo-date'>{moment(new Date(todo.createdAt)).format("MMMM Do YYYY, h:mm:ss a")}</span>
                        </div>
                      </div>


                      <div className="alter-icons">
                        <div>
                          <span className='edit-btn' onClick={() => copyFunction(todo.text)}><BiCopyAlt color='#fff' className='icon' title='Copy' /></span>
                        </div>
                        <div>
                          <span className='edit-btn' onClick={() => shareFunction(todo.text)}><MdShare color='#8dc6ff' className='icon' title='Share' /></span>
                        </div>
                        <div>
                          <span className='edit-btn' onClick={() => editTodo(todo.id)}><FiEdit color="#60e550" className='icon' title='Edit' /></span>
                        </div>
                        <div>
                          <span className='delete-btn' onClick={() => deleteTodo(todo.id)}><RiDeleteBin6Line color="red" fill="red" className='icon' title='Delete' /></span>
                        </div>
                      </div>
                    </motion.div>
                  </Fragment>
                ))
            }

          </>
        }

        <Toaster
          position="top-center"
          reverseOrder={false}
        />
        <Footer />

      </div>


    </>
  )
}

export default App

