import ReactSelect from 'react-select';
import { Check, ChevronDown } from 'lucide-react';

/* react-select styled to match the site's inputs: dark field, gold focus ring, gold active option. */
const classNames = {
  control: ({ isFocused }) =>
    `!min-h-[50px] rounded-xl border bg-ink-900/60 px-4 font-display text-base transition-colors cursor-pointer ${
      isFocused ? 'border-gold-500/70' : 'border-line hover:border-silver-400/40'
    }`,
  valueContainer: () => 'gap-1',
  singleValue: () => 'text-silver-50',
  placeholder: () => 'text-silver-400/70',
  input: () => 'text-silver-50',
  indicatorsContainer: () => 'gap-1',
  dropdownIndicator: ({ selectProps }) =>
    `text-silver-400 transition-transform duration-300 ${selectProps.menuIsOpen ? 'rotate-180 text-gold-300' : ''}`,
  menu: () =>
    'right-0 mt-2 !w-[max(100%,300px)] overflow-hidden rounded-xl border border-line bg-ink-900/95 p-1.5 shadow-[0_24px_60px_-20px_rgba(0,0,0,0.8)] backdrop-blur-xl',
  menuList: () => 'space-y-0.5',
  option: ({ isFocused, isSelected }) =>
    `cursor-pointer whitespace-nowrap rounded-lg px-3.5 py-2.5 font-display text-[15px] transition-colors ${
      isSelected ? 'text-gold-100' : 'text-silver-200'
    } ${isFocused ? 'bg-gold-500/12 text-gold-100' : ''}`,
  noOptionsMessage: () => 'px-3.5 py-2.5 text-sm text-silver-400',
};

const DropdownIndicator = ({ innerProps, selectProps }) => (
  <div {...innerProps} className={classNames.dropdownIndicator({ selectProps })}>
    <ChevronDown className="size-4" />
  </div>
);

const formatOptionLabel = (option, { context, selectValue }) => (
  <span className="flex w-full items-center justify-between gap-4">
    <span>{option.label}</span>
    {context === 'menu' && selectValue?.[0]?.value === option.value && <Check className="size-4 shrink-0 text-gold-300" />}
  </span>
);

export default function Select({ inputId, options, value, onChange, placeholder }) {
  return (
    <ReactSelect
      inputId={inputId}
      unstyled
      classNames={classNames}
      components={{ DropdownIndicator, IndicatorSeparator: null }}
      formatOptionLabel={formatOptionLabel}
      options={options}
      value={options.find(o => o.value === value) ?? null}
      onChange={opt => onChange(opt?.value ?? '')}
      placeholder={placeholder}
      isSearchable={false}
      menuPlacement="auto"
    />
  );
}
