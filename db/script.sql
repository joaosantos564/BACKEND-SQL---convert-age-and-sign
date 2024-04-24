CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    surname VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    birthdate DATE NOT NULL,
    age INTEGER NOT NULL,
    sign VARCHAR(100) NOT NULL
);

INSERT INTO usuarios (nome, email) VALUES ('Juan', 'Juan@gamil.com');