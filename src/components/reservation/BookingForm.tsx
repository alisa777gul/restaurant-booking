'use client';

type BookingFormProps = {
  name: string;
  phone: string;
  email: string;
  guests: string;

  loading: boolean;

  onNameChange: (value: string) => void;
  onPhoneChange: (value: string) => void;
  onEmailChange: (value: string) => void;
  onGuestsChange: (value: string) => void;

  onSubmit: () => void;
};

export default function BookingForm({
  name,
  phone,
  email,
  guests,
  loading,

  onNameChange,
  onPhoneChange,
  onEmailChange,
  onGuestsChange,
  onSubmit,
}: BookingFormProps) {
  return (
    <div className="grid gap-6">
      <select
        value={guests}
        onChange={(e) => onGuestsChange(e.target.value)}

        className="
        w-full
        rounded-2xl
        bg-neutral-100
        dark:bg-neutral-900
        border
        border-neutral-200
        dark:border-neutral-800
        px-5
        py-4
        "
      >
        <option value="1">1 person</option>

        <option value="2">2 people</option>

        <option value="3">3 people</option>

        <option value="4">4 people</option>

        <option value="5">5+ people</option>
      </select>

      <input
        type="text"
        placeholder="Your name"

        value={name}

        onChange={(e) => onNameChange(e.target.value)}

        className="booking-input"
      />

      <input
        type="tel"

        placeholder="+421..."

        value={phone}

        onChange={(e) => onPhoneChange(e.target.value)}

        className="booking-input"
      />

      <input
        type="email"

        placeholder="email@example.com"

        value={email}

        onChange={(e) => onEmailChange(e.target.value)}

        className="booking-input"
      />

      <button
        onClick={onSubmit}

        disabled={loading}

        className="
        mt-4
        w-full
        rounded-2xl
        bg-blue-600
        text-white
        py-4
        font-semibold
        hover:bg-blue-700
        transition
        disabled:opacity-50
        "
      >
        {loading ? 'Creating booking...' : 'Confirm appointment'}
      </button>
    </div>
  );
}
