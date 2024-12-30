export default function SWDev() {
  let swUrl = `${process.env.PUBLIC_URL}/SW.js`;
  navigator.serviceWorker.register(swUrl).then((res) => {
    //console.warn("res:", res);
  });
}
