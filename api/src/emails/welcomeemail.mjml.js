import mjml2html from 'mjml'
export const render = ({ name }) => {
  let imageLink = 'https://demo.tskr.io/jace.jpeg'
  return mjml2html(mjml(name, imageLink), {})
}
let mjml = (name, imageLink) => {
  return `<mjml>
  <mj-body>
    <mj-raw>
      <!-- Company Header -->
    </mj-raw>
    <mj-section background-color="#f0f0f0">
      <mj-column>
        <mj-text font-style="italic" font-size="20px" color="#626262">Welcome to Tskr</mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Image Header -->
    </mj-raw>
    <mj-section background-color="#2f855a" background-size="cover" background-repeat="no-repeat">
      <mj-column width="600px">
        <mj-text align="center" color="#fff" font-size="20px" font-family="Open Sans">
          ${name}, thanks for signing up
        </mj-text>
        <mj-button background-color="#fff" color="#2f855a" href="https://demo.tskr.io/login">Log in</mj-button>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Intro text -->
    </mj-raw>
    <mj-section background-color="#fafafa">
      <mj-column width="400px">
        <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#626262">What is this?</mj-text>
        <mj-text color="#525252">Tskr is a pet project to alloy you and anyone to own their work, from the database to the front end at the best possible value.  It has a few guiding principals.</mj-text>
        <mj-text color="#525252">Low to no cost.  How can this be possible?  Well, with the work the <a href="https://redwoodjs.com">RedwoodJS</a> team put in it's possible.  Hosts like <a href="https://netlify.com">Netlify</a>, <a href="https://vercel.com">Vercel</a>, and <a href="https://onrender.com">Render</a> help too!</mj-text>
        <mj-text color="#525252">Accessible.  It's got to be made in way that everyone regardless of their abilities, can use this.  We're using <a href="https://chakra-ui.com">Chakra UI</a> to help on this front.  </mj-text>
        <mj-text color="#525252">For anyone.  Eh, this is still a work in progress.  You still need to be able to do some coding to stand this up, but hopefully someday, you won't need to.</mj-text>
        <mj-text color="#525252">With smart permissions.  We default our generators to have roles for table and field level access, but we're <a href="https://github.com/tskrio/tskr/issues/100">still working on row level access</a>.</mj-text>

        <mj-button background-color="#2f855a" href="#">Learn how it works here (video)</mj-button>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Side image -->
    </mj-raw>
    <mj-section background-color="white">
      <mj-raw>
        <!-- Left image -->
      </mj-raw>
      <mj-column>
        <mj-image width="200px" src="${imageLink}"></mj-image>
      </mj-column>
      <mj-raw>
        <!-- right paragraph -->
      </mj-raw>
      <mj-column>
        <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#626262">About me</mj-text>
        <mj-text color="#525252">Whenever I see something I think is great, the first question I have is who is behind this.</mj-text>
        <mj-text color="#525252">Hi, I'm <a href="https://jace.pro">Jace</a>.  I've been adding value to folks in IT for over a decade.  I want to make something like that for my own use.  After sharing this with some other folks there seems to be some interest. There's others whove been helping me along here, I need to get their permission to share their names and links here.</mj-text>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Outro text -->
    </mj-raw>
    <mj-section background-color="#2f855a">
      <mj-column width="400px">
        <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#fff">How can you help?</mj-text>
        <mj-text color="#fff">I am looking for feedback, use-cases, and folks to try it out.</mj-text>
        <mj-text color="#fff">If you're interested in;</mj-text>
        <mj-text color="#fff">Owning your data end-to-end</mj-text>
        <mj-text color="#fff">Using a modern tech-stack (React, GraphQL)</mj-text>
        <mj-text color="#fff">Want to learn those technoligies</mj-text>
        <mj-button background-color="#fff" href="mailto:jace@tskr.io" color="#2f855a">Reach out to me!</mj-button>
        <mj-text align="center" color="#fff">OR</mj-text>
        <mj-button background-color="#fff" href="https://github.com/tskrio/tskr/issues" color="#2f855a">Open an issue with how you'd like to help!</mj-button>
      </mj-column>
      <mj-column>
        ???
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
}
