import { Link } from 'react-router-dom'
import './AboutUs.css'
import photo from './angela_photo.JPG'

/**
 * A React component that represents the Home page of the app.
 * @param {*} param0 an object holding any props passed to this component from its parent component
 * @returns The contents of this component, in JSX form.
 */
const AboutUs = props => {
  return (
    <>
      <h1>Angela Tao</h1>
      <Link to="/" className="picture">
        <img src={photo} alt="my picture" />
        </Link>
      <p>Hi! My name is Angela</p>
      <p>I'm a Senior year undergraduate student at NYU, studying Business and computer Science.</p>
      <p>I have strong interest in gaming, dancing, and would love to make more friends!</p>

    </>
  )
}

// make this component available to be imported into any other file
export default AboutUs
