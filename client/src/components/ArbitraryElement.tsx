interface ArbitraryElementProps {
  galleryName: string;
}

function ArbitraryElement({ galleryName }: ArbitraryElementProps) {
  return (
    <div>
      <h1>Gallery Name</h1>
      <p>{galleryName}</p>
    </div>
  );
};

export default ArbitraryElement; 