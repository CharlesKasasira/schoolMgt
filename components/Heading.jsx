function Heading({ title, tagline }) {
  return (
    <div className="w-full mb-5">
      <h1 className="text-lg md:text-xl lg:text-2xl font-semibold">{title}</h1>
      <p className="text-sm text-gray-500">{tagline}</p>
    </div>
  );
}

export default Heading;
