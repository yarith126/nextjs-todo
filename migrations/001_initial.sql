-- UP

CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT,
    task TEXT,
    isCompleted BOOLEAN,
    createdAt TEXT
);

INSERT INTO todo (uuid, task, isCompleted, createdAt)
VALUES ('123asdf', 'title1', true, DATETIME('now'));

INSERT INTO todo (uuid, task, isCompleted, createdAt)
VALUES ('23fasd', 'title2', false, DATE('now'));

-- DOWN

DROP TABLE todo;