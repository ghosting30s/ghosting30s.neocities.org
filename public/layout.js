document.addEventListener("DOMContentLoaded", function () {
  // Page has finished loading. Now, do things.
  loadLayoutByPetraPixel();

  // Add any custom JavaScript code here...
});

function loadLayoutByPetraPixel() {
  const mainEl = document.querySelector("main");
  if (!mainEl) return;
  mainEl.insertAdjacentHTML("beforebegin", headerHTML());
  mainEl.insertAdjacentHTML("afterend", footerHTML());
  giveActiveClassToCurrentPage();
}

const nesting = getNesting();

function headerHTML() {
  // ${nesting} outputs "./" or "../" depending on current page depth.
  // You can use it to refer to images etc.
  // Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

  return `
  
      <!-- =============================================== -->
      <!-- HEADER -->
      <!-- =============================================== -->

      <header>

        <div class="header-content">
	        <div class="header-title">the haunted hypehouse</div>
	        
	        <!-- NAVIGATION -->
	        <nav>
	          <ul>
	            <li><a href="/">Home</a></li>
	            <li><a href="/yume-list">yume list</a></li>
	            <li><a href="/image-collection">funny image collection</a></li>
	            <li><a href="/page3">journal</a></li>
	            <li>
	                <strong>art and ocs</strong>
	                <ul>
	                  <li><a href="/page-a">souls</a></li>
	                  <li><a href="/page-b">shattered glass</a></li>
	                  <li><a href="/page-c">planetary system shutdown</a></li>
	                  <li><a href="/page-d">run and go</a></li>
	                  <li><a href="/page-e">fandom</a></li>
	                </ul>
	            </li>
	          </ul>
	        </nav>
        	
        </div>
      </header>

	  
        
      <!-- =============================================== -->
      <!-- LEFT SIDEBAR -->
      <!-- =============================================== -->

      <aside class="left-sidebar">
        
        <div class="sidebar-section">
          <div class="sidebar-title">monthly somethin</div>
          <blockquote>
            <p>i'm really good at keeping up with things I promise</p>
          </blockquote>
        </div>
        
        <div class="sidebar-section">
          <div class="sidebar-title">recent updates</div>
          <ul>
            <li>9/28/2026 - so that was a fucking lie. anyway</li>
            <li>7/18/2025 - whole site being revamped</li>
          </ul>
        </div>

        <div class="sidebar-section">
          <div class="sidebar-title">site button</div>
          <div class="site-button">
          	<a href="https://ghosting30s.neocities.org/" target="_blank"><img src="/sitebutton.png" alt="the haunted hypehouse"></a>
        	<textarea><a href="https://ghosting30s.neocities.org/" target="_blank"><img src="/sitebutton.png" alt="petrapixel"></a></textarea>
          </div>
        </div>
      </aside>
	
      `;
}

function footerHTML() {
  // ${nesting} outputs "./" or "../" depending on current page depth.
  // You can use it to refer to images etc.
  // Example: <img src="${nesting}img/logo.png"> might output <img src="../img/logo.png">

  return `


      <!-- =============================================== -->
      <!-- FOOTER -->
      <!-- =============================================== -->

      <footer>
            <div>Footer Text. <a href="/">Link.</a> Template generated with <a href="https://petrapixel.neocities.org/coding/layout-generator.html">petrapixel's layout generator</a>.</div>
      </footer>`;
}

/* Do not edit anything below this line unless you know what you're doing. */

function giveActiveClassToCurrentPage() {
  const els = document.querySelectorAll("nav a");
  [...els].forEach((el) => {
    const href = el.getAttribute("href").replace(".html", "").replace("#", "");
    const pathname = window.location.pathname.replace("/public/", "");
    const currentHref = window.location.href.replace(".html", "") + "END";

	/* Homepage */
    if (href == "/" || href == "/index.html") {
      if (pathname == "/") {
        el.classList.add("active");
      }
    } else {
      /* Other pages */
      if (currentHref.includes(href + "END")) {
        el.classList.add("active");

        /* Subnavigation: */
		
        if (el.closest("details")) {
          el.closest("details").setAttribute("open", "open");
          el.closest("details").classList.add("active");
        }

        if (el.closest("ul")) {
          if (el.closest("ul").closest("ul")) {
          	el.closest("ul").closest("ul").classList.add("active");
          }
        }
      }
    }
  });
}

function getNesting() {
  const numberOfSlashes = window.location.pathname.split("/").length - 1;
  if (numberOfSlashes == 1) return "./";
  return "../".repeat(numberOfSlashes - 1);
}
