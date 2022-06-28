import React, { useCallback, useState } from 'react';
import { Alert, StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export type HandleEditTaskValues = {
  taskId: number,
  taskNewTitle: string
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const handleAddTask = useCallback((newTaskTitle: string) => {
    const taskExist = tasks.find(task => task.title === newTaskTitle);

    if (taskExist) {
      return Alert.alert('Task já cadastrada', 'Você não pode cadastrar uma task com o mesmo nome')
    }

    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data])
  }, [tasks])

  const handleToggleTaskDone = useCallback((id: number) => {
    const tasksCopy = tasks.map(task => ({ ...task }))

    const taskToUpdateIndex = tasksCopy.findIndex(task => task.id === id)

    tasksCopy[taskToUpdateIndex].done = !tasksCopy[taskToUpdateIndex].done

    setTasks(tasksCopy)
  }, [tasks])

  const handleRemoveTask = useCallback((id: number) => {
    Alert.alert(
      'Remover item', 
      'Tem certeza que você deseja remover esse item?',
      [
        {
          text: "Sim",
          onPress: () => {
            const filteredTasks = tasks.filter(task => task.id !== id)

            setTasks(filteredTasks)
          },
        },
        {
          text: "Não",
        },
      ]
    )
  }, [tasks])

  const handleEditTask = useCallback(({ taskId, taskNewTitle }: HandleEditTaskValues) => {
    const tasksCopy = tasks.map(task => ({ ...task }))

    const taskToUpdateIndex = tasksCopy.findIndex(task => task.id === taskId)
   
    tasksCopy[taskToUpdateIndex].title = taskNewTitle

    setTasks(tasksCopy)
  }, [tasks]) 

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
        editTask={handleEditTask}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#EBEBEB'
  }
})