import meta from "../../../src/pages/_meta.js";
export const pageMap = [{
  data: meta
}, {
  name: "atomic",
  route: "/atomic",
  children: [{
    name: "index",
    route: "/atomic",
    frontMatter: {
      "sidebarTitle": "Index"
    }
  }]
}, {
  name: "index",
  route: "/",
  frontMatter: {
    "sidebarTitle": "Index"
  }
}, {
  name: "molecules",
  route: "/molecules",
  children: [{
    name: "index",
    route: "/molecules",
    frontMatter: {
      "sidebarTitle": "Index"
    }
  }]
}];