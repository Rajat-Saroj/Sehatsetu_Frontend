const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white text-center p-8 mt-12">
      <p className="text-xl font-medium">SehatSetu &copy; {new Date().getFullYear()}</p>
      <p className="text-gray-400 mt-2 text-lg">Empowering Elderly Wellness across India.</p>
    </footer>
  );
};

export default Footer;