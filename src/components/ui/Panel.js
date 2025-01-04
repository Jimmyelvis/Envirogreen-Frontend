import classNames from 'classnames';

export const Panel = ({ children, className, frosted, ...rest }) => {
  const finalClassNames = classNames(
    {
      'panel-frosted': frosted
    },
    className
  );

  return (
    <div {...rest} className={`panel ${finalClassNames}`}>
      {children}
    </div>
  );
}


