const Logo = ({width = '48', height = '48'}) => {
  return (
    <div>
      <img
        height={height}
        width={width}
        src="./images/bookshelf.png"
        alt="bookshelf logo"
      />
    </div>
  );
};

export default Logo;
