-- UP

CREATE TABLE Note (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    content TEXT,
    created_at TEXT
);

INSERT INTO Note (title, content, created_at)
values ('title1', 'content1', DATETIME('now'));

INSERT INTO Note (title, content, created_at)
values ('title2', 'content2', DATE('now'));

-- DOWN

DROP TABLE Note;