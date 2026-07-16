import { X, MapPin, ChevronDown } from "lucide-react";

/**
 * DropSync — "New Delivery" modal
 * -------------------------------------------------
 * A responsive recreation of the New Delivery form
 * dialog: recipient details, delivery address with a
 * map-edit shortcut, package description, date/time,
 * optional driver assignment, and a primary submit
 * action.
 *
 * Usage:
 *   const [open, setOpen] = useState(false);
 *   <NewDeliveryModal open={open} onClose={() => setOpen(false)} />
 *
 * Dependencies: tailwindcss, lucide-react
 */

function Label({ children }) {
  return (
    <label className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-slate-500">
      {children}
    </label>
  );
}

function TextInput(props) {
  return (
    <input
      {...props}
      className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
    />
  );
}

function Select({ children, ...props }) {
  return (
    <div className="relative">
      <select
        {...props}
        className="w-full appearance-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 pr-9 text-sm text-slate-700 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
      >
        {children}
      </select>
      <ChevronDown
        size={16}
        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400"
      />
    </div>
  );
}

export default function NewDeliveryModal({ open = true, onClose = () => {} }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-900/50 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-100 px-6 py-4">
          <h2 className="text-base font-semibold text-slate-900">
            New Delivery
          </h2>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-600"
            aria-label="Close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="max-h-[75vh] space-y-5 overflow-y-auto px-6 py-5">
          {/* Recipient */}
          <div>
            <Label>Recipient</Label>
            <Select defaultValue="manual">
              <option value="manual">Enter details manually...</option>
              <option value="saved">Choose from saved recipients</option>
            </Select>
          </div>

          {/* Recipient name / phone */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Recipient name</Label>
              <TextInput type="text" placeholder="e.g. John Doe" />
            </div>
            <div>
              <Label>Recipient phone</Label>
              <TextInput type="tel" placeholder="+234 ..." />
            </div>
          </div>

          {/* Delivery address */}
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                Delivery address
              </label>
              <button className="flex items-center gap-1 text-xs font-medium text-orange-500 hover:text-orange-600">
                <MapPin size={12} />
                Edit location on map
              </button>
            </div>
            <TextInput type="text" placeholder="Search or enter address..." />
          </div>

          {/* Package description */}
          <div>
            <Label>Package / item description</Label>
            <textarea
              rows={3}
              placeholder="What are you delivering?"
              className="w-full resize-none rounded-lg border border-slate-200 bg-white px-3 py-2.5 text-sm text-slate-900 placeholder:text-slate-400 focus:border-orange-400 focus:outline-none focus:ring-2 focus:ring-orange-100"
            />
          </div>

          {/* Date / time */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <div>
              <Label>Delivery date</Label>
              <TextInput type="text" placeholder="mm/dd/yyyy" />
            </div>
            <div>
              <Label>Delivery time</Label>
              <TextInput type="text" placeholder="--:-- --" />
            </div>
          </div>

          {/* Assign driver */}
          <div>
            <Label>Assign a driver</Label>
            <Select defaultValue="">
              <option value="" disabled>
                Select a driver (optional)
              </option>
              <option value="driver-1">Ada Obi</option>
              <option value="driver-2">Musa Bello</option>
              <option value="driver-3">Chidera Eze</option>
            </Select>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-slate-100 px-6 py-5">
          <button className="w-full rounded-lg bg-[#0b1437] py-3 text-sm font-semibold text-white transition-colors hover:bg-[#111c4a]">
            Create Delivery
          </button>
        </div>
      </div>
    </div>
  );
}