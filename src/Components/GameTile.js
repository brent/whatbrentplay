import React, { useState, useEffect, useRef } from 'react';
import '../css/gameTile.css';

const GameTile = ({ review }) => {
  const containerRef = useRef(null)
  const imageRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      })
    })

    if (containerRef.current) observer.observe(containerRef.current)

    return () => {
      if (containerRef.current) observer.unobserve(containerRef.current)
    }
  }, [containerRef])

  useEffect(() => {
    if (isVisible) {
      const img = imageRef.current
      img['src'] = img.dataset.imgSrc
    }
  }, [imageRef, isVisible])

  return (
    <a href={'/' + review.slug} ref={containerRef} className={`gameTileWrapper ${isVisible ? 'img-loading' : 'img-empty'}`}>
      <div className="gameTile__cover">
        <img ref={imageRef} alt={review.game.name + ' cover image'} data-img-src={review.game.cover_url} />
      </div>
      <div className="gameTile__meta">
        <h2 className="gameTile__gameTitle">
          {review.game.name}
        </h2>
        <h3 className="gameTile__score">
          {review.rating[5].totalScore + '/25'}
        </h3>
      </div>
    </a>
  );
}

export default GameTile;
