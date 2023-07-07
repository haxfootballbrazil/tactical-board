export default function getParameter(name: string) {
  const queryString = window.location.search;
  return JSON.parse(new URLSearchParams(queryString).get(name) + "");
}