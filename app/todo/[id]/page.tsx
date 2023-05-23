import Link from "next/link";
import styles from "../Notes.module.css";
import { baseUrl } from "@/lib/config";

async function getNote(noteId: number) {
  const url = `${baseUrl}api/note`;
  console.log(url);
  const response = await fetch(url);
  const data = await response.json();
  return {
    id: 1,
    title: "test",
    content: "test",
    created: "2023",
  };
}

export default async function NotesPage({
  params,
}: {
  params: { id: number };
}) {
  const note = await getNote(params.id);
  return (
    <div>
      <h1>Note ID: {note.id}</h1>
      <div className={styles.note}>
        <h2>{note.title}</h2>
        <p>{note.content}</p>
        <p>{note.created}</p>
      </div>
      <Link href="/notes">Go Back</Link>
    </div>
  );
}
