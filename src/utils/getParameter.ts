export default function getParameter(name: string) {
  const queryString = window.location.search;
  const param = new URLSearchParams(queryString).get(name);
  return JSON.parse(param ? atob(param + "") : "null");
}