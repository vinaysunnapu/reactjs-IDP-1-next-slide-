import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import Header from '../Header'

import Slide from '../Slide'

import './index.css'

const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
    num: 1,
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
    num: 2,
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
    num: 3,
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
    num: 4,
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
    num: 5,
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
    num: 6,
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
    num: 7,
  },
]

let number = 7

class NextSlidesApp extends Component {
  state = {
    slidesList: initialSlidesList,
    activeId: initialSlidesList[0].id,
    headCondition: false,
    descCondition: false,
    headingText: initialSlidesList[0].heading,
    descText: initialSlidesList[0].description,
  }

  onBlurHeading = event => {
    if (event.selected === undefined) {
      this.setState({headCondition: false})
    }
  }

  onBlurDesc = event => {
    if (event.selected === undefined) {
      this.setState({descCondition: false})
    }
  }

  onKeyDown = event => {
    if (event.key === 'Enter') {
      this.setState({headCondition: false})
    }
  }

  onKeyDownDesc = event => {
    if (event.key === 'Enter') {
      this.setState({descCondition: false})
    }
  }

  onClickHeadingCondition = () => {
    this.setState({headCondition: true})
  }

  onClickDescCondition = () => {
    this.setState({descCondition: true})
  }

  onChangeHeading = event => {
    const {activeId, slidesList} = this.state
    console.log(slidesList)
    this.setState({headingText: event.target.value})

    // const changeSlide = slidesList.find(each => each.id === activeSlide)
    // changeSlide.heading = event.target.value
    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(eachItem => {
        if (eachItem.id === activeId) {
          const slide = event.target.value
          return {...eachItem, heading: slide}
        }
        return eachItem
      }),
    }))
  }

  onChangeDescription = event => {
    const {activeId, slidesList} = this.state
    console.log(slidesList)
    this.setState({descText: event.target.value})

    // const changeSlide = slidesList.find(each => each.id === activeSlide)
    // changeSlide.heading = event.target.value
    this.setState(prevState => ({
      slidesList: prevState.slidesList.map(eachItem => {
        if (eachItem.id === activeId) {
          const slide = event.target.value
          return {...eachItem, description: slide}
        }
        return eachItem
      }),
    }))
  }

  onClickAddSlide = () => {
    number = number + 1

    const {slidesList, activeId} = this.state

    const index = slidesList.findIndex(each => {
      if (each.id === activeId) {
        return true
      }
      return false
    })

    console.log(number)

    const newSlideObj = {
      id: uuidv4(),
      heading: 'Heading',
      description: 'Description',
      num: number,
    }

    slidesList.splice(index + 1, 0, newSlideObj)
    this.setState({
      slidesList,
      activeId: newSlideObj.id,
      headingText: newSlideObj.heading,
      descText: newSlideObj.description,
    })

    // this.setState(prevState => ({
    // slidesList: [...prevState.slidesList, newSlideObj],
    // }))
  }

  activeSlide = slideData => {
    this.setState({
      activeId: slideData.id,
      headingText: slideData.heading,
      descText: slideData.description,
      headCondition: false,
      descCondition: false,
    })
  }

  showRightSlide = () => {
    const {headingText, descText, headCondition, descCondition} = this.state
    return (
      <div className="slide-info-container">
        {!headCondition ? (
          <h1 className="info-heading" onClick={this.onClickHeadingCondition}>
            {headingText}
          </h1>
        ) : (
          <input
            type="text"
            onChange={this.onChangeHeading}
            onKeyDown={this.onKeyDown}
            value={headingText}
            className="head-input"
            onBlur={this.onBlurHeading}
          />
        )}
        {!descCondition ? (
          <p className="info-description" onClick={this.onClickDescCondition}>
            {descText}
          </p>
        ) : (
          <input
            type="text"
            onChange={this.onChangeDescription}
            onKeyDown={this.onKeyDownDesc}
            value={descText}
            className="desc-input"
            onBlur={this.onBlurDesc}
          />
        )}
      </div>
    )
  }

  render() {
    const {slidesList, activeId} = this.state

    return (
      <>
        <Header />
        <button
          type="button"
          className="new-button"
          onClick={this.onClickAddSlide}
        >
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
            className="new-button-image"
          />
          <p className="new-text">New</p>
        </button>
        <div className="main-slides-container">
          <ol className="slide-list-container">
            {slidesList.map(eachSlide => (
              <Slide
                slideData={eachSlide}
                key={eachSlide.id}
                activeSlide={this.activeSlide}
                isActive={eachSlide.id === activeId}
              />
            ))}
          </ol>
          {this.showRightSlide()}
        </div>
      </>
    )
  }
}

export default NextSlidesApp
