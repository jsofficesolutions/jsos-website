import React, { useState } from 'react';
import { X, Calendar, Clock, CheckCircle, ArrowRight } from 'lucide-react';

interface ConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefillTier?: string;
}

const AVAILABLE_DAYS = [
  { day: 'Tomorrow', date: 'Wednesday', fullDate: 'Tomorrow at 10:00 AM' },
  { day: 'Thursday', date: 'Oct 1', fullDate: 'Thursday, Oct 1' },
  { day: 'Friday', date: 'Oct 2', fullDate: 'Friday, Oct 2' },
  { day: 'Monday', date: 'Oct 5', fullDate: 'Monday, Oct 5' },
  { day: 'Tuesday', date: 'Oct 6', fullDate: 'Tuesday, Oct 6' },
];

const AVAILABLE_TIMES = [
  '09:30 AM',
  '11:00 AM',
  '01:30 PM',
  '03:00 PM',
  '04:30 PM',
];

export const ConsultationModal: React.FC<ConsultationModalProps> = ({
  isOpen,
  onClose,
  prefillTier,
}) => {
  const [selectedDay, setSelectedDay] = useState(AVAILABLE_DAYS[0].day);
  const [selectedTime, setSelectedTime] = useState(AVAILABLE_TIMES[1]);
  const [name, setName] = useState('');
  const [business, setBusiness] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState(prefillTier ? `Interested in ${prefillTier}` : '');
  const [isBooked, setIsBooked] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooked(true);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn">
      <div
        className="bg-zinc-900 rounded-3xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-zinc-800 relative text-white"
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-full text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors z-10 cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Top Header */}
        <div className="p-6 sm:p-8 bg-zinc-950 text-white rounded-t-3xl border-b border-zinc-800">
          <span className="text-xs font-bold uppercase tracking-wider text-purple-400 bg-purple-950/80 border border-purple-800/80 px-2.5 py-1 rounded inline-block mb-3">
            Free 15-Min Digital Audit
          </span>
          <h3 className="text-2xl font-black text-white">
            Schedule an Audit with Jordan &amp; Josh
          </h3>
          <p className="text-zinc-400 text-xs sm:text-sm mt-1">
            Review your current website speed, Google ranking, and conversion opportunities with your UK developer.
          </p>
        </div>

        {isBooked ? (
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-950/80 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8" />
            </div>
            <h4 className="text-2xl font-black text-white">Audit Call Confirmed!</h4>
            <p className="text-zinc-300 text-sm max-w-md mx-auto">
              We&apos;ve reserved <b>{selectedDay} at {selectedTime}</b> for <b>{name}</b>. A calendar invitation and video link have been sent to <b>{email}</b>.
            </p>
            <div className="pt-4">
              <button
                onClick={onClose}
                className="px-6 py-3 rounded-full bg-purple-700 hover:bg-purple-600 text-white text-xs font-bold uppercase tracking-wider cursor-pointer shadow-md"
              >
                Done
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-6">
            {/* Step 1: Select Day & Time */}
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                1. Select Preferred Day
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {AVAILABLE_DAYS.map((d) => (
                  <button
                    key={d.day}
                    type="button"
                    onClick={() => setSelectedDay(d.day)}
                    className={`py-2 px-2.5 rounded-xl border text-center transition-all cursor-pointer ${
                      selectedDay === d.day
                        ? 'border-purple-500 bg-purple-950/80 text-purple-300 font-bold shadow-xs'
                        : 'border-zinc-800 hover:border-zinc-700 text-zinc-400 bg-zinc-950/60'
                    }`}
                  >
                    <span className="block text-xs font-bold">{d.day}</span>
                    <span className="text-[10px] text-zinc-500">{d.date}</span>
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400 mb-2">
                2. Select Time (UK London Time)
              </label>
              <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                {AVAILABLE_TIMES.map((time) => (
                  <button
                    key={time}
                    type="button"
                    onClick={() => setSelectedTime(time)}
                    className={`py-2 px-2 rounded-xl border text-xs font-semibold transition-all cursor-pointer ${
                      selectedTime === time
                        ? 'border-purple-500 bg-purple-700 text-white shadow-xs'
                        : 'border-zinc-800 hover:border-zinc-700 text-zinc-400 bg-zinc-950/60'
                    }`}
                  >
                    {time}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Contact Details */}
            <div className="space-y-4 pt-2 border-t border-zinc-800">
              <label className="block text-xs font-bold uppercase tracking-wider text-zinc-400">
                3. Your Contact Details
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <input
                    type="text"
                    required
                    placeholder="Your Name *"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Business Name"
                    value={business}
                    onChange={(e) => setBusiness(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <input
                    type="email"
                    required
                    placeholder="Email Address *"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
                <div>
                  <input
                    type="tel"
                    required
                    placeholder="Phone Number *"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>

              <div>
                <textarea
                  rows={2}
                  placeholder="Website URL or specific goals for the audit..."
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-purple-500 resize-none"
                ></textarea>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-full bg-purple-700 hover:bg-purple-600 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-purple-950/50"
              >
                <span>Confirm 15-Minute Audit</span>
                <ArrowRight className="w-4 h-4 text-purple-200" />
              </button>
              <p className="text-[11px] text-zinc-500 text-center mt-2">
                Jordan or Josh will call you on the selected time. No hard sell, guaranteed.
              </p>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
