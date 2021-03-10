import Navigation from "./navigation";

const Container = ({ children, categories }) => (
  <>
    <Navigation categories={categories} />
    {children}
  </>
);

export default Container;
