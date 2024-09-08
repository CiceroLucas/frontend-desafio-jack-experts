"use client";
import { useSession } from "next-auth/react";
import Navbar from "../components/Navbar";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Loading from "../components/Loading";
import TaskList from "../components/TaskList";
import TaskForm from "../components/TaskForm";

const Task = () => {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return;

    if (!session) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <Loading />;
  }

  if (!session) {
    return null;
  }

  return (
    <div>
      <Navbar />
      <TaskForm />
      <TaskList />
    </div>
  );
};

export default Task;
