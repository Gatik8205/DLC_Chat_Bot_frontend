const DEFAULT_CHIPS = [
  { label: "How to make UPI payments", icon: "💸" },
  { label: "How to share live location on Maps", icon: "📍" },
  { label: "How to send photos on WhatsApp", icon: "📱" },
]

function SuggestionChips({ chips = DEFAULT_CHIPS, onSelect }) {
  return (
    <div className="flex flex-row flex-wrap gap-2 px-4 py-3 border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800">
      {chips.map((chip, index) => (
        <button
          key={index}
          onClick={() => onSelect(chip.label)}
          className="flex items-center gap-1 text-xs px-3 py-2 rounded-full border border-blue-200 dark:border-blue-700 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/50 transition-all"
        >
          <span>{chip.icon}</span>
          <span>{chip.label}</span>
        </button>
      ))}
    </div>
  )
}

export default SuggestionChips