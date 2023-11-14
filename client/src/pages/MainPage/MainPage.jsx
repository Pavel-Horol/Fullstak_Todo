import React, { useCallback, useState, useContext, useEffect } from "react";
import "./MainPage.scss"
import axios from "axios";
import { AuthContext } from "../../Context/AuthContext";

const MainPage = () => {
  const [text, setText]  = useState("")
  const {userId} = useContext(AuthContext)
  const [todos, setTodos] = useState([])

//https://cf582t02-5000.euw.devtunnels.ms/

  const getTodo = useCallback(async () => {
    try {
      await axios.get("http://localhost:5000/api/todo/", {
        headers: {
          "Content-Type": "application/json"
        },
        params: {
          userId
        }
      }).then(response => {
        setTodos(response.data)
      })
    } catch (error) {
      console.log(error)
    }
  }, [userId])

  const createTodo = useCallback(async () => {
    if(!text) return null;
    try {
      await axios.post("http://localhost:5000/api/todo/add", { text, userId }, {
        headers: { "Content-Type": "application/json" }
      }).then((res) => {
        console.log(res)
        setTodos([...todos], res.data)
        getTodo()
      })
    } catch (error) {
      console.log(error)
    }
  }, [text, userId,todos, getTodo])


  const deleteTodo = useCallback(async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/todo/delete/${id}`, {id}, {
        headers: {'Content-Type': 'application/json'}})
        .then(() => getTodo())
    } catch (error) {
      console.log(error)
    }
  }, [getTodo]);
  
  const completedTodo = useCallback(async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/todo/completed/${id}`, {id}, {
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {
        setTodos([...todos], res.data)
        getTodo()
      })
    } catch (error) {
      console.log(error)
    }
  },[todos, getTodo]);

  const importantTodo = useCallback(async (id) => {
    try {
      await axios.put(`http://localhost:5000/api/todo/important/${id}`, {id}, {
        headers: {"Content-Type": "application/json"}
      })
      .then(res => {
        setTodos([...todos], res.data)
        getTodo()
      })
    } catch (error) {
      console.log(error)
    }
  },[todos, getTodo]);

  // const getHandler = async () => {
  //   axios.get('http://localhost:5000/')
  //     .then(response =>console.log(response.data))
  // }



useEffect(() => {
    getTodo()
  }, [getTodo])
  return (
    <div className="container">
      {/* <button onClick={getHandler}>click</button> */}
      <h4>Додати задачу</h4>
      <form className="form form-login" onSubmit={e => e.preventDefault()}>
        <div className="row">
          <div className="input-field col s12">
            <label htmlFor="textInput">Задача</label>
            <input
              type="text"
              id="textInput"
              name="text"
              className="validate"
              value={text}
              onChange={e => {setText(e.target.value)}}
            />
          </div>
        </div>
        <div className="row">
          <button onClick={() => {
            createTodo()
            setText("")
            }} className="waves-effect waves-light btn blue">
            Додати
          </button>

        </div>
      </form>
      <h3>Активні задачі</h3>
      <div className="todos">
        {
          todos.map((todo, index) => {
            let cls = ["row flex todos-item"]
              if (todo.completed){
                cls.push('completed')
              }
              if(todo.important){
                cls.push('important')
              }
            return (
              <div className={cls.join(" ")} key={index}>
                <div className="col todos-num">{index + 1}</div>
                  <div className="col todos-text">{todo.text}</div>
                  <div className="col todos-buttons">
                  <i onClick={() => {
                    completedTodo(todo._id)
                    }} className={`material-icons blue-text`}>check</i>
                  <i  onClick={() => importantTodo(todo._id)} className="material-icons orange-text">warning</i>
                  <i onClick={() => deleteTodo(todo._id)} className="material-icons red-text">delete</i>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>
  );
};

export default MainPage;
