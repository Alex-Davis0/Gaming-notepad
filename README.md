# Gaming-notepad

A full stack JavaScript application for gamers who want to leave a note to remember what they where doing when they got off a game.

## Technologies Used

- React.js
- Webpack
- Bootstrap 5
- JavaScript
- Node.js
- Postgres
- HTML5
- CSS3
- Heroku
- Babel

## Live Demo

Try the application live at (https://gaming-notepad.herokuapp.com/)

## Features

- User can view a carousel of all games.
- User can view a library of games to add a note to.
- User can a note to a game.
- User can view a list of their notes.
- User can edit their notes.
- User can delete a created note. 

## Preview

![Animation 1](https://user-images.githubusercontent.com/93169087/170900234-c393cbb4-5d27-4bd5-91ee-4aefeaeecd26.gif)



## Development

### System Requirements

- Node.js 16 or higher
- NPM 6 or higher
- Postgres

### Getting Started

1. Clone the repository.

    ```shell
    git clone (https://github.com/Alex-Davis0/Final-Project.git)
    cd Final-project
    ```

1. Install all dependencies with NPM.

    ```shell
    npm install
    ```

1. Fill in the empty values of the .env.example file and copy it.

    ```shell
    cp .env.example .env
    ```

1. Start PostgreSQL.

    ```shell
    sudo service postgresql start
    ```

1. Create a database (make sure it matches .env.example)

    ```shell
    createdb (yourDatabaseName)
    ```

1. Import your database into Postgres.

    ```shell
    npm run db:import
    ```

1. Start the project. Once started you can view the application by opening http://localhost:3000 in your browser.

    ```shell
    npm run dev
    ```
    
    1. View your database through Pgweb.

    ```shell
    pgweb --db=(yourDatabaseName)
    ```
