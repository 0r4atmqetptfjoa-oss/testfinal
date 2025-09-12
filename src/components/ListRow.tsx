import { ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

interface ListRowProps {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  to: string;
  delay?: number;
}

export default function ListRow({ icon, title, subtitle, to, delay = 0 }: ListRowProps) {
  const nav = useNavigate();

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => nav(to)}
      className="w-full p-4 bg-gray-900 rounded-lg flex justify-between items-center text-left border border-transparent hover:border-violet-500 transition-colors"
    >
      <div className="flex items-center gap-4">
        <div className="bg-gray-800 p-3 rounded-lg">
          {icon}
        </div>
        <div>
          <p className="font-semibold text-gray-200">{title}</p>
          <p className="text-sm text-gray-400">{subtitle}</p>
        </div>
      </div>
      <ChevronRight className="text-gray-500" />
    </motion.button>
  );
}