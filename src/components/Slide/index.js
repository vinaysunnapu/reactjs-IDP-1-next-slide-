import {Component} from 'react'
import './index.css'

class Slide extends Component {
  state = {condition: true}

  getListOfSlides = () => {
    const {slideData, activeSlide, isActive} = this.props

    const {id, heading, description, num} = slideData
    const onClickActiveSlide = () => {
      activeSlide(slideData)
    }

    const bgClassName = isActive && 'list-bg-color'

    return (
      <li
        testid={`slideTab${num}`}
        className={`main-list-item ${bgClassName}`}
        onClick={onClickActiveSlide}
      >
        <p>{num}</p>
        <div className="list-item">
          <h1 className="list-heading">{heading}</h1>
          <p className="list-description">{description}</p>
        </div>
      </li>
    )
  }

  render() {
    return <>{this.getListOfSlides()}</>
  }
}

export default Slide
