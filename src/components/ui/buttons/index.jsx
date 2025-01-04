import Image from "next/image";

export const Button = ({ children, classes, onClick, type = "submit" }) => {
  return (
    <button className={`btn ${classes}`} onClick={onClick} type>
      {children}
    </button>
  );
};

export const PhotoButton = ({ 
    children, 
    classes, 
    onClick, 
    src,
}) => {
  return (
    <div className={`photo-btn ${classes}`} onClick={onClick}>
      {children}
      <div className="overlay"></div>
      <Image 
        src={src} 
        alt="Photo-bg" 
        width={20} 
        height={20} 
        layout="responsive" 
        className="photo-btn-bg" 
      />
    </div>
  );
}