import Link from "next/link";
import styles from "./Notes.module.css";

async function getNotes() {
  //   const response = await fetch("api/get/notes");
  //   const data = await response.json();
  //   return data.items;
  return [
    {
      id: 1,
      title: "Title",
      content: "content is cool!",
      created: "2023",
    },
    {
      id: 3,
      title: "Hello",
      content: "Hello",
      created: "Hello",
    },
  ];
}

export default async function NotesPage() {
  const notes = await getNotes();

  return (
    <div>
      <h1>
        <div className={styles.grid}>
          {notes.map((note) => {
            return <Note key={note.id} note={note} />;
          })}
        </div>
      </h1>
    </div>
  );
}

function Note({ note }: {note: note}) {
  const { id, title, content, created } = note;
  return (
    <Link href={`/notes/${id}`}>
      <div className={styles.note}>
        <h2>{title}</h2>
        <p>{content}</p>
        <p>{created}</p>
      </div>
    </Link>
  );
}

type note = { id: number; title: string; content: string; created: string };
