import React from 'react';

export default function NavBar(props) {
  return (
    <>
      <div>
        <nav className="navbar navbar-expand-lg navbar-dark bg">
          <div className="container-fluid">
            <a className="navbar-brand text-warning" href="#">Gaming Library</a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                <li className="nav-item">
                  <a className="nav-link active text-warning" aria-current="page" href="#">Favorites</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-warning" href="#">Add Game</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-warning" href='#'>Library</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-warning" href='#'>Notes</a>
                </li>
              </ul>
              <form className="d-flex">
                <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"></input>
                <button className="btn btn-outline-warning text-light" type="submit">Search</button>
              </form>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
