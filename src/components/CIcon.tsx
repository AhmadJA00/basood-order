interface IconProps {
  icon: React.ReactNode;
  className?: string;
}

const CIcon: React.FC<IconProps> = ({ icon, className }) => {
  return (
    <span
      className={`text-lg bg-gradient-to-br flex  bg-primary text-secondary duration-200  p-1.5 rounded-lg ${className}`}
    >
      {icon}
    </span>
  );
};

export default CIcon;
