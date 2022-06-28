import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';

import { Header } from '../components/Header';
import { Task, TasksList } from '../components/TasksList';
import { TodoInput } from '../components/TodoInput';

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    const data = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }

    setTasks(oldState => [...oldState, data])
  }

  function handleToggleTaskDone(id: number) {
    const tasksCopy = tasks.map(task => ({ ...task }))

    const taskToUpdateIndex = tasksCopy.findIndex(task => task.id === id)

    tasksCopy[taskToUpdateIndex].done = !tasksCopy[taskToUpdateIndex].done

    setTasks(tasksCopy)
  }

  function handleRemoveTask(id: number) {
    const filteredTasks = tasks.filter(task => task.id !== id)

    setTasks(filteredTasks)
  }

  return (
    <View style={styles.container}>
      <Header tasksCounter={tasks.length} />

      <TodoInput addTask={handleAddTask} />

      <TasksList 
        tasks={tasks} 
        toggleTaskDone={handleToggleTaskDone}
        removeTask={handleRemoveTask} 
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