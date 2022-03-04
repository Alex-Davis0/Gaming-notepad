import React from 'react';

const styles = {
  pageContent: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 'calc(100vh - 3.5rem)'
  }
};

export default function NotFound(props) {
  return (
    <div style={styles.pageContent}>
      <div className="row">
        <div className="col text-center mb-5 bg">
          <h3 className='text-warning'>
            Uh oh, we could not find the page you were looking for!
          </h3>
          <p className="text-muted">
            <a href="#">Return to the HomePage</a>
          </p>
        </div>
      </div>
    </div>
  );
}
