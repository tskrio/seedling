import mjml2html from 'mjml'
export const render = ({ name }) => {
  return mjml2html(mjml(name), {})
}
let mjml = (name, brand, loginUrl, welcomeImageUrl) => {
  return `<mjml>
  <mj-body>
    <mj-raw>
      <!-- Company Header -->
    </mj-raw>
    <mj-section background-color="#f0f0f0">
      <mj-column>
        <mj-text font-style="italic" font-size="20px" color="#626262">${brand}</mj-text>
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
        <mj-button background-color="#fff" color="#2f855a" href="${loginUrl}">Log in</mj-button>
      </mj-column>
    </mj-section>
    <mj-raw>
      <!-- Intro text -->
    </mj-raw>
    <mj-section background-color="#fafafa">
      <mj-column width="400px">
        <mj-text font-style="italic" font-size="20px" font-family="Helvetica Neue" color="#626262">What is ${brand}?</mj-text>
        <mj-text color="#525252">${brand} is a low-to-no cost accessible automation tool for forms and lists.  If you like to know where your data is.  Self hosted, or on the cloud somewhere, you can choose, this is great.  We have some guiding principals below.</mj-text>
        <mj-text color="#525252">Low to no cost.  How can this be possible?  Well, with the work the <a href="https://redwoodjs.com">RedwoodJS</a> team put in it's possible.  Hosts like <a href="https://netlify.com">Netlify</a>, <a href="https://vercel.com">Vercel</a>, and <a href="https://onrender.com">Render</a> help too!</mj-text>
        <mj-text color="#525252">Accessible. This is something needed from the beginning.  So it's here.  Right now, it means we're using <a href="https://chakra-ui.com">Chakra UI</a> to help on this front, but I'm sure there's other improvements we can take.</mj-text>
        <mj-text color="#525252">For anyone. Eh, this is still a work in progress. You still need to be able to do some coding to stand this up, but someday, you won't need to.</mj-text>
        <mj-text color="#525252">With smart permissions. Our generators default roles for field and tables, but we're <a href="https://github.com/tskrio/seedling/issues/100">still working on row level access</a>.</mj-text>

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
        <mj-image width="200px" src="${welcomeImageUrl}"></mj-image>
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
<mj-button background-color="#fff" href="https://github.com/tskrio/seedling" color="#2f855a">Star the repo</mj-button>
        <mj-button background-color="#fff" href="mailto:jace@tskr.io" color="#2f855a">Tell me what you think</mj-button>
        <mj-button background-color="#fff" href="https://tskr.io/" color="#2f855a">Try it out (Deploy to Netlify)</mj-button>
        <!--<mj-button background-color="#fff" href="https://tskr.io/" color="#2f855a">Try it out (Deploy to Render)</mj-button>-->
        <mj-button background-color="#fff" href="https://github.com/tskrio/seedling#contributing" color="#2f855a">Take a stab at contributing</mj-button>
      </mj-column>
      <mj-column>
        ???
      </mj-column>
    </mj-section>
  </mj-body>
</mjml>`
}
