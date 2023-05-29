const FirstComponent = ({
  name,
  ...props
}: {
  name: string;
  [key: string]: any;
}) => {
  return (
    <div className={`component ${name}`} {...props}>
      {name}
    </div>
  );
};

export default FirstComponent;
