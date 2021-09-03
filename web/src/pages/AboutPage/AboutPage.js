import AboutComponent from 'src/components/AboutComponent/AboutComponent'

const AboutPage = () => {
  let altText = 'Find me in ./web/src/pages/AboutPage/AboutPage.js'
  return (
    <>
      <h1 alt={altText}>AboutPage</h1>
      <AboutComponent />
    </>
  )
}

export default AboutPage
