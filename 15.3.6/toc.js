document.addEventListener("DOMContentLoaded", () => {
  let toc = document.querySelector("#TOC");
  if (!toc) {
    toc = document.createElement("div");
    toc.id = "TOC";
    document.body.prepend(toc);
  }

  let headings = document.querySelectorAll("h2, h3, h4, h5, h6");
  console.log(headings);
  let sectionNumbers = [0, 0, 0, 0, 0];
  for (let heading of headings) {
    if (heading.parentNode === toc) {
      continue;
    }
    let level = parseInt(heading.tagName.charAt(1)) - 1;
    sectionNumbers[level - 1]++;
    for (let i = level; i < sectionNumbers.length; i++) {
      sectionNumbers[i] = 0;
    }

    let sectionNumber = sectionNumbers.slice(0, level).join(".");
    console.log(sectionNumber);
    let span = document.createElement("span");
    span.className = "TOCSectNum";
    span.textContent = sectionNumber;
    heading.prepend(span);

    let anchor = document.createElement("a");
    let fragmentName = `TOC${sectionNumber}`;
    anchor.name = fragmentName;
    heading.before(anchor);
    anchor.append(heading);

    let link = document.createElement("a");
    link.href = `#${fragmentName}`;

    link.innerHTML = heading.innerHTML;

    let entry = document.createElement("div");
    entry.classList.add("TOCEntry", `TOCLevel${level}`);
    entry.append(link);

    toc.append(entry);
  }
});
