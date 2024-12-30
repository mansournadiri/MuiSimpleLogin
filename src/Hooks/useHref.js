export const Href = ({ url, target, type, text }) => {
  return (
    <a href={url} target={target} rel={type}>
      {text}
    </a>
  );
};
