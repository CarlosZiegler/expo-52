"use dom";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, CheckCircle2, Circle, Trash2 } from "lucide-react";
import styles from "./task-list.module.css";
import { TaskDrawer } from "./task-drawer";

interface Task {
  id: string;
  title: string;
  isCompleted: boolean;
  priority: "low" | "medium" | "high";
}

//create funtion to create id without crypto
const createId = () => {
  return Math.random().toString(36).substring(2, 15);
};

export default function TaskList() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddNewTask(
    title: string,
    priority: "low" | "medium" | "high"
  ) {
    const task: Task = {
      id: createId(),
      title,
      isCompleted: false,
      priority,
    };

    setTasks((prev) => [...prev, task]);
  }

  function handleToggleTask(taskId: string) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  }

  function handleDeleteTask(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Task Dashboard</h2>
        <p className={styles.subtitle}>Manage your daily tasks efficiently.</p>
      </div>

      <div className={styles.inputContainer}>
        <TaskDrawer onAddTask={handleAddNewTask} />
      </div>

      <AnimatePresence>
        {tasks.map((task) => (
          <motion.div
            key={task.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className={styles.taskItem}
          >
            <button
              className={styles.toggleButton}
              onClick={() => handleToggleTask(task.id)}
            >
              {task.isCompleted ? (
                <CheckCircle2 className={styles.checkIcon} />
              ) : (
                <Circle className={styles.circleIcon} />
              )}
            </button>

            <span
              className={`${styles.taskTitle} ${
                task.isCompleted ? styles.completed : ""
              }`}
            >
              {task.title}
            </span>

            <span
              className={`${styles.badge} ${
                styles[`priority${task.priority}`]
              }`}
            >
              {task.priority}
            </span>

            <button
              className={styles.deleteButton}
              onClick={() => handleDeleteTask(task.id)}
            >
              <Trash2 className={styles.deleteIcon} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
