type FirstComponentType = {
  name: string;
  [key: string]: any;
};

const FirstComponent = ({ name, ...props }: FirstComponentType) => {
  return (
    <div className={`component ${name}`} {...props}>
      {name}
    </div>
  );
};

export default FirstComponent;
