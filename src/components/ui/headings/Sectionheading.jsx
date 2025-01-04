export const Sectionheading = ({ heading, subheading, classes }) => {
  return (
    <div className={`sectionheading ${classes ? classes : ''}`}>
      <div className="left-bar"></div>

      <div className="headings">
        <h3 className="heading-3 mainheading">{heading}</h3>

        {subheading && <h4 className="heading-4 subheading">{subheading}</h4>}
      </div>
    </div>
  );
};
