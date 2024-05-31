import * as React from 'react'

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string
  placeholder: string
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ id, type, placeholder, ...props }, ref) => {
    return (
      <>
        <input
          type={type}
          ref={ref}
          id={id}
          {...props}
          placeholder={placeholder}
          className="border-input flex h-10 w-full rounded-md border bg-gray-300 px-3 py-2 text-sm text-slate-950 ring-offset-strongRed file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-slate-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-strongRed focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        />
      </>
    )
  },
)
Input.displayName = 'Input'
