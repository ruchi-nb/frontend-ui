"use cient";

const QuickActions = () => {
  const actionItems = [
    {
      title: "Add Doctor",
      description: "Onboard a new AI doctor to your platform",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-user-plus h-6 w-6"
          aria-hidden="true"
        >
          <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
          <circle cx="9" cy="7" r="4"></circle>
          <line x1="19" x2="19" y1="8" y2="14"></line>
          <line x1="22" x2="16" y1="11" y2="11"></line>
        </svg>
      ),
      bgColor: "bg-teal-500 hover:bg-teal-600"
    },
    {
      title: "View Billing",
      description: "Manage subscription and payment methods",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-credit-card h-6 w-6"
          aria-hidden="true"
        >
          <rect width="20" height="14" x="2" y="5" rx="2"></rect>
          <line x1="2" x2="22" y1="10" y2="10"></line>
        </svg>
      ),
      bgColor: "bg-sky-500 hover:bg-sky-600"
    },
    {
      title: "Contact Support",
      description: "Get help from our technical support team",
      icon: (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="lucide lucide-circle-question-mark h-6 w-6"
          aria-hidden="true"
        >
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <path d="M12 17h.01"></path>
        </svg>
      ),
      bgColor: "bg-slate-500 hover:bg-slate-600"
    }
  ];

  const ArrowIcon = () => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-arrow-up-right h-4 w-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
      aria-hidden="true"
    >
      <path d="M7 7h10v10"></path>
      <path d="M7 17 17 7"></path>
    </svg>
  );

  return (
    <div>
      <h2 className="text-xl font-semibold text-slate-900 mb-4">Quick Actions</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {actionItems.map((item, index) => (
          <button
            key={index}
            className={`${item.bgColor} text-white p-6 rounded-xl shadow-sm transition-colors text-left group`}
          >
            <div className="flex items-center space-x-3 mb-3">
              {item.icon}
              <h3 className="font-semibold">{item.title}</h3>
            </div>
            <p className="text-sm opacity-90">{item.description}</p>
            <div className="mt-4 flex items-center space-x-1 text-sm font-medium">
              <span>Get Started</span>
              <ArrowIcon />
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;