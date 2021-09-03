import AboutComponent from 'src/components/AboutComponent/AboutComponent'
import LoginComponent from 'src/components/LoginComponent/LoginComponent'
const HomePage = () => {
  return (
    <main className="rw-main sections-split">
      <section className="leftHalf">
        <AboutComponent />
      </section>
      <section className="rightHalf">
        <LoginComponent />
      </section>
    </main>
  )
}
export default HomePage
