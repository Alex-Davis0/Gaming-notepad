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
                  <a className="nav-link text-warning" href='#library'>Library</a>
                </li>
                <li className="nav-item">
                  <a className="nav-link text-warning" href='#notesLib'>Notes</a>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>
    </>
  );
}
