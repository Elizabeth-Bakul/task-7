CREATE TABLE counters
(
    id          serial PRIMARY KEY,
    datetime    timestamp NOT NULL,
    client_info VARCHAR(255) NOT NULL,
    value       INTEGER      NOT NULL
);