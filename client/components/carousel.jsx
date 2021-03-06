import React from 'react';
const url = `https://api.rawg.io/api/games?key=${process.env.GAME_API_KEY}&page_size=688028`;

class Carousel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      library: []
    };
    this.carouselRef = React.createRef();
  }

  componentDidMount() {
    fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    })
      .then(res => {
        return res.json();
      })
      .then(json => {
        this.setState({ library: json.results }, () => {
          // eslint-disable-next-line
          const carousel = new bootstrap.Carousel(this.carouselRef.current);

          carousel.cycle();
        });
      })
      .catch(err => console.error(err));
  }

  render() {
    if (this.state.library === []) return null;
    const stateArray = this.state.library;
    const carouselItem = stateArray.map(game => {
      return (
        <div key={game.id} className='carousel-item' data-bs-interval='2500'>
          <img src={game.background_image} className='d-block w-100 car-img' alt={game.name} />
        </div>
      );
    });
    return (
      <div id='HomePage' className='carousel carousel-dark slide  car' data-bs-ride='carousel' ref={this.carouselRef}>
      <div className='carousel-inner'>
        <div className='carousel-item active' data-bs-interval='100'></div>
        {carouselItem}
      </div>
      <button className='carousel-control-prev' type='button' data-bs-target='#HomePage' data-bs-slide='prev'>
          <span style={{ backgroundColor: 'black' }} className='carousel-control-prev-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Previous</span>
      </button>
      <button className='carousel-control-next' type='button' data-bs-target='#HomePage' data-bs-slide='next'>
        <span style={{ backgroundColor: 'black' }} className='carousel-control-next-icon' aria-hidden='true'></span>
        <span className='visually-hidden'>Next</span>
      </button>
    </div >
    );
  }
}

export default Carousel;
