import { useEffect, useState } from "react";
import { FileText } from "lucide-react";

const TotalResearchPapers = () => {
  const [count, setCount] = useState(0);

  // Load the count from localStorage when the component mounts
  useEffect(() => {
    const storedCount = localStorage.getItem("totalPapers");
    if (storedCount) {
      setCount(parseInt(storedCount, 10));
    }
  }, []);

  return (
    <section className="py-16 bg-white text-center">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-extrabold text-gray-900 animate-fade-in">
          📄 Total Research Papers
        </h2>

        {/* Animated Number */}
        <div className="flex items-center justify-center text-indigo-700 text-7xl font-extrabold mt-6 animate-bounce">
          <FileText className="h-14 w-14 mr-3 animate-pulse" />
          {count}
        </div>

        <p className="text-gray-600 text-lg mt-2 animate-fade-in">
          Papers uploaded on ResearchHub
        </p>
      </div>
    </section>
  );
};

export default TotalResearchPapers;
