import { useState, useEffect } from "react";
import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/contexts/AuthContext";
import { Activity } from "@/types/activity";
import { format } from "date-fns";

export function useActivities(selectedDate: Date) {
  const { user } = useAuth();
  const [activities, setActivities] = useState<Activity[]>([]);
  const [loading, setLoading] = useState(true);

  const dateKey = format(selectedDate, "yyyy-MM-dd");

  useEffect(() => {
    if (!user) {
      setActivities([]);
      setLoading(false);
      return;
    }

    const activitiesRef = collection(
      db,
      "users",
      user.uid,
      "days",
      dateKey,
      "activities"
    );
    const q = query(activitiesRef, orderBy("createdAt", "desc"));

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const activitiesData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      })) as Activity[];
      setActivities(activitiesData);
      setLoading(false);
    });

    return unsubscribe;
  }, [user, dateKey]);

  const addActivity = async (activity: Omit<Activity, "id" | "createdAt">) => {
    if (!user) return;

    const activitiesRef = collection(
      db,
      "users",
      user.uid,
      "days",
      dateKey,
      "activities"
    );

    await addDoc(activitiesRef, {
      ...activity,
      createdAt: new Date(),
    });
  };

  const updateActivity = async (id: string, updates: Partial<Activity>) => {
    if (!user) return;

    const activityRef = doc(
      db,
      "users",
      user.uid,
      "days",
      dateKey,
      "activities",
      id
    );

    await updateDoc(activityRef, updates);
  };

  const deleteActivity = async (id: string) => {
    if (!user) return;

    const activityRef = doc(
      db,
      "users",
      user.uid,
      "days",
      dateKey,
      "activities",
      id
    );

    await deleteDoc(activityRef);
  };

  const totalMinutes = activities.reduce((sum, a) => sum + a.minutes, 0);
  const remainingMinutes = 1440 - totalMinutes;

  return {
    activities,
    loading,
    addActivity,
    updateActivity,
    deleteActivity,
    totalMinutes,
    remainingMinutes,
  };
}
