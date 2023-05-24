-- UP

CREATE TABLE todo (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uuid TEXT,
    task TEXT,
    isCompleted BOOLEAN,
    lastUpdatedAt TEXT
);

INSERT INTO todo (uuid, task, isCompleted, lastUpdatedAt)
VALUES ('', 'Send a gift', true, DATETIME('now', 'localtime'));

INSERT INTO todo (uuid, task, isCompleted, lastUpdatedAt)
VALUES ('', 'Write a note', false, DATETIME('now', 'localtime'));

-- DOWN

DROP TABLE todo;