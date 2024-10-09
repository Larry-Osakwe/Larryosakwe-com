import * as React from "react"
import tw, { styled } from 'twin.macro'

const baseAlertStyles = tw`relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg]:text-foreground`

const alertVariants = {
  default: tw`bg-background text-foreground`,
  destructive: tw`border-red-500 text-red-500 dark:border-red-900 dark:text-red-900 [&>svg]:text-red-500 dark:[&>svg]:text-red-900`,
}

const StyledAlert = styled.div<{ variant?: keyof typeof alertVariants }>(
  ({ variant = 'default' }) => [
    baseAlertStyles,
    alertVariants[variant],
  ]
)

export interface AlertProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: keyof typeof alertVariants
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant, ...props }, ref) => {
    return (
      <StyledAlert
        ref={ref}
        role="alert"
        variant={variant}
        className={className}
        {...props}
      />
    )
  }
)
Alert.displayName = "Alert"

const AlertTitle = tw.h5`mb-1 font-medium leading-none tracking-tight`

const AlertDescription = tw.div`text-sm [&_p]:leading-relaxed`

export { Alert, AlertTitle, AlertDescription }
