

CREATE TABLE blogs (
    id SERIAL PRIMARY KEY,
    author text,
    url text NOT NULL,
    title text NOT NULL,
    likes int DEFAULT 0
);


insert into blogs (author, url, title, likes)
    values (
        'Joonas Rantala',
        'joonasrantala.com',
        'Maailman pelastaminen',
        999999
    );

insert into blogs (author, url, title, likes)
    values (
        'Matti Luukkainen',
        'https://github.com/mluukkai',
        'Full Stack Open',
        999998
    );

insert into users (username, name)
    values (
        'Joonasrantala',
        'Joonas Rantala'
    );

insert into users(username, name)
    values (
        'Zezima',
        'Donald Trump'
    );